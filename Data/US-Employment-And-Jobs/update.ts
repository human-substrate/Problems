#!/usr/bin/env bun
// update.ts — regenerates every series in this dataset from its primary publisher.
// Run: bun update.ts [--only group1,group2] [--probe FRED_ID]
// Output: series/<key>.json  { _meta: {...provenance, cadence, annualRule}, native: { "YYYY-MM": v }, data: { "YYYY": v } }
//         + index.json. `native` is the publisher's own cadence; `data` is derived from it by annualRule
//         (a year needs at least half its periods before an annual value is written; the current year is
//         written as partialYear/partialThrough). Annual-cadence publishers write `data` only.
// Prerequisites: bun. No API keys required for FRED (public fredgraph.csv). Other groups document
// their own endpoints inline. Values no publisher serves machine-readably are checked in under data/
// with their citations and re-verified against the publisher on refresh.

import { mkdir, writeFile, appendFile } from "node:fs/promises";
import { join } from "node:path";
import { META, type SeriesMeta } from "./lib/meta.ts";

const DIR = import.meta.dir;
const SERIES = join(DIR, "series");
const DATA = join(DIR, "data");
const UA = "substrate-us-employment-and-jobs/1.0 (+https://github.com/danielmiessler/substrate)";
const NOW = new Date().toISOString();
const NOW_YEAR = new Date().getFullYear();
const argAfter = (flag: string) => { const i = process.argv.indexOf(flag); return i >= 0 ? process.argv[i + 1] : null; };
const only = argAfter("--only") ? new Set(argAfter("--only")!.split(",")) : null;

