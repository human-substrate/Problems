# Methodology — US Disease & Vaccination

**Question.** Which long-run, national, annual series on infectious disease in the United States — reported cases, deaths, and vaccination coverage — meet a quality bar high enough to publish as an open dataset ([`Data/US-Disease-And-Vaccination/`](../../Data/US-Disease-And-Vaccination/README.md)) and as the **Disease & Vaccination** section of https://usstats.io?

## The filter

Every candidate was judged against one written filter, inherited from the US-Societal-Health, US-Education, and US-Employment-And-Jobs studies, with one rider for this domain.

1. **Primary publisher only.** CDC surveillance programs (NNDSS and the disease-specific programs that publish annual counts), NCHS (the National Vital Statistics System and the *Health, United States* trend tables), and NCIRD's coverage surveys (NIS-Child, NIS-Teen, the School Vaccination Assessment Program, FluVaxView, NHIS adult items). Aggregators — Our World in Data, Wikipedia, Statista, Macrotrends, USAFacts, KFF — were finding aids, never sources.
2. **One instrument's repeated measure.** One surveillance system and one case-definition lineage per series; one survey and one question per coverage series. Where a publisher changed the definition, the change is named in the series' `breaks` field and drawn as a seam, never smoothed. Two instruments measuring the same thing (NIS-Child by survey year at 19–35 months, 1995–2017, versus NIS-Child by birth cohort at 24 months, birth years 2011→) are two series, never stitched.
3. **Annual national values, fifteen or more years,** latest value at most two years old. Narrow misses are reported and taken only with the reason stated (kindergarten coverage from the 2009–10 school year and exemptions from 2011–12 are the expected ones).
4. **The rider: a disease that did not exist before its first year is admitted from its first year.** COVID-19 deaths begin in 2020 because there is no earlier year to have, and the annual rows on the site keep the A17 floor of three points. The same rider does not admit short *instrument* histories: COVID-19 and RSV vaccination coverage, measured by a new survey module each season, are cut unless a lane shows five or more comparable seasons.
5. **Machine-fetchable, or checked in with a citation.** data.cdc.gov (Socrata JSON) and the *Health, United States* workbooks and NVSR tables on ftp.cdc.gov are fetched by `update.ts`. www.cdc.gov and wonder.cdc.gov refuse non-browser fetchers, so a value that exists only on a cdc.gov program page is read through a real browser, checked in under `data/` with the page URL, the table, the value, and the read date, and re-verified on refresh where the page can be read.
6. **Every break named.** Case-definition changes (Lyme 2022, acute hepatitis C, HIV 1993 and 2008, chlamydia's late notifiability, the 2021 NNDSS modernization), survey changes (NIS's 2011 cell-phone sample, NHIS 2019 redesign, the kindergarten denominator and reporting changes), and ICD-9 → ICD-10 in 1999 for mortality, each in the series' `breaks` field.
7. **Provisional is labelled provisional.** A year the publisher has not finalized carries a `provisional` flag in the data and the note says so; it is never presented as final.
8. **Banned.** Model-based burden estimates presented as counts; polls with fewer than five identical-wording readings; anything a lane could describe but not fetch.

## Year mapping (one rule)

Publishers key some series to a **season** (influenza coverage: "2023–24"), a **school year** (kindergarten coverage and exemptions: "2023–24"), or a **birth cohort** (NIS-Child by age 24 months: "children born in 2020"). The site's tables and charts are keyed to calendar years, so one rule applies everywhere:

- A season or school year is keyed to the calendar year in which it **ends** ("2023–24" → 2024).
- A birth cohort is keyed to its **birth year** ("born 2020" → 2020) and the series name says "by age 24 months, by birth year". Multi-year cohorts the publisher pools (e.g. "2016–2019") are not used; only single birth years are.

The rule is restated in every note it applies to.

## The lanes

Four research lanes ran in parallel under the filter, each returning candidates with the endpoint probed and a sample value quoted: (1) notifiable-disease incidence (reported cases and rates); (2) vaccination coverage and exemptions at every age; (3) infectious-disease mortality; (4) outbreaks, healthcare-associated infection, antimicrobial resistance, and vaccine-confidence polls. Every candidate — shipped or cut — is dispositioned in [findings/candidates.md](findings/candidates.md) with the rule that decided it.

## Verification

Every shipped value was re-read by the lead from the publisher, independently of the lane that proposed it: the Socrata rows re-queried; the *Health, United States* workbooks downloaded from ftp.cdc.gov and the cells read by row label and year; cdc.gov program pages read through a real browser. The dataset's `update.ts` carries these reads as code, so a refresh repeats them.

## What the section is, and is not

The section shows reported cases, deaths, and coverage against time. Reported cases depend on testing, reporting completeness, and case definitions, and the notes say so where the publisher does. No page on usstats.io asserts that a coverage change caused a case change; where a publisher states such a relationship, it is quoted as theirs.
