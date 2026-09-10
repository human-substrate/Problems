import { mkdir } from "node:fs/promises";
import { join } from "node:path";
export type Row = Record<string, string>;
export type Annual = Record<string, number>;
export const DIR = join(import.meta.dir, "..");
export const CACHE = join(DIR, ".cache");
export const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36";
export function invariant(cond: unknown, msg: string): asserts cond { if (!cond) throw new Error(`InvariantViolation: ${msg}`); }
export const round = (n: number, d = 2): number => Number(n.toFixed(d));
export async function getText(url: string, format: "html" | "json" = "html"): Promise<string> {
  const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(90000) });
  const text = await r.text();
  invariant(r.ok, `HTTP ${r.status} ${url}: ${text.slice(0, 200)}`);
  invariant((r.headers.get("content-type") ?? "").includes(format === "json" ? "json" : "text/html"), `${url}: unexpected content-type ${r.headers.get("content-type")}`);
  invariant(text.length > 20 && (format === "json" || /<\/html>/i.test(text)), `${url}: empty or truncated ${format}`);
  return text;
}
export async function getJSON(url: string): Promise<unknown> { return JSON.parse(await getText(url, "json")) as unknown; }
export async function download(url: string, name: string): Promise<string> {
  invariant(/^[\w.-]+$/.test(name), `Unsafe cache name ${name}`);
  await mkdir(CACHE, { recursive: true });
  const path = join(CACHE, name);
  if (await Bun.file(path).exists()) return path; // Parsers validate cached bytes on every use.
  const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(180000) });
  const bytes = Buffer.from(await r.arrayBuffer());
  invariant(r.ok, `HTTP ${r.status} ${url}: ${bytes.toString("utf8", 0, 200)}`);
  const type = r.headers.get("content-type") ?? "";
  invariant(/excel|spreadsheet|octet-stream|pdf|zip/i.test(type), `${url}: unexpected content-type ${type}`);
  invariant(bytes.length > 1000 && (bytes.subarray(0, 2).toString() === "PK" || bytes.subarray(0, 4).toString() === "%PDF" || bytes.subarray(0, 8).toString("hex") === "d0cf11e0a1b11ae1"), `${url}: unexpected binary shape (${bytes.length} bytes)`);
  const length = r.headers.get("content-length");
  if (length && !r.headers.get("content-encoding")) invariant(bytes.length === Number(length), `${url}: truncated response`);
  await Bun.write(path, bytes);
  console.log(`PASS fetch ${name}: HTTP ${r.status}; ${bytes.length} bytes; ${type}`);
  return path;
}
export async function command(args: string[]): Promise<string> {
  const p = Bun.spawn(args, { stdout: "pipe", stderr: "pipe" });
  const [out, err, code] = await Promise.all([new Response(p.stdout).text(), new Response(p.stderr).text(), p.exited]);
  invariant(code === 0, `${args[0]} exit ${code}: ${err.slice(0, 300)}`);
  return out;
}
export function numeric(raw: string | undefined, label: string): number {
  invariant(raw !== undefined && /^-?\d[\d,]*(\.\d+)?$/.test(raw.trim()), `${label}: invalid numeric cell ${JSON.stringify(raw)}`);
  return Number(raw.replaceAll(",", ""));
}
