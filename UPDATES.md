# Substrate Project Updates

This file tracks all significant changes, additions, and milestones in the Substrate project.

---

## 🚀 Recent Updates

> **2026-09-06:** New dataset **[US-Employment-And-Jobs](Data/US-Employment-And-Jobs/README.md)** — 32 series chosen to show whether AI is visible in US jobs, hiring, and layoffs since ChatGPT: sector employment, openings, hires, layoffs, claims, postings, recent-graduate unemployment, occupational counts, and platform metrics as the baseline; firm and worker AI adoption, AI in postings, AI-attributed cuts, and the Stanford and Yale trackers as the phenomenon — every value from its primary publisher at its own cadence, regenerable by one keyless script. Research project `research/us-employment-jobs-2026-09/` states what the data does and does not show and quotes the studies with their own hedges. Powers the new Employment & Jobs section of **https://usstats.io**.

> **2026-08-31:** **[US-Societal-Health](Data/US-Societal-Health/README.md) education-efficacy expansion** — 16 new series (68 → 84) measuring what Americans actually know and read: NAEP civics, U.S. history, geography (discontinued 2018, shown honestly), and science scores; NAEP Long-Term Trend reading and math at ages 9 and 13 back to 1971; Annenberg's "name all three branches of government" item (phone and online eras kept separate per APPC's own mode-effect measurement); the GSS WORDSUM vocabulary test (1974–2024); and reading habits from BLS ATUS, the NEA/Census SPPA, Gallup, and Pew. Research project `research/us-education-2026-08/`. Powers the expanded Education section of **https://usstats.io**.

> **2026-08-24:** New dataset **[US-Long-Run-Indicators](Data/US-Long-Run-Indicators/README.md)** — the 51 long-run US series behind https://usstats.io that were not already in US-Societal-Health (unemployment to fertility to CO2, back to 1895), every value from its primary publisher, regenerable by one keyless script. Together the two datasets are the complete source of record for the site; a registry-driven workflow now refreshes datasets, site, and deploy in one command.

> **2026-08-21:** New dataset **[US-Societal-Health](Data/US-Societal-Health/README.md)** — 66 long-run US series on happiness and optimism, trust in people and institutions, substance use, access to care and suicide by age, and household financial stress, every value from its primary publisher (NORC GSS microdata read directly, Gallup, Michigan, SAMHSA, NIAAA, CDC/NCHS, Census, Fed/NY Fed, USDA, NHTSA, BLS) with a one-script refresh; research project `research/us-societal-health-2026-08/`. Powers the new sections of **https://usstats.io**.

> **2026-08-10:** New research project **[The Palantir Question](research/palantir-moral-alignment-2026-08/README.md)** — an open inquiry into the morality and behavior of Palantir Technologies. Four independent AI research efforts across different model vendors built the steel-man case FOR, the steel-man case AGAINST, a neutral factual record from primary documents (SEC filings, court rulings, FOIA productions, procurement text), and a claim-by-claim fact-check of the folklore both sides repeat; a separate adversarial AI review then attacked the synthesis, and an anonymized Q&A dialogue stress-tested the conclusions. Includes the analysis the project converged on (`findings/SYNTHESIS.md`) and ~150 verified sources. Posted as a question, not a verdict: pull requests with sourced disagreements welcome.

> **2026-07-24:** **[The US Program](Plans/README.md)** — six more plans join PL-00001 and PL-00002 to make eight: **[PL-00003 Housing Abundance](Plans/PL-00003—Housing_Abundance.md)**, **[PL-00004 Healthcare](Plans/PL-00004—Healthcare_That_Costs_What_Its_Worth.md)**, **[PL-00005 Education for Human 3.0](Plans/PL-00005—Education_For_Human_3.md)**, **[PL-00006 Work & Income Through the AI Transition](Plans/PL-00006—Work_And_Income_Through_The_AI_Transition.md)**, **[PL-00007 A Government That Runs on Understanding](Plans/PL-00007—A_Government_That_Runs_On_Understanding.md)**, **[PL-00008 Fiscal Solvency](Plans/PL-00008—Fiscal_Solvency.md)**. Each follows the same four rules: every number carries a primary source, derived numbers are labeled derived, every plan names what would falsify it, and every plan carries a *How this fails* section. Live at **https://usbuildout.danielmiessler.workers.dev**.

> **2026-07-24:** New plan **[PL-00002 — The US Buildout Plan](Plans/PL-00002—US_Buildout_Plan.md)** — a numbers-first plan for rebuilding US energy, autonomy manufacturing, and human capability, and the first fully cross-linked component graph in the repo: 4 Problems (PR-00001…4), 3 Solutions (SO-00001…3), 3 Funding-Sources (FS-00001…3), 3 Claims (CL-00001…3), 3 Risks (RI-00001…3). Every quantitative anchor carries a primary source; every entry names what would falsify it. Headline finding: the stated 10×-in-4-years energy target requires 2,925 GW/yr against a 2026 record of 86 GW, while the proposed funding stack (~$473B/yr) covers ~101% of the maximum physically reachable program (~2.4× in ten years).

