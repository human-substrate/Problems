import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { ROOT, invariant, csv } from "./io.ts";
export async function checked(path: string) {
  const manifest = await Bun.file(`${ROOT}/sources.json`).json();
  invariant(manifest.files[path], `unsealed source ${path}`);
  { const h = createHash("sha256"); for await (const chunk of createReadStream(`${ROOT}/${path}`)) h.update(chunk); invariant(h.digest("hex")===manifest.files[path].sha256, `source changed: ${path}`); }
  return `${ROOT}/${path}`;
}
export async function text(path: string) { return Bun.file(await checked(path)).text(); }
export async function table(path: string) { return csv(await text(path)); }
