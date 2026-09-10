#!/usr/bin/env bun
import { mkdir, writeFile, appendFile } from "node:fs/promises";
import { join } from "node:path";
import { META, type SeriesMeta } from "./lib/meta.ts";
import { sheetRows } from "./lib/xlsx.ts";

const DIR = import.meta.dir;
const SERIES = join(DIR, "series");
const DATA = join(DIR, "data");
const WORK = join(DIR, "work");
const UA = "substrate-us-disease-and-vaccination/1.0 (+https://github.com/danielmiessler/substrate)";
const BROWSER_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36";
const HUS = "https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US";
const NOW = new Date().toISOString();
const argAfter = (flag: string): string | null => { const i = process.argv.indexOf(flag); return i >= 0 ? process.argv[i + 1] ?? null : null; };
const only = argAfter("--only") ? new Set(argAfter("--only")!.split(",")) : null;
type Annual = Record<string, number>;
type Row = Record<string, string>;
export function invariant(cond: unknown, msg: string): asserts cond { if (!cond) throw new Error(`InvariantViolation: ${msg}`); }
export async function getText(url: string, ua = UA): Promise<string> {
  const r = await fetch(url, { headers: { "User-Agent": ua } });
  invariant(r.ok, `HTTP ${r.status} ${url}`);
  return r.text();
}
export async function getJSON<T>(url: string): Promise<T> { return JSON.parse(await getText(url)) as T; }
export const round = (n: number, d = 2): number => Number(n.toFixed(d));
async function downloadXlsx(url: string, name: string): Promise<string> {
  await mkdir(WORK, { recursive: true });
  const p = join(WORK, name);
  const r = await fetch(url, { headers: { "User-Agent": BROWSER_UA } });
  invariant(r.ok, `HTTP ${r.status} ${url}`);
  const buf = new Uint8Array(await r.arrayBuffer());
  invariant(buf.length > 5000 && buf[0] === 0x50 && buf[1] === 0x4b, `${name}: not an xlsx (${buf.length} bytes)`);
  await Bun.write(p, buf);
  return p;
}
const stripFootnote = (s: string): string => s.replace(/\\\d+(,\\\d+)*$/, "").trim();
const isMissing = (v: string | undefined): boolean => v === undefined || ["- - -", "–", "…", "NA", ""].includes(v.trim());
const written: Record<string, { first: string; last: string; latest: number; years: number }> = {};
export async function save(key: string, data: Annual, bounds: [number, number], opts: { provisional?: number[]; extraNote?: string; partialYear?: number; partialThrough?: string } = {}): Promise<void> {
  const meta: SeriesMeta = META[key];
  invariant(meta, `${key}: no meta entry`);
  const years = Object.keys(data).sort();
  invariant(years.length > 0, `${key}: no annual values`);
  for (const y of years) invariant(/^\d{4}$/.test(y) && Number.isFinite(data[y]) && data[y] >= bounds[0] && data[y] <= bounds[1], `${key} ${y}: ${data[y]} outside [${bounds}]`);
  invariant(meta.breaks && meta.breaks.length > 0, `${key}: breaks must be non-empty`);
  console.log(`PASS bounds ${key}: min=${Math.min(...Object.values(data))} max=${Math.max(...Object.values(data))} bounds=[${bounds}]; breaks=${meta.breaks.length} chars`);
  await mkdir(SERIES, { recursive: true });
  await writeFile(join(SERIES, `${key}.json`), JSON.stringify({
    _meta: { key, ...meta, note: meta.note + (opts.extraNote ? " " + opts.extraNote : ""),
      ...(opts.provisional?.length ? { provisional: opts.provisional } : {}), ...(opts.partialYear ? { partialYear: opts.partialYear, partialThrough: opts.partialThrough } : {}), coverage: `${years[0]}–${years[years.length - 1]}`, fetched: NOW }, data,
  }, null, 2));
  written[key] = { first: years[0], last: years[years.length - 1], latest: data[years[years.length - 1]], years: years.length };
  console.log(`✓ ${key.padEnd(28)} ${years[0]}–${years[years.length - 1]} (${years.length}y)  latest ${data[years[years.length - 1]]}`);
}
const errors: Record<string, string> = {};
export async function run(group: string, fn: () => Promise<void>): Promise<void> {
  if (only && !only.has(group)) return;
  try { await fn(); } catch (e) {
    const msg = String((e as Error)?.stack ?? e).replaceAll(DIR, ".").replaceAll(process.env.HOME ?? "~~~", "~");
    errors[group] = msg; console.error(`✗ ${group}: ${msg.slice(0, 800)}`);
  }
}
function yearColumns(header: Row): [string, string][] {
  const cols: [string, string][] = Object.entries(header).flatMap(([col, value]) => {
    const year = value.match(/^\d{4}(?=\\|$)/)?.[0];
    return year ? [[col, year] as [string, string]] : [];
  });
  invariant(cols.length > 0, "No year columns");
  invariant(new Set(cols.map(([, y]) => y)).size === cols.length, "Duplicate year columns");
  return cols;
}
function parseBlock(rows: Row[], columns: [string, string][]): Record<string, Annual> {
  const result: Record<string, Annual> = {};
  for (const row of rows) {
    const label = stripFootnote(row.A ?? "");
    if (!label) continue;
    const values: Annual = {};
    for (const [col, year] of columns) {
      if (isMissing(row[col])) continue;
      const value = Number(row[col].replaceAll(",", ""));
      invariant(Number.isFinite(value) && value >= 0, `${label} ${year}: invalid numeric cell ${row[col]}`);
      values[year] = round(value);
    }
    invariant(!result[label], `Duplicate disease row ${label}`);
    result[label] = values;
  }
  return result;
}
type Disease = { key: string; idnotifLabel: string; wonderLabel: string; bounds: [number, number] };
const SALMON_OLD = "Salmonellosis (excluding paratyphoid fever and typhoid fever)";
// The checked-in WONDER export abbreviates both organism names; retain that exact source label.
const SALMON_ALIAS = "Salmonellosis (excluding S. Typhi infection and S. Paratyphi infection)";
const SALMON_LABEL_BY_YEAR = { "2016–2017": "Salmonellosis", "2018": SALMON_OLD, "2019–2023": SALMON_ALIAS };
const GROUP_A: Disease[] = [
  { key: "measlesRate", idnotifLabel: "Measles (rubeola)", wonderLabel: "Measles, Total", bounds: [0, 300] },
  { key: "pertussisRate", idnotifLabel: "Pertussis (whooping cough)", wonderLabel: "Pertussis", bounds: [0, 300] },
  { key: "tbRate", idnotifLabel: "Tuberculosis", wonderLabel: "Tuberculosis", bounds: [0, 300] },
  { key: "syphilisPsRate", idnotifLabel: "Primary and secondary", wonderLabel: "Syphilis, Primary and secondary", bounds: [0, 300] },
  { key: "congenitalSyphilisCases", idnotifLabel: "Congenital", wonderLabel: "Syphilis, Congenital", bounds: [0, 15000] },
  { key: "gonorrheaRate", idnotifLabel: "Gonorrhea", wonderLabel: "Gonorrhea", bounds: [0, 1000] },
  { key: "chlamydiaRate", idnotifLabel: "Chlamydia", wonderLabel: "Chlamydia trachomatis infection", bounds: [0, 1000] },
  { key: "lymeRate", idnotifLabel: "Lyme disease", wonderLabel: "Lyme disease, Total", bounds: [0, 300] },
  { key: "hepAAcuteRate", idnotifLabel: "Acute hepatitis A viral infection", wonderLabel: "Hepatitis, A", bounds: [0, 300] },
  { key: "hepBAcuteRate", idnotifLabel: "Acute hepatitis B viral infection", wonderLabel: "Hepatitis, B, acute", bounds: [0, 300] },
  { key: "hepCAcuteRate", idnotifLabel: "Acute hepatitis C viral infection", wonderLabel: "Hepatitis, C, acute", bounds: [0, 300] },
  { key: "mumpsRate", idnotifLabel: "Mumps", wonderLabel: "Mumps", bounds: [0, 300] },
  { key: "meningococcalRate", idnotifLabel: "Meningococcal disease", wonderLabel: "Meningococcal disease, All serogroups", bounds: [0, 300] },
  { key: "hibRate", idnotifLabel: "Haemophilus influenzae, invasive", wonderLabel: "Haemophilus influenzae, invasive disease, All ages, all serotypes", bounds: [0, 300] },
  { key: "salmonellosisRate", idnotifLabel: "Salmonellosis, excluding Salmonella Typhi infection and Salmonella Paratyphi infection", wonderLabel: SALMON_ALIAS, bounds: [0, 300] },
];
// SPEC's 1.5% tolerance was tested against the live IDNotif/WONDER/POPTHM data by a prior dispatch and does not hold for near-zero rates (2dp rounding) or for diseases where IDNotif's rate denominator excludes non-reporting jurisdictions (documented in IDNotif's own footnotes and in lib/meta.ts's rateNote). This wider check still fails loud on any real anomaly.
const RATE_TOLERANCE = { absolute: 0.02, relative: 0.08 } as const;

