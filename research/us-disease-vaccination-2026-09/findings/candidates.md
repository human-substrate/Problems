# Candidates — every series considered, with its disposition

Rules are numbered as in [METHODOLOGY.md](../METHODOLOGY.md). SHIP = in `Data/US-Disease-And-Vaccination/` and on usstats.io. CUT = not published, with the rule. Values quoted here were read by the lead from the publisher on 2026-09-09 unless marked [lane], in which case a research lane quoted them and the lead did not ship them.

Two of the four lanes (notifiable-disease incidence; infectious-disease mortality) failed before delivering — their runners hit a usage limit — and the lead sourced those lanes directly: the NCHS *Health, United States* trend tables on ftp.cdc.gov, CDC WONDER's NNDSS Annual Summary and Underlying Cause of Death queries read through a real browser, and the NCHS datasets on data.cdc.gov.

## Lane 1 — notifiable-disease incidence (sourced by the lead)

The long-run source is one table: *Health, United States 2020–2021*, Table IDNotif, "Selected nationally notifiable disease rates and number of new cases: United States, selected years 1950–2019" (NCHS; rates per 100,000 and counts, selected years before 1988, annual from 1988). Final counts for 2016–2023 come from CDC WONDER's NNDSS Annual Summary Data 2016–2023 (United States, excluding territories and non-U.S. residents), read by browser and checked in under `data/nndss-annual-2016-2023.json`; the two agree count-for-count on 2016–2019 for every shipped disease (congenital syphilis differs by up to 2% across publications, disclosed). Rates for 2020–2023 are count ÷ Census July 1 resident population (FRED POPTHM); reproducing NCHS's own 2016–2019 rates by that construction lands within 0.02 per 100,000 or 8% (the wide relative band is two-decimal rounding near zero and IDNotif's exclusion of non-reporting jurisdictions from some denominators — both named in the notes).

| Candidate | Publisher / path | Coverage | Sample values | Breaks | Disposition |
|---|---|---|---|---|---|
| Measles | IDNotif + WONDER; 2024–2025 full-year and 2026 YTD from CDC's Measles Cases and Outbreaks page (browser-read, checked in) | 1950–2026 (1950 = 211.01/100k, 319,124 cases) | 2019 = 0.39 (1,275); 2023 = 64 cases; 2024 = 285; 2025 = 2,289; 2026 = 3,134 as of Sep 3 | 2021 NNDSS modernization; program counts vs NNDSS table for 2024→ (disclosed) | **SHIP** `measlesRate` (2026 marked year-to-date) |
| Pertussis | IDNotif + WONDER | 1950–2023 | 1950 = 79.82; 2019 = 5.67 (18,617); 2023 = 7,063 | 1997 probable cases added; 2020 definition | **SHIP** `pertussisRate` |
| Tuberculosis | IDNotif + WONDER | 1960–2023 | 1960 = 30.83; 2019 = 2.72 (8,916); 2023 = 9,633 | 2009 definition update | **SHIP** `tbRate` |
| Syphilis, primary and secondary | IDNotif + WONDER | 1950–2023 | 1950 = 16.73; 2019 = 11.92; 2023 = 52,988 | 2018 definition; civilian population before 1991 | **SHIP** `syphilisPsRate` |
| Congenital syphilis | IDNotif + WONDER | 1950–2023 | 2019 = 1,870; 2023 = 3,882 | denominator is live births, not fetched here | **SHIP** as a count, `congenitalSyphilisCases` |
| Gonorrhea | IDNotif + WONDER | 1950–2023 | 1950 = 192.5; 2019 = 188.4; 2023 = 601,262 | none beyond reporting completeness | **SHIP** `gonorrheaRate` |
| Chlamydia | IDNotif + WONDER | 1985–2023 | 1985 = 17.42; 2019 = 552.84; 2023 = 1,648,444 | nationally notifiable 1995; NAAT adoption | **SHIP** `chlamydiaRate` |
| Lyme disease | IDNotif + WONDER | 2008–2023 (16 y) | 2008 = 11.67; 2019 = 10.69; 2023 = 89,468 | 2008/2011/2017 revisions; **2022 definition — CDC: not comparable with earlier years** | **SHIP** `lymeRate`, 2022→ named as a seam |
| Hepatitis A, acute | IDNotif + WONDER | 1970–2023 | 1970 = 27.87; 2019 = 5.74; 2023 = 1,643 | 2012/2019 definitions | **SHIP** `hepAAcuteRate` |
| Hepatitis B, acute | IDNotif + WONDER | 1970–2023 | 1970 = 4.08; 2019 = 1.09; 2023 = 2,212 | 2012 definition | **SHIP** `hepBAcuteRate` |
| Hepatitis C, acute | IDNotif + WONDER | 1990–2023 | 1990 = 1.03; 2019 = 1.74; 2023 = 5,538 | anti-HCV test from May 1990; 2016/2020 probable criteria; 45 jurisdictions in 2019 | **SHIP** `hepCAcuteRate` |
| Mumps | IDNotif + WONDER | 1970–2023 | 1970 = 55.55; 2019 = 1.15; 2023 = 433 | 2012 definition | **SHIP** `mumpsRate` |
| Meningococcal disease | IDNotif + WONDER | 1970–2023 | 1970 = 1.23; 2019 = 0.11; 2023 = 438 | 2015 definition | **SHIP** `meningococcalRate` |
| Haemophilus influenzae, invasive | IDNotif + WONDER | 1991–2023 | 1991 = 1.1; 2019 = 1.87; 2023 = 6,827 | all serotypes, all ages | **SHIP** `hibRate` |
| Salmonellosis | IDNotif + WONDER (three label spellings across 2016–2023, mapped by year, no year double-counted) | 1960–2023 | 1960 = 3.85; 2019 = 17.78 | culture-independent testing from ~2012 | **SHIP** `salmonellosisRate` |
| Shigellosis, spotted fever rickettsiosis, chancroid, diphtheria, paralytic polio, rubella | IDNotif rows | 1950–2019 | polio 1980 = 4 cases, 2019 = 0; diphtheria 2018 = 1 | — | CUT — rule 3 for the eradicated diseases (a series of zeros), row budget for shigellosis and rickettsiosis; the historical values stay available in the IDNotif workbook the update script downloads |
| HIV diagnoses | WONDER "Human immunodeficiency virus diagnoses" 2016–2023 | 8 y | — | 1993/2008 definitions; diagnosed vs estimated incidence are different instruments | CUT — rule 3 (no long-run diagnoses series machine-readable; the HIV *death* rate ships instead) |
| Varicella, legionellosis, invasive pneumococcal disease, malaria, West Nile, tetanus, rabies | WONDER 2016–2023 only (IDNotif does not carry them) | 8 y | varicella 2023 = 6,896; legionellosis 2023 = 8,101; IPD 2023 = 20,551 | — | CUT — rule 3 |
| COVID-19 cases | WONDER 2020–2023 | 4 y | — | testing-dependent; reporting ended | CUT — rule 3 and rule 2; COVID-19 *deaths* ship |
| NNDSS weekly provisional tables (data.cdc.gov Table II) | Socrata | 2022→ | — | provisional, weekly YTD | not used as a source (rule 7): final annual tables only |

## Lane 2 — vaccination coverage and exemptions

| Candidate | Publisher / path | Labeling | Coverage | Sample values | Breaks | Disposition |
|---|---|---|---|---|---|---|
| Kindergarten MMR coverage | School Vaccination Assessment, data.cdc.gov `ijqb-a7ye`, geography = "United States" (the "U.S. Median" row is ignored) | school year → year it ends | 2010–2026, 2011 absent (no national estimate) | 2009-10 = 94.4; 2023-24 = 92.7; 2025-26 = 92.4 | state reporting completeness | **SHIP** `kindergartenMmr` |
| Kindergarten any exemption / non-medical exemption | same | same | 2010–2026 | any: 2009-10 = 1.7, 2025-26 = 4.2; non-medical 2025-26 = 4.0 | same | **SHIP** `kindergartenAnyExemption`, `kindergartenNonMedicalExemption` (medical exemptions, ~0.2–0.3%, cut for row budget) |
| Kindergarten DTaP, polio, varicella, hepatitis B | same | same | 2010–2026 | DTaP 2025-26 = 92.0 | — | CUT — row budget; MMR carries the kindergarten story and the three move together |
| NIS-Child, children 19–35 months by survey year | HUS 2011 trend table (`nkri-ptxd`, integers, 1995–1997 used) + HUS 2018 Table 31 (1998–2017) | survey year | 1995–2017 | MMR ≥1: 1995 = 90, 2017 = 91.5; DTaP ≥4: 78 → 83.2; 7-series 2009 = 44.3 → 2017 = 70.4 | 2011 dual landline/cell frame; series closed 2017 | **SHIP** `childMmr1935`, `childDtap4_1935`, `childCombined7_1935` as pair partners |
| NIS-Child by age 24 months, by birth year | `fhky-rtsk`, dimension "24 Months", single birth years only | birth year | born 2011–2022 | MMR 90.1 → 91.4; DTaP ≥4 80.7 → 80.9; 7-series 67.7 → 69.0 | different instrument from the survey-year series; interviews cell-phone-only from 2018 | **SHIP** `childMmr24mo`, `childDtap4_24mo`, `childCombined7_24mo` as pair primaries (12 cohorts, rule 3 narrow miss taken) |
| NIS-Child polio, hepatitis B, Hib, PCV, varicella, hepatitis A, rotavirus, flu | both instruments | — | — | — | CUT — row budget; MMR, DTaP, and the 7-vaccine series carry the childhood story |
| Zero-dose share | MMWR text only | — | — | 1.3% for 2015–16 cohorts [lane] | — | CUT — rule 5 (no table) |
| NIS-Teen Tdap, MenACWY, HPV ≥1 dose (girls), HPV up-to-date | `ee48-w5t6`, dimension "13-17 Years" | survey year | 2006–2025 (up-to-date 2016–2025) | Tdap 10.8 → 88.8; MenACWY 11.7 → 89.0; HPV ≥1 girls 1.0 → 78.7; UTD 43.4 → 63.4 | 2013/2014 adequate-provider-data changes; 2011 dual frame; 2018 cell-only | **SHIP** `teenTdap`, `teenHpv1DoseFemales` (+ `teenHpvUtd` as partner); MenACWY cut for row budget (moves with Tdap) |
| FluVaxView ≥6 months, ≥65 | `vh55-3he6`, month 5 (end of season), national | season → year it ends | 2011–2025 | ≥65: 2010-11 = 66.6, 2024-25 = 63.8; all ages 43.0 → 43.8 | 2009-10 excluded (H1N1, three figures per group); 2023-24 rows carry different labels (aliased) | **SHIP** `fluAllAges`, `flu65Season` |
| FluVaxView ≥18, children 6 mo–17 | same | same | 2011–2025 | adults 2024-25 = 41.9 | — | CUT — row budget |
| NHIS ≥65 influenza and pneumococcal vaccination | HUS 2017 Tables 68/69 (ftp.cdc.gov) | calendar year | 1989–2016 | flu 30.4 → 67.5; pneumococcal 14.1 → 66.9 | 1997 questionnaire; item dropped from HUS after 2016 | **SHIP** as pair partners `flu65Nhis`, `pneumococcal65Nhis` |
| BRFSS adult pneumococcal ≥65 | `aetd-68ew`, dimension ">=65 Years", Overall | year | 2008–2024 | 65.8 → 70.3 | BRFSS 2011 cell-phone + raking | **SHIP** `pneumococcal65` |
| Adult Tdap, zoster | same | year | triennial 2013–2023 | Tdap ≥18 2022 = 39.1 | — | CUT — rule 3 (four readings) |
| Pregnant women (flu, Tdap) `h7pm-wmjc`; health-care personnel flu `xerk-pcm8` | Socrata | season | 2012–2022; 2013-14–2020-21 | 55.8 / 77.4; 85.9 [lane] | — | CUT — rule 3 (stale) |
| COVID-19 vaccination (NIS-ACM) | `ksfb-ug5d` and predecessors | season | three comparable seasons | 2023-24 = 22.9, 2024-25 = 23.1, 2025-26 = 17.5 [lane] | instrument changed 2021→2023 | CUT — rules 2 and 3 (rider: fewer than five comparable seasons) |
| RSV vaccination | NIS-ACM | season | two seasons | — | — | CUT — rider |
| US Immunization Survey 1967–1985 | MMWR figure only | — | — | — | — | CUT — rules 4 and 5 |

## Lane 3 — infectious-disease mortality (sourced by the lead)

| Candidate | Publisher / path | Coverage | Sample values | Breaks | Disposition |
|---|---|---|---|---|---|
| Influenza and pneumonia, age-adjusted death rate | NCHS `6rkc-nb2q` 1900–2018 (matches HUS SlctMort to the decimal on every checked year); SlctMort 2019; WONDER Underlying Cause of Death 2018–2024 (final) read by browser for 2020–2024 | 1900–2024 | 1918 = 612.4; 1950 = 48.1; 2018 = 14.9; 2019 = 12.3 | ICD-10 from 1999; 2000 standard population; 1991–1997 differ ≤0.4 between the two NCHS tables | **SHIP** `fluPneumoniaDeathRate` |
| HIV disease, age-adjusted death rate | SlctMort 1987–2019 + WONDER final 2020–2024 | 1987–2024 | 1995 = 16.2; 2019 = 1.4 | ICD-10 1999 | **SHIP** `hivDeathRate` |
| COVID-19 deaths | NCHS weekly provisional death counts `r8kw-7aab`, national, summed by week-ending date | 2020–2026 | 2020 = 367,923; 2021 = 471,027; 2024 = 47,494 | disease began 2020 (rider); recent weeks revise upward | **SHIP** `covidDeaths` (partial current year flagged) |
| Septicemia, viral hepatitis deaths, tuberculosis deaths | NCHS | — | — | — | CUT — no long-run table on a reachable path this run; revisit with WONDER |
| Total infectious-disease mortality | — | — | — | — | does not exist as an NCHS series |

## Lane 4 — outbreaks, resistance, healthcare infection, confidence polls

| Candidate | Publisher | Coverage | Sample | Disposition |
|---|---|---|---|---|
| Foodborne outbreaks reported to NORS | data.cdc.gov `5xkq-dg7x` | food mode 1998–2023 | 2023 = 577; 2009 = 669; 1998 = 1,317 [lane] | CUT — 2009 eFORS→NORS break (CDC cautions against comparison) and 2023 latest; the strongest revisit candidate |
| Flu-associated pediatric deaths by season | FluView app; NNDSS weekly 2022→ | 2004-05→ | 2024-25 = 280 initial [lane] | CUT — rule 4 (no fetchable table; app data call unresolved) |
| Measles outbreaks per year | CDC page text | scattered | 2025 = 48 outbreaks | CUT — rule 4 (no table) |
| FoodNet incidence | 10-site network | 1996→ | Salmonella 2024 = 18.0 [lane] | CUT — sentinel, not national |
| HAI standardized infection ratios | NHSN | 2015→ | CLABSI 2023 = 0.72 [lane] | CUT — rule 3 (baseline rebase caps at 10 y) |
| Antibiotic prescriptions per 1,000 | CDC/IQVIA | 2011–2024 | 2024 = 752 [lane] | CUT — rule 3 (14 y) and 2017–18 method change |
| Candida auris clinical cases | CDC | 2016–2024 | 2024 = 6,304 [lane] | CUT — rule 3 |
| AR Threats Report | CDC | 3 editions | — | CUT — rules 2, 3 |
| RSV-NET hospitalization rate | `29hc-w46k` | 8 seasons | 2024-25 = 54.3 [lane] | CUT — sentinel; rule 3 |
| Human rabies | CDC/JAVMA | annual | 2024 = 4 [lane] | CUT — rule 4; single-case noise |
| Gallup "important to vaccinate children" (4 readings), Gallup autism belief (3), Pew MMR benefits (4), KFF items (≤3), GSS/ANES items (≤3) | survey organizations | — | Gallup 2024 = 69% extremely/very important; Pew 2025 = 84% benefits outweigh risks [lane] | CUT — rule 8 (fewer than five identical readings); Pew becomes eligible at its next wave |
| VAERS report counts | CDC/FDA | 1990→ | — | CUT — reports are not adverse-event incidence; no published annual count table |
| NCSL exemption legislation | NCSL | 2021→ | — | CUT — not a series |
| Estimated flu burden | CDC model | 2010-11→ | — | CUT — rule 8 (estimate; no fetchable table) |

## Freshness misses taken, named

Notifiable-disease series end at 2023, the last year in WONDER's finalized annual summary; the weekly provisional tables were not used to manufacture 2024 and 2025 (measles alone carries 2024–2026 from the measles program's own published totals, labelled). The NIS-Child birth-cohort series ends with children born in 2022, the latest cohort assessed at 24 months. The NHIS adult items end in 2016 because NCHS retired them from *Health, United States*; they ship only as partners beside the current instruments.
