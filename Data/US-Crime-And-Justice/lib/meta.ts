export type SeriesMeta = { name: string; unit: string; source: string; sourceUrl: string; historicalSourceUrls?: string[]; note: string; goodDirection: "up" | "down" | "neutral"; cadence: "annual"; annualRule: string; class: "reported" | "experienced" | "believed" | "response" | "online"; breaks: string };
export const META: Record<string, SeriesMeta> = {
  "motorVehicleTheftRate": {
    "name": "Motor vehicle theft",
    "unit": "reported offenses per 100,000 people covered by reporting agencies",
    "source": "FBI, Crime Data Explorer (UCR/NIBRS summarized national estimates)",
    "sourceUrl": "https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/crime-trend",
    "historicalSourceUrls": [
      "https://api.usa.gov/crime/fbi/cde/summarized/national/motor-vehicle-theft"
    ],
    "goodDirection": "down",
    "cadence": "annual",
    "annualRule": "annual (sum of twelve monthly actual counts / December population × 100,000)",
    "class": "reported",
    "note": "The monthly rates field is the FBI’s own monthly per-100,000 figure and is not summed here. Payload horizon and population coverage are recorded when built. Only complete calendar years are included.",
    "breaks": "2021 SRS→NIBRS-only transition changed agency participation and estimation. The 2013 federal rape/sexual-assault definition change is not a direct definition change for this non-rape offense. FBI’s 2013 Rape Addendum describes changes to rape, sodomy and sexual assault with an object, not these offense definitions: https://ucr.fbi.gov/crime-in-the-u.s/2013/crime-in-the-u.s.-2013/rape-addendum."
  },
  "burglaryRate": {
    "name": "Burglary",
    "unit": "reported offenses per 100,000 people covered by reporting agencies",
    "source": "FBI, Crime Data Explorer (UCR/NIBRS summarized national estimates)",
    "sourceUrl": "https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/crime-trend",
    "historicalSourceUrls": [
      "https://api.usa.gov/crime/fbi/cde/summarized/national/burglary"
    ],
    "goodDirection": "down",
    "cadence": "annual",
    "annualRule": "annual (sum of twelve monthly actual counts / December population × 100,000)",
    "class": "reported",
    "note": "The monthly rates field is the FBI’s own monthly per-100,000 figure and is not summed here. Payload horizon and population coverage are recorded when built. Only complete calendar years are included.",
    "breaks": "2021 SRS→NIBRS-only transition changed agency participation and estimation. The 2013 federal rape/sexual-assault definition change is not a direct definition change for this non-rape offense. FBI’s 2013 Rape Addendum describes changes to rape, sodomy and sexual assault with an object, not these offense definitions: https://ucr.fbi.gov/crime-in-the-u.s/2013/crime-in-the-u.s.-2013/rape-addendum."
  },
  "robberyRate": {
    "name": "Robbery",
    "unit": "reported offenses per 100,000 people covered by reporting agencies",
    "source": "FBI, Crime Data Explorer (UCR/NIBRS summarized national estimates)",
    "sourceUrl": "https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/crime-trend",
    "historicalSourceUrls": [
      "https://api.usa.gov/crime/fbi/cde/summarized/national/robbery"
    ],
    "goodDirection": "down",
    "cadence": "annual",
    "annualRule": "annual (sum of twelve monthly actual counts / December population × 100,000)",
    "class": "reported",
    "note": "The monthly rates field is the FBI’s own monthly per-100,000 figure and is not summed here. Payload horizon and population coverage are recorded when built. Only complete calendar years are included.",
    "breaks": "2021 SRS→NIBRS-only transition changed agency participation and estimation. The 2013 federal rape/sexual-assault definition change is not a direct definition change for this non-rape offense. FBI’s 2013 Rape Addendum describes changes to rape, sodomy and sexual assault with an object, not these offense definitions: https://ucr.fbi.gov/crime-in-the-u.s/2013/crime-in-the-u.s.-2013/rape-addendum."
  },
  "aggravatedAssaultRate": {
    "name": "Aggravated assault",
    "unit": "reported offenses per 100,000 people covered by reporting agencies",
    "source": "FBI, Crime Data Explorer (UCR/NIBRS summarized national estimates)",
    "sourceUrl": "https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/crime-trend",
    "historicalSourceUrls": [
      "https://api.usa.gov/crime/fbi/cde/summarized/national/aggravated-assault"
    ],
    "goodDirection": "down",
    "cadence": "annual",
    "annualRule": "annual (sum of twelve monthly actual counts / December population × 100,000)",
    "class": "reported",
    "note": "The monthly rates field is the FBI’s own monthly per-100,000 figure and is not summed here. Payload horizon and population coverage are recorded when built. Only complete calendar years are included.",
    "breaks": "2021 SRS→NIBRS-only transition changed agency participation and estimation. The 2013 federal rape/sexual-assault definition change is not a direct definition change for this non-rape offense. FBI’s 2013 Rape Addendum describes changes to rape, sodomy and sexual assault with an object, not these offense definitions: https://ucr.fbi.gov/crime-in-the-u.s/2013/crime-in-the-u.s.-2013/rape-addendum."
  },
  "ncvsViolentRate": {
    "unit": "victimizations per 1,000 persons age 12 or older",
    "source": "Bureau of Justice Statistics, National Crime Victimization Survey",
    "sourceUrl": "https://bjs.ojp.gov/document/cv24.zip",
    "historicalSourceUrls": [
      "https://bjs.ojp.gov/library/publications/list?series_filter=Criminal%20Victimization"
    ],
    "goodDirection": "down",
    "cadence": "annual",
    "annualRule": "annual (publisher)",
    "class": "experienced",
    "name": "Violent victimization (NCVS)",
    "note": "Rate of violent victimization (rape/sexual assault, robbery, aggravated assault, simple assault) from the BJS National Crime Victimization Survey, a self-report survey of a nationally representative household sample; does not require the crime to have been reported to police. 2006 NCVS estimates are not comparable to other years (BJS data-collection change); 2016 sample redesign and a 2017 methodology change; 2024 used a split-sample design testing new methods. Self-report survey, not police-reported. Actual source: cv24at01.csv, Appendix table 1 estimates for Figure 1. 2006 is -- and omitted.",
    "breaks": "2006 NCVS estimates are not comparable to other years (BJS data-collection change); 2016 sample redesign and a 2017 methodology change; 2024 used a split-sample design testing new methods. Self-report survey, not police-reported."
  },
  "ncvsPropertyRate": {
    "unit": "victimizations per 1,000 households",
    "source": "Bureau of Justice Statistics, National Crime Victimization Survey",
    "sourceUrl": "https://bjs.ojp.gov/document/cv24.zip",
    "historicalSourceUrls": [
      "https://bjs.ojp.gov/document/cv13.zip",
      "https://bjs.ojp.gov/document/cv22.zip",
      "https://bjs.ojp.gov/document/cv23.zip"
    ],
    "goodDirection": "down",
    "cadence": "annual",
    "annualRule": "annual (publisher)",
    "class": "experienced",
    "name": "Property victimization (NCVS)",
    "note": "Property victimizations per 1,000 households. cv13 Figure 1 supplies 1993–2013; cv22/cv23/cv24 Table 2 supplies 2018–2024, with every overlapping year asserted equal. The two disjoint blocks have no overlap and retain the 2014–2017 gap. Cached cv14–cv21 ZIP paths contain BJS error HTML, not usable tables; this is a cache-recovery gap, not evidence the publisher never released the data. The 2006 value (169) is retained as published in cv13 but is not comparable to other years.",
    "breaks": "Disjoint edition blocks 1993–2013 and 2018–2024; 2014–2017 absent. 2006 not comparable; 2016 sample redesign; 2017 methodology change; 2024 split-sample design. Burglary/trespassing terminology changed; total property measure retained."
  },
  "ncvsReportedShare": {
    "unit": "percent of violent victimizations reported to police",
    "source": "Computed from Bureau of Justice Statistics, NCVS, Criminal Victimization 2024 Appendix table 1",
    "sourceUrl": "https://bjs.ojp.gov/document/cv24.zip",
    "historicalSourceUrls": [
      "https://bjs.ojp.gov/library/publications/list?series_filter=Criminal%20Victimization"
    ],
    "goodDirection": "up",
    "cadence": "annual",
    "annualRule": "annual (publisher)",
    "class": "experienced",
    "name": "Violent victimizations reported to police (share)",
    "note": "What is reported: the share of NCVS violent victimizations that victims say were reported to police, computed from the Criminal Victimization, 2024 bulletin's Figure 1 as (rate reported to police) / (total violent victimization rate) x 100. Computed from BJS's own two published rates in the same table, not independently estimated. 2006 NCVS estimates are not comparable to other years (BJS data-collection change); 2016 sample redesign and a 2017 methodology change; 2024 used a split-sample design testing new methods. Self-report survey, not police-reported. The actual CSV is cv24at01.csv (estimates for Figure 1). Rounded input rates yield 2024=48.1% and 2023=44.9%, differing from the directly published shares 47.9% and 44.7%; this series implements the specified rate ratio. 2006 is omitted because this table publishes --.",
    "breaks": "Computed from the two Figure 1 series in Criminal Victimization, 2024 (NCJ 310547); inherits both series' methodology breaks. 2006 NCVS estimates are not comparable to other years (BJS data-collection change); 2016 sample redesign and a 2017 methodology change; 2024 used a split-sample design testing new methods. Self-report survey, not police-reported."
  },
  "jailRate": {
    "unit": "persons held in local jail per 100,000 U.S. residents",
    "goodDirection": "neutral",
    "cadence": "annual",
    "annualRule": "annual (publisher)",
    "class": "response",
    "name": "Jail incarceration rate",
    "source": "Bureau of Justice Statistics, Annual Survey of Jails / Census of Jails",
    "sourceUrl": "https://bjs.ojp.gov/document/ji23st.zip",
    "historicalSourceUrls": [
      "https://bjs.ojp.gov/document/ji22st.zip"
    ],
    "note": "Midyear persons held in local jail per 100,000 U.S. residents. Exception: 12 annual points, 2012–2023, the recoverable rate history in this cache. ji22st Table 1 adds 2012=237 to ji23st Table 1; all 2013–2022 overlapping rates match exactly. Cached ji17st–ji21st ZIP paths are BJS Page not found HTML; unzip exits 9. Thus the prior 11-point exception was too narrow. 2019 Census of Jails is a complete enumeration; 2020–2021 declines reflect pandemic-era population changes.",
    "breaks": "2019 Census of Jails (complete enumeration) replaces the sample-based Annual Survey of Jails for that year only; 2020-2021 COVID-era population decline is a real population shift, not a methodology break."
  },
  "correctionalSupervisionRate": {
    "unit": "persons under adult correctional supervision per 100,000 adult U.S. residents",
    "goodDirection": "neutral",
    "cadence": "annual",
    "annualRule": "annual (publisher)",
    "class": "response",
    "name": "Adults under correctional supervision",
    "source": "Bureau of Justice Statistics, Correctional Populations in the United States",
    "sourceUrl": "https://bjs.ojp.gov/document/cpus23st.zip",
    "historicalSourceUrls": [
      "https://bjs.ojp.gov/library/publications/list?series_filter=Correctional%20Populations%20in%20the%20United%20States"
    ],
    "note": "Total persons supervised by adult correctional systems (probation, parole, prison, or local jail) per 100,000 adult U.S. residents, from Correctional Populations in the United States, 2023 - Statistical Tables (NCJ 310413), Appendix table 1. Rates are rounded by the publisher to the nearest 10. BJS states 2022 and 2023 total-correctional and community-supervision rates are not directly comparable to earlier years because of expanded probation-agency reporting and a January-1 proxy used for the 2022 probation count. Only the current 2003–2023 vintage is shipped. The 2022 edition's 2021=2090 and 2022=2060 disagree with the 2023 edition's 2100 for both, so its 2002 extension is rejected rather than accepting a conflicting stitch. Both supposed 2021 ZIP files are login HTML, not statistical tables.",
    "breaks": "2022-2023: probation reporting methods and coverage changed for some agencies, and the 2022 probation population uses a January 1, 2023 proxy for the December 31, 2022 count; BJS states these two years are not directly comparable to earlier years for total-correctional and community-supervision rates."
  },
  "executions": {
    "unit": "executions",
    "goodDirection": "neutral",
    "cadence": "annual",
    "annualRule": "annual (publisher)",
    "class": "response",
    "name": "Executions",
    "source": "Bureau of Justice Statistics, Capital Punishment in the United States",
    "sourceUrl": "https://bjs.ojp.gov/document/cp23st.zip",
    "note": "Annual number of persons executed under civil authority in the United States, from Capital Punishment, 2023 - Statistical Tables (NCJ 310309), table cp23stat04. Excludes 160 military executions from 1930 to 1961.",
    "breaks": "none known beyond states individually abolishing or reinstating capital punishment over the period, which is a real substantive change, not a measurement break."
  },
  "deathRowPopulation": {
    "unit": "persons",
    "goodDirection": "neutral",
    "cadence": "annual",
    "annualRule": "annual (publisher)",
    "class": "response",
    "name": "Persons under sentence of death",
    "source": "Bureau of Justice Statistics, Capital Punishment in the United States",
    "sourceUrl": "https://bjs.ojp.gov/document/cp23st.zip",
    "note": "Year-end count of persons under sentence of death in the United States, from Capital Punishment, 2023 - Statistical Tables (NCJ 310309), table cp23stat01.",
    "breaks": "none known beyond states individually abolishing or reinstating capital punishment over the period, which is a real substantive change, not a measurement break."
  },
  "federalPrisonPopulation": {
    "unit": "persons in Bureau of Prisons custody",
    "goodDirection": "neutral",
    "cadence": "annual",
    "annualRule": "annual (fiscal year, publisher)",
    "class": "response",
    "name": "Federal prison population",
    "source": "Federal Bureau of Prisons, Past Population Totals",
    "sourceUrl": "https://www.bop.gov/about/statistics/raw_stats/BOP_pastPopulationTotals.csv",
    "note": "Federal Bureau of Prisons total population at fiscal year end, directly from BOP's own published historical totals file.",
    "breaks": "none known."
  },
  "federalOffendersSentenced": {
    "unit": "felony and Class A misdemeanor cases with an individual sentenced",
    "goodDirection": "neutral",
    "cadence": "annual",
    "annualRule": "annual (fiscal year, publisher)",
    "class": "response",
    "name": "Federal offenders sentenced",
    "source": "United States Sentencing Commission, Sourcebook of Federal Sentencing Statistics",
    "sourceUrl": "https://www.ussc.gov/research/sourcebook-2025",
    "historicalSourceUrls": [
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2002",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2003",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2004",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2005",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2006",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2007",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2008",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2009",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2010",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2011",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2012",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2013",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2014",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2015",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2016",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2017",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2018",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2019",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2020",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2021",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2022",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2023",
      "https://www.ussc.gov/research/sourcebook/archive/sourcebook-2024"
    ],
    "note": "Number of federal felony and Class A misdemeanor cases in which an individual was sentenced in the fiscal year, read from each year's own Sourcebook of Federal Sentencing Statistics overview page (the Commission's own headline count of cases it received documentation on for that fiscal year).",
    "breaks": "Booker (2005) changed mandatory guideline practice; 2018 Sourcebook changed variables and presentation. Counts are individual sentencing events documented to USSC, not unique people; annual documentation deadlines may differ."
  },
  "gallupMoreCrime": {
    "goodDirection": "neutral",
    "cadence": "annual",
    "annualRule": "annual (publisher)",
    "class": "believed",
    "name": "Perceived national crime trend: more than a year ago",
    "unit": "percent of adults who say there is more crime in the U.S. than a year ago",
    "source": "Gallup, Crime",
    "sourceUrl": "https://news.gallup.com/poll/1603/crime.aspx",
    "note": "What people believe: Gallup poll asking, \"Is there more crime in the U.S. than there was a year ago, or less?\" Value is the percent saying more. Last dated poll in each calendar year; older observations are not all October. What people believe, not measured crime incidence. The cached trend page does not establish a dated mode transition for these specific items.",
    "breaks": "Irregular polling years and dates; survey mode and question-order effects may affect comparisons. The cached table does not document a specific phone-to-web transition date; none is invented."
  },
  "gallupAfraidToWalk": {
    "goodDirection": "neutral",
    "cadence": "annual",
    "annualRule": "annual (publisher)",
    "class": "believed",
    "name": "Afraid to walk alone at night",
    "unit": "percent of adults who say they would be afraid to walk alone at night within a mile of their home",
    "source": "Gallup, Crime",
    "sourceUrl": "https://news.gallup.com/poll/1603/crime.aspx",
    "note": "What people believe: Gallup poll asking whether the respondent would be afraid to walk alone at night within a mile of their home. Value is percent saying yes. Last dated poll in each calendar year; older observations are not all October. What people believe, not measured crime incidence. The cached trend page does not establish a dated mode transition for these specific items.",
    "breaks": "Irregular polling years and dates; survey mode and question-order effects may affect comparisons. The cached table does not document a specific phone-to-web transition date; none is invented."
  },
  "gssFearWalking": {
    "goodDirection": "neutral",
    "cadence": "annual",
    "annualRule": "annual (publisher)",
    "class": "believed",
    "name": "Afraid to walk alone at night (GSS)",
    "unit": "percent of adults who say they are afraid to walk alone at night in their neighborhood",
    "source": "Computed from NORC General Social Survey cumulative public microdata, 1972–2024",
    "sourceUrl": "https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip",
    "note": "What people believe: GSS variable FEAR, \"Is there any area right around here -- that is, within a mile -- where you would be afraid to walk alone at night?\" Value is the weighted percent answering yes (code 1), weight WTSSPS. Years with fewer than 200 weighted responses are dropped. Share is weighted target / weighted valid responses ×100, rounded to one decimal; missing responses excluded. 2021 pandemic push-to-web collection; 2022/2024 mixed-mode compared with earlier in-person surveys. Ballot rotation and skipped survey years cause gaps; interpret cross-mode changes cautiously.",
    "breaks": "2021 pandemic push-to-web collection; 2022/2024 mixed-mode compared with earlier in-person surveys. Ballot rotation and skipped survey years cause gaps; interpret cross-mode changes cautiously."
  },
  "gssFavorDeathPenalty": {
    "goodDirection": "neutral",
    "cadence": "annual",
    "annualRule": "annual (publisher)",
    "class": "believed",
    "name": "Favor the death penalty for murder (GSS)",
    "unit": "percent of adults who say they favor the death penalty for persons convicted of murder",
    "source": "Computed from NORC General Social Survey cumulative public microdata, 1972–2024",
    "sourceUrl": "https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip",
    "note": "What people believe: GSS variable CAPPUN, \"Do you favor or oppose the death penalty for persons convicted of murder?\" Value is the weighted percent answering favor (code 1), weight WTSSPS. Years with fewer than 200 weighted responses are dropped. Share is weighted target / weighted valid responses ×100, rounded to one decimal; missing responses excluded. 2021 pandemic push-to-web collection; 2022/2024 mixed-mode compared with earlier in-person surveys. Ballot rotation and skipped survey years cause gaps; interpret cross-mode changes cautiously.",
    "breaks": "2021 pandemic push-to-web collection; 2022/2024 mixed-mode compared with earlier in-person surveys. Ballot rotation and skipped survey years cause gaps; interpret cross-mode changes cautiously."
  },
  "gssCourtsNotHarsh": {
    "goodDirection": "neutral",
    "cadence": "annual",
    "annualRule": "annual (publisher)",
    "class": "believed",
    "name": "Courts not harsh enough on criminals (GSS)",
    "unit": "percent of adults who say local courts do not deal harshly enough with criminals",
    "source": "Computed from NORC General Social Survey cumulative public microdata, 1972–2024",
    "sourceUrl": "https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip",
    "note": "What people believe: GSS variable COURTS, \"In general, do you think the courts in this area deal too harshly or not harshly enough with criminals?\" Value is the weighted percent answering not harshly enough (code 2 in this file's value labels), weight WTSSPS. The build dispatch for this dataset stated code 1 for this response; the .dta file's own embedded value labels were read directly and show 1=too harshly, 2=not harshly enough, 3=about right, so code 2 is used here and that correction is recorded for the record. Years with fewer than 200 weighted responses are dropped. Share is weighted target / weighted valid responses ×100, rounded to one decimal; missing responses excluded. 2021 pandemic push-to-web collection; 2022/2024 mixed-mode compared with earlier in-person surveys. Ballot rotation and skipped survey years cause gaps; interpret cross-mode changes cautiously.",
    "breaks": "2021 pandemic push-to-web collection; 2022/2024 mixed-mode compared with earlier in-person surveys. Ballot rotation and skipped survey years cause gaps; interpret cross-mode changes cautiously."
  },
  "gssGunInHome": {
    "goodDirection": "neutral",
    "cadence": "annual",
    "annualRule": "annual (publisher)",
    "class": "believed",
    "name": "Gun in the home (GSS)",
    "unit": "percent of adults who say they have a gun in their home",
    "source": "Computed from NORC General Social Survey cumulative public microdata, 1972–2024",
    "sourceUrl": "https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip",
    "note": "What people believe: GSS variable OWNGUN, \"Do you have a gun in your home?\" (self-reported). Value is the weighted percent answering yes (code 1), weight WTSSPS. Years with fewer than 200 weighted responses are dropped. Share is weighted target / weighted valid responses ×100, rounded to one decimal; missing responses excluded. 2021 pandemic push-to-web collection; 2022/2024 mixed-mode compared with earlier in-person surveys. Ballot rotation and skipped survey years cause gaps; interpret cross-mode changes cautiously. Embedded OWNGUN code 3 is refused, excluded from the denominator; only codes 1/2 are valid.",
    "breaks": "2021 pandemic push-to-web collection; 2022/2024 mixed-mode compared with earlier in-person surveys. Ballot rotation and skipped survey years cause gaps; interpret cross-mode changes cautiously."
  },
  "ic3Complaints": {
    "name": "Internet crime complaints (IC3)",
    "unit": "complaints",
    "source": "FBI Internet Crime Complaint Center (IC3), Annual Report",
    "sourceUrl": "https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf",
    "historicalSourceUrls": [
      "https://www.ic3.gov/AnnualReport/Reports/2011_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2012_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2013_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2014_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2015_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2016_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2017_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2018_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2019_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2020_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2021_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2022_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2023_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf"
    ],
    "goodDirection": "neutral",
    "cadence": "annual",
    "annualRule": "annual (calendar year, publisher)",
    "class": "online",
    "note": "Each 2011–2025 annual report supplies its own national total; 2015 uses the national totals row. No interpolation. Later 2021–2023 chart overlaps are asserted equal, losses at the chart's 0.1-billion precision. Earlier retrospective charts conflict (2001=50,412 in 2011 versus 49,711 in 2025; 2004 differs between 2011/2013; 2012 losses differ in 2012/2013; 2016 losses differ in 2016/2019). These rejected historical extensions are documented in work/mismatches.md. The supposed 2010 PDF is HTML and pdftotext exits 1. Coverage is 2011–2025, not the draft's claimed milestones.",
    "breaks": "Voluntary IC3 reporting and awareness change over time; totals are not population incidence. Older reports call losses adjusted (large claimed losses reviewed); later reports use reported/potential losses, with a 2016-era definition/presentation seam. Nominal dollars, not inflation adjusted. Edition-specific rounding varies."
  },
  "ic3Losses": {
    "name": "Internet crime losses (IC3)",
    "unit": "$ billions reported lost",
    "source": "FBI Internet Crime Complaint Center (IC3), Annual Report",
    "sourceUrl": "https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf",
    "historicalSourceUrls": [
      "https://www.ic3.gov/AnnualReport/Reports/2011_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2012_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2013_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2014_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2015_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2016_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2017_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2018_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2019_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2020_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2021_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2022_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2023_IC3Report.pdf",
      "https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf"
    ],
    "goodDirection": "down",
    "cadence": "annual",
    "annualRule": "annual (calendar year, publisher)",
    "class": "online",
    "note": "Each 2011–2025 annual report supplies its own national total; 2015 uses the national totals row. No interpolation. Later 2021–2023 chart overlaps are asserted equal, losses at the chart's 0.1-billion precision. Earlier retrospective charts conflict (2001=50,412 in 2011 versus 49,711 in 2025; 2004 differs between 2011/2013; 2012 losses differ in 2012/2013; 2016 losses differ in 2016/2019). These rejected historical extensions are documented in work/mismatches.md. The supposed 2010 PDF is HTML and pdftotext exits 1. Coverage is 2011–2025, not the draft's claimed milestones. 2015 national totals row is $1,070,711,522; the age table differs and is not substituted. 2016/2017/2018 panels publish $1.33/$1.42/$2.71 billion. 2020 summary publishes $4.2 billion and 2022 chart $10.3 billion, more specific than overview lower-bound wording. 2025 headline is $20.877 billion, rather than rounding to the brief's $20.9 billion.",
    "breaks": "Voluntary IC3 reporting and awareness change over time; totals are not population incidence. Older reports call losses adjusted (large claimed losses reviewed); later reports use reported/potential losses, with a 2016-era definition/presentation seam. Nominal dollars, not inflation adjusted. Edition-specific rounding varies."
  },
  "fraudReports": {
    "name": "Fraud reports",
    "unit": "reports",
    "source": "Federal Trade Commission, Consumer Sentinel Network Data Book 2024",
    "sourceUrl": "https://www.ftc.gov/system/files/ftc_gov/data/csn-data-book-2024-csv.zip",
    "goodDirection": "neutral",
    "cadence": "annual",
    "annualRule": "annual (publisher)",
    "class": "online",
    "note": "Annual report count by type, 2001–2024, from 2024_CSN_Number_of_Reports_by_Type.csv. Not unique victims or a population incidence rate. Multiple report types can apply; category totals need not equal the unduplicated combined count.",
    "breaks": "Contributing organizations, public awareness, and classifications change over time. National Do Not Call Registry complaints excluded; reporting volume is not underlying crime incidence."
  },
  "identityTheftReports": {
    "name": "Identity theft reports",
    "unit": "reports",
    "source": "Federal Trade Commission, Consumer Sentinel Network Data Book 2024",
    "sourceUrl": "https://www.ftc.gov/system/files/ftc_gov/data/csn-data-book-2024-csv.zip",
    "goodDirection": "neutral",
    "cadence": "annual",
    "annualRule": "annual (publisher)",
    "class": "online",
    "note": "Annual report count by type, 2001–2024, from 2024_CSN_Number_of_Reports_by_Type.csv. Not unique victims or a population incidence rate. Multiple report types can apply; category totals need not equal the unduplicated combined count.",
    "breaks": "Contributing organizations, public awareness, and classifications change over time. National Do Not Call Registry complaints excluded; reporting volume is not underlying crime incidence."
  }
};
export const KEYS = Object.keys(META);
