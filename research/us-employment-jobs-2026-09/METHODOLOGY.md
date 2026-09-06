# Methodology — US Employment & Jobs in the AI era

**Question.** Can the effect of AI on US jobs, hiring, and layoffs be seen in primary data since ChatGPT (November 30, 2022)? Which series, from which publishers, meet a quality bar high enough to publish as a dataset and an almanac section?

## The filter

Every candidate was judged against one written filter, inherited from the earlier US-Societal-Health and US-Education studies and extended with one rider for this question.

1. **Primary publisher only.** The agency, survey organization, platform, or study authors. Aggregators (Statista, Macrotrends, news write-ups, Wikipedia) were finding aids, never sources.
2. **One instrument's repeated measure.** Never stitched from differently-worded questions or one-off polls. A wording change makes a new series (Census's own rule for BTOS, followed here).
3. **Two series classes (the rider).** *Outcome* series — sector employment, postings, entry-level unemployment, openings, hires, layoffs, occupational counts — need long history so a pre-AI baseline exists (15+ years preferred; every narrow miss reported). *Phenomenon* series — AI adoption by firms or workers, AI-attributed cuts, expectations — begin when their instrument began, because demanding fifteen years of a three-year-old phenomenon would cut everything the question is about. The class is recorded in every series' `_meta`.
4. **Native cadence stored.** Monthly, quarterly, biweekly, or annual as the publisher issues it; annual values are derived by a stated rule (average, year-end, or the publisher's own annual figure), never the reverse.
5. **Machine-fetchable, or checked in with a citation.** FRED, a publisher's CSV or workbook, or a BLS/Census API where one exists. Where a publisher offers only an HTML table (Gallup) or serves files only to a real browser (BLS OEWS workbooks), the values are checked in under `data/` with the page or file, its hash, and the read date, and `update.ts` re-verifies them against the source when it can.
6. **Every methodology break named** in the series note: question rewordings, SOC changes, seasonal-adjustment status, shutdown gaps, estimation-method changes.
7. **Banned.** Crowdsourced trackers (layoffs.fyi-class), vendor charts whose data cannot be obtained, and any series a lane could describe but not fetch.
8. **Studies are the interpretation layer.** A study becomes a series only if its authors publish a maintained, replicable index; otherwise it is quoted, with its own hedges, in the README and never turned into a number on the site.

## The lanes

Four research lanes ran in parallel under the filter, each returning candidates with the endpoint probed and a sample value quoted: (1) official statistics (BLS, Census, Federal Reserve system, NY Fed); (2) data published by job and work platforms themselves (Indeed, LinkedIn, Upwork, ADP, Revelio, Lightcast, Challenger, Ramp); (3) studies and institutional trackers; (4) repeated surveys of AI adoption and use at work. Every candidate — shipped or cut — is dispositioned in [findings/candidates.md](findings/candidates.md) with the filter rule that decided it.

## Verification

Every shipped value was re-read by the lead from the publisher, independently of the lane that proposed it: FRED CSVs re-fetched; the NY Fed CSVs behind its interactive read directly; the two Census BTOS workbooks downloaded and the question rows and cycle-date sheets parsed by column; Gallup's trend tables read from the articles; the seven BLS OEWS national workbooks downloaded through a real browser (bls.gov refuses other fetchers) and the four occupations read by SOC code, with each file's hash recorded. The dataset's `update.ts` carries these reads as code, so a refresh repeats them.

## What the analysis is, and is not

[findings/analysis.ts](findings/analysis.ts) prints, for every series, the value at the start of the display window (2019), at the marker (November 2022, or the first period after it), and the latest, with the change over each leg. That is a level-and-trend comparison and nothing more. It cannot attribute a change to AI: the 2022–2023 interest-rate cycle, the post-pandemic technology hiring overshoot, and offshoring all move the same series in the same direction. Attribution is left to the named studies, quoted in the README with their disagreements intact. No page on usstats.io asserts that AI caused a movement.
