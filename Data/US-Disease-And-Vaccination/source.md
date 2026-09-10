# Sources — US Disease & Vaccination

Every series, its primary publisher, source documents, cadence/class, coverage, and full method note.

## Chlamydia (`chlamydiaRate`)

- **Publisher:** NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER
- **Source URL:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus20-21tables/IDNotif.xlsx
- **Also:** https://wonder.cdc.gov/nndss-annual-summary.html
- **Also:** https://fred.stlouisfed.org/series/POPTHM
- **Unit:** reported cases per 100,000 population
- **Cadence:** annual · annual rule: annual (publisher) · class: incidence
- **Coverage:** 1985–2023
- **Breaks:** Nationally notifiable from 1995 in the dispatch specification (IDNotif says 1994); NAAT (nucleic acid amplification test) adoption in the 2000s raised detection sensitivity, inflating the apparent rise independent of true incidence.
- **Provisional years:** none flagged
- **Method & caveats:** Annual reported chlamydia incidence from NCHS and CDC NNDSS. National notification is specified from 1995 in the dispatch; IDNotif itself says not notifiable before 1994 and includes 1994. NAAT adoption increased detection sensitivity during the 2000s. Rates through 2019 are NCHS's; rates from 2020 are the NNDSS final count divided by the Census July 1 resident population (FRED POPTHM), using a later population vintage (about 1% higher denominator). This is not always the same construction: IDNotif excludes populations of jurisdictions where a disease was not notifiable or data were unavailable; STD rates before 1991 use civilian population. Selected years before 1988 are not interpolated.

## Congenital syphilis (`congenitalSyphilisCases`)

- **Publisher:** NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER
- **Source URL:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus20-21tables/IDNotif.xlsx
- **Also:** https://wonder.cdc.gov/nndss-annual-summary.html
- **Also:** https://fred.stlouisfed.org/series/POPTHM
- **Unit:** reported cases
- **Cadence:** annual · annual rule: annual (publisher) · class: incidence
- **Coverage:** 1950–2023
- **Breaks:** 2015/2018 case-definition revisions; 1995 restriction to cases under age one.
- **Provisional years:** none flagged
- **Method & caveats:** Annual reported counts from IDNotif through 2019 and WONDER 'Syphilis, Congenital' for 2020–2023. IDNotif's congenital-syphilis rate is per 100,000 live births, unlike the total-population denominator used for other rows. This dataset does not fetch live births, so it ships counts only to avoid silently mixing denominators. Starting in 1995, IDNotif reports cases under age one only. Case definitions changed in 2015 and 2018. The population-based rate construction described for companion series does not apply to this count series. IDNotif and WONDER overlap counts differ by roughly 2% in 2016–2018 (641 vs. 628, 941 vs. 918, and 1,323 vs. 1,306 respectively; 2019 matches at 1,870), consistent with normal cross-publication revisions; this series uses IDNotif through 2019 and WONDER from 2020.

## Gonorrhea (`gonorrheaRate`)

- **Publisher:** NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER
- **Source URL:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus20-21tables/IDNotif.xlsx
- **Also:** https://wonder.cdc.gov/nndss-annual-summary.html
- **Also:** https://fred.stlouisfed.org/series/POPTHM
- **Unit:** reported cases per 100,000 population
- **Cadence:** annual · annual rule: annual (publisher) · class: incidence
- **Coverage:** 1950–2023
- **Breaks:** none known beyond ordinary reporting-completeness changes.
- **Provisional years:** none flagged
- **Method & caveats:** Annual reported gonorrhea incidence from NCHS and CDC NNDSS. IDNotif excludes Georgia in 1994. Rates through 2019 are NCHS's; rates from 2020 are the NNDSS final count divided by the Census July 1 resident population (FRED POPTHM), using a later population vintage (about 1% higher denominator). This is not always the same construction: IDNotif excludes populations of jurisdictions where a disease was not notifiable or data were unavailable; STD rates before 1991 use civilian population. Selected years before 1988 are not interpolated.

## Acute hepatitis A viral infection (`hepAAcuteRate`)

- **Publisher:** NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER
- **Source URL:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus20-21tables/IDNotif.xlsx
- **Also:** https://wonder.cdc.gov/nndss-annual-summary.html
- **Also:** https://fred.stlouisfed.org/series/POPTHM
- **Unit:** reported cases per 100,000 population
- **Cadence:** annual · annual rule: annual (publisher) · class: incidence
- **Coverage:** 1970–2023
- **Breaks:** 2012 and 2019 case-definition revisions.
- **Provisional years:** none flagged
- **Method & caveats:** Annual reported acute hepatitis A incidence from NCHS and CDC NNDSS. Case definitions changed in 2012 and 2019. Rates through 2019 are NCHS's; rates from 2020 are the NNDSS final count divided by the Census July 1 resident population (FRED POPTHM), using a later population vintage (about 1% higher denominator). This is not always the same construction: IDNotif excludes populations of jurisdictions where a disease was not notifiable or data were unavailable; STD rates before 1991 use civilian population. Selected years before 1988 are not interpolated.

