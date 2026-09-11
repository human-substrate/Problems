import { mkdir, writeFile, appendFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
export type Annual = Record<string, number>;
export const ROOT = resolve(import.meta.dir, "..");
export function invariant(ok: unknown, message: string): asserts ok { if (!ok) throw new Error(`InvariantViolation: ${message}`); }
export async function write(path: string, value: string, append = false) {
  invariant(resolve(ROOT, path).startsWith(ROOT + "/") && value.length > 0, `invalid write: ${path}`);
  await mkdir(dirname(resolve(ROOT, path)), { recursive: true });
  if (append) await appendFile(resolve(ROOT, path), value); else await writeFile(resolve(ROOT, path), value);
}
export function csv(text: string): string[][] {
  const rows: string[][] = []; let row: string[] = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') { if (quoted && text[i + 1] === '"') { field += '"'; i++; } else quoted = !quoted; }
    else if (!quoted && (c === "," || c === "\n")) { row.push(field.trim()); field = ""; if (c === "\n") { rows.push(row); row = []; } }
    else field += c;
  }
  invariant(!quoted, "unclosed CSV quote");
  if (field || row.length) { row.push(field.trim()); rows.push(row); }
  return rows;
}
export function num(s: string): number { const v = s?.replaceAll(",", "").trim(); return v && /^-?\d+(\.\d+)?$/.test(v) ? Number(v) : NaN; }
export function year(s: string): string | undefined { return s?.match(/^(\d{4})(?:$|\*|\/)/)?.[1]; }
export function vertical(rows: string[][], col: number): Annual {
  const data: Annual = {};
  for (const r of rows) { const y = year(r[0]), v = num(r[col]); if (y && Number.isFinite(v)) { invariant(!(y in data), `duplicate year ${y}`); data[y] = v; } }
  invariant(Object.keys(data).length > 0, "empty vertical table"); return data;
}
export function stitch(a: Annual, b: Annual, label: string): Annual {
  const overlap = Object.keys(a).filter(y => y in b);
  invariant(overlap.length > 0, `${label}: no overlap to prove stitch`);
  for (const y of overlap) invariant(a[y] === b[y], `${label}: overlap ${y}: ${a[y]} != ${b[y]}`);
  console.log(`PASS overlap ${label}: ${overlap.join(",")}`); return { ...a, ...b };
}
export const plain = (s: string) => s.replace(/<[^>]*>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/\s+/g, " ").trim();
