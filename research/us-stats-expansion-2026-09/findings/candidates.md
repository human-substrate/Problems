# Candidates — every series considered for the v9 expansion, with its disposition

Rules are numbered as in [METHODOLOGY.md](../METHODOLOGY.md). SHIP = in a Substrate dataset and on usstats.io. CUT = not published, with the rule. DEFERRED = primary and long-run, but the publisher's file needs a browser read or a registration this run did not complete; listed so the next run starts from the URL. Sample values were read from the publisher on 2026-09-10 by four read-only verification lanes (crime, family, happiness, energy) and re-read by the lead for every shipped series (see the dataset's `lib/checks.test.ts`).

Datasets: `Data/US-Crime-And-Justice/`, `Data/US-Family-And-Society/`, `Data/US-Societal-Health/` (extended), `Data/US-Energy-And-Environment/`.

## Lane 1 — Crime & Justice

| Candidate | Publisher / path | Coverage | Sample values | Breaks | Disposition |
|---|---|---|---|---|---|
| Violent victimization per 1,000 age 12+ | BJS NCVS, `cv24.zip` → `cv24f01.csv` | 1993–2024 | 1993 = 79.8; 2023 = 22.5; 2024 = 23.3 | 2006 not comparable; 2016 redesign; 2024 split-sample | **SHIP** `ncvsViolentRate` |
| Property victimization per 1,000 households | BJS NCVS, `cv24t02.csv` + prior bulletins (5-year windows) | 1993–2024 | 2023 = 102.2; 2024 = 97.6 | same; stitched across editions (rule 6) | **SHIP** `ncvsPropertyRate` |
| Violent victimizations reported to police (%) | derived: reported rate ÷ total rate, `cv24f01` | 1993–2024 | 2023 = 44.7; 2024 = 47.9 | same | **SHIP** `ncvsReportedShare` (computed from) |
| Motor vehicle theft, burglary, robbery, aggravated assault per 100k | FBI CDE `summarized/national/{offense}` (monthly, summed) | 2000–2024 | 2024 robbery = 60.6; agg. assault = 256.1 | 2021 NIBRS transition; 2013 rape definition | **SHIP** four rates |
| Violent crime clearance rate | FBI CDE clearance endpoints / UCR Summary PDF | 2000–2024 | 2024 violent cleared 43.8 %, property 15.9 % | 2021 NIBRS | **DEFERRED** unless the summarized payload carries clearances (API key rate-limited on DEMO_KEY) |
| Hate crime incidents | FBI CDE `hate-crime/national` | 1991–2024 | 2024 = 11,679 (16,419 agencies, 95.1 % population) | participation varies yearly; 2013 gender-identity bias | **DEFERRED** — per-year totals not confirmed in the API payload before the DEMO_KEY limit; count only, never a rate |
| Jail incarceration rate per 100k | BJS Annual Survey of Jails `ji23st.zip` + prior editions | 1982–2023 (gaps 1983/88/93/99/2005) | 2013 = 231; 2023 = 198 | 2019 = Census of Jails | **SHIP** `jailRate` |
| Adults under correctional supervision per 100k adults | BJS `cpus23st.zip` t03 + prior editions | 1985–2023 | 2013 = 2,830; 2023 = 2,100 | 2023 probation coverage expanded | **SHIP** `correctionalSupervisionRate` |
| Executions | BJS Capital Punishment `cp23stat04.csv` | 1930–2023 | 1930 = 155; 2023 = 24 | excludes 160 military executions 1930–61 | **SHIP** `executions` |
| Persons under sentence of death | `cp23stat01.csv` | 1953–2023 | 1953 = 131; 2023 = 2,192 | none known | **SHIP** `deathRowPopulation` |
| Officers feloniously killed | FBI LEOKA special report (PDF) | annual | 2024 = 64 | — | **DEFERRED** — PDF tables carry ten-year windows; no machine-readable long table found |
| Officers per 1,000 residents | FBI police-employee data | annual | 2024 = 2.3 | — | **CUT** rule 4 — API endpoint unconfirmed; the summary PDF gives one year |
| Consumer fraud and identity-theft reports | FTC Consumer Sentinel data book CSV zip | 2001–2024 | 2001 = 325,519 total; 2024 = 6,471,708 total; fraud 2,600,678; identity theft 1,135,291 | contributor set changes yearly | **SHIP** `fraudReports`, `identityTheftReports` |
| Internet crime complaints and losses | FBI IC3 annual reports (PDF) | 2001–2025 | 2025 = 1,008,597 complaints; $20.9 B losses | voluntary reporting; loss definition 2016 | **SHIP** `ic3Complaints`, `ic3Losses` |
| Federal prison population | BOP `BOP_pastPopulationTotals.csv` | FY1980–2025 | 1980 = 24,640; 2025 = 155,270 | includes contract and community facilities | **SHIP** `federalPrisonPopulation` |
| Federal offenders sentenced | USSC Sourcebook / datafiles | FY1996/2002–2025 | FY2025 = 66,662 | FY2018 variable changes | **SHIP** `federalOffendersSentenced` |
| More crime in the U.S. than a year ago (%) | Gallup Crime page, server-rendered table | 1989–2025 (gaps) | 1993 = 87; 2024 = 64; 2025 = 49 | phone → web panel modes | **SHIP** `gallupMoreCrime` (labeled belief, rule 7) |
| Afraid to walk alone at night within a mile (%) | Gallup | 1965–2025 (gaps) | 1965 = 34; 1982 = 48; 2025 = 31 | same | **SHIP** `gallupAfraidToWalk` (belief) |
| GSS FEAR, CAPPUN, COURTS, OWNGUN | NORC GSS cumulative Stata file (public microdata) | 1972/73/74–2024 | computed shares, weight WTSSPS | 2021 web mode; ballot rotation | **SHIP** `gssFearWalking`, `gssFavorDeathPenalty`, `gssCourtsNotHarsh`, `gssGunInHome` (belief; computed from) |
| GSS GUNLAW (favor permits) | GSS | 1972–2024 | — | same | **CUT** rule 8 — overlaps OWNGUN as the household-gun story; four GSS rows already |
| Deaths by legal intervention | CDC WONDER (ICD-10 Y35) | 1999–2024 | — | ICD-9 → ICD-10 at 1999; known undercount | **CUT** rule 4 — WONDER is a POST-only query and CDC's own documentation names the undercount |
| Juvenile arrest rate | OJJDP Statistical Briefing Book (Tableau) | 1980–2022 | — | — | **CUT** rule 4 — no static table; export needs a browser session |
| NICS firearm background checks | FBI monthly PDF | 1998–2026 | 1998-11 = 21,196 | not a sales count (FBI disclaimer) | **CUT** rule 2 — the publisher says it does not measure sales |