export function invariant(cond: unknown, msg: string): asserts cond { if (!cond) throw new Error(`InvariantViolation: ${msg}`); }
export async function getText(url: string): Promise<string> {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${url}`);
  return r.text();
}
export async function getJSON<T>(url: string): Promise<T> { return JSON.parse(await getText(url)) as T; }
export const round = (n: number, d = 1) => Number(n.toFixed(d));

export type Obs = { date: string; value: number }; // date = YYYY-MM-DD
const PER_YEAR: Record<string, number> = { monthly: 12, quarterly: 4, biweekly: 26, annual: 1 };
const periodKey = (date: string, cadence: string) => cadence === "biweekly" ? date : date.slice(0, 7);

/** Derive annual `data` from native observations by the series' rule; partial current year flagged. */
export function annualize(obs: Obs[], meta: SeriesMeta, dp: number): { data: Record<string, number>; partialYear?: number; partialThrough?: string } {
  const by = new Map<string, Obs[]>();
  for (const o of obs) { const y = o.date.slice(0, 4); if (!by.has(y)) by.set(y, []); by.get(y)!.push(o); }
  const data: Record<string, number> = {};
  // a year needs half its periods before an annual value is written — except quarterly instruments, where a
  // single wave (Gallup asked once a year in 2023 and 2024) is the publisher's own annual measurement
  const need = meta.cadence === "quarterly" ? 1 : Math.ceil(PER_YEAR[meta.cadence] / 2);
  let partial: { partialYear?: number; partialThrough?: string } = {};
  for (const [y, os] of by) {
    const full = os.length >= PER_YEAR[meta.cadence] || (meta.cadence === "biweekly" && os.length >= 24);
    const current = Number(y) === NOW_YEAR;
    const lastYear = y === [...by.keys()].sort().pop();
    if (!full && !lastYear && os.length < need) continue; // a stub year at the instrument's start is not an annual value
    if (!full && lastYear && os.length < 1) continue;
    const vals = os.map((o) => o.value);
    const v = meta.annualRule === "year-end" ? vals[vals.length - 1]
      : meta.annualRule === "annual sum" ? (full ? vals.reduce((a, b) => a + b, 0) : NaN)
      : vals.reduce((a, b) => a + b, 0) / vals.length;
    if (!Number.isFinite(v)) continue;
    data[y] = round(v, dp);
    // an incomplete final year is flagged whether it is the current year or the year the publisher stopped
    if (lastYear && !full) partial = { partialYear: Number(y), partialThrough: os[os.length - 1].date.slice(0, 7) };
  }
  return { data, ...partial };
}

const written: Record<string, { cadence: string; periods: number; years: number; first: string; last: string; latest: number }> = {};
export async function save(key: string, obs: Obs[], bounds: [number, number], dp: number, extraNote = "", extra: { partialYear?: number; partialThrough?: string } = {}) {
  const meta = META[key];
  invariant(meta, `${key}: no meta entry`);
  invariant(obs.length > 0, `${key}: no observations`);
  const sorted = [...obs].sort((a, b) => a.date.localeCompare(b.date));
  for (const o of sorted) invariant(Number.isFinite(o.value) && o.value >= bounds[0] && o.value <= bounds[1], `${key} ${o.date}: ${o.value} outside [${bounds}]`);
  const native: Record<string, number> = {};
  if (meta.cadence !== "annual") for (const o of sorted) native[periodKey(o.date, meta.cadence)] = round(o.value, dp);
  const ann = meta.cadence === "annual"
    ? { data: Object.fromEntries(sorted.map((o) => [o.date.slice(0, 4), round(o.value, dp)])) }
    : annualize(sorted, meta, dp);
  Object.assign(ann, extra); // an annual publisher's own year-to-date figure (Challenger 2026 through August)
  const years = Object.keys(ann.data);
  invariant(years.length >= 1, `${key}: no annual values`); // a young phenomenon series may have one; the site keeps such series off the annual almanac rows (A17)
  await mkdir(SERIES, { recursive: true });
  const first = sorted[0].date, last = sorted[sorted.length - 1].date;
  await writeFile(join(SERIES, `${key}.json`), JSON.stringify({
    _meta: { key, ...meta, note: meta.note + (extraNote ? " " + extraNote : ""), ...(ann.partialYear ? { partialYear: ann.partialYear, partialThrough: ann.partialThrough } : {}),
      coverage: `${years[0]}–${years[years.length - 1]}`, nativeCoverage: meta.cadence === "annual" ? undefined : `${periodKey(first, meta.cadence)}–${periodKey(last, meta.cadence)}`, fetched: NOW },
    ...(meta.cadence === "annual" ? {} : { native }),
    data: ann.data,
  }, null, 2));
  written[key] = { cadence: meta.cadence, periods: sorted.length, years: years.length, first: periodKey(first, meta.cadence), last: periodKey(last, meta.cadence), latest: sorted[sorted.length - 1].value };
  console.log(`✓ ${key.padEnd(26)} ${meta.cadence.padEnd(9)} ${periodKey(first, meta.cadence)}–${periodKey(last, meta.cadence)} (${sorted.length} periods, ${years.length}y)  latest ${sorted[sorted.length - 1].value}`);
}
const errors: Record<string, string> = {};
export async function run(group: string, fn: () => Promise<void>) {
  if (only && !only.has(group)) return;
  try { await fn(); } catch (e) { errors[group] = String(e); console.error(`✗ ${group}: ${String(e).slice(0, 400)}`); }
}

// ---------- FRED (public fredgraph.csv — full history, no key) ----------
export async function fredObs(id: string, start = "1900-01-01"): Promise<Obs[]> {
  const text = await getText(`https://fred.stlouisfed.org/graph/fredgraph.csv?id=${id}`);
  const obs: Obs[] = [];
  for (const line of text.trim().split("\n").slice(1)) {
    const [date, v] = line.split(",");
    if (v && v !== "." && date >= start) obs.push({ date, value: Number(v) });
  }
  invariant(obs.length > 0, `${id}: no observations`);
  return obs;
}
// Indeed's postings indices are DAILY on FRED; the publisher's own charts are 7-day trailing; we store
// the monthly mean of the daily values so the series compares with the monthly BLS/JOLTS series.
export function toMonthlyMean(obs: Obs[], dp: number): Obs[] {
  const by = new Map<string, number[]>();
  for (const o of obs) { const k = o.date.slice(0, 7); if (!by.has(k)) by.set(k, []); by.get(k)!.push(o.value); }
  return [...by].map(([k, v]) => ({ date: `${k}-01`, value: round(v.reduce((a, b) => a + b, 0) / v.length, dp) }));
}
export function quarterly(obs: Obs[]): Obs[] { return obs.map((o) => ({ ...o, date: o.date.slice(0, 7) + "-01" })); }