## Acute hepatitis B viral infection (`hepBAcuteRate`)

- **Publisher:** NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER
- **Source URL:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus20-21tables/IDNotif.xlsx
- **Also:** https://wonder.cdc.gov/nndss-annual-summary.html
- **Also:** https://fred.stlouisfed.org/series/POPTHM
- **Unit:** reported cases per 100,000 population
- **Cadence:** annual · annual rule: annual (publisher) · class: incidence
- **Coverage:** 1970–2023
- **Breaks:** 2012 case-definition revision.
- **Provisional years:** none flagged
- **Method & caveats:** Annual reported acute hepatitis B incidence from NCHS and CDC NNDSS; chronic infection is excluded. The case definition changed in 2012. Rates through 2019 are NCHS's; rates from 2020 are the NNDSS final count divided by the Census July 1 resident population (FRED POPTHM), using a later population vintage (about 1% higher denominator). This is not always the same construction: IDNotif excludes populations of jurisdictions where a disease was not notifiable or data were unavailable; STD rates before 1991 use civilian population. Selected years before 1988 are not interpolated.

## Acute hepatitis C viral infection (`hepCAcuteRate`)

- **Publisher:** NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER
- **Source URL:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus20-21tables/IDNotif.xlsx
- **Also:** https://wonder.cdc.gov/nndss-annual-summary.html
- **Also:** https://fred.stlouisfed.org/series/POPTHM
- **Unit:** reported cases per 100,000 population
- **Cadence:** annual · annual rule: annual (publisher) · class: incidence
- **Coverage:** 1990–2023
- **Breaks:** Anti-HCV antibody test available from May 1990 (no data before); 2016 and 2020 case-definition revisions added probable-case criteria.
- **Provisional years:** none flagged
- **Method & caveats:** Annual reported acute hepatitis C incidence from NCHS and CDC NNDSS; chronic infection is excluded. Anti-HCV testing became available in May 1990; probable-case criteria changed in 2016 and 2020. IDNotif reports 45 reporting jurisdictions in 2019. Rates through 2019 are NCHS's; rates from 2020 are the NNDSS final count divided by the Census July 1 resident population (FRED POPTHM), using a later population vintage (about 1% higher denominator). This is not always the same construction: IDNotif excludes populations of jurisdictions where a disease was not notifiable or data were unavailable; STD rates before 1991 use civilian population. Selected years before 1988 are not interpolated.

## Haemophilus influenzae, invasive disease, all serotypes, all ages (`hibRate`)

- **Publisher:** NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER
- **Source URL:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus20-21tables/IDNotif.xlsx
- **Also:** https://wonder.cdc.gov/nndss-annual-summary.html
- **Also:** https://fred.stlouisfed.org/series/POPTHM
- **Unit:** reported cases per 100,000 population
- **Cadence:** annual · annual rule: annual (publisher) · class: incidence
- **Coverage:** 1991–2023
- **Breaks:** none known beyond ordinary reporting-completeness changes; this row is all serotypes and all ages, not the Hib-only pediatric subset.
- **Provisional years:** none flagged
- **Method & caveats:** Annual reported invasive Haemophilus influenzae incidence from NCHS and CDC NNDSS, all serotypes and all ages. Despite the short key, this is not the Hib-only pediatric subset. Rates through 2019 are NCHS's; rates from 2020 are the NNDSS final count divided by the Census July 1 resident population (FRED POPTHM), using a later population vintage (about 1% higher denominator). This is not always the same construction: IDNotif excludes populations of jurisdictions where a disease was not notifiable or data were unavailable; STD rates before 1991 use civilian population. Selected years before 1988 are not interpolated.

## Lyme disease (`lymeRate`)

