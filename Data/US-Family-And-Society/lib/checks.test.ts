import { expect, test } from "bun:test";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

const DIR = join(import.meta.dir, "..");

// The complete requested inventory for this dataset: every SHIP and DEFERRED row under
// "Lane 2 — Family & Society" in research/us-stats-expansion-2026-09/findings/candidates.md.
// CUT rows (time alone, church membership, volunteering, CBP nationwide encounters) and the
// marriage/divorce currency row ("existing rows correct" — belongs to another dataset) are not
// part of this dataset's contract and are intentionally excluded.
const REQUESTED_KEYS = [
  "medianAgeFirstMarriageMen", "medianAgeFirstMarriageWomen", "adultsMarried", "marriedCoupleHouseholds",
  "onePersonHouseholds", "householdSize", "childrenWithTwoParents", "oneParentFamilies", "youngAdultsWithParents",
  "cohabitingCouples", "cohabitingCouplesPosslq", "moversShare", "childlessWomen40to44",
  "meanAgeFirstBirth", "births", "abortionRate", "fosterCareChildren", "childMaltreatmentRate",
  "atusSocializing", "atusTelevision", "atusChildcare", "atusSleep", "mothersLaborForce",
  "gssAttendWeekly", "gssNoReligion", "gssSocialFriends",
  "permanentResidents", "naturalizations", "borderEnforcementActions",
  "foreignBornShareDecennial", "foreignBornShare",
  "medianAge", "population65Share",
];
const SERIES_CLASSES = ["living", "births", "time", "religion", "migration", "population"];
const REQUIRED_META_STRING_FIELDS = ["name", "unit", "source", "sourceUrl", "goodDirection", "cadence", "annualRule", "class", "breaks", "note", "coverage", "fetched"];

async function seriesKeys(): Promise<string[]> {
  const files = await readdir(join(DIR, "series"));
  return files.filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5));
}
async function deferred(): Promise<Record<string, string>> {
  return (await Bun.file(join(DIR, "deferred.json")).json()) as Record<string, string>;
}
async function series(key: string): Promise<{ _meta: Record<string, unknown>; data: Record<string, number> }> {
  return (await Bun.file(join(DIR, "series", `${key}.json`)).json()) as { _meta: Record<string, unknown>; data: Record<string, number> };
}

test("C2: every requested key is shipped or explicitly deferred with evidence, none double-counted, nothing unrequested", async () => {
  const shipped = await seriesKeys(), deferredKeys = Object.keys(await deferred());
  const both = shipped.filter((k) => deferredKeys.includes(k));
  expect(both, `keys both shipped and deferred: ${both}`).toEqual([]);
  const union = new Set([...shipped, ...deferredKeys]);
  const missing = REQUESTED_KEYS.filter((k) => !union.has(k));
  expect(missing, `requested keys neither shipped nor deferred: ${missing}`).toEqual([]);
  const unrequested = [...union].filter((k) => !REQUESTED_KEYS.includes(k));
  expect(unrequested, `shipped/deferred keys outside the requested inventory: ${unrequested}`).toEqual([]);
  for (const [key, reason] of Object.entries(await deferred())) expect(reason.length, `${key}: deferral reason too short to be evidence`).toBeGreaterThan(30);
});

test("C3: every saved series satisfies the metadata, bounds and coverage contract", async () => {
  for (const key of await seriesKeys()) {
    const file = await series(key), m = file._meta;
    expect(m.key, `${key}: _meta.key mismatch`).toBe(key);
    for (const field of REQUIRED_META_STRING_FIELDS) expect(typeof m[field], `${key}: _meta.${field} not a string`).toBe("string");
    expect((m.breaks as string).length, `${key}: breaks empty`).toBeGreaterThan(0);
    expect((m.note as string).length, `${key}: note empty`).toBeGreaterThan(0);
    expect(m.cadence, `${key}: cadence`).toBe("annual");
    expect(SERIES_CLASSES, `${key}: unknown class ${m.class}`).toContain(m.class);
    expect(["up", "down", "neutral"], `${key}: unknown goodDirection ${m.goodDirection}`).toContain(m.goodDirection);
    expect(Number.isNaN(new Date(m.fetched as string).getTime()), `${key}: fetched not a parseable timestamp`).toBe(false);

    const years = Object.keys(file.data);
    expect(years, `${key}: data keys not year-ascending`).toEqual([...years].sort());
    for (const y of years) {
      expect(/^\d{4}$/.test(y), `${key} ${y}: key is not a 4-digit year`).toBe(true);
      expect(Number.isFinite(file.data[y]), `${key} ${y}: non-finite value`).toBe(true);
    }
    const namedException = /Exception:/.test(m.note as string);
    expect(years.length >= 15 || namedException, `${key}: fewer than 15 observations without a named exception`).toBe(true);
    expect(m.coverage, `${key}: coverage does not match actual first/last year`).toBe(`${years[0]}–${years[years.length - 1]}`);
    if (/percent|%/i.test(m.unit as string) && !/thousand|per\s|victims|hours/i.test(m.unit as string))
      for (const y of years) { expect(file.data[y], `${key} ${y}: percent below 0`).toBeGreaterThanOrEqual(0); expect(file.data[y], `${key} ${y}: percent above 100`).toBeLessThanOrEqual(100); }
  }
});