> **2026-07-23:** New dataset **US-National-Debt** — size, composition, cost, history, and ownership of US federal debt (1790→present) from nine primary sources, with research project `research/us-national-debt-2026-07/`. Powers the live interactive site **https://usdebt.io**.

> **2025-10-25:** Major data infrastructure upgrade - Comprehensive data management system with library science methodology

---

## 2025-10 - Data Infrastructure Revolution

### Dataset Additions (5 New Authoritative Datasets)

**Knowledge Worker Global Salaries (DS-00005)**
- **Added:** 2025-10-18
- **Coverage:** Global compensation data for knowledge workers
- **Validation:** 2025-10-25 validation check completed
- **Status:** Active

**Pulitzer Prize Winners - Arts & Letters (DS-00004)**
- **Added:** 2025-10-07
- **Coverage:** 1918-2024 (249 winners across Poetry, Drama, General/Special awards)
- **Source:** Wikidata
- **Update:** 2025-10-25 refresh
- **Quality:** High-quality, complete coverage of selected categories
- **Rationale:** Focused on Arts & Letters for quality over breadth

**Bay Area COVID-19 Wastewater Surveillance (DS-00003)**
- **Added:** 2025-10-07
- **Coverage:** 2022-07-09 to 2025-08-02 (161 weekly data points)
- **Source:** California Department of Public Health (CDPH)
- **Type:** Leading health indicator (population-level surveillance)
- **Geographic:** Statewide California serving as Bay Area proxy

**U.S. Gross Domestic Product (DS-00002)**
- **Added:** 2025-10-16
- **Coverage:** Annual 1929-2024 (96 years) + Quarterly Q1 1947 - Q2 2025 (314 quarters)
- **Source:** Federal Reserve Economic Data (FRED) / Bureau of Economic Analysis (BEA)
- **Update:** 2025-10-25 refresh
- **Significance:** Primary measure of U.S. economic activity
- **Quality:** Gold standard indicator with three-stage quarterly revision process
- **Research:** Created through comprehensive 10-agent parallel research across Perplexity, Claude WebSearch, and Gemini

**U.S. Consumer Price Index - Inflation (DS-00001)**
- **Added:** 2025-10-06
- **Coverage:** 1947-2025 (945 monthly data points)
- **Source:** Federal Reserve Economic Data (FRED) / Bureau of Labor Statistics (BLS)
- **Update:** 2025-10-25 refresh
- **Type:** CPI-U (Consumer Price Index for All Urban Consumers)
- **Significance:** Gold standard inflation measure for the United States

### Data Management System

**Library Science Methodology Implementation**
- **Eight-Dimension Source Evaluation Framework:**
  1. Authority & Credibility
  2. Currency & Timeliness
  3. Accuracy & Reliability
  4. Coverage & Scope
  5. Objectivity & Bias
  6. Accessibility
  7. Documentation Quality
  8. Provenance & Citation

- **Metadata Standards:** Dublin Core, MARC, SDMX, DDI
- **Source Classification:** Primary, Secondary, Tertiary
- **Quality Assurance:** Research-grade evaluation for each dataset

**Technical Infrastructure**
- **Runtime:** Bun (TypeScript)
- **Auto-Discovery:** Orchestrator automatically detects all DS-* directories
- **Update Scripts:** TypeScript scripts with error handling, retry logic, rate limiting
- **Central Logging:** Aggregated logs from all sources
- **Dashboard Generation:** Auto-generated README with system health metrics
- **Git Integration:** Automated version control
- **Data Formats:** Raw JSON + Pipe-delimited (Substrate standard)

**Documentation Suite**
- `GETTING_STARTED.md` - Complete setup and usage guide (536 lines)
- `PROJECT_SUMMARY.md` - Technical architecture overview (475 lines)
- `QUICK_REFERENCE.md` - Command cheatsheet
- `Data/README.md` - Data directory documentation
- Individual `Data/*/UPDATES.md` - Dataset-specific change logs
- Individual `Data/*/README.md` - Dataset documentation with research methodology
- `README-LIBRARY-SCIENCE.md` - Library science framework explanation

**Migration from Data-Sources to Data**
- **Completed:** 2025-10-16
- **Reason:** Simplified directory naming, clearer structure
- **Impact:** All references updated, old directory removed
- **Documentation:** MIGRATION-GUIDE.md and MIGRATION-COMPLETE.md created

---

## 2025-10 - GitHub Automation

### GitHub Actions

**Claude Code Review Workflow**
- **Added:** 2025-10-06
- **Updated:** 2025-10-06
- **Function:** Automated code review using Claude
- **Status:** Active

**Claude PR Assistant Workflow**
- **Added:** 2025-10-06
- **Updated:** 2025-10-06
- **Function:** Automated PR assistance and analysis
- **Status:** Active

---

## 2025-10 - Community Contributions

### Problems

**Brazil - São Paulo Mental Health**
- **Contributor:** @ktfth
- **Added:** 2025-10-06
- **PR:** #30
- **Impact:** Expanded geographic coverage of mental health issues

**Various Problem Updates**
- **Contributor:** @DesertEaglePWN
- **Added:** 2025-10-06
- **PR:** #28, #31
- **Impact:** Problem database refinement