- **Publisher:** NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER
- **Source URL:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus20-21tables/IDNotif.xlsx
- **Also:** https://wonder.cdc.gov/nndss-annual-summary.html
- **Also:** https://fred.stlouisfed.org/series/POPTHM
- **Unit:** reported cases per 100,000 population
- **Cadence:** annual · annual rule: annual (publisher) · class: incidence
- **Coverage:** 2008–2023
- **Breaks:** 2022 CSTE case-definition revision: CDC states 2022 data are not directly comparable with earlier years.
- **Provisional years:** none flagged
- **Method & caveats:** Annual reported Lyme disease incidence from NCHS and CDC NNDSS, including probable cases when reported. IDNotif lists revisions in 2008, 2011, and 2017; CDC states 2022 is not directly comparable with earlier years following the 2022 revision. Rates through 2019 are NCHS's; rates from 2020 are the NNDSS final count divided by the Census July 1 resident population (FRED POPTHM), using a later population vintage (about 1% higher denominator). This is not always the same construction: IDNotif excludes populations of jurisdictions where a disease was not notifiable or data were unavailable; STD rates before 1991 use civilian population. Selected years before 1988 are not interpolated.

## Measles (rubeola) (`measlesRate`)

- **Publisher:** NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER
- **Source URL:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus20-21tables/IDNotif.xlsx
- **Also:** https://wonder.cdc.gov/nndss-annual-summary.html
- **Also:** https://fred.stlouisfed.org/series/POPTHM
- **Unit:** reported cases per 100,000 population
- **Cadence:** annual · annual rule: annual (publisher) · class: incidence
- **Coverage:** 1950–2026
- **Breaks:** 2021 NNDSS modernization; import/indigenous split not used.
- **Provisional years:** none flagged
- **Method & caveats:** Annual reported measles incidence from NCHS and CDC NNDSS, without separating imported and indigenous cases. Rates through 2019 are NCHS's; rates from 2020 are the NNDSS final count divided by the Census July 1 resident population (FRED POPTHM), using a later population vintage (about 1% higher denominator). This is not always the same construction: IDNotif excludes populations of jurisdictions where a disease was not notifiable or data were unavailable; STD rates before 1991 use civilian population. Selected years before 1988 are not interpolated. The 2024 and 2025 values are the measles program's full-year confirmed-case counts from its Cases and Outbreaks page (read 2026-09-09), which CDC itself cites as the annual totals and which can differ by a few cases from the NNDSS annual table once finalized; 2026 is the count reported as of 2026-09-03, a year-to-date figure, not a full year.

## Meningococcal disease (`meningococcalRate`)

- **Publisher:** NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER
- **Source URL:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus20-21tables/IDNotif.xlsx
- **Also:** https://wonder.cdc.gov/nndss-annual-summary.html
- **Also:** https://fred.stlouisfed.org/series/POPTHM
- **Unit:** reported cases per 100,000 population
- **Cadence:** annual · annual rule: annual (publisher) · class: incidence
- **Coverage:** 1970–2023
- **Breaks:** 2015 case-definition revision.
- **Provisional years:** none flagged
- **Method & caveats:** Annual reported meningococcal disease incidence, all serogroups, from NCHS and CDC NNDSS. The case definition changed in 2015. Rates through 2019 are NCHS's; rates from 2020 are the NNDSS final count divided by the Census July 1 resident population (FRED POPTHM), using a later population vintage (about 1% higher denominator). This is not always the same construction: IDNotif excludes populations of jurisdictions where a disease was not notifiable or data were unavailable; STD rates before 1991 use civilian population. Selected years before 1988 are not interpolated.

## Mumps (`mumpsRate`)

- **Publisher:** NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER
- **Source URL:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus20-21tables/IDNotif.xlsx
- **Also:** https://wonder.cdc.gov/nndss-annual-summary.html
- **Also:** https://fred.stlouisfed.org/series/POPTHM
- **Unit:** reported cases per 100,000 population
- **Cadence:** annual · annual rule: annual (publisher) · class: incidence
- **Coverage:** 1970–2023
- **Breaks:** 2012 case-definition revision.
- **Provisional years:** none flagged
- **Method & caveats:** Annual reported mumps incidence from NCHS and CDC NNDSS. The case definition changed in 2012. Rates through 2019 are NCHS's; rates from 2020 are the NNDSS final count divided by the Census July 1 resident population (FRED POPTHM), using a later population vintage (about 1% higher denominator). This is not always the same construction: IDNotif excludes populations of jurisdictions where a disease was not notifiable or data were unavailable; STD rates before 1991 use civilian population. Selected years before 1988 are not interpolated.

## Pertussis (whooping cough) (`pertussisRate`)

