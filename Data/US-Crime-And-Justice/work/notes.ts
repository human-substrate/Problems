import { write } from "../lib/io.ts";
await write("work/mismatches.md",`# Publisher and brief mismatches

Read from the cached primary files on 2026-09-10. Values are never changed to match a brief.

| Item | Brief/draft | Cached evidence and disposition |
|---|---|---|
| NCVS reported share, 2024 | 47.9% | cv24at01.csv rates 11.2 / 23.3 ×100 = 48.0687…; ship 48.1%. cv24t04.csv directly published share is 47.9%, a different calculation from unrounded estimates. |
| NCVS reported share, 2023 | 44.7% | cv24at01.csv rates 10.1 / 22.5 ×100 = 44.8888…; ship 44.9%, implementing the required ratio. |
| Jail coverage | 2013–2023, 11-point exception | ji22stt01.csv adds 2012=237; all 2013–2022 overlapping rate values match ji23stt01.csv. Ship 12 points, named exception updated. |
| NCVS property gap | No machine-readable tables published for 2014–2017 | Cached cv14–cv21 ZIPs are Page not found HTML. Publisher availability cannot be inferred from failed downloads. Keep the 2014–2017 cache gap. |
| GSS COURTS | Candidate guessed target code 1 | Embedded labels: 1=too harshly; 2=not harshly enough; 3=about right. Ship weighted code 2 share. Draft correction confirmed. |
| GSS OWNGUN | No denominator exclusion specified | Embedded code 3=refused. Exclude it; denominator codes 1/2 only. |
| FTC split history | Draft says only combined total has annual history | 2024_CSN_Number_of_Reports_by_Type.csv has Fraud and Identity Theft columns for every 2001–2024 year. Ship both; remove unrequested combined-total metadata. |
| Capital punishment report ID | NCJ 311040 in draft; 311040/other IDs in research | Both cached tables say NCJ 310309. Correct metadata. |
| IC3 2025 losses | $20.9 billion | Own 2025 headline says $20.877 billion. Ship 20.877. |
| IC3 2001 count | Draft uses 2025 milestone 49,711 | 2011/2013 charts say 50,412. Reject conflicting historical extension. |
| IC3 2004 count | Draft says unrecoverable | 2011 chart says 207,449; 2013 chart says 207,492. Values are recoverable but conflict; omit retrospective extension. |
| IC3 2012 losses | 2013 retrospectively says $581,441,110 | Own 2012 overview says $525,441,110. Keep own edition 0.525441110 billion. Do not accept the conflicting retrospective stitch. |
| IC3 2015 losses | Multiple possible totals | Own national totals row says $1,070,711,522; age table says $1,070,716,018. Use national totals row. 2025 milestone chart rounds 2015 to $1.0B while 2019 chart says $1.1B; neither replaces own total. |
| IC3 2016 losses | 2019 history says $1.5B | Own 2016 panel says $1.33B, overview lower bound $1.3B. Keep own panel 1.33. |
| IC3 2020 losses | Own overview says exceeding $4.1B | Own summary explicitly says total $4.2B. Use summary 4.2, which matches later charts. |
| IC3 2022 losses | Own overview says more than $10.2B | Own five-year chart says $10.3B. Use chart 10.3, which matches 2023 and 2025 charts. |
| Correctional supervision stitch | Older editions may extend history | cpus22 vs cpus23: 2020=2130/2140; 2021=2090/2100; 2022=2060/2100. Reject old-edition extension; ship current 2003–2023 history. |

All explicitly requested sample values other than the rate-ratio and rounded IC3 comparisons above agree with the cached sources. FY2025 USSC 66,662 is present in ussc.html. NCVS violent 1993=79.8 and 2024=23.3; executions 1930=155 and 2023=24; death row 2023=2,192; BOP FY2025=155,270; FTC 2024 fraud=2,600,678 and identity theft=1,135,291; Gallup more crime 2025=49; jail 2023=198; correctional supervision 2023=2,100.
`);
await write("work/verification.md",`# Verification notes

Before the annual GSS builder was written, a separate 2024-only pass through the supplied readDta reader selected one survey variable at a time. Valid responses have positive WTSSPS. These totals pin four test expectations independently of the shipped JSON:

| Variable | Valid unweighted responses | Weighted target | Weighted denominator | Share rounded to 0.1% |
|---|---:|---:|---:|---:|
| FEAR | 2223 | 737.7257134104573 | 2247.5620052646937 | 32.8 |
| CAPPUN | 2067 | 1270.404508844513 | 2045.7703370647507 | 62.1 |
| COURTS | 812 | 454.38145245490506 | 767.897771764558 | 59.2 |
| OWNGUN | 2170 | 855.1807451138577 | 2201.4119849103267 | 38.8 |

The full builder asserts embedded target labels on every run. COURTS code 2 is the target; OWNGUN code 3 is refused. Every shipped series has a bun:test test with a pinned expected value. Two tests additionally check historical sample endpoints.

NCVS and jail overlapping editions are tested before writes. IC3 2021–2023 charts each provide five count and five loss checks; loss checks use the comparison chart's stated 0.1-billion precision. The older conflicting charts are rejected and documented, not silently overwritten. The NCVS property blocks are disjoint (1993–2013 and 2018–2024): no overlap exists between these two blocks to verify; the gap remains explicit. The recent 2022/2023/2024 editions have exact overlapping rate equality.

sources.json seals the raw snapshot with URLs, read date, and SHA-256. update.ts does not reseal it or perform network requests. Work/seal.ts is an explicit reviewed-source replacement tool, not part of normal updates. The supplied lib/stata.ts was not modified.
`);
await write("work/candidate-dispositions.md",`# Lane 1 completeness

The 23 requested keys are exhaustively represented by index.json (19 shipped) and deferred.json (four FBI rates). No substitute combined FTC series is shipped.

Other Lane 1 candidates retain the research disposition and are outside the requested 23-key build:

| Candidate | Disposition and methodology rule/evidence from research |
|---|---|
| Violent clearance rate | Deferred: DEMO_KEY rate limit; clearance payload not confirmed. |
| Hate crime incidents | Deferred: annual API totals unconfirmed before DEMO_KEY limit. |
| Officers feloniously killed | Deferred: PDF ten-year windows, no long machine-readable table confirmed. |
| Officers per 1,000 residents | Cut, rule 4: endpoint unconfirmed, one-year summary. |
| GSS GUNLAW | Cut, rule 8: not an additional requested gun indicator. |
| Deaths by legal intervention | Cut, rule 4: WONDER query interface and known undercount. |
| Juvenile arrest rate | Cut, rule 4: no static Tableau export confirmed. |
| NICS checks | Cut, rule 2: publisher disclaims firearm-sales interpretation. |

No network retries were attempted. The four current-build FBI deferrals quote the cached response body and separately attribute the externally supplied fresh-retry evidence.
`);
console.log("Wrote mismatch, verification, and candidate disposition notes");
