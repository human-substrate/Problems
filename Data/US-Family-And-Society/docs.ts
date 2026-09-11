#!/usr/bin/env bun
// docs.ts — regenerates README.md, SUMMARY.md and source.md from index.json + series/*.json so the docs can
// never drift from the data. Run after update.ts:  bun docs.ts
import { join } from "node:path";
import { writeFile } from "node:fs/promises";

const DIR = import.meta.dir;
const index = await Bun.file(join(DIR, "index.json")).json();
const keys: string[] = Object.keys(index.series).sort();
const S: Record<string, any> = {};
for (const k of keys) S[k] = await Bun.file(join(DIR, "series", `${k}.json`)).json();
const deferred: Record<string, string> = (await Bun.file(join(DIR, "deferred.json")).exists()) ? await Bun.file(join(DIR, "deferred.json")).json() : {};
const today = new Date().toISOString().slice(0, 10);

const GROUPS: [string, string[]][] = [
  ["Marriage & marital status", ["medianAgeFirstMarriageMen", "medianAgeFirstMarriageWomen", "adultsMarried"]],
  ["Households & living arrangements", ["marriedCoupleHouseholds", "onePersonHouseholds", "householdSize", "childrenWithTwoParents", "oneParentFamilies", "youngAdultsWithParents", "cohabitingCouples", "cohabitingCouplesPosslq"]],
  ["Mobility & fertility", ["moversShare", "childlessWomen40to44"]],
  ["Births & child welfare", ["births", "meanAgeFirstBirth", "fosterCareChildren", "childMaltreatmentRate"]],
  ["Religion & social connection (GSS)", ["gssAttendWeekly", "gssNoReligion", "gssSocialFriends"]],
  ["Immigration", ["permanentResidents", "naturalizations", "borderEnforcementActions", "foreignBornShareDecennial"]],
  ["Population age structure", ["medianAge", "population65Share"]],
];
const placed = new Set(GROUPS.flatMap(([, ks]) => ks));
const rest = keys.filter((k) => !placed.has(k));
if (rest.length) GROUPS.push(["Other", rest]);

function fmt(k: string, v: number): string {
  const unit: string = S[k]._meta.unit;
  if (/^percent|%/i.test(unit)) return `${v}%`;
  if (/thousands of couples/i.test(unit)) return `${v.toLocaleString()}k`;
  if (/people per household/i.test(unit)) return `${v}`;
  if (/victims per 1,000/i.test(unit)) return `${v} per 1,000`;
  if (/years/i.test(unit)) return `${v} yrs`;
  return v.toLocaleString();
}
const last = (k: string) => { const ys = Object.keys(S[k].data); const y = ys[ys.length - 1]; return { y, v: S[k].data[y], first: ys[0], fv: S[k].data[ys[0]], n: ys.length }; };
const row = (k: string) => { const m = S[k]._meta, l = last(k); return `| [${m.name}](series/${k}.json) | ${fmt(k, l.v)} (${l.y}) | ${fmt(k, l.fv)} (${l.first}) | ${m.coverage} · ${l.n} pts | ${m.source} |`; };
const tables = GROUPS.filter(([, ks]) => ks.some((k) => S[k])).map(([title, ks]) => `### ${title}\n\n| Series | Latest | First | Coverage | Publisher |\n|---|---|---|---|---|\n${ks.filter((k) => S[k]).map(row).join("\n")}`).join("\n\n");

// honest superlatives, computed
function rank(k: string): string {
  const d = S[k].data; const ys = Object.keys(d); const y = ys[ys.length - 1]; const v = d[y];
  const lows = ys.filter((yy) => d[yy] < v).length, highs = ys.filter((yy) => d[yy] > v).length;
  if (lows === 0) return `the lowest of ${ys.length} readings since ${ys[0]}`;
  if (highs === 0) return `the highest of ${ys.length} readings since ${ys[0]}`;
  return `${highs} of ${ys.length} readings since ${ys[0]} were higher`;
}
const head = (k: string) => { const l = last(k); return `| **${S[k]._meta.name}** | **${fmt(k, l.v)}** (${l.y}) | ${rank(k)} | ${S[k]._meta.source} |`; };
const HEADLINE = ["marriedCoupleHouseholds", "onePersonHouseholds", "medianAgeFirstMarriageMen", "childrenWithTwoParents", "oneParentFamilies", "cohabitingCouples", "moversShare", "births", "meanAgeFirstBirth", "fosterCareChildren", "childMaltreatmentRate", "gssAttendWeekly", "permanentResidents", "medianAge"].filter((k) => S[k]);

