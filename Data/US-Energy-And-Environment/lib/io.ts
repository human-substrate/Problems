import { mkdir, rename, appendFile } from "node:fs/promises";
import { join } from "node:path";
export type Annual = Record<string, number>;
export const DIR = join(import.meta.dir, "..");
export const CACHE = join(DIR, ".cache");
export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(scrub(`InvariantViolation: ${message}`));
}
export function scrub(value: string): string {
  for (const secret of [process.env.EIA_API_KEY, process.env.EIA_API_KEY ? encodeURIComponent(process.env.EIA_API_KEY) : undefined]) {
    if (secret) value = value.replaceAll(secret, "[REDACTED]");
  }
  return value.replace(/([?&]api_key=)[^&\s"<>]+/gi, "$1[REDACTED]").replaceAll(DIR, ".").replaceAll(process.env.HOME ?? "~UNSET~", "~");
}
export const round = (n: number, digits = 6): number => Number(n.toFixed(digits));
export class SourceError extends Error {}
type Format = "json" | "csv" | "text" | "html" | "zip" | "xlsx" | "xls";
function validate(bytes: Uint8Array, type: string, format: Format, url: string): void {
  invariant(bytes.length > 20, `${url}: empty/truncated ${format}`);
  const head = new TextDecoder().decode(bytes.subarray(0, 300));
  if (format === "zip" || format === "xlsx") {
    invariant(/zip|excel|spreadsheet|octet-stream/i.test(type) && bytes[0] === 80 && bytes[1] === 75, `${url}: invalid ${format}; type=${type}; body head=${head}`);
  } else if (format === "xls") {
    invariant(/excel|octet-stream/i.test(type) && Buffer.from(bytes.subarray(0,8)).toString("hex") === "d0cf11e0a1b11ae1", `${url}: invalid xls; type=${type}; expected OLE2 workbook signature`);
  } else if (format === "json") {
    invariant(/json/i.test(type) && /^[\s]*[\[{]/.test(head), `${url}: invalid JSON; type=${type}; body head=${head}`);
    JSON.parse(new TextDecoder().decode(bytes));
  } else if (format === "html") {
    invariant(/html/i.test(type) && /<html|<!doctype/i.test(head), `${url}: invalid HTML; type=${type}; body head=${head}`);
  } else {
    invariant(/text\/|csv|octet-stream|excel/i.test(type) && !/<html|<!doctype/i.test(head), `${url}: invalid ${format}; type=${type}; body head=${head}`);
    invariant(!bytes.includes(0), `${url}: binary bytes in text response`);
  }
}
async function request(url: string, format: Format): Promise<{bytes: Uint8Array; type: string}> {
  let status: number | undefined;
  try {
    const response = await fetch(url, { headers: { "User-Agent": "Substrate-Energy-Dataset/1.0" }, signal: AbortSignal.timeout(45000) });
    status = response.status;
    const bytes = new Uint8Array(await response.arrayBuffer());
    const type = response.headers.get("content-type") ?? "";
    const evidence = `HTTP ${status} ${url}; content-type=${type}; body head=${new TextDecoder().decode(bytes.subarray(0, 200))}`;
    if (!response.ok) throw new SourceError(evidence);
    try { validate(bytes, type, format, url); } catch (error) { throw new SourceError(`${evidence}; ${error}`); }
    const length = response.headers.get("content-length");
    if (length && !response.headers.get("content-encoding") && bytes.length !== Number(length)) throw new SourceError(`${evidence}; truncated response: ${bytes.length}/${length} bytes`);
    return {bytes, type};
  } catch (error) {
    throw new SourceError(scrub(`${url}; ${status === undefined ? "HTTP status unavailable; no response body (transport failure)" : `HTTP ${status}`}; ${error}`));
  }
}
export async function getText(url: string, format: "csv" | "text" | "html" = "html"): Promise<string> {
  return new TextDecoder().decode((await request(url, format)).bytes);
}
export async function getJSON<T = unknown>(url: string): Promise<T> {
  return JSON.parse(new TextDecoder().decode((await request(url, "json")).bytes)) as T;
}
export async function download(url: string, name: string, format: "zip" | "xlsx" | "xls" = "xlsx"): Promise<string> {
  invariant(/^[\w.-]+$/.test(name), `Unsafe cache name ${name}`);
  await mkdir(CACHE, {recursive: true});
  const path = join(CACHE, name), sidecar = `${path}.json`;
  if (await Bun.file(path).exists() && await Bun.file(sidecar).exists()) {
    const info = await Bun.file(sidecar).json();
    const bytes = new Uint8Array(await Bun.file(path).arrayBuffer());
    // Reuse only this URL's intact, validated download; a different edition is fetched anew.
    if (info.url === scrub(url) && info.sha256 === new Bun.CryptoHasher("sha256").update(bytes).digest("hex")) {
      validate(bytes, info.type, format, url); return path;
    }
  }
  const {bytes, type} = await request(url, format);
  await Bun.write(`${path}.tmp`, bytes); await rename(`${path}.tmp`, path);
  await Bun.write(sidecar, JSON.stringify({url: scrub(url), type, fetched: new Date().toISOString(), sha256: new Bun.CryptoHasher("sha256").update(bytes).digest("hex")}));
  return path;
}
export async function command(args: string[]): Promise<string> {
  const p = Bun.spawn(args, {stdout: "pipe", stderr: "pipe"});
  const timer = setTimeout(() => p.kill(9), 30000);
  try {
    const [out, err, code] = await Promise.all([new Response(p.stdout).text(), new Response(p.stderr).text(), p.exited]);
    invariant(code === 0, `${args[0]} exit ${code}: ${err.slice(0, 200)}`); return out;
  } finally { clearTimeout(timer); }
}
export function numeric(raw: string | undefined, label: string): number {
  invariant(raw !== undefined && /^[-+]?(?:\d+(?:,\d{3})*(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?$/.test(raw.trim()), `${label}: invalid number ${raw}`);
  return Number(raw.replaceAll(",", ""));
}
export function put(data: Annual, year: string, value: number): void {
  invariant(/^\d{4}$/.test(year) && Number.isFinite(value) && data[year] === undefined, `Invalid/duplicate annual point ${year}: ${value}`);
  data[year] = value;
}
export function csv(text: string): string[][] {
  const rows: string[][] = []; let row: string[] = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') { cell += '"'; i++; } else { quoted = !quoted; }
    } else if (c === ',' && !quoted) { row.push(cell.trim()); cell = ""; }
    else if (c === '\n' && !quoted) { row.push(cell.trim()); if (row.some(Boolean)) rows.push(row); row = []; cell = ""; }
    else if (c !== '\r') cell += c;
  }
  invariant(!quoted, "Unclosed CSV quote");
  if (cell || row.length) { row.push(cell.trim()); rows.push(row); }
  return rows;
}
export function links(html: string, base: string): string[] {
  return [...html.matchAll(/href\s*=\s*["']([^"']+)["']/gi)].map(m => new URL(m[1].replaceAll("&amp;", "&"), base).href);
}
export async function mismatch(message: string): Promise<void> {
  await mkdir(join(DIR, "work"), {recursive: true});
  await appendFile(join(DIR, "work/mismatches.md"), scrub(message) + "\n");
}
