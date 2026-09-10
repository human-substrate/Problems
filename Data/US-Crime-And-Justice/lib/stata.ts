// stata.ts — minimal streaming reader for Stata .dta release 117/118 files (little-endian).
// Reads only the variables you ask for, row by row, so a 600 MB GSS cumulative file
// needs a few MB of memory. No dependencies. Numeric variables only (strings skipped).
//
//   const rows = await readDta(path, ["year", "happy", "wtssall"]);   // Array<Record<string, number|null>>
//
// Stata missing values (., .a … .z) come back as null. Format reference: Stata "dta" help, release 118.

import { open } from "node:fs/promises";

const TYPE_BYTE = 65530, TYPE_INT = 65529, TYPE_LONG = 65528, TYPE_FLOAT = 65527, TYPE_DOUBLE = 65526, TYPE_STRL = 32768;

function width(t: number): number {
  if (t === TYPE_BYTE) return 1;
  if (t === TYPE_INT) return 2;
  if (t === TYPE_LONG) return 4;
  if (t === TYPE_FLOAT) return 4;
  if (t === TYPE_DOUBLE) return 8;
  if (t === TYPE_STRL) return 8;
  if (t >= 1 && t <= 2045) return t; // str#
  throw new Error(`unsupported stata type ${t}`);
}

function readNum(buf: Buffer, off: number, t: number): number | null {
  switch (t) {
    case TYPE_BYTE: { const v = buf.readInt8(off); return v > 100 ? null : v; }
    case TYPE_INT: { const v = buf.readInt16LE(off); return v > 32740 ? null : v; }
    case TYPE_LONG: { const v = buf.readInt32LE(off); return v > 2147483620 ? null : v; }
    case TYPE_FLOAT: { const v = buf.readFloatLE(off); return v > 1.701e38 || !Number.isFinite(v) ? null : v; }
    case TYPE_DOUBLE: { const v = buf.readDoubleLE(off); return v > 8.988e307 || !Number.isFinite(v) ? null : v; }
    default: return null;
  }
}

export async function readDta(path: string, wanted: string[], onRow?: (r: Record<string, number | null>) => void): Promise<Record<string, number | null>[]> {
  const fh = await open(path, "r");
  try {
    const head = Buffer.alloc(4096);
    await fh.read(head, 0, 4096, 0);
    const htxt = head.toString("latin1");
    const release = Number(htxt.match(/<release>(\d+)<\/release>/)?.[1]);
    if (release !== 117 && release !== 118) throw new Error(`unsupported dta release ${release}`);
    if (!htxt.includes("<byteorder>LSF</byteorder>")) throw new Error("big-endian dta not supported");
    const kOff = htxt.indexOf("<K>") + 3;
    const K = head.readUInt16LE(kOff);
    const nOff = htxt.indexOf("<N>") + 3;
    const N = release === 118 ? Number(head.readBigUInt64LE(nOff)) : head.readUInt32LE(nOff);
    // <map> holds 14 8-byte offsets: 0 stata_dta, 1 map, 2 variable_types, 3 varnames, 4 sortlist, 5 formats,
    // 6 value_label_names, 7 variable_labels, 8 characteristics, 9 data, 10 strls, 11 value_labels, 12 /stata_dta, 13 eof
    const mapOff = htxt.indexOf("<map>") + 5;
    const map: number[] = [];
    for (let i = 0; i < 14; i++) map.push(Number(head.readBigUInt64LE(mapOff + i * 8)));
    const nameLen = release === 118 ? 129 : 33;
    const types: number[] = [];
    const tbuf = Buffer.alloc(K * 2);
    await fh.read(tbuf, 0, K * 2, map[2] + "<variable_types>".length);
    for (let i = 0; i < K; i++) types.push(tbuf.readUInt16LE(i * 2));
    const nbuf = Buffer.alloc(K * nameLen);
    await fh.read(nbuf, 0, K * nameLen, map[3] + "<varnames>".length);
    const names: string[] = [];
    for (let i = 0; i < K; i++) {
      const s = nbuf.subarray(i * nameLen, (i + 1) * nameLen).toString("latin1");
      names.push(s.slice(0, s.indexOf("\0") < 0 ? nameLen : s.indexOf("\0")));
    }
    const widths = types.map(width);
    const rowW = widths.reduce((a, b) => a + b, 0);
    const offs: number[] = [];
    let acc = 0;
    for (const w of widths) { offs.push(acc); acc += w; }
    const cols = wanted.map((w) => {
      const i = names.indexOf(w);
      if (i < 0) throw new Error(`variable not found: ${w}`);
      return { name: w, off: offs[i], type: types[i] };
    });
    const dataStart = map[9] + "<data>".length;
    const out: Record<string, number | null>[] = [];
    const CHUNK_ROWS = Math.max(1, Math.floor((32 * 1024 * 1024) / rowW));
    const cbuf = Buffer.alloc(CHUNK_ROWS * rowW);
    let row = 0;
    while (row < N) {
      const n = Math.min(CHUNK_ROWS, N - row);
      const { bytesRead } = await fh.read(cbuf, 0, n * rowW, dataStart + row * rowW);
      if (bytesRead < n * rowW) throw new Error(`short read at row ${row}`);
      for (let r = 0; r < n; r++) {
        const rec: Record<string, number | null> = {};
        for (const c of cols) rec[c.name] = readNum(cbuf, r * rowW + c.off, c.type);
        if (onRow) onRow(rec); else out.push(rec);
      }
      row += n;
    }
    return out;
  } finally {
    await fh.close();
  }
}
