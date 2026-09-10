import { command, download, getJSON, getText, invariant, numeric, type Annual } from "./io.ts";
import type { Pipeline, SeriesMeta } from "./meta.ts";
import { sheetRows } from "./xlsx.ts";

const ACF = "https://acf.gov/sites/default/files/documents/cb/";
const birthsUrl = "https://data.cdc.gov/resource/e6fc-ccez.json?$limit=1000";
const fosterUrls = [ACF + "trends_fostercare_adoption_09thru18.pdf", ACF + "trends_fostercare_adoption_10thru19.pdf", ACF + "national-afcars-data-2013-2022.xlsx", ACF + "2025-afcars-dashboard-printable.pdf"];
const maltreatmentYears = [2009, 2013, 2017, 2019, 2023];
// Re-derived from the actual source tables; differences are edition revisions, not equality failures.
const overlapFixtures: Record<string, Record<string, [number, number]>> = {
  AFCARS2019: { 2010: [411000, 407000], 2011: [397000, 392000], 2012: [396000, 392000], 2013: [400000, 396000], 2014: [414000, 411000], 2015: [427000, 421000], 2016: [434000, 430000], 2017: [441000, 437000], 2018: [437000, 435000] },
  AFCARS2022: { 2013: [396000, 396000], 2014: [411000, 411000], 2015: [421000, 421000], 2016: [430000, 430000], 2017: [437000, 437000], 2018: [435000, 437000], 2019: [424000, 426000] },
  AFCARS2025: { 2020: [407000, 407332], 2021: [392000, 391641], 2022: [369000, 368530] },
  CM2009: {}, CM2013: { 2009: [9.3, 9.3] }, CM2017: { 2013: [9.1, 8.8] },
  CM2019: { 2015: [9.2, 9.2], 2016: [9.1, 9.1], 2017: [9.1, 9.1] }, CM2023: { 2019: [8.9, 9.2] },
};

async function pdfText(url: string, name: string): Promise<string> {
  const path = await download(url, name);
  const bytes = await Bun.file(path).arrayBuffer();
  invariant(Buffer.from(bytes).subarray(0, 4).toString() === "%PDF", `${url}: expected PDF`);
  const text = await command(["pdftotext", "-layout", path, "-"]);
  invariant(text.length > 2000 && text.includes("\f"), `${url}: missing PDF pages or truncated extraction`);
  return text;
}

function meta(name: string, unit: string, source: string, sourceUrl: string, note: string, breaks: string, historicalSourceUrls?: string[]): SeriesMeta {
  return { name, unit, source, sourceUrl, note, breaks, historicalSourceUrls, goodDirection: "neutral", cadence: "annual", annualRule: "One reported observation per calendar year, or federal fiscal year where specified.", class: "births" };
}

/** Later editions win; every overlap is printed, including actual historical revisions. */
function mergeEdition(data: Annual, edition: Annual, label: string): void {
  let checked = 0;
  for (const [year, value] of Object.entries(edition)) {
    if (data[year] !== undefined) {
      const expected = overlapFixtures[label]?.[year];
      invariant(expected && data[year] === expected[0] && value === expected[1], `${label} ${year}: overlap pair actual=[${data[year]},${value}] expected=${JSON.stringify(expected)}`);
      console.log(`PASS overlap ${label} ${year}: actual=[${data[year]},${value}] expected=[${expected}]; later edition retained`);
      checked++;
    } // Nonoverlapping years extend coverage without an overlap assertion.
    data[year] = value;
  }
  invariant(checked === Object.keys(overlapFixtures[label]).length, `${label}: missing expected overlap`);
}

export function parseFosterTrends(text: string, first: number, last: number): Annual {
  invariant(text.includes("Trends in Foster Care and Adoption") && text.includes("In Care On") && text.includes("Sept. 30th"), "AFCARS trends: missing count/header markers");
  const data: Annual = {};
  for (const line of text.split("\n")) {
    const cells = line.trim().split(/\s+/);
    if (/^20\d\d$/.test(cells[0]) && cells.length === 8 && /^\d{1,3},\d{3}$/.test(cells[1])) {
      const year = Number(cells[0]);
      invariant(year >= first && year <= last && data[year] === undefined, "AFCARS trends: unexpected/duplicate year");
      cells.slice(1).forEach((cell) => numeric(cell, "AFCARS trend count"));
      data[year] = numeric(cells[2], "AFCARS Sept 30 count");
    } // Narrative year references do not have the eight-column table shape.
  }
  invariant(Object.keys(data).length === last - first + 1, "AFCARS trends: incomplete year table");
  return data;
}

