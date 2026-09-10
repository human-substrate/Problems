# US Disease & Vaccination

**35 reported-disease incidence, cause-specific mortality, and vaccination-coverage series for the United States, in one machine-readable place, each from its primary publisher.**

Seasons and school years map to the calendar year they end; birth cohorts map to the birth year. Group A incidence rates from 2020 use NNDSS final counts divided by the Census July 1 resident population (FRED POPTHM), multiplied by 100,000; earlier rates are NCHS's. Overlap checks found roughly 1–8% publisher-denominator/rounding differences: two-decimal rounding matters near zero, and IDNotif excludes non-reporting jurisdictions from some denominators. Each affected series' own note gives its applicable denominator and method specifics. Congenital syphilis is counts, not a population-based rate.

The two NIS-Child instruments, children 19–35 months by survey year and children by age 24 months by birth year, are paired, not spliced. The site should show them side by side, never as one continuous line.

Current `provisional` arrays: `covidDeaths` (2026). Year-to-date values: `measlesRate` (2026 through 2026-09). For COVID deaths, the flag marks the latest partial calendar year of NCHS weekly provisional death counts; recent unflagged years can also be revised and are not certified final by the absence of a flag. Influenza/pneumonia and HIV death rates for 2020–2024 are final CDC WONDER values; a year that exists only in the NCHS VSRR provisional series would be flagged provisional.

No sentence in this dataset attributes a movement in disease cases to vaccination or the reverse. That interpretive work belongs to [the research project](../../research/us-disease-vaccination-2026-09/METHODOLOGY.md), not the raw series notes.

## Quick Start

```bash
bun update.ts            # refresh sources and rebuild annual series + index.json
bun docs.ts              # regenerate README.md, SUMMARY.md, source.md
```

Each `series/<key>.json` holds `_meta` (publisher, unit, cadence, class, coverage, method note, breaks, and provisional years where applicable) and `data` (year → value). All series are annual-only; no `native` block is written. Browser-read NNDSS counts are checked in with citations; refreshing the builder does not re-read those pages.

## Series

### Incidence

| Series | Latest | First | Unit | Cadence | Coverage | Publisher |
|---|---|---|---|---|---|---|
| [Chlamydia](series/chlamydiaRate.json) | 488.94 (2023) | 17.42 (1985) | reported cases per 100,000 population | annual | 1985–2023 · 37 pts | NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER |
| [Congenital syphilis](series/congenitalSyphilisCases.json) | 3882 (2023) | 13377 (1950) | reported cases | annual | 1950–2023 · 41 pts | NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER |
| [Gonorrhea](series/gonorrheaRate.json) | 178.34 (2023) | 192.5 (1950) | reported cases per 100,000 population | annual | 1950–2023 · 41 pts | NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER |
| [Acute hepatitis A viral infection](series/hepAAcuteRate.json) | 0.49 (2023) | 27.87 (1970) | reported cases per 100,000 population | annual | 1970–2023 · 39 pts | NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER |
| [Acute hepatitis B viral infection](series/hepBAcuteRate.json) | 0.66 (2023) | 4.08 (1970) | reported cases per 100,000 population | annual | 1970–2023 · 39 pts | NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER |
| [Acute hepatitis C viral infection](series/hepCAcuteRate.json) | 1.64 (2023) | 1.03 (1990) | reported cases per 100,000 population | annual | 1990–2023 · 34 pts | NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER |
| [Haemophilus influenzae, invasive disease, all serotypes, all ages](series/hibRate.json) | 2.02 (2023) | 1.1 (1991) | reported cases per 100,000 population | annual | 1991–2023 · 33 pts | NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER |
| [Lyme disease](series/lymeRate.json) | 26.54 (2023) | 11.67 (2008) | reported cases per 100,000 population | annual | 2008–2023 · 16 pts | NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER |
| [Measles (rubeola)](series/measlesRate.json) | 0.91 (2026; year to date through 2026-09) | 211.01 (1950) | reported cases per 100,000 population | annual | 1950–2026 · 44 pts | NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER |
| [Meningococcal disease](series/meningococcalRate.json) | 0.13 (2023) | 1.23 (1970) | reported cases per 100,000 population | annual | 1970–2023 · 39 pts | NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER |
| [Mumps](series/mumpsRate.json) | 0.13 (2023) | 55.55 (1970) | reported cases per 100,000 population | annual | 1970–2023 · 39 pts | NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER |
| [Pertussis (whooping cough)](series/pertussisRate.json) | 2.09 (2023) | 79.82 (1950) | reported cases per 100,000 population | annual | 1950–2023 · 41 pts | NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER |
| [Salmonellosis (excluding Salmonella Typhi and Salmonella Paratyphi infections)](series/salmonellosisRate.json) | 18.07 (2023) | 3.85 (1960) | reported cases per 100,000 population | annual | 1960–2023 · 40 pts | NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER |
| [Syphilis, Primary and secondary](series/syphilisPsRate.json) | 15.72 (2023) | 16.73 (1950) | reported cases per 100,000 population | annual | 1950–2023 · 41 pts | NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER |
| [Tuberculosis](series/tbRate.json) | 2.86 (2023) | 30.83 (1960) | reported cases per 100,000 population | annual | 1960–2023 · 40 pts | NCHS Health, United States (Table IDNotif) · CDC NNDSS annual summary via WONDER |

