# US Societal Health

**108 long-run annual US series on happiness and optimism, trust in people and institutions, substance use, health access, and household financial stress — every value from its primary publisher, in one machine-readable place.**

Companion to [US-Common-Metrics](../US-Common-Metrics/) (economic indicators) and [US-National-Debt](../US-National-Debt/). Powers the societal-health sections of the live almanac **https://usstats.io** (each row there links to a page with the full series and these sources).

## Quick Start

```bash
cat SUMMARY.md                     # the answer first
cat index.json                     # what's here: name, unit, source, coverage per series
cat series/veryHappy.json          # one series: { _meta: {...provenance}, data: { "1972": 30.3, ... } }
bun update.ts                      # refresh everything from the publishers (needs unzip + pdftotext)
bun update.ts --only gss,michigan  # refresh a subset
bun docs.ts                        # regenerate README.md + SUMMARY.md from the data
```

## Contents

| File | Description |
|------|-------------|
| `SUMMARY.md` | Answer-first summary with headline numbers (generated) |
| `index.json` | Catalog of every series: name, unit, source, coverage, fetch time |
| `series/<key>.json` | One file per series: `_meta` provenance block + `data` year→value |
| `source.md` | Every source: URL, table, column, question wording, breaks |
| `update.ts` | Re-runnable fetcher (no keys; caches large downloads in `.cache/`) |
| `lib/stata.ts` | Minimal Stata .dta (release 117/118) reader used to read NORC's GSS cumulative file directly |
| `docs.ts` | Regenerates this README and SUMMARY.md from the data |
| `update.log` | One line per refresh |

## Series format

```json
{
  "_meta": {
    "key": "veryHappy",
    "name": "Very Happy",
    "unit": "percent of adults \"very happy\"",
    "source": "NORC General Social Survey (cumulative file 1972–2024)",
    "sourceUrl": "https://gss.norc.org/get-the-data/stata.html",
    "historicalSourceUrls": ["…"],
    "goodDirection": "up",
    "note": "question wording, method, every known break",
    "method": "exactly how the number was derived (variable, codes, weight / table, column)",
    "coverage": "1972–2024",
    "fetched": "ISO timestamp"
  },
  "data": { "1972": 30.3, "1973": 36.8, "…": 0 }
}
```

Rules this dataset runs on:

- **Primary publisher only.** Aggregators (KFF, Statista, OWID, Wikipedia) are never a source; the agency or survey organization is.
- **No interpolation, no smoothing.** A survey year that was skipped is absent. Charts should break the line across gaps rather than draw through them.
- **Breaks are named, never smoothed over.** GSS 2021 web mode, NSDUH 2021 redesign, Michigan 2017–2024 web transition, Gallup panel transition 2018–2020.
- **Partial years are flagged** (`partialYear` / `partialThrough`) and never presented as full-year values.
- **Computed values say so.** GSS percentages are computed here from microdata (and how); Gallup annual satisfaction is an annual mean of Gallup's readings. Everything else is the publisher's own figure.

## Series

### Happiness & outlook

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Very Happy](series/veryHappy.json) | 23.4% (2024) | 30.3% (1972) | 1972–2024 · 35 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Life Is Exciting](series/lifeExciting.json) | 37.3% (2024) | 46.5% (1973) | 1973–2024 · 30 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Rate Their Current Life Highly](series/lifeRatedHigh.json) | 61.6% (2026) | 64.6% (2009) | 2009–2026 · 18 pts | Gallup National Health and Well-Being Index |
| [Optimistic About Life in 5 Years](series/optimismFutureLife.json) | 59.7% (2026) | 63% (2009) | 2009–2026 · 18 pts | Gallup National Health and Well-Being Index |
| [Satisfied With How Things Are Going in the U.S.](series/satisfiedWithCountry.json) | 24.5% (2026) | 19% (1979) | 1979–2026 · 47 pts | Gallup, Satisfaction With the United States |
| [Satisfied With Finances](series/satisfiedFinances.json) | 22.6% (2024) | 33.1% (1972) | 1972–2024 · 35 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Finances Getting Better](series/financesBetter.json) | 31.4% (2024) | 43.5% (1972) | 1972–2024 · 35 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Better Off Than a Year Ago](series/betterOffThanYearAgo.json) | 21% (2025) | 36% (1978) | 1978–2025 · 48 pts | University of Michigan Surveys of Consumers, Table 6 |
| [Expect to Be Better Off Next Year](series/expectBetterOffNextYear.json) | 26% (2025) | 27% (1978) | 1978–2025 · 48 pts | University of Michigan Surveys of Consumers, Table 8 |
| [Better Off Than Parents](series/betterThanParents.json) | 54.5% (2024) | 65.3% (1994) | 1994–2024 · 16 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Kids Will Be Better Off](series/kidsBetterOff.json) | 58.8% (2024) | 52.2% (1994) | 1994–2024 · 15 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Hard Work Gets You Ahead](series/hardWorkGetsAhead.json) | 65.4% (2024) | 65.1% (1973) | 1973–2024 · 29 pts | NORC General Social Survey (cumulative file 1972–2024) |