const NOT_INCLUDED: Record<string, string> = {
  abortionRate: "cdc.gov returns HTTP 403 Access Denied to scripted fetches of the MMWR surveillance summary; no accessible primary table with ≥15 machine-readable years was found.",
  fosterCareChildren2000: "AFCARS trends coverage before 2009 was not recovered: the FY2000-09 trends PDF 404s. The shipped series starts 2009.",
  mothersLaborForce: "bls.gov returns HTTP 403 to the Women in the Labor Force Databook page carrying March CPS Table 7; the annual-average famee Table 5 is a different, non-substitutable series.",
  atusSocializing: "No BLS_API_KEY is registered; the keyless v1/v2 API hit its daily request threshold, and bls.gov's HTML ATUS tables return HTTP 403 to a browser-UA fetch.",
  atusTelevision: "Same BLS API-key/quota and bls.gov 403 blockers as atusSocializing.",
  atusChildcare: "Same BLS API-key/quota and bls.gov 403 blockers as atusSocializing.",
  atusSleep: "Same BLS API-key/quota and bls.gov 403 blockers as atusSocializing.",
  foreignBornShare: "The annual ACS one-year estimate (table B05002) requires a registered CENSUS_API_KEY, which is not present in this environment. The decennial series (1850-2000) ships separately as foreignBornShareDecennial.",
};

await writeFile(join(DIR, "SUMMARY.md"), `# US Family and Society: Executive Summary

---

## 🎯 BEST ESTIMATE

| Metric | Value | Where it sits in its own history | Source |
|--------|-------|----------------------------------|--------|
${HEADLINE.map(head).join("\n")}

**One-liner:** Fewer married-couple households, more people living alone, and steady rates of children raised by one parent than a generation ago.

**Caveat:** CPS ASEC series carry population-control revisions (the Census Bureau's own "r" and lettered footnote rows) and a 2014 questionnaire redesign; each series' \`_meta.note\` and \`breaks\` name the specific seam, and the later-method row is always the one that ships.

---

## Quick Context

${keys.length} long-run annual US series on marriage, households, living arrangements, births, child welfare, religion and social connection, and immigration. Every value is read from the organization that produces it (U.S. Census Bureau, CDC/NCHS, ACF Children's Bureau, NORC GSS, DHS Office of Homeland Security Statistics). Nothing is interpolated or smoothed; where a survey skipped a year, or a wartime gap exists in the publisher's own table (CPS did not run 1941-1946), the series skips it too.

Confidence: **Very High (95%+)** for published agency/survey figures copied as-is; **High (85-94%)** for the GSS items and the married/cohabiting shares, which are computed here from microdata or two publisher columns with the exact formula named in each series' \`note\`.

---

## Methodology Summary

**Approach:** one re-runnable script (\`update.ts\`) fetches each series from its primary publisher and writes one JSON file per series with a provenance block; \`docs.ts\` regenerates this summary and the README from those files.

**Sources:** see [source.md](source.md) - every URL, table, and column.

**Definition used:** the publisher's own definition, restated in each series' \`_meta.note\` with its exact formula and every named break.

---

## Not Yet Shipped

| Key | Why not (yet) |
|---|---|
${Object.entries(deferred).map(([k, reason]) => `| \`${k}\` | ${NOT_INCLUDED[k] ?? reason.slice(0, 200)} |`).join("\n")}

---

## Update Schedule

| Series | Cadence | Typical lag |
|---|---|---|
| Census Bureau CPS ASEC (marriage, households, mobility, fertility) | annual (March/September releases) | months |
| Census Bureau Population Estimates (median age, 65+ share) | annual vintage release | months |
| CDC/NCHS births | annual final-data table | ~1-2 years |
| ACF Children's Bureau (AFCARS, Child Maltreatment) | annual | ~1 year, preliminary first |
| NORC GSS | every two years | ~1 year after fieldwork |
| DHS Office of Homeland Security Statistics Yearbook | annual | ~1-2 years |

Last regenerated: ${today}.

---

## Changelog

| Date | Change | Reason |
|------|--------|--------|
| 2026-09-10 | Dataset created with ${keys.length} series | Powers the Family & Society section of https://usstats.io |
`);

await writeFile(join(DIR, "README.md"), `# US Family and Society

**${keys.length} long-run annual US series on marriage, households, living arrangements, births, child welfare, religion and social connection, and immigration - every value from its primary publisher, in one machine-readable place.**

Companion to [US-Societal-Health](../US-Societal-Health/) and [US-Common-Metrics](../US-Common-Metrics/). Powers the family-and-society sections of the live almanac **https://usstats.io** (each row there links to a page with the full series and these sources).

## Quick Start

