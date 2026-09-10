#!/usr/bin/env bun
// update.ts — regenerates every series in this dataset from its primary publisher.
// Run: bun update.ts [--only key1,key2]   (appends a line to update.log)
// Output: series/<key>.json  { _meta: {...provenance}, data: { "YYYY": value } }  +  index.json
// Prerequisites: bun; `unzip` and `pdftotext` (poppler) on PATH for the NSDUH / GSS zips and the NIAAA PDF.
// Large downloads are cached under .cache/ (gitignored). No API keys.

import { mkdir, writeFile, readFile, appendFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { readDta } from "./lib/stata.ts";

const DIR = import.meta.dir;
const SERIES = join(DIR, "series");
const CACHE = join(DIR, ".cache");
const UA = "substrate-us-societal-health/1.0 (+https://github.com/danielmiessler/substrate)";
const NOW = new Date().toISOString();
const only = (() => { const i = process.argv.indexOf("--only"); return i >= 0 ? new Set(process.argv[i + 1].split(",")) : null; })();

function invariant(cond: unknown, msg: string): asserts cond { if (!cond) throw new Error(`InvariantViolation: ${msg}`); }
async function getText(url: string, init: RequestInit = {}): Promise<string> {
  const r = await fetch(url, { ...init, headers: { "User-Agent": UA, ...(init.headers ?? {}) } });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${url}`);
  return r.text();
}
async function getJSON<T>(url: string): Promise<T> { return JSON.parse(await getText(url)) as T; }
async function download(url: string, name: string): Promise<string> {
  await mkdir(CACHE, { recursive: true });
  const p = join(CACHE, name);
  if (existsSync(p)) return p;
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${url}`);
  await Bun.write(p, await r.arrayBuffer());
  return p;
}
async function sh(cmd: string[], cwd?: string): Promise<string> {
  const p = Bun.spawn(cmd, { cwd, stdout: "pipe", stderr: "pipe" });
  const out = await new Response(p.stdout).text();
  const err = await new Response(p.stderr).text();
  if ((await p.exited) !== 0) throw new Error(`${cmd[0]} failed: ${err.slice(0, 300)}`);
  return out;
}
const round = (n: number, d = 1) => Number(n.toFixed(d));

type Meta = {
  name: string; unit: string; source: string; sourceUrl: string; historicalSourceUrls?: string[];
  note: string; goodDirection: "up" | "down" | "neutral"; method: string; partialYear?: number; partialThrough?: string;
};
const written: Record<string, { years: number; first: number; last: number; latest: number }> = {};
async function save(key: string, meta: Meta, data: Record<string, number>, bounds: [number, number], min = 10) {
  const years = Object.keys(data).map(Number).sort((a, b) => a - b);
  invariant(years.length >= min, `${key}: only ${years.length} years (min ${min})`);
  for (const y of years) invariant(data[y] >= bounds[0] && data[y] <= bounds[1], `${key} ${y}: ${data[y]} outside [${bounds}]`);
  const ordered: Record<string, number> = {};
  for (const y of years) ordered[String(y)] = data[String(y)];
  await mkdir(SERIES, { recursive: true });
  await writeFile(join(SERIES, `${key}.json`), JSON.stringify({ _meta: { key, ...meta, coverage: `${years[0]}–${years[years.length - 1]}`, fetched: NOW }, data: ordered }, null, 2));
  written[key] = { years: years.length, first: years[0], last: years[years.length - 1], latest: data[String(years[years.length - 1])] };
  console.log(`✓ ${key.padEnd(22)} ${years[0]}–${years[years.length - 1]} (${years.length}y)  latest ${data[String(years[years.length - 1])]}`);
}
const errors: Record<string, string> = {};
async function run(group: string, fn: () => Promise<void>) {
  if (only && !only.has(group)) return;
  try { await fn(); } catch (e) { errors[group] = String(e); console.error(`✗ ${group}: ${String(e).slice(0, 400)}`); }
}

