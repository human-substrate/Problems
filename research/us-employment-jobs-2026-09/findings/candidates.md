# Candidates — every series considered, with its disposition

Rules are numbered as in [METHODOLOGY.md](../METHODOLOGY.md). SHIP = in `Data/US-Employment-And-Jobs/` and on usstats.io. CUT = not published, with the rule. STUDY-ONLY = quoted in the README as interpretation, never a series. Every value quoted here was read by fetch on 2026-09-06.

## Lane 1 — official statistics (BLS, Census, Federal Reserve system, NY Fed)

| Candidate | Publisher / id | Class | Disposition |
|---|---|---|---|
| Computer Systems Design & Related Services employment (NAICS 5415) | BLS CES via FRED CES6054150001, monthly SA 1990→ | outcome | **SHIP** `cesComputerSystemsDesign` |
| Information sector employment | FRED USINFO, 1939→ | outcome | **SHIP** `cesInformation` |
| Computing Infrastructure, Data Processing, Web Hosting (NAICS 518) | FRED CES5051800001, 1990→ | outcome | **SHIP** `cesComputingInfrastructure` (the AI supply side) |
| Temporary Help Services (NAICS 56132) | FRED TEMPHELPS, 1990→ | outcome | **SHIP** `cesTemporaryHelp` (cyclical leading indicator, labelled as such) |
| Business Support Services incl. call centers (NAICS 5614) | FRED CES6056140001, 1990→ | outcome | **SHIP** `cesBusinessSupport` |
| Professional & Business Services employment | FRED USPBS | outcome | CUT — too broad to read (22.5M jobs across unrelated industries); its components ship |
| Legal, Accounting, Prof/Sci/Tech, Admin & Support, Arch/Eng, Consulting, Web Search Portals, Publishing, Telecom | FRED CES60541…/CES5051… | outcome | CUT — row budget: each is flat to gently rising and none answers the question more sharply than the five shipped |
| Custom Computer Programming Services, Software Publishers, Telephone Call Centers, Advertising (six-digit CES) | BLS API only (not on FRED); v1 returns 3 years, full history needs a registered key | outcome | CUT — rule 5 (no keyless full-history endpoint this run); the parent industries ship. Re-probe with `BLS_API_KEY` |
| JOLTS total openings, hires, layoffs & discharges | FRED JTSJOL / JTSHIL / JTSLDL, monthly SA 2000-12→ | outcome | **SHIP** `joltsOpenings`, `joltsHires`, `joltsLayoffs` |
| JOLTS quits | FRED JTSQUL | outcome | CUT — row budget; not a hiring or layoff measure |
| JOLTS Information and PBS sector openings/hires/layoffs | FRED JTU5100*, JTS540099* — NSA-only on FRED for Information | outcome | CUT — rule 6 (unadjusted monthly sector series would read as noise beside SA totals); BLS API SA versions need a key |
| Weekly initial jobless claims | FRED ICSA, weekly SA 1967→ | outcome | **SHIP** `initialClaims` (monthly average of weeks) |
| Continued claims | FRED CCSA | outcome | CUT — duplicative of initial claims for this question |
| Unemployment rate, ages 20–24 | FRED LNS14000036, SA 1948→ | outcome | CUT — the NY Fed recent-graduate series answers the entry-level question with the education split; keep as a re-probe candidate |
| Unemployment rate, bachelor's degree, ages 20–24 | FRED CGBD2024, NSA 2000→ | outcome | CUT — rule 6 (not seasonally adjusted, small sample; BLS itself warns of month-to-month noise); NY Fed's SA 3-month series ships instead |
| NY Fed recent-college-graduate unemployment and underemployment | CSVs behind the Fed's interactive, monthly SA 3-mo avg 1990→, quarterly release | outcome | **SHIP** `recentGradUnemployment`, `recentGradUnderemployment`; the all-workers column is stored beside them in `data/nyfed-all-workers.json` |
| OEWS occupational employment: computer programmers, software developers, customer service reps, data entry keyers | BLS OEWS national workbooks 2019–2025 (bls.gov serves them to a real browser only) | outcome | **SHIP** four annual series; software developers from 2021 (SOC break named) |
| OEWS: writers & authors, interpreters & translators, paralegals | same workbooks | outcome | CUT — small or flat (writers +5%, paralegals +19%, interpreters −12% 2019→2025); row budget |
| Census BTOS share of firms using AI | Census workbooks, biweekly since Sep 2023, two wordings | phenomenon | **SHIP** as two series `btosAiUseOriginal` (Sep 2023–Sep 2025) and `btosAiUseAnyFunction` (Nov 2025→), never joined — Census's own rule |
| BTOS expected AI use in next six months | same workbooks, Q24 | phenomenon | CUT — row budget; an expectation item beside the realized-use item adds little |
| BTOS AI Supplement: effect of AI on total employment (increase / decrease / no change) | two waves (2024, 2026) | phenomenon | STUDY-ONLY — two points; quoted in the README (2.6% decreased, 2.8% increased in 2024; 2.0% / 2.3% in 2026) |
| Real-Time Population Survey generative-AI adoption for work | FRED RPSGENAIUSAGESHAREWORK, quarterly Aug 2024→ | phenomenon | **SHIP** `genAiAdoptionWork` |
| RPS overall adoption, last-week use, time savings, industry/occupation cuts | FRED release 6 siblings | phenomenon | CUT — row budget; the work-adoption headline carries the finding |
| NY Fed regional business surveys, share of firms using AI (Aug 2024/2025/2026) | xlsx per year | phenomenon | STUDY-ONLY — New York–New Jersey district, not national; quoted |
| Dallas Fed TBOS AI questions (4 waves) | xlsx | phenomenon | STUDY-ONLY — Texas only |
| Atlanta Fed Survey of Business Uncertainty AI block | 62 MB archive workbook, chart tabs | phenomenon | STUDY-ONLY — rule 2 (wording varies by wave) |
| Fed Board FEDS Notes on AI adoption (Apr 2026) and related | one-off notes | — | STUDY-ONLY (interpretation layer) |
| BLS Employment Projections AI-exposure categories (Aug 2026) | annual product, xlsx | — | STUDY-ONLY — an exposure classification, not a labor outcome; BLS: "Exposure does not imply job loss" |
| Beige Book AI mentions | narrative | — | CUT — rule 2 |
| Mass Layoff Statistics (layoffs by reason) | BLS | — | does not exist: program ended with May 2013 data (confirmed from the final release) |
| Nonfarm labor productivity | FRED OPHNFB | outcome | CUT — already on usstats.io under Economy & Work |

