#!/usr/bin/env bun
// Regenerate documentation from index.json and annual series; run after update.ts.
import { join } from "node:path";
import { writeFile } from "node:fs/promises";
import type { SeriesMeta } from "./lib/meta";

type Meta = SeriesMeta & { coverage: string; fetched: string; provisional?: number[]; partialYear?: number; partialThrough?: string };
type Series = { _meta: Meta; data: Record<string, number> };
const DIR = import.meta.dir;
const index = await Bun.file(join(DIR, "index.json")).json();
const keys: string[] = Object.keys(index.series).sort();
const S: Record<string, Series> = {};
for (const k of keys) S[k] = await Bun.file(join(DIR, "series", `${k}.json`)).json();
const today = new Date().toISOString().slice(0, 10);
const GROUPS = ["incidence", "mortality", "coverage"] as const;
const annual = (k: string) => {
  const ys = Object.keys(S[k].data).sort();
  const y = ys.at(-1)!;
  return { y, v: S[k].data[y], first: ys[0], fv: S[k].data[ys[0]], n: ys.length };
};
const value = (k: string, y: string) => `${S[k].data[y]} (${y}${S[k]._meta.provisional?.includes(+y) ? "; provisional" : ""}${S[k]._meta.partialYear === +y ? `; year to date through ${S[k]._meta.partialThrough}` : ""})`;
const row = (k: string) => {
  const m = S[k]._meta, a = annual(k);
  return `| [${m.name}](series/${k}.json) | ${value(k, a.y)} | ${value(k, a.first)} | ${m.unit} | ${m.cadence} | ${m.coverage} · ${a.n} pts | ${m.source} |`;
};
const tables = GROUPS.map(c => `### ${c[0].toUpperCase() + c.slice(1)}\n\n| Series | Latest | First | Unit | Cadence | Coverage | Publisher |\n|---|---|---|---|---|---|---|\n${keys.filter(k => S[k]._meta.class === c).map(row).join("\n")}`).join("\n\n");
const points = keys.reduce((n, k) => n + annual(k).n, 0);
const provisional = keys.filter(k => S[k]._meta.provisional?.length).map(k => `\`${k}\` (${S[k]._meta.provisional!.join(", ")})`).join("; ");
const readme = `# US Disease & Vaccination

**${keys.length} reported-disease incidence, cause-specific mortality, and vaccination-coverage series for the United States, in one machine-readable place, each from its primary publisher.**

Seasons and school years map to the calendar year they end; birth cohorts map to the birth year. Group A incidence rates from 2020 use NNDSS final counts divided by the Census July 1 resident population (FRED POPTHM), multiplied by 100,000; earlier rates are NCHS's. Overlap checks found roughly 1–8% publisher-denominator/rounding differences: two-decimal rounding matters near zero, and IDNotif excludes non-reporting jurisdictions from some denominators. Each affected series' own note gives its applicable denominator and method specifics. Congenital syphilis is counts, not a population-based rate.

The two NIS-Child instruments, children 19–35 months by survey year and children by age 24 months by birth year, are paired, not spliced. The site should show them side by side, never as one continuous line.

Current \`provisional\` arrays: ${provisional || "none"}. Year-to-date values: ${keys.filter(k => S[k]._meta.partialYear).map(k => `\`${k}\` (${S[k]._meta.partialYear} through ${S[k]._meta.partialThrough})`).join("; ") || "none"}. For COVID deaths, the flag marks the latest partial calendar year of NCHS weekly provisional death counts; recent unflagged years can also be revised and are not certified final by the absence of a flag. Influenza/pneumonia and HIV death rates for 2020–2024 are final CDC WONDER values; a year that exists only in the NCHS VSRR provisional series would be flagged provisional.

No sentence in this dataset attributes a movement in disease cases to vaccination or the reverse. That interpretive work belongs to [the research project](../../research/us-disease-vaccination-2026-09/METHODOLOGY.md), not the raw series notes.

## Quick Start

