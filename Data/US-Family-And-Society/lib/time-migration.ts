import { download, getJSON, getText, invariant, numeric, UA, CACHE, type Annual } from "./io";
import { join } from "node:path";
import { sheetRows } from "./xlsx";
import type { Pipeline, SeriesMeta } from "./meta";

const landing = "https://ohss.dhs.gov/topics/immigration/yearbook/2023";
const dhs = [
  { key: "permanentResidents", name: "Persons obtaining lawful permanent resident status", file: "/sites/default/files/2024-09/2024_0906_ohss_yearbook_lawful_permanent_residents_fy2023_0.xlsx", match: "lawful_permanent", table: "Table 1", marker: "PERSONS OBTAINING LAWFUL PERMANENT", first: 1820, pairs: [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"]], anchors: { 1820: 8390, 2023: 1172910 }, breaks: "Historical immigration admissions and modern lawful permanent residence have different administrative bases. Fiscal 1976 covers 15 months, July 1975–September 1976." },
  { key: "naturalizations", name: "Persons naturalized", file: "/system/files/2025-07/2025_0725_plcy_yearbook_naturalizations_fy2023.xlsx", match: "naturalizations", table: "Table 20", marker: "APPLICATIONS FOR NATURALIZATION FILED", first: 1907, pairs: [["A", "C"]], anchors: { 2023: 878460 }, breaks: "1907 covers September 27, 1906–June 30, 1907. Fiscal 1976 covers 15 months. Military naturalization provisions and reporting change historically." },
  { key: "borderEnforcementActions", name: "DHS initial enforcement actions", file: "/system/files/2026-08/2026_0806_ohss_yearbook_enforcement_fy2023.xlsx", match: "enforcement", table: "Table 33", marker: "DHS INITIAL ENFORCEMENT ACTIONS", first: 1925, pairs: [["A", "B"], ["C", "D"]], anchors: { 1925: 22200, 2023: 2818660 }, breaks: "Definition widens: USBP apprehensions only before 1952; HSI administrative arrests added in 1952; ERO fugitive-program arrests added in 2006 and all ERO administrative arrests in 2008; OFO enforcement encounters/inadmissibles added in 2012; multiple same-day ERO arrests allowed from 2014. Title 42 expulsions included FY2020–23. Fiscal 1976 covers 15 months." },
] satisfies { key: string; name: string; file: string; match: string; table: string; marker: string; first: number; pairs: string[][]; anchors: Record<string, number>; breaks: string }[];

function externalBlock(error: unknown): string | undefined {
  const text = String(error);
  if (/HTTP \d{3}|daily threshold|fetch failed|Unable to connect|timed out|TimeoutError|ConnectionClosed|ECONN/.test(text)) return text;
  return undefined;
}

async function accessibleText(url: string): Promise<{ text: string } | { blocked: string }> {
  try { return { text: await getText(url) }; }
  catch (error) { const blocked = externalBlock(error); if (blocked) return { blocked }; throw error; }
}

function cells(html: string): string[][] {
  return [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map(row => [...row[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(cell => cell[1].replace(/<[^>]*>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/\s+/g, " ").trim()));
}

const atus = [
  { key: "atusSocializing", id: "TUU10101AA01013951", label: /socializing and communicating/i, name: "Time socializing and communicating" },
  { key: "atusTelevision", id: "TUU10101AA01014236", label: /watching (?:TV|television)/i, name: "Time watching television" },
  { key: "atusChildcare", id: "TUU10101AA01010710", label: /^caring for and helping household children/i, name: "Time caring for household children" },
  { key: "atusSleep", id: "TUU10101AA01000247", label: /^sleeping/i, name: "Time sleeping" },
];

function apiAnnual(payload: unknown, id: string): Annual {
  invariant(typeof payload === "object" && payload !== null, "BLS response is not an object");
  const root = payload as Record<string, unknown>;
  invariant(root.status === "REQUEST_SUCCEEDED", `BLS request rejected: ${JSON.stringify(root)}`);
  const results = root.Results as { series?: { seriesID?: string; data?: unknown[] }[] } | undefined;
  invariant(results && Array.isArray(results.series) && results.series.length === 1 && results.series[0].seriesID === id, `BLS unexpected series ${id}`);
  const rows = results.series[0].data;
  invariant(Array.isArray(rows) && rows.length > 0 && rows.length < 100, "BLS empty or excessive response");
  const data: Annual = {};
  for (const raw of rows) {
    invariant(typeof raw === "object" && raw !== null, "BLS invalid observation");
    const r = raw as Record<string, unknown>;
    invariant(typeof r.year === "string" && /^\d{4}$/.test(r.year) && r.period === "A01" && typeof r.value === "string", "BLS invalid annual fields");
    if (r.year === "2020") { invariant(r.value === "-", "BLS unexpected numeric 2020 annual value"); continue; } // BLS publishes a missing-value row for the suspended-collection year.
    invariant(data[r.year] === undefined, `BLS duplicate ${r.year}`);
    data[r.year] = numeric(r.value, `${id} ${r.year}`);
  }
  return data;
}

export async function buildTimeMigration(p: Pipeline): Promise<void> {
  for (const source of dhs) await p.run(source.key, async () => {
    const page = await accessibleText(landing);
    let url = `https://ohss.dhs.gov${source.file}`;
    if ("text" in page) {
      invariant(page.text.includes("2023") && page.text.includes("Yearbook"), "DHS landing markers missing");
      const link = [...page.text.matchAll(/href="([^"]+\.xlsx)"/g)].find(m => m[1].includes(source.match));
      invariant(link, `DHS ${source.match} download missing`);
      url = new URL(link[1], landing).href;
      invariant(new URL(url).hostname === "ohss.dhs.gov", "Unexpected DHS download host");
    } // If the landing is blocked, use the explicit official workbook URL supplied in the source contract.
    let path: string;
    try { path = await download(url, `time-dhs-${dhs.indexOf(source)}.xlsx`); }
    catch (error) { const blocked = externalBlock(error); if (blocked) { p.defer(source.key, blocked); return; } throw error; }
    const rows = await sheetRows(path, source.table);
    invariant(rows.length > 50 && rows.length < 300 && JSON.stringify(rows).includes(source.marker) && JSON.stringify(rows).includes("Source: Office of Homeland Security Statistics"), `${source.table}: truncated or unexpected shape`);
    const data: Annual = {};
    for (const row of rows) for (const [yearColumn, valueColumn] of source.pairs) {
      const match = row[yearColumn]?.match(/^(\d{4})(?:\s+\d+)?$/);
      if (!match) continue; // Header, blank and footnote rows are intentionally excluded.
      const year = match[1];
      invariant(data[year] === undefined, `${source.key} duplicate ${year}`);
      data[year] = numeric(row[valueColumn], `${source.key} ${year}`);
    }
    invariant(Object.keys(data).length === 2023 - source.first + 1, `${source.key}: incomplete annual coverage`);
    for (let year = source.first; year <= 2023; year++) invariant(data[year] !== undefined, `${source.key} missing ${year}`);
    for (const [year, expected] of Object.entries(source.anchors)) { invariant(data[year] === expected, `${source.key} ${year}: ${data[year]} != ${expected}`); console.log(`PASS anchor ${source.key} ${year}: actual=${data[year]} expected=${expected}`); }
    const meta: SeriesMeta = { name: source.name, unit: source.key === "borderEnforcementActions" ? "actions" : "people", source: `DHS Office of Homeland Security Statistics, 2023 Yearbook ${source.table}`, sourceUrl: url, historicalSourceUrls: [landing], note: `Official workbook totals, rounded to the nearest ten for privacy. ${source.breaks}`, goodDirection: "neutral", cadence: "annual", annualRule: "Federal fiscal year; source year labels retained.", class: "migration", breaks: source.breaks };
    await p.save({ key: source.key, data, meta, bounds: [0, 10000000] });
  });
  for (const source of atus) await p.run(source.key, async () => {
    const apiUrl = `https://api.bls.gov/publicAPI/v1/timeseries/data/${source.id}`;
    let data: Annual = {};
    const evidence: string[] = [];
    try { data = apiAnnual(await getJSON(apiUrl), source.id); }
    catch (error) { const blocked = externalBlock(error); if (blocked) evidence.push(blocked); else throw error; }
    for (const start of [2003, 2013, 2023]) {
      const end = Math.min(start + 9, 2025);
      const url = "https://api.bls.gov/publicAPI/v2/timeseries/data/";
      const cache = join(CACHE, `time-bls-${source.id}-${start}.json`);
      let text: string;
      if (await Bun.file(cache).exists()) text = await Bun.file(cache).text();
      else {
      const response = await fetch(url, { method: "POST", headers: { "User-Agent": UA, "Content-Type": "application/json" }, body: JSON.stringify({ seriesid: [source.id], startyear: String(start), endyear: String(end) }), signal: AbortSignal.timeout(90000) });
      text = await response.text();
      if (!response.ok) { evidence.push(`HTTP ${response.status} ${url}: ${text.slice(0, 200)}`); continue; }
      invariant(response.headers.get("content-type")?.includes("json"), "BLS v2 non-JSON response");
      }
      let window: Annual;
      try { window = apiAnnual(JSON.parse(text) as unknown, source.id); }
      catch (error) { const blocked = externalBlock(error); if (blocked) { evidence.push(`HTTP 200 ${url} ${start}–${end}: ${blocked}`); continue; } throw error; }
      const expectedCount = end - start + 1 - (start <= 2020 && end >= 2020 ? 1 : 0);
      invariant(Object.keys(window).length === expectedCount, `BLS v2 ${start}–${end}: expected ${expectedCount} observations`);
      await Bun.write(cache, text);
      for (const [year, value] of Object.entries(window)) {
        invariant(Number(year) >= start && Number(year) <= end && year !== "2020", "BLS v2 unexpected year");
        if (data[year] !== undefined) { invariant(data[year] === value, `${source.key} v1/v2 overlap ${year}: ${data[year]} != ${value}`); console.log(`PASS overlap ${source.key} ${year}: actual=${value} expected=${data[year]} (v1/v2)`); }
        data[year] = value;
      }
    }
    for (const year of [2003, 2025, ...Array.from({ length: 21 }, (_, i) => 2004 + i).filter(y => y !== 2020)]) {
      if (data[year] !== undefined) continue; // Validated v2 historical windows make HTML fallback unnecessary for this year.
      const url = `https://www.bls.gov/tus/tables/a1-${year}.htm`;
      const page = await accessibleText(url);
      if ("blocked" in page) { evidence.push(page.blocked); continue; }
      invariant(/American Time Use Survey/i.test(page.text) && page.text.includes(String(year)), `ATUS ${year}: missing title/year`);
      const rows = cells(page.text);
      invariant(rows.length > 10 && rows.length < 300, `ATUS ${year}: invalid row count ${rows.length}`);
      const row = rows.find(r => source.label.test(r[0] ?? ""));
      invariant(row && row.length >= 4, `ATUS ${year}: ${source.key} row absent`);
      const value = numeric(row[1], `${source.key} ${year}`);
      if (data[year] !== undefined) invariant(data[year] === value, `${source.key} API/table overlap ${year}: ${data[year]} != ${value}`);
      data[year] = value;
    }
    if (source.key === "atusSocializing" && data[2025] !== undefined) { invariant(data[2025] === 0.58, `ATUS socializing2025 ${data[2025]} != .58`); console.log(`PASS anchor atusSocializing 2025: actual=${data[2025]} expected=0.58 (not necessarily shipped)`); }
    if (Object.keys(data).length < 15) { p.defer(source.key, `${apiUrl} recovered only ${Object.keys(data).length} annual points (${Object.keys(data).join(", ")}); no BLS_API_KEY found via has KEY in the parent credential probe. Minimum is 15. Browser-UA table recovery failed: ${evidence.join(" | ")}`); return; }
    await p.save({ key: source.key, data, bounds: [0, 24], meta: { name: source.name, unit: "hours/day", source: "BLS American Time Use Survey Table A-1 and public API", sourceUrl: apiUrl, historicalSourceUrls: ["https://www.bls.gov/tus/tables.htm"], note: "All persons age 15+, average hours per day including people who did not perform the activity. No 2020 annual estimate was published because pandemic-related collection gaps prevented a comparable annual estimate.", goodDirection: "neutral", cadence: "annual", annualRule: "Annual average, all days of week; 2020 omitted.", class: "time", breaks: "2020 is absent because ATUS data collection was suspended during part of the year; activity and population definitions follow each annual table." } });
  });
  await p.run("mothersLaborForce", async () => {
    const url = "https://www.bls.gov/opub/reports/womens-databook/2022/home.htm";
    const page = await accessibleText(url);
    if ("blocked" in page) { p.defer("mothersLaborForce", `${page.blocked}; March CPS Table 7 could not be recovered. The annual-average famee Table 5 is a different series and cannot fill this gap. Accessible March CPS Databook Table 7 resolves the deferral.`); return; }
    invariant(/Women in the labor force/i.test(page.text), "Databook title absent");
    const table = page.text.match(/<table\b[^>]*id=["'](?:table|cps)[-_]?7["'][^>]*>[\s\S]*?<\/table>/i)?.[0];
    if (!table) { p.defer("mothersLaborForce", `${url}: HTTP 200 but no machine-readable Table 7 with table7/cps7 identifier found; March CPS historical column could not be identified without guessing. An accessible labelled Table 7 resolves this deferral.`); return; }
    const rows = cells(table);
    invariant(rows.length > 40 && rows.length < 100 && /own children under 18/i.test(table), "Databook Table 7 unexpected shape");
    const header = rows.find(row => row[0] === "Year" && row.some(cell => /participation rate/i.test(cell)));
    if (!header || /colspan|rowspan/i.test(table)) { p.defer("mothersLaborForce", `${url}: HTTP 200 Table 7 has no unambiguous flat Year/participation-rate column schema; merged or multi-panel headers require primary-source inspection before selecting the mothers-with-children-under-18 rate.`); return; }
    const rateColumn = header.findIndex(cell => /participation rate/i.test(cell));
    const data: Annual = {};
    for (const row of rows) {
      if (!/^\d{4}$/.test(row[0] ?? "")) continue; // Non-year header and footnote rows are intentionally excluded.
      invariant(row.length === header.length, "Databook data/header width mismatch");
      data[row[0]] = numeric(row[rateColumn], `March CPS ${row[0]}`);
    }
    invariant(Object.keys(data).length >= 15 && data[1975] !== undefined && data[2021] !== undefined, "Databook historical coverage incomplete");
    await p.save({ key: "mothersLaborForce", data, bounds: [0, 100], meta: { name: "Labor force participation of mothers", unit: "%", source: "BLS Women in the Labor Force Databook 2022 Table 7", sourceUrl: url, note: "March CPS, mothers with own children under 18. The annual-average famee Table 5 is a different series and is not spliced.", goodDirection: "neutral", cadence: "annual", annualRule: "March observation each year.", class: "time", breaks: "March CPS series only; not comparable to the annual-average family employment table. Historical CPS population-control and survey changes apply." } });
  });
}