type FredSpec = { key: string; id: string; start?: string; bounds: [number, number]; dp: number; t?: (o: Obs[]) => Obs[]; scale?: number };
export const FRED: FredSpec[] = [
  { key: "cesComputerSystemsDesign", id: "CES6054150001", bounds: [300, 4000], dp: 1 },
  { key: "cesInformation", id: "USINFO", bounds: [1000, 5000], dp: 0 },
  { key: "cesComputingInfrastructure", id: "CES5051800001", bounds: [100, 1500], dp: 1 },
  { key: "cesTemporaryHelp", id: "TEMPHELPS", bounds: [500, 4000], dp: 1 },
  { key: "cesBusinessSupport", id: "CES6056140001", bounds: [300, 1500], dp: 1 },
  { key: "joltsOpenings", id: "JTSJOL", bounds: [1500, 15000], dp: 0 },
  { key: "joltsHires", id: "JTSHIL", bounds: [2000, 9000], dp: 0 },
  { key: "joltsLayoffs", id: "JTSLDL", bounds: [800, 15000], dp: 0 },
  { key: "initialClaims", id: "ICSA", bounds: [100000, 7000000], dp: 0, t: (o) => toMonthlyMean(o, 0) },
  { key: "genAiAdoptionWork", id: "RPSGENAIUSAGESHAREWORK", bounds: [5, 95], dp: 1, t: quarterly },
  { key: "indeedPostingsAll", id: "IHLIDXUS", bounds: [40, 200], dp: 1, t: (o) => toMonthlyMean(o, 1) },
  { key: "indeedPostingsSoftware", id: "IHLIDXUSTPSOFTDEVE", bounds: [30, 300], dp: 1, t: (o) => toMonthlyMean(o, 1) },
  { key: "indeedPostingsCustomerService", id: "IHLIDXUSTPCUSTSERV", bounds: [30, 300], dp: 1, t: (o) => toMonthlyMean(o, 1) },
];

if (argAfter("--probe")) {
  const id = argAfter("--probe")!;
  const obs = await fredObs(id, "2018-01-01");
  console.log(id, obs.length, "obs", obs[0], "…", obs[obs.length - 1]);
  process.exit(0);
}

await run("fred", async () => {
  for (const s of FRED) {
    let obs = await fredObs(s.id, s.start ?? "1900-01-01");
    if (s.scale) obs = obs.map((o) => ({ ...o, value: o.value * s.scale! }));
    if (s.t) obs = s.t(obs);
    await save(s.key, obs, s.bounds, s.dp);
  }
});

// ---------- NY Fed: The Labor Market for Recent College Graduates (CSV behind the interactive) ----------
// Monthly rows, seasonally adjusted 3-month moving averages, from 1990-01; published quarterly.
// Unemployment file columns: Date,Young workers,All workers,Recent graduates,College graduates,NBER
// Underemployment file columns: Date,Recent graduates,College graduates,NBER
const NYFED = "https://www.newyorkfed.org/medialibrary/research/interactives/data/college-labor-market/";
function nyfedCsv(text: string, col: string): Obs[] {
  const [head, ...rows] = text.trim().split(/\r?\n/);
  const cols = head.split(",").map((s) => s.trim());
  const ci = cols.indexOf(col);
  invariant(ci > 0, `NY Fed column "${col}" not in header: ${head}`);
  return rows.map((r) => r.split(",")).filter((c) => c[ci] && c[ci] !== "").map((c) => {
    const [m, d, y] = c[0].split("/").map(Number); // M/D/YYYY
    return { date: `${y}-${String(m).padStart(2, "0")}-01`, value: Number(c[ci]) };
  });
}
await run("nyfed", async () => {
  const un = await getText(NYFED + "college-labor-unemployment-data.csv");
  await save("recentGradUnemployment", nyfedCsv(un, "Recent graduates"), [1, 25], 2);
  // the all-workers rate from the same file is kept beside it as a checked companion (not a site row)
  await Bun.write(join(DATA, "nyfed-all-workers.json"), JSON.stringify({ source: NYFED + "college-labor-unemployment-data.csv", column: "All workers", fetched: NOW,
    data: Object.fromEntries(nyfedCsv(un, "All workers").map((o) => [o.date.slice(0, 7), round(o.value, 2)])) }, null, 1));
  const ue = await getText(NYFED + "college-labor-underemployment-data.csv");
  await save("recentGradUnderemployment", nyfedCsv(ue, "Recent graduates"), [20, 60], 2);
});

