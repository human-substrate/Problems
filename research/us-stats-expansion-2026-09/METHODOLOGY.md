# Methodology — the v9 quality filter

The same filter the earlier usstats.io batches ran on, with four riders for this expansion. A candidate ships only when every rule holds; the rule that cuts it is named beside it in [findings/candidates.md](findings/candidates.md).

1. **Primary publisher only.** The agency or survey organization that produced the number. Aggregators (Wikipedia, Statista, USAFacts, Our World in Data, KFF, Macrotrends) are finding aids, never sources.
2. **A measured indicator, one instrument.** One instrument's repeated measure. A model's "explained-by" contribution, a proxy the publisher itself disclaims (NICS checks are not sales), or a series stitched from differently worded questions does not ship.
3. **Fifteen or more annual points, with a recent value.** Exceptions are named per series (an instrument that began recently: battery storage 2010, SHED 2013; a biennial survey; two-year survey cycles) and never silent.
4. **Machine-fetchable, or checked in with a citation.** A re-runnable `update.ts` fetches it, or the file is browser-read once, checked in with URL, read date, and hash, and the fetcher refuses to run if the checked-in file changed under it.
5. **No subscription feed.** Gallup Analytics, the Conference Board's history, and any licensed data are out even when a value has been quoted in a public article.
6. **Every break named; every stitch proven.** Methodology breaks (a redesign, a definition change, a new population control, a moving standard) are in the series note. A series assembled from successive publisher editions carries the edition list, and the fetcher asserts that overlapping years agree before it accepts the stitch. A series whose measuring standard moves under it (people above a NAAQS that is periodically lowered) does not ship.
7. **Perception is labeled as perception.** A Gallup or GSS item about what people believe carries "what people believe" in its note and never shares an axis with a reported or victimization rate without a legend.
8. **No duplicate of an existing row.** Where the site already carries the same question from another publisher, the second one is cut with the reason.
9. **A retired series ends where the publisher ended it.** NOAA retired its billion-dollar-disaster product in 2025; the rows end at 2024 with the retirement named, and no successor organization's continuation is appended.
10. **"Computed from" when we compute.** A share from microdata, an annual mean from sub-annual observations, a count from an event list, or a ratio of two publisher series carries "computed from" in its source string and the rule (weight, threshold, window) in its note.

## Year mapping

Calendar year everywhere. EIA annual values are the publisher's annual row (the `YYYY13` row of the Monthly Energy Review). Fiscal-year series (DHS, BOP, USSC, FEMA declarations) are keyed to the fiscal year number and say so. A two-year survey pool (NHIS K6, NHANES cycles) is keyed to the pool's end year. A hurricane season is its calendar year. The Census mobility year "2019-20" is keyed to 2020.

## Where the lanes came from

Four read-only verification lanes ran on 2026-09-10 (crime, family, happiness, energy), each instructed to fetch the publisher's actual file or API and report first year, last year, cadence, unit, breaks, login requirement, and a sample value. Their reports are summarized in the candidates table; every shipped series was then re-read by the lead against the publisher and the re-read values are the asserts in each dataset's `lib/checks.test.ts`.
