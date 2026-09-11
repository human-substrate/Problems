---
phase: climbing
---
# US Family and Society

## Goal
Build a new Substrate dataset at `~/Projects/substrate/Data/US-Family-And-Society/`.

## Vision
Every recovered measure is reproducible from its primary publisher, with instrument boundaries visible and failures isolated. Missing evidence never becomes invented data.

## Claims and falsifiers
- [x] C1: Reader reproduces source cells. Falsifier: `bun test lib/xls.test.ts` fails.
- [x] C2: Every requested key is shipped or explicitly deferred with evidence. Falsifier: `bun test lib/checks.test.ts` inventory check fails.
- [x] C3: Saved series satisfy metadata, bounds and coverage contract. Falsifier: `bun test lib/checks.test.ts` contract check fails.
- [x] C4: Pipeline and docs regenerate. Falsifier: `bun update.ts` or `bun docs.ts` fails.
- [x] C5: Primary-source anchors and applicable overlaps hold. Falsifier: anchor/overlap tests fail.
- [x] C6: Work stays in this directory with zero dependencies and no home paths. Falsifier: static verification fails.

## Anti-claims
No interpolation, fabricated values, silent source loss, merged incompatible instruments, writes outside this dataset, or git commands.

## Test Strategy
| Claim | Assert | Lane |
|---|---|---|
| C1 | bun test lib/xls.test.ts | build |
| C2,C3,C5,C6 | bun test lib/checks.test.ts | build |
| C4 | bun update.ts && bun docs.ts | build |

## Decisions
The explicit directory-only constraint overrides external tracking and reflection writes. No git commands, including the contradictory requested status command. Numeric source parsing and executable probes cover the supplied thinking lenses; no separate thinking-skill orchestration is needed. API presence probe returned CENSUS_API_KEY no and BLS_API_KEY no. Annual ACS is explicitly deferred; ATUS uses keyless sources.