// ---------- Census BTOS: AI questions, biweekly, two wording segments in two workbooks ----------
// Every path under /hfp/btos/downloads/ returns HTTP 200; a missing file is a small HTML shell, so the
// download is verified as a zip (xlsx) by its magic bytes before parsing.
import { sheetRows } from "./lib/xlsx.ts";
const BTOS = "https://www.census.gov/hfp/btos/downloads/";
const BROWSER_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36";
async function downloadXlsx(url: string, name: string): Promise<string> {
  await mkdir(join(DIR, "work"), { recursive: true });
  const p = join(DIR, "work", name);
  const r = await fetch(url, { headers: { "User-Agent": BROWSER_UA } });
  invariant(r.ok, `HTTP ${r.status} ${url}`);
  const buf = new Uint8Array(await r.arrayBuffer());
  invariant(buf.length > 20000 && buf[0] === 0x50 && buf[1] === 0x4b, `${name}: not an xlsx (${buf.length} bytes) — Census serves an HTML shell for unknown paths`);
  await Bun.write(p, buf);
  return p;
}
const excelDate = (serial: number) => new Date(Date.UTC(1899, 11, 30) + serial * 86400000).toISOString().slice(0, 10);
function btosSeries(rows: Record<string, string>[], dates: Record<string, string>[], qid: string, wantText: string): Obs[] {
  const head = rows[0], row = rows.find((r) => r.A === qid && r.D === "Yes");
  invariant(row, `BTOS question ${qid} Yes row not found`);
  invariant(row.B.includes(wantText), `BTOS question ${qid} wording changed: ${row.B}`);
  // cycle → reference-period end date (column H in the National file is an Excel serial; the AI Core file prints MM/DD/YYYY in column E)
  const refEnd = new Map<string, string>();
  for (const d of dates) {
    // National file: D = cycle, H = reference end (Excel serial). AI Core file: A = cycle, E = reference end (MM/DD/YYYY).
    const national = /^\d{6}$/.test(String(d.D ?? ""));
    const cyc = national ? d.D : d.A; const end = national ? d.H : d.E;
    if (!/^\d{6}$/.test(String(cyc)) || !end) continue;
    refEnd.set(String(cyc), /^\d+$/.test(String(end)) ? excelDate(Number(end)) : (() => { const [m, dd, y] = String(end).split("/"); return `${y}-${m}-${dd}`; })());
  }
  const obs: Obs[] = [];
  for (const [col, cyc] of Object.entries(head)) {
    if (!/^\d{6}$/.test(cyc)) continue;
    const v = row[col];
    if (!v || v === ".") continue;
    const date = refEnd.get(cyc); invariant(date, `BTOS cycle ${cyc} has no reference date`);
    obs.push({ date, value: Number(v.replace("%", "")) });
  }
  invariant(obs.length >= 10, `BTOS ${qid}: only ${obs.length} cycles`);
  return obs;
}
await run("btos", async () => {
  const core = await downloadXlsx(BTOS + "AI%20Core%20Questions.xlsx", "btos-ai-core.xlsx");
  const coreRows = await sheetRows(core, "National Estimates"), coreDates = await sheetRows(core, "Collection and Reference Dates");
  await save("btosAiUseOriginal", btosSeries(coreRows, coreDates, "7", "in producing goods or services"), [0, 60], 1);
  const nat = await downloadXlsx(BTOS + "National.xlsx", "btos-national.xlsx");
  const natRows = await sheetRows(nat, "Response Estimates"), natDates = await sheetRows(nat, "Collection and Reference Dates");
  await save("btosAiUseAnyFunction", btosSeries(natRows, natDates, "7", "in any of its business functions"), [0, 80], 1);
});

// ---------- checked-in citation series (publishers with no machine endpoint) ----------
// Each data/*.json names the page and table it was read from and the read date; refresh = re-read the page.
await run("citations", async () => {
  const g = await Bun.file(join(DATA, "gallup-employee-ai-use.json")).json();
  const waves = Object.entries(g.waves as Record<string, { daily: number; frequent: number; any: number }>);
  await save("gallupAiUseAny", waves.map(([p, w]) => ({ date: p + "-01", value: w.any })), [0, 100], 0);
  await save("gallupAiUseDaily", waves.map(([p, w]) => ({ date: p + "-01", value: w.daily })), [0, 100], 0);
  const b = await Bun.file(join(DATA, "bentley-gallup-ai-jobs.json")).json();
  await save("publicExpectsFewerJobs", Object.entries(b.data as Record<string, number>).map(([y, v]) => ({ date: y + "-06-01", value: v })), [0, 100], 0);
});

