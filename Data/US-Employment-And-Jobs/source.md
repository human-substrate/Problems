# Sources — US Employment & Jobs

Every series, its publisher, the exact endpoint or document `update.ts` reads, cadence, and the method note.

## Firms Using AI (Any Function) (`btosAiUseAnyFunction`)

- **Publisher:** Census Bureau, Business Trends and Outlook Survey (National file)
- **Source URL:** https://www.census.gov/hfp/btos/data
- **Also:** https://www.census.gov/hfp/btos/downloads/National.xlsx
- **Unit:** percent of U.S. businesses, prior two weeks
- **Cadence:** biweekly · annual rule: annual average · class: phenomenon
- **Coverage:** 2025-11-16–2026-08-09
- **Method & caveats:** Share of businesses answering yes to "In the last two weeks, did this business use Artificial Intelligence (AI) in any of its business functions?" — the BTOS question as reworded from cycle 202524 (collection from November 17, 2025). Census: "Due to a level shift observed in conjunction with the new question wording, the decision was made to create a new time series for the AI questions, beginning with data released on December 4, 2025." Cycles 202521–202523 (October to mid-November 2025) have no estimates; the workbook labels them SHUTDOWN. Dated by the end of each reference period. Annual figure is the average of the year's cycles.

## Firms Using AI (Original Question) (`btosAiUseOriginal`)

- **Publisher:** Census Bureau, Business Trends and Outlook Survey (AI Core Questions file)
- **Source URL:** https://www.census.gov/hfp/btos/data
- **Also:** https://www.census.gov/hfp/btos/downloads/AI%20Core%20Questions.xlsx
- **Unit:** percent of U.S. businesses, prior two weeks
- **Cadence:** biweekly · annual rule: annual average · class: phenomenon
- **Coverage:** 2023-09-10–2025-09-21
- **Method & caveats:** Share of businesses answering yes to "In the last two weeks, did this business use Artificial Intelligence (AI) in producing goods or services?" — the Census Bureau's biweekly BTOS, ~1.2 million businesses sampled per year, each responding quarterly. Cycles from September 2023 (cycle 202319) through September 2025 (202520), dated here by the end of each reference period. Census retired this wording after 202520 and started a NEW series for the reworded question (see Firms Using AI (Any Function)); the two are never joined. Annual figure is the average of the year's cycles.

## Mid-Career Workers in AI-Exposed Jobs (`canariesMidCareerExposed`)

- **Publisher:** Stanford Digital Economy Lab, AI Economic Indicators (Brynjolfsson, Chandar & Chen, "Canaries in the Coal Mine")
- **Source URL:** https://digitaleconomy.stanford.edu/project/indicators/canaries-dashboard/
- **Also:** https://storage.googleapis.com/aviary-del-public/release_memos/latest/downloads/canaries_age_by_exposure_results.zip
- **Unit:** employment index, ages 35–40 in the most AI-exposed occupation quintile, November 2022 = 100
- **Cadence:** monthly · annual rule: annual average · class: outcome
- **Coverage:** 2021-08–2026-07
- **Method & caveats:** Same index as the young-worker row, for ages 35–40 in the most AI-exposed occupation quintile (November 2022 = 100): the comparison group in the authors' headline that young workers' employment in exposed occupations sits below where it would be had it kept pace with experienced workers. Same source, same caveats.

## Young Workers in AI-Exposed Jobs (`canariesYoungExposed`)

- **Publisher:** Stanford Digital Economy Lab, AI Economic Indicators (Brynjolfsson, Chandar & Chen, "Canaries in the Coal Mine")
- **Source URL:** https://digitaleconomy.stanford.edu/project/indicators/canaries-dashboard/
- **Also:** https://storage.googleapis.com/aviary-del-public/release_memos/latest/downloads/canaries_age_by_exposure_results.zip
- **Also:** https://digitaleconomy.stanford.edu/app/uploads/2026/08/Canaries_August2026.pdf
- **Unit:** employment index, ages 22–25 in the most AI-exposed occupation quintile, November 2022 = 100
- **Cadence:** monthly · annual rule: annual average · class: outcome
- **Coverage:** 2021-08–2026-07
- **Method & caveats:** Employment of workers aged 22–25 in the fifth of occupations most exposed to AI (Eloundou et al. exposure plus Anthropic usage), indexed to November 2022 = 100, from a balanced panel of firms using ADP payroll (3.5–5 million employees per month), published and updated monthly by the authors. The authors: "early, descriptive indicators—canaries in the coal mine—rather than causal estimates"; the ADP panel is not the national workforce and the series begins August 2021, so there is no 2019 baseline. The companion row for ages 35–40 is the comparison the authors draw.