### Trust in people and institutions — Gallup (great deal + quite a lot)

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Most People Can Be Trusted](series/peopleCanBeTrusted.json) | 24.8% (2024) | 46.6% (1972) | 1972–2024 · 30 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Trust in Mass Media](series/trustMedia.json) | 28% (2025) | 68% (1972) | 1972–2025 · 31 pts | Gallup, Media Use and Evaluation |
| [Confidence in Congress](series/gallupCongress.json) | 9% (2026) | 42% (1973) | 1973–2026 · 47 pts | Gallup, Confidence in Institutions |
| [Confidence in the Presidency](series/gallupPresidency.json) | 27% (2026) | 52% (1975) | 1975–2026 · 36 pts | Gallup, Confidence in Institutions |
| [Confidence in the Supreme Court](series/gallupSupremeCourt.json) | 27% (2026) | 45% (1973) | 1973–2026 · 48 pts | Gallup, Confidence in Institutions |
| [Confidence in the Police](series/gallupPolice.json) | 45% (2026) | 52% (1993) | 1993–2026 · 34 pts | Gallup, Confidence in Institutions |
| [Confidence in the Criminal Justice System](series/gallupCriminalJustice.json) | 17% (2026) | 17% (1993) | 1993–2026 · 33 pts | Gallup, Confidence in Institutions |
| [Confidence in the Military](series/gallupMilitary.json) | 61% (2026) | 58% (1975) | 1975–2026 · 47 pts | Gallup, Confidence in Institutions |
| [Confidence in Public Schools](series/gallupPublicSchools.json) | 27% (2026) | 58% (1973) | 1973–2026 · 48 pts | Gallup, Confidence in Institutions |
| [Confidence in the Medical System](series/gallupMedical.json) | 28% (2026) | 80% (1975) | 1975–2026 · 36 pts | Gallup, Confidence in Institutions |
| [Confidence in Big Business](series/gallupBigBusiness.json) | 17% (2026) | 26% (1973) | 1973–2026 · 46 pts | Gallup, Confidence in Institutions |
| [Confidence in Small Business](series/gallupSmallBusiness.json) | 67% (2026) | 63% (1997) | 1997–2026 · 22 pts | Gallup, Confidence in Institutions |
| [Confidence in Banks](series/gallupBanks.json) | 28% (2026) | 60% (1979) | 1979–2026 · 45 pts | Gallup, Confidence in Institutions |
| [Confidence in Organized Religion](series/gallupReligion.json) | 33% (2026) | 65% (1973) | 1973–2026 · 48 pts | Gallup, Confidence in Institutions |
| [Confidence in Organized Labor](series/gallupLabor.json) | 26% (2026) | 30% (1973) | 1973–2026 · 47 pts | Gallup, Confidence in Institutions |
| [Confidence in Newspapers](series/gallupNewspapers.json) | 17% (2026) | 39% (1973) | 1973–2026 · 45 pts | Gallup, Confidence in Institutions |
| [Confidence in Television News](series/gallupTvNews.json) | 14% (2026) | 46% (1993) | 1993–2026 · 34 pts | Gallup, Confidence in Institutions |

