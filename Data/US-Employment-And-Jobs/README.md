# US Employment & Jobs (the AI era)

**32 US labor-market series chosen to show whether AI is visible in jobs, hiring, and layoffs since ChatGPT (November 30, 2022) — stored at each publisher's own cadence, every value from its primary publisher, in one machine-readable place.**

Two kinds of series, kept apart on purpose: **outcome** series with long history (sector employment, job postings, entry-level unemployment, openings, layoffs) so a pre-AI baseline exists to compare against, and **phenomenon** series that measure AI itself (adoption at firms and among workers, AI-attributed job cuts, AI in postings) and therefore begin when their instrument began. What the data does and does not show, and what the published studies conclude, is written up once in [the research project](../../research/us-employment-jobs-2026-09/README.md), not in this dataset.

Powers the **Employment & Jobs** section of **https://usstats.io** (each row links to a page with the native-cadence chart, the full table, and these sources; https://usstats.io/data/stats-native.csv serves the sub-annual values).

## Quick Start

```bash
bun update.ts            # refresh every series from its publisher (no API keys)
bun update.ts --only fred
bun docs.ts              # regenerate this README, SUMMARY.md, source.md from the data
```

Each `series/<key>.json` holds `_meta` (provenance, cadence, the annual derivation rule, the class, and the method note), `native` (period → value at the publisher's cadence; absent for annual publishers), and `data` (year → value derived by `annualRule`; the current year is flagged `partialYear`/`partialThrough`).

## Series

### Labor-market outcomes (long history — the baseline AI would have to move)

| Series | Latest | First | Unit | Cadence | Coverage | Publisher |
|---|---|---|---|---|---|---|
| [Mid-Career Workers in AI-Exposed Jobs (Stanford index)](series/canariesMidCareerExposed.json) | 109 (2026-07) | 91.1 (2021-08) | employment index, ages 35–40 in the most AI-exposed occupation quintile, November 2022 = 100 | monthly | 2021-08–2026-07 · 60 monthly pts | Stanford Digital Economy Lab, AI Economic Indicators (Brynjolfsson, Chandar & Chen, "Canaries in the Coal Mine") |
| [Young Workers in AI-Exposed Jobs (Stanford index)](series/canariesYoungExposed.json) | 88.5 (2026-07) | 87 (2021-08) | employment index, ages 22–25 in the most AI-exposed occupation quintile, November 2022 = 100 | monthly | 2021-08–2026-07 · 60 monthly pts | Stanford Digital Economy Lab, AI Economic Indicators (Brynjolfsson, Chandar & Chen, "Canaries in the Coal Mine") |
| [Business Support Jobs (Call Centers)](series/cesBusinessSupport.json) | 623.6 (2026-08) | 503 (1990-01) | employees, thousands, seasonally adjusted | monthly | 1990-01–2026-08 · 440 monthly pts | BLS Current Employment Statistics, via FRED CES6056140001 |
| [Computer Systems Design Jobs](series/cesComputerSystemsDesign.json) | 2362.7 (2026-08) | 409.5 (1990-01) | employees, thousands, seasonally adjusted | monthly | 1990-01–2026-08 · 440 monthly pts | BLS Current Employment Statistics, via FRED CES6054150001 |
| [Computing Infrastructure Jobs](series/cesComputingInfrastructure.json) | 453.3 (2026-08) | 213.7 (1990-01) | employees, thousands, seasonally adjusted | monthly | 1990-01–2026-08 · 440 monthly pts | BLS Current Employment Statistics, via FRED CES5051800001 |
| [Information Sector Jobs](series/cesInformation.json) | 2745 (2026-08) | 1112 (1939-01) | employees, thousands, seasonally adjusted | monthly | 1939-01–2026-08 · 1052 monthly pts | BLS Current Employment Statistics, via FRED USINFO |
| [Temporary Help Jobs](series/cesTemporaryHelp.json) | 2519.5 (2026-08) | 1160.2 (1990-01) | employees, thousands, seasonally adjusted | monthly | 1990-01–2026-08 · 440 monthly pts | BLS Current Employment Statistics, via FRED TEMPHELPS |
| [Fiverr Active Buyers](series/fiverrActiveBuyers.json) | 2676 (2026) | 2352 (2019) | thousands of buyers who ordered in the prior 12 months, at year-end | annual | 2019–2026 · 8 pts | Fiverr International Ltd., Forms 20-F and 6-K (SEC EDGAR) |
| [Job Postings Index (Indeed)](series/indeedPostingsAll.json) | 101.9 (2026-08) | 100 (2020-02) | index, February 1, 2020 = 100, monthly average of daily values, seasonally adjusted | monthly | 2020-02–2026-08 · 79 monthly pts | Indeed Hiring Lab, via FRED IHLIDXUS |
| [Customer Service Postings (Indeed)](series/indeedPostingsCustomerService.json) | 87.8 (2026-08) | 99.5 (2020-02) | index, February 1, 2020 = 100, monthly average of daily values, seasonally adjusted | monthly | 2020-02–2026-08 · 79 monthly pts | Indeed Hiring Lab, via FRED IHLIDXUSTPCUSTSERV |
| [Software Postings Index (Indeed)](series/indeedPostingsSoftware.json) | 74.4 (2026-08) | 99.7 (2020-02) | index, February 1, 2020 = 100, monthly average of daily values, seasonally adjusted | monthly | 2020-02–2026-08 · 79 monthly pts | Indeed Hiring Lab, via FRED IHLIDXUSTPSOFTDEVE |
| [Initial Jobless Claims](series/initialClaims.json) | 205800 (2026-08) | 209000 (1967-01) | initial claims per week, seasonally adjusted, monthly average | monthly | 1967-01–2026-08 · 716 monthly pts | US Employment and Training Administration, via FRED ICSA |
| [Hires](series/joltsHires.json) | 5054 (2026-07) | 5426 (2000-12) | hires per month, thousands, seasonally adjusted | monthly | 2000-12–2026-07 · 308 monthly pts | BLS Job Openings and Labor Turnover Survey, via FRED JTSHIL |
| [Layoffs & Discharges](series/joltsLayoffs.json) | 1666 (2026-07) | 2018 (2000-12) | layoffs and discharges per month, thousands, seasonally adjusted | monthly | 2000-12–2026-07 · 308 monthly pts | BLS Job Openings and Labor Turnover Survey, via FRED JTSLDL |
| [Job Openings](series/joltsOpenings.json) | 7271 (2026-07) | 5088 (2000-12) | openings, thousands, seasonally adjusted, last business day of month | monthly | 2000-12–2026-07 · 308 monthly pts | BLS Job Openings and Labor Turnover Survey, via FRED JTSJOL |
| [Computer Programmers Employed](series/oewsComputerProgrammers.json) | 92230 (2025) | 199540 (2019) | employed, May of each year | annual | 2019–2025 · 7 pts | BLS Occupational Employment and Wage Statistics (SOC 15-1251) |
| [Customer Service Reps Employed](series/oewsCustomerServiceReps.json) | 2595750 (2025) | 2919230 (2019) | employed, May of each year | annual | 2019–2025 · 7 pts | BLS Occupational Employment and Wage Statistics (SOC 43-4051) |
| [Data Entry Keyers Employed](series/oewsDataEntryKeyers.json) | 127080 (2025) | 159930 (2019) | employed, May of each year | annual | 2019–2025 · 7 pts | BLS Occupational Employment and Wage Statistics (SOC 43-9021) |
| [Software Developers Employed](series/oewsSoftwareDevelopers.json) | 1687890 (2025) | 1364180 (2021) | employed, May of each year | annual | 2021–2025 · 5 pts | BLS Occupational Employment and Wage Statistics (SOC 15-1252) |
| [Recent Grad Underemployment](series/recentGradUnderemployment.json) | 41.95 (2026-06) | 42.92 (1990-01) | percent working in jobs that do not typically require a college degree, ages 22–27 with a bachelor's degree or higher | monthly | 1990-01–2026-06 · 438 monthly pts | Federal Reserve Bank of New York, The Labor Market for Recent College Graduates |
| [Recent Grad Unemployment](series/recentGradUnemployment.json) | 5.7 (2026-06) | 3.38 (1990-01) | percent, ages 22–27 with a bachelor's degree or higher, seasonally adjusted 3-month average | monthly | 1990-01–2026-06 · 438 monthly pts | Federal Reserve Bank of New York, The Labor Market for Recent College Graduates |
| [Upwork Gross Services Volume](series/upworkGsv.json) | 4028386 (2025) | 1148363 (2016) | thousands of US dollars transacted per year | annual | 2016–2025 · 10 pts | Upwork Inc., Form 10-K key metrics (SEC EDGAR) |
| [Occupational Churn (Yale index)](series/yaleOccupationalChurn.json) | 3.42 (2026-07) | 2.83 (2022-11) | dissimilarity index, percentage-point shift in the occupational mix over the prior 12 months, 12-month moving average | monthly | 2022-11–2026-07 · 44 monthly pts | Yale Budget Lab, Tracking the Impact of AI on the Labor Market (from CPS microdata) |

### The AI phenomenon itself (series that begin when their instrument began)

| Series | Latest | First | Unit | Cadence | Coverage | Publisher |
|---|---|---|---|---|---|---|
| [Firms Using AI (Any Function)](series/btosAiUseAnyFunction.json) | 22.4 (2026-08-09) | 17.3 (2025-11-16) | percent of U.S. businesses, prior two weeks | biweekly | 2025-11-16–2026-08-09 · 20 biweekly pts | Census Bureau, Business Trends and Outlook Survey (National file) |
| [Firms Using AI (Original Question)](series/btosAiUseOriginal.json) | 10 (2025-09-21) | 3.7 (2023-09-10) | percent of U.S. businesses, prior two weeks | biweekly | 2023-09-10–2025-09-21 · 54 biweekly pts | Census Bureau, Business Trends and Outlook Survey (AI Core Questions file) |
| [Job Cuts Attributed to AI](series/challengerAiJobCuts.json) | 116175 (2026) | 4247 (2023) | announced job cuts per year citing artificial intelligence as the reason | annual | 2023–2026 · 4 pts | Challenger, Gray & Christmas, Job Cut Announcement Report |
| [Employees Using AI at Work](series/gallupAiUseAny.json) | 52 (2026-04) | 21 (2023-04) | percent of U.S. employees using AI in their role at least a few times a year | quarterly | 2023-04–2026-04 · 7 quarterly pts | Gallup workforce study |
| [Employees Using AI Daily](series/gallupAiUseDaily.json) | 15 (2026-04) | 4 (2023-04) | percent of U.S. employees using AI in their role daily | quarterly | 2023-04–2026-04 · 7 quarterly pts | Gallup workforce study |
| [Workers Using GenAI for Work](series/genAiAdoptionWork.json) | 45.2 (2026-04) | 33.3 (2024-07) | percent of employed adults 18–64 | quarterly | 2024-07–2026-04 · 8 quarterly pts | Real-Time Population Survey (Bick, Blandin & Deming), via FRED RPSGENAIUSAGESHAREWORK |
| [Job Postings Mentioning AI (Indeed)](series/indeedAiPostingsShare.json) | 6.17 (2026-07) | 1.71 (2019-01) | percent of US job postings, monthly average of daily values | monthly | 2019-01–2026-07 · 91 monthly pts | Indeed Hiring Lab AI Tracker (GitHub, CC BY 4.0) |
| [Expect AI to Reduce Jobs](series/publicExpectsFewerJobs.json) | 79 (2026) | 75 (2023) | percent of U.S. adults expecting AI to reduce the total number of U.S. jobs over the next 10 years | annual | 2023–2026 · 4 pts | Bentley University–Gallup Business in Society study |
| [Businesses Paying for AI (Ramp)](series/rampAiIndex.json) | 55.73 (2026-07) | 7.46 (2023-01) | percent of US businesses on Ramp with a paid AI transaction in the month | monthly | 2023-01–2026-07 · 43 monthly pts | Ramp Economics Lab, Ramp AI Index |

## Rules this dataset runs on

1. Primary publisher only; aggregators were finding aids.
2. One instrument's repeated measure per series; every methodology break named in the note.
3. Native cadence stored; annual values derived by the stated rule, never the reverse.
4. No causal claim in any note: the series are shown against the ChatGPT date on the site, and the studies are the interpretation layer in the research README.
5. Vendor and platform data only where the platform publishes the data itself with a stated method.

## Provenance

Research project: [research/us-employment-jobs-2026-09](../../research/us-employment-jobs-2026-09/README.md) — the quality filter, every candidate's disposition, and the independent re-verification of every shipped value. Full source list: [source.md](source.md).

_Generated 2026-09-06 by docs.ts from index.json and series/*.json (6011 data points)._
