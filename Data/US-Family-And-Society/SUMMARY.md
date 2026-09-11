# US Family and Society: Executive Summary

---

## 🎯 BEST ESTIMATE

| Metric | Value | Where it sits in its own history | Source |
|--------|-------|----------------------------------|--------|
| **Married-couple households** | **46.63%** (2025) | the lowest of 80 readings since 1940 | U.S. Census Bureau, historical family and living-arrangement tables |
| **One-person households** | **29.48%** (2025) | the highest of 66 readings since 1960 | U.S. Census Bureau, historical family and living-arrangement tables |
| **Median age at first marriage, men** | **30.8 yrs** (2025) | the highest of 85 readings since 1890 | U.S. Census Bureau, historical family and living-arrangement tables |
| **Children living with two parents** | **70.4%** (2025) | 31 of 59 readings since 1960 were higher | U.S. Census Bureau, historical family and living-arrangement tables |
| **One-parent families with own children under 18** | **30.51%** (2025) | 10 of 76 readings since 1950 were higher | U.S. Census Bureau, historical family and living-arrangement tables |
| **Unmarried opposite-sex couples, direct measure** | **9,481k** (2023) | 2 of 28 readings since 1996 were higher | U.S. Census Bureau, historical family and living-arrangement tables |
| **Moved residence in the preceding year** | **7.8%** (2023) | the lowest of 68 readings since 1948 | U.S. Census Bureau, CPS ASEC Geographic Mobility Table A-1 |
| **Live births** | **3,628,934** (2024) | 61 of 116 readings since 1909 were higher | CDC/NCHS, Births and General Fertility Rates: United States, extended by NVSR 75-2 Table 1 |
| **Mean age of mother at first live birth** | **27.6 yrs** (2024) | the highest of 46 readings since 1970 | CDC/NCHS, National Vital Statistics Reports (mean age of mother, by live-birth order) |
| **Children in foster care on September 30** | **331,747** (2025) | 15 of 17 readings since 2009 were higher | ACF Children's Bureau, AFCARS |
| **Child maltreatment victims** | **7.4 per 1,000** (2023) | the lowest of 19 readings since 2005 | ACF Children's Bureau, Child Maltreatment / NCANDS |
| **Attend religious services nearly weekly or more** | **25.62%** (2024) | 32 of 35 readings since 1972 were higher | NORC General Social Survey |
| **Persons obtaining lawful permanent resident status** | **1,172,910** (2023) | 7 of 204 readings since 1820 were higher | DHS Office of Homeland Security Statistics, 2023 Yearbook Table 1 |
| **Median age of the resident population** | **39.4 yrs** (2025) | the highest of 26 readings since 2000 | U.S. Census Bureau, Population Estimates Program |

**One-liner:** Fewer married-couple households, more people living alone, and steady rates of children raised by one parent than a generation ago.

**Caveat:** CPS ASEC series carry population-control revisions (the Census Bureau's own "r" and lettered footnote rows) and a 2014 questionnaire redesign; each series' `_meta.note` and `breaks` name the specific seam, and the later-method row is always the one that ships.

---

## Quick Context

26 long-run annual US series on marriage, households, living arrangements, births, child welfare, religion and social connection, and immigration. Every value is read from the organization that produces it (U.S. Census Bureau, CDC/NCHS, ACF Children's Bureau, NORC GSS, DHS Office of Homeland Security Statistics). Nothing is interpolated or smoothed; where a survey skipped a year, or a wartime gap exists in the publisher's own table (CPS did not run 1941-1946), the series skips it too.

Confidence: **Very High (95%+)** for published agency/survey figures copied as-is; **High (85-94%)** for the GSS items and the married/cohabiting shares, which are computed here from microdata or two publisher columns with the exact formula named in each series' `note`.

---

## Methodology Summary

**Approach:** one re-runnable script (`update.ts`) fetches each series from its primary publisher and writes one JSON file per series with a provenance block; `docs.ts` regenerates this summary and the README from those files.

**Sources:** see [source.md](source.md) - every URL, table, and column.

**Definition used:** the publisher's own definition, restated in each series' `_meta.note` with its exact formula and every named break.

---

## Not Yet Shipped

| Key | Why not (yet) |
|---|---|
| `foreignBornShare` | The annual ACS one-year estimate (table B05002) requires a registered CENSUS_API_KEY, which is not present in this environment. The decennial series (1850-2000) ships separately as foreignBornShareDecennial. |
| `atusSocializing` | No BLS_API_KEY is registered; the keyless v1/v2 API hit its daily request threshold, and bls.gov's HTML ATUS tables return HTTP 403 to a browser-UA fetch. |
| `atusTelevision` | Same BLS API-key/quota and bls.gov 403 blockers as atusSocializing. |
| `atusChildcare` | Same BLS API-key/quota and bls.gov 403 blockers as atusSocializing. |
| `atusSleep` | Same BLS API-key/quota and bls.gov 403 blockers as atusSocializing. |
| `mothersLaborForce` | bls.gov returns HTTP 403 to the Women in the Labor Force Databook page carrying March CPS Table 7; the annual-average famee Table 5 is a different, non-substitutable series. |
| `abortionRate` | cdc.gov returns HTTP 403 Access Denied to scripted fetches of the MMWR surveillance summary; no accessible primary table with ≥15 machine-readable years was found. |

---

## Update Schedule

| Series | Cadence | Typical lag |
|---|---|---|
| Census Bureau CPS ASEC (marriage, households, mobility, fertility) | annual (March/September releases) | months |
| Census Bureau Population Estimates (median age, 65+ share) | annual vintage release | months |
| CDC/NCHS births | annual final-data table | ~1-2 years |
| ACF Children's Bureau (AFCARS, Child Maltreatment) | annual | ~1 year, preliminary first |
| NORC GSS | every two years | ~1 year after fieldwork |
| DHS Office of Homeland Security Statistics Yearbook | annual | ~1-2 years |

Last regenerated: 2026-09-11.

---

## Changelog

| Date | Change | Reason |
|------|--------|--------|
| 2026-09-10 | Dataset created with 26 series | Powers the Family & Society section of https://usstats.io |
