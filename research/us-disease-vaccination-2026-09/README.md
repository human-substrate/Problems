# US Disease & Vaccination — which long-run infectious-disease series are good enough to publish?

**Research Study**
**Date:** 2026-09-09
**Researcher:** Daniel Miessler / Kai (LifeOS)
**Research Design:** Four-lane source discovery under a written quality filter, direct sourcing by the lead where lanes failed, browser reads of CDC tables that refuse scripted access, and independent re-verification of every shipped value

---

## Research Question

Which annual, national, long-run series on infectious disease in the United States — reported cases, deaths, and vaccination coverage — come from a primary publisher, keep one instrument and one case definition (or name every change), and reach back far enough to be read as history? Those ship as the open dataset [`Data/US-Disease-And-Vaccination/`](../../Data/US-Disease-And-Vaccination/README.md) and as the **Disease & Vaccination** section of https://usstats.io.

## Methodology

One written filter with a domain rider ([METHODOLOGY.md](METHODOLOGY.md)): primary publisher only; one instrument's repeated measure; fifteen or more years and a recent final value; a disease that did not exist before its first year is admitted from that year (COVID-19 deaths), but a short-lived survey instrument is not (COVID-19 and RSV vaccination); machine-fetchable or checked in with a citation and read date; every break named; provisional years flagged; one year-mapping rule for seasons, school years, and birth cohorts. Every candidate's disposition, with the rule that decided it: [findings/candidates.md](findings/candidates.md).

Two lanes (notifiable-disease incidence; mortality) failed before delivering and were sourced directly by the lead. That turned out to be the better path: NCHS publishes the whole notifiable-disease history in one *Health, United States* table (IDNotif, 1950–2019) on a host that serves files to scripts, and CDC WONDER's finalized annual tables cover 2016–2023, so the dataset's incidence series rest on two publisher tables that agree count-for-count on their overlap years rather than on a lane's transcription.

## Answer

**Thirty-five series ship: fifteen reported-incidence series, three mortality series, and seventeen vaccination-coverage series (six of them historical partners drawn beside a current instrument).**

What the data shows, stated as level and trend only:

- **The vaccine-era collapse is the oldest story in the set and it is still visible.** Measles went from 211 reported cases per 100,000 in 1950 to 0.03 in 2000; pertussis from 80 to under 3; mumps from 56 in 1970 to about 1. Diphtheria and paralytic polio reached zero and stay there, which is why they are not rows.
- **Measles is the series that turned.** After two decades near zero, reported cases were 285 in 2024, 2,289 in 2025, and 3,134 by September 3, 2026 — the 2026 figure is a year-to-date count from the measles program's own page, labelled as such. Kindergarten MMR coverage fell from 95.0% in 2019–20 to 92.4% in 2025–26 while the share of kindergartners with any exemption rose from 2.5% to 4.2%. The site draws these beside each other; it does not state that one caused the other.
- **Sexually transmitted infections run the other way from the vaccine-preventable diseases.** Primary and secondary syphilis, at 2.1 per 100,000 in 2000, reached 15.7 in 2023; congenital syphilis went from 580 cases to 3,882. Gonorrhea and chlamydia are far above their 2000 levels, chlamydia partly through wider testing (named in the note).
- **Lyme disease's 2022 jump is a definition change, not an outbreak.** CDC says 2022 is not comparable with earlier years; the chart shows the seam.
- **Deaths from influenza and pneumonia fell from 48 per 100,000 in 1950 to 12 in 2019.** HIV disease deaths peaked at 16.2 per 100,000 in 1995 and were 1.4 in 2019.
- **Childhood coverage has been flat for a generation.** MMR ≥1 dose among children 19–35 months was 90% in 1995 and 91.5% in 2017; the birth-cohort instrument that replaced it reads 90.1% for children born in 2011 and 91.4% for those born in 2022. The two instruments are drawn as two lines. Adolescent coverage is the exception: Tdap from 10.8% (2006) to 88.8% (2025), HPV ≥1 dose among girls from 1.0% to 78.7%.
- **Adult flu vaccination among people 65 and over roughly doubled between 1989 (30.4%) and the early 2000s and has moved sideways since** (63.8% in 2024–25 on the FluVaxView instrument).

## What the section is not

No page states that a movement in cases was caused by a movement in coverage or the reverse; where CDC states such a relationship it is quoted as CDC's. Reported cases depend on testing, reporting completeness, and case definitions, and each note says so where the publisher does. Chronic disease (cancer, diabetes, heart disease) is outside the section by design; its title means infectious disease, and the site's About page says so.

## Sources

Publisher tables and endpoints, with the path used: [SOURCES.md](SOURCES.md).
