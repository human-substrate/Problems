export type Cadence = "annual";
export type AnnualRule = "annual (publisher)" | "annual (sum of monthly, publisher)" | "annual (fiscal year, publisher)" | "annual (calendar year, publisher)";
export type SeriesClass = "reported" | "experienced" | "believed" | "response" | "online";
export type SeriesMeta = {
  name: string; unit: string; source: string; sourceUrl: string; historicalSourceUrls?: string[]; note: string;
  goodDirection: "up" | "down" | "neutral";
  cadence: Cadence; annualRule: AnnualRule; class: SeriesClass; breaks: string;
};

const NCVS_BULLETIN = "https://bjs.ojp.gov/library/publications/list?series_filter=Criminal%20Victimization";
const NCVS_2024_ZIP = "https://bjs.ojp.gov/document/cv24.zip";
const experienced = { unit: "victimizations per 1,000 persons or households", source: "Bureau of Justice Statistics, National Crime Victimization Survey", sourceUrl: NCVS_2024_ZIP, historicalSourceUrls: [NCVS_BULLETIN], goodDirection: "down", cadence: "annual", annualRule: "annual (publisher)", class: "experienced" } as const;
const NCVS_BREAK = "2006 NCVS estimates are not comparable to other years (BJS data-collection change); 2016 sample redesign and a 2017 methodology change; 2024 used a split-sample design testing new methods. Self-report survey, not police-reported.";

const response = { unit: "per 100,000 residents or adults", goodDirection: "neutral", cadence: "annual", annualRule: "annual (publisher)", class: "response" } as const;
const believed = { goodDirection: "neutral", cadence: "annual", annualRule: "annual (publisher)", class: "believed" } as const;

