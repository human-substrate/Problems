import { command, download, getJSON, getText, invariant, numeric, sha256Hex, DIR, type Annual } from "./io.ts";
import type { Pipeline, SeriesMeta } from "./meta.ts";
import { sheetRows } from "./xlsx.ts";
import { join } from "node:path";

const ACF = "https://acf.gov/sites/default/files/documents/cb/";
const birthsUrl = "https://data.cdc.gov/resource/e6fc-ccez.json?$limit=1000";
const fosterUrls = [ACF + "trends_fostercare_adoption_09thru18.pdf", ACF + "trends_fostercare_adoption_10thru19.pdf", ACF + "national-afcars-data-2013-2022.xlsx", ACF + "2025-afcars-dashboard-printable.pdf"];
const maltreatmentYears = [2009, 2013, 2017, 2019, 2023];
const NCHS = join(DIR, "data", "nchs");
// Re-derived from the actual source tables; differences are edition revisions, not equality failures.
const overlapFixtures: Record<string, Record<string, [number, number]>> = {
  AFCARS2019: { 2010: [411000, 407000], 2011: [397000, 392000], 2012: [396000, 392000], 2013: [400000, 396000], 2014: [414000, 411000], 2015: [427000, 421000], 2016: [434000, 430000], 2017: [441000, 437000], 2018: [437000, 435000] },
  AFCARS2022: { 2013: [396000, 396000], 2014: [411000, 411000], 2015: [421000, 421000], 2016: [430000, 430000], 2017: [437000, 437000], 2018: [435000, 437000], 2019: [424000, 426000] },
  AFCARS2025: { 2020: [407000, 407332], 2021: [392000, 391641], 2022: [369000, 368530] },
  CM2009: {}, CM2013: { 2009: [9.3, 9.3] }, CM2017: { 2013: [9.1, 8.8] },
  CM2019: { 2015: [9.2, 9.2], 2016: [9.1, 9.1], 2017: [9.1, 9.1] }, CM2023: { 2019: [8.9, 9.2] },
  MAFB2023: {}, MAFB2024: { 2016: [26.6, 26.6], 2017: [26.8, 26.8], 2018: [26.9, 26.9], 2019: [27.0, 27.0], 2020: [27.1, 27.1], 2021: [27.3, 27.3], 2022: [27.4, 27.4], 2023: [27.5, 27.5] },
  BIRTHS2024: { 2010: [3999386, 3999386], 2011: [3953590, 3953590], 2012: [3952841, 3952841], 2013: [3932181, 3932181], 2014: [3988076, 3988076], 2015: [3978497, 3978497], 2016: [3945875, 3945875], 2017: [3855500, 3855500], 2018: [3791712, 3791712] },
};

async function pdfText(url: string, name: string): Promise<string> {
  const path = await download(url, name);
  const bytes = await Bun.file(path).arrayBuffer();
  invariant(Buffer.from(bytes).subarray(0, 4).toString() === "%PDF", `${url}: expected PDF`);
  const text = await command(["pdftotext", "-layout", path, "-"]);
  invariant(text.length > 2000 && text.includes("\f"), `${url}: missing PDF pages or truncated extraction`);
  return text;
}

/**
 * cdc.gov returns HTTP 403 to every scripted fetch of these NVSR/data-brief reports (browser UA included).
 * They were read once through a real Chrome session and checked in at data/nchs/, with the read date and
 * sha256 recorded in data/nchs/READ.md. Every parse re-verifies the hash first and refuses to run on a
 * mismatch, so a silently-edited or silently-stale checked-in file can never pass as the primary source.
 */
async function checkedInText(name: string): Promise<string> {
  const readme = await Bun.file(join(NCHS, "READ.md")).text();
  const row = readme.match(new RegExp(`\\|\\s*${name.replace(/\./g, "\\.")}\\s*\\|[^|]*\\|[^|]*\\|\\s*([0-9a-f]{64})\\s*\\|`));
  invariant(row, `${name}: no data/nchs/READ.md entry with a 64-hex-char sha256`);
  const path = join(NCHS, name);
  const actual = await sha256Hex(path);
  invariant(actual === row[1], `${name}: sha256 mismatch against data/nchs/READ.md (actual=${actual} expected=${row[1]}); the checked-in file changed under the pipeline`);
  const bytes = await Bun.file(path).arrayBuffer();
  invariant(Buffer.from(bytes).subarray(0, 4).toString() === "%PDF", `${name}: expected PDF`);
  const text = await command(["pdftotext", "-layout", path, "-"]);
  invariant(text.length > 2000 && text.includes("\f"), `${name}: missing PDF pages or truncated extraction`);
  console.log(`PASS checked-in ${name}: sha256=${actual} matches data/nchs/READ.md`);
  return text;
}

