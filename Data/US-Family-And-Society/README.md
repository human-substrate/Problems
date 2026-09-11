# US Family and Society

**26 long-run annual US series on marriage, households, living arrangements, births, child welfare, religion and social connection, and immigration - every value from its primary publisher, in one machine-readable place.**

Companion to [US-Societal-Health](../US-Societal-Health/) and [US-Common-Metrics](../US-Common-Metrics/). Powers the family-and-society sections of the live almanac **https://usstats.io** (each row there links to a page with the full series and these sources).

## Quick Start

```bash
cat SUMMARY.md                              # the answer first
cat index.json                              # what's here: name, unit, source, coverage per series
cat series/marriedCoupleHouseholds.json     # one series: { _meta: {...provenance}, data: { "1940": 76.0, ... } }
bun --env-file=$HOME/.claude/.env update.ts # refresh everything from the publishers (needs pdftotext; BLS_API_KEY/CENSUS_API_KEY unlock 5 more)
bun update.ts --only gss,moversShare        # refresh a subset
bun docs.ts                                 # regenerate README.md + SUMMARY.md + source.md from the data
```

## Contents

| File | Description |
|------|-------------|
| `SUMMARY.md` | Answer-first summary with headline numbers (generated) |
| `index.json` | Catalog of every series: name, unit, source, coverage, fetch time |
| `series/<key>.json` | One file per series: `_meta` provenance block + `data` year→value |
| `deferred.json` | Requested keys not yet shippable, each with the exact blocking evidence |
| `source.md` | Every source: URL, table, column, formula, breaks |
| `data/nchs/` | Four cdc.gov reports checked in with a browser-read date and sha256 (`READ.md`), since cdc.gov 403s every scripted fetch |
| `update.ts` | Re-runnable fetcher (caches large downloads in `.cache/`) |
| `docs.ts` | Regenerates this README, SUMMARY.md and source.md from the data |
| `update.log` | One line per refresh |

## Series format

```json
{
  "_meta": {
    "key": "marriedCoupleHouseholds",
    "name": "Married-couple households",
    "unit": "percent of households",
    "source": "U.S. Census Bureau, historical family and living-arrangement tables",
    "sourceUrl": "https://www2.census.gov/...",
    "goodDirection": "neutral",
    "cadence": "annual",
    "annualRule": "publisher survey/census year; sparse historical observations retained",
    "class": "living",
    "breaks": "every methodology break named here",
    "note": "exact formula and every named break",
    "coverage": "1940–2025",
    "fetched": "ISO timestamp"
  },
  "data": { "1940": 76.0, "1947": 78.7, "…": 0 }
}
```

Rules this dataset runs on:

- **Primary publisher only.** Aggregators are never a source; the agency or survey organization is.
- **No interpolation, no smoothing.** A survey year that was skipped, or a wartime gap in the publisher's own table (CPS 1941-1946), is absent - never filled in.
- **Breaks are named, never smoothed over.** CPS ASEC population-control revisions, the 2014 questionnaire redesign, the 2007 cohabiting-parent pointer change, the AFCARS 2020 reporting rule.
- **Duplicate-year footnote rows are resolved deterministically.** Where a Census table lists a year twice (a lettered footnote row plus a plain row), the lettered/revised row is the one that ships - the exact rule and its evidence are in `lib/census.ts`.
- **Computed values say so.** GSS percentages are computed here from cumulative microdata (weight and codes named); married/cohabiting shares are computed from two publisher columns with the exact division named.
- **A source that blocks scripted fetches is checked in, never skipped.** cdc.gov returns HTTP 403 to every automated request for its NVSR/data-brief PDFs; the four reports behind `meanAgeFirstBirth` and the `births` extension were each read once through a real browser session and are checked in at `data/nchs/`, with the read date and sha256 recorded in `data/nchs/READ.md`. `update.ts` re-verifies the hash before every parse and refuses to run on a mismatch.

## Series

### Marriage & marital status

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Median age at first marriage, men](series/medianAgeFirstMarriageMen.json) | 30.8 yrs (2025) | 26.1 yrs (1890) | 1890–2025 · 85 pts | U.S. Census Bureau, historical family and living-arrangement tables |
| [Median age at first marriage, women](series/medianAgeFirstMarriageWomen.json) | 28.4 yrs (2025) | 22 yrs (1890) | 1890–2025 · 85 pts | U.S. Census Bureau, historical family and living-arrangement tables |
| [Married population aged 15 and older](series/adultsMarried.json) | 50.42% (2025) | 66.64% (1950) | 1950–2025 · 38 pts | U.S. Census Bureau, historical family and living-arrangement tables |