### Confidence in institutions — GSS (great deal)

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Confidence in the Press (GSS)](series/confPress.json) | 7.5% (2024) | 23.2% (1973) | 1973–2024 · 33 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Confidence in Television (GSS)](series/confTv.json) | 8.2% (2024) | 18.6% (1973) | 1973–2024 · 33 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Confidence in Congress (GSS)](series/confCongress.json) | 5.6% (2024) | 24.1% (1973) | 1973–2024 · 33 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Confidence in the Executive Branch (GSS)](series/confExecutive.json) | 12.1% (2024) | 29.6% (1973) | 1973–2024 · 33 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Confidence in the Supreme Court (GSS)](series/confSupremeCourt.json) | 18.6% (2024) | 32% (1973) | 1973–2024 · 33 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Confidence in Education](series/confEducation.json) | 19.8% (2024) | 37.2% (1973) | 1973–2024 · 33 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Confidence in Science](series/confScience.json) | 36.3% (2024) | 41.1% (1973) | 1973–2024 · 33 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Confidence in Medicine (GSS)](series/confMedicine.json) | 26.3% (2024) | 54.9% (1973) | 1973–2024 · 33 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Confidence in Major Companies (GSS)](series/confBusiness.json) | 15% (2024) | 30.7% (1973) | 1973–2024 · 33 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Confidence in Banks (GSS)](series/confBanks.json) | 17% (2024) | 32.7% (1975) | 1975–2024 · 31 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Confidence in the Military (GSS)](series/confMilitary.json) | 43.3% (2024) | 32.7% (1973) | 1973–2024 · 33 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Confidence in Organized Religion (GSS)](series/confReligion.json) | 15.5% (2024) | 35.7% (1973) | 1973–2024 · 33 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Confidence in Organized Labor (GSS)](series/confLabor.json) | 17.5% (2024) | 16.2% (1973) | 1973–2024 · 33 pts | NORC General Social Survey (cumulative file 1972–2024) |

### Substance use

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Marijuana Use, Past Year](series/marijuanaPastYear.json) | 21.2% (2025) | 11% (2002) | 2002–2025 · 23 pts | SAMHSA, National Survey on Drug Use and Health |
| [Marijuana Use, Past Month](series/marijuanaPastMonth.json) | 15.1% (2025) | 6.2% (2002) | 2002–2025 · 23 pts | SAMHSA, National Survey on Drug Use and Health |
| [Teen Marijuana Use](series/teenMarijuana.json) | 16.2% (2024) | 33.7% (1980) | 1980–2024 · 45 pts | Monitoring the Future (University of Michigan), via CDC/NCHS Data Query System |
| [Teen Alcohol Use](series/teenAlcohol.json) | 21.7% (2024) | 72% (1980) | 1980–2024 · 45 pts | Monitoring the Future (University of Michigan), via CDC/NCHS Data Query System |
| [Teen Binge Drinking](series/teenBingeDrinking.json) | 8.8% (2024) | 41.2% (1980) | 1980–2024 · 45 pts | Monitoring the Future (University of Michigan), via CDC/NCHS Data Query System |
| [Teen Cigarette Smoking](series/teenCigarettes.json) | 2.5% (2024) | 30.5% (1980) | 1980–2024 · 45 pts | Monitoring the Future (University of Michigan), via CDC/NCHS Data Query System |
| [Alcohol Consumption per Capita](series/alcoholPerCapita.json) | 2.48 gal (2023) | 2.10 gal (1850) | 1850–2023 · 93 pts | NIAAA Surveillance Report #122, Table 1 |

### Health access & mortality

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Couldn't Afford Prescriptions](series/rxCostBarrier.json) | 5.6% (2019) | 4.8% (1997) | 1997–2019 · 23 pts | CDC/NCHS Health, United States (National Health Interview Survey), via Data Query System |
| [Uninsured Rate](series/uninsured.json) | 8.2% (2024) | 14.6% (2008) | 2008–2024 · 16 pts | Census Bureau, American Community Survey (Table HIC-4_ACS) |
| [Infant Mortality](series/infantMortality.json) | 5.5% (2024) | 99.9% (1915) | 1915–2024 · 110 pts | CDC/NCHS National Vital Statistics System (via data.cdc.gov) |
| [Suicide Rate, Ages 10–14](series/suicide10to14.json) | 2.3% (2024) | 0.3% (1950) | 1950–2024 · 48 pts | CDC/NCHS National Vital Statistics System (Health, United States + Data Query System) |
| [Suicide Rate, Ages 15–24](series/suicide15to24.json) | 13.2% (2024) | 4.5% (1950) | 1950–2024 · 48 pts | CDC/NCHS National Vital Statistics System (Health, United States + Data Query System) |
| [Suicide Rate, Ages 25–44](series/suicide25to44.json) | 17.9% (2024) | 11.6% (1950) | 1950–2024 · 48 pts | CDC/NCHS National Vital Statistics System (Health, United States + Data Query System) |
| [Suicide Rate, Ages 45–64](series/suicide45to64.json) | 18.7% (2024) | 23.5% (1950) | 1950–2024 · 48 pts | CDC/NCHS National Vital Statistics System (Health, United States + Data Query System) |
| [Suicide Rate, Ages 65+](series/suicide65plus.json) | 17.1% (2024) | 30% (1950) | 1950–2024 · 48 pts | CDC/NCHS National Vital Statistics System (Health, United States + Data Query System) |
| [Traffic Deaths per 100M Miles](series/trafficDeaths.json) | 1.19% (2024) | 24.08% (1921) | 1921–2024 · 104 pts | NHTSA Fatality Analysis Reporting System (FARS) / FHWA vehicle miles |

