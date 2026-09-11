# Sources — US Crime and Justice

Generated from index.json and series/*.json by docs.ts. sources.json contains cached-file URLs, read dates, and SHA-256 hashes. Builds parse only the local snapshot; fetched is the build timestamp, not a claim of a new network download.

## Aggravated assault (`aggravatedAssaultRate`)

- Source: FBI, Crime Data Explorer (UCR/NIBRS summarized national estimates)
- URL: <https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/crime-trend>
- Historical editions: <https://api.usa.gov/crime/fbi/cde/summarized/national/aggravated-assault>
- Coverage: 2000–2024; 25 points
- Unit: reported offenses per 100,000 population; class: reported
- Annual rule: annual (sum of twelve monthly actual counts / December population × 100,000)
- Method: Sum all twelve monthly offenses.actuals[United States Offenses] counts for each calendar year, divide by that year's December populations.participated_population[United States] (the population covered by reporting agencies, the FBI's own denominator: the twelve monthly offenses.rates values sum to this figure within rounding), then multiply by 100,000; round to one decimal. Drop incomplete years; never sum monthly rates.
- Breaks: 2021 SRS→NIBRS-only transition changed agency participation and estimation. The 2013 federal rape/sexual-assault definition change is not a direct definition change for this non-rape offense. FBI’s 2013 Rape Addendum describes changes to rape, sodomy and sexual assault with an object, not these offense definitions: https://ucr.fbi.gov/crime-in-the-u.s/2013/crime-in-the-u.s.-2013/rape-addendum.
- Note: The monthly rates field is the FBI’s own monthly per-100,000 figure and is not summed here. Payload horizon and population coverage are recorded when built. Only complete calendar years are included. Agency coverage of the U.S. population ranged 74.1–98.4% across 2000–2024 (74.1–79.1% during the 2021 NIBRS transition); the monthly coverage map is kept in work/coverage-aggravatedAssaultRate.json. Data horizon: 08/2026.
- Source read: 2026-09-10; build timestamp: 2026-09-11T21:49:18.364Z

## Burglary (`burglaryRate`)

- Source: FBI, Crime Data Explorer (UCR/NIBRS summarized national estimates)
- URL: <https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/crime-trend>
- Historical editions: <https://api.usa.gov/crime/fbi/cde/summarized/national/burglary>
- Coverage: 2000–2024; 25 points
- Unit: reported offenses per 100,000 population; class: reported
- Annual rule: annual (sum of twelve monthly actual counts / December population × 100,000)
- Method: Sum all twelve monthly offenses.actuals[United States Offenses] counts for each calendar year, divide by that year's December populations.participated_population[United States] (the population covered by reporting agencies, the FBI's own denominator: the twelve monthly offenses.rates values sum to this figure within rounding), then multiply by 100,000; round to one decimal. Drop incomplete years; never sum monthly rates.
- Breaks: 2021 SRS→NIBRS-only transition changed agency participation and estimation. The 2013 federal rape/sexual-assault definition change is not a direct definition change for this non-rape offense. FBI’s 2013 Rape Addendum describes changes to rape, sodomy and sexual assault with an object, not these offense definitions: https://ucr.fbi.gov/crime-in-the-u.s/2013/crime-in-the-u.s.-2013/rape-addendum.
- Note: The monthly rates field is the FBI’s own monthly per-100,000 figure and is not summed here. Payload horizon and population coverage are recorded when built. Only complete calendar years are included. Agency coverage of the U.S. population ranged 74.1–98.4% across 2000–2024 (74.1–79.1% during the 2021 NIBRS transition); the monthly coverage map is kept in work/coverage-burglaryRate.json. Data horizon: 08/2026.
- Source read: 2026-09-10; build timestamp: 2026-09-11T21:49:18.364Z

## Adults under correctional supervision (`correctionalSupervisionRate`)

- Source: Bureau of Justice Statistics, Correctional Populations in the United States
- URL: <https://bjs.ojp.gov/document/cpus23st.zip>
- Historical editions: <https://bjs.ojp.gov/library/publications/list?series_filter=Correctional%20Populations%20in%20the%20United%20States>
- Coverage: 2003–2023; 21 points
- Unit: persons under adult correctional supervision per 100,000 adult U.S. residents; class: response
- Annual rule: annual (publisher)
- Method: cpus23stat01.csv Year and Total under supervision; use this single current-vintage history because the 2022 edition has revised overlap values.
- Breaks: 2022-2023: probation reporting methods and coverage changed for some agencies, and the 2022 probation population uses a January 1, 2023 proxy for the December 31, 2022 count; BJS states these two years are not directly comparable to earlier years for total-correctional and community-supervision rates.
- Note: Total persons supervised by adult correctional systems (probation, parole, prison, or local jail) per 100,000 adult U.S. residents, from Correctional Populations in the United States, 2023 - Statistical Tables (NCJ 310413), Appendix table 1. Rates are rounded by the publisher to the nearest 10. BJS states 2022 and 2023 total-correctional and community-supervision rates are not directly comparable to earlier years because of expanded probation-agency reporting and a January-1 proxy used for the 2022 probation count. Only the current 2003–2023 vintage is shipped. The 2022 edition's 2021=2090 and 2022=2060 disagree with the 2023 edition's 2100 for both, so its 2002 extension is rejected rather than accepting a conflicting stitch. Both supposed 2021 ZIP files are login HTML, not statistical tables.
- Source read: 2026-09-10; build timestamp: 2026-09-11T08:29:13.821Z

## Persons under sentence of death (`deathRowPopulation`)

- Source: Bureau of Justice Statistics, Capital Punishment in the United States
- URL: <https://bjs.ojp.gov/document/cp23st.zip>
- Historical editions: Same source
- Coverage: 1953–2023; 71 points
- Unit: persons; class: response
- Annual rule: annual (publisher)
- Method: cp23stat01.csv Year, Number of prisoners under sentence of death.
- Breaks: none known beyond states individually abolishing or reinstating capital punishment over the period, which is a real substantive change, not a measurement break.
- Note: Year-end count of persons under sentence of death in the United States, from Capital Punishment, 2023 - Statistical Tables (NCJ 310309), table cp23stat01.
- Source read: 2026-09-10; build timestamp: 2026-09-11T08:29:13.821Z

## Executions (`executions`)

- Source: Bureau of Justice Statistics, Capital Punishment in the United States
- URL: <https://bjs.ojp.gov/document/cp23st.zip>
- Historical editions: Same source
- Coverage: 1930–2023; 94 points
- Unit: executions; class: response
- Annual rule: annual (publisher)
- Method: cp23stat04.csv Year, Executions.
- Breaks: none known beyond states individually abolishing or reinstating capital punishment over the period, which is a real substantive change, not a measurement break.
- Note: Annual number of persons executed under civil authority in the United States, from Capital Punishment, 2023 - Statistical Tables (NCJ 310309), table cp23stat04. Excludes 160 military executions from 1930 to 1961.
- Source read: 2026-09-10; build timestamp: 2026-09-11T08:29:13.821Z

## Federal offenders sentenced (`federalOffendersSentenced`)

- Source: United States Sentencing Commission, Sourcebook of Federal Sentencing Statistics
- URL: <https://www.ussc.gov/research/sourcebook-2025>
- Historical editions: <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2002> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2003> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2004> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2005> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2006> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2007> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2008> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2009> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2010> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2011> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2012> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2013> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2014> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2015> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2016> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2017> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2018> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2019> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2020> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2021> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2022> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2023> · <https://www.ussc.gov/research/sourcebook/archive/sourcebook-2024>
- Coverage: 2002–2025; 24 points
- Unit: felony and Class A misdemeanor cases with an individual sentenced; class: response
- Annual rule: annual (fiscal year, publisher)
- Method: Each FY2002–2024 Sourcebook page plus ussc.html (FY2025): Commission received/contains documentation on count of individual sentencing cases; each page supplies only its own fiscal year.
- Breaks: Booker (2005) changed mandatory guideline practice; 2018 Sourcebook changed variables and presentation. Counts are individual sentencing events documented to USSC, not unique people; annual documentation deadlines may differ.
- Note: Number of federal felony and Class A misdemeanor cases in which an individual was sentenced in the fiscal year, read from each year's own Sourcebook of Federal Sentencing Statistics overview page (the Commission's own headline count of cases it received documentation on for that fiscal year).
- Source read: 2026-09-10; build timestamp: 2026-09-11T08:29:13.821Z

## Federal prison population (`federalPrisonPopulation`)

- Source: Federal Bureau of Prisons, Past Population Totals
- URL: <https://www.bop.gov/about/statistics/raw_stats/BOP_pastPopulationTotals.csv>
- Historical editions: Same source
- Coverage: 1980–2025; 46 points
- Unit: persons in Bureau of Prisons custody; class: response
- Annual rule: annual (fiscal year, publisher)
- Method: BOP CSV: locate numeric FY rows after BOM/blank and FY headers; Total Population column. Key is fiscal year.
- Breaks: none known.
- Note: Federal Bureau of Prisons total population at fiscal year end, directly from BOP's own published historical totals file.
- Source read: 2026-09-10; build timestamp: 2026-09-11T08:29:13.821Z

## Fraud reports (`fraudReports`)

- Source: Federal Trade Commission, Consumer Sentinel Network Data Book 2024
- URL: <https://www.ftc.gov/system/files/ftc_gov/data/csn-data-book-2024-csv.zip>
- Historical editions: Same source
- Coverage: 2001–2024; 24 points
- Unit: reports; class: online
- Annual rule: annual (publisher)
- Method: 2024_CSN_Number_of_Reports_by_Type.csv: Year, Fraud; not the combined Report_Count table.
- Breaks: Contributing organizations, public awareness, and classifications change over time. National Do Not Call Registry complaints excluded; reporting volume is not underlying crime incidence.
- Note: Annual report count by type, 2001–2024, from 2024_CSN_Number_of_Reports_by_Type.csv. Not unique victims or a population incidence rate. Multiple report types can apply; category totals need not equal the unduplicated combined count.
- Source read: 2026-09-10; build timestamp: 2026-09-11T08:29:13.821Z

## Afraid to walk alone at night (`gallupAfraidToWalk`)

- Source: Gallup, Crime
- URL: <https://news.gallup.com/poll/1603/crime.aspx>
- Historical editions: Same source
- Coverage: 1965–2025; 41 points
- Unit: percent of adults who say they would be afraid to walk alone at night within a mile of their home; class: believed
- Annual rule: annual (publisher)
- Method: Gallup Crime > Walk Alone Table: Yes column. Newest-first dated table: last poll in each year; no averaging or interpolation.
- Breaks: Irregular polling years and dates; survey mode and question-order effects may affect comparisons. The cached table does not document a specific phone-to-web transition date; none is invented.
- Note: What people believe: Gallup poll asking whether the respondent would be afraid to walk alone at night within a mile of their home. Value is percent saying yes. Last dated poll in each calendar year; older observations are not all October. What people believe, not measured crime incidence. The cached trend page does not establish a dated mode transition for these specific items.
- Source read: 2026-09-10; build timestamp: 2026-09-11T08:29:13.821Z

## Perceived national crime trend: more than a year ago (`gallupMoreCrime`)

- Source: Gallup, Crime
- URL: <https://news.gallup.com/poll/1603/crime.aspx>
- Historical editions: Same source
- Coverage: 1989–2025; 32 points
- Unit: percent of adults who say there is more crime in the U.S. than a year ago; class: believed
- Annual rule: annual (publisher)
- Method: Gallup Crime > More Crime US Table: More column. Newest-first dated table: last poll in each year; no averaging or interpolation.
- Breaks: Irregular polling years and dates; survey mode and question-order effects may affect comparisons. The cached table does not document a specific phone-to-web transition date; none is invented.
- Note: What people believe: Gallup poll asking, "Is there more crime in the U.S. than there was a year ago, or less?" Value is the percent saying more. Last dated poll in each calendar year; older observations are not all October. What people believe, not measured crime incidence. The cached trend page does not establish a dated mode transition for these specific items.
- Source read: 2026-09-10; build timestamp: 2026-09-11T08:29:13.821Z

## Courts not harsh enough on criminals (GSS) (`gssCourtsNotHarsh`)

- Source: Computed from NORC General Social Survey cumulative public microdata, 1972–2024
- URL: <https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip>
- Historical editions: Same source
- Coverage: 1972–2024; 34 points
- Unit: percent of adults who say local courts do not deal harshly enough with criminals; class: believed
- Annual rule: annual (publisher)
- Method: COURTS: embedded label 2=not harshly enough; valid 1,2,3; 100 × sum(WTSSPS for target) / sum(WTSSPS for valid responses), one decimal; weighted denominator >=200. Missing/nonpositive weights and invalid responses excluded.
- Breaks: 2021 pandemic push-to-web collection; 2022/2024 mixed-mode compared with earlier in-person surveys. Ballot rotation and skipped survey years cause gaps; interpret cross-mode changes cautiously.
- Note: What people believe: GSS variable COURTS, "In general, do you think the courts in this area deal too harshly or not harshly enough with criminals?" Value is the weighted percent answering not harshly enough (code 2 in this file's value labels), weight WTSSPS. The build dispatch for this dataset stated code 1 for this response; the .dta file's own embedded value labels were read directly and show 1=too harshly, 2=not harshly enough, 3=about right, so code 2 is used here and that correction is recorded for the record. Years with fewer than 200 weighted responses are dropped. Share is weighted target / weighted valid responses ×100, rounded to one decimal; missing responses excluded. 2021 pandemic push-to-web collection; 2022/2024 mixed-mode compared with earlier in-person surveys. Ballot rotation and skipped survey years cause gaps; interpret cross-mode changes cautiously.
- Source read: 2026-09-10; build timestamp: 2026-09-11T08:29:13.821Z

## Favor the death penalty for murder (GSS) (`gssFavorDeathPenalty`)

- Source: Computed from NORC General Social Survey cumulative public microdata, 1972–2024
- URL: <https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip>
- Historical editions: Same source
- Coverage: 1974–2024; 33 points
- Unit: percent of adults who say they favor the death penalty for persons convicted of murder; class: believed
- Annual rule: annual (publisher)
- Method: CAPPUN: embedded label 1=favor; valid 1,2; 100 × sum(WTSSPS for target) / sum(WTSSPS for valid responses), one decimal; weighted denominator >=200. Missing/nonpositive weights and invalid responses excluded.
- Breaks: 2021 pandemic push-to-web collection; 2022/2024 mixed-mode compared with earlier in-person surveys. Ballot rotation and skipped survey years cause gaps; interpret cross-mode changes cautiously.
- Note: What people believe: GSS variable CAPPUN, "Do you favor or oppose the death penalty for persons convicted of murder?" Value is the weighted percent answering favor (code 1), weight WTSSPS. Years with fewer than 200 weighted responses are dropped. Share is weighted target / weighted valid responses ×100, rounded to one decimal; missing responses excluded. 2021 pandemic push-to-web collection; 2022/2024 mixed-mode compared with earlier in-person surveys. Ballot rotation and skipped survey years cause gaps; interpret cross-mode changes cautiously.
- Source read: 2026-09-10; build timestamp: 2026-09-11T08:29:13.821Z

## Afraid to walk alone at night (GSS) (`gssFearWalking`)

- Source: Computed from NORC General Social Survey cumulative public microdata, 1972–2024
- URL: <https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip>
- Historical editions: Same source
- Coverage: 1973–2024; 30 points
- Unit: percent of adults who say they are afraid to walk alone at night in their neighborhood; class: believed
- Annual rule: annual (publisher)
- Method: FEAR: embedded label 1=yes; valid 1,2; 100 × sum(WTSSPS for target) / sum(WTSSPS for valid responses), one decimal; weighted denominator >=200. Missing/nonpositive weights and invalid responses excluded.
- Breaks: 2021 pandemic push-to-web collection; 2022/2024 mixed-mode compared with earlier in-person surveys. Ballot rotation and skipped survey years cause gaps; interpret cross-mode changes cautiously.
- Note: What people believe: GSS variable FEAR, "Is there any area right around here -- that is, within a mile -- where you would be afraid to walk alone at night?" Value is the weighted percent answering yes (code 1), weight WTSSPS. Years with fewer than 200 weighted responses are dropped. Share is weighted target / weighted valid responses ×100, rounded to one decimal; missing responses excluded. 2021 pandemic push-to-web collection; 2022/2024 mixed-mode compared with earlier in-person surveys. Ballot rotation and skipped survey years cause gaps; interpret cross-mode changes cautiously.
- Source read: 2026-09-10; build timestamp: 2026-09-11T08:29:13.821Z

## Gun in the home (GSS) (`gssGunInHome`)

- Source: Computed from NORC General Social Survey cumulative public microdata, 1972–2024
- URL: <https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip>
- Historical editions: Same source
- Coverage: 1973–2024; 30 points
- Unit: percent of adults who say they have a gun in their home; class: believed
- Annual rule: annual (publisher)
- Method: OWNGUN: embedded label 1=yes; valid 1,2; 100 × sum(WTSSPS for target) / sum(WTSSPS for valid responses), one decimal; weighted denominator >=200. Missing/nonpositive weights and invalid responses excluded.
- Breaks: 2021 pandemic push-to-web collection; 2022/2024 mixed-mode compared with earlier in-person surveys. Ballot rotation and skipped survey years cause gaps; interpret cross-mode changes cautiously.
- Note: What people believe: GSS variable OWNGUN, "Do you have a gun in your home?" (self-reported). Value is the weighted percent answering yes (code 1), weight WTSSPS. Years with fewer than 200 weighted responses are dropped. Share is weighted target / weighted valid responses ×100, rounded to one decimal; missing responses excluded. 2021 pandemic push-to-web collection; 2022/2024 mixed-mode compared with earlier in-person surveys. Ballot rotation and skipped survey years cause gaps; interpret cross-mode changes cautiously. Embedded OWNGUN code 3 is refused, excluded from the denominator; only codes 1/2 are valid.
- Source read: 2026-09-10; build timestamp: 2026-09-11T08:29:13.821Z

## Internet crime complaints (IC3) (`ic3Complaints`)

- Source: FBI Internet Crime Complaint Center (IC3), Annual Report
- URL: <https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf>
- Historical editions: <https://www.ic3.gov/AnnualReport/Reports/2011_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2012_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2013_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2014_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2015_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2016_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2017_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2018_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2019_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2020_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2021_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2022_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2023_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf>
- Coverage: 2011–2025; 15 points
- Unit: complaints; class: online
- Annual rule: annual (calendar year, publisher)
- Method: Each 2011–2025 edition's own annual count; 2015 national totals row. Later 2021–2023 five-year chart overlaps asserted equal. Earlier milestone charts excluded after conflicting retrospective counts were found.
- Breaks: Voluntary IC3 reporting and awareness change over time; totals are not population incidence. Older reports call losses adjusted (large claimed losses reviewed); later reports use reported/potential losses, with a 2016-era definition/presentation seam. Nominal dollars, not inflation adjusted. Edition-specific rounding varies.
- Note: Each 2011–2025 annual report supplies its own national total; 2015 uses the national totals row. No interpolation. Later 2021–2023 chart overlaps are asserted equal, losses at the chart's 0.1-billion precision. Earlier retrospective charts conflict (2001=50,412 in 2011 versus 49,711 in 2025; 2004 differs between 2011/2013; 2012 losses differ in 2012/2013; 2016 losses differ in 2016/2019). These rejected historical extensions are documented in work/mismatches.md. The supposed 2010 PDF is HTML and pdftotext exits 1. Coverage is 2011–2025, not the draft's claimed milestones.
- Source read: 2026-09-10; build timestamp: 2026-09-11T08:29:13.821Z

## Internet crime losses (IC3) (`ic3Losses`)

- Source: FBI Internet Crime Complaint Center (IC3), Annual Report
- URL: <https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf>
- Historical editions: <https://www.ic3.gov/AnnualReport/Reports/2011_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2012_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2013_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2014_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2015_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2016_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2017_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2018_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2019_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2020_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2021_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2022_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2023_IC3Report.pdf> · <https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf>
- Coverage: 2011–2025; 15 points
- Unit: $ billions reported lost; class: online
- Annual rule: annual (calendar year, publisher)
- Method: Own-edition annual loss totals: 2011 overview millions; 2012–2015 dollar totals; 2016–2018 summary panels; 2019 overview; 2020 summary; 2021 overview; 2022 chart; 2023 overview; 2024–2025 headline. Convert dollars/millions to billions without adding precision. 2021–2023 chart overlaps asserted equal at chart precision (0.1 billion).
- Breaks: Voluntary IC3 reporting and awareness change over time; totals are not population incidence. Older reports call losses adjusted (large claimed losses reviewed); later reports use reported/potential losses, with a 2016-era definition/presentation seam. Nominal dollars, not inflation adjusted. Edition-specific rounding varies.
- Note: Each 2011–2025 annual report supplies its own national total; 2015 uses the national totals row. No interpolation. Later 2021–2023 chart overlaps are asserted equal, losses at the chart's 0.1-billion precision. Earlier retrospective charts conflict (2001=50,412 in 2011 versus 49,711 in 2025; 2004 differs between 2011/2013; 2012 losses differ in 2012/2013; 2016 losses differ in 2016/2019). These rejected historical extensions are documented in work/mismatches.md. The supposed 2010 PDF is HTML and pdftotext exits 1. Coverage is 2011–2025, not the draft's claimed milestones. 2015 national totals row is $1,070,711,522; the age table differs and is not substituted. 2016/2017/2018 panels publish $1.33/$1.42/$2.71 billion. 2020 summary publishes $4.2 billion and 2022 chart $10.3 billion, more specific than overview lower-bound wording. 2025 headline is $20.877 billion, rather than rounding to the brief's $20.9 billion.
- Source read: 2026-09-10; build timestamp: 2026-09-11T08:29:13.821Z

## Identity theft reports (`identityTheftReports`)

- Source: Federal Trade Commission, Consumer Sentinel Network Data Book 2024
- URL: <https://www.ftc.gov/system/files/ftc_gov/data/csn-data-book-2024-csv.zip>
- Historical editions: Same source
- Coverage: 2001–2024; 24 points
- Unit: reports; class: online
- Annual rule: annual (publisher)
- Method: 2024_CSN_Number_of_Reports_by_Type.csv: Year, Identity Theft.
- Breaks: Contributing organizations, public awareness, and classifications change over time. National Do Not Call Registry complaints excluded; reporting volume is not underlying crime incidence.
- Note: Annual report count by type, 2001–2024, from 2024_CSN_Number_of_Reports_by_Type.csv. Not unique victims or a population incidence rate. Multiple report types can apply; category totals need not equal the unduplicated combined count.
- Source read: 2026-09-10; build timestamp: 2026-09-11T08:29:13.821Z

## Jail incarceration rate (`jailRate`)

- Source: Bureau of Justice Statistics, Annual Survey of Jails / Census of Jails
- URL: <https://bjs.ojp.gov/document/ji23st.zip>
- Historical editions: <https://bjs.ojp.gov/document/ji22st.zip>
- Coverage: 2012–2023; 12 points
- Unit: persons held in local jail per 100,000 U.S. residents; class: response
- Annual rule: annual (publisher)
- Method: ji22stt01.csv column 8 and ji23stt01.csv column 7; 2013–2022 overlap asserted equal.
- Breaks: 2019 Census of Jails (complete enumeration) replaces the sample-based Annual Survey of Jails for that year only; 2020-2021 COVID-era population decline is a real population shift, not a methodology break.
- Note: Midyear persons held in local jail per 100,000 U.S. residents. Exception: 12 annual points, 2012–2023, the recoverable rate history in this cache. ji22st Table 1 adds 2012=237 to ji23st Table 1; all 2013–2022 overlapping rates match exactly. Cached ji17st–ji21st ZIP paths are BJS Page not found HTML; unzip exits 9. Thus the prior 11-point exception was too narrow. 2019 Census of Jails is a complete enumeration; 2020–2021 declines reflect pandemic-era population changes.
- Source read: 2026-09-10; build timestamp: 2026-09-11T08:29:13.821Z

## Motor vehicle theft (`motorVehicleTheftRate`)

- Source: FBI, Crime Data Explorer (UCR/NIBRS summarized national estimates)
- URL: <https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/crime-trend>
- Historical editions: <https://api.usa.gov/crime/fbi/cde/summarized/national/motor-vehicle-theft>
- Coverage: 2000–2024; 25 points
- Unit: reported offenses per 100,000 population; class: reported
- Annual rule: annual (sum of twelve monthly actual counts / December population × 100,000)
- Method: Sum all twelve monthly offenses.actuals[United States Offenses] counts for each calendar year, divide by that year's December populations.participated_population[United States] (the population covered by reporting agencies, the FBI's own denominator: the twelve monthly offenses.rates values sum to this figure within rounding), then multiply by 100,000; round to one decimal. Drop incomplete years; never sum monthly rates.
- Breaks: 2021 SRS→NIBRS-only transition changed agency participation and estimation. The 2013 federal rape/sexual-assault definition change is not a direct definition change for this non-rape offense. FBI’s 2013 Rape Addendum describes changes to rape, sodomy and sexual assault with an object, not these offense definitions: https://ucr.fbi.gov/crime-in-the-u.s/2013/crime-in-the-u.s.-2013/rape-addendum.
- Note: The monthly rates field is the FBI’s own monthly per-100,000 figure and is not summed here. Payload horizon and population coverage are recorded when built. Only complete calendar years are included. Agency coverage of the U.S. population ranged 74.1–98.4% across 2000–2024 (74.1–79.1% during the 2021 NIBRS transition); the monthly coverage map is kept in work/coverage-motorVehicleTheftRate.json. Data horizon: 08/2026.
- Source read: 2026-09-10; build timestamp: 2026-09-11T21:49:18.364Z

## Property victimization (NCVS) (`ncvsPropertyRate`)

- Source: Bureau of Justice Statistics, National Crime Victimization Survey
- URL: <https://bjs.ojp.gov/document/cv24.zip>
- Historical editions: <https://bjs.ojp.gov/document/cv13.zip> · <https://bjs.ojp.gov/document/cv22.zip> · <https://bjs.ojp.gov/document/cv23.zip>
- Coverage: 1993–2024; 28 points
- Unit: victimizations per 1,000 households; class: experienced
- Annual rule: annual (publisher)
- Method: cv13f01.csv property column; cv22/cv23/cv24 Table 2 total property rate columns. Every overlapping year must match exactly; disjoint 1993–2013 and 2018–2024 blocks retain a four-year gap.
- Breaks: Disjoint edition blocks 1993–2013 and 2018–2024; 2014–2017 absent. 2006 not comparable; 2016 sample redesign; 2017 methodology change; 2024 split-sample design. Burglary/trespassing terminology changed; total property measure retained.
- Note: Property victimizations per 1,000 households. cv13 Figure 1 supplies 1993–2013; cv22/cv23/cv24 Table 2 supplies 2018–2024, with every overlapping year asserted equal. The two disjoint blocks have no overlap and retain the 2014–2017 gap. Cached cv14–cv21 ZIP paths contain BJS error HTML, not usable tables; this is a cache-recovery gap, not evidence the publisher never released the data. The 2006 value (169) is retained as published in cv13 but is not comparable to other years.
- Source read: 2026-09-10; build timestamp: 2026-09-11T08:29:13.821Z

## Violent victimizations reported to police (share) (`ncvsReportedShare`)

- Source: Computed from Bureau of Justice Statistics, NCVS, Criminal Victimization 2024 Appendix table 1
- URL: <https://bjs.ojp.gov/document/cv24.zip>
- Historical editions: <https://bjs.ojp.gov/library/publications/list?series_filter=Criminal%20Victimization>
- Coverage: 1993–2024; 31 points
- Unit: percent of violent victimizations reported to police; class: experienced
- Annual rule: annual (publisher)
- Method: cv24at01.csv: 100 × reported rate (column 7) / total rate (column 1), rounded to 0.1 percentage point; rounded input rates differ from directly published percentages.
- Breaks: Computed from the two Figure 1 series in Criminal Victimization, 2024 (NCJ 310547); inherits both series' methodology breaks. 2006 NCVS estimates are not comparable to other years (BJS data-collection change); 2016 sample redesign and a 2017 methodology change; 2024 used a split-sample design testing new methods. Self-report survey, not police-reported.
- Note: What is reported: the share of NCVS violent victimizations that victims say were reported to police, computed from the Criminal Victimization, 2024 bulletin's Figure 1 as (rate reported to police) / (total violent victimization rate) x 100. Computed from BJS's own two published rates in the same table, not independently estimated. 2006 NCVS estimates are not comparable to other years (BJS data-collection change); 2016 sample redesign and a 2017 methodology change; 2024 used a split-sample design testing new methods. Self-report survey, not police-reported. The actual CSV is cv24at01.csv (estimates for Figure 1). Rounded input rates yield 2024=48.1% and 2023=44.9%, differing from the directly published shares 47.9% and 44.7%; this series implements the specified rate ratio. 2006 is omitted because this table publishes --.
- Source read: 2026-09-10; build timestamp: 2026-09-11T08:29:13.821Z

## Violent victimization (NCVS) (`ncvsViolentRate`)

- Source: Bureau of Justice Statistics, National Crime Victimization Survey
- URL: <https://bjs.ojp.gov/document/cv24.zip>
- Historical editions: <https://bjs.ojp.gov/library/publications/list?series_filter=Criminal%20Victimization>
- Coverage: 1993–2024; 31 points
- Unit: victimizations per 1,000 persons age 12 or older; class: experienced
- Annual rule: annual (publisher)
- Method: cv24at01.csv: Year and total violent Rate (column 1); 2006 is publisher -- and omitted.
- Breaks: 2006 NCVS estimates are not comparable to other years (BJS data-collection change); 2016 sample redesign and a 2017 methodology change; 2024 used a split-sample design testing new methods. Self-report survey, not police-reported.
- Note: Rate of violent victimization (rape/sexual assault, robbery, aggravated assault, simple assault) from the BJS National Crime Victimization Survey, a self-report survey of a nationally representative household sample; does not require the crime to have been reported to police. 2006 NCVS estimates are not comparable to other years (BJS data-collection change); 2016 sample redesign and a 2017 methodology change; 2024 used a split-sample design testing new methods. Self-report survey, not police-reported. Actual source: cv24at01.csv, Appendix table 1 estimates for Figure 1. 2006 is -- and omitted.
- Source read: 2026-09-10; build timestamp: 2026-09-11T08:29:13.821Z

## Robbery (`robberyRate`)

- Source: FBI, Crime Data Explorer (UCR/NIBRS summarized national estimates)
- URL: <https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/crime-trend>
- Historical editions: <https://api.usa.gov/crime/fbi/cde/summarized/national/robbery>
- Coverage: 2000–2024; 25 points
- Unit: reported offenses per 100,000 population; class: reported
- Annual rule: annual (sum of twelve monthly actual counts / December population × 100,000)
- Method: Sum all twelve monthly offenses.actuals[United States Offenses] counts for each calendar year, divide by that year's December populations.participated_population[United States] (the population covered by reporting agencies, the FBI's own denominator: the twelve monthly offenses.rates values sum to this figure within rounding), then multiply by 100,000; round to one decimal. Drop incomplete years; never sum monthly rates.
- Breaks: 2021 SRS→NIBRS-only transition changed agency participation and estimation. The 2013 federal rape/sexual-assault definition change is not a direct definition change for this non-rape offense. FBI’s 2013 Rape Addendum describes changes to rape, sodomy and sexual assault with an object, not these offense definitions: https://ucr.fbi.gov/crime-in-the-u.s/2013/crime-in-the-u.s.-2013/rape-addendum.
- Note: The monthly rates field is the FBI’s own monthly per-100,000 figure and is not summed here. Payload horizon and population coverage are recorded when built. Only complete calendar years are included. Agency coverage of the U.S. population ranged 74.1–98.4% across 2000–2024 (74.1–79.1% during the 2021 NIBRS transition); the monthly coverage map is kept in work/coverage-robberyRate.json. Data horizon: 08/2026.
- Source read: 2026-09-10; build timestamp: 2026-09-11T21:49:18.364Z

## Deferred evidence


