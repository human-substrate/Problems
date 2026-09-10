import { afterAll, expect, test } from "bun:test";
import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { xlsRows } from "./xls";

const cache = join(import.meta.dir, "../.cache");
const sources = { ms2: "marital/ms2", hh4: "households/hh4", hh6: "households/hh6", ch1: "children/ch1", ad1: "adults/ad1" };
async function sourceRows(key: keyof typeof sources): Promise<Record<string, string>[]> {
  const path = join(cache, `${key}.xls`);
  if (!(await Bun.file(path).exists())) {
    await mkdir(cache, { recursive: true });
    const url = `https://www2.census.gov/programs-surveys/demo/tables/families/time-series/${sources[key]}.xls`;
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36" } });
    expect(r.ok, `${url}: HTTP ${r.status}`).toBe(true);
    expect(r.headers.get("content-type") ?? "").toMatch(/application\/(vnd.ms-excel|octet-stream)/);
    await Bun.write(path, await r.arrayBuffer());
  } // Cached primary-source bytes are checked by the full CFB/BIFF parser below.
  const rows = await xlsRows(path);
  expect(rows.length).toBeGreaterThan(50); expect(rows.length).toBeLessThan(1000);
  expect(Object.values(rows[1]).join(" ")).toContain(key === "ms2" ? "MS-2" : `${key.slice(0, 2).toUpperCase()}-${key.slice(2)}`);
  return rows;
}
const cases: { key: keyof typeof sources; year: number; col: string; expected: number; section?: string }[] = [
  { key: "ms2", year: 2025, col: "B", expected: 30.8 }, { key: "ms2", year: 2025, col: "C", expected: 28.4 },
  { key: "ms2", year: 1890, col: "B", expected: 26.1 }, { key: "hh4", year: 2025, col: "C", expected: 39741 },
  { key: "hh4", year: 1960, col: "C", expected: 6917 }, { key: "hh6", year: 2025, col: "C", expected: 2.5 },
  { key: "ch1", year: 2025, col: "C", expected: 51202 }, { key: "ad1", year: 2025, col: "D", expected: 19.2, section: ".25 to 34 years" },
];
for (const c of cases) test(`${c.key} ${c.year} column ${c.col}`, async () => {
  const rows = await sourceRows(c.key), start = c.section ? rows.findIndex(r => r.A === c.section) : 0;
  expect(start).toBeGreaterThanOrEqual(0);
  const row = rows.slice(start).find(r => new RegExp(`^\\.*${c.year}(?:[^0-9]|$)`).test(r.A ?? ""));
  expect(row).toBeDefined(); const actual = Number(row![c.col]);
  console.log(`CELL ${c.key} ${c.year} ${c.col}: actual=${actual} expected=${c.expected}`); expect(actual).toBe(c.expected);
});