// C5: primary-source anchors, re-checked against the actually-saved series (not just the fetch-time
// invariant). Values are the publisher's own figures as recorded in candidates.md Lane 2.
test("C5: shipped series match the primary-source anchors named in candidates.md", async () => {
  expect((await series("medianAgeFirstMarriageMen")).data["2025"], "MS-2 2025 men").toBe(30.8);
  expect((await series("medianAgeFirstMarriageWomen")).data["2025"], "MS-2 2025 women").toBe(28.4);
  expect((await series("onePersonHouseholds")).data["1960"], "HH-4 1960 one-person share").toBe(13.1);
  expect((await series("householdSize")).data["2025"], "HH-6 2025 average size").toBe(2.5);
  expect((await series("moversShare")).data["1948"], "Geographic Mobility 1947-48").toBe(20.2);
  expect((await series("permanentResidents")).data["2023"], "DHS Yearbook Table 1, FY2023").toBe(1172910);
  expect((await series("permanentResidents")).data["1820"], "DHS Yearbook Table 1, 1820").toBe(8390);
  expect((await series("naturalizations")).data["2023"], "DHS Yearbook Table 20, FY2023").toBe(878460);
  expect((await series("borderEnforcementActions")).data["1925"], "DHS Yearbook Table 33, 1925").toBe(22200);
  expect((await series("borderEnforcementActions")).data["2023"], "DHS Yearbook Table 33, FY2023").toBe(2818660);
  expect((await series("births")).data["2018"], "CDC open-data/NVSR75-2 overlap year").toBe(3791712);
  expect((await series("births")).data["2024"], "NVSR75-2 Table 1, latest final year").toBe(3628934);
  expect((await series("fosterCareChildren")).data["2025"], "AFCARS dashboard, preliminary FY2025").toBe(331747);
  expect((await series("childMaltreatmentRate")).data["2023"], "NCANDS Child Maltreatment 2023, national rate").toBe(7.4);
  expect((await series("meanAgeFirstBirth")).data["1970"], "NVSR51-1 Table 1, 1970").toBe(21.4);
  expect((await series("meanAgeFirstBirth")).data["2000"], "NVSR51-1 Table 1, 2000").toBe(24.9);
  expect((await series("meanAgeFirstBirth")).data["2024"], "NVSR75-2 Table 4, 2024").toBe(27.6);
});

// The checked-in CDC PDFs (data/nchs/) are read only after their sha256 matches data/nchs/READ.md;
// meanAgeFirstBirth stitches three editions across a real publisher gap (2001-2009, chart-only source).
test("meanAgeFirstBirth spans 1970-2000 and 2010-2024 with the 2001-2009 gap named, not filled", async () => {
  const data = (await series("meanAgeFirstBirth")).data;
  expect(Object.keys(data).length, "expected 46 annual observations").toBe(46);
  for (let year = 1970; year <= 2000; year++) expect(data[String(year)], `missing year ${year}`).toBeDefined();
  for (let year = 2010; year <= 2024; year++) expect(data[String(year)], `missing year ${year}`).toBeDefined();
  for (let year = 2001; year <= 2009; year++) expect(data[String(year)], `${year} should not be present (chart-only source)`).toBeUndefined();
});

// The duplicate-year fix in lib/census.ts annualRows(): a footnote-lettered HH-1 row (a, b, r) must win
// deterministically over its plain-year duplicate, and every year in the publisher's range must survive.
test("marriedCoupleHouseholds resolves every HH-1 lettered duplicate year with no unexpected gaps", async () => {
  const data = (await series("marriedCoupleHouseholds")).data;
  // HH-1 has no CPS observation for 1941-1946 (no wartime survey); every other year 1940-2025 is present.
  const wartimeGap = [1941, 1942, 1943, 1944, 1945, 1946];
  const missing = Array.from({ length: 2025 - 1940 + 1 }, (_, i) => 1940 + i).filter((y) => data[String(y)] === undefined);
  expect(missing, "unexpected missing years").toEqual(wartimeGap);
  // 1980r, 1984b, 1988a and 1993r (revised-processing / population-control rows) must each win over
  // their plain duplicate; these are the values that ship, re-derived from the actual HH-1 workbook.
  expect(data["1980"]).toBe(60.8);
  expect(data["1984"]).toBe(58.72);
  expect(data["1988"]).toBe(56.71);
  expect(data["1993"]).toBe(55.06);
  expect(data["2025"]).toBe(46.63);
});