- **Publisher:** NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER
- **Source URL:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus20-21tables/IDNotif.xlsx
- **Also:** https://wonder.cdc.gov/nndss-annual-summary.html
- **Also:** https://fred.stlouisfed.org/series/POPTHM
- **Unit:** reported cases per 100,000 population
- **Cadence:** annual · annual rule: annual (publisher) · class: incidence
- **Coverage:** 1950–2023
- **Breaks:** 2020 CSTE case-definition revision (probable case criteria changed); probable cases added 1997.
- **Provisional years:** none flagged
- **Method & caveats:** Annual reported pertussis incidence from NCHS and CDC NNDSS. Probable cases were added in 1997; probable-case criteria changed in 2020. Rates through 2019 are NCHS's; rates from 2020 are the NNDSS final count divided by the Census July 1 resident population (FRED POPTHM), using a later population vintage (about 1% higher denominator). This is not always the same construction: IDNotif excludes populations of jurisdictions where a disease was not notifiable or data were unavailable; STD rates before 1991 use civilian population. Selected years before 1988 are not interpolated.

## Salmonellosis (excluding Salmonella Typhi and Salmonella Paratyphi infections) (`salmonellosisRate`)

- **Publisher:** NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER
- **Source URL:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus20-21tables/IDNotif.xlsx
- **Also:** https://wonder.cdc.gov/nndss-annual-summary.html
- **Also:** https://fred.stlouisfed.org/series/POPTHM
- **Unit:** reported cases per 100,000 population
- **Cadence:** annual · annual rule: annual (publisher) · class: incidence
- **Coverage:** 1960–2023
- **Breaks:** Culture-independent diagnostic tests (CIDTs) adopted from roughly 2012 onward raised detection without necessarily changing true incidence; paratyphoid excluded starting in 2018.
- **Provisional years:** none flagged
- **Method & caveats:** Annual reported salmonellosis incidence from NCHS and CDC NNDSS. The workbook includes paratyphoid before 2018; label variants are resolved separately for each year. CIDTs increased detection from roughly 2012 without necessarily changing true incidence. Rates through 2019 are NCHS's; rates from 2020 are the NNDSS final count divided by the Census July 1 resident population (FRED POPTHM), using a later population vintage (about 1% higher denominator). This is not always the same construction: IDNotif excludes populations of jurisdictions where a disease was not notifiable or data were unavailable; STD rates before 1991 use civilian population. Selected years before 1988 are not interpolated.

## Syphilis, Primary and secondary (`syphilisPsRate`)

- **Publisher:** NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER
- **Source URL:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus20-21tables/IDNotif.xlsx
- **Also:** https://wonder.cdc.gov/nndss-annual-summary.html
- **Also:** https://fred.stlouisfed.org/series/POPTHM
- **Unit:** reported cases per 100,000 population
- **Cadence:** annual · annual rule: annual (publisher) · class: incidence
- **Coverage:** 1950–2023
- **Breaks:** 2018 CSTE case-definition revision; congenital syphilis excluded from this row.
- **Provisional years:** none flagged
- **Method & caveats:** Annual reported primary and secondary syphilis incidence from NCHS and CDC NNDSS; congenital and other stages are excluded. The case definition changed in 2018. Rates through 2019 are NCHS's; rates from 2020 are the NNDSS final count divided by the Census July 1 resident population (FRED POPTHM), using a later population vintage (about 1% higher denominator). This is not always the same construction: IDNotif excludes populations of jurisdictions where a disease was not notifiable or data were unavailable; STD rates before 1991 use civilian population. Selected years before 1988 are not interpolated.

## Tuberculosis (`tbRate`)

- **Publisher:** NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER
- **Source URL:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus20-21tables/IDNotif.xlsx
- **Also:** https://wonder.cdc.gov/nndss-annual-summary.html
- **Also:** https://fred.stlouisfed.org/series/POPTHM
- **Unit:** reported cases per 100,000 population
- **Cadence:** annual · annual rule: annual (publisher) · class: incidence
- **Coverage:** 1960–2023
- **Breaks:** Reporting began 1953; pre-1975 reporting-criteria break; 2009 CSTE case-definition update.
- **Provisional years:** none flagged
- **Method & caveats:** Annual reported tuberculosis incidence from NCHS and CDC NNDSS. Reporting began in 1953; the workbook also cautions that pre-1975 reporting criteria differ. Rates through 2019 are NCHS's; rates from 2020 are the NNDSS final count divided by the Census July 1 resident population (FRED POPTHM), using a later population vintage (about 1% higher denominator). This is not always the same construction: IDNotif excludes populations of jurisdictions where a disease was not notifiable or data were unavailable; STD rates before 1991 use civilian population. Selected years before 1988 are not interpolated.

## COVID-19 deaths (`covidDeaths`)