export function parseMaltreatment(text: string, end: number): Annual {
  invariant(text.includes(`Child Maltreatment ${end}`), `CM${end}: missing report marker`);
  const pages = text.split("\f");
  if (end === 2009) {
    const page = pages.find((p) => /^\s*Table 3.7 Child Victimization Rates, 2005.2009 \(unique count\)/.test(p));
    invariant(page, "CM2009: missing Table 3-7 unique-count page");
    const data: Annual = {};
    for (const line of page.split("\n")) {
      const cells = line.trim().split(/\s+/);
      if (/^200[5-9]$/.test(cells[0])) {
        invariant(cells.length === 7, "CM2009: malformed national row");
        data[cells[0]] = numeric(cells[4], "CM2009 victimization rate");
      } // Headers and narrative are not annual data rows.
    }
    invariant(Object.keys(data).length === 5, "CM2009: incomplete unique-count table");
    return data;
  }
  const page = pages.find((p) => /^\s*Table 3.[34] (?:Child )?Victims,/.test(p) && p.includes(`${end - 4}`) && p.includes(`${end}`) && /Rate per/.test(p) && /^\s*National\s+[^\n]*\d\.\d/m.test(p));
  invariant(page, `CM${end}: missing national rate table`);
  const stateLines = page.split("\n").filter((line) => /^\s*[A-Za-z][A-Za-z ]+\s{2,}.*\d\.\d/.test(line));
  invariant(stateLines.length >= 51 && stateLines.length <= 54, `CM${end}: truncated state table (${stateLines.length} rows)`);
  const national = page.match(/^\s*National\s+([^\n]+)/m);
  invariant(national, `CM${end}: missing National row`);
  const cells = national[1].trim().split(/\s+/);
  if (end === 2019) invariant(cells.shift() === "N/A", "CM2019: unexpected percent-change column");
  invariant(cells.length === 5, `CM${end}: expected five national rates`);
  return Object.fromEntries(cells.map((cell, index) => [String(end - 4 + index), numeric(cell, `CM${end} rate`)]));
}

async function buildFoster(p: Pipeline): Promise<void> {
  const old = parseFosterTrends(await pdfText(fosterUrls[0], "bw-trends_fostercare_adoption_09thru18.pdf"), 2009, 2018);
  const next = parseFosterTrends(await pdfText(fosterUrls[1], "bw-oldfoster.pdf"), 2010, 2019);
  mergeEdition(old, next, "AFCARS2019");
  const rows = await sheetRows(await download(fosterUrls[2], "bw-4.xlsx"));
  invariant(rows.length === 71 && rows[0].A === "FY" && rows[0].B === "Population" && rows[0].C === "Counts", "AFCARS xlsx: expected complete 70-observation table");
  const selected = rows.filter((r) => r.B === "In Care On Sept 30th");
  invariant(selected.length === 10, "AFCARS xlsx: expected ten September 30 years");
  const recent: Annual = {};
  for (const row of selected) {
    invariant(/^20(1[3-9]|2[0-2])$/.test(row.A) && recent[row.A] === undefined, "AFCARS xlsx: duplicate/unexpected year");
    recent[row.A] = numeric(row.C, "AFCARS xlsx count");
  }
  mergeEdition(old, recent, "AFCARS2022");
  const latest = await pdfText(fosterUrls[3], "bw-5.pdf");
  invariant(/Preliminary FFY\s+1\s+2025 Estimates/.test(latest) && latest.includes("AFCARS 2020"), "AFCARS dashboard: missing release and method markers");
  const line = latest.match(/Number in foster care on September 30 of the FFY\s+([^\n]+)/);
  invariant(line, "AFCARS dashboard: missing September 30 table row");
  const cells = line[1].trim().split(/\s+/);
  invariant(cells.length === 6 && /2020\s+2021\s+2022\s+2023\s+2024\s+2025/.test(latest), "AFCARS dashboard: incomplete six-year table");
  mergeEdition(old, Object.fromEntries(cells.map((cell, i) => [String(2020 + i), numeric(cell, "AFCARS dashboard count")])), "AFCARS2025");
  invariant(Object.keys(old).length === 17, "AFCARS: expected 2009–2025 coverage");
  await p.save({ key: "fosterCareChildren", data: old, bounds: [100000, 1000000], provisional: [2025], meta: meta("Children in foster care on September 30", "children", "ACF Children's Bureau, AFCARS", fosterUrls[3], "Federal fiscal-year end counts, 2009–2025. Later source editions replace overlapping earlier counts; trends spreadsheets round to thousands, dashboard counts do not. Sources: FY2009–18 trends, FY2010–19 trends, FY2013–22 workbook, preliminary FY2025 dashboard (February 27, 2026). Coverage before 2009 was not recovered: attempted trends_fostercare_adoption_00thru09.pdf returned HTTP 404. The AFCARS 2020 rule begins FY2023 collection and changes reporting population; the dashboard says pre-2023 counts should be considered separate. Washington first reported under the new rule in FY2025 and Wyoming in FY2024, affecting increases. FY2025 preliminary.", "FY2023 AFCARS 2020 rule and changed reporting population; Wyoming added FY2024, Washington FY2025; revised/rounded historical counts.", fosterUrls.slice(0, 3)) });
}