### Household financial health

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Credit Card Delinquency Rate](series/creditCardDelinquency.json) | 2.88% (2026) | 5.35% (1991) | 1991–2026 · 36 pts | Federal Reserve Board via FRED (DRCCLACBS) |
| [Credit Card Serious Delinquency](series/creditCardSeriousDelinquency.json) | 13.02% (2026) | 8.91% (2003) | 2003–2026 · 24 pts | Federal Reserve Bank of New York, Household Debt and Credit Report (Consumer Credit Panel/Equifax) |
| [Consumer Bankruptcies](series/bankruptcies.json) | 501.6% (2025) | 2299.4% (2003) | 2003–2025 · 23 pts | Federal Reserve Bank of New York, Household Debt and Credit Report (Consumer Credit Panel/Equifax) |
| [Prime-Age Employment Rate](series/primeAgeEmployment.json) | 80.6% (2026) | 63% (1948) | 1948–2026 · 79 pts | BLS Current Population Survey via FRED (LNS12300060) |
| [Union Membership](series/unionMembership.json) | 10% (2025) | 20.1% (1983) | 1983–2025 · 43 pts | BLS Current Population Survey (series LUU0204899600) |
| [Child Poverty Rate](series/childPoverty.json) | 14.3% (2024) | 27.3% (1959) | 1959–2024 · 66 pts | Census Bureau, CPS ASEC Historical Poverty Table 3 |
| [On Food Stamps (SNAP)](series/snapShare.json) | 12.4% (2025) | 1.4% (1969) | 1969–2025 · 57 pts | USDA Food and Nutrition Service, SNAP Annual Summary; population from BEA via FRED (POPTHM) |
| [Food Insecurity](series/foodInsecurity.json) | 13.7% (2024) | 10.7% (2001) | 2001–2024 · 24 pts | USDA Economic Research Service, Household Food Security in the United States |