// ---------- BLS OEWS occupations: checked-in (bls.gov serves the zips only to a real browser), re-verified against any workbook under work/ ----------
await run("oews", async () => {
  const o = await Bun.file(join(DATA, "oews-occupations.json")).json();
  const { existsSync, readdirSync } = await import("node:fs");
  for (const [key, occ] of Object.entries(o.occupations as Record<string, { soc: string; data: Record<string, number> }>)) {
    for (const [y, v] of Object.entries(occ.data)) {
      const dir = join(DIR, "work", `oesm${y.slice(2)}nat`);
      if (!existsSync(dir)) continue;
      const xlsx = readdirSync(dir).find((f) => f.endsWith(".xlsx")); if (!xlsx) continue;
      const rows = await sheetRows(join(dir, xlsx), 0);
      const head = rows[0], col = (n: string) => Object.entries(head).find(([, t]) => String(t).toUpperCase() === n)?.[0]!;
      const cCode = col("OCC_CODE"), cEmp = col("TOT_EMP"), cGrp = col("O_GROUP");
      const row = rows.find((r) => r[cCode] === occ.soc && /detailed/i.test(String(r[cGrp] ?? "detailed")));
      invariant(row && Number(row[cEmp]) === v, `${key} ${y}: checked-in ${v} != workbook ${row?.[cEmp]}`);
    }
    await save(key, Object.entries(occ.data).map(([y, v]) => ({ date: `${y}-05-01`, value: v })), [10000, 5_000_000], 0);
  }
});

// ---------- Indeed Hiring Lab AI Tracker (GitHub CSV, CC BY 4.0): date,jobcountry,AI_share_postings ----------
await run("indeedai", async () => {
  const text = await getText("https://raw.githubusercontent.com/hiring-lab/ai-tracker/main/AI_posting.csv");
  const obs: Obs[] = [];
  for (const line of text.trim().split("\n").slice(1)) { const [d, c, v] = line.split(","); if (c === "US" && v) obs.push({ date: d, value: Number(v) }); }
  invariant(obs.length > 2000, `AI tracker: only ${obs.length} US rows`);
  await save("indeedAiPostingsShare", toMonthlyMean(obs, 2), [0, 50], 2);
});