## Lane 2 — Family & Society

All Census rows are CPS ASEC historical tables (`www2.census.gov/programs-surveys/demo/tables/families/time-series/`), legacy `.xls`, read by the dataset's own BIFF8 reader. Shared breaks, stated once in METHODOLOGY: 2014 ASEC redesign; decennial population-control revisions (`r` rows); 2021 appears twice; 2025 uses Vintage-2025 controls.

| Candidate | Publisher / path | Coverage | Sample values | Breaks | Disposition |
|---|---|---|---|---|---|
| Median age at first marriage | MS-2 | 1890–2025 | 1890 men 26.1 / women 22.0; 2025 men 30.8 / women 28.4 | 2019 includes same-sex marriages | **SHIP** `medianAgeFirstMarriageMen` + `…Women` (paired) |
| Share of adults married | MS-1 (computed) | 1950–2025 | 2025 men 51.4 %, women 49.5 % | pre-2003 Asian incl. Pacific Islander (race rows only) | **SHIP** `adultsMarried` (computed from) |
| Married-couple households, share of households | HH-1 | 1940–2025 | 2025 = 46.6 % | — | **SHIP** `marriedCoupleHouseholds` |
| One-person households, share | HH-4 | 1960–2025 | 1960 = 13.1 %; 2025 = 29.5 % | — | **SHIP** `onePersonHouseholds` |
| Average household size | HH-6 | 1940–2025 | 2025 = 2.50 | — | **SHIP** `householdSize` |
| Children living with two parents (%) | CH-1 | 1960–2025 | 1960 = 87.7 %; 2025 = 70.4 % | 2007 x/y method change (cohabiting parents); 2019 parent pointers | **SHIP** `childrenWithTwoParents` |
| One-parent families, share of families with children | FM-1 | 1950–2025 | 2025 = 30.5 % | — | **SHIP** `oneParentFamilies` |
| Adults 25–34 living with parents (%) | AD-1 | 1960–2025 | 1960 men 10.9 %; 2025 men 19.2 %, women 13.6 % | — | **SHIP** `youngAdultsWithParents` (both sexes, computed from counts) |
| Cohabiting couples | UC-1 (two series in one file) | POSSLQ 1960–2006 · direct 1996–2023 | 2023 = 9,481k; POSSLQ 1980 = 1,589k | 1996 direct question; 2007 householder restriction lifted; POSSLQ retired 2007 | **SHIP** `cohabitingCouples` + `cohabitingCouplesPosslq` (paired, never joined) |
| Moved in the past year (%) | Geographic Mobility Table A-1 | 1948–2020 (newer file to locate) | 1947-48 = 20.2 %; 2019-20 = 9.3 % | 2004 wording; 1972–75/77–80 missing; 2014 redesign | **SHIP** `moversShare` |
| Women 40–44 childless (%) | CPS Fertility H1 (biennial) | 1976–2024 | 2022 = 17.7; 2024 = 18.8 | 45–50 group added later | **SHIP** `childlessWomen40to44` |
| Mean age of mother at first birth | NCHS NVSR 51-1, DB 232, NVSR 74-9, 75-2 | 1970–2024 | 1970 = 21.4; 2000 = 24.9; 2024 = 27.6 | 2003 revised certificate | **SHIP** `meanAgeFirstBirth` (stitched, edition list in note) |
| Total births | NCHS Births: Final Data | annual | 2024 = 3,628,934 | — | **SHIP** `births` |
| Abortion rate per 1,000 women 15–44 | CDC Abortion Surveillance MMWR | 1969–2022 | 2013 = 12.4; 2022 = 11.2 | CA, MD, NH (and NJ/DC) do not report; each summary re-bases its trend set | **DEFERRED** unless ≥ 15 years are machine-recoverable from the yearly MMWR summaries with one reporting-area rule |
| Children in foster care on Sept 30 | ACF AFCARS dashboard + trends xlsx | 2000–2025 | 2020 = 407,332; 2025 = 331,747 (preliminary) | AFCARS 2020 rule; WA first reported FY2025 | **SHIP** `fosterCareChildren` if ≥ 10 years recoverable, else DEFERRED |
| Child maltreatment victims per 1,000 | ACF NCANDS Child Maltreatment reports | 1990–2023 | 2019 = 677,099 victims; 2023 = 546,159 (7.4 per 1,000) | reporting-state count varies; each report is a 5-year window | **SHIP** `childMaltreatmentRate` if ≥ 10 years recoverable, else DEFERRED |
| Time use: socializing, TV, childcare, sleep (hours/day) | BLS ATUS series `TUU10101AA01013951`, `…014236`, `…010710`, `…000247` | 2003–2025, no 2020 | 2025 socializing 0.58; TV 2.61; childcare 0.36; sleep 9.03 | 2020 partial collection | **SHIP** `atusSocializing`, `atusTelevision`, `atusChildcare`, `atusSleep` |
| Time alone | ATUS tables A-8/A-9 | 2023–2025 | — | — | **CUT** rule 3 — three years |
| Mothers' labor force participation | BLS Women in the Labor Force Databook Table 7 (March CPS) | 1975–2021 | 1975 = 47.4 %; 2021 = 71.7 % | famee Table 5 (annual average) is a different series | **SHIP** `mothersLaborForce` if the table is machine-readable, else DEFERRED |
| Religious attendance, no religion, social evenings with friends | GSS ATTEND, RELIG, SOCFREND | 1972/74–2024 | computed shares | 2021 web mode | **SHIP** `gssAttendWeekly`, `gssNoReligion`, `gssSocialFriends` (computed from) |
| Church membership | Gallup articles (3-year aggregates) | 1937–2020 | 1937 = 73 %; 2020 = 47 % | mode changes; full annual table in Gallup Analytics | **CUT** rule 5 — the public series is aggregated windows; the annual table is subscription-only |
| Volunteering rate | CPS Volunteer Supplement 2002–2015; AmeriCorps CEV 2017→ biennial | — | 2023 = 28.3 % | 2017 redesign, not comparable | **CUT** rule 4/6 — americorps.gov blocks scripted access and the two instruments do not join |
| Lawful permanent residents admitted | DHS Yearbook Table 1 xlsx | 1820–2023 | 1820 = 8,390; 2023 = 1,172,910 | 1976 = 15-month year | **SHIP** `permanentResidents` |
| Naturalizations | DHS Yearbook Table 20 | 1907–2023 | 1907 = 7,940; 2023 = 878,460 | — | **SHIP** `naturalizations` |
| Border enforcement actions | DHS Yearbook Table 33 | 1925–2023 | 1925 = 22,200; 2023 = 2,818,660 | definition widens: USBP only pre-1952; HSI 1952; OFO/ERO later; Title 42 FY2020–23 | **SHIP** `borderEnforcementActions` (widening stated in the note) |
| CBP nationwide encounters | CBP monthly CSVs | FY2020–2026 | — | concept begins FY2020 | **CUT** rule 3 — six years |
| Foreign-born share of population | Census working paper 81 Table 1 (decennial) + ACS B05002 (API key) | 1850–2000 decennial; 2005→ ACS | 1970 = 4.7 %; 2000 = 11.1 % | decennial vs CPS vs ACS eras | **SHIP** `foreignBornShareDecennial`; annual ACS line **DEFERRED** until a Census API key is registered |
| Median age; population 65+ share | Census popest vintages | 1970–2025 | 2025 median 39.4; 65+ = 18.9 % | vintages supersede each other; census-base splices | **SHIP** `medianAge`, `population65Share` |
| Marriage/divorce currency | NCHS NVSS provisional tables | to 2023 | 2023 marriage 6.1, divorce 2.4 per 1,000 | — | existing rows correct; no 2024/2025 national figure published as of 2026-09-10 |