## Business Support Jobs (Call Centers) (`cesBusinessSupport`)

- **Publisher:** BLS Current Employment Statistics, via FRED CES6056140001
- **Source URL:** https://fred.stlouisfed.org/series/CES6056140001
- **Unit:** employees, thousands, seasonally adjusted
- **Cadence:** monthly · annual rule: annual average · class: outcome
- **Coverage:** 1990-01–2026-08
- **Method & caveats:** All employees in Business Support Services (NAICS 5614), which contains telephone call centers, document preparation, and collection agencies — routine office work often named as exposed to automation. Monthly, seasonally adjusted, from January 1990. The decline predates 2022 (884.6 thousand in January 2019). Annual figure is the twelve-month average.

## Computer Systems Design Jobs (`cesComputerSystemsDesign`)

- **Publisher:** BLS Current Employment Statistics, via FRED CES6054150001
- **Source URL:** https://fred.stlouisfed.org/series/CES6054150001
- **Unit:** employees, thousands, seasonally adjusted
- **Cadence:** monthly · annual rule: annual average · class: outcome
- **Coverage:** 1990-01–2026-08
- **Method & caveats:** All employees in Computer Systems Design and Related Services (NAICS 5415) — the industry that employs most US software and IT services workers. Monthly, seasonally adjusted, from January 1990. Subject to BLS's annual benchmark revisions; the annual figure is the average of the twelve months.

## Computing Infrastructure Jobs (`cesComputingInfrastructure`)

- **Publisher:** BLS Current Employment Statistics, via FRED CES5051800001
- **Source URL:** https://fred.stlouisfed.org/series/CES5051800001
- **Unit:** employees, thousands, seasonally adjusted
- **Cadence:** monthly · annual rule: annual average · class: outcome
- **Coverage:** 1990-01–2026-08
- **Method & caveats:** All employees in Computing Infrastructure Providers, Data Processing, Web Hosting, and Related Services (NAICS 518) — the industry on the supply side of the AI buildout. Monthly, seasonally adjusted, from January 1990. Annual figure is the twelve-month average.

## Information Sector Jobs (`cesInformation`)

- **Publisher:** BLS Current Employment Statistics, via FRED USINFO
- **Source URL:** https://fred.stlouisfed.org/series/USINFO
- **Unit:** employees, thousands, seasonally adjusted
- **Cadence:** monthly · annual rule: annual average · class: outcome
- **Coverage:** 1939-01–2026-08
- **Method & caveats:** All employees in the Information supersector (publishing including software, media, telecommunications, data processing and web hosting). Monthly, seasonally adjusted, from January 1939. The 2022 NAICS revision moved software publishers within the sector without changing the total. Annual figure is the twelve-month average.

## Temporary Help Jobs (`cesTemporaryHelp`)

- **Publisher:** BLS Current Employment Statistics, via FRED TEMPHELPS
- **Source URL:** https://fred.stlouisfed.org/series/TEMPHELPS
- **Unit:** employees, thousands, seasonally adjusted
- **Cadence:** monthly · annual rule: annual average · class: outcome
- **Coverage:** 1990-01–2026-08
- **Method & caveats:** All employees in Temporary Help Services (NAICS 56132), the staffing-agency workforce that employers cut first and hire first — a long-known leading indicator of the labor cycle, not an AI-specific measure. Monthly, seasonally adjusted, from January 1990. Annual figure is the twelve-month average.

## Job Cuts Attributed to AI (`challengerAiJobCuts`)