- **Publisher:** National Center for Health Statistics, Provisional COVID-19 Death Counts by Week Ending Date and State
- **Source URL:** https://data.cdc.gov/resource/r8kw-7aab.json
- **Also:** https://data.cdc.gov/resource/6rkc-nb2q.json
- **Also:** https://data.cdc.gov/resource/489q-934x.json
- **Unit:** deaths
- **Cadence:** annual · annual rule: annual (publisher) · class: mortality
- **Coverage:** 2020–2026
- **Breaks:** Disease did not exist before 2020; ICD code U07.1 introduced 2020.
- **Provisional years:** 2026
- **Method & caveats:** Weekly provisional COVID-19 death counts by week-ending date are summed to calendar year here, assigning each whole week to the year its ending date falls in. NCHS revises recent weeks upward as death certificates are processed, so the most recent 1–2 years may rise on a later refresh. The provisional flag identifies the latest calendar year when fewer than 52 weeks are present; revisions are ongoing, not a one-time event, and unflagged recent years can also change. This series begins in 2020 by definition.

## Influenza and pneumonia (`fluPneumoniaDeathRate`)

- **Publisher:** NCHS Health, United States (Table SlctMort) · CDC WONDER Underlying Cause of Death (final)
- **Source URL:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus20-21tables/SlctMort.xlsx
- **Also:** https://data.cdc.gov/resource/6rkc-nb2q.json
- **Also:** https://data.cdc.gov/resource/489q-934x.json
- **Unit:** age-adjusted deaths per 100,000 population (2000 U.S. standard population)
- **Cadence:** annual · annual rule: annual (publisher) · class: mortality
- **Coverage:** 1900–2024
- **Breaks:** ICD-10 adopted for cause-of-death coding starting with 1999 data (comparability ratio applies to years spanning the change); age-adjusted to the year 2000 standard population.
- **Provisional years:** none flagged
- **Method & caveats:** NCHS age-adjusted death rate: the NCHS historical table (data.cdc.gov 6rkc-nb2q) for 1900–2018, Health, United States Table SlctMort for 2019, and CDC WONDER Underlying Cause of Death final data for 2020–2024 (read through a real browser and checked in; its 2018–2019 values equal the Health US table). If a later year exists only in the NCHS VSRR provisional quarterly series it is added flagged provisional. Rates use the 2000 U.S. standard population; the 1999 ICD-10 transition requires comparability consideration. The two NCHS long-run mortality tables (6rkc-nb2q and SlctMort) differ by up to 0.4 per 100,000 for 1991–1997, a normal cross-publication revision.

## Human immunodeficiency virus (HIV) disease (`hivDeathRate`)

- **Publisher:** NCHS Health, United States (Table SlctMort) · CDC WONDER Underlying Cause of Death (final)
- **Source URL:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus20-21tables/SlctMort.xlsx
- **Also:** https://data.cdc.gov/resource/6rkc-nb2q.json
- **Also:** https://data.cdc.gov/resource/489q-934x.json
- **Unit:** age-adjusted deaths per 100,000 population (2000 U.S. standard population)
- **Cadence:** annual · annual rule: annual (publisher) · class: mortality
- **Coverage:** 1987–2024
- **Breaks:** ICD-10 adopted for cause-of-death coding starting with 1999 data; age-adjusted to the year 2000 standard population.
- **Provisional years:** none flagged
- **Method & caveats:** NCHS age-adjusted death rate from HIV disease: Health, United States Table SlctMort for 1987–2019 and CDC WONDER Underlying Cause of Death final data for 2020–2024 (read through a real browser and checked in; its 2018–2019 values equal the Health US table). If a later year exists only in the NCHS VSRR provisional quarterly series it is added flagged provisional. Rates use the 2000 U.S. standard population; cause coding changed to ICD-10 in 1999.

## Combined 7-vaccine series, children 19–35 months (`childCombined7_1935`)

- **Publisher:** CDC NIS-Child, Health, United States Table 031 (1998–2017) and the HUS 2011 trend table (1995–1997)
- **Source URL:** https://data.cdc.gov/resource/nkri-ptxd.json
- **Also:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus18tables/Table031.xlsx
- **Unit:** percent
- **Cadence:** annual · annual rule: annual (publisher) · class: coverage
- **Coverage:** 2009–2017
- **Breaks:** 2011 NIS-Child added a cell-phone sample to the historically landline-only frame; series ends 2017 when NCIRD moved routine reporting to birth-cohort estimates.
- **Provisional years:** none flagged
- **Method & caveats:** Share completing the combined series covering DTaP, polio, MMR, Hib, hepatitis B, varicella, and PCV. CDC NIS-Child estimates for children 19–35 months are assigned to survey year. A cell-phone sample was added in 2011. This series ends in 2017 and must not be spliced to the birth-cohort series at 24 months.