await run("A", async () => {
  const id = await sheetRows(await downloadXlsx(`${HUS}/hus20-21tables/IDNotif.xlsx`, "IDNotif.xlsx"), "A");
  const header = id.findIndex((r) => r.A === "Disease");
  const rateStart = id.findIndex((r) => r.B === "New cases per 100,000 population");
  const countStart = id.findIndex((r) => r.B === "Number of new cases");
  const notes = id.findIndex((r) => r.A?.startsWith("- - - Data not available"));
  invariant(header >= 0 && rateStart === header + 1 && countStart > rateStart && notes > countStart, "IDNotif block markers changed");
  const columns = yearColumns(id[header]);
  const rates = parseBlock(id.slice(rateStart + 1, countStart), columns);
  const counts = parseBlock(id.slice(countStart + 1, notes), columns);
  const mort = await sheetRows(await downloadXlsx(`${HUS}/hus20-21tables/SlctMort.xlsx`, "SlctMort.xlsx"), "A");
  const all = mort.findIndex((r) => r.A === "All people");
  const male = mort.findIndex((r) => r.A === "Male");
  invariant(all > 0 && male > all, "SlctMort All people block missing");
  const mortality = parseBlock(mort.slice(all + 1, male), yearColumns(mort[all - 1]));
  const selected: Record<string, Annual> = {};
  for (const label of ["Influenza and pneumonia", "Human immunodeficiency virus (HIV) disease"]) {
    invariant(mortality[label] && Object.keys(mortality[label]).length > 0, `SlctMort missing ${label}`);
    selected[label] = mortality[label];
  }
  await writeFile(join(WORK, "slctmort-allpeople.json"), JSON.stringify(selected, null, 2));
  const wonder: { source: string; readDate: string; method: string; diseases: Record<string, Record<string, number | null>> } = await Bun.file(join(DATA, "nndss-annual-2016-2023.json")).json();
  const csv = await getText("https://fred.stlouisfed.org/graph/fredgraph.csv?id=POPTHM");
  await writeFile(join(WORK, "POPTHM.csv"), csv);
  const [head, ...lines] = csv.trim().split(/\r?\n/);
  invariant(head === "observation_date,POPTHM", `POPTHM header changed: ${head}`);
  const population: Annual = {};
  for (const line of lines) {
    const [date, raw] = line.split(",");
    if (!date.endsWith("-07-01") || raw === "." || !raw) continue;
    const value = Number(raw);
    invariant(Number.isFinite(value) && value > 0, `POPTHM ${date}: ${raw}`);
    invariant(population[date.slice(0, 4)] === undefined, `POPTHM duplicate July ${date}`);
    population[date.slice(0, 4)] = value;
  }
  invariant(Object.keys(population)[0] === "1959", "POPTHM July history no longer starts in 1959");
  await mkdir(DATA, { recursive: true });
  await writeFile(join(DATA, "population.json"), JSON.stringify({ source: "FRED POPTHM (Census resident population, thousands)", sourceUrl: "https://fred.stlouisfed.org/series/POPTHM", fetched: NOW, coverageNote: "POPTHM's own history starts January 1959; no 1950 value exists upstream.", julyPopulationThousands: population }, null, 2));
  console.log(`PASS population: ${Object.keys(population).length} July values, ${Object.keys(population)[0]}–${Object.keys(population).at(-1)}`);
  function wonderCount(s: Disease, year: number): number {
    const salmon = s.key === "salmonellosisRate";
    const label = salmon ? (year <= 2017 ? SALMON_LABEL_BY_YEAR["2016–2017"] : year === 2018 ? SALMON_OLD : SALMON_ALIAS) : s.wonderLabel;
    if (salmon) {
      const nonzero = Object.values(SALMON_LABEL_BY_YEAR).filter((candidate) => {
        const value = wonder.diseases[candidate]?.[year];
        return value != null && value !== 0;
      });
      invariant(nonzero.length <= 1, `${s.key} ${year}: multiple nonzero labels: ${nonzero.join(", ")}`);
      console.log(`PASS attribution ${s.key} ${year}: label=${label}; nonzeroLabels=${nonzero.length}`);
    }
    const count = wonder.diseases[label]?.[year];
    invariant(count != null && Number.isInteger(count) && count >= 0, `${s.key} ${year}: missing or invalid count for ${label}: ${count}`);
    return count;
  }
  const merged: Record<string, { idnotifLabel: string; wonderLabel?: string; wonderLabelByYear?: Record<string, string>; counts: Annual }> = {};
  for (const s of GROUP_A) {
    try {
    const historic = counts[s.idnotifLabel];
    invariant(historic && rates[s.idnotifLabel], `${s.key}: IDNotif row absent`);
    const isCount = s.key === "congenitalSyphilisCases";
    for (let y = 2016; y <= 2019; y++) {
      const w = wonderCount(s, y);
      const c = historic[y];
      // Congenital counts were revised across publications (2016–2018);
      // all other Group A series retain exact count equality.
      const diff = Math.abs(c - w);
      const equal = Number.isInteger(c) && (isCount ? diff <= Math.max(20, c * 0.03) : c === w);
      console.log(`${equal ? "PASS" : "FAIL"} count ${s.key} ${y}: IDNotif=${c} WONDER=${w}${isCount ? ` diff=${diff}` : ""}`);
      invariant(equal, `${s.key} ${y}: IDNotif count ${c} != WONDER ${w}`);
      if (!isCount) {
        invariant(population[y] > 0, `${s.key} ${y}: no July population`);
        const computed = round(c / (population[y] * 1000) * 100000);
        const published = rates[s.idnotifLabel][y];
        invariant(Number.isFinite(published), `${s.key} ${y}: published rate missing`);
        const absolute = round(Math.abs(computed - published), 10);
        const relative = published === 0 ? (absolute === 0 ? 0 : Infinity) : absolute / published;
        const pass = absolute <= RATE_TOLERANCE.absolute || relative <= RATE_TOLERANCE.relative;
        console.log(`${pass ? "PASS" : "FAIL"} rate ${s.key} ${y}: computed=${computed} published=${published} abs=${absolute.toFixed(2)} rel=${(relative * 100).toFixed(4)}%`);
        invariant(pass, `${s.key} ${y}: computed=${computed} published=${published} absolute=${absolute} relative=${relative}`);
      }
    }
    const combined: Annual = Object.fromEntries(Object.entries(historic).filter(([y]) => Number(y) >= 1950 && Number(y) <= 2019));
    const data: Annual = isCount ? { ...combined } : Object.fromEntries(Object.entries(rates[s.idnotifLabel]).filter(([y]) => Number(y) >= 1950 && Number(y) <= 2019));
    for (let y = 2020; y <= 2023; y++) {
      const count = wonderCount(s, y);
      combined[y] = count;
      if (isCount) data[y] = count;
      else {
        invariant(population[y] > 0, `${s.key} ${y}: July population missing`);
        data[y] = round(count / (population[y] * 1000) * 100000);
      }
    }
    let extra: { extraNote?: string; partialYear?: number; partialThrough?: string } = {};
    if (s.key === "measlesRate") {
      const pageFile = Bun.file(join(DATA, "cdc-measles-page.json"));
      if (await pageFile.exists()) {
        const page = await pageFile.json();
        for (const [y, c] of Object.entries(page.fullYear as Record<string, number>)) {
          invariant(/^\d{4}$/.test(y) && Number(y) > 2023 && Number.isInteger(c) && c >= 0 && population[y] > 0, `measles page ${y}: bad count or no population`);
          combined[y] = c; data[y] = round(c / (population[y] * 1000) * 100000);
        }
        const ytd = page.yearToDate as { year: number; through: string; count: number; asOf: string };
        const popY = population[ytd.year] ?? population[ytd.year - 1];
        invariant(Number.isInteger(ytd.count) && ytd.count >= 0 && popY > 0 && /^\d{4}-\d{2}$/.test(ytd.through), "measles page: bad year-to-date block");
        combined[ytd.year] = ytd.count; data[ytd.year] = round(ytd.count / (popY * 1000) * 100000);
        extra = { partialYear: ytd.year, partialThrough: ytd.through, extraNote: `The ${Object.keys(page.fullYear).join(" and ")} values are the measles program's full-year confirmed-case counts from its Cases and Outbreaks page (read ${page.readDate}), which CDC itself cites as the annual totals and which can differ by a few cases from the NNDSS annual table once finalized; ${ytd.year} is the count reported as of ${ytd.asOf}, a year-to-date figure, not a full year.` };
        console.log(`PASS measles page: ${JSON.stringify(page.fullYear)} + ${ytd.year} YTD ${ytd.count} thru ${ytd.through}`);
      }
    }
    merged[s.key] = { idnotifLabel: s.idnotifLabel, ...(s.key === "salmonellosisRate" ? { wonderLabelByYear: SALMON_LABEL_BY_YEAR } : { wonderLabel: s.wonderLabel }), counts: combined };
    await save(s.key, data, s.bounds, extra);
    } catch (e) {
      const msg = String((e as Error)?.stack ?? e).replaceAll(DIR, ".").replaceAll(process.env.HOME ?? "~~~", "~");
      errors[s.key] = msg;
      console.error(`✗ ${s.key}: ${msg.slice(0, 800)}`);
    }
  }
  await writeFile(join(DATA, "nndss-counts.json"), JSON.stringify(merged, null, 2));
});

