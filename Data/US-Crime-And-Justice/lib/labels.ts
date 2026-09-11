import { open } from "node:fs/promises";
import { invariant } from "./io.ts";
// Reads release-118 embedded value labels; numeric observations remain in the supplied streaming reader.
export async function valueLabels(path: string, wanted: string[]) {
  const f = await open(path, "r");
  try {
    const read = async (at: number, n: number) => { const b = Buffer.alloc(n); const r = await f.read(b, 0, n, at); invariant(r.bytesRead === n, "short label read"); return b; };
    const h = await read(0, 4096), s = h.toString("latin1");
    invariant(s.includes("<release>118</release>") && s.includes("<byteorder>LSF</byteorder>"), "label reader requires little-endian release 118");
    const k = h.readUInt16LE(s.indexOf("<K>") + 3), m = s.indexOf("<map>") + 5;
    const offsets = Array.from({ length: 14 }, (_, i) => Number(h.readBigUInt64LE(m + i * 8)));
    const names = await read(offsets[3] + 10, k * 129), labels = await read(offsets[6] + 19, k * 129);
    const z = (b: Buffer) => b.toString("utf8").split("\0")[0];
    const assigned: Record<string, string> = {};
    for (let i = 0; i < k; i++) { const n = z(names.subarray(i * 129, (i + 1) * 129)); if (wanted.includes(n)) assigned[n] = z(labels.subarray(i * 129, (i + 1) * 129)); }
    invariant(Object.keys(assigned).length === wanted.length, "missing variable-label association");
    const b = await read(offsets[11], offsets[12] - offsets[11]);
    const tables: Record<string, Record<string, string>> = {};
    let p = 14;
    while (b.subarray(p, p + 5).toString() === "<lbl>") {
      p += 5; const len = b.readUInt32LE(p); p += 4;
      const name = z(b.subarray(p, p + 129)); p += 132;
      const start = p, n = b.readUInt32LE(p), textLen = b.readUInt32LE(p + 4), txt = p + 8 + n * 8;
      invariant(txt + textLen <= b.length, "label table bounds");
      if (Object.values(assigned).includes(name)) {
        const table: Record<string, string> = {};
        for (let i = 0; i < n; i++) table[b.readInt32LE(p + 8 + n * 4 + i * 4)] = z(b.subarray(txt + b.readUInt32LE(p + 8 + i * 4), txt + textLen));
        tables[name] = table;
      }
      p = start + len; invariant(b.subarray(p, p + 6).toString() === "</lbl>", "label closing tag"); p += 6;
    }
    const out = Object.fromEntries(wanted.map(v => [v, tables[assigned[v]]]));
    invariant(Object.values(out).every(Boolean), "embedded labels missing"); return out;
  } finally { await f.close(); }
}