## Combined 7-vaccine series by 24 months (`childCombined7_24mo`)

- **Publisher:** CDC NIS-Child (ChildVaxView), National Immunization Survey
- **Source URL:** https://data.cdc.gov/resource/fhky-rtsk.json
- **Unit:** percent
- **Cadence:** annual · annual rule: annual (publisher) · class: coverage
- **Coverage:** 2011–2022
- **Breaks:** Different instrument and cohort definition than the paired 19–35-month series (birth-year cohort at exactly 24 months vs. survey-year snapshot of children 19–35 months); the two are a paired comparison, not a continuous series.
- **Provisional years:** none flagged
- **Method & caveats:** CDC NIS-Child share completing the combined series covering DTaP, polio, MMR, Hib, hepatitis B, varicella, and PCV by age 24 months. Cohort is the birth year (children by age 24 months, by birth year). This is a paired comparison with the survey-year 19–35-month series, not a continuation of it.

## DTaP ≥4 doses, children 19–35 months (`childDtap4_1935`)

- **Publisher:** CDC NIS-Child, Health, United States Table 031 (1998–2017) and the HUS 2011 trend table (1995–1997)
- **Source URL:** https://data.cdc.gov/resource/nkri-ptxd.json
- **Also:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus18tables/Table031.xlsx
- **Unit:** percent
- **Cadence:** annual · annual rule: annual (publisher) · class: coverage
- **Coverage:** 1995–2017
- **Breaks:** 2011 NIS-Child added a cell-phone sample to the historically landline-only frame; series ends 2017 when NCIRD moved routine reporting to birth-cohort estimates.
- **Provisional years:** none flagged
- **Method & caveats:** Share receiving at least four diphtheria, tetanus, and acellular pertussis doses. CDC NIS-Child estimates for children 19–35 months are assigned to survey year. A cell-phone sample was added in 2011. This series ends in 2017 and must not be spliced to the birth-cohort series at 24 months.

## DTaP ≥4 doses by 24 months (`childDtap4_24mo`)

- **Publisher:** CDC NIS-Child (ChildVaxView), National Immunization Survey
- **Source URL:** https://data.cdc.gov/resource/fhky-rtsk.json
- **Unit:** percent
- **Cadence:** annual · annual rule: annual (publisher) · class: coverage
- **Coverage:** 2011–2022
- **Breaks:** Different instrument and cohort definition than the paired 19–35-month series (birth-year cohort at exactly 24 months vs. survey-year snapshot of children 19–35 months); the two are a paired comparison, not a continuous series.
- **Provisional years:** none flagged
- **Method & caveats:** CDC NIS-Child share receiving at least four DTaP doses by age 24 months. Cohort is the birth year (children by age 24 months, by birth year). This is a paired comparison with the survey-year 19–35-month series, not a continuation of it.

## MMR ≥1 dose, children 19–35 months (`childMmr1935`)

- **Publisher:** CDC NIS-Child, Health, United States Table 031 (1998–2017) and the HUS 2011 trend table (1995–1997)
- **Source URL:** https://data.cdc.gov/resource/nkri-ptxd.json
- **Also:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus18tables/Table031.xlsx
- **Unit:** percent
- **Cadence:** annual · annual rule: annual (publisher) · class: coverage
- **Coverage:** 1995–2017
- **Breaks:** 2011 NIS-Child added a cell-phone sample to the historically landline-only frame; series ends 2017 when NCIRD moved routine reporting to birth-cohort estimates.
- **Provisional years:** none flagged
- **Method & caveats:** Share receiving at least one measles, mumps, and rubella vaccine dose. CDC NIS-Child estimates for children 19–35 months are assigned to survey year. A cell-phone sample was added in 2011. This series ends in 2017 and must not be spliced to the birth-cohort series at 24 months.

## MMR ≥1 dose by 24 months (`childMmr24mo`)

- **Publisher:** CDC NIS-Child (ChildVaxView), National Immunization Survey
- **Source URL:** https://data.cdc.gov/resource/fhky-rtsk.json
- **Unit:** percent
- **Cadence:** annual · annual rule: annual (publisher) · class: coverage
- **Coverage:** 2011–2022
- **Breaks:** Different instrument and cohort definition than the paired 19–35-month series (birth-year cohort at exactly 24 months vs. survey-year snapshot of children 19–35 months); the two are a paired comparison, not a continuous series.
- **Provisional years:** none flagged
- **Method & caveats:** CDC NIS-Child share receiving at least one MMR dose by age 24 months. Cohort is the birth year (children by age 24 months, by birth year). This is a paired comparison with the survey-year 19–35-month series, not a continuation of it.