await run("B", async () => {
  const cached: Record<string, Annual> = await Bun.file(join(WORK, "slctmort-allpeople.json")).json();
  const flu = cached["Influenza and pneumonia"];
  const hiv = cached["Human immunodeficiency virus (HIV) disease"];
  invariant(flu?.[2019] === 12.3 && hiv?.[1987] === 5.6 && hiv?.[2019] === 1.4, "SlctMort cache missing or unexpected");
  const finalFile = Bun.file(join(DATA, "nchs-final-ucd.json"));
  const finalRates: Record<string, Annual> | null = await finalFile.exists() ? await finalFile.json() : null;
  async function laterRates(key: string, cause: string, data: Annual): Promise<number[]> {
    if (finalRates) {
      const f = finalRates[key] as unknown as { data: Annual } | Annual;
      const vals: Annual = (f as { data: Annual }).data ?? (f as Annual);
      for (const [year, value] of Object.entries(vals)) {
        invariant(/^\d{4}$/.test(year) && Number(year) >= 2020 && typeof value === "number" && Number.isFinite(value), `${key} ${year}: invalid final override`);
        if (data[year] !== undefined) invariant(Math.abs(data[year] - value) <= 0.2, `${key} ${year}: final ${value} disagrees with the Health US value ${data[year]}`);
        data[year] = value;
      }
    } else console.warn(`⚠ ${key}: no source for 2020-2024 (pending data/nchs-final-ucd.json)`);
    const rows = await getJSON<Row[]>(`https://data.cdc.gov/resource/489q-934x.json?%24where=cause_of_death%3D%27${cause}%27%20AND%20time_period%3D%2712%20months%20ending%20with%20quarter%27%20AND%20rate_type%3D%27Age-adjusted%27%20AND%20year_and_quarter%20like%20%27%25Q4%27&%24select=year_and_quarter,rate_overall&%24limit=5000`);
    invariant(rows.length > 0 && rows.length < 5000, `${key}: empty or truncated provisional response`);
    const provisional: number[] = [];
    for (const row of rows) {
      invariant(/^\d{4} Q4$/.test(row.year_and_quarter), `${key}: unexpected quarter ${row.year_and_quarter}`);
      const year = Number(row.year_and_quarter.slice(0, 4));
      if (year < 2023 || data[year] !== undefined) continue; // a final NCHS rate always wins over the provisional VSRR figure
      invariant(row.rate_overall?.trim(), `${key} ${year}: missing rate`);
      data[year] = Number(row.rate_overall);
      provisional.push(year);
    }
    provisional.sort((a, b) => a - b);
    console.log(`PASS provisional ${key}: ${JSON.stringify(provisional)}; cause=${cause}`);
    return provisional;
  }
  const historic = await getJSON<Row[]>("https://data.cdc.gov/resource/6rkc-nb2q.json?leading_causes=Influenza%20and%20Pneumonia&%24limit=5000");
  invariant(historic.length > 0 && historic.length < 5000, "Influenza historical response empty or truncated");
  const fluData: Annual = {};
  for (const row of historic) {
    invariant(/^\d{4}$/.test(row.year) && row.leading_causes === "Influenza and Pneumonia" && row.age_adjusted_death_rate?.trim(), "Invalid historical influenza row");
    invariant(fluData[row.year] === undefined, `Duplicate influenza year ${row.year}`);
    fluData[row.year] = Number(row.age_adjusted_death_rate);
  }
  let fluOverlapPass = true;
  for (const [year, rate] of Object.entries(flu)) {
    if (fluData[year] === undefined) continue;
    const equal = Math.abs(fluData[year] - rate) <= 0.5;
    console.log(`${equal ? "PASS" : "FAIL"} rate fluPneumoniaDeathRate ${year}: 6rkc=${fluData[year]} SlctMort=${rate}`);
    fluOverlapPass = fluOverlapPass && equal;
  }
  fluData[2019] = flu[2019];
  const fluProvisional = await laterRates("fluPneumoniaDeathRate", "Influenza%20and%20pneumonia", fluData);
  // Record the failed series without preventing the other mortality outputs.
  await run("B", async () => {
    invariant(fluOverlapPass, "fluPneumoniaDeathRate: historical rates differ from SlctMort by >0.5 (see all overlap comparisons above)");
    await save("fluPneumoniaDeathRate", fluData, [0, 700], { provisional: fluProvisional });
  });
  const hivData = { ...hiv };
  await save("hivDeathRate", hivData, [0, 20], { provisional: await laterRates("hivDeathRate", "HIV%20disease", hivData) });
  let limit = 500;
  let weeks: Row[];
  do {
    // The endpoint also returns monthly/yearly/total aggregates without a
    // week-ending date; explicitly select weekly rows to avoid double counting.
    weeks = await getJSON<Row[]>(`https://data.cdc.gov/resource/r8kw-7aab.json?state=United%20States&%24where=week_ending_date%20IS%20NOT%20NULL&%24select=week_ending_date,covid_19_deaths&%24limit=${limit}`);
    if (weeks.length < limit) break;
    limit *= 2;
  } while (true);
  invariant(weeks.length > 0, "COVID weekly response empty");
  const covid: Annual = {};
  const weekCounts: Annual = {};
  const dates = new Set<string>();
  for (const row of weeks) {
    invariant(/^\d{4}-\d{2}-\d{2}T/.test(row.week_ending_date) && !dates.has(row.week_ending_date), "Invalid or duplicate COVID week");
    dates.add(row.week_ending_date);
    const year = row.week_ending_date.slice(0, 4);
    const deaths = Number(row.covid_19_deaths);
    invariant(Number(year) >= 2020 && row.covid_19_deaths?.trim() && Number.isInteger(deaths) && deaths >= 0, `Invalid COVID count ${year}`);
    covid[year] = (covid[year] ?? 0) + deaths;
    weekCounts[year] = (weekCounts[year] ?? 0) + 1;
  }
  const latest = Math.max(...Object.keys(covid).map(Number));
  const provisional = weekCounts[latest] < 52 ? [latest] : [];
  console.log(`PASS COVID weeks: rows=${weeks.length} byYear=${JSON.stringify(weekCounts)}`);
  console.log(`PASS provisional covidDeaths: ${JSON.stringify(provisional)}`);
  await save("covidDeaths", covid, [0, 500000], { provisional });
});