- **Publisher:** Challenger, Gray & Christmas, Job Cut Announcement Report
- **Source URL:** https://www.challengergray.com/blog/category/job-cuts-report/
- **Also:** https://www.challengergray.com/wp-content/uploads/2026/09/Challenger-Report-August-2026.pdf
- **Unit:** announced job cuts per year citing artificial intelligence as the reason
- **Cadence:** annual · annual rule: annual (publisher) · class: phenomenon
- **Coverage:** 2023–2026
- **Method & caveats:** Job cuts announced by US employers with artificial intelligence as the stated reason, from the outplacement firm's monthly report (tracked since 1993; AI as a reason since 2023). Announced cuts, not realized layoffs, and the reason is the employer's own; Challenger's parallel Technological Update category changed labels each year. 2026 is year-to-date through August. Values read from the December 2023, 2024, and 2025 and the August 2026 report tables, and cross-checked against the since-2023 cumulative printed in the December 2025 report.

## Fiverr Active Buyers (`fiverrActiveBuyers`)

- **Publisher:** Fiverr International Ltd., Forms 20-F and 6-K (SEC EDGAR)
- **Source URL:** https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=1762301&type=20-F
- **Also:** https://www.sec.gov/Archives/edgar/data/1762301/000117891326000858/zk2634486.htm
- **Unit:** thousands of buyers who ordered in the prior 12 months, at year-end
- **Cadence:** annual · annual rule: annual (publisher) · class: outcome
- **Coverage:** 2019–2026
- **Method & caveats:** Buyers who ordered on Fiverr's marketplace in the prior twelve months, as of December 31, from its annual reports; 2026 is as of June 30. DEFINITION BREAK at 2022: the FY2024 report narrowed the metric to marketplace Gigs and restated 2022–2023, so 2022 onward share one definition and 2019–2021 are the earlier, slightly broader one. Fiverr's July 2026 guidance cites "AI-related demand and traffic headwinds" — management's attribution, not ours.

## Employees Using AI at Work (`gallupAiUseAny`)

- **Publisher:** Gallup workforce study
- **Source URL:** https://www.gallup.com/workplace/712736/organizational-adoption-jumps-six-points.aspx
- **Also:** https://www.gallup.com/workplace/701195/frequent-workplace-continued-rise.aspx
- **Unit:** percent of U.S. employees using AI in their role at least a few times a year
- **Cadence:** quarterly · annual rule: annual average · class: phenomenon
- **Coverage:** 2023-04–2026-04
- **Method & caveats:** Gallup Panel workforce study, employed U.S. adults, ~19,000–24,000 per wave. Asked in Q2 of 2023 and 2024, then every quarter from Q2 2025, so the early points are a year apart. Values read from Gallup's published trend table; the checked-in citation file records fielding dates and Gallup's own one-point discrepancy between its 2025 and 2026 trend tables for the frequent-use cut. Annual figure is the average of the year's waves.

## Employees Using AI Daily (`gallupAiUseDaily`)

- **Publisher:** Gallup workforce study
- **Source URL:** https://www.gallup.com/workplace/712736/organizational-adoption-jumps-six-points.aspx
- **Also:** https://www.gallup.com/workplace/701195/frequent-workplace-continued-rise.aspx
- **Unit:** percent of U.S. employees using AI in their role daily
- **Cadence:** quarterly · annual rule: annual average · class: phenomenon
- **Coverage:** 2023-04–2026-04
- **Method & caveats:** Same Gallup instrument and waves as Employees Using AI at Work, the daily-use cut. Q2 2023 and Q2 2024 are annual points; quarterly from Q2 2025. Annual figure is the average of the year's waves.

## Workers Using GenAI for Work (`genAiAdoptionWork`)