## Lane 3 — Happiness & Outlook, Mental Health

| Candidate | Publisher / path | Coverage | Sample values | Breaks | Disposition |
|---|---|---|---|---|---|
| Index of Consumer Sentiment | Michigan Surveys of Consumers `tbyics.csv` / `tbmics.csv` | 1952–2026 | Nov 1952 = 86.2; Aug 2026 = 51.7 | 1978 monthly; mode transition to web | **SHIP** `consumerSentiment` (annual mean; current year partial) |
| Expected business conditions, 5 years | Michigan Table 29 (form POST) | 1960→ | — | — | **CUT** rule 4 — no static file; low marginal value beside ICS |
| Satisfied with personal life (%) | Gallup January Mood of the Nation topline PDF | 1979–2025 | 1982 = 75; 2025 = 81 | 2001 very/somewhat split | **SHIP** `gallupPersonalLifeSatisfied` |
| *Very* satisfied with personal life (%) | same | 2001–2025 | 2020 = 65; 2025 = 44 | — | **SHIP** `gallupPersonalLifeVerySatisfied` |
| Rate own mental health excellent (%) | Gallup November Health survey, chart `f9It9` | 2001–2025 | 2001 = 43; 2025 = 29 | phone throughout | **SHIP** `gallupMentalHealthExcellent` |
| Economic Confidence Index | Gallup charts `y7uQi` + `6VwvN` | 1996–2026 | Jan 1996 = +1; Apr 2026 = −38 | 2008–17 daily tracking; monthly again from 2017 | **SHIP** `gallupEconomicConfidence` (annual mean of months) |
| Good time to find a quality job (%) | Gallup `8YPmK` + `gZ2wl` | 2001–2026 | Aug 2001 = 39; Aug 2022 = 69 | — | **SHIP** `gallupQualityJob` |
| Personal finances getting better (%) | Gallup `w92AE` | 2001–2025 | 2001 = 50; Apr 2025 = 38 | — | **SHIP** `gallupFinancesBetter` |
| Better off than a year ago (Gallup) | Gallup `l14QC` | 1976–2025 | — | — | **CUT** rule 8 — the Michigan item of the same question already ships (`betterOffThanYearAgo`) |
| Life Evaluation Index, % thriving | Gallup articles; full series in Gallup Analytics | 2008–2025 | Q1 2025 = 48.9 % | 2018 mode change | **CUT** rule 5 — subscription series |
| GSS HAPMAR, SATJOB, LIFE, HELPFUL, FAIR, ANOMIA5, HAPPY (not too happy) | GSS cumulative Stata | 1972/73–2024 | computed shares | 2021 web mode; ballot gaps | **SHIP** seven `gss…` rows (computed from) |
| Doing at least okay financially; could cover a $400 expense | Fed SHED report | 2013–2025 | okay 2013 = 62, 2025 = 73; $400 2013 = 50, 2025 = 63 | 2020 fielded November | **SHIP** `shedDoingOkay`, `shedCover400` (13 points, named exception) |
| World Happiness Report components | WHR26 Figure 2.1 xlsx | 2011–2025 | US 2025 ladder 6.816 | — | **CUT** rule 2 — the components are model "explained-by" contributions, not measured indicators |
| Pew "very satisfied with family life" | Pew | 2010 one-off | — | — | **CUT** rule 3 |
| American Dream items | Gallup / Marist / Ipsos | irregular | — | wording varies | **CUT** rule 6 — fewer than ten identical readings |
| Conference Board Consumer Confidence | Conference Board | 1967→ | Aug 2026 = 89.4 | — | **CUT** rule 5 — history is subscription-only and licensed |
| Gallup World Poll US stress / worry | Gallup Global Emotions | 2006→ | — | — | **CUT** rule 5 — US series is Analytics-only |
| Teens with persistent sadness; teens who seriously considered suicide | CDC YRBS Data Summary & Trends PDFs; Youth Online | 1999/1991–2023, biennial | sadness 2013 = 30, 2021 = 42, 2023 = 40; suicide 2023 = 20 | 2021 fielded fall 2021 | **SHIP** `yrbsPersistentSadness`, `yrbsConsideredSuicide` (older years DEFERRED if Youth Online has no endpoint) |
| Adults with frequent mental distress (≥ 14 bad days) | CDC BRFSS: Socrata `dttw-5yxu` 2019→; annual XPT microdata 2011–2018, weight `_LLCPWT` | 2011–2024 | 2019 = 13.8; 2024 = 15.6 | 2011 raking/cell-phone; pre-2011 not comparable | **SHIP** `brfssFrequentMentalDistress` (computed from microdata for 2011–2018) |
| Any mental illness; serious mental illness (adults) | SAMHSA NSDUH detailed tables, stitched | 2008–2025 | AMI 2024 = 21.5, 2025 = 20.6; SMI 2025 = 6.9 | 2021 multimode; 2020 disrupted | **SHIP** `nsduhAnyMentalIllness`, `nsduhSeriousMentalIllness` |
| Major depressive episode, adults and adolescents | NSDUH | 2005–2025 | adult MDE 2025 = 7.4 | same | **SHIP** `nsduhAdultDepression`, `nsduhAdolescentDepression` |
| Serious psychological distress (K6 ≥ 13) | NHIS via Health, United States 2017 Table 46 | 1998–2016/18 (two-year pools) | 1997–98 = 3.2; 2015–16 = 3.6; 2021 = 3.7 | 2019 redesign; K6 not collected 2019/2020/2022 | **SHIP** `nhisPsychologicalDistress` ending at the last pre-redesign pool; post-2019 never appended |
| Antidepressant use, adults, past 30 days | NHANES Data Briefs 76 / 283 / 377 | 1988–94 … 2017–18 cycles | 2009–10 = 10.6 %; 2017–18 = 13.8 % | 2019–20 cycle incomplete; NHIS 2023 item is a different instrument | **SHIP** `antidepressantUse` (cycles keyed to end year; named exception) |
| NHIS anxiety/depression symptoms | NHIS Early Release | 2019→ | — | — | **CUT** rule 3 |
| MTF 12th-grade loneliness; HERI freshman "felt depressed" | ICPSR microdata (account); HERI monographs | 1976→ / 1985→ | — | wording drift | **CUT** rule 4/6 |