// ---------- HTML table helper (Gallup publishes its trend tables as <table><caption>…) ----------
type Tbl = { caption: string; rows: string[][] };
function htmlTables(html: string): Tbl[] {
  return (html.match(/<table[\s\S]*?<\/table>/g) ?? []).map((t) => {
    const caption = (t.match(/<caption[^>]*>([\s\S]*?)<\/caption>/)?.[1] ?? "").replace(/<[^>]+>/g, "").replace(/&gt;/g, ">").replace(/&amp;/g, "&").trim();
    const rows = [...t.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((m) =>
      [...m[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((c) => c[1].replace(/<[^>]+>/g, "").replace(/&lt;br&gt;/g, " ").replace(/&nbsp;/g, " ").trim()));
    return { caption, rows };
  });
}
// first 4-digit year in the row label; newest-first tables → the first row seen for a year wins (e.g. 1991 Oct over 1991 Feb)
function yearSeries(rows: string[][], col: number): Record<string, number> {
  const out: Record<string, number> = {};
  for (const r of rows) {
    const y = r[0]?.match(/\b(19|20)\d\d\b/)?.[0];
    const v = Number(r[col]);
    if (!y || !Number.isFinite(v) || r[col] === "") continue;
    if (!(y in out)) out[y] = v;
  }
  return out;
}

// ================= GSS (NORC cumulative file, read directly) =================
const GSS_ZIP = "https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip";
const GSS_PAGE = "https://gss.norc.org/get-the-data/stata.html";
const GSS_NOTE = "NORC General Social Survey cumulative file, computed here from the public microdata: weighted (WTSSPS, NORC's post-stratification weight available for every year 1972–2024) share of valid responses. 2021 moved to a push-to-web design during the pandemic and 2022/2024 are mixed-mode; NORC advises caution comparing 2021+ with the in-person years, so treat 2021 as a seam.";
const GSS_ITEMS: { key: string; v: string; pos: number[]; valid: number[]; name: string; unit: string; dir: Meta["goodDirection"]; q: string }[] = [
  { key: "veryHappy", v: "happy", pos: [1], valid: [1, 2, 3], name: "Very Happy", unit: "percent of adults \"very happy\"", dir: "up", q: "Taken all together, how would you say things are these days — would you say that you are very happy, pretty happy, or not too happy?" },
  { key: "lifeExciting", v: "life", pos: [1], valid: [1, 2, 3], name: "Life Is Exciting", unit: "percent of adults who find life exciting", dir: "up", q: "In general, do you find life exciting, pretty routine, or dull?" },
  { key: "satisfiedFinances", v: "satfin", pos: [1], valid: [1, 2, 3], name: "Satisfied With Finances", unit: "percent pretty well satisfied with their financial situation", dir: "up", q: "So far as you and your family are concerned, would you say that you are pretty well satisfied with your present financial situation, more or less satisfied, or not satisfied at all?" },
  { key: "financesBetter", v: "finalter", pos: [1], valid: [1, 2, 3], name: "Finances Getting Better", unit: "percent whose financial situation has been getting better", dir: "up", q: "During the last few years, has your financial situation been getting better, worse, or has it stayed the same?" },
  { key: "betterThanParents", v: "parsol", pos: [1, 2], valid: [1, 2, 3, 4, 5], name: "Better Off Than Parents", unit: "percent whose standard of living is better than their parents' at the same age", dir: "up", q: "Compared to your parents when they were the age you are now, do you think your own standard of living now is much better, somewhat better, about the same, somewhat worse, or much worse than theirs was?" },
  { key: "kidsBetterOff", v: "kidssol", pos: [1, 2], valid: [1, 2, 3, 4, 5], name: "Kids Will Be Better Off", unit: "percent expecting their children's standard of living to be better than their own", dir: "up", q: "When your children are at the age you are now, do you think their standard of living will be much better, somewhat better, about the same, somewhat worse, or much worse than yours is now?" },
  { key: "hardWorkGetsAhead", v: "getahead", pos: [1], valid: [1, 2, 3], name: "Hard Work Gets You Ahead", unit: "percent saying people get ahead by hard work (vs. luck or help)", dir: "up", q: "Some people say that people get ahead by their own hard work; others say that lucky breaks or help from other people are more important. Which do you think is most important?" },
  { key: "peopleCanBeTrusted", v: "trust", pos: [1], valid: [1, 2, 3], name: "Most People Can Be Trusted", unit: "percent saying most people can be trusted", dir: "up", q: "Generally speaking, would you say that most people can be trusted or that you can't be too careful in dealing with people?" },
  { key: "confPress", v: "conpress", pos: [1], valid: [1, 2, 3], name: "Confidence in the Press (GSS)", unit: "percent with a great deal of confidence", dir: "up", q: "As far as the people running these institutions are concerned, would you say you have a great deal of confidence, only some confidence, or hardly any confidence at all in them? — The press" },
  { key: "confTv", v: "contv", pos: [1], valid: [1, 2, 3], name: "Confidence in Television (GSS)", unit: "percent with a great deal of confidence", dir: "up", q: "… — Television" },
  { key: "confCongress", v: "conlegis", pos: [1], valid: [1, 2, 3], name: "Confidence in Congress (GSS)", unit: "percent with a great deal of confidence", dir: "up", q: "… — Congress" },
  { key: "confExecutive", v: "confed", pos: [1], valid: [1, 2, 3], name: "Confidence in the Executive Branch (GSS)", unit: "percent with a great deal of confidence", dir: "up", q: "… — Executive branch of the federal government" },
  { key: "confSupremeCourt", v: "conjudge", pos: [1], valid: [1, 2, 3], name: "Confidence in the Supreme Court (GSS)", unit: "percent with a great deal of confidence", dir: "up", q: "… — U.S. Supreme Court" },
  { key: "confEducation", v: "coneduc", pos: [1], valid: [1, 2, 3], name: "Confidence in Education", unit: "percent with a great deal of confidence in the people running education", dir: "up", q: "… — Education" },
  { key: "confScience", v: "consci", pos: [1], valid: [1, 2, 3], name: "Confidence in Science", unit: "percent with a great deal of confidence in the scientific community", dir: "up", q: "… — Scientific community" },
  { key: "confMedicine", v: "conmedic", pos: [1], valid: [1, 2, 3], name: "Confidence in Medicine (GSS)", unit: "percent with a great deal of confidence", dir: "up", q: "… — Medicine" },
  { key: "confBusiness", v: "conbus", pos: [1], valid: [1, 2, 3], name: "Confidence in Major Companies (GSS)", unit: "percent with a great deal of confidence", dir: "up", q: "… — Major companies" },
  { key: "confBanks", v: "confinan", pos: [1], valid: [1, 2, 3], name: "Confidence in Banks (GSS)", unit: "percent with a great deal of confidence", dir: "up", q: "… — Banks and financial institutions" },
  { key: "confMilitary", v: "conarmy", pos: [1], valid: [1, 2, 3], name: "Confidence in the Military (GSS)", unit: "percent with a great deal of confidence", dir: "up", q: "… — Military" },
  { key: "confReligion", v: "conclerg", pos: [1], valid: [1, 2, 3], name: "Confidence in Organized Religion (GSS)", unit: "percent with a great deal of confidence", dir: "up", q: "… — Organized religion" },
  { key: "confLabor", v: "conlabor", pos: [1], valid: [1, 2, 3], name: "Confidence in Organized Labor (GSS)", unit: "percent with a great deal of confidence", dir: "up", q: "… — Organized labor" },
];
await run("gss", async () => {
  const zip = await download(GSS_ZIP, "GSS_stata.zip");
  const dta = join(CACHE, "GSS_stata", "gss7224_r3a.dta");
  if (!existsSync(dta)) await sh(["unzip", "-o", "-q", zip, "GSS_stata/gss7224_r3a.dta", "-d", CACHE]);
  const vars = ["year", "wtssps", "wordsum", ...GSS_ITEMS.map((i) => i.v)];
  const acc: Record<string, Record<string, { pos: number; all: number }>> = {};
  for (const it of GSS_ITEMS) acc[it.key] = {};
  const ws: Record<string, { sum: number; all: number }> = {}; // WORDSUM is a 0–10 mean, not a share
  await readDta(dta, vars, (r) => {
    const y = String(r.year), w = r.wtssps;
    if (w === null || w <= 0) return;
    const wv = r.wordsum;
    if (wv !== null && wv >= 0 && wv <= 10) { const a = (ws[y] ??= { sum: 0, all: 0 }); a.sum += w * wv; a.all += w; }
    for (const it of GSS_ITEMS) {
      const v = r[it.v];
      if (v === null || !it.valid.includes(v)) continue;
      const a = (acc[it.key][y] ??= { pos: 0, all: 0 });
      a.all += w; if (it.pos.includes(v)) a.pos += w;
    }
  });
  {
    const data: Record<string, number> = {};
    for (const [y, a] of Object.entries(ws)) if (a.all >= 200) data[y] = round(a.sum / a.all, 2);
    await save("wordsum", {
      name: "Vocabulary Test Score", unit: "mean correct answers on the GSS 10-word vocabulary test", source: "NORC General Social Survey (cumulative file 1972–2024)", sourceUrl: GSS_PAGE,
      historicalSourceUrls: [GSS_ZIP], goodDirection: "up",
      note: `WORDSUM: a ten-item multiple-choice vocabulary test administered in the GSS since 1974 with unchanged words — the longest-running repeated knowledge measure of US adults. Value is the weighted mean number correct (0–10). ${GSS_NOTE} The 2022/2024 upticks sit on that mode seam. Years with fewer than 200 weighted responses are dropped.`,
      method: "variable WORDSUM: weighted mean of valid scores 0–10, weight WTSSPS",
    }, data, [0, 10]);
  }
  for (const it of GSS_ITEMS) {
    const data: Record<string, number> = {};
    for (const [y, a] of Object.entries(acc[it.key])) if (a.all >= 200) data[y] = round(100 * a.pos / a.all);
    await save(it.key, {
      name: it.name, unit: it.unit, source: "NORC General Social Survey (cumulative file 1972–2024)", sourceUrl: GSS_PAGE,
      historicalSourceUrls: [GSS_ZIP], goodDirection: it.dir,
      note: `${it.q} ${GSS_NOTE} Years with fewer than 200 weighted responses are dropped.`, method: `variable ${it.v.toUpperCase()}: ${it.pos.join("/")} of valid codes ${it.valid.join("/")}, weight WTSSPS`,
    }, data, [0, 100]);
  }
});

// ================= Gallup (published trend tables; read from the page HTML) =================
const G1597 = "https://news.gallup.com/poll/1597/confidence-institutions.aspx";
const GALLUP_CONF: { key: string; caption: RegExp; name: string; dir: Meta["goodDirection"] }[] = [
  { key: "gallupReligion", caption: /^The Church or Organized Religion$/, name: "Confidence in Organized Religion", dir: "up" },
  { key: "gallupMilitary", caption: /^The Military$/, name: "Confidence in the Military", dir: "up" },
  { key: "gallupSupremeCourt", caption: /^Supreme Court$/, name: "Confidence in the Supreme Court", dir: "up" },
  { key: "gallupBanks", caption: /^Banks$/, name: "Confidence in Banks", dir: "up" },
  { key: "gallupPublicSchools", caption: /^Public Schools$/, name: "Confidence in Public Schools", dir: "up" },
  { key: "gallupNewspapers", caption: /^Newspapers$/, name: "Confidence in Newspapers", dir: "up" },
  { key: "gallupCongress", caption: /^Congress$/, name: "Confidence in Congress", dir: "up" },
  { key: "gallupTvNews", caption: /^Television news$/i, name: "Confidence in Television News", dir: "up" },
  { key: "gallupLabor", caption: /^Organized Labor$/, name: "Confidence in Organized Labor", dir: "up" },
  { key: "gallupPresidency", caption: /^The Presidency$/, name: "Confidence in the Presidency", dir: "up" },
  { key: "gallupPolice", caption: /^The Police$/, name: "Confidence in the Police", dir: "up" },
  { key: "gallupMedical", caption: /^Medical System$/, name: "Confidence in the Medical System", dir: "up" },
  { key: "gallupCriminalJustice", caption: /^Criminal Justice System$/, name: "Confidence in the Criminal Justice System", dir: "up" },
  { key: "gallupBigBusiness", caption: /^Big Business$/, name: "Confidence in Big Business", dir: "up" },
  { key: "gallupSmallBusiness", caption: /^Small Business$/, name: "Confidence in Small Business", dir: "up" },
];
await run("gallup-confidence", async () => {
  const tabs = htmlTables(await getText(G1597));
  invariant(tabs.length >= 15, `Gallup 1597: only ${tabs.length} tables`);
  for (const g of GALLUP_CONF) {
    const t = tabs.find((x) => g.caption.test(x.caption));
    invariant(t, `Gallup 1597: no table for ${g.key}`);
    const hdr = t.rows[0];
    const col = hdr.findIndex((h) => /great deal.*quite a lot/i.test(h));
    invariant(col > 0, `Gallup 1597 ${g.key}: no combined column in ${hdr.join("|")}`);
    const data = yearSeries(t.rows.slice(1), col);
    const sparse = Object.keys(data).length < 15;
    await save(g.key, {
      name: g.name, unit: "percent with a great deal or quite a lot of confidence", source: "Gallup, Confidence in Institutions", sourceUrl: G1597, goodDirection: g.dir,
      note: `Gallup's annual June Confidence in Institutions poll (telephone, ~1,000 adults): "Please tell me how much confidence you, yourself, have in each one — a great deal, quite a lot, some, or very little?" Value is great deal + quite a lot. Asked every year since 1993 and irregularly before; where Gallup polled twice in one year (1991) the later poll is kept.${sparse ? " This item has only been asked a handful of times — a sparse series, shown honestly." : ""}`,
      method: `table captioned "${t.caption}", column "${hdr[col]}"`,
    }, data, [0, 100]);
  }
});
const G1663 = "https://news.gallup.com/poll/1663/media-use-evaluation.aspx";
await run("gallup-media", async () => {
  const tabs = htmlTables(await getText(G1663));
  const t = tabs.find((x) => x.rows[0]?.some((h) => /great deal.*fair amount/i.test(h)));
  invariant(t, `Gallup 1663: no trust-in-media table among ${tabs.map((x) => x.caption).join(" · ")}`);
  const hdr = t.rows[0];
  const col = hdr.findIndex((h) => /great deal.*fair amount/i.test(h));
  const data = yearSeries(t.rows.slice(1), col);
  await save("trustMedia", {
    name: "Trust in Mass Media", unit: "percent with a great deal or fair amount of trust", source: "Gallup, Media Use and Evaluation", sourceUrl: G1663, goodDirection: "up",
    note: "\"In general, how much trust and confidence do you have in the mass media — such as newspapers, TV and radio — when it comes to reporting the news fully, accurately and fairly?\" Great deal + fair amount. Asked in 1972, 1974, 1976 and annually since 1997 (no 2006 reading); September field.",
    method: `table "${t.caption}", column "${hdr[col]}"`,
  }, data, [0, 100]);
});
const G1669 = "https://news.gallup.com/poll/1669/general-mood-country.aspx";
await run("gallup-satisfaction", async () => {
  const tabs = htmlTables(await getText(G1669));
  const t = tabs.find((x) => /Satisfaction U\.S\. Table/i.test(x.caption)) ?? tabs.find((x) => x.rows[0]?.some((h) => /^satisfied$/i.test(h)));
  invariant(t, "Gallup 1669: satisfaction table not found");
  const col = t.rows[0].findIndex((h) => /^satisfied$/i.test(h));
  const byYear: Record<string, number[]> = {};
  let latestMonth = "";
  const MON: Record<string, string> = { jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06", jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12" };
  for (const r of t.rows.slice(1)) {
    const y = r[0]?.match(/\b(19|20)\d\d\b/)?.[0]; const v = Number(r[col]);
    if (y && Number.isFinite(v) && r[col] !== "") (byYear[y] ??= []).push(v);
    if (y && !latestMonth) { const mo = r[0].match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i)?.[1]; if (mo) latestMonth = `${y}-${MON[mo.toLowerCase()]}`; }
  }
  const data: Record<string, number> = {};
  for (const [y, vs] of Object.entries(byYear)) data[y] = round(vs.reduce((a, b) => a + b, 0) / vs.length);
  const thisYear = new Date().getFullYear();
  await save("satisfiedWithCountry", {
    name: "Satisfied With How Things Are Going in the U.S.", unit: "percent satisfied, annual average of Gallup readings", source: "Gallup, Satisfaction With the United States", sourceUrl: G1669, goodDirection: "up",
    note: "\"In general, are you satisfied or dissatisfied with the way things are going in the United States at this time?\" Annual value is the plain average of every Gallup reading that year (monthly since 2001; one to four readings a year in the 1980s and 1990s, none in 1980). Gallup publishes the readings, not the annual average — the averaging is the only arithmetic here.",
    method: `table "${t.caption}", mean of "Satisfied" per calendar year`, partialYear: data[String(thisYear)] !== undefined ? thisYear : undefined, partialThrough: latestMonth.startsWith(String(thisYear)) ? latestMonth : undefined,
  }, data, [0, 100]);
});
const G702125 = "https://news.gallup.com/poll/702125/american-optimism-slumps-record-low.aspx";
await run("gallup-cantril", async () => {
  const tabs = htmlTables(await getText(G702125));
  const t = tabs.find((x) => x.rows[0]?.some((h) => /future life/i.test(h)));
  invariant(t, "Gallup 702125: Cantril table not found");
  const hdr = t.rows[0];
  const cur = hdr.findIndex((h) => /current life/i.test(h)), fut = hdr.findIndex((h) => /future life/i.test(h));
  const current: Record<string, number> = {}, future: Record<string, number> = {};
  for (const r of t.rows.slice(1)) {
    const y = r[0]?.match(/^(19|20)\d\d$/)?.[0]; if (!y) continue;
    const c = Number(r[cur].replace("%", "")), f = Number(r[fut].replace("%", ""));
    if (Number.isFinite(c)) current[y] = c; if (Number.isFinite(f)) future[y] = f;
  }
  const note = "Gallup National Health and Well-Being Index (U.S. adults, tens of thousands of interviews a year), Cantril Self-Anchoring Striving Scale: respondents rate their life today and their expected life five years from now on a 0–10 ladder. Gallup moved from daily phone tracking to its web panel over 2018–2020. Values are Gallup's own published annual figures.";
  const ty = new Date().getFullYear();
  await save("optimismFutureLife", { name: "Optimistic About Life in 5 Years", unit: "percent rating their expected life in five years 8–10 on a 0–10 ladder", source: "Gallup National Health and Well-Being Index", sourceUrl: G702125, goodDirection: "up", note, method: `table "${t.caption}", column "${hdr[fut]}"`, partialYear: future[String(ty)] !== undefined ? ty : undefined }, future, [0, 100]);
  await save("lifeRatedHigh", { name: "Rate Their Current Life Highly", unit: "percent rating their current life 7–10 on a 0–10 ladder", source: "Gallup National Health and Well-Being Index", sourceUrl: G702125, goodDirection: "up", note, method: `table "${t.caption}", column "${hdr[cur]}"`, partialYear: current[String(ty)] !== undefined ? ty : undefined }, current, [0, 100]);
});

// ================= University of Michigan Surveys of Consumers =================
const SCA = "https://data.sca.isr.umich.edu/data-archive/mine.php";
async function scaTable(n: number): Promise<{ header: string[]; rows: string[][] }> {
  const csv = await getText(SCA, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ table: String(n), year: "1978", qorm: "Y", order: "asc", format: "Comma-Separated (CSV)" }).toString() });
  const lines = csv.trim().split(/\r?\n/).filter((l) => l.trim());
  const hi = lines.findIndex((l) => /^Year,/.test(l));
  invariant(hi >= 0, `SCA table ${n}: no header in ${csv.slice(0, 120)}`);
  return { header: lines[hi].split(","), rows: lines.slice(hi + 1).map((l) => l.split(",")) };
}
await run("michigan", async () => {
  const t8 = await scaTable(8);
  const b8 = t8.header.findIndex((h) => /better off/i.test(h));
  const pexp: Record<string, number> = {};
  for (const r of t8.rows) if (/^\d{4}$/.test(r[0]) && Number.isFinite(Number(r[b8]))) pexp[r[0]] = Number(r[b8]);
  await save("expectBetterOffNextYear", {
    name: "Expect to Be Better Off Next Year", unit: "percent expecting to be better off financially a year from now", source: "University of Michigan Surveys of Consumers, Table 8", sourceUrl: "https://data.sca.isr.umich.edu/tables.php", historicalSourceUrls: [SCA], goodDirection: "up",
    note: "\"Do you think that a year from now you will be better off financially, or worse off, or just about the same as now?\" Annual figures as published by the Survey Research Center (monthly survey, ~500–1,000 interviews). The survey moved online through 2017–2024, which Michigan documents as a level effect.",
    method: "POST mine.php table=8 qorm=Y, column \"Better Off\"",
  }, pexp, [0, 100]);
  const t6 = await scaTable(6);
  const b6 = t6.header.findIndex((h) => /^better$/i.test(h));
  const pago: Record<string, number> = {};
  for (const r of t6.rows) if (/^\d{4}$/.test(r[0]) && Number.isFinite(Number(r[b6]))) pago[r[0]] = Number(r[b6]);
  await save("betterOffThanYearAgo", {
    name: "Better Off Than a Year Ago", unit: "percent saying they are better off financially than a year ago", source: "University of Michigan Surveys of Consumers, Table 6", sourceUrl: "https://data.sca.isr.umich.edu/tables.php", historicalSourceUrls: [SCA], goodDirection: "up",
    note: "\"Would you say that you (and your family living there) are better off or worse off financially than you were a year ago?\" Annual figures as published by the Survey Research Center. Same web-transition caveat as the expectations series.",
    method: "POST mine.php table=6 qorm=Y, column \"Better\"",
  }, pago, [0, 100]);
});

