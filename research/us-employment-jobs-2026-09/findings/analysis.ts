#!/usr/bin/env bun
// analysis.ts — the deterministic half of the README's Answer: for every series in Data/US-Employment-And-Jobs,
// the value at the start of the display window (2019), at the ChatGPT marker (November 2022, or the first period
// after it), and the latest, with the change over each leg. Level and trend only; no causal model.
// Run: bun findings/analysis.ts  (prints markdown; the README pastes it and adds the verdict column by hand)
import { join } from "node:path";
import { readdirSync } from "node:fs";
const DIR = join(import.meta.dir, "..", "..", "..", "Data", "US-Employment-And-Jobs", "series");
const MARK = "2022-11";
const rows: string[] = [];
for (const f of readdirSync(DIR).filter((x) => x.endsWith(".json")).sort()) {
  const j = await Bun.file(join(DIR, f)).json();
  const m = j._meta;
  const src: Record<string, number> = j.native ?? j.data;
  const keys = Object.keys(src).sort();
  const at = (p: string) => { const k = keys.find((x) => x >= p) ?? keys[keys.length - 1]; return [k, src[k]] as const; };
  const first = keys[0] >= "2019" ? [keys[0], src[keys[0]]] as const : at("2019-01");
  const mark = keys[0] > MARK ? null : at(MARK);
  const last = [keys[keys.length - 1], src[keys[keys.length - 1]]] as const;
  const pct = (a: number, b: number) => `${b - a >= 0 ? "+" : "−"}${Math.abs((b / a - 1) * 100).toFixed(1)}%`;
  const pts = (a: number, b: number) => `${b - a >= 0 ? "+" : "−"}${Math.abs(b - a).toFixed(1)} pts`;
  const isPct = /percent/.test(m.unit);
  const d = isPct ? pts : pct;
  rows.push(`| ${m.name} (${m.class}) | ${first[1]} (${first[0]}) | ${mark ? `${mark[1]} (${mark[0]})` : "—"} | ${last[1]} (${last[0]}) | ${mark ? d(first[1], mark[1]) : "—"} | ${mark ? d(mark[1], last[1]) : d(first[1], last[1])} |`);
}
console.log(`| Series | 2019 (or start) | At ChatGPT (${MARK}) | Latest | 2019 → Nov 2022 | Nov 2022 → latest |\n|---|---|---|---|---|---|\n${rows.join("\n")}`);