/** Splits a leader-dotted table row ("2024. . . . 29.7 27.6 ...") into [year, ...numericCells], or null for a non-data line. */
function numericRow(line: string): string[] | null {
  const m = line.match(/^\s*(\d{4})\.?\s*(.*)$/);
  if (!m) return null;
  const rest = m[2].split(/\s+/).filter((t) => t.length > 0 && !/^\.+$/.test(t));
  return rest.length > 0 ? [m[1], ...rest] : null;
}

/** The text strictly between the first match of `start` and the next match of `end` after it. */
function betweenMarkers(text: string, start: RegExp, end: RegExp): string {
  const s = text.match(start);
  invariant(s && s.index !== undefined, `missing start marker ${start}`);
  const rest = text.slice(s.index! + s[0].length);
  const e = rest.match(end);
  invariant(e && e.index !== undefined, `missing end marker ${end} after ${start}`);
  return rest.slice(0, e.index);
}

/** Reads one numeric column (by position after the year) from a sliced table block, asserting full annual coverage. */
function parseYearColumn(block: string, column: number, fieldsExpected: number, first: number, last: number, label: string): Annual {
  const data: Annual = {};
  for (const line of block.split("\n")) {
    const row = numericRow(line);
    if (!row) continue; // Header, note and blank lines do not start with a 4-digit year.
    const year = Number(row[0]);
    if (year < first || year > last) continue; // Race/origin-specific rows outside the requested window are excluded by the caller's end marker, not here.
    invariant(row.length === fieldsExpected, `${label} ${row[0]}: expected ${fieldsExpected} fields, got ${row.length} (${row.join("|")})`);
    invariant(data[row[0]] === undefined, `${label} ${row[0]}: duplicate year`);
    data[row[0]] = numeric(row[column], `${label} ${row[0]}`);
  }
  invariant(Object.keys(data).length === last - first + 1, `${label}: expected ${last - first + 1} annual observations (${first}-${last}), got ${Object.keys(data).length}`);
  return data;
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
  await p.save({ key: "childMaltreatmentRate", data, bounds: [0, 30], meta: meta("Child maltreatment victims", "victims per 1,000 children", "ACF Children's Bureau, Child Maltreatment / NCANDS", `${ACF}cm2023.pdf`, "Federal fiscal years. Unique-count child victims per 1,000 children in reporting states. CM2009 Table 3-7 (2005–09), CM2013 Table 3-3 (2009–13), CM2017 Table 3-4 (2013–17), CM2019 Table 3-4 (2015–19), CM2023 Table 3-3 (2019–23). Newest edition wins each overlap. Revisions are material: 2013 rate 9.1 in CM2013 becomes 8.8 in CM2017; 2019 rate 8.9 in CM2019 becomes 9.2 in CM2023. Published reports describe resubmissions, changing reporting coverage and state definitions; this is administrative surveillance, not a constant-definition prevalence estimate.", "none known that is dated: reporting-state coverage, state statutes, resubmissions and retrospective revisions vary; unique-count rates throughout.", maltreatmentYears.slice(0, -1).map((y) => `${ACF}cm${y}.pdf`)) });
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
  const contiguousCDC = Object.keys(data).map(Number).sort((a, b) => a - b);
  invariant(contiguousCDC.length === contiguousCDC.at(-1)! - contiguousCDC[0] + 1, "CDC births: non-contiguous annual coverage");

  const text75 = await checkedInText("nvsr75-02.pdf");
  const block = betweenMarkers(text75, /Table 1\. Births and birth rates: United States, 2010–2024, and by race and Hispanic origin of mother: United States,[\s\S]*?All races and origins\d?/, /Non-Hispanic, single race\d?/);
  const nvsr2024 = parseYearColumn(block, 1, 4, 2010, 2024, "NVSR75-2 births");
  mergeEdition(data, nvsr2024, "BIRTHS2024");
  const years = Object.keys(data).map(Number).sort((a, b) => a - b);
  invariant(years.length === years.at(-1)! - years[0] + 1, "Births: non-contiguous annual coverage after the NVSR75-2 extension");
  invariant(data["2024"] === 3628934, `NVSR75-2 births anchor mismatch: 2024=${data["2024"]}`);
  console.log(`PASS anchor births NVSR75-2 2024: actual=${data["2024"]} expected=3628934`);

  await p.save({ key: "births", data, bounds: [1000000, 6000000], meta: meta("Live births", "births", "CDC/NCHS, Births and General Fertility Rates: United States, extended by NVSR 75-2 Table 1", birthsUrl, "1909–2018 from the primary CDC open-data annual live-birth counts; 2010–2018 overlap confirmed identical against NVSR 75-2 Table 1 (archived copy in data/nchs/), which then extends the series 2019–2024. Historical early-year values are published rounded estimates, not fabricated precision. No provisional monthly estimates are spliced into this final annual series.", "The birth-registration area reached all states in 1933; earlier counts cover a growing registration area and are rounded estimates.", ["https://www.cdc.gov/nchs/data/nvsr/nvsr75/nvsr75-02.pdf"]) });
}