### Other

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Antidepressant Use in the Past Month (NHANES)](series/antidepressantUse.json) | 13.8% (2018) | 7.7% (2002) | 2002–2018 · 7 pts | NCHS, NHANES, Data Briefs 283 and 377 |
| [Can Name All Three Branches (phone era)](series/appcBranchesPhone.json) | 47% (2022) | 33% (2006) | 2006–2022 · 12 pts | Annenberg Public Policy Center, Constitution Day Civics Survey |
| [Can Name All Three Branches of Government](series/appcBranchesWeb.json) | 70% (2025) | 72% (2022) | 2022–2025 · 4 pts | Annenberg Public Policy Center, Constitution Day Civics Survey |
| [Books Read per Year](series/booksPerYear.json) | 12.6% (2021) | 15.3% (1990) | 1990–2021 · 7 pts | Gallup |
| [Frequent Mental Distress (BRFSS State Median)](series/brfssFrequentMentalDistress.json) | 15.6% (2024) | 13.8% (2019) | 2019–2024 · 6 pts | CDC, BRFSS Prevalence and Trends Data |
| [Consumer Sentiment Index (University of Michigan)](series/consumerSentiment.json) | 52.2% (2026) | 91.5% (1961) | 1961–2026 · 66 pts | University of Michigan Surveys of Consumers |
| [Firearm Deaths](series/firearmDeaths.json) | 12.6% (2025) | 13.1% (1970) | 1970–2025 · 45 pts | CDC/NCHS Health, United States 2017 Table 31; CDC Injury Center firearm mortality (NVSS) |
| [Gallup Economic Confidence Index](series/gallupEconomicConfidence.json) | -26.3% (2026) | 13.8% (1996) | 1996–2026 · 31 pts | Gallup, Gallup Economic Confidence Index |
| [Personal Finances Getting Better (Gallup)](series/gallupFinancesBetter.json) | 38% (2025) | 59% (2001) | 2001–2025 · 25 pts | Gallup, Personal Finances Getting Better (Gallup) |
| [Rate Their Mental Health Excellent](series/gallupMentalHealthExcellent.json) | 29% (2025) | 43% (2001) | 2001–2025 · 25 pts | Gallup, Rate Their Mental Health Excellent |
| [Satisfied With Personal Life](series/gallupPersonalLifeSatisfied.json) | 81% (2025) | 79% (1979) | 1979–2025 · 36 pts | Gallup, Mood of the Nation |
| [Very Satisfied With Personal Life](series/gallupPersonalLifeVerySatisfied.json) | 44% (2025) | 55% (2001) | 2001–2025 · 19 pts | Gallup, Mood of the Nation |
| [Good Time to Find a Quality Job](series/gallupQualityJob.json) | 35.5% (2026) | 27.8% (2001) | 2001–2026 · 26 pts | Gallup, Good Time to Find a Quality Job |
| [Very Satisfied With Job](series/gssJobVerySatisfied.json) | 44.8% (2024) | 48.9% (1972) | 1972–2024 · 35 pts | computed from NORC General Social Survey (cumulative file 1972–2024) |
| [Average Person's Lot Is Getting Worse](series/gssLotOfAverageManWorse.json) | 68.6% (1994) | 55.3% (1973) | 1973–1994 · 15 pts | computed from NORC General Social Survey (cumulative file 1972–2024) |
| [Marriage Is Very Happy](series/gssMarriageVeryHappy.json) | 60.8% (2024) | 67.9% (1973) | 1973–2024 · 34 pts | computed from NORC General Social Survey (cumulative file 1972–2024) |
| [Not Too Happy](series/gssNotTooHappy.json) | 20.4% (2024) | 16.5% (1972) | 1972–2024 · 35 pts | computed from NORC General Social Survey (cumulative file 1972–2024) |
| [People Try to Be Fair](series/gssPeopleFair.json) | 41.6% (2024) | 60.3% (1972) | 1972–2024 · 30 pts | computed from NORC General Social Survey (cumulative file 1972–2024) |
| [People Try to Be Helpful](series/gssPeopleHelpful.json) | 37.9% (2024) | 46.8% (1972) | 1972–2024 · 30 pts | computed from NORC General Social Survey (cumulative file 1972–2024) |
| [Math Score, Age 13 (NAEP LTT)](series/lttMath13.json) | 270.7% (2023) | 264.1% (1978) | 1978–2023 · 13 pts | NCES, National Assessment of Educational Progress |
| [Math Score, Age 9 (NAEP LTT)](series/lttMath9.json) | 233.9% (2022) | 218.6% (1978) | 1978–2022 · 13 pts | NCES, National Assessment of Educational Progress |
| [Reading Score, Age 13 (NAEP LTT)](series/lttReading13.json) | 255.7% (2023) | 255.2% (1971) | 1971–2023 · 15 pts | NCES, National Assessment of Educational Progress |
| [Reading Score, Age 9 (NAEP LTT)](series/lttReading9.json) | 214.6% (2022) | 207.6% (1971) | 1971–2022 · 15 pts | NCES, National Assessment of Educational Progress |
| [Civics Knowledge (NAEP)](series/naepCivics.json) | 150.2% (2022) | 150% (1998) | 1998–2022 · 6 pts | NCES, National Assessment of Educational Progress |
| [Geography Knowledge (NAEP)](series/naepGeography.json) | 258.4% (2018) | 259.7% (1994) | 1994–2018 · 5 pts | NCES, National Assessment of Educational Progress |
| [U.S. History Knowledge (NAEP)](series/naepHistory.json) | 258.4% (2022) | 259.3% (1994) | 1994–2022 · 7 pts | NCES, National Assessment of Educational Progress |
| [Science Knowledge (NAEP)](series/naepScience.json) | 149.9% (2024) | 150% (2009) | 2009–2024 · 5 pts | NCES, National Assessment of Educational Progress |
| [Serious Psychological Distress (NHIS)](series/nhisPsychologicalDistress.json) | 3.6% (2016) | 3.2% (1998) | 1998–2016 · 6 pts | NCHS, Health, United States 2017, Table 46 |
| [Adolescent Major Depressive Episode, Past Year](series/nsduhAdolescentDepression.json) | 15.1% (2025) | 9% (2004) | 2004–2025 · 21 pts | SAMHSA, National Survey on Drug Use and Health |
| [Adult Major Depressive Episode, Past Year](series/nsduhAdultDepression.json) | 7.4% (2025) | 6.6% (2005) | 2005–2025 · 20 pts | SAMHSA, National Survey on Drug Use and Health |
| [Any Mental Illness, Past Year](series/nsduhAnyMentalIllness.json) | 20.6% (2025) | 17.7% (2008) | 2008–2025 · 17 pts | SAMHSA, National Survey on Drug Use and Health |
| [Serious Mental Illness, Past Year](series/nsduhSeriousMentalIllness.json) | 6.9% (2025) | 3.7% (2008) | 2008–2025 · 17 pts | SAMHSA, National Survey on Drug Use and Health |
| [Read a Book Last Year (any format)](series/pewReadBook.json) | 75% (2025) | 78% (2011) | 2011–2025 · 9 pts | Pew Research Center |
| [Read Any Book Last Year](series/readAnyBook.json) | 48.5% (2022) | 56.6% (2002) | 2002–2022 · 5 pts | National Endowment for the Arts, Survey of Public Participation in the Arts (with the Census Bureau) |
| [Read on an Average Day](series/readingParticipation.json) | 16.1% (2025) | 26.3% (2003) | 2003–2025 · 22 pts | BLS American Time Use Survey (series TUU30105AA01006315) |
| [Time Spent Reading](series/readingTime.json) | 16.2% (2025) | 21.6% (2003) | 2003–2025 · 22 pts | BLS American Time Use Survey (series TUU10101AA01006315) |
| [Could Cover a $400 Emergency Expense](series/shedCover400.json) | 63% (2025) | 50% (2013) | 2013–2025 · 13 pts | Federal Reserve Board, Survey of Household Economics and Decisionmaking |
| [Doing at Least Okay Financially](series/shedDoingOkay.json) | 73% (2025) | 62% (2013) | 2013–2025 · 13 pts | Federal Reserve Board, Survey of Household Economics and Decisionmaking |
| [Teen Birth Rate](series/teenBirthRate.json) | 12.6% (2024) | 89.1% (1960) | 1960–2024 · 65 pts | CDC/NCHS National Vital Statistics System (Health, United States + Data Query System) |
| [Vocabulary Test Score](series/wordsum.json) | 6.33% (2024) | 5.94% (1974) | 1974–2024 · 25 pts | NORC General Social Survey (cumulative file 1972–2024) |
| [Seriously Considered Attempting Suicide (YRBS)](series/yrbsConsideredSuicide.json) | 20% (2023) | 17% (2013) | 2013–2023 · 6 pts | CDC, Youth Risk Behavior Survey Data Summary & Trends Report 2013–2023 |
| [Persistent Feelings of Sadness or Hopelessness (YRBS)](series/yrbsPersistentSadness.json) | 40% (2023) | 30% (2013) | 2013–2023 · 6 pts | CDC, Youth Risk Behavior Survey Data Summary & Trends Report 2013–2023 |

## Not included, and why

| Candidate | Why not (yet) |
|---|---|
| Gallup confidence in higher education | 6 polls since 2015 — not yet a series. GSS confidence in education (1973→) stands in. |
| NSDUH past-month illicit drug use | comparable only 2015–2019 and 2021–2025 (two redesigns) |
| NSDUH prescription misuse / substance use disorder | short windows plus a DSM-IV→DSM-5 break |
| BRFSS binge / heavy drinking | the national row is a median of states, with 2006 and 2011 breaks |
| Monitoring the Future past-year use 1975→ | monitoringthefuture.org blocks automated fetches; the NCHS mirror (1980→, past-30-day) is used |
| Alcohol-induced deaths (NCHS) | no machine-readable path reachable (CDC WONDER / stacks block fetchers) |
| Pew "children better off than parents", Gallup "next generation" | 4 comparable points / last asked 2022 |
| Pew trust in scientists, Gallup large-tech confidence | too short (2016→ / 2020→) |

## Data Sources

See [source.md](source.md). Publishers: NORC (GSS), Gallup, University of Michigan Survey Research Center, SAMHSA, NIAAA, University of Michigan Monitoring the Future via CDC/NCHS.

## Research provenance

[research/us-societal-health-2026-08/](../../research/us-societal-health-2026-08/) — the research question, the quality filter, the candidate dispositions, and what the data shows.

---

*Last regenerated 2026-09-11 by `docs.ts`.*
