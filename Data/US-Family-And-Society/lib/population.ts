import { download, invariant, numeric, round, type Annual, type Row } from "./io.ts";
import type { Pipeline, SeriesMeta } from "./meta.ts";
import { sheetRows } from "./xlsx.ts";
import { xlsRows } from "./xls.ts";

const source2025 = "https://www2.census.gov/programs-surveys/popest/tables/2020-2025/national/asrh/nc-est2025-agesex.xlsx";
const source2020 = "https://www2.census.gov/programs-surveys/popest/tables/2010-2020/intercensal/national/asrh/nc-est2020int-agesex.xlsx";
const source2010 = "https://www2.census.gov/programs-surveys/popest/tables/2000-2010/intercensal/national/us-est00int-01.xls";
const extension = "1970–1999 extension DEFERRED: the linked 1970s workbook https://www2.census.gov/programs-surveys/popest/tables/1900-1980/national/asrh/pe-11-1970s.xls returned HTTP 200 but its title specifies Resident Population plus Armed Forces Overseas, unlike the resident-only series here, and provides single-year ages rather than a published median. The 1990s table https://www2.census.gov/programs-surveys/popest/tables/1990-2000/national/totals/nat-agesex.txt returned HTTP 200 text/html with Request Rejected: The requested URL was rejected. Its linked nat-agesex-doc.txt returned HTTP 404, U.S. Census Bureau: Page not found. The 1980s dataset page links quarterly age/race/sex ZIP files, but their resident-only annual extraction and derived-median methodology have not been validated. Resolution requires verified resident-only annual age distributions and a documented median derivation, or published historical resident medians/shares. No historical values are interpolated.";
type PopulationTable = { rows: Row[]; total: Row; older: Row; median: Row };
function table(rows: Row[], olderFormat: boolean, title: string): PopulationTable {
  invariant(rows.length > 30 && rows.length < 200 && (rows[1]?.A ?? "").includes(title), `Population workbook missing title or invalid row count: ${title}`);
  const start = olderFormat ? rows.findIndex(r => r.A === "BOTH SEXES") : rows.findIndex(r => r.A === "Total");
  invariant(start >= 0, "Population all-sexes total missing");
  const end = olderFormat ? rows.findIndex((r, i) => i > start && r.A === "MALE") : rows.length;
  invariant(end > start, "Population male section boundary missing");
  const block = rows.slice(start, end), older = block.find(r => r.A === ".65 years and over"), median = block.find(r => /^\.?Median age \(years\)$/.test(r.A ?? ""));
  invariant(older && median, "Population 65+ or median row missing"); return { rows, total: rows[start], older, median };
}
function value(t: PopulationTable, col: string, share: boolean): number {
  if (!share) return numeric(t.median[col], `Median age ${col}`);
  const total = numeric(t.total[col], `Population total ${col}`), older = numeric(t.older[col], `Population 65+ ${col}`);
  invariant(total > 200_000_000 && total < 500_000_000 && older > 0 && older < total, `Population count bounds ${col}`);
  return older / total * 100;
}
function overlap(label: string, actual: number, expected: number, tolerance: number): void {
  const delta = Math.abs(actual - expected);
  invariant(delta <= tolerance, `${label}: actual=${actual} expected=${expected} delta=${delta} tolerance=${tolerance}`);
  console.log(`PASS ${label}: actual=${round(actual, 6)} expected=${round(expected, 6)} absoluteDifference=${round(delta, 6)} tolerance=${tolerance}`);
}
export async function buildPopulation(p: Pipeline): Promise<void> {
  for (const share of [false, true]) {
    const key = share ? "population65Share" : "medianAge";
    await p.run(key, async () => {
      const recent = table(await sheetRows(await download(source2025, "pop2025.xlsx")), false, "April 1, 2020 to July 1, 2025");
      const middle = table(await sheetRows(await download(source2020, "pop2020int.xlsx")), false, "April 1, 2010 to April 1, 2020");
      const early = table(await xlsRows(await download(source2010, "pop2010int.xls")), true, "April 1, 2000 to July 1, 2010");
      invariant(early.rows[2].M?.includes("April 1, 2010") && middle.rows[2].B === "April 1, 2010 Estimates Base" && middle.rows[2].AI === "April 1, 2020 Census" && recent.rows[2].B === "April 1, 2020 Estimates Base", "Population overlap base-date labels changed");
      const tolerance = share ? 0.2 : 0.3;
      overlap(`A22 ${key} April2010 old-census/new-base`, value(early, "M", share), value(middle, "B", share), tolerance);
      overlap(`A22 ${key} April2020 old-census/new-base`, value(middle, "AI", share), value(recent, "B", share), tolerance);
      const data: Annual = {};
      for (const [t, first, last] of [[early, 2000, 2009], [middle, 2010, 2019], [recent, 2020, 2025]] as const) {
        const years = Object.entries(t.rows[3]).filter(([, s]) => /^\d{4}$/.test(s));
        invariant(years.length === last - first + 1, `${key}: year header count changed ${first}–${last}`);
        for (let year = first; year <= last; year++) {
          const found = years.filter(([, s]) => Number(s) === year); invariant(found.length === 1, `${key}: missing/duplicate header ${year}`);
          const col = found[0][0];
          if (t !== early) invariant(/Both Sexes|Total\s+Population/.test(t.rows[4][col] ?? ""), `${key}: ${year} column is not both sexes`);
          // Early workbook identifies both sexes by row section rather than column subheaders.
          invariant(data[year] === undefined, `${key}: duplicate annual observation ${year}`); data[year] = round(value(t, col, share));
        }
      }
      invariant(Object.keys(data).length === 26, `${key}: expected 26 annual observations`);
      const meta: SeriesMeta = {
        name: share ? "Resident population age 65 and older" : "Median age of the resident population", unit: share ? "%" : "years",
        source: "U.S. Census Bureau, Population Estimates Program", sourceUrl: source2025, historicalSourceUrls: [source2010, source2020],
        note: `${share ? "Computed from all-sexes age-65-and-older counts divided by all-sexes total resident population." : "Published all-sexes median age, rounded to two decimals; the 2000–2010 workbook carries additional underlying precision."} Vintage list: 2000–2010 intercensal estimates for 2000–2009; 2010–2020 intercensal estimates for 2010–2019; Vintage 2025 estimates for 2020–2025. Newer vintage wins at 2010 and 2020. A22 compares April 1 census/base observations at the same dates, allowing 0.3 years or 0.2 percentage points. ${extension}`,
        goodDirection: "neutral", cadence: "annual", annualRule: "July 1 resident population estimate; one observation per calendar year.", class: "population",
        breaks: "Intercensal/vintage splice at 2010 and 2020; census-base revisions can change estimates. July annual estimates are not replaced by April census/base observations.",
      };
      await p.save({ key, meta, data, bounds: share ? [0, 100] : [20, 60] });
    });
  }
}