- **Publisher:** Real-Time Population Survey (Bick, Blandin & Deming), via FRED RPSGENAIUSAGESHAREWORK
- **Source URL:** https://fred.stlouisfed.org/series/RPSGENAIUSAGESHAREWORK
- **Also:** https://genaiadoptiontracker.com/
- **Unit:** percent of employed adults 18–64
- **Cadence:** quarterly · annual rule: annual average · class: phenomenon
- **Coverage:** 2024-07–2026-04
- **Method & caveats:** Share of employed adults (18–64) who report using generative AI for their job, from the Real-Time Population Survey's quarterly generative-AI module (Bick, Blandin & Deming; hosted by the St. Louis Fed on FRED as release 6). Waves from August 2024, stamped by FRED at the start of each quarter. An online panel with a stated method, not a federal statistical agency product. Annual figure is the average of the year's waves.

## Job Postings Mentioning AI (Indeed) (`indeedAiPostingsShare`)

- **Publisher:** Indeed Hiring Lab AI Tracker (GitHub, CC BY 4.0)
- **Source URL:** https://github.com/hiring-lab/ai-tracker
- **Also:** https://raw.githubusercontent.com/hiring-lab/ai-tracker/main/AI_posting.csv
- **Unit:** percent of US job postings, monthly average of daily values
- **Cadence:** monthly · annual rule: annual average · class: phenomenon
- **Coverage:** 2019-01–2026-07
- **Method & caveats:** Share of US job postings on Indeed whose text mentions AI or generative-AI terms (Indeed's keyword list: e.g. machine learning, data science, artificial intelligence, generative AI, large language models), as a seven-day trailing average, from January 2019; stored as the monthly average. The generative-AI-only file was removed from the repository in August 2025, so only the combined share is published. The one phenomenon series here with a full pre-ChatGPT baseline.

## Job Postings Index (Indeed) (`indeedPostingsAll`)

- **Publisher:** Indeed Hiring Lab, via FRED IHLIDXUS
- **Source URL:** https://fred.stlouisfed.org/series/IHLIDXUS
- **Also:** https://www.hiringlab.org/data/
- **Unit:** index, February 1, 2020 = 100, monthly average of daily values, seasonally adjusted
- **Cadence:** monthly · annual rule: annual average · class: outcome
- **Coverage:** 2020-02–2026-08
- **Method & caveats:** Indeed's count of US job postings, indexed to February 1, 2020 = 100 (the pre-pandemic baseline), published daily on FRED by Indeed Hiring Lab with a stated method (7-day trailing average, seasonally adjusted). Stored here as the average of each month's daily values so it compares with the monthly BLS series. One platform's postings, not a census of all vacancies; JOLTS Job Openings is the official measure. The series begins February 2020, so the pre-AI baseline is the 2020–2022 recovery.

## Customer Service Postings (Indeed) (`indeedPostingsCustomerService`)

- **Publisher:** Indeed Hiring Lab, via FRED IHLIDXUSTPCUSTSERV
- **Source URL:** https://fred.stlouisfed.org/series/IHLIDXUSTPCUSTSERV
- **Also:** https://github.com/hiring-lab/job_postings_tracker
- **Unit:** index, February 1, 2020 = 100, monthly average of daily values, seasonally adjusted
- **Cadence:** monthly · annual rule: annual average · class: outcome
- **Coverage:** 2020-02–2026-08
- **Method & caveats:** Indeed's US customer-service job postings (an Indeed title-based category, not SOC), indexed to February 1, 2020 = 100, published daily on FRED by Indeed Hiring Lab (7-day trailing average, seasonally adjusted); stored as the monthly average. Begins February 2020. Indeed revised its seasonal-adjustment method in November 2024 and restated history.

## Software Postings Index (Indeed) (`indeedPostingsSoftware`)

- **Publisher:** Indeed Hiring Lab, via FRED IHLIDXUSTPSOFTDEVE
- **Source URL:** https://fred.stlouisfed.org/series/IHLIDXUSTPSOFTDEVE
- **Also:** https://www.hiringlab.org/data/
- **Unit:** index, February 1, 2020 = 100, monthly average of daily values, seasonally adjusted
- **Cadence:** monthly · annual rule: annual average · class: outcome
- **Coverage:** 2020-02–2026-08
- **Method & caveats:** Indeed's US software-development job postings, indexed to February 1, 2020 = 100, published daily on FRED by Indeed Hiring Lab (7-day trailing average, seasonally adjusted); stored as the monthly average. The most-watched postings series for AI-exposed technical work; the level fell through 2022–2023 before ChatGPT was widely used, so the marker is a reference date, not a cause. Begins February 2020.

## Initial Jobless Claims (`initialClaims`)

- **Publisher:** US Employment and Training Administration, via FRED ICSA
- **Source URL:** https://fred.stlouisfed.org/series/ICSA
- **Unit:** initial claims per week, seasonally adjusted, monthly average
- **Cadence:** monthly · annual rule: annual average · class: outcome
- **Coverage:** 1967-01–2026-08
- **Method & caveats:** Initial claims for state unemployment insurance, weekly, seasonally adjusted, from January 1967. Stored as the average of the weeks in each month (the weekly file is the source); annual figure is the average of the twelve monthly values. The most timely official measure of layoffs.

## Hires (`joltsHires`)

- **Publisher:** BLS Job Openings and Labor Turnover Survey, via FRED JTSHIL
- **Source URL:** https://fred.stlouisfed.org/series/JTSHIL
- **Unit:** hires per month, thousands, seasonally adjusted
- **Cadence:** monthly · annual rule: annual average · class: outcome
- **Coverage:** 2000-12–2026-07
- **Method & caveats:** Total nonfarm hires during the month. Monthly, seasonally adjusted, from December 2000. Revised each spring with JOLTS benchmarks. Annual figure is the twelve-month average.

## Layoffs & Discharges (`joltsLayoffs`)

- **Publisher:** BLS Job Openings and Labor Turnover Survey, via FRED JTSLDL
- **Source URL:** https://fred.stlouisfed.org/series/JTSLDL
- **Unit:** layoffs and discharges per month, thousands, seasonally adjusted
- **Cadence:** monthly · annual rule: annual average · class: outcome
- **Coverage:** 2000-12–2026-07
- **Method & caveats:** Total nonfarm involuntary separations initiated by the employer during the month. Monthly, seasonally adjusted, from December 2000. The only official national count of layoffs; BLS does not record the reason for a layoff (the Mass Layoff Statistics program ended with May 2013 data). Annual figure is the twelve-month average.

## Job Openings (`joltsOpenings`)

- **Publisher:** BLS Job Openings and Labor Turnover Survey, via FRED JTSJOL
- **Source URL:** https://fred.stlouisfed.org/series/JTSJOL
- **Unit:** openings, thousands, seasonally adjusted, last business day of month
- **Cadence:** monthly · annual rule: annual average · class: outcome
- **Coverage:** 2000-12–2026-07
- **Method & caveats:** Total nonfarm job openings on the last business day of the month. Monthly, seasonally adjusted, from December 2000. Revised each spring with JOLTS benchmarks. Annual figure is the twelve-month average.

## Computer Programmers Employed (`oewsComputerProgrammers`)

- **Publisher:** BLS Occupational Employment and Wage Statistics (SOC 15-1251)
- **Source URL:** https://www.bls.gov/oes/tables.htm
- **Also:** https://www.bls.gov/oes/special-requests/oesm25nat.zip
- **Unit:** employed, May of each year
- **Cadence:** annual · annual rule: annual (publisher) · class: outcome
- **Coverage:** 2019–2025
- **Method & caveats:** National employment from the OEWS national workbook for each May (TOT_EMP, detailed occupation). BLS cautions that OEWS estimates are not designed for year-to-year comparison: the survey pools three years of samples, and model-based (MB3) estimation began with May 2021. Values read from the seven national workbooks (2019–2025) and checked in with each file's hash. Computer programmers write and test code to specifications; software developers (a separate, larger occupation) design the software.

## Customer Service Reps Employed (`oewsCustomerServiceReps`)

- **Publisher:** BLS Occupational Employment and Wage Statistics (SOC 43-4051)
- **Source URL:** https://www.bls.gov/oes/tables.htm
- **Also:** https://www.bls.gov/oes/special-requests/oesm25nat.zip
- **Unit:** employed, May of each year
- **Cadence:** annual · annual rule: annual (publisher) · class: outcome
- **Coverage:** 2019–2025
- **Method & caveats:** National employment from the OEWS national workbook for each May (TOT_EMP, detailed occupation). BLS cautions that OEWS estimates are not designed for year-to-year comparison: the survey pools three years of samples, and model-based (MB3) estimation began with May 2021. Values read from the seven national workbooks (2019–2025) and checked in with each file's hash.

## Data Entry Keyers Employed (`oewsDataEntryKeyers`)

- **Publisher:** BLS Occupational Employment and Wage Statistics (SOC 43-9021)
- **Source URL:** https://www.bls.gov/oes/tables.htm
- **Also:** https://www.bls.gov/oes/special-requests/oesm25nat.zip
- **Unit:** employed, May of each year
- **Cadence:** annual · annual rule: annual (publisher) · class: outcome
- **Coverage:** 2019–2025
- **Method & caveats:** National employment from the OEWS national workbook for each May (TOT_EMP, detailed occupation). BLS cautions that OEWS estimates are not designed for year-to-year comparison: the survey pools three years of samples, and model-based (MB3) estimation began with May 2021. Values read from the seven national workbooks (2019–2025) and checked in with each file's hash.

## Software Developers Employed (`oewsSoftwareDevelopers`)

- **Publisher:** BLS Occupational Employment and Wage Statistics (SOC 15-1252)
- **Source URL:** https://www.bls.gov/oes/tables.htm
- **Also:** https://www.bls.gov/oes/special-requests/oesm25nat.zip
- **Unit:** employed, May of each year
- **Cadence:** annual · annual rule: annual (publisher) · class: outcome
- **Coverage:** 2021–2025
- **Method & caveats:** National employment from the OEWS national workbook for each May (TOT_EMP, detailed occupation). BLS cautions that OEWS estimates are not designed for year-to-year comparison: the survey pools three years of samples, and model-based (MB3) estimation began with May 2021. Values read from the seven national workbooks (2019–2025) and checked in with each file's hash. Begins May 2021: May 2019 and 2020 published the hybrid code 15-1256 (developers plus QA analysts and testers), which is not the same occupation and is excluded.

## Expect AI to Reduce Jobs (`publicExpectsFewerJobs`)

- **Publisher:** Bentley University–Gallup Business in Society study
- **Source URL:** https://news.gallup.com/poll/712751/americans-cool-toward.aspx
- **Also:** https://news.gallup.com/poll/648953/americans-express-real-concerns-artificial-intelligence.aspx
- **Unit:** percent of U.S. adults expecting AI to reduce the total number of U.S. jobs over the next 10 years
- **Cadence:** annual · annual rule: annual (publisher) · class: phenomenon
- **Coverage:** 2023–2026
- **Method & caveats:** Annual Gallup Panel survey of U.S. adults (not workers), fielded each spring since 2023 with identical wording: 75% (2023), 75% (2024), 73% (2025), 79% (2026). Values read from Gallup's published table.

## Businesses Paying for AI (Ramp) (`rampAiIndex`)

- **Publisher:** Ramp Economics Lab, Ramp AI Index
- **Source URL:** https://ramp.com/data/ai-index
- **Also:** https://ramp.com/data/how-we-built-the-ramp-ai-index
- **Unit:** percent of US businesses on Ramp with a paid AI transaction in the month
- **Cadence:** monthly · annual rule: annual average · class: phenomenon
- **Coverage:** 2023-01–2026-07
- **Method & caveats:** Share of businesses using Ramp's corporate cards and bill pay (30,000+, skewed toward younger and technology-forward firms by Ramp's own description) with a transaction for an AI product or service in the month, identified from merchant and line-item text. Spend-based, so free tools and personal accounts are invisible. Monthly from January 2023; Ramp publishes the series only inside its page, so the values are checked in and re-parsed on refresh.