### Arguments

**New Arguments**
- **Contributor:** @DesertEaglePWN
- **Added:** 2025-10-06
- **PR:** #31
- **Impact:** Expanded argumentation framework

**AI Understanding Argument**
- **Contributor:** @JaymanW
- **Added:** 2024-09-25
- **PR:** #21
- **Content:** Arguments about AI comprehension and understanding

### Values

**Values Framework**
- **Contributor:** @karai114
- **Added:** 2024-09-25
- **PR:** #22
- **Impact:** Established values taxonomy for Substrate

### Claims

**Initial Claims**
- **Contributor:** @ThatNateGuy
- **Added:** 2024-04-25
- **PR:** #13
- **Claims Added:**
  - Anthropogenic climate change
  - Everettian Interpretation of Quantum Mechanics
  - Supernaturalism
  - Atavistic Model of Cancer
  - Holographic Universe theory

---

## 2024-07 - Project Foundation

### Repository Consolidation

**Single-Repo Structure**
- **Date:** 2024-07-27
- **Change:** Moved from multi-repo to single-repo structure
- **Benefit:** Easier management and contribution
- **Impact:** Simplified development workflow

### Core Components

**Initial Object Types Created:**
- Problems
- Solutions
- Ideas
- Plans
- Experiments
- Results
- Models
- Arguments
- Claims
- Values
- Organizations
- People
- Projects
- Funding Sources
- Outcomes
- Risks
- Threats

**Documentation**
- README.md with project vision
- Introduction video (YouTube)
- Blog post announcement

---

## Project Milestones

### Phase 1: Foundation (July 2024)
✅ Single-repo structure
✅ Core object types defined
✅ Basic directory structure
✅ Initial documentation
✅ Public launch

### Phase 2: Community Building (Aug-Sep 2024)
✅ First community contributions
✅ Claims framework established
✅ Arguments and Values added
✅ Multi-contributor ecosystem

### Phase 3: Data Infrastructure (Oct 2025)
✅ Five authoritative datasets
✅ Library science methodology
✅ Data management system
✅ TypeScript automation
✅ Comprehensive documentation
✅ GitHub Actions integration

### Phase 4: Future (Planned)
- [ ] Web-based contribution interface
- [ ] Interactive data visualizations
- [ ] API for programmatic access
- [ ] Additional authoritative datasets
- [ ] Cross-reference linking system
- [ ] Evidence-based problem/solution matching
- [ ] Community-driven dataset requests

---

## Dataset Update History

For detailed dataset-specific updates, see:
- `Data/UPDATES.md` - Central data directory updates
- `Data/US-GDP/UPDATES.md` - GDP dataset updates
- `Data/US-Inflation/UPDATES.md` - Inflation dataset updates
- `Data/Bay-Area-COVID-Wastewater/UPDATES.md` - COVID wastewater updates
- `Data/Pulitzer-Prize-Winners/UPDATES.md` - Pulitzer Prize updates

---

## Breaking Changes

### 2025-10-16: Data-Sources → Data Directory Rename
- **Impact:** Directory path changed from `Data-Sources/` to `Data/`
- **Migration:** Automatic, all references updated
- **Documentation:** See `Data/MIGRATION-GUIDE.md`

---

## Statistics

### Project Scale (as of 2025-10-27)

**Datasets:**
- Total: 5 authoritative datasets
- Total Data Points: 1,700+ (GDP quarterly + monthly inflation + COVID weekly + Pulitzer winners + salary data)
- Historical Coverage: 1918-2025 (107 years maximum span)
- Geographic Coverage: Global (U.S.-focused with expanding international data)

**Documentation:**
- Lines of Markdown: 8,000+ lines
- Lines of TypeScript: 1,000+ lines
- Documentation Files: 25+ files

**Community:**
- Contributors: 6+ community members
- Pull Requests Merged: 10+
- Issues Addressed: Multiple

**Infrastructure:**
- GitHub Actions: 2 workflows
- Update Scripts: TypeScript with Bun
- Data Formats: CSV, JSON, Markdown, Pipe-delimited
- Version Control: Full git integration

---

## Acknowledgments

**Major Contributors:**
- **Daniel Miessler** - Project creator and maintainer
- **@ThatNateGuy** - Claims framework
- **@JaymanW** - Arguments on AI understanding
- **@karai114** - Values framework
- **@DesertEaglePWN** - Problems and Arguments updates
- **@ktfth** - Brazil mental health problems

**Special Thanks:**
- Jonathan Dunn - Similar goals and inspiration
- Joel Parish - Structure wisdom
- Joseph Thacker - Constant flow of ideas

---

## How to Track Updates

**Watch This File:** `UPDATES.md` for project-wide changes
**Watch Data Updates:** `Data/UPDATES.md` for dataset-specific changes
**Watch GitHub:** Releases and commit history
**Watch Individual Datasets:** Each dataset has its own `UPDATES.md` file

---

**Last Updated:** 2025-10-27
**Update Frequency:** As changes occur
**Format:** Reverse chronological (newest first)
