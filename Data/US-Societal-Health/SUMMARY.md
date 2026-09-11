# US Societal Health: Executive Summary

---

## 🎯 BEST ESTIMATE

| Metric | Value | Where it sits in its own history | Source |
|--------|-------|----------------------------------|--------|
| **Very Happy** | **23.4%** (2024) | 33 of 35 readings since 1972 were higher | NORC General Social Survey (cumulative file 1972–2024) |
| **Optimistic About Life in 5 Years** | **59.7%** (2026) | 16 of 18 readings since 2009 were higher | Gallup National Health and Well-Being Index |
| **Most People Can Be Trusted** | **24.8%** (2024) | the lowest of 30 readings since 1972 | NORC General Social Survey (cumulative file 1972–2024) |
| **Trust in Mass Media** | **28%** (2025) | the lowest of 31 readings since 1972 | Gallup, Media Use and Evaluation |
| **Confidence in Congress** | **9%** (2026) | 40 of 47 readings since 1973 were higher | Gallup, Confidence in Institutions |
| **Confidence in Science** | **36.3%** (2024) | the lowest of 33 readings since 1973 | NORC General Social Survey (cumulative file 1972–2024) |
| **Marijuana Use, Past Year** | **21.2%** (2025) | 3 of 23 readings since 2002 were higher | SAMHSA, National Survey on Drug Use and Health |
| **Teen Marijuana Use** | **16.2%** (2024) | 40 of 45 readings since 1980 were higher | Monitoring the Future (University of Michigan), via CDC/NCHS Data Query System |
| **Alcohol Consumption per Capita** | **2.48 gal** (2023) | 23 of 93 readings since 1850 were higher | NIAAA Surveillance Report #122, Table 1 |
| **Couldn't Afford Prescriptions** | **5.6%** (2019) | 12 of 23 readings since 1997 were higher | CDC/NCHS Health, United States (National Health Interview Survey), via Data Query System |
| **Suicide Rate, Ages 15–24** | **13.2%** (2024) | 9 of 48 readings since 1950 were higher | CDC/NCHS National Vital Statistics System (Health, United States + Data Query System) |
| **Credit Card Delinquency Rate** | **2.88%** (2026) | 23 of 36 readings since 1991 were higher | Federal Reserve Board via FRED (DRCCLACBS) |
| **Infant Mortality** | **5.5%** (2024) | 107 of 110 readings since 1915 were higher | CDC/NCHS National Vital Statistics System (via data.cdc.gov) |

**One-liner:** Americans report less happiness, less trust, and more worry than at any point in these series.

**Caveat:** Survey series carry mode breaks (GSS went web-first in 2021, NSDUH redesigned in 2021, Michigan moved online 2017–2024); each series' note names its seam and the values either side are not strictly comparable.

---

## Quick Context

108 annual national US series on the non-economic side of how the country is doing: happiness and optimism, trust in people and institutions, substance use, health access, and household financial stress. Every value is read from the organization that produces it (NORC, Gallup, Michigan, SAMHSA, NIAAA, CDC/NCHS, …), the GSS items directly from NORC's public microdata. Nothing is interpolated or smoothed; where a survey skipped a year the series skips it too.

Confidence: **Very High (95%+)** for published agency/survey figures copied as-is; **High (85–94%)** for the GSS items, which are computed here from the microdata with NORC's weight (the computation is reproducible by `update.ts` and was cross-checked against an independent computation to the decimal).

---

## Methodology Summary

**Approach:** one re-runnable script (`update.ts`) fetches each series from its primary publisher and writes one JSON file per series with a provenance block; `docs.ts` regenerates this summary and the README from those files.

**Sources:** see [source.md](source.md) — every URL, table, and column.

**Definition used:** the publisher's own definition, restated in each series' `_meta.note` with its question wording and breaks.

---

## Update Schedule

| Series | Cadence | Typical lag |
|---|---|---|
| Gallup confidence / media / satisfaction | annual (June / September), monthly satisfaction | weeks |
| Michigan Surveys of Consumers | monthly, annual aggregates | weeks |
| GSS | every two years | ~1 year after fieldwork |
| NSDUH | annual | ~10 months |
| Monitoring the Future (via NCHS) | annual | ~1 year |
| NIAAA per-capita alcohol | annual report each spring | ~16 months |

Last regenerated: 2026-09-11.

---

## Changelog

| Date | Change | Reason |
|------|--------|--------|
| 2026-08-21 | Dataset created with 108 series | Powers the Happiness & Outlook, Trust & Institutions, and Substance Use sections of https://usstats.io |