## Lane 4 — Energy, Environment & Climate

EIA rows: Monthly Energy Review codes via the EIA v2 API (free key) or the keyless per-table CSV; whole series revise each release.

| Candidate | Publisher / path | Coverage | Sample values | Breaks | Disposition |
|---|---|---|---|---|---|
| Crude oil production | EIA `PAPRPUS` (and `MCRFPUS1` 1859→) | 1949–2025 | 2025 = 13,586 kb/d | — | **SHIP** `crudeProduction` |
| Natural gas marketed production | `NGMPPUS` | 1949–2025 | 2025 = 43,229 Bcf | — | **SHIP** `gasProduction` |
| Coal production | `CLPRPUS` | 1949–2025 | 2025 = 528,423 thousand short tons | — | **SHIP** `coalProduction` |
| Petroleum net imports | `PANIPUS` | 1949–2025 | 2025 = −2,798 kb/d (net exporter since 2020) | — | **SHIP** `petroleumNetImports` |
| Refinery crude input | `CORIPUS` | 1949–2025 | 2025 = 16,371 kb/d | — | **SHIP** `refineryInput` |
| Strategic Petroleum Reserve | `COSQPUS` | 1977–2025 | 2025 = 413.5 M bbl | — | **SHIP** `strategicReserve` |
| Proved crude reserves | `RCRR01NUS_1` | 1899–2021 | 2021 = 41,151 MMbbl | two-year publication lag | **SHIP** `provedOilReserves` (lag named) |
| Rotary rig count | `OGNRPUS` | 1949–2025 | 2025 = 561 | EIA publishes Baker Hughes counts | **SHIP** `rigCount` (origin named) |
| Electricity generation, total and by source | `ELETPUS`, `CLETPUS`, `NGETPUS`, `NUETPUS`, `HVETPUS`, `WYETPUS`, `SOETPUS` | 1949–2025 (wind 1983, solar 1984) | 2025 total = 4,429,502 GWh; nuclear 784,781; solar 295,671 | solar includes small-scale PV from 2014 | **SHIP** seven rows |
| Generating capacity; battery storage | `ELGBPUS`; `BTGBPUS` | 1949–2025; 2010–2025 | 2025 = 1,279.2 GW; batteries 42.8 GW | by-source capacity begins 1989 | **SHIP** `capacityTotal`, `batteryCapacity` (named exception) |
| Nuclear reactors operable; capacity factor | `NUOUPUS`; `NUCASUS` | 1957–2025; 1973–2025 | 2025 = 94 units; 91 % | EIA "operable" ≠ NRC "operating" (93) | **SHIP** `nuclearReactors`, `nuclearCapacityFactor` |
| Retail sales: residential, commercial, industrial | `ESRCPUS`, `ESCCPUS`, `ESICPUS` | 1949–2025 | 2025 residential 1,514,993 GWh | — | **SHIP** three rows (commercial + industrial is the only fetchable data-center proxy) |
| Energy production ÷ consumption; per capita; intensity | `TEPRBUS`/`TETCBUS`; `TETPRUS`; `TETGRUS` | 1949–2025 | 2025 ratio 1.11; 282 million Btu per person; 4.04 thousand Btu per $ | — | **SHIP** `energyIndependence` (computed from), `energyPerCapita`, `energyIntensity` |
| Heating and cooling degree days | `ZWHDPUS`, `ZWCDPUS` | 1949–2025 | 2025 HDD 4,021; CDD 1,540 | weights re-based each census | **SHIP** `heatingDegreeDays`, `coolingDegreeDays` |
| Vehicle miles traveled | FHWA Highway Statistics VM-202 | 1980–2023 | 2023 = 3,246,817 million | 2007–09 HPMS resubmission | **SHIP** `vehicleMiles` |
| New-vehicle real-world fuel economy | EPA Automotive Trends | MY1975–2024 | — | — | **DEFERRED** unless the full-trend CSV resolves without a browser |
| EV share of new sales; public charging ports | Argonne; DOE AFDC | 2010→; 2011→ | 2025 PEV share 9.1 % | manufacturer counts; station→port estimates | **DEFERRED** — both hosts refuse scripted access; Argonne's origin is manufacturer data (rule 2 to be judged on read) |
| Pipeline mileage; significant incidents | PHMSA | 1984→ / 2004→ | — | 2010 form change | **DEFERRED** — phmsa.dot.gov blocks scripted access |
| Transmission line miles | EIA / DOE | — | ~700,000 circuit-miles (one-off) | — | **CUT** rule 4 — no consistent annual public series (EIA-411 discontinued) |
| Grid reliability SAIDI/SAIFI | EIA-861 utility-level | 2013–2024 | — | IEEE-1366 vs other methods | **DEFERRED** — national value must be customer-weighted by us; twelve years |
| Interconnection queue | LBNL Queued Up | ~2010→ | — | — | **DEFERRED** — LBNL blocks scripted access; Excel fetched by hand next run |
| Data-center electricity load | EIA | projections only | — | — | **CUT** rule 3 — no historical series exists |
| Atmospheric CO2 (Mauna Loa); global growth rate | NOAA GML `co2_annmean_mlo`, `co2_gr_gl` | 1959–2025 | 2025 = 427.35 ppm; growth 2.06 ppm/yr | 2022–23 Maunakea measurements after the eruption | **SHIP** `co2Concentration`, `co2Growth` |
| Global methane | `ch4_annmean_gl` | 1984–2025 | 2025 = 1,935.9 ppb | — | **SHIP** `methaneConcentration` |
| Global nitrous oxide | `n2o_annmean_gl` | 2001–2025 | 338.85 ppb | — | **CUT** rule 3 — 25 years but no long-run story beyond CO2/CH4 (revisit) |
| Annual Greenhouse Gas Index | NOAA `AGGI_Table.csv` | 1979–2024 | 2024 = 1.538 | — | **SHIP** `greenhouseGasIndex` |
| Electricity CO2 intensity; energy CO2 per capita | EIA `TXEIEUS`÷`ELEGPUS`; `CDTPRUS` | 1973–2025; 1949–2025 | 2025 ≈ 0.347 t/MWh; 14.3 t per person | — | **SHIP** `electricityCo2Intensity` (computed from), `co2PerCapita` |
| US greenhouse gas inventory (gross, net) | EPA Inventory | 1990–2022 final | 2022 gross 6,343 MMT CO2e | every edition recalculates the whole series; 1990–2023 still draft | **CUT** rule 6 (this run) — revisit when the 1990–2024 edition publishes |
| Global temperature anomaly | NOAA Climate at a Glance global | 1850–2025 | 2025 = +1.12 °C vs 1901–2000 | — | **SHIP** `globalTemperature` |
| US precipitation | Climate at a Glance national | 1895–2025 | 2025 = 29.25 in | — | **SHIP** `precipitation` |
| Global mean sea level | NOAA STAR `slr_sla_gbl_free_ref_90.csv` | 1993–2025 | 2025 ≈ 83.6 mm vs 1993 | inter-mission offsets | **SHIP** `seaLevel` (annual mean, computed from) |
| Arctic September sea ice | NSIDC `N_09_extent_v4.0.csv` | 1979–2025 | 2025 = 4.75 M km² | source dataset switch 2025 | **SHIP** `arcticSeaIce` |
| Wildfire acres | NIFC | 1983–2025 | 2025 = 5,131,474 | pre-1983 not comparable | **SHIP** `wildfireAcres` |
| Atlantic named storms | NHC HURDAT2 | 1851–2025 | 2005 = 28; 2024 = 18 | pre-1966 satellite era; pre-1944 recon | **SHIP** `namedStorms` (computed from) |
| Tornadoes | NOAA SPC | 1950–2024 | — | 2007 EF scale; Doppler era | **SHIP** `tornadoes` (computed from) |
| Major disaster declarations | OpenFEMA | 1953–2026 | — | Stafford Act 1988; COVID 2020 | **SHIP** `disasterDeclarations` (computed from) |
| Billion-dollar disasters (count, cost) | NCEI archive accession 0209268 | 1980–2024, retired | — | retired 2025 | **SHIP** `billionDollarDisasters`, `billionDollarCost` ending 2024 (rule 9) |
| Criteria pollutant emissions SO2, NOx, PM2.5, VOC | EPA NEI `national_tier1_caps` workbook | 1970–2025 | 1970 SO2 utilities = 17,398 kt | EQUATES 2002–19; 2020–25 interpolated/projected | **SHIP** four rows, "Total without wildfires" |
| Unhealthy AQI days, ten largest metros | EPA AQS `annual_aqi_by_cbsa` | 1980–2025 | — | 2024 PM2.5 breakpoints | **SHIP** `unhealthyAqiDays` (computed from) |
| National mean PM2.5 | EPA AQS site-level annual files | 2000–2025 | — | EPA's headline uses a fixed site set | **DEFERRED** — our computed mean will not match EPA's chart; needs the site-completeness rule first |
| People in counties above NAAQS | EPA air-quality summary | latest year only | 2024 ≈ 109 M | NAAQS levels change | **CUT** rule 6 — the standard moves under the series |
| TRI releases; drinking-water violations | EPA TRI / ECHO | 1987→ / 1993→ | — | chemical-list and reporting seams | **CUT** rule 6/4 |