const scratch = join(import.meta.dir, "../work/xls-reader-tests");
afterAll(async () => { await rm(scratch, { recursive: true, force: true }); });
function record(id: number, payload: Buffer): Buffer { const b = Buffer.alloc(4); b.writeUInt16LE(id); b.writeUInt16LE(payload.length, 2); return Buffer.concat([b, payload]); }
function bof(kind: number): Buffer { const b = Buffer.alloc(16); b.writeUInt16LE(0x600); b.writeUInt16LE(kind, 2); return record(0x809, b); }
function cfb(stream: Buffer, mini: boolean): Buffer {
  const b = Buffer.alloc(512 * (mini ? 5 : 11)), h = b.subarray(0, 512);
  Buffer.from("d0cf11e0a1b11ae1", "hex").copy(h); h.writeUInt16LE(3, 26); h.writeUInt16LE(0xfffe, 28); h.writeUInt16LE(9, 30); h.writeUInt16LE(6, 32);
  h.writeUInt32LE(1, 44); h.writeUInt32LE(1, 48); h.writeUInt32LE(4096, 56); h.writeUInt32LE(mini ? 3 : 0xfffffffe, 60); h.writeUInt32LE(mini ? 1 : 0, 64); h.writeUInt32LE(0xfffffffe, 68); h.fill(0xff, 76);
  h.writeUInt32LE(0, 76); const fat = b.subarray(512, 1024); fat.fill(0xff); fat.writeUInt32LE(0xfffffffd); fat.writeUInt32LE(0xfffffffe, 4);
  for (let i = 2; i < (mini ? 4 : 10); i++) fat.writeUInt32LE(!mini && i < 9 ? i + 1 : 0xfffffffe, i * 4);
  function entry(offset: number, name: string, type: number, start: number, size: number): void { const e = b.subarray(1024 + offset, 1152 + offset); Buffer.from(`${name}\0`, "utf16le").copy(e); e.writeUInt16LE((name.length + 1) * 2, 64); e[66] = type; e.writeUInt32LE(start, 116); e.writeUInt32LE(size, 120); }
  entry(0, "Root Entry", 5, mini ? 2 : 0xfffffffe, mini ? 512 : 0); entry(128, "Workbook", 2, mini ? 0 : 2, mini ? stream.length : 4096);
  stream.copy(b, 1536);
  if (!mini) { b.writeUInt16LE(0, 1536 + stream.length); b.writeUInt16LE(4096 - stream.length - 4, 1536 + stream.length + 2); }
  if (mini) { const mf = b.subarray(2048); mf.fill(0xff); const n = Math.ceil(stream.length / 64); for (let i = 0; i < n; i++) mf.writeUInt32LE(i === n - 1 ? 0xfffffffe : i + 1, i * 4); }
  // Regular stream padding is an ignored BIFF metadata record.
  return b;
}
function synthetic(): Buffer {
  const sstHead = Buffer.alloc(12); sstHead.writeUInt32LE(1); sstHead.writeUInt32LE(1, 4); sstHead.writeUInt16LE(3, 8); sstHead[10] = 0; sstHead[11] = 65;
  const sst = Buffer.concat([record(0xfc, sstHead), record(0x3c, Buffer.from([1, 0xa9, 3, 66, 0]))]);
  const bound = Buffer.alloc(9); bound[6] = 1; bound[8] = 83;
  const globalsLength = bof(5).length + 13 + sst.length + 4; bound.writeUInt32LE(globalsLength);
  const label = Buffer.alloc(10), number = Buffer.alloc(14), rk = Buffer.alloc(10), formula = Buffer.alloc(20), mul = Buffer.alloc(18), numericFormula = Buffer.alloc(20);
  number.writeUInt16LE(1, 2); number.writeDoubleLE(2.5, 6); rk.writeUInt16LE(2, 2); rk.writeUInt32LE((1234 << 2) | 3, 6);
  formula.writeUInt16LE(3, 2); formula.writeUInt16LE(0xffff, 12);
  mul.writeUInt16LE(4, 2); mul.writeUInt32LE((7 << 2) | 2, 6); mul.writeInt32LE((-8 << 2) | 2, 12); mul.writeUInt16LE(5, 16);
  numericFormula.writeUInt16LE(6, 2); numericFormula.writeDoubleLE(9.75, 6);
  return Buffer.concat([bof(5), record(0x85, bound), sst, record(0x0a, Buffer.alloc(0)), bof(0x10), record(0xfd, label), record(0x203, number), record(0x27e, rk), record(0x06, formula), record(0x207, Buffer.from([2, 0, 0, 79, 75])), record(0xbd, mul), record(0x06, numericFormula), record(0x0a, Buffer.alloc(0))]);
}
for (const mini of [false, true]) test(`CFB ${mini ? "miniFAT" : "FAT"}, SST CONTINUE encoding, NUMBER, RK and formula STRING`, async () => {
  await mkdir(scratch, { recursive: true }); const path = join(scratch, `${mini}.xls`); await Bun.write(path, cfb(synthetic(), mini));
  expect(await xlsRows(path, "S")).toEqual([{ A: "AΩB", B: "2.5", C: "12.34", D: "OK", E: "7", F: "-8", G: "9.75" }]);
  await expect(xlsRows(path, "missing")).rejects.toThrow("not found");
});
test("reject OOXML disguise and truncated CFB", async () => {
  await mkdir(scratch, { recursive: true }); const path = join(scratch, "bad.xls"); await Bun.write(path, Buffer.from("PK")); await expect(xlsRows(path)).rejects.toThrow("OOXML");
  await Bun.write(path, cfb(synthetic(), false).subarray(0, 700)); await expect(xlsRows(path)).rejects.toThrow("truncated container");
  const biff5 = synthetic(); biff5.writeUInt16LE(0x500, 4); await Bun.write(path, cfb(biff5, true)); await expect(xlsRows(path)).rejects.toThrow("BIFF5 detected");
});