async function buildMaltreatment(p: Pipeline): Promise<void> {
  const data: Annual = {};
  for (const end of maltreatmentYears) {
    const parsed = parseMaltreatment(await pdfText(`${ACF}cm${end}.pdf`, end === 2023 ? "bw-3.pdf" : `bw-cm${end}.pdf`), end);
    mergeEdition(data, parsed, `CM${end}`);
  }
  invariant(Object.keys(data).length === 19, "Child maltreatment: expected 2005–2023 coverage");
  await p.save({ key: "childMaltreatmentRate", data, bounds: [0, 30], meta: meta("Child maltreatment victims", "victims per 1,000 children", "ACF Children's Bureau, Child Maltreatment / NCANDS", `${ACF}cm2023.pdf`, "Federal fiscal years. Unique-count child victims per 1,000 children in reporting states. CM2009 Table 3-7 (2005–09), CM2013 Table 3-3 (2009–13), CM2017 Table 3-4 (2013–17), CM2019 Table 3-4 (2015–19), CM2023 Table 3-3 (2019–23). Newest edition wins each overlap. Revisions are material: 2013 rate 9.1 in CM2013 becomes 8.8 in CM2017; 2019 rate 8.9 in CM2019 becomes 9.2 in CM2023. Published reports describe resubmissions, changing reporting coverage and state definitions; this is administrative surveillance, not a constant-definition prevalence estimate.", "Reporting-state coverage, state statutes, resubmissions and retrospective revisions vary; unique-count rates throughout.", maltreatmentYears.slice(0, -1).map((y) => `${ACF}cm${y}.pdf`)) });
}

async function buildBirths(p: Pipeline): Promise<void> {
  const rows: unknown = await getJSON(birthsUrl);
  invariant(Array.isArray(rows) && rows.length >= 100 && rows.length < 1000, "CDC births: empty, short or paging-limit response");
  const data: Annual = {};
  for (const row of rows) {
    invariant(typeof row === "object" && row !== null && "year" in row && "birth_number" in row && "general_fertility_rate" in row && "crude_birth_rate" in row, "CDC births: unexpected row shape");
    const record = row as Record<string, unknown>;
    invariant(typeof record.year === "string" && /^\d{4}$/.test(record.year) && typeof record.birth_number === "string", "CDC births: invalid types");
    invariant(data[record.year] === undefined, "CDC births: duplicate year");
    data[record.year] = numeric(record.birth_number, "CDC annual births");
  }
  const years = Object.keys(data).map(Number).sort((a, b) => a - b);
  invariant(years.length === years.at(-1)! - years[0] + 1, "CDC births: non-contiguous annual coverage");
  await p.save({ key: "births", data, bounds: [1000000, 6000000], meta: meta("Live births", "births", "CDC/NCHS, Births and General Fertility Rates: United States", birthsUrl, "Primary CDC open-data annual live-birth counts; current recoverable table spans 1909–2018. Historical early-year values are published rounded estimates, not fabricated precision. Requested later NVSR75-02 and NVSR74-09 PDFs returned HTTP403 Access Denied with a browser User-Agent; 2019–2024 extension is deferred until an accessible primary final-count table is available. No provisional monthly estimates are spliced into this final annual series.", "Historical birth-registration completeness and geographic coverage change; early counts are rounded estimates." ) });
}

async function inaccessibleCDC(p: Pipeline, key: string, urls: string[]): Promise<void> {
  const evidence: string[] = [];
  for (let i = 0; i < urls.length; i++) {
    try {
      const text = urls[i].endsWith("pdf") ? await pdfText(urls[i], `bw-${key}-${i}.pdf`) : await getText(urls[i]);
      evidence.push(`${urls[i]}: accessible (${text.length} extracted characters), but full historical series not recovered`);
    } catch (error) { evidence.push(String(error)); }
  }
  p.defer(key, `${evidence.join("; ")}. No observations fabricated. Resolve by providing accessible primary documents with at least 15 years and verified overlap values.`);
}

export async function buildBirthsWelfare(p: Pipeline): Promise<void> {
  await p.run("meanAgeFirstBirth", () => inaccessibleCDC(p, "meanAgeFirstBirth", ["https://www.cdc.gov/nchs/data/nvsr/nvsr51/nvsr51_01.pdf", "https://www.cdc.gov/nchs/data/databriefs/db232.pdf", "https://www.cdc.gov/nchs/data/nvsr/nvsr74/nvsr74-09.pdf", "https://www.cdc.gov/nchs/data/nvsr/nvsr75/nvsr75-02.pdf", "https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/NVSR/51_01.pdf", "https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/NVSR/nvsr75_02.pdf"]));
  await p.run("births", () => buildBirths(p));
  await p.run("abortionRate", () => inaccessibleCDC(p, "abortionRate", ["https://www.cdc.gov/mmwr/volumes/73/ss/ss7307a1.htm"]));
  await p.run("fosterCareChildren", () => buildFoster(p));
  await p.run("childMaltreatmentRate", () => buildMaltreatment(p));
}
