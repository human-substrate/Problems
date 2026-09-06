# Data Directory Update Log

This file tracks all datasets added to the Substrate Data directory.

---

## 2026-09-06 - U.S. Employment & Jobs (the AI era)

**Dataset**: US-Employment-And-Jobs (new, 32 series)
**Status**: Active
**Coverage**: outcome series 1939/1967/1990/2000→2026 at native cadence; phenomenon series from their instruments' start (2019, 2023, 2024)
**Source**: BLS (CES, JOLTS, OEWS), US Employment and Training Administration (claims), Federal Reserve Bank of New York (recent-graduate labor market), Census Bureau (BTOS AI questions), Real-Time Population Survey via the St. Louis Fed/FRED, Indeed Hiring Lab (postings indices and AI Tracker), Gallup, Challenger Gray & Christmas, Ramp Economics Lab, Stanford Digital Economy Lab (Canaries index), Yale Budget Lab (occupational churn), Upwork and Fiverr SEC filings

### Contents
- `series/<key>.json` × 32, each with a `_meta` provenance block carrying `cadence`, `annualRule`, and `class` (outcome vs phenomenon), the publisher's own cadence in `native` (monthly / quarterly / biweekly) and the derived annual `data`
- `update.ts` — one re-runnable fetcher, no API keys: FRED, the NY Fed CSVs, the two Census BTOS workbooks (two question wordings, never joined; the SHUTDOWN gap honored), the Indeed AI Tracker CSV, the Stanford zip, the Yale repository CSV, the Ramp page payload; checked-in citation JSON under `data/` for publishers with no endpoint (Gallup tables, Challenger PDFs, BLS OEWS workbooks with file hashes, SEC filings with per-value URLs), each re-verified on refresh where a source can be read
- `SUMMARY.md` / `README.md` / `source.md` — regenerated from the data by `docs.ts`
- Research provenance: `research/us-employment-jobs-2026-09/` (filter and rider, every candidate's disposition, the studies quoted with their hedges, the deterministic 2019 → Nov 2022 → latest table)

### Notes
- Two series classes by design: outcome series need a pre-AI baseline; phenomenon series (adoption, AI-attributed cuts, AI in postings) begin when their instrument began
- No note, kicker, or README sentence attributes a movement to AI beyond what the publisher or a named study states; the studies are the interpretation layer
- Powers the new **Employment & Jobs** section of **https://usstats.io** (native-cadence charts from 2019 with a ChatGPT reference marker; https://usstats.io/data/stats-native.csv)

---

## 2026-08-31 - U.S. Societal Health: education-efficacy expansion

**Dataset**: US-Societal-Health (expanded 68 → 84 series)
**Status**: Active
**Source (new)**: NCES NAEP Data Service API (main + Long-Term Trend), Annenberg Public Policy Center topline PDFs, NORC GSS microdata (WORDSUM), BLS American Time Use Survey API, NEA/Census SPPA reports, Gallup, Pew Research Center

### Contents
- 16 new series measuring education as **actual efficacy**: NAEP civics/U.S. history/geography/science grade-8 scores, NAEP LTT reading + math at ages 9 and 13, the APPC "name all three branches of government" item (phone and online eras kept as separate series — APPC's own 2022 parallel run measured a ~25-point mode effect), GSS WORDSUM vocabulary (1974–2024), ATUS reading minutes/day + participation, SPPA any-book, Gallup books-per-year, Pew read-a-book-any-format
- `update.ts` gains `naep`, `atus`, and `citations` groups; WORDSUM computed inside the existing `gss` group; checked-in citation JSON (`data/appc-branches.json`, `data/reading-citations.json`) for the endpoint-less publishers
- Research provenance: `research/us-education-2026-08/` (filter, riders, every candidate's disposition)

### Notes
- NAEP fetch gotchas encoded: pre-2001/2004 years need the `R1`/`R2` sample suffix; 999.0 is a not-assessed sentinel; anchor values asserted in the fetcher
- Powers the expanded Education section of **https://usstats.io** (2 → 15 rows)

---

## 2026-08-24 - U.S. Long-Run Indicators

**Dataset**: US-Long-Run-Indicators
**Status**: Active
**Coverage**: 51 annual national series, 1895/1930/1948/1970→2026 depending on series
**Source**: BLS, BEA, Census, Federal Reserve/FRED, Freddie Mac, EIA, NOAA NCEI, FBI CDE, CDC/NCHS, BJS, World Happiness Report, Pew, World Bank (via FRED)

### Contents
- `series/<key>.json` × 51, each with a `_meta` provenance block — economy & work (incl. the payroll gender pair), money & debt, cost of living, wealth & education, health, crime & justice, family & society, government/energy/environment
- `SUMMARY.md` / `README.md` / `source.md` — regenerated from the data by `docs.ts`
- `update.ts` — one re-runnable fetcher, no API keys required (FBI CDE optionally keyed); checked-in citation series under `data/` for publishers with no machine endpoint
- Research/migration provenance: `research/us-long-run-indicators-2026-08/`

### Notes
- Companion to US-Societal-Health; together the two datasets are the complete source of record for **https://usstats.io** (the site only copies)
- Historical splices disclosed and machine-verified where publications overlap (BJS imprisonment, FBI CIUS crime, NCHS marriage/divorce/fertility)

---

## 2026-08-21 - U.S. Societal Health

**Dataset**: US-Societal-Health
**Status**: Active
**Coverage**: 66 annual national series, 1850/1915/1950/1972→2026 depending on series
**Source**: NORC GSS (public microdata), Gallup published trend tables, University of Michigan Surveys of Consumers, SAMHSA NSDUH, NIAAA, Monitoring the Future via CDC/NCHS, CDC/NCHS Health US + Data Query System, Census (CPS ASEC, ACS), Federal Reserve Board via FRED, NY Fed Consumer Credit Panel, USDA FNS/ERS, NHTSA, BLS

### Contents
- `series/<key>.json` × 66, each with a `_meta` provenance block (publisher, URL, unit, question wording, breaks, exact method) — happiness & outlook, trust in people and institutions (Gallup + GSS), substance use, health access & suicide by age, household financial stress
- `SUMMARY.md` (answer-first), `README.md`, `source.md` — all regenerated from the data by `docs.ts`
- `update.ts` — one re-runnable fetcher, no API keys; `lib/stata.ts` reads NORC's GSS cumulative file directly; `lib/xlsx.ts` reads publisher spreadsheets
- Research provenance: `research/us-societal-health-2026-08/` (question, filter, every candidate's disposition, synthesis)

### Notes
- Powers the Happiness & Outlook, Trust & Institutions, Substance Use, and new Health / Money rows of **https://usstats.io**
- Survey seams are disclosed per series (GSS 2021 web mode, NSDUH 2021 redesign, NHIS 2019 redesign, Michigan 2017–2024 web transition)

---

## 2026-07-23 - U.S. National Debt

**Dataset**: US-National-Debt
**Status**: Active
**Coverage**: 1790-2026 (annual), daily Debt to the Penny, monthly foreign holders (TIC), quarterly debt/GDP
**Source**: Treasury Fiscal Data API, TIC SLT Table 5, NY Fed SOMA, FRED, SSA/DoD/OPM trustee reports, CRS, CBO

### Contents
- 11 JSON data files with `_meta` provenance blocks (headline, daily, annual 1790→, debt/GDP, foreign holders, Fed SOMA, interest, rates, MSPD, gifts, curated research figures)
- `SUMMARY.md` (answer-first), `US-National-Debt.md` (full doc), `source.md`, `RESOURCES.md`, `README.md`
- `update.ts` — self-contained refresh with plausibility bounds (`bun update.ts`)
- Research provenance: `research/us-national-debt-2026-07/`

### Notes
- Powers the live site **https://usdebt.io**
- Encodes the discovery that legacy TIC `Publish/mfh.txt` is frozen at Jan 2023; uses SLT Table 5

---

## 2025-10-16 - U.S. Gross Domestic Product (GDP)

**Dataset**: US-GDP
**Status**: Active
**Coverage**: 1929-2024 (annual), Q1 1947 - Q2 2025 (quarterly)
**Source**: Federal Reserve Economic Data (FRED) / Bureau of Economic Analysis (BEA)

### Contents
- `Real-GDP-Quarterly-1947-2025.csv` - Quarterly real GDP (314 data points)
- `Real-GDP-Annual-1929-2024.csv` - Annual real GDP (96 data points)
- `US-GDP-1929-2025.md` - Comprehensive metadata documentation
- `README.md` - Dataset documentation with research methodology and historical context
- `UPDATES.md` - Dataset-specific change log
- `RESOURCES.md` - Data sources, APIs, and download instructions

### Description
Authoritative U.S. GDP data representing the total value of all goods and services produced within the United States. Real GDP (chained 2017 dollars) enables inflation-adjusted comparisons across 96 years of American economic history. Quarterly data provides 78 years of detailed business cycle information. Data sourced directly from BEA via FRED, the Federal Reserve's economic data platform.

### Research Methodology
Created through comprehensive parallel research using 10 specialized research agents across 3 services (Perplexity, Claude WebSearch, Gemini). 20 focused queries evaluated data sources, historical coverage, measurement methodologies, and quality standards. 95%+ confidence level in source selection. Research confirmed BEA as primary official U.S. government source with FRED providing optimal accessibility.

### Key Features
- **Gold standard economic indicator**: Primary measure of U.S. economic activity
- **Long historical coverage**: 96 years annual (1929-2024), 78 years quarterly (1947-2025)
- **Highest data quality**: Three-stage quarterly revision process + annual comprehensive updates
- **Full transparency**: Public domain data with complete methodology documentation
- **Easy access**: Direct CSV downloads and free APIs available

---

## 2025-10-07 - Bay Area COVID-19 Wastewater Surveillance

**Dataset**: Bay-Area-COVID-Wastewater
**Status**: Active
**Coverage**: 2022-07-09 to 2025-08-02 (161 weekly data points)
**Source**: California Department of Public Health (CDPH)

### Contents
- `COVID-Wastewater-California-Statewide-2022-2025.csv` - Main dataset
- `COVID-Wastewater-SF-Bay-Area-2023-2025.md` - Metadata documentation
- `README.md` - Dataset documentation and research methodology
- `UPDATES.md` - Dataset-specific change log
- `RESOURCES.md` - Official dashboard and data source links

### Description
California statewide COVID-19 wastewater surveillance data serving as proxy for Bay Area trends. Includes weekly viral concentration measurements from 12+ treatment plants across Bay Area counties (SF, Alameda, Santa Clara, Contra Costa, Marin, San Mateo).

---

## 2025-10-07 - Pulitzer Prize Winners (Arts & Letters)

**Dataset**: Pulitzer-Prize-Winners
**Status**: Active
**Coverage**: 1918-2024 (249 winners in Arts & Letters categories)
**Source**: Wikidata
**Focus**: High-quality, complete coverage of Poetry, Drama, and General/Special awards

### Contents
- `Pulitzer-Prize-Winners-Arts-Letters-1918-2024.csv` - Combined dataset
- `category-poetry.csv` - Poetry winners (105)
- `category-drama.csv` - Drama winners (109)
- `category-general.csv` - General/Special awards (35)
- `README.md` - Dataset documentation and research methodology
- `UPDATES.md` - Dataset-specific change log
- `RESOURCES.md` - Official source links

### Description
Curated Pulitzer Prize winners dataset focusing on Arts & Letters categories with high-quality, near-complete coverage. Includes 107 years of Poetry and Drama awards (1918-2024) plus General/Special citations. Data sourced from Wikidata SPARQL query with comprehensive cleaning. Journalism categories intentionally excluded due to low Wikidata coverage - prioritizing data quality over breadth.

---

## Future Datasets

New datasets will be added above this line in reverse chronological order (newest first).

---

## 2026-07-21 - Vulnerability Disclosure & Data Breach Data

**Dataset**: Vulnerability-And-Breach-Data
**Status**: Active
**Coverage**: 2016-2026 (CVE annual; ITRC/DBIR/IBM breach series), Jan 2018 - Jul 2026 (Patch Tuesday monthly)
**Source**: Composite - CVE.org/NVD, Zero Day Initiative, MITRE CWE, CISA KEV (live feed), Mandiant/GTIG, ITRC, Verizon DBIR, IBM Cost of a Data Breach

### Contents
- Seven JSON data files with per-figure source URLs inline
- `SUMMARY.md` / `Vulnerability-And-Breach-Data.md` - answer-first documentation
- `source.md` - source families, acquisition method, refresh cadences, sync contract
- `update.ts` - integrity check + live CISA KEV drift probe + release calendar
- Research project: `research/vulnerability-breach-ai-analysis-2026-07/`

### Key Finding
Both vulnerabilities and breaches hit records; no dataset attributes either to AI. Vulnerability exploitation became the #1 breach entry vector in DBIR 2026 (~31%) - first time in 19 years.
