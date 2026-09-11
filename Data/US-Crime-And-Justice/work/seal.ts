// Explicit cache sealing step. Updates never reseal; a changed raw source fails hash verification.
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { invariant, write } from "../lib/io.ts";
const entries: Record<string, { url: string; read: string; sha256: string }> = {};
async function add(path: string, url: string) {
  const h = createHash("sha256"); for await (const chunk of createReadStream(path)) h.update(chunk);
  entries[path] = { url, read: "2026-09-10", sha256: h.digest("hex") };
}
for (const y of [13,22,23,24]) for (const f of new Bun.Glob(`.cache/cv${y}/*.csv`).scanSync({cwd: ".", dot: true})) await add(f, `https://bjs.ojp.gov/document/cv${y}.zip`);
for (const y of [22,23]) for (const f of new Bun.Glob(`.cache/ji${y}st/*.csv`).scanSync({cwd: ".", dot: true})) await add(f, `https://bjs.ojp.gov/document/ji${y}st.zip`);
for (const f of new Bun.Glob(".cache/cpus{22,23}st/**/*.csv").scanSync({cwd: ".", dot: true})) await add(f, `https://bjs.ojp.gov/document/cpus${f.includes("22") ? 22 : 23}st.zip`);
for (const f of ["cp23stat01.csv", "cp23stat04.csv"]) await add(`.cache/cp23st/${f}`, "https://bjs.ojp.gov/document/cp23st.zip");
await add(".cache/bop-pop.csv", "https://www.bop.gov/about/statistics/raw_stats/BOP_pastPopulationTotals.csv");
await add(".cache/gallup-crime.html", "https://news.gallup.com/poll/1603/crime.aspx");
await add(".cache/gss_extracted/GSS_stata/gss7224_r3a.dta", "https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip");
for (const f of new Bun.Glob(".cache/ftc-csn/CSVs/*.csv").scanSync({cwd: ".", dot: true})) await add(f,"https://www.ftc.gov/system/files/ftc_gov/data/csn-data-book-2024-csv.zip");
for (let y=2002;y<=2025;y++) await add(y===2025?".cache/ussc.html":`.cache/ussc-${y}.html`, `https://www.ussc.gov/research/${y<2025?"sourcebook/archive/":""}sourcebook-${y}`);
for (let y=2011;y<=2025;y++) await add(`.cache/ic3/${y}.txt`, `https://www.ic3.gov/AnnualReport/Reports/${y}_IC3Report.pdf`);
await add(".cache/ic3/2010.pdf", "https://www.ic3.gov/AnnualReport/Reports/2010_IC3Report.pdf");
await add(".cache/robbery_probe.json", "https://api.usa.gov/crime/fbi/cde/summarized/national/robbery");
for (const f of new Bun.Glob(".cache/{cv*,ji*,cpus*}.zip").scanSync({cwd: ".", dot: true})) await add(f, `https://bjs.ojp.gov/document/${f.split("/").at(-1) === "cpus21_real.zip" ? "cpus21st.zip" : f.split("/").at(-1)}`);
invariant(Object.keys(entries).length > 100, "source inventory incomplete");
await write("sources.json", JSON.stringify({ note: "Offline cached primary-source snapshot; read and SHA-256 sealed on the date below. Preserve .cache with this dataset. Replacing any source requires explicit review and resealing with work/seal.ts.", files: entries },null,2)+"\n");
console.log(`Sealed ${Object.keys(entries).length} cached sources`);