## Shipped (generated 2026-09-11 from the datasets; the tables above describe the publisher, this table describes what usstats.io carries)

Coverage here is what shipped after the build; where it is shorter than the publisher coverage above, the series note names why (a login-walled older edition, a checked-in file, a rule-3 exception).

| Dataset | Key | Shipped coverage | Points | Source URL |
|---|---|---|---|---|
| Crime-And-Justice | aggravatedAssaultRate | 2000–2024 | 25 | https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/crime-trend |
| Crime-And-Justice | burglaryRate | 2000–2024 | 25 | https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/crime-trend |
| Crime-And-Justice | correctionalSupervisionRate | 2003–2023 | 21 | https://bjs.ojp.gov/document/cpus23st.zip |
| Crime-And-Justice | deathRowPopulation | 1953–2023 | 71 | https://bjs.ojp.gov/document/cp23st.zip |
| Crime-And-Justice | executions | 1930–2023 | 94 | https://bjs.ojp.gov/document/cp23st.zip |
| Crime-And-Justice | federalOffendersSentenced | 2002–2025 | 24 | https://www.ussc.gov/research/sourcebook-2025 |
| Crime-And-Justice | federalPrisonPopulation | 1980–2025 | 46 | https://www.bop.gov/about/statistics/raw_stats/BOP_pastPopulationTotals.csv |
| Crime-And-Justice | fraudReports | 2001–2024 | 24 | https://www.ftc.gov/system/files/ftc_gov/data/csn-data-book-2024-csv.zip |
| Crime-And-Justice | gallupAfraidToWalk | 1965–2025 | 41 | https://news.gallup.com/poll/1603/crime.aspx |
| Crime-And-Justice | gallupMoreCrime | 1989–2025 | 32 | https://news.gallup.com/poll/1603/crime.aspx |
| Crime-And-Justice | gssCourtsNotHarsh | 1972–2024 | 34 | https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip |
| Crime-And-Justice | gssFavorDeathPenalty | 1974–2024 | 33 | https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip |
| Crime-And-Justice | gssFearWalking | 1973–2024 | 30 | https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip |
| Crime-And-Justice | gssGunInHome | 1973–2024 | 30 | https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip |
| Crime-And-Justice | ic3Complaints | 2011–2025 | 15 | https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf |
| Crime-And-Justice | ic3Losses | 2011–2025 | 15 | https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf |
| Crime-And-Justice | identityTheftReports | 2001–2024 | 24 | https://www.ftc.gov/system/files/ftc_gov/data/csn-data-book-2024-csv.zip |
| Crime-And-Justice | jailRate | 2012–2023 | 12 | https://bjs.ojp.gov/document/ji23st.zip |
| Crime-And-Justice | motorVehicleTheftRate | 2000–2024 | 25 | https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/crime-trend |
| Crime-And-Justice | ncvsPropertyRate | 1993–2024 | 28 | https://bjs.ojp.gov/document/cv24.zip |
| Crime-And-Justice | ncvsReportedShare | 1993–2024 | 31 | https://bjs.ojp.gov/document/cv24.zip |
| Crime-And-Justice | ncvsViolentRate | 1993–2024 | 31 | https://bjs.ojp.gov/document/cv24.zip |
| Crime-And-Justice | robberyRate | 2000–2024 | 25 | https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/crime-trend |
| Family-And-Society | adultsMarried | 1950–2025 | 38 | https://www2.census.gov/programs-surveys/demo/tables/families/time-series/marital/ms1.xls |
| Family-And-Society | atusChildcare | 2003–2025 | 22 | https://api.bls.gov/publicAPI/v1/timeseries/data/TUU10101AA01010710 |
| Family-And-Society | atusSleep | 2003–2025 | 22 | https://api.bls.gov/publicAPI/v1/timeseries/data/TUU10101AA01000247 |
| Family-And-Society | atusSocializing | 2003–2025 | 22 | https://api.bls.gov/publicAPI/v1/timeseries/data/TUU10101AA01013951 |
| Family-And-Society | atusTelevision | 2003–2025 | 22 | https://api.bls.gov/publicAPI/v1/timeseries/data/TUU10101AA01014236 |
| Family-And-Society | births | 1909–2024 | 116 | https://data.cdc.gov/resource/e6fc-ccez.json?$limit=1000 |
| Family-And-Society | borderEnforcementActions | 1925–2023 | 99 | https://ohss.dhs.gov/system/files/2026-08/2026_0806_ohss_yearbook_enforcement_fy2023.xlsx |
| Family-And-Society | childMaltreatmentRate | 2005–2023 | 19 | https://acf.gov/sites/default/files/documents/cb/cm2023.pdf |
| Family-And-Society | childlessWomen40to44 | 1976–2024 | 28 | https://www2.census.gov/programs-surveys/demo/tables/fertility/time-series/his-cps/h1.xlsx |
| Family-And-Society | childrenWithTwoParents | 1960–2025 | 59 | https://www2.census.gov/programs-surveys/demo/tables/families/time-series/children/ch1.xls |
| Family-And-Society | cohabitingCouples | 1996–2023 | 28 | https://www2.census.gov/programs-surveys/demo/tables/families/time-series/adults/uc1.xls |
| Family-And-Society | cohabitingCouplesPosslq | 1960–2006 | 32 | https://www2.census.gov/programs-surveys/demo/tables/families/time-series/adults/uc1.xls |
| Family-And-Society | foreignBornShareDecennial | 1850–2000 | 16 | https://www2.census.gov/library/working-papers/2006/demo/pop-twps0081/tab01.xls |
| Family-And-Society | fosterCareChildren | 2009–2025 | 17 | https://acf.gov/sites/default/files/documents/cb/2025-afcars-dashboard-printable.pdf |
| Family-And-Society | gssAttendWeekly | 1972–2024 | 35 | https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip |
| Family-And-Society | gssNoReligion | 1972–2024 | 35 | https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip |
| Family-And-Society | gssSocialFriends | 1974–2024 | 29 | https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip |
| Family-And-Society | householdSize | 1940–2025 | 80 | https://www2.census.gov/programs-surveys/demo/tables/families/time-series/households/hh6.xls |
| Family-And-Society | marriedCoupleHouseholds | 1940–2025 | 80 | https://www2.census.gov/programs-surveys/demo/tables/families/time-series/households/hh1.xls |
| Family-And-Society | meanAgeFirstBirth | 1970–2024 | 46 | https://www.cdc.gov/nchs/data/nvsr/nvsr75/nvsr75-02.pdf |
| Family-And-Society | medianAge | 2000–2025 | 26 | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/national/asrh/nc-est2025-agesex.xlsx |
| Family-And-Society | medianAgeFirstMarriageMen | 1890–2025 | 85 | https://www2.census.gov/programs-surveys/demo/tables/families/time-series/marital/ms2.xls |
| Family-And-Society | medianAgeFirstMarriageWomen | 1890–2025 | 85 | https://www2.census.gov/programs-surveys/demo/tables/families/time-series/marital/ms2.xls |
| Family-And-Society | moversShare | 1948–2023 | 68 | https://www2.census.gov/programs-surveys/demo/tables/geographic-mobility/time-series/historic/hst_mig_a_1.xlsx |
| Family-And-Society | naturalizations | 1907–2023 | 117 | https://ohss.dhs.gov/system/files/2025-07/2025_0725_plcy_yearbook_naturalizations_fy2023.xlsx |
| Family-And-Society | oneParentFamilies | 1950–2025 | 76 | https://www2.census.gov/programs-surveys/demo/tables/families/time-series/families/fm1.xls |
| Family-And-Society | onePersonHouseholds | 1960–2025 | 66 | https://www2.census.gov/programs-surveys/demo/tables/families/time-series/households/hh4.xls |
| Family-And-Society | permanentResidents | 1820–2023 | 204 | https://ohss.dhs.gov/sites/default/files/2024-09/2024_0906_ohss_yearbook_lawful_permanent_residents_fy2023_0.xlsx |
| Family-And-Society | population65Share | 2000–2025 | 26 | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/national/asrh/nc-est2025-agesex.xlsx |
| Family-And-Society | youngAdultsWithParents | 1960–2025 | 46 | https://www2.census.gov/programs-surveys/demo/tables/families/time-series/adults/ad1.xls |
| Family-And-Society | foreignBornShare | DEFERRED | — | No CENSUS_API_KEY found via `has CENSUS_API_KEY` (returned CENSUS_API_KEY no); environment key absent. Annual ACS B05002_013E / B05002_001E … |
| Family-And-Society | mothersLaborForce | DEFERRED | — | Error: InvariantViolation: HTTP 403 https://www.bls.gov/opub/reports/womens-databook/2022/home.htm: <!DOCTYPE HTML>
<html lang="en-us">     … |
| Family-And-Society | abortionRate | DEFERRED | — | Error: InvariantViolation: HTTP 403 https://www.cdc.gov/mmwr/volumes/73/ss/ss7307a1.htm: <HTML><HEAD>
<TITLE>Access Denied</TITLE>
</HEAD><B… |
| Energy-And-Environment | arcticSeaIce | 1979–2025 | 47 | https://noaadata.apps.nsidc.org/NOAA/G02135/north/monthly/data/N_09_extent_v4.0.csv |
| Energy-And-Environment | batteryCapacity | 2010–2025 | 16 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=BTGBPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | billionDollarCost | 1980–2024 | 44 | https://www.ncei.noaa.gov/access/billions/events-US-1980-2024.csv |
| Energy-And-Environment | billionDollarDisasters | 1980–2024 | 44 | https://www.ncei.noaa.gov/access/billions/events-US-1980-2024.csv |
| Energy-And-Environment | capacityTotal | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=ELGBPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | co2Concentration | 1959–2025 | 67 | https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_annmean_mlo.csv |
| Energy-And-Environment | co2Growth | 1959–2025 | 67 | https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_gr_gl.csv |
| Energy-And-Environment | co2PerCapita | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=CDTPRUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | coalProduction | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=CLPRPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | coolingDegreeDays | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=ZWCDPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | crudeProduction | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=PAPRPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | disasterDeclarations | 1953–2025 | 73 | https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries |
| Energy-And-Environment | electricityCo2Intensity | 1973–2025 | 53 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=TXEIEUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | emissionsNox | 1970–2025 | 40 | https://www.epa.gov/system/files/other-files/2026-09/national_tier1_caps_04sep2026.xlsx |
| Energy-And-Environment | emissionsPm25 | 2002–2025 | 24 | https://www.epa.gov/system/files/other-files/2026-09/national_tier1_caps_04sep2026.xlsx |
| Energy-And-Environment | emissionsSo2 | 1970–2025 | 40 | https://www.epa.gov/system/files/other-files/2026-09/national_tier1_caps_04sep2026.xlsx |
| Energy-And-Environment | emissionsVoc | 1970–2025 | 40 | https://www.epa.gov/system/files/other-files/2026-09/national_tier1_caps_04sep2026.xlsx |
| Energy-And-Environment | energyIndependence | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=TEPRBUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | energyIntensity | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=TETGRUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | energyPerCapita | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=TETPRUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | gasProduction | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=NGMPPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | genCoal | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=CLETPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | genGas | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=NGETPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | genHydro | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=HVETPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | genNuclear | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=NUETPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | genSolar | 1984–2025 | 42 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=SOETPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | genWind | 1983–2025 | 43 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=WYETPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | generationTotal | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=ELETPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | globalTemperature | 1850–2025 | 176 | https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/time-series/globe/land_ocean/12/12/1850-2025.csv |
| Energy-And-Environment | greenhouseGasIndex | 1979–2024 | 46 | https://gml.noaa.gov/aggi/AGGI_Table.csv |
| Energy-And-Environment | heatingDegreeDays | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=ZWHDPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | methaneConcentration | 1984–2025 | 42 | https://gml.noaa.gov/webdata/ccgg/trends/ch4/ch4_annmean_gl.csv |
| Energy-And-Environment | namedStorms | 1851–2025 | 175 | https://www.nhc.noaa.gov/data/hurdat/hurdat2-1851-2025-02272026.txt |
| Energy-And-Environment | nuclearCapacityFactor | 1973–2025 | 53 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=NUCASUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | nuclearReactors | 1957–2025 | 69 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=NUOUPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | petroleumNetImports | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=PANIPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | precipitation | 1895–2025 | 131 | https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/national/time-series/110/pcp/12/12/1895-2025.csv |
| Energy-And-Environment | provedOilReserves | 1899–2021 | 123 | https://api.eia.gov/v2/petroleum/crd/pres/data/?frequency=annual&data%5B0%5D=value&facets%5Bseries%5D%5B%5D=RCRR01NUS_1&facets%5Bduoarea%5D%5B%5D=NUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | refineryInput | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=CORIPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | rigCount | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=OGNRPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | salesCommercial | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=ESCCPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | salesIndustrial | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=ESICPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | salesResidential | 1949–2025 | 77 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=ESRCPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | seaLevel | 1993–2024 | 32 | https://www.star.nesdis.noaa.gov/socd/lsa/SeaLevelRise/slr/slr_sla_gbl_free_ref_90.csv |
| Energy-And-Environment | strategicReserve | 1977–2025 | 49 | https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=COSQPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc |
| Energy-And-Environment | tornadoes | 1950–2024 | 75 | https://www.spc.noaa.gov/wcm/data/1950-2025_actual_tornadoes.csv |
| Energy-And-Environment | unhealthyAqiDays | 1980–2025 | 46 | https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2025.zip |
| Energy-And-Environment | vehicleMiles | 1980–2023 | 44 | https://www.fhwa.dot.gov/policyinformation/statistics/2023/xls/vm202.xls |
| Energy-And-Environment | wildfireAcres | 1983–2025 | 43 | https://www.nifc.gov/fire-information/statistics/wildfires |
| Societal-Health | antidepressantUse | 2010–2018 | 5 | https://www.cdc.gov/nchs/data/databriefs/db377-tables-508.pdf#4 |
| Societal-Health | brfssFrequentMentalDistress | 2019–2024 | 6 | https://data.cdc.gov/resource/dttw-5yxu.json |
| Societal-Health | consumerSentiment | 1961–2026 | 66 | https://www.sca.isr.umich.edu/files/tbyics.csv |
| Societal-Health | gallupEconomicConfidence | 1996–2026 | 31 | https://datawrapper.dwcdn.net/6VwvN/4/dataset.csv |
| Societal-Health | gallupFinancesBetter | 2001–2025 | 25 | https://datawrapper.dwcdn.net/w92AE/1/dataset.csv |
| Societal-Health | gallupMentalHealthExcellent | 2001–2025 | 25 | https://datawrapper.dwcdn.net/f9It9/6/dataset.csv |
| Societal-Health | gallupPersonalLifeSatisfied | 1979–2025 | 36 | https://news.gallup.com/poll/655493/new-low-satisfied-personal-life.aspx |
| Societal-Health | gallupPersonalLifeVerySatisfied | 2001–2025 | 19 | https://news.gallup.com/poll/655493/new-low-satisfied-personal-life.aspx |
| Societal-Health | gallupQualityJob | 2001–2026 | 26 | https://datawrapper.dwcdn.net/gZ2wl/4/dataset.csv |
| Societal-Health | gssJobVerySatisfied | 1972–2024 | 35 | https://gss.norc.org/get-the-data/stata.html |
| Societal-Health | gssLotOfAverageManWorse | 1973–1994 | 15 | https://gss.norc.org/get-the-data/stata.html |
| Societal-Health | gssMarriageVeryHappy | 1973–2024 | 34 | https://gss.norc.org/get-the-data/stata.html |
| Societal-Health | gssNotTooHappy | 1972–2024 | 35 | https://gss.norc.org/get-the-data/stata.html |
| Societal-Health | gssPeopleFair | 1972–2024 | 30 | https://gss.norc.org/get-the-data/stata.html |
| Societal-Health | gssPeopleHelpful | 1972–2024 | 30 | https://gss.norc.org/get-the-data/stata.html |
| Societal-Health | nhisPsychologicalDistress | 1998–2016 | 6 | https://www.cdc.gov/nchs/data/hus/2017/046.pdf |
| Societal-Health | nsduhAdolescentDepression | 2004–2025 | 21 | https://www.samhsa.gov/data/data-we-collect/nsduh-national-survey-drug-use-and-health |
| Societal-Health | nsduhAdultDepression | 2005–2025 | 20 | https://www.samhsa.gov/data/data-we-collect/nsduh-national-survey-drug-use-and-health |
| Societal-Health | nsduhAnyMentalIllness | 2008–2025 | 17 | https://www.samhsa.gov/data/data-we-collect/nsduh-national-survey-drug-use-and-health |
| Societal-Health | nsduhSeriousMentalIllness | 2008–2025 | 17 | https://www.samhsa.gov/data/data-we-collect/nsduh-national-survey-drug-use-and-health |
| Societal-Health | shedCover400 | 2013–2025 | 13 | https://www.federalreserve.gov/publications/files/2025-report-economic-well-being-us-households-202605.pdf |
| Societal-Health | shedDoingOkay | 2013–2025 | 13 | https://www.federalreserve.gov/publications/files/2025-report-economic-well-being-us-households-202605.pdf |
| Societal-Health | yrbsConsideredSuicide | 2013–2023 | 6 | https://www.cdc.gov/yrbs/dstr/pdf/YRBS-2023-Data-Summary-Trend-Report.pdf |
| Societal-Health | yrbsPersistentSadness | 2013–2023 | 6 | https://www.cdc.gov/yrbs/dstr/pdf/YRBS-2023-Data-Summary-Trend-Report.pdf |