// ---------- Ramp AI Index: the national series lives only in the page payload; re-parsed on refresh, checked-in values as the fallback ----------
await run("ramp", async () => {
  const checked = await Bun.file(join(DATA, "ramp-ai-index.json")).json();
  let data: Record<string, number> = checked.data;
  try {
    const html = await getText("https://ramp.com/data/ai-index");
    const i = html.indexOf("adoptionOverall");
    invariant(i > 0, "adoptionOverall not in payload");
    const seg = html.slice(i, i + 20000);
    const live = new Map<string, number>();
    for (const x of seg.matchAll(/date_month\\?"?:\\?"(\d{4}-\d{2}-\d{2})\\?",\\?"adoption_rate_pct\\?":([\d.]+)/g)) { if (live.has(x[1])) break; live.set(x[1], Number(x[2])); }
    invariant(live.size >= Object.keys(checked.data).length, `ramp: live payload has ${live.size} points, checked-in has ${Object.keys(checked.data).length}`);
    for (const [d, v] of Object.entries(checked.data)) invariant(live.get(d) === v, `ramp ${d}: live ${live.get(d)} != checked-in ${v} (Ramp revised history — re-read and update the citation file)`);
    data = Object.fromEntries(live);
  } catch (e) { console.warn(`ramp: live parse failed (${String(e).slice(0, 120)}); using checked-in values`); }
  await save("rampAiIndex", Object.entries(data).map(([d, v]) => ({ date: d, value: v })), [0, 100], 2);
});

// ---------- Challenger AI-attributed job cuts: checked in from the report PDFs ----------
await run("challenger", async () => {
  const c = await Bun.file(join(DATA, "challenger-ai-job-cuts.json")).json();
  const obs = Object.entries(c.data as Record<string, number>).map(([y, v]) => ({ date: `${y}-12-31`, value: v }));
  await save("challengerAiJobCuts", obs, [0, 5_000_000], 0, "", c.partialYear ? { partialYear: c.partialYear, partialThrough: c.partialThrough } : {});
});

// ---------- Stanford Canaries: canaries_age_by_exposure.csv inside a zip on the authors' public bucket ----------
// Header: observation_date,exposure_quintile,Early Career 1 (22-25),Early Career 2 (26-30),Developing (31-34),Mid-Career 1 (35-40),Mid-Career 2 (41-49),Senior (50+),vintage
await run("canaries", async () => {
  const zip = await download("https://storage.googleapis.com/aviary-del-public/release_memos/latest/downloads/canaries_age_by_exposure_results.zip", "canaries.zip");
  const p = Bun.spawn(["unzip", "-p", zip, "canaries_age_by_exposure.csv"], { stdout: "pipe", stderr: "pipe" });
  const csv = await new Response(p.stdout).text();
  invariant((await p.exited) === 0 && csv.length > 1000, "canaries: csv not in zip");
  const [head, ...rows] = csv.trim().split(/\r?\n/);
  const cols = head.split(",");
  const cQ = cols.indexOf("exposure_quintile"), cYoung = cols.findIndex((c) => c.startsWith("Early Career 1")), cMid = cols.findIndex((c) => c.startsWith("Mid-Career 1"));
  invariant(cQ >= 0 && cYoung >= 0 && cMid >= 0, `canaries: header changed: ${head}`);
  const q5 = rows.map((r) => r.split(",")).filter((r) => r[cQ]?.startsWith("Quintile 5"));
  invariant(q5.length >= 50, `canaries: only ${q5.length} quintile-5 rows`);
  await save("canariesYoungExposed", q5.map((r) => ({ date: r[0], value: Number(r[cYoung]) })), [50, 150], 1);
  await save("canariesMidCareerExposed", q5.map((r) => ({ date: r[0], value: Number(r[cMid]) })), [50, 150], 1);
});

// ---------- Yale Budget Lab occupational churn: repository CSV, time,series,variant,value ----------
await run("yale", async () => {
  const text = await getText("https://raw.githubusercontent.com/Budget-Lab-Yale/budget-lab-interactives/main/tools/ai-labor-market-tracker/data/occupational-churn/selected-industries-recent/data.csv");
  const obs: Obs[] = [];
  for (const line of text.trim().split("\n").slice(1)) { const c = line.split(","); if (c[1] === "All Sectors" && c[2] === "rolling" && c[3]) obs.push({ date: c[0].slice(0, 7) + "-01", value: Number(c[3]) }); }
  invariant(obs.length >= 40, `yale: only ${obs.length} all-sector rolling rows`);
  await save("yaleOccupationalChurn", obs, [0, 30], 2);
});
async function download(url: string, name: string): Promise<string> {
  await mkdir(join(DIR, "work"), { recursive: true });
  const p = join(DIR, "work", name);
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  invariant(r.ok, `HTTP ${r.status} ${url}`);
  await Bun.write(p, await r.arrayBuffer());
  return p;
}

// ---------- SEC-filed platform metrics (checked in; per-value filing citations in data/sec-upwork-fiverr-citations.json) ----------
await run("sec", async () => {
  const up = await Bun.file(join(DATA, "upwork-gsv.json")).json();
  await save("upworkGsv", Object.entries(up.data as Record<string, number>).map(([y, v]) => ({ date: `${y}-12-31`, value: v })), [500_000, 20_000_000], 0);
  const fv = await Bun.file(join(DATA, "fiverr-active-buyers.json")).json();
  await save("fiverrActiveBuyers", Object.entries(fv.data as Record<string, number>).map(([y, v]) => ({ date: `${y}-12-31`, value: v })), [500, 10000], 0, "", fv.partialYear ? { partialYear: fv.partialYear, partialThrough: fv.partialThrough } : {});
});

// ---------- other groups are appended below by the research disposition ----------
// (each group documents its endpoint, the exact field read, and every known break)

// ---------- index + log ----------
if (!only || Object.keys(written).length) {
  const existing = await Bun.file(join(DIR, "index.json")).json().catch(() => ({ series: {} }));
  const series: Record<string, unknown> = { ...(existing.series ?? {}) };
  for (const [k, w] of Object.entries(written)) {
    const m = META[k];
    series[k] = { name: m.name, unit: m.unit, source: m.source, cadence: m.cadence, annualRule: m.annualRule, class: m.class, coverage: `${w.first}–${w.last}`, fetched: NOW };
  }
  await writeFile(join(DIR, "index.json"), JSON.stringify({ generated: NOW, dataset: "US-Employment-And-Jobs", series: Object.fromEntries(Object.entries(series).sort()) }, null, 1));
  await appendFile(join(DIR, "update.log"), `${NOW} wrote ${Object.keys(written).length} series${only ? ` (--only ${[...only].join(",")})` : ""}${Object.keys(errors).length ? ` ERRORS ${Object.keys(errors).join(",")}` : ""}\n`);
}
if (Object.keys(errors).length) { console.error(`\n${Object.keys(errors).length} group(s) failed`); process.exit(1); }
console.log(`\nwrote ${Object.keys(written).length} series`);
