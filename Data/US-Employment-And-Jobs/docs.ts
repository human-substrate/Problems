#!/usr/bin/env bun
// docs.ts — regenerates README.md, SUMMARY.md, and source.md from index.json + series/*.json so the
// docs can never drift from the data. Run after update.ts:  bun docs.ts
import { join } from "node:path";
import { writeFile } from "node:fs/promises";

const DIR = import.meta.dir;
const index = await Bun.file(join(DIR, "index.json")).json();
const keys: string[] = Object.keys(index.series).sort();
const S: Record<string, any> = {};
for (const k of keys) S[k] = await Bun.file(join(DIR, "series", `${k}.json`)).json();
const today = new Date().toISOString().slice(0, 10);

const outcome = keys.filter((k) => S[k]._meta.class === "outcome");
const phenomenon = keys.filter((k) => S[k]._meta.class === "phenomenon");
const GROUPS: [string, string[]][] = [
  ["Labor-market outcomes (long history — the baseline AI would have to move)", outcome],
  ["The AI phenomenon itself (series that begin when their instrument began)", phenomenon],
];

const lastNative = (k: string) => { const n = S[k].native; if (!n) return null; const ps = Object.keys(n); const p = ps[ps.length - 1]; return { p, v: n[p], first: ps[0], fv: n[ps[0]], n: ps.length }; };
const lastAnnual = (k: string) => { const ys = Object.keys(S[k].data); const y = ys[ys.length - 1]; return { y, v: S[k].data[y], first: ys[0], fv: S[k].data[ys[0]], n: ys.length }; };
const row = (k: string) => {
  const m = S[k]._meta, ln = lastNative(k), la = lastAnnual(k);
  const latest = ln ? `${ln.v} (${ln.p})` : `${la.v} (${la.y})`;
  const first = ln ? `${ln.fv} (${ln.first})` : `${la.fv} (${la.first})`;
  const cov = ln ? `${m.nativeCoverage} · ${ln.n} ${m.cadence} pts` : `${m.coverage} · ${la.n} pts`;
  return `| [${m.name}](series/${k}.json) | ${latest} | ${first} | ${m.unit} | ${m.cadence} | ${cov} | ${m.source} |`;
};
const tables = GROUPS.filter(([, ks]) => ks.length).map(([title, ks]) => `### ${title}\n\n| Series | Latest | First | Unit | Cadence | Coverage | Publisher |\n|---|---|---|---|---|---|---|\n${ks.map(row).join("\n")}`).join("\n\n");
const points = keys.reduce((n, k) => n + Object.keys(S[k].native ?? S[k].data).length, 0);

const readme = `# US Employment & Jobs (the AI era)

**${keys.length} US labor-market series chosen to show whether AI is visible in jobs, hiring, and layoffs since ChatGPT (November 30, 2022) — stored at each publisher's own cadence, every value from its primary publisher, in one machine-readable place.**

Two kinds of series, kept apart on purpose: **outcome** series with long history (sector employment, job postings, entry-level unemployment, openings, layoffs) so a pre-AI baseline exists to compare against, and **phenomenon** series that measure AI itself (adoption at firms and among workers, AI-attributed job cuts, AI in postings) and therefore begin when their instrument began. What the data does and does not show, and what the published studies conclude, is written up once in [the research project](../../research/us-employment-jobs-2026-09/README.md), not in this dataset.

Powers the **Employment & Jobs** section of **https://usstats.io** (each row links to a page with the native-cadence chart, the full table, and these sources; https://usstats.io/data/stats-native.csv serves the sub-annual values).

## Quick Start

\`\`\`bash
bun update.ts            # refresh every series from its publisher (no API keys)
bun update.ts --only fred
bun docs.ts              # regenerate this README, SUMMARY.md, source.md from the data
\`\`\`

Each \`series/<key>.json\` holds \`_meta\` (provenance, cadence, the annual derivation rule, the class, and the method note), \`native\` (period → value at the publisher's cadence; absent for annual publishers), and \`data\` (year → value derived by \`annualRule\`; the current year is flagged \`partialYear\`/\`partialThrough\`).

## Series

${tables}

## Rules this dataset runs on

1. Primary publisher only; aggregators were finding aids.
2. One instrument's repeated measure per series; every methodology break named in the note.
3. Native cadence stored; annual values derived by the stated rule, never the reverse.
4. No causal claim in any note: the series are shown against the ChatGPT date on the site, and the studies are the interpretation layer in the research README.
5. Vendor and platform data only where the platform publishes the data itself with a stated method.

## Provenance

Research project: [research/us-employment-jobs-2026-09](../../research/us-employment-jobs-2026-09/README.md) — the quality filter, every candidate's disposition, and the independent re-verification of every shipped value. Full source list: [source.md](source.md).

_Generated ${today} by docs.ts from index.json and series/*.json (${points} data points)._
`;

const summary = `# US Employment & Jobs — Summary

---

## 🎯 BEST ESTIMATE

| Metric | Value | Confidence | Last Updated |
|--------|-------|------------|--------------|
${keys.map((k) => { const m = S[k]._meta, ln = lastNative(k), la = lastAnnual(k); return `| **${m.name}** | **${ln ? `${ln.v} (${ln.p})` : `${la.v} (${la.y})`}** | ${m.class === "outcome" ? "95%" : "85%"} | ${index.generated.slice(0, 10)} |`; }).join("\n")}

**One-liner:** ${keys.length} primary-sourced US labor series, native cadence, chosen to show whether AI shows in jobs.

**Caveat:** These series can show timing and magnitude of change since November 2022; none of them, alone, can attribute a change to AI.

---

## Quick Context

The dataset answers "what happened to US jobs, hiring, and layoffs around and after ChatGPT" with the publishers' own numbers, at their own cadence, from 2019 (or earlier) so the pre-AI baseline is visible. Outcome series carry long history; phenomenon series start when their instrument did. Attribution is left to the named studies in the research README.

---

## Methodology Summary

**Approach:** every series is fetched by \`update.ts\` from its primary publisher and stored at native cadence; annual values are derived by a stated rule. Every shipped value was re-read from the publisher independently of the research lanes that proposed it.

**Sources:** see [source.md](source.md).

---

## Changelog

| Date | Change | Reason |
|------|--------|--------|
| ${index.generated.slice(0, 10)} | Dataset created with ${keys.length} series | usstats.io Employment & Jobs section |
`;

const source = `# Sources — US Employment & Jobs

Every series, its publisher, the exact endpoint or document \`update.ts\` reads, cadence, and the method note.

${keys.map((k) => { const m = S[k]._meta; return `## ${m.name} (\`${k}\`)\n\n- **Publisher:** ${m.source}\n- **Source URL:** ${m.sourceUrl}${(m.historicalSourceUrls ?? []).map((u: string) => `\n- **Also:** ${u}`).join("")}\n- **Unit:** ${m.unit}\n- **Cadence:** ${m.cadence} · annual rule: ${m.annualRule} · class: ${m.class}\n- **Coverage:** ${m.nativeCoverage ?? m.coverage}\n- **Method & caveats:** ${m.note}\n`; }).join("\n")}
_Generated ${today} by docs.ts._
`;
await writeFile(join(DIR, "README.md"), readme);
await writeFile(join(DIR, "SUMMARY.md"), summary);
await writeFile(join(DIR, "source.md"), source);
console.log(`docs regenerated for ${keys.length} series`);