## Lane 2 — data published by platforms

| Candidate | Publisher / endpoint | Class | Disposition |
|---|---|---|---|
| Indeed Job Postings Index, US total | FRED IHLIDXUS / hiring-lab GitHub, daily SA from Feb 2020 | outcome | **SHIP** `indeedPostingsAll` (monthly mean; narrow miss on rule 3 disclosed — Feb 2020 base) |
| Indeed postings by sector: Software Development | FRED IHLIDXUSTPSOFTDEVE | outcome | **SHIP** `indeedPostingsSoftware` |
| Indeed postings by sector: Customer Service | FRED IHLIDXUSTPCUSTSERV | outcome | **SHIP** `indeedPostingsCustomerService` |
| Indeed postings, other sectors (47) | GitHub CSV | outcome | CUT — row budget; the two most AI-exposed categories ship. Data & Analytics, Marketing, HR, Legal, Banking are re-probe candidates |
| Indeed AI Tracker, share of postings mentioning AI | hiring-lab/ai-tracker GitHub CSV, daily from Jan 2019 | phenomenon | **SHIP** `indeedAiPostingsShare` — the one phenomenon series with a full pre-ChatGPT baseline |
| Indeed GenAI-only share | same repo | phenomenon | does not exist: the file was deleted from the repository 2025-08-15 |
| Revelio Public Labor Statistics (employment, postings, hiring, salaries) | S3 CSVs, monthly from 2021/2022 | outcome | CUT — rule 3 (starts 2021; no 2019 baseline) and profile-derived; BLS covers the same ground. Downloadable, kept as a cross-check candidate |
| Revelio "years of experience vs skills in tech postings" (the a16z chart of 2026-09-04) | no public data; a16z credits "Source: Revelio Labs", chart only | — | STUDY-ONLY — rule 7. **This resolves the provenance question the study began with**: the chart cannot be reproduced from any public series |
| ADP National Employment Report | FRED ADPMNUSNERSA, monthly 2010→ (legacy series discontinued 2022, not spliceable) | outcome | CUT — the official CES series ships; ADP's license forbids redistribution |
| ADP Pay Insights (job-stayer / job-changer pay growth) | payinsights.adp.com JSON + zip, 2017→ | outcome | CUT — pay, not jobs or hiring; same license |
| Challenger, Gray & Christmas job cuts citing AI | monthly report PDFs, table Job Cuts by Reason, since 2023 | phenomenon | **SHIP** `challengerAiJobCuts` annual (2023–2025 + 2026 YTD); monthly cells are blank in parts of 2024, so annual is the honest cadence |
| Ramp AI Index (share of businesses with a paid AI transaction) | ramp.com page payload, monthly Jan 2023→, stated method | phenomenon | **SHIP** `rampAiIndex` (checked in from the payload, re-parsed on refresh) |
| Upwork gross services volume | SEC 10-K/10-Q tables (not XBRL) | outcome | pending lane 5 — see below |
| Upwork active clients | SEC filings, definition changed Q3 2021 | outcome | pending lane 5 |
| Upwork AI-related GSV growth | press releases (growth rate only) | — | STUDY-ONLY |
| Fiverr annual active buyers | SEC 20-F / 6-K | outcome | pending lane 5 |
| Freelancer.com GMV | ASX releases, AUD, segment moves in and out of commentary | outcome | CUT — rules 2/3 |
| LinkedIn Hiring Rate | monthly Workforce Report, no data file | outcome | CUT — rule 5/7 (chart and prose only) |
| Lightcast AI-skills postings share | interactive charts; only derivative is Stanford AI Index via Our World in Data | phenomenon | CUT — rule 7 (and rule 1 for the derivative); Indeed's tracker is the publisher-hosted equivalent |
| Glassdoor Job Market Report | every research URL returns 403 | — | CUT — rule 5 |
| ZipRecruiter Job Seeker Confidence Index; 2026 AI Employer Report | no download; one-off survey | — | CUT / STUDY-ONLY |
| Stanford Digital Economy Lab Canaries dashboard | updated monthly, no export, ADP-restricted microdata | — | STUDY-ONLY (the paper is quoted in the README) |