## Seasonal influenza vaccination, ≥65 years, NHIS (`flu65Nhis`)

- **Publisher:** National Health Interview Survey (NHIS), Health, United States Table 068
- **Source URL:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus17tables/table068.xlsx
- **Unit:** percent
- **Cadence:** annual · annual rule: annual (publisher) · class: coverage
- **Coverage:** 1989–2016
- **Breaks:** NHIS instrument in this HUS table run ends 2016; differs from FluVaxView season estimates.
- **Provisional years:** none flagged
- **Method & caveats:** NHIS percentage aged 65 years or older reporting influenza vaccination in the past 12 months, assigned to survey calendar year; this HUS table run ends in 2016. The NHIS past-12-months self-report by calendar year and the FluVaxView season estimate are a paired comparison of two different instruments and must not be spliced into one series.

## Seasonal influenza vaccination, ≥65 years, FluVaxView (`flu65Season`)

- **Publisher:** CDC FluVaxView
- **Source URL:** https://data.cdc.gov/resource/vh55-3he6.json
- **Unit:** percent
- **Cadence:** annual · annual rule: annual (publisher) · class: coverage
- **Coverage:** 2011–2025
- **Breaks:** Different instrument and reference period from flu65Nhis; do not splice.
- **Provisional years:** none flagged
- **Method & caveats:** CDC FluVaxView season estimate for adults aged 65 years or older. The NHIS past-12-months self-report by calendar year and the FluVaxView season estimate are a paired comparison of two different instruments and must not be spliced into one series. Season or school year is mapped to the calendar year it ends (e.g. '2023-24' -> 2024). Uses the maximum cumulative coverage per season, verified against the latest observation in July-to-June month order. The 2009-10 H1N1 season, which FluVaxView reports with three different end-of-season figures per age group, is excluded; the series begins with 2010-11. The 2023-24 season, which the dataset labels differently, is included under the same age group.

## Seasonal influenza vaccination, ≥6 months, national (`fluAllAges`)

- **Publisher:** CDC FluVaxView
- **Source URL:** https://data.cdc.gov/resource/vh55-3he6.json
- **Unit:** percent
- **Cadence:** annual · annual rule: annual (publisher) · class: coverage
- **Coverage:** 2011–2025
- **Breaks:** none known beyond survey and reporting-completeness changes.
- **Provisional years:** none flagged
- **Method & caveats:** CDC FluVaxView national season estimate for people aged at least six months. Season or school year is mapped to the calendar year it ends (e.g. '2023-24' -> 2024). Uses the maximum cumulative coverage per season, verified against the latest observation in July-to-June month order. The 2009-10 H1N1 season, which FluVaxView reports with three different end-of-season figures per age group, is excluded; the series begins with 2010-11. The 2023-24 season, which the dataset labels differently, is included under the same age group.

## Kindergartners with any vaccination exemption (`kindergartenAnyExemption`)

- **Publisher:** CDC School Vaccination Assessment (SchoolVaxView)
- **Source URL:** https://data.cdc.gov/resource/ijqb-a7ye.json
- **Unit:** percent
- **Cadence:** annual · annual rule: annual (publisher) · class: coverage
- **Coverage:** 2010–2026
- **Breaks:** none known beyond state-reporting-completeness changes; national estimate absent for school year 2010-11 (2011 in the year-ending convention).
- **Provisional years:** none flagged
- **Method & caveats:** CDC national school-assessment percentage with dose category 'Any Exemption'. This dataset does not characterize whether a rise or fall in exemptions is good or bad. State reporting completeness can vary. Season or school year is mapped to the calendar year it ends (e.g. '2023-24' -> 2024).

## MMR coverage among kindergartners, national (`kindergartenMmr`)

- **Publisher:** CDC School Vaccination Assessment (SchoolVaxView)
- **Source URL:** https://data.cdc.gov/resource/ijqb-a7ye.json
- **Unit:** percent
- **Cadence:** annual · annual rule: annual (publisher) · class: coverage
- **Coverage:** 2010–2026
- **Breaks:** none known beyond state-reporting-completeness changes; national estimate absent for school year 2010-11 (2011 in the year-ending convention).
- **Provisional years:** none flagged
- **Method & caveats:** CDC national school-assessment MMR coverage among kindergartners. State reporting completeness can vary; the national estimate is absent for 2010-11. Season or school year is mapped to the calendar year it ends (e.g. '2023-24' -> 2024).

## Kindergartners with a non-medical vaccination exemption (`kindergartenNonMedicalExemption`)