### Households & living arrangements

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Married-couple households](series/marriedCoupleHouseholds.json) | 46.63% (2025) | 76.03% (1940) | 1940–2025 · 80 pts | U.S. Census Bureau, historical family and living-arrangement tables |
| [One-person households](series/onePersonHouseholds.json) | 29.48% (2025) | 13.1% (1960) | 1960–2025 · 66 pts | U.S. Census Bureau, historical family and living-arrangement tables |
| [Average household size](series/householdSize.json) | 2.5 (2025) | 3.67 (1940) | 1940–2025 · 80 pts | U.S. Census Bureau, historical family and living-arrangement tables |
| [Children living with two parents](series/childrenWithTwoParents.json) | 70.4% (2025) | 87.68% (1960) | 1960–2025 · 59 pts | U.S. Census Bureau, historical family and living-arrangement tables |
| [One-parent families with own children under 18](series/oneParentFamilies.json) | 30.51% (2025) | 7.38% (1950) | 1950–2025 · 76 pts | U.S. Census Bureau, historical family and living-arrangement tables |
| [Adults aged 25–34 living with parents](series/youngAdultsWithParents.json) | 16.45% (2025) | 9.06% (1960) | 1960–2025 · 46 pts | U.S. Census Bureau, historical family and living-arrangement tables |
| [Unmarried opposite-sex couples, direct measure](series/cohabitingCouples.json) | 9,481k (2023) | 2,858k (1996) | 1996–2023 · 28 pts | U.S. Census Bureau, historical family and living-arrangement tables |
| [Opposite-sex adults sharing living quarters, POSSLQ](series/cohabitingCouplesPosslq.json) | 5,368k (2006) | 439k (1960) | 1960–2006 · 32 pts | U.S. Census Bureau, historical family and living-arrangement tables |

### Mobility & fertility

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Moved residence in the preceding year](series/moversShare.json) | 7.8% (2023) | 20.2% (1948) | 1948–2023 · 68 pts | U.S. Census Bureau, CPS ASEC Geographic Mobility Table A-1 |
| [Women aged 40–44 who are childless](series/childlessWomen40to44.json) | 18.8% (2024) | 10.2% (1976) | 1976–2024 · 28 pts | U.S. Census Bureau, CPS June fertility supplement, Historical Table 1 |

### Births & child welfare

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Live births](series/births.json) | 3,628,934 (2024) | 2,718,000 (1909) | 1909–2024 · 116 pts | CDC/NCHS, Births and General Fertility Rates: United States, extended by NVSR 75-2 Table 1 |
| [Mean age of mother at first live birth](series/meanAgeFirstBirth.json) | 27.6 yrs (2024) | 21.4 yrs (1970) | 1970–2024 · 46 pts | CDC/NCHS, National Vital Statistics Reports (mean age of mother, by live-birth order) |
| [Children in foster care on September 30](series/fosterCareChildren.json) | 331,747 (2025) | 423,000 (2009) | 2009–2025 · 17 pts | ACF Children's Bureau, AFCARS |
| [Child maltreatment victims](series/childMaltreatmentRate.json) | 7.4 per 1,000 (2023) | 10.9 per 1,000 (2005) | 2005–2023 · 19 pts | ACF Children's Bureau, Child Maltreatment / NCANDS |

### Religion & social connection (GSS)

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Attend religious services nearly weekly or more](series/gssAttendWeekly.json) | 25.62% (2024) | 40.42% (1972) | 1972–2024 · 35 pts | NORC General Social Survey |
| [No religious preference](series/gssNoReligion.json) | 25.66% (2024) | 5.49% (1972) | 1972–2024 · 35 pts | NORC General Social Survey |
| [Social evenings with friends at least several times a month](series/gssSocialFriends.json) | 36.44% (2024) | 42.41% (1974) | 1974–2024 · 29 pts | NORC General Social Survey |

### Immigration

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Persons obtaining lawful permanent resident status](series/permanentResidents.json) | 1,172,910 (2023) | 8,390 (1820) | 1820–2023 · 204 pts | DHS Office of Homeland Security Statistics, 2023 Yearbook Table 1 |
| [Persons naturalized](series/naturalizations.json) | 878,460 (2023) | 7,940 (1907) | 1907–2023 · 117 pts | DHS Office of Homeland Security Statistics, 2023 Yearbook Table 20 |
| [DHS initial enforcement actions](series/borderEnforcementActions.json) | 2,818,660 (2023) | 22,200 (1925) | 1925–2023 · 99 pts | DHS Office of Homeland Security Statistics, 2023 Yearbook Table 33 |
| [Foreign-born population, decennial census](series/foreignBornShareDecennial.json) | 11.1% (2000) | 9.7% (1850) | 1850–2000 · 16 pts | U.S. Census Bureau, Working Paper 81, Table 1 |

### Population age structure

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Median age of the resident population](series/medianAge.json) | 39.4 yrs (2025) | 35.36 yrs (2000) | 2000–2025 · 26 pts | U.S. Census Bureau, Population Estimates Program |
| [Resident population age 65 and older](series/population65Share.json) | 18.91% (2025) | 12.43% (2000) | 2000–2025 · 26 pts | U.S. Census Bureau, Population Estimates Program |

## Not included, and why

See [Not Yet Shipped](#not-yet-shipped) in SUMMARY.md, or `deferred.json` for the exact evidence per key.

## Data Sources

See [source.md](source.md). Publishers: U.S. Census Bureau, CDC/NCHS, ACF Children's Bureau, NORC (GSS), DHS Office of Homeland Security Statistics.

## Research provenance

[research/us-stats-expansion-2026-09/](../../research/us-stats-expansion-2026-09/) - the research question, the quality filter, the candidate dispositions, and what the data shows.

---

*Last regenerated 2026-09-11 by `docs.ts`.*