\`\`\`bash
bun update.ts            # refresh sources and rebuild annual series + index.json
bun docs.ts              # regenerate README.md, SUMMARY.md, source.md
\`\`\`

Each \`series/<key>.json\` holds \`_meta\` (publisher, unit, cadence, class, coverage, method note, breaks, and provisional years where applicable) and \`data\` (year → value). All series are annual-only; no \`native\` block is written. Browser-read NNDSS counts are checked in with citations; refreshing the builder does not re-read those pages.

## Series

${tables}

## Rules this dataset runs on

1. Primary publisher only; aggregators are not data sources.
2. One instrument's repeated measure per series; methodology breaks are explicit.
3. Preserve missing years; do not interpolate or splice paired instruments.
4. Mark provisional years and retain each publisher's revision caveats.
5. No causal attribution between disease incidence and vaccination coverage.

## Provenance

Research project: [research/us-disease-vaccination-2026-09](../../research/us-disease-vaccination-2026-09/METHODOLOGY.md), including the quality filter and year-mapping methodology. Full source list and unabridged method notes: [source.md](source.md).

_Generated ${today} by docs.ts from index.json and series/*.json (${points} data points)._
`;
const headlines = ["measlesRate", "childMmr1935", "childMmr24mo", "covidDeaths"];
const summary = `# US Disease & Vaccination — Summary

## 🎯 BEST ESTIMATE

| Metric | Value | Confidence | Last Updated |
|--------|-------|------------|--------------|
${headlines.map(k => `| **${S[k]._meta.name}${k === "childMmr1935" ? " (survey year)" : k === "childMmr24mo" ? " (birth year)" : ""}** | **${value(k, annual(k).y)} ${S[k]._meta.unit}** | ${k === "covidDeaths" ? "85%" : "95%"} | ${index.generated.slice(0, 10)} |`).join("\n")}

**One-liner:** ${keys.length} primary-sourced annual US disease, mortality, and vaccination-coverage series.

**Caveat:** Different instruments and provisional observations cannot establish causal relationships between vaccination and disease.

## Quick Context

These headline rows are separate measures, not one combined estimate; the full ${keys.length}-series table lives in [README.md](README.md). MMR survey-year and birth-year rows are paired instruments, and the COVID row is a partial provisional year. Confidence percentages are qualitative source-confidence labels required by the dataset template, not statistical intervals or completeness estimates.

## Methodology Summary

**Approach:** retain publisher annual values, derive 2020-onward Group A rates from final counts and POPTHM population, and aggregate COVID weekly counts by week-ending calendar year.

**Sources:** [source.md](source.md) lists every primary publisher, endpoint, and full method note; [research methodology](../../research/us-disease-vaccination-2026-09/METHODOLOGY.md) defines the selection rules.

**Definition Used:** reported incidence, cause-specific mortality, and survey or school-assessment coverage, with instrument boundaries and year mappings retained.

## Changelog

| Date | Change | Reason |
|------|--------|--------|
| ${index.generated.slice(0, 10)} | Regenerated documentation for ${keys.length} series | Match the current index and annual series |
`;
const source = `# Sources — US Disease & Vaccination

Every series, its primary publisher, source documents, cadence/class, coverage, and full method note.

${GROUPS.map(c => keys.filter(k => S[k]._meta.class === c).map(k => {
  const m = S[k]._meta;
  return `## ${m.name} (\`${k}\`)\n\n- **Publisher:** ${m.source}\n- **Source URL:** ${m.sourceUrl}${(m.historicalSourceUrls ?? []).map(u => `\n- **Also:** ${u}`).join("")}\n- **Unit:** ${m.unit}\n- **Cadence:** ${m.cadence} · annual rule: ${m.annualRule} · class: ${m.class}\n- **Coverage:** ${m.coverage}\n- **Breaks:** ${m.breaks}\n- **Provisional years:** ${m.provisional?.join(", ") || "none flagged"}\n- **Method & caveats:** ${m.note}\n`;
}).join("\n")).join("\n")}
_Generated ${today} by docs.ts._
`;
await writeFile(join(DIR, "README.md"), readme);
await writeFile(join(DIR, "SUMMARY.md"), summary);
await writeFile(join(DIR, "source.md"), source);
console.log(`docs regenerated for ${keys.length} series`);
