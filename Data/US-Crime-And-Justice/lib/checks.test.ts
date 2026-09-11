import { expect, test } from "bun:test";
const data = async (key: string): Promise<Record<string, number>> => (await Bun.file(new URL(`../series/${key}.json`, import.meta.url)).json()).data;
// Expected values transcribed from the cached primary tables, not generated from series outputs.
test("NCVS violent: 2024 appendix table 1", async () => { const d = await data("ncvsViolentRate"); expect(d[2024]).toBe(23.3); expect(d[1993]).toBe(79.8); });
test("NCVS property: 2024 table 2", async () => { expect((await data("ncvsPropertyRate"))[2024]).toBe(97.6); });
test("NCVS reported share: ratio of rounded appendix rates", async () => { expect((await data("ncvsReportedShare"))[2024]).toBe(48.1); });
test("Jail: 2023 table 1", async () => { expect((await data("jailRate"))[2023]).toBe(198); });
test("Correctional supervision: 2023 appendix table 1", async () => { expect((await data("correctionalSupervisionRate"))[2023]).toBe(2100); });
test("Executions: 2023 appendix table 4", async () => { const d = await data("executions"); expect(d[1930]).toBe(155); expect(d[2023]).toBe(24); });
test("Death row: 2023 appendix table 1", async () => { expect((await data("deathRowPopulation"))[2023]).toBe(2192); });
test("BOP: fiscal 2025", async () => { expect((await data("federalPrisonPopulation"))[2025]).toBe(155270); });
test("USSC: fiscal 2025 overview", async () => { expect((await data("federalOffendersSentenced"))[2025]).toBe(66662); });
test("Gallup more crime: October 2025", async () => { expect((await data("gallupMoreCrime"))[2025]).toBe(49); });
test("Gallup afraid to walk: October 2025", async () => { expect((await data("gallupAfraidToWalk"))[2025]).toBe(31); });
test("FTC fraud: 2024 reports by type", async () => { expect((await data("fraudReports"))[2024]).toBe(2600678); });
test("FTC identity theft: 2024 reports by type", async () => { expect((await data("identityTheftReports"))[2024]).toBe(1135291); });
test("IC3 complaints: 2025 headline", async () => { expect((await data("ic3Complaints"))[2025]).toBe(1008597); });
test("IC3 losses: 2025 headline, billions", async () => { expect((await data("ic3Losses"))[2025]).toBe(20.877); });
// Independent 2024-only microdata pass; WTSSPS totals documented in work/verification.md.
test("GSS FEAR: 2024 weighted yes", async () => { expect((await data("gssFearWalking"))[2024]).toBe(32.8); });
test("GSS CAPPUN: 2024 weighted favor", async () => { expect((await data("gssFavorDeathPenalty"))[2024]).toBe(62.1); });
test("GSS COURTS: 2024 weighted not harshly enough", async () => { expect((await data("gssCourtsNotHarsh"))[2024]).toBe(59.2); });
test("GSS OWNGUN: 2024 weighted yes, refusals excluded", async () => { expect((await data("gssGunInHome"))[2024]).toBe(38.8); });

test("FBI robbery: 2024 rate on the FBI denominator (candidate 60.6 recorded as a mismatch)", async () => { expect((await data("robberyRate"))[2024]).toBe(61.7); });
test("FBI aggravated assault: 2024 rate on the FBI denominator (candidate 256.1 recorded as a mismatch)", async () => { expect((await data("aggravatedAssaultRate"))[2024]).toBe(257.5); });
for (const key of ["motorVehicleTheftRate", "burglaryRate"]) test(`FBI ${key}: annual coverage`, async () => { const d=await data(key); expect(Object.keys(d).length).toBeGreaterThanOrEqual(15); expect(Object.values(d).every(v=>Number.isFinite(v)&&v>=0)).toBe(true); });
