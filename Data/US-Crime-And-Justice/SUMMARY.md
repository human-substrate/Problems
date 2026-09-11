# US Crime and Justice — Summary

23 shipped series and 0 deferred keys. Latest values below are derived directly from the shipped JSON.

## Reported to police — FBI CDE

| Series | Latest | Unit | Coverage | Class |
|---|---:|---|---|---|
| [Motor vehicle theft](series/motorVehicleTheftRate.json) | 257.9 (2024) | reported offenses per 100,000 people covered by reporting agencies | 2000–2024 · 25 points | reported |
| [Burglary](series/burglaryRate.json) | 232 (2024) | reported offenses per 100,000 people covered by reporting agencies | 2000–2024 · 25 points | reported |
| [Robbery](series/robberyRate.json) | 61.7 (2024) | reported offenses per 100,000 people covered by reporting agencies | 2000–2024 · 25 points | reported |
| [Aggravated assault](series/aggravatedAssaultRate.json) | 257.5 (2024) | reported offenses per 100,000 people covered by reporting agencies | 2000–2024 · 25 points | reported |

## Experienced crime — NCVS

| Series | Latest | Unit | Coverage | Class |
|---|---:|---|---|---|
| [Violent victimization (NCVS)](series/ncvsViolentRate.json) | 23.3 (2024) | victimizations per 1,000 persons age 12 or older | 1993–2024 · 31 points | experienced |
| [Property victimization (NCVS)](series/ncvsPropertyRate.json) | 97.6 (2024) | victimizations per 1,000 households | 1993–2024 · 28 points | experienced |
| [Violent victimizations reported to police (share)](series/ncvsReportedShare.json) | 48.1 (2024) | percent of violent victimizations reported to police | 1993–2024 · 31 points | experienced |

## Justice-system response

| Series | Latest | Unit | Coverage | Class |
|---|---:|---|---|---|
| [Jail incarceration rate](series/jailRate.json) | 198 (2023) | persons held in local jail per 100,000 U.S. residents | 2012–2023 · 12 points | response |
| [Adults under correctional supervision](series/correctionalSupervisionRate.json) | 2100 (2023) | persons under adult correctional supervision per 100,000 adult U.S. residents | 2003–2023 · 21 points | response |
| [Executions](series/executions.json) | 24 (2023) | executions | 1930–2023 · 94 points | response |
| [Persons under sentence of death](series/deathRowPopulation.json) | 2192 (2023) | persons | 1953–2023 · 71 points | response |
| [Federal prison population](series/federalPrisonPopulation.json) | 155270 (2025) | persons in Bureau of Prisons custody | 1980–2025 · 46 points | response |
| [Federal offenders sentenced](series/federalOffendersSentenced.json) | 66662 (2025) | felony and Class A misdemeanor cases with an individual sentenced | 2002–2025 · 24 points | response |

## What people believe — Gallup and GSS

| Series | Latest | Unit | Coverage | Class |
|---|---:|---|---|---|
| [Perceived national crime trend: more than a year ago](series/gallupMoreCrime.json) | 49 (2025) | percent of adults who say there is more crime in the U.S. than a year ago | 1989–2025 · 32 points | believed |
| [Afraid to walk alone at night](series/gallupAfraidToWalk.json) | 31 (2025) | percent of adults who say they would be afraid to walk alone at night within a mile of their home | 1965–2025 · 41 points | believed |
| [Afraid to walk alone at night (GSS)](series/gssFearWalking.json) | 32.8 (2024) | percent of adults who say they are afraid to walk alone at night in their neighborhood | 1973–2024 · 30 points | believed |
| [Favor the death penalty for murder (GSS)](series/gssFavorDeathPenalty.json) | 62.1 (2024) | percent of adults who say they favor the death penalty for persons convicted of murder | 1974–2024 · 33 points | believed |
| [Courts not harsh enough on criminals (GSS)](series/gssCourtsNotHarsh.json) | 59.2 (2024) | percent of adults who say local courts do not deal harshly enough with criminals | 1972–2024 · 34 points | believed |
| [Gun in the home (GSS)](series/gssGunInHome.json) | 38.8 (2024) | percent of adults who say they have a gun in their home | 1973–2024 · 30 points | believed |

## Online reports and losses

| Series | Latest | Unit | Coverage | Class |
|---|---:|---|---|---|
| [Fraud reports](series/fraudReports.json) | 2600678 (2024) | reports | 2001–2024 · 24 points | online |
| [Identity theft reports](series/identityTheftReports.json) | 1135291 (2024) | reports | 2001–2024 · 24 points | online |
| [Internet crime complaints (IC3)](series/ic3Complaints.json) | 1008597 (2025) | complaints | 2011–2025 · 15 points | online |
| [Internet crime losses (IC3)](series/ic3Losses.json) | 20.877 (2025) | $ billions reported lost | 2011–2025 · 15 points | online |

## Interpretation

Values come from sealed cached primary sources. No network, interpolation, or smoothing. Gaps are retained. Computed series state their formulas; fiscal years use the fiscal-year number. Do not equate beliefs, police reporting, survey victimization, correctional response, and voluntary online complaints. Each series carries its own unit, breaks, method, bounds, and source URLs. A named 12-point exception applies to jailRate; all other shipped series have at least 15 observations.

NCVS reported share is computed from rounded rates and can differ from BJS's directly published percentage. IC3 values preserve the source's stated precision. Coverage endpoints do not imply every intervening year is available. Source and recovery limitations are recorded per series in source.md.

## Deferred

| Key | Disposition |
|---|---|


Build: 2026-09-11T21:53:59.500Z.