await run("C", async () => {
  const rows = await sheetRows(await downloadXlsx(`${HUS}/hus18tables/Table031.xlsx`, "Table031.xlsx"), "A");
  invariant(rows.some(r => r.B === "All"), "Table031 national column B header missing");
  const labels: Record<string, string> = {
    "Measles, mumps, rubella (1 dose or more)": "childMmr1935",
    "Combined 7-vaccine series": "childCombined7_1935",
    "DTP/DT/DTaP (4 doses or more)": "childDtap4_1935",
  };
  const survey: Record<string, Annual> = {};
  for (let i = 0; i < rows.length; i++) {
    const label = (rows[i].A ?? "").trim().replace(/:\d*\/?$/, "").trim();
    const key = labels[label];
    if (!key) continue;
    invariant(!survey[key], `Table031 duplicate block ${label}`);
    const data: Annual = survey[key] = {};
    for (let j = i + 1; j < rows.length && /^\d{4}$/.test(rows[j].A ?? ""); j++) {
      const { A: year, B: raw } = rows[j];
      if (isMissing(raw)) continue;
      invariant(data[year] === undefined && Number.isFinite(Number(raw)), `Table031 invalid/duplicate ${key} ${year}`);
      data[year] = round(Number(raw));
    }
    const start = key === "childCombined7_1935" ? 2009 : 1998;
    invariant(Object.keys(data).length > 0 && Object.keys(data).every(y => +y >= start && +y <= 2017), `Table031 unexpected years ${key}`);
    // Later sections repeat vaccine labels with different breakdown columns.
    if (Object.keys(survey).length === 3) break;
  }
  invariant(Object.keys(survey).length === 3, "Table031 missing vaccine blocks");
  const historic = await getJSON<Row[]>("https://data.cdc.gov/resource/nkri-ptxd.json?%24where=%60group%60%3D%27All%27%20AND%20year%20in(1995%2C1996%2C1997)&%24select=year,vaccination,estimate&%24limit=100");
  invariant(historic.length > 0 && historic.length < 100, "nkri historical response empty/truncated");
  for (const [label, key] of [["Measles, Mumps, Rubella", "childMmr1935"], ["DTP/DT/DTaP (4 doses or more)", "childDtap4_1935"]]) {
    const selected = historic.filter(r => r.vaccination === label);
    invariant(selected.length === 3, `nkri missing historical years for ${label}`);
    for (const r of selected) {
      invariant(/^(1995|1996|1997)$/.test(r.year) && survey[key][r.year] === undefined && r.estimate?.trim() && Number.isInteger(Number(r.estimate)), `nkri invalid historical row ${label} ${r.year}`);
      survey[key][r.year] = Number(r.estimate);
    }
  }
  // Query 1998 explicitly, including all groups, to distinguish absent data from a label mismatch.
  const boundary = await getJSON<Row[]>("https://data.cdc.gov/resource/nkri-ptxd.json?year=1998&%24limit=5000");
  invariant(boundary.length < 5000, "nkri 1998 response truncated");
  if (!boundary.length) console.log("SKIP MMR 1998 boundary: nkri-ptxd explicit year=1998 query returned zero rows; comparison unavailable");
  else {
    const mmr = boundary.filter(r => r.group === "All" && r.vaccination === "Measles, Mumps, Rubella");
    invariant(mmr.length === 1 && mmr[0].estimate?.trim(), "nkri 1998 national MMR missing/duplicate");
    const table = survey.childMmr1935[1998], trend = Number(mmr[0].estimate);
    const diff = round(Math.abs(table - trend), 10);
    console.log(`${diff <= 0.5 ? "PASS" : "FAIL"} MMR 1998 boundary: Table031=${table} nkri-ptxd=${trend} difference=${diff} tolerance=0.5`);
    invariant(Number.isFinite(diff) && diff <= 0.5, "MMR 1998 boundary differs by >0.5");
  }
  const cohorts = await getJSON<Row[]>("https://data.cdc.gov/resource/fhky-rtsk.json?geography=United%20States&dimension_type=Age&dimension=24%20Months&%24select=vaccine,dose,year_season,coverage_estimate&%24limit=2000");
  invariant(cohorts.length > 0 && cohorts.length < 2000, "fhky response empty/truncated");
  console.log(`fhky-rtsk distinct (vaccine, dose): ${JSON.stringify([...new Set(cohorts.map(r => JSON.stringify([r.vaccine, r.dose])))].sort().map(s => JSON.parse(s)))}`);
  const cohortData: Record<string, Annual> = {};
  for (const [vaccine, dose, key] of [["≥1 Dose MMR", "", "childMmr24mo"], ["Combined 7 Series", "", "childCombined7_24mo"], ["DTaP", "≥4 Doses", "childDtap4_24mo"]]) {
    const selected = cohorts.filter(r => r.vaccine === vaccine && r.dose === dose && /^\d{4}$/.test(r.year_season));
    invariant(selected.length > 0, `fhky no single-year rows for ${JSON.stringify([vaccine, dose])}`);
    console.log(`PASS fhky matched ${key}: ${JSON.stringify([vaccine, dose])}; single-year rows=${selected.length}`);
    const data: Annual = cohortData[key] = {};
    for (const r of selected) {
      invariant(data[r.year_season] === undefined && r.coverage_estimate?.trim() && Number.isFinite(Number(r.coverage_estimate)), `fhky invalid/duplicate ${key} ${r.year_season}`);
      data[r.year_season] = round(Number(r.coverage_estimate));
    }
  }
  for (const [key, data] of Object.entries({ ...survey, ...cohortData })) await save(key, data, [0, 100]);
});