// ================= Monitoring the Future, 12th grade (CDC/NCHS Data Query System mirror) =================
const DQS_MTF = "https://data.cdc.gov/resource/mtgp-t7vw.json";
const MTF: { key: string; subtopic: string; name: string; dir: Meta["goodDirection"] }[] = [
  { key: "teenMarijuana", subtopic: "Marijuana", name: "Teen Marijuana Use", dir: "down" },
  { key: "teenBingeDrinking", subtopic: "Binge drinking", name: "Teen Binge Drinking", dir: "down" },
  { key: "teenAlcohol", subtopic: "Alcohol", name: "Teen Alcohol Use", dir: "down" },
  { key: "teenCigarettes", subtopic: "Cigarettes", name: "Teen Cigarette Smoking", dir: "down" },
];
await run("mtf", async () => {
  for (const m of MTF) {
    const q = new URLSearchParams({ $where: `\`group\`='Grade level' AND subgroup='12th grade' AND subtopic='${m.subtopic}'`, $order: "time_period", $limit: "500" });
    const rows = await getJSON<{ time_period: string; estimate: string; estimate_type: string }[]>(`${DQS_MTF}?${q}`);
    const data: Record<string, number> = {};
    for (const r of rows) if (/^\d{4}$/.test(r.time_period) && Number.isFinite(Number(r.estimate))) data[r.time_period] = Number(r.estimate);
    await save(m.key, {
      name: m.name, unit: `percent of 12th graders using ${m.subtopic.toLowerCase() === "binge drinking" ? "— five or more drinks in a row —" : m.subtopic.toLowerCase()} in the past 30 days`, source: "Monitoring the Future (University of Michigan), via CDC/NCHS Data Query System", sourceUrl: "https://data.cdc.gov/d/mtgp-t7vw", historicalSourceUrls: ["https://monitoringthefuture.org/"], goodDirection: m.dir,
      note: "Monitoring the Future's annual national school survey of 12th graders (roughly 12,000–15,000 students), past-30-day prevalence, crude percent, as republished by NCHS in Health, United States. MTF itself began in 1975; the NCHS mirror starts in 1980. The 2020 survey was cut short by COVID (smaller sample); MTF reports no series break.",
      method: `SODA ${DQS_MTF} where group='Grade level' and subgroup='12th grade' and subtopic='${m.subtopic}'`,
    }, data, [0, 100]);
  }
});

// ================= NIAAA apparent per-capita alcohol consumption =================
const NIAAA_PDF = "https://www.niaaa.nih.gov/sites/default/files/surveillance-report122.Per-Capita-Consumption.pdf";
await run("niaaa", async () => {
  const pdf = await download(NIAAA_PDF, "niaaa-sr122.pdf");
  const txt = await sh(["pdftotext", "-layout", pdf, "-"]);
  const start = txt.indexOf("Table 1. Apparent per capita ethanol consumption");
  invariant(start > 0, "NIAAA: Table 1 heading not found");
  const data: Record<string, number> = {};
  for (const line of txt.slice(start).split("\n")) {
    const m = line.match(/^\s*((?:18|19|20)\d\d)\s*\.*\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*$/);
    if (m) data[m[1]] = Number(m[5]);
    if (line.match(/^\s*Table 2\./)) break;
  }
  await save("alcoholPerCapita", {
    name: "Alcohol Consumption per Capita", unit: "gallons of pure ethanol per person aged 14+, per year", source: "NIAAA Surveillance Report #122, Table 1", sourceUrl: NIAAA_PDF, historicalSourceUrls: ["https://www.niaaa.nih.gov/publications/surveillance-reports"], goodDirection: "down",
    note: "Apparent consumption: beverage sales and tax data converted to gallons of pure ethanol (beer + wine + spirits) divided by the population aged 14 and older (15 and older before 1970). NIAAA's Alcohol Epidemiologic Data System; a new surveillance report each spring with a ~16-month lag.",
    method: "pdftotext -layout, Table 1 rows, 'All beverages' column",
  }, data, [0, 5]);
});