## Recent Grad Underemployment (`recentGradUnderemployment`)

- **Publisher:** Federal Reserve Bank of New York, The Labor Market for Recent College Graduates
- **Source URL:** https://www.newyorkfed.org/research/college-labor-market
- **Also:** https://www.newyorkfed.org/medialibrary/research/interactives/data/college-labor-market/college-labor-underemployment-data.csv
- **Unit:** percent working in jobs that do not typically require a college degree, ages 22–27 with a bachelor's degree or higher
- **Cadence:** monthly · annual rule: annual average · class: outcome
- **Coverage:** 1990-01–2026-06
- **Method & caveats:** Share of employed recent college graduates (ages 22–27, bachelor's or higher) working in a job that does not typically require a college degree, by the New York Fed's O*NET-based classification of occupations, from CPS microdata, monthly from January 1990 (seasonally adjusted moving average), published quarterly. Annual figure is the twelve-month average.

## Recent Grad Unemployment (`recentGradUnemployment`)

- **Publisher:** Federal Reserve Bank of New York, The Labor Market for Recent College Graduates
- **Source URL:** https://www.newyorkfed.org/research/college-labor-market
- **Also:** https://www.newyorkfed.org/medialibrary/research/interactives/data/college-labor-market/college-labor-unemployment-data.csv
- **Unit:** percent, ages 22–27 with a bachelor's degree or higher, seasonally adjusted 3-month average
- **Cadence:** monthly · annual rule: annual average · class: outcome
- **Coverage:** 1990-01–2026-06
- **Method & caveats:** Unemployment rate of recent college graduates (ages 22–27, bachelor's degree or higher, not enrolled in school), computed by the New York Fed from Current Population Survey microdata as a seasonally adjusted three-month moving average, monthly from January 1990 and published quarterly. The same file carries the rate for all workers (ages 16–65), shown on the site for comparison. The Fed notes October 2025 values are estimated because of missing survey data during the federal shutdown. Annual figure is the twelve-month average.

## Upwork Gross Services Volume (`upworkGsv`)

- **Publisher:** Upwork Inc., Form 10-K key metrics (SEC EDGAR)
- **Source URL:** https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=1627475&type=10-K
- **Also:** https://www.sec.gov/Archives/edgar/data/1627475/000162747526000012/upwk-20251231.htm
- **Unit:** thousands of US dollars transacted per year
- **Cadence:** annual · annual rule: annual (publisher) · class: outcome
- **Coverage:** 2016–2025
- **Method & caveats:** Total dollar value of work transacted on Upwork each fiscal year, as printed in its Form 10-K, 2016–2025. The largest US freelance marketplace's own measure of demand for freelance work; growth stalled after 2022 (4.10B → 4.03B in 2025) and Upwork's Q2 2026 10-Q attributes its decline to "the evolving impact of AI on certain categories of freelance work" and macroeconomic uncertainty — management's attribution, not ours. The FY2025 10-K widened the definition to include AI-based services, Connects purchases, payment processing, memberships, and currency services without restating prior years.

## Occupational Churn (`yaleOccupationalChurn`)

- **Publisher:** Yale Budget Lab, Tracking the Impact of AI on the Labor Market (from CPS microdata)
- **Source URL:** https://budgetlab.yale.edu/research/tracking-impact-ai-labor-market
- **Also:** https://github.com/Budget-Lab-Yale/budget-lab-interactives/tree/main/tools/ai-labor-market-tracker
- **Unit:** dissimilarity index, percentage-point shift in the occupational mix over the prior 12 months, 12-month moving average
- **Cadence:** monthly · annual rule: annual average · class: outcome
- **Coverage:** 2022-11–2026-07
- **Method & caveats:** A Duncan dissimilarity index of how much the occupational composition of the US labor force has shifted against a rolling 12-month baseline, computed from monthly Current Population Survey microdata by the Yale Budget Lab and updated with each CPS release (repository data file, all sectors, rolling variant). The Budget Lab's reading as of July 2026 CPS: churn "remains flat, lies within historical ranges, or continues along pre-AI trends." A rise would mean the mix of jobs is changing faster; it does not say why. Begins January 2022; October 2025 CPS is missing (federal shutdown).

_Generated 2026-09-06 by docs.ts._