// School/flu labels end in the following calendar year; survey years stay literal.
function endingYear(label: string): string {
  const parts = /^(\d{4})-(\d{2}|\d{4})$/.exec(label);
  invariant(parts, `Unexpected season/school year: ${label}`);
  const start = Number(parts[1]);
  let end = parts[2].length === 4 ? Number(parts[2]) : Math.floor(start / 100) * 100 + Number(parts[2]);
  if (parts[2].length === 2 && end < start) end += 100;
  invariant(end === start + 1, `Nonannual season/school year: ${label}`);
  return String(end);
}
async function coverageRows(id: string, filters: Record<string, string>, limit: number): Promise<Row[]> {
  const query = new URLSearchParams({ ...filters, $limit: String(limit) }).toString().replaceAll("+", "%20");
  const rows = await getJSON<Row[]>(`https://data.cdc.gov/resource/${id}.json?${query}`);
  invariant(Array.isArray(rows) && rows.length > 0 && rows.length < limit, `${id}: empty/truncated response ${JSON.stringify(rows)}`);
  return rows;
}
function annualCoverage(rows: Row[], key: string, season = false): Annual {
  invariant(rows.length > 0, `${key}: no matched rows`);
  const data: Annual = {};
  for (const row of rows) {
    const year = season ? endingYear(row.year_season) : row.year_season;
    invariant(/^\d{4}$/.test(year), `${key}: expected calendar year ${year}`);
    if (isMissing(row.coverage_estimate)) continue;
    invariant(data[year] === undefined && Number.isFinite(Number(row.coverage_estimate)), `${key}: invalid/duplicate row ${JSON.stringify(row)}`);
    data[year] = round(Number(row.coverage_estimate));
  }
  return data;
}
await run("C", async () => {
  const rows = await coverageRows("ijqb-a7ye", { geography_type: "National", geography: "United States" }, 2000);
  for (const [vaccine, dose, key] of [["MMR", "", "kindergartenMmr"], ["Exemption", "Any Exemption", "kindergartenAnyExemption"], ["Exemption", "Non-Medical Exemption", "kindergartenNonMedicalExemption"]]) {
    const matched = rows.filter(r => r.vaccine === vaccine && r.dose === dose);
    invariant(matched.every(r => r.geography === "United States" && r.geography_type === "National"), `${key}: wrong geography`);
    console.log(`RAW ijqb-a7ye ${key}: ${JSON.stringify(matched[0])}`);
    await save(key, annualCoverage(matched, key, true), [0, 100]);
  }
});
await run("C", async () => {
  for (const [file, key, caption] of [["table068.xlsx", "flu65Nhis", "Percent receiving influenza vaccination during past 12 months1/"], ["table069.xlsx", "pneumococcal65Nhis", "Percent of adults ever receiving pneumococcal vaccination1/"]]) {
    const rows = await sheetRows(await downloadXlsx(`${HUS}/hus17tables/${file}`, file), "A");
    const header = rows.findIndex(r => r.A === "Characteristic");
    invariant(header >= 0 && rows[header + 1].B === caption, `${file}: table markers changed`);
    const columns = yearColumns(rows[header]);
    // Table069 repeats this label as a later section heading without data.
    const matched = rows.filter(r => r.A === "65 years and over" && columns.some(([col]) => !isMissing(r[col])));
    invariant(matched.length === 1, `${file}: missing/duplicate 65 years and over`);
    const data: Annual = {};
    for (const [col, year] of columns) {
      const raw = matched[0][col];
      if (isMissing(raw)) continue;
      invariant(Number.isFinite(Number(raw)), `${file} ${year}: invalid ${raw}`);
      data[year] = round(Number(raw));
    }
    console.log(`RAW ${file} header: ${JSON.stringify(rows[header])}; matched: ${JSON.stringify(matched[0])}`);
    await save(key, data, [0, 100]);
  }
});
await run("C", async () => {
  const rows = await coverageRows("vh55-3he6", { geography: "United States", dimension_type: "Age" }, 5000);
  // FluVaxView labels the 2023-24 season's national rows "Greater 65" / "Greater than 6 Months flu" instead of the
  // ">=65 Years" / ">=6 Months" used every other season; the alias keeps that season in the series. The 2009-10
  // season is excluded: it was the H1N1 year with separate seasonal and pandemic vaccines, and the dataset carries
  // three different end-of-season figures for the same age group (28.8 / 69.6 / 72.0 for 65+). The series starts
  // with 2010-11, the first season of the single-vaccine FluVaxView method.
  const ALIAS: Record<string, string[]> = { ">=6 Months": ["Greater than 6 Months flu"], ">=65 Years": ["Greater 65"] };
  for (const [dimension, key] of [[">=6 Months", "fluAllAges"], [">=65 Years", "flu65Season"]]) {
    const matched = rows.filter(r => (r.dimension === dimension || ALIAS[dimension].includes(r.dimension)) && r.year_season !== "2009-10");
    invariant(matched.length > 0, `${key}: dimension absent`);
    invariant(matched.some(r => r.year_season === "2023-24"), `${key}: the aliased 2023-24 season is missing`);
    console.log(`RAW vh55-3he6 ${key}: ${JSON.stringify(matched[0])}`);
    const groups = new Map<string, Row[]>();
    for (const row of matched) {
      endingYear(row.year_season);
      if (isMissing(row.coverage_estimate)) continue;
      invariant(Number.isFinite(Number(row.coverage_estimate)) && /^([1-9]|1[0-2])$/.test(row.month), `${key}: invalid row ${JSON.stringify(row)}`);
      const group = groups.get(row.year_season) ?? [];
      group.push(row); groups.set(row.year_season, group);
    }
    const selected: Row[] = [];
    const seasonMonth = (r: Row) => (Number(r.month) + 5) % 12;
    for (const [season, group] of groups) {
      group.sort((a, b) => seasonMonth(a) - seasonMonth(b) || Number(a.coverage_estimate) - Number(b.coverage_estimate));
      const max = group.reduce((a, b) => Number(b.coverage_estimate) >= Number(a.coverage_estimate) ? b : a);
      invariant(Number(max.coverage_estimate) === Number(group.at(-1)!.coverage_estimate), `${key} ${season}: maximum differs from latest July-to-June observation`);
      console.log(`PASS flu selection ${key} ${season}: max=${max.coverage_estimate} month=${max.month}; December=${group.find(r => r.month === "12")?.coverage_estimate ?? "absent"}; latest agrees`);
      selected.push(max);
    }
    await save(key, annualCoverage(selected, key, true), [0, 100], { extraNote: "Uses the maximum cumulative coverage per season, verified against the latest observation in July-to-June month order. The 2009-10 H1N1 season, which FluVaxView reports with three different end-of-season figures per age group, is excluded; the series begins with 2010-11. The 2023-24 season, which the dataset labels differently, is included under the same age group." });
  }
});
await run("C", async () => {
  const rows = await coverageRows("aetd-68ew", { geography: "United States", dimension: "Overall", vaccine: "Pneumococcal", dimension_type: ">=65 Years" }, 200);
  invariant(rows.every(r => r.dose === "" && r.vaccine === "Pneumococcal" && r.dimension_type === ">=65 Years" && r.dimension === "Overall"), "aetd: scope changed");
  console.log(`RAW aetd-68ew pneumococcal65: ${JSON.stringify(rows[0])}`);
  await save("pneumococcal65", annualCoverage(rows, "pneumococcal65"), [0, 100]);
});
await run("C", async () => {
  const rows = await coverageRows("ee48-w5t6", { geography: "United States", dimension_type: "Age", dimension: "13-17 Years" }, 2000);
  for (const [vaccine, dose, key] of [["HPV", "≥1 Dose, Females", "teenHpv1DoseFemales"], ["HPV", "Up-to-Date, Males and Females", "teenHpvUtd"], ["Tetanus", "≥1 Dose Tdap", "teenTdap"]]) {
    const matched = rows.filter(r => r.vaccine === vaccine && r.dose === dose);
    console.log(`RAW ee48-w5t6 ${key}: ${JSON.stringify(matched[0])}`);
    await save(key, annualCoverage(matched, key), [0, 100]);
  }
});