// ================= NSDUH (SAMHSA detailed tables; HTML inside the annual zips) =================
const NSDUH = {
  t2019: "https://www.samhsa.gov/data/sites/default/files/reports/rpt29394/NSDUHDetailedTabs2019/NSDUHDetailedTabs2019.zip",
  t2022: "https://www.samhsa.gov/data/sites/default/files/reports/rpt42728/NSDUHDetailedTabs2022/NSDUHDetailedTabs2022/2022-nsduh-detailed-tables.zip",
  t2024: "https://www.samhsa.gov/data/sites/default/files/reports/rpt56484/NSDUHDetailedTabs2024/NSDUHDetailedTabs2024/2024-nsduh-detailed-tables-072325.zip",
  t2025: "https://www.samhsa.gov/data/sites/default/files/reports/rpt57152/2025-nsduh-detailed-tables/2025-nsduh-detailed-tables.zip",
};
function nsduhTable(html: string, re: RegExp): string[] {
  const t = (html.match(/<table[\s\S]*?<\/table>/g) ?? []).find((x) => re.test(x));
  invariant(t, `NSDUH table ${re} not found`);
  return t.replace(/<[^>]+>/g, "|").replace(/&#8209;|&ndash;|&#045;/g, "-").replace(/\s+/g, " ").split("|").map((s) => s.trim()).filter(Boolean);
}
// cells after the row label, keeping only numbers (significance letters a/b and nr/nc/-- dropped)
function nsduhRow(cells: string[], label: string, n: number): number[] {
  const i = cells.findIndex((c) => c === label);
  invariant(i >= 0, `NSDUH row ${label} not found`);
  const nums: number[] = [];
  for (const c of cells.slice(i + 1)) {
    if (/^\d+(\.\d+)?$/.test(c)) { nums.push(Number(c)); if (nums.length === n) break; continue; }
    if (/^[a-d]$/i.test(c) || /^(nr|nc|--|-|\*|\d,\d)$/.test(c)) continue; // significance letter / not-reported / footnote ref
    if (/^[A-Za-z]{3,}/.test(c)) break; // next row label
  }
  invariant(nums.length === n, `NSDUH row ${label}: expected ${n} numbers, got ${nums.length}`);
  return nums;
}
async function nsduhHtml(url: string, name: string, member: RegExp): Promise<string> {
  const zip = await download(url, name);
  const list = await sh(["unzip", "-Z1", zip]);
  const file = list.split("\n").find((f) => member.test(f));
  invariant(file, `NSDUH ${name}: no member matching ${member}`);
  const dir = join(CACHE, name.replace(".zip", ""));
  if (!existsSync(join(dir, file))) await sh(["unzip", "-o", "-q", zip, file, "-d", dir]);
  return readFile(join(dir, file), "utf8");
}
await run("nsduh", async () => {
  const py: Record<string, number> = {}, pm: Record<string, number> = {};
  // 2002–2019 trend tables (2019 detailed tables, section 7): Table 7.2B past year, 7.3B past month, 18 year columns
  const s7 = await nsduhHtml(NSDUH.t2019, "nsduh-2019.zip", /Sect7pe2019\.htm$/i);
  const py19 = nsduhRow(nsduhTable(s7, /Table 7\.2B/), "Marijuana", 18), pm19 = nsduhRow(nsduhTable(s7, /Table 7\.3B/), "Marijuana", 18);
  for (let i = 0; i < 18; i++) { py[String(2002 + i)] = py19[i]; pm[String(2002 + i)] = pm19[i]; }
  // 2021+ from each release's Table 1.1B (two years per table: lifetime×2, past year×2, past month×2)
  for (const [url, name, years] of [[NSDUH.t2022, "nsduh-2022.zip", [2021, 2022]], [NSDUH.t2024, "nsduh-2024.zip", [2023, 2024]], [NSDUH.t2025, "nsduh-2025.zip", [2024, 2025]]] as const) {
    const s1 = await nsduhHtml(url, name, /sect1pe.*\.htm$/i);
    const v = nsduhRow(nsduhTable(s1, /Table 1\.1B/), "Marijuana", 6);
    py[String(years[0])] = v[2]; py[String(years[1])] = v[3]; pm[String(years[0])] = v[4]; pm[String(years[1])] = v[5];
  }
  const note = "SAMHSA's National Survey on Drug Use and Health, people aged 12 or older. 2002–2019 from the 2019 detailed tables' trend tables; 2021 onward from each year's Table 1.1B. There is NO 2020 value: the 2020 survey was disrupted by the pandemic and SAMHSA says it is not comparable, and the 2021 redesign (web mode, new questions) started a new baseline — SAMHSA advises against comparing 2021+ with earlier years, so the 2020 gap is a seam, not a missing year. Where a later release re-weighted a year (2024 appears in both the 2024 and 2025 tables) the newer release wins.";
  await save("marijuanaPastYear", { name: "Marijuana Use, Past Year", unit: "percent of people 12+ who used marijuana in the past year", source: "SAMHSA, National Survey on Drug Use and Health", sourceUrl: "https://www.samhsa.gov/data/data-we-collect/nsduh-national-survey-drug-use-and-health", historicalSourceUrls: Object.values(NSDUH), goodDirection: "neutral", note, method: "2019 Table 7.2B (2002–2019) + Table 1.1B of the 2022/2024/2025 detailed tables, 'Marijuana' row, past-year columns" }, py, [0, 100]);
  await save("marijuanaPastMonth", { name: "Marijuana Use, Past Month", unit: "percent of people 12+ who used marijuana in the past 30 days", source: "SAMHSA, National Survey on Drug Use and Health", sourceUrl: "https://www.samhsa.gov/data/data-we-collect/nsduh-national-survey-drug-use-and-health", historicalSourceUrls: Object.values(NSDUH), goodDirection: "neutral", note, method: "2019 Table 7.3B (2002–2019) + Table 1.1B of the 2022/2024/2025 detailed tables, 'Marijuana' row, past-month columns" }, pm, [0, 100]);
});

// ================= household financial health (Fed/FRED, NY Fed, USDA, Census) =================
import { sheetRows } from "./lib/xlsx.ts";
async function fredAnnual(id: string, agg: "mean" | "last" = "mean"): Promise<Record<string, number>> {
  const csv = await getText(`https://fred.stlouisfed.org/graph/fredgraph.csv?id=${id}`);
  const by: Record<string, number[]> = {};
  for (const line of csv.trim().split("\n").slice(1)) { const [d, v] = line.split(","); const n = Number(v); if (Number.isFinite(n) && v !== ".") (by[d.slice(0, 4)] ??= []).push(n); }
  const out: Record<string, number> = {};
  for (const [y, vs] of Object.entries(by)) out[y] = agg === "mean" ? vs.reduce((a, b) => a + b, 0) / vs.length : vs[vs.length - 1];
  return out;
}
function fredPartial(data: Record<string, number>, expected: number, counts: Record<string, number>) { const ty = String(new Date().getFullYear()); return counts[ty] && counts[ty] < expected ? Number(ty) : undefined; }
async function fredCounts(id: string): Promise<Record<string, number>> {
  const csv = await getText(`https://fred.stlouisfed.org/graph/fredgraph.csv?id=${id}`); const c: Record<string, number> = {};
  for (const line of csv.trim().split("\n").slice(1)) { const [d, v] = line.split(","); if (v !== "." && v !== "") c[d.slice(0, 4)] = (c[d.slice(0, 4)] ?? 0) + 1; } return c;
}
await run("fred", async () => {
  const cc = await fredAnnual("DRCCLACBS"); const ccN = await fredCounts("DRCCLACBS");
  for (const y of Object.keys(cc)) cc[y] = round(cc[y], 2);
  await save("creditCardDelinquency", {
    name: "Credit Card Delinquency Rate", unit: "percent of credit card balances 30+ days past due, all commercial banks, annual average", source: "Federal Reserve Board via FRED (DRCCLACBS)", sourceUrl: "https://fred.stlouisfed.org/series/DRCCLACBS", goodDirection: "down",
    note: "Delinquency rate on credit card loans at all commercial banks (Fed Board Charge-Off and Delinquency Rates release): loans 30 days or more past due plus nonaccrual, seasonally adjusted, as a percent of balances. Annual value is the mean of the four quarters. Covers bank-held cards only; the New York Fed's serious (90+ day) delinquency series from the Consumer Credit Panel is in this dataset as creditCardSeriousDelinquency.",
    method: "fredgraph.csv DRCCLACBS, annual mean of quarterly values", partialYear: fredPartial(cc, 4, ccN),
  }, cc, [0, 20]);
  const ep = await fredAnnual("LNS12300060"); const epN = await fredCounts("LNS12300060");
  for (const y of Object.keys(ep)) ep[y] = round(ep[y], 1);
  await save("primeAgeEmployment", {
    name: "Prime-Age Employment Rate", unit: "percent of 25–54-year-olds employed, annual average", source: "BLS Current Population Survey via FRED (LNS12300060)", sourceUrl: "https://fred.stlouisfed.org/series/LNS12300060", goodDirection: "up",
    note: "Employment-population ratio for ages 25 to 54, seasonally adjusted monthly, averaged by calendar year. The cleanest long-run read on whether working-age Americans have jobs, unaffected by retirement and schooling trends that move the overall rate.",
    method: "fredgraph.csv LNS12300060, annual mean of monthly values", partialYear: fredPartial(ep, 12, epN),
  }, ep, [50, 100]);
});
await run("nyfed", async () => {
  // the report file is quarter-versioned and linked from script, not markup: probe the newest quarter that exists
  let file: string | undefined;
  { const d = new Date(); let y = d.getFullYear(), q = Math.ceil((d.getMonth() + 1) / 3);
    for (let i = 0; i < 8 && !file; i++) { const cand = `HHD_C_Report_${y}Q${q}.xlsx`; const r = await fetch(`https://www.newyorkfed.org/medialibrary/interactives/householdcredit/data/xls/${cand}`, { headers: { "User-Agent": "Mozilla/5.0" } });
      const head = r.ok ? new Uint8Array((await r.arrayBuffer()).slice(0, 2)) : null;
      if (head && head[0] === 0x50 && head[1] === 0x4b) file = cand; else { q--; if (q === 0) { q = 4; y--; } } } }
  invariant(file, "NY Fed HHDC: no quarterly report xlsx found in the last 8 quarters");
  const xlsx = await download(`https://www.newyorkfed.org/medialibrary/interactives/householdcredit/data/xls/${file}`, file);
  const qy = (s: string) => { const m = s.match(/^(\d\d):Q(\d)$/); return m ? { y: String(2000 + Number(m[1])), q: Number(m[2]) } : null; };
  const p12 = await sheetRows(xlsx, "Page 12 Data"); const hdr = p12.find((r) => r.E === "CC"); invariant(hdr, "HHDC Page 12: CC column not found");
  const by: Record<string, number[]> = {};
  for (const r of p12) { const t = qy(r.A ?? ""); const v = Number(r.E); if (t && Number.isFinite(v)) (by[t.y] ??= []).push(v); }
  const cc90: Record<string, number> = {}; for (const [y, vs] of Object.entries(by)) cc90[y] = round(vs.reduce((a, b) => a + b, 0) / vs.length, 2);
  const ty = String(new Date().getFullYear());
  await save("creditCardSeriousDelinquency", {
    name: "Credit Card Serious Delinquency", unit: "percent of credit card balances 90+ days delinquent, annual average", source: "Federal Reserve Bank of New York, Household Debt and Credit Report (Consumer Credit Panel/Equifax)", sourceUrl: "https://www.newyorkfed.org/microeconomics/hhdc", goodDirection: "down",
    note: "Share of credit card balances 90 or more days delinquent across all lenders (not just banks), from the New York Fed Consumer Credit Panel, a 5% sample of Equifax credit files. Annual value is the mean of the quarters published. Not seasonally adjusted.",
    method: `${file} sheet "Page 12 Data" column CC, annual mean of quarters`, partialYear: by[ty] && by[ty].length < 4 ? Number(ty) : undefined,
  }, cc90, [0, 30]);
  const p17 = await sheetRows(xlsx, "Page 17 Data"); invariant(p17.some((r) => r.C === "bankruptcy"), "HHDC Page 17: bankruptcy column not found");
  const bk: Record<string, number[]> = {};
  for (const r of p17) { const t = qy(r.A ?? ""); const v = Number(r.C); if (t && Number.isFinite(v)) (bk[t.y] ??= []).push(v); }
  const bankruptcies: Record<string, number> = {}; for (const [y, vs] of Object.entries(bk)) if (vs.length === 4) bankruptcies[y] = round(vs.reduce((a, b) => a + b, 0), 1);
  await save("bankruptcies", {
    name: "Consumer Bankruptcies", unit: "thousands of consumers with a new bankruptcy notation per year", source: "Federal Reserve Bank of New York, Household Debt and Credit Report (Consumer Credit Panel/Equifax)", sourceUrl: "https://www.newyorkfed.org/microeconomics/hhdc", goodDirection: "down",
    note: "Number of consumers with a new bankruptcy notation on their credit file, summed across the four quarters of each year, from the New York Fed Consumer Credit Panel. The spike and collapse around October 2005 is the BAPCPA bankruptcy-reform filing rush. Only full years are included. US Courts' Table F-2 filing counts are the administrative alternative; this panel series is used because it is one machine-readable file back to 2003.",
    method: `${file} sheet "Page 17 Data" column bankruptcy, annual sum of quarters (full years only)`,
  }, bankruptcies, [0, 5000]);
});
await run("census-poverty", async () => {
  const xlsx = await download("https://www2.census.gov/programs-surveys/cps/tables/time-series/historical-poverty-people/hstpov3.xlsx", "hstpov3.xlsx");
  const rows = await sheetRows(xlsx, "pov03");
  const data: Record<string, number> = {};
  let inAll = false;
  for (const r of rows) {
    if (r.A === "All Races") inAll = true; else if (/^(White|Black|Asian|Hispanic)/i.test(r.A ?? "") && Object.keys(r).length === 1) { if (inAll) break; }
    if (!inAll) continue;
    const y = r.A?.match(/^((?:19|20)\d\d)/)?.[1]; const v = Number(r.E);
    if (y && Number.isFinite(v) && !(y in data)) data[y] = v; // first row for a year wins (the redesign years carry two rows; the newer-method row is listed first)
  }
  await save("childPoverty", {
    name: "Child Poverty Rate", unit: "percent of people under 18 below the official poverty line", source: "Census Bureau, CPS ASEC Historical Poverty Table 3", sourceUrl: "https://www.census.gov/data/tables/time-series/demo/income-poverty/historical-poverty-people.html", historicalSourceUrls: ["https://www2.census.gov/programs-surveys/cps/tables/time-series/historical-poverty-people/hstpov3.xlsx"], goodDirection: "down",
    note: "Official poverty measure, all people under 18, all races (Table 3, column 'Percent in poverty'). Census footnotes the 2013 redesigned income questions, 2017 processing change, and 1987/1992 weighting changes; where a year appears twice the row on the newer basis is used.",
    method: "hstpov3.xlsx sheet pov03, 'All Races' block, column E",
  }, data, [0, 50]);
});
await run("usda", async () => {
  const snap = await download("https://fns-prod.azureedge.us/sites/default/files/resource-files/snap-annualsummary-7.xlsx", "snap-annualsummary.xlsx");
  const rows = await sheetRows(snap);
  const pop = await fredAnnual("POPTHM"); // resident population, thousands, monthly → annual mean
  const data: Record<string, number> = {};
  for (const r of rows) { const y = r.A?.match(/^((?:19|20)\d\d)/)?.[1]; const v = Number(r.B); if (y && Number.isFinite(v) && pop[y]) data[y] = round(100 * v / pop[y]); }
  await save("snapShare", {
    name: "On Food Stamps (SNAP)", unit: "percent of US residents receiving SNAP, fiscal-year average", source: "USDA Food and Nutrition Service, SNAP Annual Summary; population from BEA via FRED (POPTHM)", sourceUrl: "https://www.fns.usda.gov/pd/supplemental-nutrition-assistance-program-snap", historicalSourceUrls: ["https://fns-prod.azureedge.us/sites/default/files/resource-files/snap-annualsummary-7.xlsx", "https://fred.stlouisfed.org/series/POPTHM"], goodDirection: "down",
    note: "Average monthly SNAP (food stamp) participants in each federal fiscal year, divided by the calendar-year average resident population. Both numbers are published; the ratio is the only arithmetic. Participation rises in recessions and with eligibility expansions (2009 ARRA; pandemic emergency allotments 2020–2023).",
    method: "snap-annualsummary xlsx column B (thousands) ÷ FRED POPTHM annual mean (thousands) × 100",
  }, data, [0, 30]);
  const ers = await download("https://www.ers.usda.gov/media/6990/trends.xlsx", "ers-trends.xlsx");
  const fi: Record<string, number> = {};
  for (const r of await sheetRows(ers)) { const y = r.A?.match(/^((?:19|20)\d\d)$/)?.[1]; const v = Number(r.B); if (y && Number.isFinite(v)) fi[y] = v; }
  await save("foodInsecurity", {
    name: "Food Insecurity", unit: "percent of households food insecure at some time during the year", source: "USDA Economic Research Service, Household Food Security in the United States", sourceUrl: "https://www.ers.usda.gov/topics/food-nutrition-assistance/food-security-in-the-u-s/key-statistics-graphics", historicalSourceUrls: ["https://www.ers.usda.gov/media/6990/trends.xlsx"], goodDirection: "down",
    note: "Households with low or very low food security, from the December CPS Food Security Supplement. ERS's comparable series starts in 2001 (1995–2000 used a different screening procedure). ERS announced the cancellation of the 2025 report; the series may end at 2024.",
    method: "trends.xlsx sheet Trends, column B",
  }, fi, [0, 30]);
});
await run("nhtsa", async () => {
  const xlsx = await download("https://cdan.dot.gov/tsftables/Fatalities%20and%20Fatality%20Rates.xlsx", "nhtsa-fatality-rates.xlsx");
  const data: Record<string, number> = {};
  for (const r of await sheetRows(xlsx)) for (const [yc, rc] of [["A", "D"], ["E", "H"], ["I", "L"]]) { const y = r[yc]?.match(/^((?:18|19|20)\d\d)$/)?.[1]; const v = Number(r[rc]); if (y && Number.isFinite(v) && r[rc] !== "-") data[y] = round(v, 2); }
  await save("trafficDeaths", {
    name: "Traffic Deaths per 100M Miles", unit: "motor-vehicle traffic deaths per 100 million vehicle miles traveled", source: "NHTSA Fatality Analysis Reporting System (FARS) / FHWA vehicle miles", sourceUrl: "https://cdan.dot.gov/tsftables/tsfar.htm", historicalSourceUrls: ["https://cdan.dot.gov/tsftables/Fatalities%20and%20Fatality%20Rates.xlsx"], goodDirection: "down",
    note: "Deaths within 30 days of a crash per 100 million vehicle miles. FARS since 1975; earlier years are NHTSA-adjusted historical summaries. The latest year is NHTSA's Annual Report File and can be revised.",
    method: "Fatalities and Fatality Rates.xlsx, 'Fatality Rate per 100 Million VMT' columns",
  }, data, [0, 30]);
});
await run("bls-union", async () => {
  const data: Record<string, number> = {};
  const ty = new Date().getFullYear();
  for (let start = 1983; start <= ty; start += 10) {
    const j = await getJSON<{ status: string; Results?: { series: { data: { year: string; value: string; period: string }[] }[] } }>(`https://api.bls.gov/publicAPI/v2/timeseries/data/LUU0204899600?startyear=${start}&endyear=${Math.min(start + 9, ty)}`);
    invariant(j.status === "REQUEST_SUCCEEDED", `BLS API: ${j.status}`);
    for (const d of j.Results?.series[0]?.data ?? []) if (d.period === "A01" && Number.isFinite(Number(d.value))) data[d.year] = Number(d.value);
    await new Promise((r) => setTimeout(r, 2500));
  }
  await save("unionMembership", {
    name: "Union Membership", unit: "percent of employed wage and salary workers who are union members", source: "BLS Current Population Survey (series LUU0204899600)", sourceUrl: "https://www.bls.gov/news.release/union2.toc.htm", historicalSourceUrls: ["https://api.bls.gov/publicAPI/v2/timeseries/data/LUU0204899600"], goodDirection: "neutral",
    note: "Union members as a percent of employed wage and salary workers aged 16+, annual averages from the CPS. BLS's consistent series begins in 1983; earlier figures came from a different survey and are not spliced in.",
    method: "BLS public API v2, series LUU0204899600, annual (A01) values",
  }, data, [0, 50]);
});
await run("nchs-infant", async () => {
  // three NCHS datasets on data.cdc.gov, spliced: NCHS historical 1915–2013, NCHS bridge 2014–2016, DQS 2017→
  const hist = await getJSON<{ year: string; mortality_rate: string; type?: string; indicator?: string }[]>("https://data.cdc.gov/resource/epev-k6ss.json?$limit=5000");
  const data: Record<string, number> = {};
  for (const r of hist) { const t = (r.type ?? r.indicator ?? "").toLowerCase(); if (/infant/.test(t) && /^\d{4}$/.test(r.year) && Number.isFinite(Number(r.mortality_rate))) data[r.year] = Number(r.mortality_rate); }
  invariant(Object.keys(data).length >= 90, `NCHS epev-k6ss: only ${Object.keys(data).length} infant years`);
  const bridge = await getJSON<Record<string, string>[]>("https://data.cdc.gov/resource/nfuu-hu6j.json?$limit=5000");
  const bKeys = bridge[0] ? Object.keys(bridge[0]) : [];
  for (const r of bridge) { const lbl = (r.stub_label ?? "").toLowerCase(); const y = r.year ?? r.time_period; const v = Number(r.estimate ?? r.value ?? r.rate); if (lbl === "all mothers" && String(r.unit_num ?? "1") === "1" && /^\d{4}$/.test(y) && Number.isFinite(v) && !(y in data)) data[y] = v; }
  const dqs = await getJSON<{ time_period: string; estimate: string; group?: string; subgroup?: string; subtopic?: string }[]>(`https://data.cdc.gov/resource/j7ym-uwqy.json?${new URLSearchParams({ "$select": "time_period,estimate,`group`,subgroup,subtopic", "$where": "`group`='Total' AND subgroup='All mothers' AND subtopic='All infant deaths'", "$limit": "500" })}`);
  for (const r of dqs) if (/^\d{4}$/.test(r.time_period) && Number.isFinite(Number(r.estimate))) data[r.time_period] = Number(r.estimate);
  const ys = Object.keys(data).map(Number).sort((a, b) => a - b); const max = ys[ys.length - 1];
  for (let y = 1933; y <= max; y++) invariant(String(y) in data, `infant mortality: missing ${y} (bridge columns: ${bKeys.join(",")})`);
  await save("infantMortality", {
    name: "Infant Mortality", unit: "infant deaths per 1,000 live births", source: "CDC/NCHS National Vital Statistics System (via data.cdc.gov)", sourceUrl: "https://data.cdc.gov/d/epev-k6ss", historicalSourceUrls: ["https://data.cdc.gov/d/nfuu-hu6j", "https://data.cdc.gov/d/j7ym-uwqy"], goodDirection: "down",
    note: "Deaths under age one per 1,000 live births, final data. Spliced from three NCHS publications on data.cdc.gov: the historical table (1915–2013), Health, United States infant mortality by maternal characteristics (2014–2016), and the Data Query System series (2017 onward); overlapping years agree. 1915–1932 cover the death-registration states only, not the whole country.",
    method: "epev-k6ss (type=Infant) + nfuu-hu6j (All mothers, unit 1) + j7ym-uwqy (Total/All mothers/All infant deaths)",
  }, data, [0, 120]);
});

// ================= health access & mortality by age (CDC/NCHS, Census) =================
await run("nchs-access", async () => {
  const q = new URLSearchParams({ $where: "subtopic='Nonreceipt of needed prescription drugs due to cost' AND `group`='Total'", $select: "time_period,estimate,estimate_type,subgroup", $order: "time_period", $limit: "200" });
  const rows = await getJSON<{ time_period: string; estimate: string; estimate_type: string }[]>(`https://data.cdc.gov/resource/p4r5-qsgs.json?${q}`);
  const data: Record<string, number> = {};
  for (const r of rows) if (/^\d{4}$/.test(r.time_period) && /crude/i.test(r.estimate_type) && Number.isFinite(Number(r.estimate))) data[r.time_period] = Number(r.estimate);
  // the replacement NHIS item after the 2019 redesign, quoted in the note (different question, not spliced)
  const q2 = new URLSearchParams({ $where: "topic='Did not take medication as prescribed to save money' AND `group`='Total'", $select: "time_period,estimate", $order: "time_period", $limit: "50" });
  const alt = await getJSON<{ time_period: string; estimate: string }[]>(`https://data.cdc.gov/resource/gj3i-hsbz.json?${q2}`);
  const altTxt = alt.filter((r) => /^\d{4}$/.test(r.time_period)).map((r) => `${r.time_period} ${r.estimate}%`).join(", ");
  await save("rxCostBarrier", {
    name: "Couldn't Afford Prescriptions", unit: "percent of people who did not get needed prescription drugs in the past 12 months because of cost", source: "CDC/NCHS Health, United States (National Health Interview Survey), via Data Query System", sourceUrl: "https://data.cdc.gov/d/p4r5-qsgs", historicalSourceUrls: ["https://data.cdc.gov/d/dmzy-x2ad", "https://data.cdc.gov/d/gj3i-hsbz"], goodDirection: "down",
    note: `NHIS, all ages, crude percent, as published in Health, United States. The series ENDS AT 2019: the NHIS questionnaire was redesigned that year and NCHS has not carried this item forward on the new basis. The closest replacement item, asked of adults 18+ since 2019 ("did not take medication as prescribed to save money"), runs ${altTxt} — a different question, shown here in the note rather than spliced onto the chart.`,
    method: "SODA p4r5-qsgs, subtopic 'Nonreceipt of needed prescription drugs due to cost', group Total, crude",
  }, data, [0, 30]);
});
const SUICIDE_AGES: { key: string; label: string; name: string }[] = [
  { key: "suicide10to14", label: "10-14 years", name: "Suicide Rate, Ages 10–14" },
  { key: "suicide15to24", label: "15-24 years", name: "Suicide Rate, Ages 15–24" },
  { key: "suicide25to44", label: "25-44 years", name: "Suicide Rate, Ages 25–44" },
  { key: "suicide45to64", label: "45-64 years", name: "Suicide Rate, Ages 45–64" },
  { key: "suicide65plus", label: "65 years and over", name: "Suicide Rate, Ages 65+" },
];
await run("nchs-suicide-age", async () => {
  // Health, United States 2019 table (1950–2018) spliced with the DQS/WONDER table (2018→); the overlap year must agree
  const hist = await getJSON<{ stub_name: string; stub_label: string; year: string; estimate: string; unit: string }[]>(`https://data.cdc.gov/resource/9j2v-jamp.json?${new URLSearchParams({ $where: "stub_name='Age'", $select: "stub_name,stub_label,year,estimate,unit", $limit: "5000" })}`);
  const recent = await getJSON<{ subgroup: string; time_period: string; estimate: string }[]>(`https://data.cdc.gov/resource/w26f-tf3h.json?${new URLSearchParams({ $where: "`group`='Age group'", $select: "subgroup,time_period,estimate", $limit: "5000" })}`);
  for (const a of SUICIDE_AGES) {
    const data: Record<string, number> = {};
    for (const r of hist) if (r.stub_label === a.label && /crude/i.test(r.unit) && /^\d{4}$/.test(r.year) && Number.isFinite(Number(r.estimate))) data[r.year] = Number(r.estimate);
    const lbl2 = a.label.replace("and over", "and older");
    let overlapChecked = false;
    for (const r of recent) if (r.subgroup === lbl2 && /^\d{4}$/.test(r.time_period) && Number.isFinite(Number(r.estimate))) {
      const v = Number(r.estimate);
      if (r.time_period in data) { invariant(Math.abs(data[r.time_period] - v) <= 0.2, `${a.key} ${r.time_period}: overlap mismatch ${data[r.time_period]} vs ${v}`); overlapChecked = true; }
      data[r.time_period] = v;
    }
    invariant(overlapChecked, `${a.key}: no overlap year between the two NCHS tables`);
    await save(a.key, {
      name: a.name, unit: "deaths per 100,000 people in the age group (crude)", source: "CDC/NCHS National Vital Statistics System (Health, United States + Data Query System)", sourceUrl: "https://data.cdc.gov/d/w26f-tf3h", historicalSourceUrls: ["https://data.cdc.gov/d/9j2v-jamp"], goodDirection: "down",
      note: `Suicide deaths (ICD-10 U03, X60–X84, Y87.0; ICD-8/9 equivalents before 1999) per 100,000 resident population aged ${a.label.replace(" years", "")}, crude rate. 1950–2018 from the Health, United States 2019 table (1950/1960/1970 then annual from 1980), 2018 onward from the NCHS Data Query System table built from CDC WONDER; the 2018 overlap agrees. The all-ages, age-adjusted series is a separate row.`,
      method: `9j2v-jamp (stub_name Age, '${a.label}', crude) + w26f-tf3h (group 'Age group', '${lbl2}')`,
    }, data, [0, 100]);
  }
});
await run("census-uninsured", async () => {
  const xlsx = await download("https://www2.census.gov/programs-surveys/demo/tables/health-insurance/time-series/acs/hic04_acs.xlsx", "hic04_acs.xlsx");
  const rows = await sheetRows(xlsx);
  const hdr = rows.find((r) => r.A === "Nation/State"); invariant(hdr, "HIC-4 ACS: header row not found");
  const cols: [string, string][] = Object.entries(hdr).filter(([c, v]) => c !== "A" && c !== "B" && /^\d{4}/.test(v)).map(([c, v]) => [v.match(/^\d{4}/)![0], c]);
  const next2 = (col: string) => { const n = col.split("").reduce((a, ch) => a * 26 + ch.charCodeAt(0) - 64, 0) + 2; let s = ""; let x = n; while (x > 0) { const m = (x - 1) % 26; s = String.fromCharCode(65 + m) + s; x = Math.floor((x - 1) / 26); } return s; };
  const us = rows.find((r) => r.A === "United States" && /uninsured/i.test(r.B ?? "")); invariant(us, "HIC-4 ACS: US uninsured row not found");
  const data: Record<string, number> = {};
  for (const [y, c] of cols) { const v = Number(us[next2(c)]); if (Number.isFinite(v) && us[next2(c)] !== "N") data[y] = round(v); }
  await save("uninsured", {
    name: "Uninsured Rate", unit: "percent of the civilian noninstitutionalized population without health insurance", source: "Census Bureau, American Community Survey (Table HIC-4_ACS)", sourceUrl: "https://www.census.gov/data/tables/time-series/demo/health-insurance/historical-series/hic.html", historicalSourceUrls: ["https://www2.census.gov/programs-surveys/demo/tables/health-insurance/time-series/acs/hic04_acs.xlsx"], goodDirection: "down",
    note: "People with no health insurance coverage at the time of the survey, all ages, from the 1-year ACS. The ACS health-insurance question began in 2008; 2020 has no standard estimate (Census released experimental data only for the pandemic year) and is left blank. The CPS series reaches back to 1987 but was redesigned in 2013 and is not spliced in.",
    method: "hic04_acs.xlsx, 'United States' / '.Uninsured' row, Percent column per year",
  }, data, [0, 30]);
});

// ================= late additions from the health lane (teen births, firearm deaths) =================
await run("nchs-teen-births", async () => {
  const hist = await getJSON<{ year: string; birth_rate: string }[]>(`https://data.cdc.gov/resource/e8kx-wbww.json?${new URLSearchParams({ $where: "race='All Races' AND age='15-19 Years'", $select: "year,birth_rate", $order: "year", $limit: "200" })}`);
  const data: Record<string, number> = {};
  for (const r of hist) if (/^\d{4}$/.test(r.year) && Number.isFinite(Number(r.birth_rate))) data[r.year] = Number(r.birth_rate);
  const recent = await getJSON<{ time_period: string; estimate: string }[]>(`https://data.cdc.gov/resource/daba-4vfq.json?${new URLSearchParams({ $where: "subgroup='15-19 years' AND classification='Demographic Characteristic'", $select: "time_period,estimate", $order: "time_period", $limit: "100" })}`);
  let overlap = 0;
  for (const r of recent) if (/^\d{4}$/.test(r.time_period) && Number.isFinite(Number(r.estimate))) { const v = Number(r.estimate); if (r.time_period in data) { invariant(Math.abs(data[r.time_period] - v) <= 0.1, `teen births ${r.time_period}: ${data[r.time_period]} vs ${v}`); overlap++; } data[r.time_period] = v; }
  invariant(overlap >= 2, "teen births: no overlap between the two NCHS tables");
  await save("teenBirthRate", {
    name: "Teen Birth Rate", unit: "births per 1,000 females aged 15–19", source: "CDC/NCHS National Vital Statistics System (Health, United States + Data Query System)", sourceUrl: "https://data.cdc.gov/d/daba-4vfq", historicalSourceUrls: ["https://data.cdc.gov/d/e8kx-wbww"], goodDirection: "down",
    note: "Live births to women aged 15–19 per 1,000 women in that age group. 1960–2018 from the Health, United States table of birth rates by age of mother; 2016 onward from the NCHS Data Query System; the three overlap years agree exactly. The 1991 peak (61.8) and the steady fall since are as published.",
    method: "e8kx-wbww (All Races, 15-19 Years) + daba-4vfq (subgroup '15-19 years', Demographic Characteristic)",
  }, data, [0, 120]);
});
await run("firearm", async () => {
  // Health, United States 2017 Table 31 (1970, 1980–2016, crude) + CDC Injury Center firearm deaths (2019→, crude). 2017–2018 are a real gap.
  const xlsx = await download("https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus17tables/Table031.xlsx", "hus17-table031.xlsx");
  const rows = await sheetRows(xlsx);
  const hdr = rows.find((r) => r.A === "Sex, race, Hispanic origin, and age"); invariant(hdr, "HUS17 T31: header row not found");
  const crude = rows.find((r) => /^All ages, crude/.test(r.A ?? "")); invariant(crude, "HUS17 T31: crude row not found");
  const data: Record<string, number> = {};
  for (const [col, label] of Object.entries(hdr)) { const y = label.match(/^(19|20)\d\d/)?.[0]; const v = Number(crude[col]); if (col !== "A" && y && Number.isFinite(v)) data[y] = round(v); }
  invariant(Object.keys(data).length >= 35, `HUS17 T31: only ${Object.keys(data).length} years`);
  const recent = await getJSON<{ period: string; rate: string }[]>(`https://data.cdc.gov/resource/t6u2-f84c.json?${new URLSearchParams({ $where: "intent='FA_Deaths' AND type='year'", $select: "period,rate", $order: "period", $limit: "50" })}`);
  for (const r of recent) { const y = r.period.slice(0, 4); const v = Number(r.rate); if (/^\d{4}$/.test(y) && Number.isFinite(v)) data[y] = round(v); }
  const ty = new Date().getFullYear();
  await save("firearmDeaths", {
    name: "Firearm Deaths", unit: "firearm-related deaths per 100,000 people (crude), all intents", source: "CDC/NCHS Health, United States 2017 Table 31; CDC Injury Center firearm mortality (NVSS)", sourceUrl: "https://data.cdc.gov/d/t6u2-f84c", historicalSourceUrls: ["https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus17tables/Table031.xlsx"], goodDirection: "down",
    note: "Deaths from firearm injuries of all intents (homicide, suicide, unintentional, legal intervention, undetermined) per 100,000 residents, crude rate, from NVSS death certificates. 1970 and 1980–2016 from Health, United States 2017 Table 31 ('All ages, crude'); 2019 onward from the CDC Injury Center's national firearm-mortality series (also crude). NCHS dropped the table after the 2017 edition and no public machine path carries 2017–2018, so those two years are a gap, shown as a gap. The latest year is provisional until NCHS finalizes it.",
    method: "Table031.xlsx row 'All ages, crude' + t6u2-f84c intent FA_Deaths type year", partialYear: data[String(ty - 1)] !== undefined && recent.some((r) => r.period.startsWith(String(ty - 1))) ? undefined : undefined,
  }, data, [0, 40]);
});

// ================= NAEP (NCES Data Service API) — education efficacy, v6 =================
// Year tokens carry the sample suffix where NCES requires one: pre-2001 main-NAEP years and
// pre-2004 LTT years are the R1/R2 (accommodations-not-permitted) samples and error without it.
// The API returns 999.0 as a sentinel for non-assessed cells — filtered, never saved.
const NAEP_API = "https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx";
const NAEP_COMMON = "The 0–500-scale NAEP Long-Term Trend and 0–300-scale main assessments are NCES's national probability samples; values are national public+private averages for all students.";
const NAEP_SPECS: { key: string; params: string; years: string[]; name: string; unit: string; note: string; bounds: [number, number]; min: number; anchor?: [string, number] }[] = [
  { key: "naepCivics", params: "subject=civics&grade=8&subscale=CIVRP", years: ["1998", "2006", "2010", "2014", "2018", "2022"], name: "Civics Knowledge (NAEP)", unit: "grade-8 average civics scale score (0–300)", bounds: [100, 200], min: 6, anchor: ["1998", 150.0],
    note: "NAEP Civics, grade 8, average scale score. Assessed 1998, 2006, 2010, 2014, 2018, 2022 (an irregular ~4–8-year cadence, drawn as a connected trend the way NCES charts it). The 2026 assessment was administered; results are expected summer 2027. Grades 4 and 12 were also assessed through 2010; grade 8 carries the trend." },
  { key: "naepHistory", params: "subject=history&grade=8&subscale=HRPCM", years: ["1994R2", "2001", "2006", "2010", "2014", "2018", "2022"], name: "U.S. History Knowledge (NAEP)", unit: "grade-8 average U.S. history scale score (0–500)", bounds: [200, 300], min: 7, anchor: ["1994", 259.3],
    note: "NAEP U.S. History, grade 8, average scale score. 1994 is the accommodations-not-permitted sample (NCES footnotes it on the same trend line — the one comparability break). Scores rose to a 2014 peak (267.5) then fell below the 1994 level by 2022. Next assessment 2030 per the NAGB schedule." },
  { key: "naepGeography", params: "subject=geography&grade=8&subscale=GRPCM", years: ["1994R2", "2001", "2010", "2014", "2018"], name: "Geography Knowledge (NAEP)", unit: "grade-8 average geography scale score (0–500)", bounds: [200, 300], min: 5, anchor: ["1994", 259.7],
    note: "NAEP Geography, grade 8, average scale score. DISCONTINUED: NAGB removed geography from the assessment schedule in July 2019, so 2018 is the final point — the only long-run national measure of American students' geographic knowledge ends there. 1994 is the accommodations-not-permitted sample, footnoted by NCES on the same trend." },
  { key: "naepScience", params: "subject=science&grade=8&subscale=SRPUV", years: ["2009", "2011", "2015", "2019", "2024"], name: "Science Knowledge (NAEP)", unit: "grade-8 average science scale score (0–300)", bounds: [100, 200], min: 5, anchor: ["2009", 150.0],
    note: "NAEP Science, grade 8, average scale score on the 2009 framework (earlier science assessments used a different framework and are not comparable). Scores rose through 2015, held in 2019, and fell back to the 2009 baseline by 2024." },
  { key: "lttReading9", params: "Program=LTT&subject=RED&cohort=1&subscale=RRPSCT", years: ["1971R1", "1975R1", "1980R1", "1984R1", "1988R1", "1990R1", "1992R1", "1994R1", "1996R1", "1999R1", "2004R3", "2008R3", "2012R3", "2020R3", "2022R3"], name: "Reading Score, Age 9 (NAEP LTT)", unit: "average long-term-trend reading scale score, age 9 (0–500)", bounds: [150, 300], min: 14, anchor: ["1971", 207.6],
    note: "NAEP Long-Term Trend reading, age 9 — the same instrument design maintained since 1971 expressly to measure trend. Through 1999 the original format (R1 sample); from 2004 the revised format with accommodations (R3), NCES's bridge study linking the two — the one seam. The 2020→2022 drop (219.7→214.6) is the largest on record." },
  { key: "lttReading13", params: "Program=LTT&subject=RED&cohort=2&subscale=RRPSCT", years: ["1971R1", "1975R1", "1980R1", "1984R1", "1988R1", "1990R1", "1992R1", "1994R1", "1996R1", "1999R1", "2004R3", "2008R3", "2012R3", "2020R3", "2023R3"], name: "Reading Score, Age 13 (NAEP LTT)", unit: "average long-term-trend reading scale score, age 13 (0–500)", bounds: [200, 320], min: 14, anchor: ["1971", 255.2],
    note: "NAEP Long-Term Trend reading, age 13, from the same 1971-anchored instrument as the age-9 series (same R1→R3 format seam at 2004). The 2023 score (255.7) is back at the 1971 level after a 2012 peak. Age 17 was last assessed in 2012 and is not carried here." },
  { key: "lttMath9", params: "Program=LTT&subject=MAT&cohort=1&subscale=MRPSCT", years: ["1978R1", "1982R1", "1986R1", "1990R1", "1992R1", "1994R1", "1996R1", "1999R1", "2004R3", "2008R3", "2012R3", "2020R3", "2022R3"], name: "Math Score, Age 9 (NAEP LTT)", unit: "average long-term-trend mathematics scale score, age 9 (0–500)", bounds: [180, 300], min: 12, anchor: ["1978", 218.6],
    note: "NAEP Long-Term Trend mathematics, age 9. The API-served series begins 1978 (NCES reports 1973 as an extrapolated point, not served). Same R1→R3 format seam at 2004 as the reading series. The 2020→2022 drop (241.4→233.9) erased two decades of gains." },
  { key: "lttMath13", params: "Program=LTT&subject=MAT&cohort=2&subscale=MRPSCT", years: ["1978R1", "1982R1", "1986R1", "1990R1", "1992R1", "1994R1", "1996R1", "1999R1", "2004R3", "2008R3", "2012R3", "2020R3", "2023R3"], name: "Math Score, Age 13 (NAEP LTT)", unit: "average long-term-trend mathematics scale score, age 13 (0–500)", bounds: [220, 320], min: 12, anchor: ["1978", 264.1],
    note: "NAEP Long-Term Trend mathematics, age 13, from the 1978-anchored instrument (1973 is extrapolated and not API-served; same 2004 format seam). 2023 (270.7) is the lowest since the 1990s after the 285 peak of 2012." },
];
await run("naep", async () => {
  for (const sp of NAEP_SPECS) {
    const data: Record<string, number> = {};
    for (const tok of sp.years) {
      const j = await getJSON<{ status?: number; result?: { year: number; value: number }[] }>(`${NAEP_API}?type=data&${sp.params}&variable=TOTAL&jurisdiction=NT&stattype=MN:MN&Year=${tok}`);
      const rows = Array.isArray(j.result) ? j.result : [];
      for (const r of rows) if (Number.isFinite(r.value) && r.value < 900) data[String(r.year)] = round(r.value);
      await new Promise((r) => setTimeout(r, 400));
    }
    if (sp.anchor) invariant(Math.abs((data[sp.anchor[0]] ?? NaN) - sp.anchor[1]) <= 0.5, `${sp.key}: anchor ${sp.anchor[0]} = ${data[sp.anchor[0]]}, expected ~${sp.anchor[1]}`);
    await save(sp.key, {
      name: sp.name, unit: sp.unit, source: "NCES, National Assessment of Educational Progress", sourceUrl: "https://www.nationsreportcard.gov/",
      historicalSourceUrls: [`${NAEP_API}?type=data&${sp.params}&variable=TOTAL&jurisdiction=NT&stattype=MN:MN&Year=${sp.years.join(",")}`], goodDirection: "up",
      note: `${sp.note} ${NAEP_COMMON}`, method: `NAEP Data Service API, ${sp.params}, year tokens ${sp.years.join(",")} (suffixed tokens are the pre-accommodations samples), 999-sentinel values dropped`,
    }, data, sp.bounds, sp.min);
  }
});

// ================= ATUS reading (BLS American Time Use Survey, API v2) =================
await run("atus", async () => {
  const fetchSeries = async (id: string): Promise<Record<string, number>> => {
    const data: Record<string, number> = {};
    const ty = new Date().getFullYear();
    for (let start = 2003; start <= ty; start += 10) {
      const j = await getJSON<{ status: string; Results?: { series: { data: { year: string; value: string }[] }[] } }>(`https://api.bls.gov/publicAPI/v2/timeseries/data/${id}?startyear=${start}&endyear=${Math.min(start + 9, ty)}`);
      invariant(j.status === "REQUEST_SUCCEEDED", `BLS API ${id}: ${j.status}`);
      for (const d of j.Results?.series[0]?.data ?? []) if (Number.isFinite(Number(d.value))) data[d.year] = Number(d.value);
      await new Promise((r) => setTimeout(r, 2500));
    }
    return data;
  };
  const hours = await fetchSeries("TUU10101AA01006315");
  invariant(Math.abs((hours["2003"] ?? NaN) - 0.36) <= 0.01, `ATUS hours 2003 = ${hours["2003"]}, expected 0.36`);
  const minutes: Record<string, number> = {};
  for (const [y, v] of Object.entries(hours)) minutes[y] = round(v * 60, 1);
  const atusNote = "BLS American Time Use Survey time-diary activity \"reading for personal interest,\" civilians aged 15 and older, all days of the week. Diary coding, not a survey question, so there is no wording drift. 2020 was not published (COVID cut data collection) and is a real one-year hole.";
  await save("readingTime", {
    name: "Time Spent Reading", unit: "minutes per day reading for personal interest, all people 15+", source: "BLS American Time Use Survey (series TUU10101AA01006315)", sourceUrl: "https://www.bls.gov/tus/", historicalSourceUrls: ["https://api.bls.gov/publicAPI/v2/timeseries/data/TUU10101AA01006315"], goodDirection: "up",
    note: `${atusNote} BLS publishes hours per day; stored here as minutes (×60, exact). Averaged over everyone — readers and non-readers alike (readers themselves average ~1.7 hours).`,
    method: "BLS public API v2, series TUU10101AA01006315 (avg hours/day, total population) × 60",
  }, minutes, [0, 60], 15);
  const part = await fetchSeries("TUU30105AA01006315");
  invariant(Math.abs((part["2003"] ?? NaN) - 26.3) <= 0.1, `ATUS participation 2003 = ${part["2003"]}, expected 26.3`);
  await save("readingParticipation", {
    name: "Read on an Average Day", unit: "percent of people 15+ who read for personal interest on an average day", source: "BLS American Time Use Survey (series TUU30105AA01006315)", sourceUrl: "https://www.bls.gov/tus/", historicalSourceUrls: ["https://api.bls.gov/publicAPI/v2/timeseries/data/TUU30105AA01006315"], goodDirection: "up",
    note: `${atusNote} The share of the population that read at all on a given day — down from about a quarter in 2003 to about a sixth today.`,
    method: "BLS public API v2, series TUU30105AA01006315 (% engaged in the activity per day, total population)",
  }, part, [0, 100], 15);
});

// ================= checked-in citation series (publishers with no data endpoint) =================
// The pew-trust precedent: values transcribed from the publisher's own documents, with the exact
// document list, read date, and per-value citations carried in the data/*.json file itself.
await run("citations", async () => {
  for (const file of ["appc-branches.json", "reading-citations.json"]) {
    const j = await Bun.file(join(DIR, "data", file)).json() as { series: Record<string, { meta: Meta; bounds: [number, number]; min: number; data: Record<string, number> }> };
    for (const [key, sp] of Object.entries(j.series)) await save(key, sp.meta, sp.data, sp.bounds, sp.min);
  }
});

// ================= University of Michigan Index of Consumer Sentiment =================
await run("michigan-ics", async () => {
  const annualUrl = "https://www.sca.isr.umich.edu/files/tbyics.csv", monthlyUrl = "https://www.sca.isr.umich.edu/files/tbmics.csv";
  const lines = (await getText(annualUrl)).trimEnd().split(/\r?\n/);
  invariant(lines[0] === "Month,YYYY,ICS_ALL", `Michigan annual: unexpected header ${lines[0]}`);
  invariant(lines.length >= 41, `Michigan annual: only ${lines.length - 1} rows`);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const data: Record<string, number> = {};
  const ty = new Date().getFullYear();
  let partialThrough: string | undefined;
  for (const line of lines.slice(1)) {
    const r = line.split(","), y = r[1], v = Number(r[2]), m = months.indexOf(r[0]) + 1;
    invariant(r.length === 3 && /^\d{4}$/.test(y) && Number(y) <= ty && m > 0 && r[2] !== "" && Number.isFinite(v), `Michigan annual: invalid row ${line}`);
    invariant(!(y in data), `Michigan annual: duplicate year ${y}`);
    data[y] = v;
    if (Number(y) === ty && m < 12) partialThrough = `${y}-${String(m).padStart(2, "0")}`;
  }
  if (!(String(ty) in data)) {
    const monthly = (await getText(monthlyUrl)).trimEnd().split(/\r?\n/);
    invariant(monthly[0] === "Month,YYYY,ICS_ALL", `Michigan monthly: unexpected header ${monthly[0]}`);
    invariant(monthly.length >= 501, `Michigan monthly: only ${monthly.length - 1} rows`);
    const current: Record<string, number> = {};
    for (const line of monthly.slice(1)) {
      const r = line.split(","), y = r[1], v = Number(r[2]), m = months.indexOf(r[0]) + 1;
      invariant(r.length === 3 && /^\d{4}$/.test(y) && Number(y) <= ty && m > 0 && r[2] !== "" && Number.isFinite(v), `Michigan monthly: invalid row ${line}`);
      if (Number(y) !== ty) continue;
      const date = `${y}-${String(m).padStart(2, "0")}`;
      invariant(!(date in current), `Michigan monthly: duplicate ${date}`);
      current[date] = v;
    }
    const dates = Object.keys(current).sort(), vs = Object.values(current);
    if (vs.length) { data[String(ty)] = round(vs.reduce((a, b) => a + b, 0) / vs.length); partialThrough = dates[dates.length - 1]; }
  }
  await save("consumerSentiment", {
    name: "Consumer Sentiment Index (University of Michigan)", unit: "index, 1966 Q1 = 100", source: "University of Michigan Surveys of Consumers", sourceUrl: annualUrl, historicalSourceUrls: [monthlyUrl], goodDirection: "up",
    note: "Index summarizing a survey of ~500 households on personal finances, business conditions, and buying conditions. Annual figures as published by the Survey Research Center; the annual CSV begins in 1961, while the monthly history begins in 1952. Michigan's Surveys of Consumers moved increasingly online through 2017–2024, which Michigan documents as a level effect. A current-year annual row is marked partial through its published month; if absent, the mean of published current-year months is used.",
    method: "tbyics.csv, ICS_ALL by YYYY; tbmics.csv current-year monthly mean only when that year is absent from the annual file", partialYear: partialThrough ? ty : undefined, partialThrough,
  }, data, [40, 120], 40);
});

// ================= Gallup public Datawrapper exports =================
await run("gallup-dw", async () => {
  const specs: { key: string; name: string; unit: string; files: string[]; columns: string[]; minRows: number[]; monthly: boolean; note: string; bounds: [number, number] }[] = [
    { key: "gallupMentalHealthExcellent", name: "Rate Their Mental Health Excellent", unit: "percent of adults rating their own mental health excellent", files: ["f9It9/6"], columns: ["% Excellent"], minRows: [25], monthly: false, bounds: [0, 100],
      note: "\"How would you describe your own mental health or emotional wellbeing at this time? Would you say it is — excellent, good, only fair or poor?\" Question wording from the chart metadata (f9It9/8); only Excellent, not Excellent/Good. Annual published observations." },
    { key: "gallupFinancesBetter", name: "Personal Finances Getting Better (Gallup)", unit: "percent saying their financial situation is getting better", files: ["w92AE/1"], columns: ["Getting better"], minRows: [40], monthly: false, bounds: [0, 100],
      note: "\"Right now, do you think that your financial situation as a whole is getting better or getting worse?\" Question wording from the chart title (w92AE/2). The latest poll in each calendar year is kept, matching the dataset's yearSeries convention. This is Gallup's question, distinct from the NORC GSS financesBetter series." },
    { key: "gallupQualityJob", name: "Good Time to Find a Quality Job", unit: "percent saying now is a good time to find a quality job", files: ["8YPmK/1", "gZ2wl/4"], columns: ["% Good time", "% Good time"], minRows: [200, 20], monthly: true, bounds: [0, 100],
      note: "\"Thinking about the job situation in America today, would you say that it is now a good time or a bad time to find a quality job?\" Question wording from the chart metadata (gZ2wl/9). Annual mean of published monthly values; multiple polls within a month are averaged before averaging months. Recent polling is roughly quarterly, not monthly; unpublished months are absent, never interpolated. All overlapping readings must agree exactly." },
    { key: "gallupEconomicConfidence", name: "Gallup Economic Confidence Index", unit: "index, net percent (can range roughly -100 to +100)", files: ["y7uQi/2", "6VwvN/4"], columns: ["Index", "Economic Confidence Index"], minRows: [200, 70], monthly: true, bounds: [-100, 100],
      note: "Gallup's Economic Confidence Index is the average of two components: current conditions (% excellent or good minus % poor) and economic outlook (% getting better minus % getting worse), net positive minus negative. Gallup does not publish the verbatim question wording on this chart; this paraphrase follows its title and description (6VwvN/6). Annual mean of published monthly values; multiple polls within a month are averaged before averaging months. Historical coverage is irregular and missing months are not interpolated. All overlapping readings must agree exactly." },
  ];
  for (const sp of specs) {
    const urls = sp.files.map((f) => `https://datawrapper.dwcdn.net/${f}/dataset.csv`);
    const sources: Record<string, number[]>[] = [];
    let annual: Record<string, number> = {};
    for (let i = 0; i < urls.length; i++) {
      // Datawrapper calls these CSV exports but currently serves tabs; preserve the blank date header.
      const lines = (await getText(urls[i])).trimEnd().split(/\r?\n/), sep = lines[0].includes("\t") ? "\t" : ",";
      const hdr = lines[0].split(sep).map((s) => s.trim());
      invariant(hdr.some((h) => h.toLowerCase().includes(sp.columns[i].toLowerCase())), `${sp.key}: expected ${sp.columns[i]} in header ${lines[0]}`);
      const col = hdr.findIndex((h) => h.toLowerCase() === sp.columns[i].toLowerCase()), dateCol = hdr.findIndex((h) => h === "" || h === "Formatted Date");
      invariant(col >= 0 && dateCol >= 0 && col !== dateCol && new Set(hdr).size === hdr.length, `${sp.key}: ambiguous columns in header ${lines[0]}`);
      invariant(lines.length - 1 >= sp.minRows[i], `${sp.key}: only ${lines.length - 1} rows from ${urls[i]}`);
      const rows: string[][] = [], daily: Record<string, number[]> = {};
      for (const line of lines.slice(1)) {
        const r = line.split(sep).map((s) => s.trim());
        invariant(r.length === hdr.length, `${sp.key}: row width ${line}`);
        if (sp.key === "gallupFinancesBetter" && r[dateCol] === "" && r.slice(1).every((s) => s === "%")) continue;
        const label = r[dateCol], v = Number(r[col]);
        invariant(label !== "" && r[col] !== "" && Number.isFinite(v) && v >= sp.bounds[0] && v <= sp.bounds[1], `${sp.key}: invalid value ${line}`);
        if (!sp.monthly) {
          invariant(sp.key === "gallupMentalHealthExcellent" ? /^\d{4}$/.test(label) : /^\d{4} [A-Z][a-z]{2} \d/.test(label), `${sp.key}: invalid date ${label}`);
          rows.push([label, r[col]]); continue;
        }
        invariant(/^[A-Z][a-z]{2} \d{1,2} \d{4}$/.test(label) || /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(label), `${sp.key}: invalid date ${label}`);
        const d = new Date(label);
        invariant(Number.isFinite(d.getTime()), `${sp.key}: invalid date ${label}`);
        const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        (daily[date] ??= []).push(v);
      }
      if (sp.monthly) sources.push(daily); else {
        annual = yearSeries(rows, 1);
        if (sp.key === "gallupMentalHealthExcellent") invariant(rows.length === Object.keys(annual).length, `${sp.key}: duplicate year`);
      }
    }
    let partialThrough: string | undefined;
    const ty = new Date().getFullYear();
    if (sp.monthly) {
      const merged = { ...sources[0] };
      let overlap = 0;
      for (const [date, vs] of Object.entries(sources[1])) {
        if (date in merged) {
          for (const a of merged[date]) for (const b of vs) invariant(a === b, `${sp.key} ${date}: overlap mismatch ${a} vs ${b}`);
          overlap++;
        } else merged[date] = vs;
      }
      invariant(overlap >= (sp.key === "gallupEconomicConfidence" ? 28 : 11), `${sp.key}: only ${overlap} overlap dates`);
      const monthly: Record<string, number[]> = {};
      for (const [date, vs] of Object.entries(merged)) (monthly[date.slice(0, 7)] ??= []).push(...vs);
      const by: Record<string, number[]> = {};
      for (const [month, vs] of Object.entries(monthly)) {
        (by[month.slice(0, 4)] ??= []).push(vs.reduce((a, b) => a + b, 0) / vs.length);
        if (month.startsWith(String(ty)) && (!partialThrough || month > partialThrough)) partialThrough = month;
      }
      for (const [y, vs] of Object.entries(by)) annual[y] = round(vs.reduce((a, b) => a + b, 0) / vs.length);
      console.log(`✓ ${sp.key}: ${overlap} overlap dates agree exactly`);
    }
    if (sp.key === "gallupMentalHealthExcellent") {
      invariant(annual["2001"] === 43, `${sp.key}: 2001 = ${annual["2001"]}, expected 43`);
      invariant(annual["2025"] === 29, `${sp.key}: 2025 = ${annual["2025"]}, expected 29`);
    }
    await save(sp.key, {
      name: sp.name, unit: sp.unit, source: `Gallup, ${sp.name}`, sourceUrl: urls[urls.length - 1], historicalSourceUrls: urls, goodDirection: "up",
      note: `${sp.note} The sourceUrl is the pinned Datawrapper CSV because the chart metadata's source-url is empty; pinned versions are retained for reproducibility and may lag the current chart.`,
      method: `Datawrapper ${sp.files.join(" + ")}, named column ${sp.columns.join(" / ")}; ${sp.monthly ? "exact overlap checks, mean within month then mean of published months per year" : "latest published poll per year"}`, partialYear: partialThrough ? ty : undefined, partialThrough,
    }, annual, sp.bounds, 15);
  }
});

// ================= index + log =================
const keys = (await Array.fromAsync(new Bun.Glob("*.json").scan(SERIES))).map((f) => f.replace(/\.json$/, "")).sort();
const index: Record<string, unknown> = {};
for (const k of keys) { const j = await Bun.file(join(SERIES, `${k}.json`)).json(); index[k] = { name: j._meta.name, unit: j._meta.unit, source: j._meta.source, coverage: j._meta.coverage, fetched: j._meta.fetched }; }
await writeFile(join(DIR, "index.json"), JSON.stringify({ generated: NOW, series: index }, null, 2));
// never write absolute machine paths into the log: the repo is public
const scrub = (e: string) => e.split(DIR).join(".").split(CACHE).join("./.cache").slice(0, 120);
await appendFile(join(DIR, "update.log"), `${NOW} wrote ${Object.keys(written).length} series; errors: ${Object.keys(errors).length ? Object.entries(errors).map(([k, e]) => `${k}: ${scrub(e)}`).join(" | ") : "none"}\n`);
console.log(`\n${Object.keys(written).length} series written, ${keys.length} in index; errors: ${Object.keys(errors).length}`);
if (Object.keys(errors).length) process.exit(1);