async function buildMeanAgeFirstBirth(p: Pipeline): Promise<void> {
  const text1970 = await checkedInText("nvsr51_01.pdf");
  const block1970 = betweenMarkers(text1970, /Table 1\. Mean age of mother and absolute change by live birth order: United States, 1970–2000/, /Absolute change 1970–2000/);
  const data = parseYearColumn(block1970, 2, 7, 1970, 2000, "NVSR51-1");
  invariant(data["1970"] === 21.4 && data["2000"] === 24.9, `NVSR51-1 anchor mismatch: 1970=${data["1970"]} 2000=${data["2000"]}`);
  console.log(`PASS anchor meanAgeFirstBirth NVSR51-1 1970: actual=${data["1970"]} expected=21.4`);
  console.log(`PASS anchor meanAgeFirstBirth NVSR51-1 2000: actual=${data["2000"]} expected=24.9`);

  const text2023 = await checkedInText("nvsr74-09.pdf");
  const block2023 = betweenMarkers(text2023, /Table 1\. Mean age, by birth order: United States, 2016–2023/, /SOURCE: National Center for Health Statistics, National Vital Statistics System, natality data file\./);
  mergeEdition(data, parseYearColumn(block2023, 2, 5, 2016, 2023, "NVSR74-9"), "MAFB2023");

  const text2024 = await checkedInText("nvsr75-02.pdf");
  const block2024 = betweenMarkers(text2024, /Table 4\. Mean age of mother, by live-birth order: United States, 2010–2024, and by race and Hispanic origin of[\s\S]*?All races and origins\d?/, /Non-Hispanic, single race\d?/);
  mergeEdition(data, parseYearColumn(block2024, 2, 10, 2010, 2024, "NVSR75-2 mean age"), "MAFB2024");

  invariant(Object.keys(data).length === 46, `meanAgeFirstBirth: expected 46 annual observations (1970-2000 plus 2010-2024), got ${Object.keys(data).length}`);
  invariant(data["2024"] === 27.6, `NVSR75-2 mean-age anchor mismatch: 2024=${data["2024"]}`);
  console.log(`PASS anchor meanAgeFirstBirth NVSR75-2 2024: actual=${data["2024"]} expected=27.6`);

  await p.save({
    key: "meanAgeFirstBirth", data, bounds: [15, 40],
    meta: meta(
      "Mean age of mother at first live birth", "years",
      "CDC/NCHS, National Vital Statistics Reports (mean age of mother, by live-birth order)",
      "https://www.cdc.gov/nchs/data/nvsr/nvsr75/nvsr75-02.pdf",
      "Mean (not median) age at first live birth, all races and origins; the arithmetic average computed directly from the frequency of first births by age of mother. Edition list, newest wins on overlap: NVSR 51-1 Table 1 (1970–2000); NVSR 74-9 Table 1 (2016–2023, identical to the 2024 edition on every overlapping year, so no revision); NVSR 75-2 Table 4 (2010–2024). 2001–2009 could not be recovered: the only archived source covering that span, NCHS Data Brief 232, reports the trend only as a line chart plus three narrative anchor values (2000, 2009, 2014), not a machine-readable annual table; no value was read off the chart or interpolated. The four reports are archived in data/nchs/ with their hashes recorded in READ.md.",
      "2001–2009 gap: Data Brief 232 for that window is chart-only, not machine-readable. Reports before 2016 do not carry the same race/Hispanic-origin breakout as 2016 onward.",
      ["https://www.cdc.gov/nchs/data/nvsr/nvsr51/nvsr51_01.pdf", "https://www.cdc.gov/nchs/data/databriefs/db232.pdf", "https://www.cdc.gov/nchs/data/nvsr/nvsr74/nvsr74-09.pdf"],
    ),
  });
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
  await p.run("meanAgeFirstBirth", () => buildMeanAgeFirstBirth(p));
  await p.run("births", () => buildBirths(p));
  await p.run("abortionRate", () => inaccessibleCDC(p, "abortionRate", ["https://www.cdc.gov/mmwr/volumes/73/ss/ss7307a1.htm"]));
  await p.run("fosterCareChildren", () => buildFoster(p));
  await p.run("childMaltreatmentRate", () => buildMaltreatment(p));
}