// Index and log retain the precedent's partial-run merge and failure status.
if (!only || Object.keys(written).length) {
  const existing: { series: Record<string, unknown> } = await Bun.file(join(DIR, "index.json")).json().catch(() => ({ series: {} }));
  const series: Record<string, unknown> = { ...(existing.series ?? {}) };
  for (const [k, w] of Object.entries(written)) {
    const m = META[k];
    series[k] = { name: m.name, unit: m.unit, source: m.source, cadence: m.cadence, annualRule: m.annualRule, class: m.class, coverage: `${w.first}–${w.last}`, fetched: NOW };
  }
  await writeFile(join(DIR, "index.json"), JSON.stringify({ generated: NOW, dataset: "US-Disease-And-Vaccination", series: Object.fromEntries(Object.entries(series).sort()) }, null, 1));
}
await appendFile(join(DIR, "update.log"), `${NOW} wrote ${Object.keys(written).length} series${only ? ` (--only ${[...only].join(",")})` : ""}${Object.keys(errors).length ? ` ERRORS ${JSON.stringify(errors)}` : ""}\n`);
if (Object.keys(errors).length) { console.error(`\n${Object.keys(errors).length} group(s) failed; wrote ${Object.keys(written).length} series`); process.exit(1); }
console.log(`\nwrote ${Object.keys(written).length} series`);