- **Publisher:** CDC School Vaccination Assessment (SchoolVaxView)
- **Source URL:** https://data.cdc.gov/resource/ijqb-a7ye.json
- **Unit:** percent
- **Cadence:** annual · annual rule: annual (publisher) · class: coverage
- **Coverage:** 2010–2026
- **Breaks:** none known beyond state-reporting-completeness changes; national estimate absent for school year 2010-11 (2011 in the year-ending convention).
- **Provisional years:** none flagged
- **Method & caveats:** CDC national school-assessment percentage with dose category 'Non-Medical Exemption'. This dataset does not characterize whether a rise or fall in exemptions is good or bad. State reporting completeness can vary. Season or school year is mapped to the calendar year it ends (e.g. '2023-24' -> 2024).

## Pneumococcal vaccination, ≥65 years, CDC adult coverage (`pneumococcal65`)

- **Publisher:** CDC adult vaccination coverage
- **Source URL:** https://data.cdc.gov/resource/aetd-68ew.json
- **Unit:** percent
- **Cadence:** annual · annual rule: annual (publisher) · class: coverage
- **Coverage:** 2008–2024
- **Breaks:** none known; continuity with the historical HUS NHIS series is not assumed.
- **Provisional years:** none flagged
- **Method & caveats:** CDC adult-coverage estimate of pneumococcal vaccination among adults aged 65 years or older, assigned to the publisher's survey calendar year. It is kept separate from the historical NHIS HUS Table 069 series; matching age scope alone does not establish instrument continuity.

## Pneumococcal vaccination, ever received, ≥65 years, NHIS (`pneumococcal65Nhis`)

- **Publisher:** Health, United States Table 069
- **Source URL:** https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/Health_US/hus17tables/table069.xlsx
- **Unit:** percent
- **Cadence:** annual · annual rule: annual (publisher) · class: coverage
- **Coverage:** 1989–2016
- **Breaks:** HUS Table 069 run ends 2016; do not assume continuity with the separate CDC adult-coverage series.
- **Provisional years:** none flagged
- **Method & caveats:** NHIS percentage of adults aged 65 years or older reporting ever receiving pneumococcal vaccination, assigned to survey calendar year. The HUS Table 069 run ends in 2016. This is an ever-received measure rather than vaccination during that year.

## HPV ≥1 dose, females aged 13–17 years (`teenHpv1DoseFemales`)

- **Publisher:** CDC NIS-Teen (TeenVaxView), National Immunization Survey
- **Source URL:** https://data.cdc.gov/resource/ee48-w5t6.json
- **Unit:** percent
- **Cadence:** annual · annual rule: annual (publisher) · class: coverage
- **Coverage:** 2006–2025
- **Breaks:** Different dose definition and sex scope from teenHpvUtd.
- **Provisional years:** none flagged
- **Method & caveats:** CDC NIS-Teen survey-year share of females aged 13–17 years receiving at least one HPV dose. Paired with teenHpvUtd, which uses both a different dose definition (up-to-date) and different sex scope (males and females); these are not one continuous series.

## HPV up-to-date, males and females aged 13–17 years (`teenHpvUtd`)

- **Publisher:** CDC NIS-Teen (TeenVaxView), National Immunization Survey
- **Source URL:** https://data.cdc.gov/resource/ee48-w5t6.json
- **Unit:** percent
- **Cadence:** annual · annual rule: annual (publisher) · class: coverage
- **Coverage:** 2016–2025
- **Breaks:** Different dose definition and sex scope from teenHpv1DoseFemales; use the publisher's up-to-date definition for each survey year.
- **Provisional years:** none flagged
- **Method & caveats:** CDC NIS-Teen survey-year share of males and females aged 13–17 years meeting the publisher's HPV up-to-date definition. Paired with teenHpv1DoseFemales, which measures at least one dose in females only; both dose definition and sex scope differ.

## Tdap ≥1 dose, ages 13–17 years (`teenTdap`)

- **Publisher:** CDC NIS-Teen (TeenVaxView), National Immunization Survey
- **Source URL:** https://data.cdc.gov/resource/ee48-w5t6.json
- **Unit:** percent
- **Cadence:** annual · annual rule: annual (publisher) · class: coverage
- **Coverage:** 2006–2025
- **Breaks:** none known.
- **Provisional years:** none flagged
- **Method & caveats:** CDC NIS-Teen survey-year percentage of adolescents aged 13–17 years receiving at least one tetanus, diphtheria, and acellular pertussis (Tdap) dose. This is a single survey-year coverage series.

_Generated 2026-09-10 by docs.ts._