export const META: Record<string, SeriesMeta> = {
  // ---- reported (FBI UCR/NIBRS via Crime Data Explorer) ----
  motorVehicleTheftRate: {
    name: "Motor vehicle theft", unit: "reported offenses per 100,000 population", source: "FBI, Crime Data Explorer (UCR/NIBRS summarized national estimates)",
    sourceUrl: "https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/crime-trend", historicalSourceUrls: ["https://api.usa.gov/crime/fbi/cde/summarized/national/motor-vehicle-theft"],
    goodDirection: "down", cadence: "annual", annualRule: "annual (sum of monthly, publisher)", class: "reported",
    note: "Annual rate is the sum of the 12 monthly national offense rates the Crime Data Explorer publishes for the year (computed from the CDE summarized/national monthly series). 2021 NIBRS transition: FBI moved to NIBRS-only collection, and agency participation/coverage changed materially, so 2021 onward is not strictly comparable to the SRS-era years before it.",
    breaks: "2021 national transition from Summary Reporting System (SRS) to NIBRS-only collection changed agency participation and estimation method.",
  },
  burglaryRate: {
    name: "Burglary", unit: "reported offenses per 100,000 population", source: "FBI, Crime Data Explorer (UCR/NIBRS summarized national estimates)",
    sourceUrl: "https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/crime-trend", historicalSourceUrls: ["https://api.usa.gov/crime/fbi/cde/summarized/national/burglary"],
    goodDirection: "down", cadence: "annual", annualRule: "annual (sum of monthly, publisher)", class: "reported",
    note: "Annual rate is the sum of the 12 monthly national offense rates the Crime Data Explorer publishes for the year (computed from the CDE summarized/national monthly series).",
    breaks: "2021 national transition from Summary Reporting System (SRS) to NIBRS-only collection changed agency participation and estimation method.",
  },
  robberyRate: {
    name: "Robbery", unit: "reported offenses per 100,000 population", source: "FBI, Crime Data Explorer (UCR/NIBRS summarized national estimates)",
    sourceUrl: "https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/crime-trend", historicalSourceUrls: ["https://api.usa.gov/crime/fbi/cde/summarized/national/robbery"],
    goodDirection: "down", cadence: "annual", annualRule: "annual (sum of monthly, publisher)", class: "reported",
    note: "Annual rate is the sum of the 12 monthly national offense rates the Crime Data Explorer publishes for the year (computed from the CDE summarized/national monthly series).",
    breaks: "2021 national transition from Summary Reporting System (SRS) to NIBRS-only collection changed agency participation and estimation method.",
  },
  aggravatedAssaultRate: {
    name: "Aggravated assault", unit: "reported offenses per 100,000 population", source: "FBI, Crime Data Explorer (UCR/NIBRS summarized national estimates)",
    sourceUrl: "https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/crime-trend", historicalSourceUrls: ["https://api.usa.gov/crime/fbi/cde/summarized/national/aggravated-assault"],
    goodDirection: "down", cadence: "annual", annualRule: "annual (sum of monthly, publisher)", class: "reported",
    note: "Annual rate is the sum of the 12 monthly national offense rates the Crime Data Explorer publishes for the year (computed from the CDE summarized/national monthly series). The 2013 federal rape/sexual-assault definition change does not apply to this offense category.",
    breaks: "2021 national transition from Summary Reporting System (SRS) to NIBRS-only collection changed agency participation and estimation method.",
  },
  hateCrimeIncidents: {
    name: "Hate crime incidents reported to police", unit: "incidents", source: "FBI, Crime Data Explorer (Hate Crime Statistics)",
    sourceUrl: "https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/hate-crime", historicalSourceUrls: ["https://api.usa.gov/crime/fbi/cde/hate-crime/national"],
    goodDirection: "neutral", cadence: "annual", annualRule: "annual (publisher)", class: "reported",
    note: "Annual count of hate-crime incidents reported by participating law-enforcement agencies to the FBI. Reported values reflect law-enforcement agency participation, which is voluntary and has grown over time, so a rise can reflect more reporting agencies rather than more incidents. 2021 NIBRS transition changed the reporting pipeline.",
    breaks: "2021 national transition from Summary Reporting System (SRS) to NIBRS-only collection; participating-agency count has grown over the series, inflating apparent growth independent of true incident counts.",
  },
  violentClearanceRate: {
    name: "Violent crime clearance rate", unit: "percent of reported violent offenses cleared by arrest or exceptional means", source: "FBI, Crime Data Explorer (UCR/NIBRS summarized national estimates)",
    sourceUrl: "https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/crime-trend", historicalSourceUrls: ["https://api.usa.gov/crime/fbi/cde/summarized/national/violent-crime"],
    goodDirection: "up", cadence: "annual", annualRule: "annual (publisher)", class: "reported",
    note: "Percent of reported violent crimes cleared by arrest or exceptional means, as published by the Crime Data Explorer summarized/national violent-crime endpoint. 2021 NIBRS transition changed agency participation and estimation method.",
    breaks: "2021 national transition from Summary Reporting System (SRS) to NIBRS-only collection changed agency participation and estimation method.",
  },

  // ---- experienced (BJS NCVS) ----
  ncvsViolentRate: {
    ...experienced, name: "Violent victimization (NCVS)", unit: "victimizations per 1,000 persons age 12 or older",
    note: `Rate of violent victimization (rape/sexual assault, robbery, aggravated assault, simple assault) from the BJS National Crime Victimization Survey, a self-report survey of a nationally representative household sample; does not require the crime to have been reported to police. ${NCVS_BREAK}`,
    breaks: NCVS_BREAK,
  },
  ncvsPropertyRate: {
    ...experienced, name: "Property victimization (NCVS)", unit: "victimizations per 1,000 households",
    note: `Rate of total property victimization (burglary/trespassing, motor vehicle theft, other theft) from the BJS National Crime Victimization Survey. Stitched from the Criminal Victimization, 2013 bulletin's Figure 1 (1993-2013) and the 2022/2024 bulletins' Table 2 (2018-2024); overlap years 2020-2022 across the 2022 and 2024 editions match exactly. 2014-2017 are a genuine gap: no bulletin in that window published a machine-readable multi-year property-rate table alongside the violent-rate figure. ${NCVS_BREAK}`,
    breaks: `Edition stitch: Criminal Victimization 2013 (NCJ 247648) Figure 1 for 1993-2013, Criminal Victimization 2022 (NCJ 307089) Table 2 for 2018-2019, and Criminal Victimization 2024 (NCJ 310547) Table 2 for 2020-2024; 2014-2017 are not published in a comparable machine-readable table and are left absent. ${NCVS_BREAK}`,
  },
  ncvsReportedShare: {
    ...experienced, name: "Violent victimizations reported to police (share)", unit: "percent of violent victimizations reported to police", goodDirection: "up",
    source: "Computed from Bureau of Justice Statistics, National Crime Victimization Survey (Criminal Victimization, 2024, Figure 1)",
    note: `What is reported: the share of NCVS violent victimizations that victims say were reported to police, computed from the Criminal Victimization, 2024 bulletin's Figure 1 as (rate reported to police) / (total violent victimization rate) x 100. Computed from BJS's own two published rates in the same table, not independently estimated. ${NCVS_BREAK}`,
    breaks: `Computed from the two Figure 1 series in Criminal Victimization, 2024 (NCJ 310547); inherits both series' methodology breaks. ${NCVS_BREAK}`,
  },

  // ---- response (BJS corrections + capital punishment) ----
  jailRate: {
    ...response, name: "Jail incarceration rate", unit: "persons held in local jail per 100,000 U.S. residents",
    source: "Bureau of Justice Statistics, Annual Survey of Jails / Census of Jails", sourceUrl: "https://bjs.ojp.gov/document/ji23st.zip",
    historicalSourceUrls: ["https://bjs.ojp.gov/library/publications/list?series_filter=Jail%20Inmates"],
    note: "Persons held in local jail at midyear per 100,000 U.S. residents, from BJS's Jail Inmates statistical tables (Jail Inmates in 2023, NCJ 309965, Table 1). This edition's own published rate table covers only 2013-2023 (11 points); BJS states jail population has a continuous time series back to 1980, but no single machine-readable table carrying a longer rate history was located within this build's source budget, so this series ships 11 points as a named exception to the 15-point minimum rather than guess at unpublished years. 2019 is a complete enumeration (Census of Jails) rather than a sample-based Annual Survey of Jails estimate; 2020-2021 reflect COVID-era jail population declines.",
    breaks: "2019 Census of Jails (complete enumeration) replaces the sample-based Annual Survey of Jails for that year only; 2020-2021 COVID-era population decline is a real population shift, not a methodology break.",
  },
  correctionalSupervisionRate: {
    ...response, name: "Adults under correctional supervision", unit: "persons under adult correctional supervision per 100,000 adult U.S. residents",
    source: "Bureau of Justice Statistics, Correctional Populations in the United States", sourceUrl: "https://bjs.ojp.gov/document/cpus23st.zip",
    historicalSourceUrls: ["https://bjs.ojp.gov/library/publications/list?series_filter=Correctional%20Populations%20in%20the%20United%20States"],
    note: "Total persons supervised by adult correctional systems (probation, parole, prison, or local jail) per 100,000 adult U.S. residents, from Correctional Populations in the United States, 2023 - Statistical Tables (NCJ 310413), Appendix table 1. Rates are rounded by the publisher to the nearest 10. BJS states 2022 and 2023 total-correctional and community-supervision rates are not directly comparable to earlier years because of expanded probation-agency reporting and a January-1 proxy used for the 2022 probation count.",
    breaks: "2022-2023: probation reporting methods and coverage changed for some agencies, and the 2022 probation population uses a January 1, 2023 proxy for the December 31, 2022 count; BJS states these two years are not directly comparable to earlier years for total-correctional and community-supervision rates.",
  },
  executions: {
    ...response, name: "Executions", unit: "executions", goodDirection: "neutral",
    source: "Bureau of Justice Statistics, Capital Punishment in the United States", sourceUrl: "https://bjs.ojp.gov/document/cp23st.zip",
    note: "Annual number of persons executed under civil authority in the United States, from Capital Punishment, 2023 - Statistical Tables (NCJ 311040), table cp23stat04.",
    breaks: "none known beyond states individually abolishing or reinstating capital punishment over the period, which is a real substantive change, not a measurement break.",
  },
  deathRowPopulation: {
    ...response, name: "Persons under sentence of death", unit: "persons", goodDirection: "neutral",
    source: "Bureau of Justice Statistics, Capital Punishment in the United States", sourceUrl: "https://bjs.ojp.gov/document/cp23st.zip",
    note: "Year-end count of persons under sentence of death in the United States, from Capital Punishment, 2023 - Statistical Tables (NCJ 311040), table cp23stat01.",
    breaks: "none known beyond states individually abolishing or reinstating capital punishment over the period, which is a real substantive change, not a measurement break.",
  },
  federalPrisonPopulation: {
    ...response, name: "Federal prison population", unit: "persons in Bureau of Prisons custody", goodDirection: "neutral",
    source: "Federal Bureau of Prisons, Past Population Totals", sourceUrl: "https://www.bop.gov/about/statistics/raw_stats/BOP_pastPopulationTotals.csv",
    note: "Federal Bureau of Prisons total population at fiscal year end, directly from BOP's own published historical totals file.",
    breaks: "none known.",
  },
  federalOffendersSentenced: {
    ...response, name: "Federal offenders sentenced", unit: "felony and Class A misdemeanor cases with an individual sentenced", goodDirection: "neutral",
    source: "United States Sentencing Commission, Sourcebook of Federal Sentencing Statistics", sourceUrl: "https://www.ussc.gov/research/sourcebook-2025",
    historicalSourceUrls: ["https://www.ussc.gov/research/sourcebook/archive"],
    note: "Number of federal felony and Class A misdemeanor cases in which an individual was sentenced in the fiscal year, read from each year's own Sourcebook of Federal Sentencing Statistics overview page (the Commission's own headline count of cases it received documentation on for that fiscal year).",
    breaks: "none known beyond ordinary year-to-year changes in federal charging and guideline practice.",
  },

  // ---- believed (Gallup + GSS) ----
  gallupMoreCrime: {
    ...believed, name: "Perceived national crime trend: more than a year ago", unit: "percent of adults who say there is more crime in the U.S. than a year ago",
    source: "Gallup, Crime", sourceUrl: "https://news.gallup.com/poll/1603/crime.aspx", class: "believed",
    note: "What people believe: annual October Gallup poll asking, \"Is there more crime in the U.S. than there was a year ago, or less?\" Value is the percent saying more. Telephone survey of roughly 1,000 U.S. adults.",
    breaks: "none known beyond ordinary survey-mode and question-order effects across editions.",
  },
  gallupAfraidToWalk: {
    ...believed, name: "Afraid to walk alone at night", unit: "percent of adults who say they would be afraid to walk alone at night within a mile of their home",
    source: "Gallup, Crime", sourceUrl: "https://news.gallup.com/poll/1603/crime.aspx", class: "believed",
    note: "What people believe: annual October Gallup poll asking whether the respondent would be afraid to walk alone at night within a mile of their home. Value is percent saying yes. Telephone survey of roughly 1,000 U.S. adults.",
    breaks: "none known beyond ordinary survey-mode and question-order effects across editions.",
  },
  gssFearWalking: {
    ...believed, name: "Afraid to walk alone at night (GSS)", unit: "percent of adults who say they are afraid to walk alone at night in their neighborhood",
    source: "NORC General Social Survey (cumulative file 1972-2024)", sourceUrl: "https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip", class: "believed",
    note: "What people believe: GSS variable FEAR, \"Is there any area right around here -- that is, within a mile -- where you would be afraid to walk alone at night?\" Value is the weighted percent answering yes (code 1), weight WTSSPS. Years with fewer than 200 weighted responses are dropped.",
    breaks: "none known beyond ordinary GSS mode and sampling changes across the cumulative file (see GSS's own methodological reports); administered in most but not all survey years.",
  },
  gssFavorDeathPenalty: {
    ...believed, name: "Favor the death penalty for murder (GSS)", unit: "percent of adults who say they favor the death penalty for persons convicted of murder",
    source: "NORC General Social Survey (cumulative file 1972-2024)", sourceUrl: "https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip", class: "believed",
    note: "What people believe: GSS variable CAPPUN, \"Do you favor or oppose the death penalty for persons convicted of murder?\" Value is the weighted percent answering favor (code 1), weight WTSSPS. Years with fewer than 200 weighted responses are dropped.",
    breaks: "none known beyond ordinary GSS mode and sampling changes across the cumulative file; administered in most but not all survey years.",
  },
  gssCourtsNotHarsh: {
    ...believed, name: "Courts not harsh enough on criminals (GSS)", unit: "percent of adults who say local courts do not deal harshly enough with criminals",
    source: "NORC General Social Survey (cumulative file 1972-2024)", sourceUrl: "https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip", class: "believed",
    note: "What people believe: GSS variable COURTS, \"In general, do you think the courts in this area deal too harshly or not harshly enough with criminals?\" Value is the weighted percent answering not harshly enough (code 2 in this file's value labels), weight WTSSPS. The build dispatch for this dataset stated code 1 for this response; the .dta file's own embedded value labels were read directly and show 1=too harshly, 2=not harshly enough, 3=about right, so code 2 is used here and that correction is recorded for the record. Years with fewer than 200 weighted responses are dropped.",
    breaks: "none known beyond ordinary GSS mode and sampling changes across the cumulative file; administered in most but not all survey years.",
  },
  gssGunInHome: {
    ...believed, name: "Gun in the home (GSS)", unit: "percent of adults who say they have a gun in their home", goodDirection: "neutral",
    source: "NORC General Social Survey (cumulative file 1972-2024)", sourceUrl: "https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip", class: "believed",
    note: "What people believe: GSS variable OWNGUN, \"Do you have a gun in your home?\" (self-reported). Value is the weighted percent answering yes (code 1), weight WTSSPS. Years with fewer than 200 weighted responses are dropped.",
    breaks: "none known beyond ordinary GSS mode and sampling changes across the cumulative file; administered in most but not all survey years.",
  },

  // ---- online (FTC + IC3) ----
  consumerSentinelReports: {
    name: "Consumer Sentinel fraud, identity theft, and other reports", unit: "reports", source: "Federal Trade Commission, Consumer Sentinel Network Data Book",
    sourceUrl: "https://www.ftc.gov/system/files/ftc_gov/data/csn-data-book-2024-csv.zip", goodDirection: "neutral", cadence: "annual", annualRule: "annual (publisher)", class: "online",
    note: "Total annual reports (fraud, identity theft, and other) to the FTC's Consumer Sentinel Network, from the 2024 Data Book's Report Count table. The Data Book's fraud/identity-theft/other split is published only for the most recent single year, not as a per-year time series, so this dataset ships the total series only rather than splitting a series that does not exist upstream as a time series.",
    breaks: "Reported figures exclude National Do Not Call Registry complaints. Reflects reporting volume, not underlying fraud incidence; participating-source count and public awareness of Consumer Sentinel have grown over the period.",
  },
  ic3Complaints: {
    name: "Internet crime complaints (IC3)", unit: "complaints", source: "FBI Internet Crime Complaint Center (IC3), Annual Report",
    sourceUrl: "https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf", historicalSourceUrls: ["https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf", "https://www.ic3.gov/AnnualReport/Reports/2023_IC3Report.pdf", "https://www.ic3.gov/AnnualReport/Reports/2022_IC3Report.pdf", "https://www.ic3.gov/AnnualReport/Reports/2021_IC3Report.pdf", "https://www.ic3.gov/AnnualReport/Reports/2019_IC3Report.pdf", "https://www.ic3.gov/AnnualReport/Reports/2014_IC3Report.pdf", "https://www.ic3.gov/AnnualReport/Reports/2013_IC3Report.pdf", "https://www.ic3.gov/AnnualReport/Reports/2012_IC3Report.pdf", "https://www.ic3.gov/AnnualReport/Reports/2011_IC3Report.pdf"],
    goodDirection: "neutral", cadence: "annual", annualRule: "annual (calendar year, publisher)", class: "online",
    note: "Annual number of complaints filed with the FBI's Internet Crime Complaint Center, stitched from each year's own headline figure across the 2011-2025 annual reports (each edition states its own year's total in its overview) plus the 2025 report's 25-year milestone chart for 2001, 2005, and 2010. Overlapping years across editions (2017-2020 appear in multiple reports) match exactly. 2002-2004, 2006-2009, and 2010's own single-year report were not recoverable within this build's source budget and are left absent rather than guessed.",
    breaks: "Edition stitch across 11 IC3 Annual Reports (2011-2025 editions) plus the 2025 report's own 25-year chart for 2001/2005/2010; reflects reporting volume to IC3, not underlying cybercrime incidence, and public/law-enforcement awareness of IC3 has grown substantially over the period.",
  },
  ic3Losses: {
    name: "Internet crime losses (IC3)", unit: "$ billions reported lost", source: "FBI Internet Crime Complaint Center (IC3), Annual Report",
    sourceUrl: "https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf", historicalSourceUrls: ["https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf", "https://www.ic3.gov/AnnualReport/Reports/2023_IC3Report.pdf", "https://www.ic3.gov/AnnualReport/Reports/2022_IC3Report.pdf", "https://www.ic3.gov/AnnualReport/Reports/2021_IC3Report.pdf", "https://www.ic3.gov/AnnualReport/Reports/2019_IC3Report.pdf", "https://www.ic3.gov/AnnualReport/Reports/2014_IC3Report.pdf", "https://www.ic3.gov/AnnualReport/Reports/2013_IC3Report.pdf", "https://www.ic3.gov/AnnualReport/Reports/2012_IC3Report.pdf", "https://www.ic3.gov/AnnualReport/Reports/2011_IC3Report.pdf"],
    goodDirection: "down", cadence: "annual", annualRule: "annual (calendar year, publisher)", class: "online",
    note: "Annual reported dollar losses from IC3 complaints in billions, stitched from each year's own headline figure across the 2011-2025 annual reports plus the 2025 report's 25-year milestone chart for 2001 and 2005. Overlapping years across editions (2017-2023 appear in multiple reports) match exactly. 2002-2004, 2006-2010 were not recoverable within this build's source budget and are left absent rather than guessed; 2010's complaint count (from the milestone chart) is retained in ic3Complaints even though its loss figure could not be confirmed from a single-year source.",
    breaks: "Edition stitch across 11 IC3 Annual Reports (2011-2025 editions) plus the 2025 report's own 25-year chart for 2001/2005; losses reflect victim self-report and reporting volume, not a comprehensive accounting of cybercrime losses, and IC3 states these are not adjusted for inflation.",
  },
};
export const KEYS = Object.keys(META);