## Lane 4 — repeated surveys of AI adoption and use

| Candidate | Publisher | Class | Disposition |
|---|---|---|---|
| Gallup employees using AI at work (any / frequent / daily) | Gallup workforce study, annual 2023–24 then quarterly | phenomenon | **SHIP** `gallupAiUseAny`, `gallupAiUseDaily` (checked-in from Gallup's tables; frequent cut kept in the citation file) |
| Gallup "organization has integrated AI" | two segments (a "don't know" option was added Q3 2025) | phenomenon | CUT — rule 2/6 (two short segments) |
| Gallup fear that AI will eliminate own job | 2023–2026, wording paraphrased differently across articles | phenomenon | STUDY-ONLY until the questionnaire wording is confirmed |
| Bentley–Gallup "AI will reduce the total number of US jobs over 10 years" | annual 2023–2026, identical wording | phenomenon | **SHIP** `publicExpectsFewerJobs` (general public, labelled) |
| Pew workers with at least some work done by AI | 2 waves (2024, 2025) | phenomenon | CUT — two points; re-probe after the third wave |
| Pew adults expecting fewer jobs from AI in 20 years | 2 waves | phenomenon | CUT — two points |
| Pew "more concerned than excited" about AI in daily life | annual 2021–2026, CSV | phenomenon | CUT — sentiment about AI in daily life, not employment; the longest identically-worded AI item found and worth a home elsewhere on the site |
| Census BTOS AI supplements (2024, 2026) | two waves, wording changed | phenomenon | STUDY-ONLY |
| St. Louis Fed RPS | see lane 1 | | SHIP (lane 1) |
| NY Fed SCE supplemental AI questions (Nov 2025) | one wave | | STUDY-ONLY |
| McKinsey State of AI; Slack Workforce Index; Microsoft Work Trend Index; Conference Board; SHRM | global samples, changing wording, member-only reports, no US per-wave data | | CUT — rules 1, 2, 5, 7 |
| Census Annual Business Survey technology module | 2018 value only obtainable (3.2%) | | CUT — not a series |
| University of Michigan Surveys of Consumers AI mentions | no published series | | not found |

## Lane 3 — studies and institutional trackers

See the README § What the studies say; none produced a maintained downloadable series that passed rule 8, so none is a data row. (Lane 3 dispositions appended below when its report landed.)

| Candidate | Publisher | Class | Disposition |
|---|---|---|---|
| Stanford Digital Economy Lab "Canaries in the Coal Mine" AI Economic Indicators — employment index by age band × AI-exposure quintile (ADP panel, Nov 2022 = 100) | authors' public bucket, monthly zip, vintage column; from Aug 2021 | outcome | **SHIP** under rule 8: `canariesYoungExposed` (ages 22–25, quintile 5) and `canariesMidCareerExposed` (ages 35–40, quintile 5) — the authors' own comparison. Fails the 2019 baseline (starts Aug 2021), disclosed in the note; ADP panel ≠ national workforce, disclosed |
| Yale Budget Lab occupational-churn dissimilarity index (CPS, 12-month rolling baseline) | GitHub repo data file, monthly, updated per CPS release | outcome | **SHIP** under rule 8: `yaleOccupationalChurn` (all sectors, rolling variant, from Jan 2022). The by-industry file back to 2005 is a re-probe candidate for a longer baseline |
| Yale indexed-baseline and era-comparison variants (Computers 1984 / Internet 1996 / Control 2016 / AI 2022) | same repo | — | STUDY-ONLY (chart conveniences; quoted) |
| Real-Time Population Survey `All_Results.xlsx` (with standard errors) | genaiadoptiontracker.com | phenomenon | shipped via FRED in lane 1 (`genAiAdoptionWork`); the workbook is the citation for standard errors |
| NY Fed regional AI supplemental (3 annual waves, xlsx) | NY Fed | phenomenon | STUDY-ONLY — regional (NY–NJ), quoted |
| Dallas Fed TBOS AI use (4 waves; xlsx for the last two only; wording of the employment item changed) | Dallas Fed | phenomenon | STUDY-ONLY — Texas only; rule 2 on the employment item |
| Anthropic Economic Index (six releases; augmentation/automation share, task and occupation shares, per-capita usage index) | Hugging Face dataset | phenomenon | STUDY-ONLY — rule 6: classifier, taxonomy, platform scope, and denominator changed between releases; no cadence commitment. Conditional re-probe of the monthly V6 file after a third month |
| Anthropic `job_exposure.csv` (Mar 2026), OpenAI `occ_level.csv` (2023 scores), BLS AI-exposure categories (Aug 2026), MIT Iceberg, Brookings adaptive-capacity, EIG | one-shot exposure keys | — | STUDY-ONLY — none is re-published on a schedule (rule 8) |
| Hosseini & Lichtinger, "Generative AI as Seniority-Biased Technological Change" (Revelio résumé data) | SSRN | — | STUDY-ONLY — licensed data, no series; quoted |
| Hui, Reshef & Zhou, Upwork freelancers after ChatGPT (Organization Science 2024) | one-time API pull | — | STUDY-ONLY — quoted |
| St. Louis Fed Ozkan & Sullivan (unemployment by occupational exposure, 2025); "How You Ask Matters" (2026) | posts | — | STUDY-ONLY — the second names the BTOS wording break used in this dataset |
| NY Fed "Do Job Postings Show Early Labor-Market Effects of AI?" (May 2026); Board FEDS Notes (Mar, Apr, Jul 2026); Dallas Fed Economics (Jan, Feb, Sep 2026); Chicago Fed WP 2026-12; Atlanta SBU and CFO Survey AI blocks; SHED 2025 AI item | Fed system | — | STUDY-ONLY — quoted side by side in the README; SHED becomes a candidate if the item repeats in 2026 |
| Fed Monetary Policy Report (Jul 2026), Powell / Barr / Cook / Waller remarks | Fed | — | STUDY-ONLY — no Fed-own quantified US effect exists |
| BLS Employment Projections 2025–35 and AI-exposure categories; CBO; CEA Economic Report 2026; IMF; ILO | official | — | STUDY-ONLY — no official body publishes a quantified US AI employment effect (CBO pages returned 403 to every route) |
| Goldman Sachs (2023 exposure count; 2026 displacement scenarios; AI Adoption Tracker); Oxford Economics; Burning Glass Institute; Brookings; NBER papers (Humlum & Vestergaard — Denmark; Acemoglu; Autor & Thompson; Hampole et al.; Hartley et al.; Baslandze et al.; Yotzov et al.; Chen et al.) | — | — | STUDY-ONLY — quoted where they bear on the US question; none publishes an updated series |
