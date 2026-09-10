# Sources — US Disease & Vaccination

Every shipped value traces to one of these. "Fetched" means `update.ts` reads it on every refresh; "browser-read" means the publisher refuses non-browser clients, so the values were read through a real browser, checked in under `data/` with the URL and read date, and are re-read by hand on refresh.

## Reported disease incidence

- **NCHS, *Health, United States 2020–2021*, Table IDNotif** — "Selected nationally notifiable disease rates and number of new cases: United States, selected years 1950–2019." Fetched: `https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus20-21tables/IDNotif.xlsx`. Rates per 100,000 resident population; the table's footnotes name each disease's definition changes and denominator exclusions.
- **CDC WONDER, NNDSS Annual Summary Data 2016–2023** — final annual case counts by disease, United States excluding territories and non-U.S. residents. Browser-read: `https://wonder.cdc.gov/nndss-annual-summary.html` (query: Disease by Year, all diseases). Checked in as `data/nndss-annual-2016-2023.json`.
- **CDC, Measles Cases and Outbreaks** — full-year confirmed case counts for 2024 and 2025 and the 2026 year-to-date count. Browser-read: `https://www.cdc.gov/measles/data-research/index.html`. Checked in as `data/cdc-measles-page.json` with the sentences quoted.
- **Census resident population via FRED POPTHM** — July 1 values used as the denominator for 2020 onward. Fetched: `https://fred.stlouisfed.org/graph/fredgraph.csv?id=POPTHM`. Written to `data/population.json`.

## Mortality

- **NCHS, Age-adjusted Death Rates for Selected Major Causes of Death** (data.cdc.gov `6rkc-nb2q`), influenza and pneumonia 1900–2018. Fetched.
- **NCHS, *Health, United States 2020–2021*, Table SlctMort** — age-adjusted death rates 1950–2019, "All people" block: influenza and pneumonia; HIV disease. Fetched from ftp.cdc.gov.
- **CDC WONDER, Underlying Cause of Death 2018–2024 (single race)** — final age-adjusted rates by year for the ICD-10 113-cause list items "Influenza and pneumonia (J09-J18)" and "Human immunodeficiency virus (HIV) disease (B20-B24)". Browser-read: `https://wonder.cdc.gov/ucd-icd10-expanded.html`. Checked in as `data/nchs-final-ucd.json`.
- **NCHS VSRR, quarterly provisional estimates for selected indicators of mortality** (data.cdc.gov `489q-934x`), 12 months ending Q4, age-adjusted — used only for years with no final rate yet, flagged provisional. Fetched.
- **NCHS, Provisional COVID-19 Death Counts by Week Ending Date** (data.cdc.gov `r8kw-7aab`), national rows summed to calendar year. Fetched.

## Vaccination coverage

- **CDC School Vaccination Assessment Program** — kindergarten coverage and exemptions (data.cdc.gov `ijqb-a7ye`, geography "United States"). Fetched.
- **CDC NIS-Child, by age 24 months, by birth year** (data.cdc.gov `fhky-rtsk`, dimension "24 Months", single birth years). Fetched.
- **CDC NIS-Child, children 19–35 months by survey year** — *Health, United States 2018*, Table 31 (1998–2017, one decimal) and the *Health, United States 2011* trend table on data.cdc.gov `nkri-ptxd` (1995–1997, integers). Fetched.
- **CDC NIS-Teen** (data.cdc.gov `ee48-w5t6`, dimension "13-17 Years"). Fetched.
- **CDC FluVaxView** (data.cdc.gov `vh55-3he6`, geography "United States", end-of-season month). Fetched.
- **CDC BRFSS adult coverage** (data.cdc.gov `aetd-68ew`, pneumococcal, "≥65 Years", Overall). Fetched.
- **NCHS NHIS via *Health, United States 2017*, Tables 68 and 69** — influenza (past 12 months) and pneumococcal (ever) vaccination among adults 65 and over, 1989–2016. Fetched from ftp.cdc.gov.

## Finding aids that were not used as sources

Our World in Data, Wikipedia, Statista, Macrotrends, USAFacts, KFF; the NNDSS weekly provisional tables on data.cdc.gov (provisional year-to-date counts, never final annual totals).