\`\`\`bash
cat SUMMARY.md                              # the answer first
cat index.json                              # what's here: name, unit, source, coverage per series
cat series/marriedCoupleHouseholds.json     # one series: { _meta: {...provenance}, data: { "1940": 76.0, ... } }
bun --env-file=$HOME/.claude/.env update.ts # refresh everything from the publishers (needs pdftotext; BLS_API_KEY/CENSUS_API_KEY unlock 5 more)
bun update.ts --only gss,moversShare        # refresh a subset
bun docs.ts                                 # regenerate README.md + SUMMARY.md + source.md from the data
\`\`\`

## Contents

| File | Description |
|------|-------------|
| \`SUMMARY.md\` | Answer-first summary with headline numbers (generated) |
| \`index.json\` | Catalog of every series: name, unit, source, coverage, fetch time |
| \`series/<key>.json\` | One file per series: \`_meta\` provenance block + \`data\` year→value |
| \`deferred.json\` | Requested keys not yet shippable, each with the exact blocking evidence |
| \`source.md\` | Every source: URL, table, column, formula, breaks |
| \`data/nchs/\` | Four cdc.gov reports checked in with a browser-read date and sha256 (\`READ.md\`), since cdc.gov 403s every scripted fetch |
| \`update.ts\` | Re-runnable fetcher (caches large downloads in \`.cache/\`) |
| \`docs.ts\` | Regenerates this README, SUMMARY.md and source.md from the data |
| \`update.log\` | One line per refresh |

## Series format

\`\`\`json
{
  "_meta": {
    "key": "marriedCoupleHouseholds",
    "name": "Married-couple households",
    "unit": "percent of households",
    "source": "U.S. Census Bureau, historical family and living-arrangement tables",
    "sourceUrl": "https://www2.census.gov/...",
    "goodDirection": "neutral",
    "cadence": "annual",
    "annualRule": "publisher survey/census year; sparse historical observations retained",
    "class": "living",
    "breaks": "every methodology break named here",
    "note": "exact formula and every named break",
    "coverage": "1940–2025",
    "fetched": "ISO timestamp"
  },
  "data": { "1940": 76.0, "1947": 78.7, "…": 0 }
}
\`\`\`

Rules this dataset runs on:

- **Primary publisher only.** Aggregators are never a source; the agency or survey organization is.
- **No interpolation, no smoothing.** A survey year that was skipped, or a wartime gap in the publisher's own table (CPS 1941-1946), is absent - never filled in.
- **Breaks are named, never smoothed over.** CPS ASEC population-control revisions, the 2014 questionnaire redesign, the 2007 cohabiting-parent pointer change, the AFCARS 2020 reporting rule.
- **Duplicate-year footnote rows are resolved deterministically.** Where a Census table lists a year twice (a lettered footnote row plus a plain row), the lettered/revised row is the one that ships - the exact rule and its evidence are in \`lib/census.ts\`.
- **Computed values say so.** GSS percentages are computed here from cumulative microdata (weight and codes named); married/cohabiting shares are computed from two publisher columns with the exact division named.
- **A source that blocks scripted fetches is checked in, never skipped.** cdc.gov returns HTTP 403 to every automated request for its NVSR/data-brief PDFs; the four reports behind \`meanAgeFirstBirth\` and the \`births\` extension were each read once through a real browser session and are checked in at \`data/nchs/\`, with the read date and sha256 recorded in \`data/nchs/READ.md\`. \`update.ts\` re-verifies the hash before every parse and refuses to run on a mismatch.

## Series

${tables}

## Not included, and why

See [Not Yet Shipped](#not-yet-shipped) in SUMMARY.md, or \`deferred.json\` for the exact evidence per key.

## Data Sources

See [source.md](source.md). Publishers: U.S. Census Bureau, CDC/NCHS, ACF Children's Bureau, NORC (GSS), DHS Office of Homeland Security Statistics.

## Research provenance

[research/us-stats-expansion-2026-09/](../../research/us-stats-expansion-2026-09/) - the research question, the quality filter, the candidate dispositions, and what the data shows.

---

*Last regenerated ${today} by \`docs.ts\`.*
`);

const srcRows = keys.map((k) => { const m = S[k]._meta; const urls = [m.sourceUrl, ...(m.historicalSourceUrls ?? [])].map((u: string) => `<${u}>`).join(" · "); return `### ${m.name} (\`${k}\`)\n\n- **Publisher:** ${m.source}\n- **Where:** ${urls}\n- **Unit:** ${m.unit}\n- **Coverage:** ${m.coverage}\n- **Note:** ${m.note}\n- **Breaks:** ${m.breaks}`; }).join("\n\n");
const deferredRows = Object.entries(deferred).map(([k, reason]) => `### ${k} (deferred)\n\n${reason}`).join("\n\n");
await writeFile(join(DIR, "source.md"), `# Sources — US Family and Society\n\nGenerated by \`docs.ts\` from each series’ \`_meta\` block; regenerate after \`update.ts\`. Access date for everything below: ${today}. Every number in this dataset traces to one of these entries.\n\n## Publishers\n\n| Publisher | Access path | Keys |\n|---|---|---|\n${Object.entries(keys.reduce<Record<string, string[]>>((acc, k) => { (acc[S[k]._meta.source] ??= []).push(k); return acc; }, {})).map(([src, ks]) => `| ${src} | ${S[ks[0]]._meta.sourceUrl} | ${ks.join(", ")} |`).join("\n")}\n\n## Shipped series\n\n${srcRows}\n\n## Deferred keys, with evidence\n\n${deferredRows}\n`);
console.log(`README.md + SUMMARY.md + source.md regenerated for ${keys.length} series (${Object.keys(deferred).length} deferred)`);
