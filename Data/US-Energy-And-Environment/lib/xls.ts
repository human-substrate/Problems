// Dependency-free CFB / BIFF8 reader. Rows retain Excel's zero-based row positions.
function invariant(ok: unknown, message: string): asserts ok { if (!ok) throw new Error(message); }
const END = 0xfffffffe;
function view(bytes: Uint8Array): DataView { return new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength); }
function workbook(bytes: Uint8Array): Uint8Array {
  invariant(!(bytes[0] === 0x50 && bytes[1] === 0x4b), "OOXML ZIP detected; use lib/xlsx.ts");
  invariant(bytes.length >= 512 && Buffer.from(bytes.subarray(0, 8)).toString("hex") === "d0cf11e0a1b11ae1", "Not a CFB Excel workbook");
  const h = view(bytes), major = h.getUint16(26, true), sectorSize = 2 ** h.getUint16(30, true);
  invariant(h.getUint16(28, true) === 0xfffe && ((major === 3 && sectorSize === 512) || (major === 4 && sectorSize === 4096)), "Unsupported CFB version/sector size");
  invariant(h.getUint16(32, true) === 6 && bytes.length % sectorSize === 0, "Invalid CFB mini-sector size or truncated container");
  const count = bytes.length / sectorSize - 1;
  const sector = (id: number): Uint8Array => { invariant(id < count, `CFB sector ${id} out of range`); return bytes.subarray((id + 1) * sectorSize, (id + 2) * sectorSize); };
  const fatIds: number[] = [];
  for (let i = 0; i < 109; i++) { const id = h.getUint32(76 + i * 4, true); if (id !== 0xffffffff) fatIds.push(id); }
  let dif = h.getUint32(68, true); const seenDif = new Set<number>();
  for (let i = 0; i < h.getUint32(72, true); i++) {
    invariant(!seenDif.has(dif), "CFB DIFAT cycle"); seenDif.add(dif); const d = view(sector(dif));
    for (let j = 0; j < sectorSize / 4 - 1; j++) { const id = d.getUint32(j * 4, true); if (id !== 0xffffffff) fatIds.push(id); }
    dif = d.getUint32(sectorSize - 4, true);
  }
  invariant(fatIds.length === h.getUint32(44, true) && new Set(fatIds).size === fatIds.length, "CFB FAT count mismatch");
  const fat = fatIds.flatMap(id => { const d = view(sector(id)); return Array.from({ length: sectorSize / 4 }, (_, i) => d.getUint32(i * 4, true)); });
  function chain(start: number, table: number[], read: (id: number) => Uint8Array): Uint8Array {
    const parts: Uint8Array[] = [], seen = new Set<number>(); let id = start;
    while (id !== END) { invariant(id < table.length && !seen.has(id), "CFB invalid or cyclic chain"); seen.add(id); parts.push(read(id)); id = table[id]; }
    return Buffer.concat(parts);
  }
  const dir = chain(h.getUint32(48, true), fat, sector);
  type Entry = { name: string; type: number; start: number; size: number };
  const entries: Entry[] = [];
  for (let i = 0; i + 128 <= dir.length; i += 128) {
    const d = view(dir.subarray(i, i + 128)), type = d.getUint8(66); if (type === 0) continue;
    const n = d.getUint16(64, true); invariant(n >= 2 && n <= 64 && n % 2 === 0, "Invalid CFB directory name");
    const size = major === 3 ? d.getUint32(120, true) : Number(d.getBigUint64(120, true)); invariant(Number.isSafeInteger(size), "CFB stream too large");
    entries.push({ name: new TextDecoder("utf-16le").decode(dir.subarray(i, i + n - 2)), type, start: d.getUint32(116, true), size });
  }
  const root = entries.find(e => e.type === 5), book = entries.find(e => e.type === 2 && /^(Workbook|Book)$/i.test(e.name));
  invariant(root && book, "CFB Workbook/Book stream missing");
  let result: Uint8Array;
  if (book.size < h.getUint32(56, true)) {
    const mini = chain(root.start, fat, sector).subarray(0, root.size), mf = chain(h.getUint32(60, true), fat, sector);
    invariant(mf.length === h.getUint32(64, true) * sectorSize, "CFB miniFAT count mismatch");
    const md = view(mf), table = Array.from({ length: mf.length / 4 }, (_, i) => md.getUint32(i * 4, true));
    result = chain(book.start, table, id => { invariant((id + 1) * 64 <= mini.length, "CFB mini-sector out of range"); return mini.subarray(id * 64, (id + 1) * 64); });
  } else { result = chain(book.start, fat, sector); }
  invariant(result.length >= book.size, "Truncated Workbook stream"); return result.subarray(0, book.size);
}
type RecordData = { id: number; offset: number; data: Uint8Array };
function records(bytes: Uint8Array): RecordData[] {
  const out: RecordData[] = [], d = view(bytes);
  for (let p = 0; p < bytes.length;) {
    invariant(p + 4 <= bytes.length, "Truncated BIFF record header"); const id = d.getUint16(p, true), size = d.getUint16(p + 2, true);
    invariant(p + 4 + size <= bytes.length, "Truncated BIFF record payload"); out.push({ id, offset: p, data: bytes.subarray(p + 4, p + 4 + size) }); p += size + 4;
  }
  return out;
}
// CONTINUE inserts an encoding flag only when character data crosses a boundary.
class Segments {
  private segment = 0; private position = 0;
  constructor(private readonly parts: Uint8Array[]) {}
  private advance(): void { while (this.segment < this.parts.length && this.position === this.parts[this.segment].length) { this.segment++; this.position = 0; } invariant(this.segment < this.parts.length, "Truncated BIFF string"); }
  byte(): number { this.advance(); return this.parts[this.segment][this.position++]; }
  uint16(): number { return this.byte() | this.byte() << 8; }
  uint32(): number { return (this.uint16() + this.uint16() * 65536) >>> 0; }
  string(): string {
    const count = this.uint16(), flags = this.byte(); invariant((flags & ~13) === 0, "Invalid BIFF Unicode flags");
    const runs = flags & 8 ? this.uint16() : 0, ext = flags & 4 ? this.uint32() : 0; let wide = Boolean(flags & 1), result = "";
    for (let i = 0; i < count; i++) {
      if (this.position === this.parts[this.segment].length) { this.advance(); const encoding = this.byte(); invariant(encoding === 0 || encoding === 1, "Invalid CONTINUE Unicode flag"); wide = Boolean(encoding); }
      invariant(this.parts[this.segment].length - this.position >= (wide ? 2 : 1), "Split BIFF Unicode character");
      result += String.fromCharCode(wide ? this.uint16() : this.byte());
    }
    for (let i = 0; i < runs * 4 + ext; i++) this.byte(); return result;
  }
}
function column(index: number): string { let s = ""; for (let n = index + 1; n > 0; n = Math.floor((n - 1) / 26)) s = String.fromCharCode(65 + (n - 1) % 26) + s; return s; }
function rk(raw: number): number { let n: number; if (raw & 2) n = raw >> 2; else { const b = new DataView(new ArrayBuffer(8)); b.setUint32(4, raw & 0xfffffffc, true); n = b.getFloat64(0, true); } return raw & 1 ? n / 100 : n; }
export async function xlsRows(path: string, sheet?: string | number): Promise<Record<string, string>[]> {
  const recs = records(workbook(new Uint8Array(await Bun.file(path).arrayBuffer())));
  invariant(recs[0]?.id === 0x809 && recs[0].data.length >= 4, "Missing BIFF BOF");
  const version = view(recs[0].data).getUint16(0, true); invariant(version === 0x600, `BIFF${version === 0x500 ? "5" : ` version 0x${version.toString(16)}`} detected; BIFF8 required`);
  const sheets: { name: string; offset: number }[] = [], strings: string[] = [];
  for (let i = 0; i < recs.length && recs[i].id !== 0x0a; i++) {
    const r = recs[i], d = view(r.data);
    if (r.id === 0x85) { invariant(r.data.length >= 8, "Truncated BOUNDSHEET"); const n = r.data[6], wide = r.data[7] & 1; invariant(r.data.length >= 8 + n * (wide + 1), "Truncated sheet name"); const raw = r.data.subarray(8, 8 + n * (wide + 1)); sheets.push({ offset: d.getUint32(0, true), name: wide ? new TextDecoder("utf-16le").decode(raw) : Array.from(raw, b => String.fromCharCode(b)).join("") }); }
    if (r.id === 0xfc) { const parts = [r.data]; while (recs[i + 1]?.id === 0x3c) parts.push(recs[++i].data); const s = new Segments(parts), total = s.uint32(), unique = s.uint32(); invariant(unique <= total && unique < 10_000_000, "Invalid SST counts"); for (let j = 0; j < unique; j++) strings.push(s.string()); }
    if (r.id === 0x2f) throw new Error("Encrypted BIFF workbook unsupported");
    // Other global records contain formatting/calculation metadata, not cell values.
  }
  const selected = typeof sheet === "number" ? sheets[sheet] : sheet === undefined ? sheets[0] : sheets.find(s => s.name === sheet);
  invariant(selected, `Sheet ${String(sheet)} not found in [${sheets.map(s => s.name).join(", ")}]`);
  const start = recs.findIndex(r => r.offset === selected.offset); invariant(start >= 0 && recs[start].id === 0x809, "Invalid sheet BOF offset");
  const rows: Record<string, string>[] = []; let pending: { row: number; col: number } | undefined, ended = false;
  function put(row: number, col: number, value: string): void { invariant(row < 65536 && col < 256, "BIFF8 cell out of range"); while (rows.length <= row) rows.push({}); rows[row][column(col)] = value; }
  for (let i = start + 1; i < recs.length; i++) {
    const r = recs[i], d = view(r.data); if (r.id === 0x0a) { ended = true; break; }
    if (r.id === 0x207) { invariant(pending, "STRING without cached string FORMULA"); const parts = [r.data]; while (recs[i + 1]?.id === 0x3c) parts.push(recs[++i].data); put(pending.row, pending.col, new Segments(parts).string()); pending = undefined; continue; }
    if (![0xfd, 0x204, 0x203, 0x27e, 0xbd, 0x06, 0x205].includes(r.id)) continue; // BLANK/MULBLANK and formatting records intentionally omitted.
    invariant(r.data.length >= 6, "Truncated BIFF cell"); const row = d.getUint16(0, true), col = d.getUint16(2, true);
    if (r.id === 0xfd) { invariant(r.data.length === 10, "Invalid LABELSST"); const index = d.getUint32(6, true); invariant(index < strings.length, "LABELSST index out of range"); put(row, col, strings[index]); }
    else if (r.id === 0x204) put(row, col, new Segments([r.data.subarray(6)]).string());
    else if (r.id === 0x203) { invariant(r.data.length === 14, "Invalid NUMBER"); put(row, col, String(d.getFloat64(6, true))); }
    else if (r.id === 0x27e) { invariant(r.data.length === 10, "Invalid RK"); put(row, col, String(rk(d.getUint32(6, true)))); }
    else if (r.id === 0xbd) { const last = d.getUint16(r.data.length - 2, true); invariant(last >= col && r.data.length === 6 + 6 * (last - col + 1), "Invalid MULRK"); for (let c = col; c <= last; c++) put(row, c, String(rk(d.getUint32(6 + (c - col) * 6, true)))); }
    else if (r.id === 0x205) { invariant(r.data.length === 8, "Invalid BOOLERR"); put(row, col, r.data[7] ? `#ERROR(${r.data[6]})` : String(r.data[6])); }
    else { invariant(r.data.length >= 20, "Invalid FORMULA"); if (d.getUint16(12, true) !== 0xffff) put(row, col, String(d.getFloat64(6, true))); else if (r.data[6] === 0) { invariant(!pending, "Unresolved formula STRING"); pending = { row, col }; } else if (r.data[6] === 1) put(row, col, String(r.data[8])); else if (r.data[6] === 2) put(row, col, `#ERROR(${r.data[8]})`); else { invariant(r.data[6] === 3, "Unknown formula result type"); put(row, col, ""); } }
  }
  invariant(ended && !pending, "Missing sheet EOF or formula STRING"); return rows;
}
