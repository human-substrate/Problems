# Publisher and brief mismatches

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

| FBI robberyRate, 2024 | 60.6 | .cache/cde-robbery.json: sum of twelve actuals / December population × 100,000, rounded to one decimal = 59.4. Preserve source calculation; do not substitute candidate value. |

| FBI aggravatedAssaultRate, 2024 | 256.1 | .cache/cde-aggravated-assault.json: sum of twelve actuals / December population × 100,000, rounded to one decimal = 248. Preserve source calculation; do not substitute candidate value. |

| FBI robberyRate, 2024 | 60.6 | .cache/cde-robbery.json: sum of twelve actuals / December participated population × 100,000, rounded to one decimal = 61.7. Preserve source calculation; do not substitute candidate value. |

| FBI aggravatedAssaultRate, 2024 | 256.1 | .cache/cde-aggravated-assault.json: sum of twelve actuals / December participated population × 100,000, rounded to one decimal = 257.5. Preserve source calculation; do not substitute candidate value. |
