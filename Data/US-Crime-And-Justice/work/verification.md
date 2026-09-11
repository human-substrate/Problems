# Verification notes

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