### Mortality

| Series | Latest | First | Unit | Cadence | Coverage | Publisher |
|---|---|---|---|---|---|---|
| [COVID-19 deaths](series/covidDeaths.json) | 6178 (2026; provisional) | 367923 (2020) | deaths | annual | 2020–2026 · 7 pts | National Center for Health Statistics, Provisional COVID-19 Death Counts by Week Ending Date and State |
| [Influenza and pneumonia](series/fluPneumoniaDeathRate.json) | 11.2 (2024) | 297.5 (1900) | age-adjusted deaths per 100,000 population (2000 U.S. standard population) | annual | 1900–2024 · 125 pts | NCHS Health, United States (Table SlctMort) · CDC WONDER Underlying Cause of Death (final) |
| [Human immunodeficiency virus (HIV) disease](series/hivDeathRate.json) | 1.2 (2024) | 5.6 (1987) | age-adjusted deaths per 100,000 population (2000 U.S. standard population) | annual | 1987–2024 · 38 pts | NCHS Health, United States (Table SlctMort) · CDC WONDER Underlying Cause of Death (final) |

### Coverage

| Series | Latest | First | Unit | Cadence | Coverage | Publisher |
|---|---|---|---|---|---|---|
| [Combined 7-vaccine series, children 19–35 months](series/childCombined7_1935.json) | 70.4 (2017) | 44.3 (2009) | percent | annual | 2009–2017 · 9 pts | CDC NIS-Child, Health, United States Table 031 (1998–2017) and the HUS 2011 trend table (1995–1997) |
| [Combined 7-vaccine series by 24 months](series/childCombined7_24mo.json) | 69 (2022) | 67.7 (2011) | percent | annual | 2011–2022 · 12 pts | CDC NIS-Child (ChildVaxView), National Immunization Survey |
| [DTaP ≥4 doses, children 19–35 months](series/childDtap4_1935.json) | 83.2 (2017) | 78 (1995) | percent | annual | 1995–2017 · 23 pts | CDC NIS-Child, Health, United States Table 031 (1998–2017) and the HUS 2011 trend table (1995–1997) |
| [DTaP ≥4 doses by 24 months](series/childDtap4_24mo.json) | 80.9 (2022) | 80.7 (2011) | percent | annual | 2011–2022 · 12 pts | CDC NIS-Child (ChildVaxView), National Immunization Survey |
| [MMR ≥1 dose, children 19–35 months](series/childMmr1935.json) | 91.5 (2017) | 90 (1995) | percent | annual | 1995–2017 · 23 pts | CDC NIS-Child, Health, United States Table 031 (1998–2017) and the HUS 2011 trend table (1995–1997) |
| [MMR ≥1 dose by 24 months](series/childMmr24mo.json) | 91.4 (2022) | 90.1 (2011) | percent | annual | 2011–2022 · 12 pts | CDC NIS-Child (ChildVaxView), National Immunization Survey |
| [Seasonal influenza vaccination, ≥65 years, NHIS](series/flu65Nhis.json) | 67.5 (2016) | 30.4 (1989) | percent | annual | 1989–2016 · 25 pts | National Health Interview Survey (NHIS), Health, United States Table 068 |
| [Seasonal influenza vaccination, ≥65 years, FluVaxView](series/flu65Season.json) | 63.8 (2025) | 66.6 (2011) | percent | annual | 2011–2025 · 15 pts | CDC FluVaxView |
| [Seasonal influenza vaccination, ≥6 months, national](series/fluAllAges.json) | 43.8 (2025) | 43 (2011) | percent | annual | 2011–2025 · 15 pts | CDC FluVaxView |
| [Kindergartners with any vaccination exemption](series/kindergartenAnyExemption.json) | 4.2 (2026) | 1.7 (2010) | percent | annual | 2010–2026 · 16 pts | CDC School Vaccination Assessment (SchoolVaxView) |
| [MMR coverage among kindergartners, national](series/kindergartenMmr.json) | 92.4 (2026) | 94.4 (2010) | percent | annual | 2010–2026 · 16 pts | CDC School Vaccination Assessment (SchoolVaxView) |
| [Kindergartners with a non-medical vaccination exemption](series/kindergartenNonMedicalExemption.json) | 4 (2026) | 1.5 (2010) | percent | annual | 2010–2026 · 16 pts | CDC School Vaccination Assessment (SchoolVaxView) |
| [Pneumococcal vaccination, ≥65 years, CDC adult coverage](series/pneumococcal65.json) | 70.3 (2024) | 65.8 (2008) | percent | annual | 2008–2024 · 17 pts | CDC adult vaccination coverage |
| [Pneumococcal vaccination, ever received, ≥65 years, NHIS](series/pneumococcal65Nhis.json) | 66.9 (2016) | 14.1 (1989) | percent | annual | 1989–2016 · 25 pts | Health, United States Table 069 |
| [HPV ≥1 dose, females aged 13–17 years](series/teenHpv1DoseFemales.json) | 78.7 (2025) | 1 (2006) | percent | annual | 2006–2025 · 20 pts | CDC NIS-Teen (TeenVaxView), National Immunization Survey |
| [HPV up-to-date, males and females aged 13–17 years](series/teenHpvUtd.json) | 63.4 (2025) | 43.4 (2016) | percent | annual | 2016–2025 · 10 pts | CDC NIS-Teen (TeenVaxView), National Immunization Survey |
| [Tdap ≥1 dose, ages 13–17 years](series/teenTdap.json) | 88.8 (2025) | 10.8 (2006) | percent | annual | 2006–2025 · 20 pts | CDC NIS-Teen (TeenVaxView), National Immunization Survey |

## Rules this dataset runs on

1. Primary publisher only; aggregators are not data sources.
2. One instrument's repeated measure per series; methodology breaks are explicit.
3. Preserve missing years; do not interpolate or splice paired instruments.
4. Mark provisional years and retain each publisher's revision caveats.
5. No causal attribution between disease incidence and vaccination coverage.

## Provenance

Research project: [research/us-disease-vaccination-2026-09](../../research/us-disease-vaccination-2026-09/METHODOLOGY.md), including the quality filter and year-mapping methodology. Full source list and unabridged method notes: [source.md](source.md).

_Generated 2026-09-10 by docs.ts from index.json and series/*.json (1020 data points)._
