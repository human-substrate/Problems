import { expect, test } from "bun:test";

const data = async (key: string): Promise<Record<string, number>> =>
  (await Bun.file(new URL(`../series/${key}.json`, import.meta.url)).json()).data;

test("consumer sentiment includes historical and current partial years", async () => {
  const consumerSentiment = await data("consumerSentiment");
  expect(consumerSentiment["1961"]).toBeDefined();
  const latest = consumerSentiment[String(new Date().getFullYear())];
  expect(Number.isFinite(latest)).toBe(true);
  expect(latest).toBeGreaterThanOrEqual(40);
  expect(latest).toBeLessThanOrEqual(120);
});

test("mental health matches published endpoints", async () => {
  const mentalHealth = await data("gallupMentalHealthExcellent");
  expect(mentalHealth["2025"]).toBe(29);
  expect(mentalHealth["2001"]).toBe(43);
});

test("economic confidence retains 2020", async () => {
  const confidence = await data("gallupEconomicConfidence");
  expect(confidence["2020"]).toBeDefined();
  expect(Number.isFinite(confidence["2020"])).toBe(true);
});

test("gssMarriageVeryHappy retains latest value and coverage", async () => {
  const d = await data("gssMarriageVeryHappy"), years = Object.keys(d).sort();
  expect(d[years.at(-1)!]).toBe(60.8);
  expect(years.length).toBeGreaterThanOrEqual(30);
});

test("gssJobVerySatisfied retains latest value and coverage", async () => {
  const d = await data("gssJobVerySatisfied"), years = Object.keys(d).sort();
  expect(d[years.at(-1)!]).toBe(44.8);
  expect(years.length).toBeGreaterThanOrEqual(30);
});

test("gssPeopleHelpful retains latest value and coverage", async () => {
  const d = await data("gssPeopleHelpful"), years = Object.keys(d).sort();
  expect(d[years.at(-1)!]).toBe(37.9);
  expect(years.length).toBeGreaterThanOrEqual(30);
});

test("gssPeopleFair retains latest value and coverage", async () => {
  const d = await data("gssPeopleFair"), years = Object.keys(d).sort();
  expect(d[years.at(-1)!]).toBe(41.6);
  expect(years.length).toBeGreaterThanOrEqual(30);
});

test("gssLotOfAverageManWorse retains latest value and coverage", async () => {
  const d = await data("gssLotOfAverageManWorse"), years = Object.keys(d).sort();
  expect(d[years.at(-1)!]).toBe(68.6);
  expect(years.length).toBeGreaterThanOrEqual(15);
});

test("gssNotTooHappy retains latest value and coverage", async () => {
  const d = await data("gssNotTooHappy"), years = Object.keys(d).sort();
  expect(d[years.at(-1)!]).toBe(20.4);
  expect(years.length).toBeGreaterThanOrEqual(30);
});

test("nhisPsychologicalDistress matches published endpoints", async () => {
  const d = await data("nhisPsychologicalDistress");
  expect(d["1998"]).toBe(3.2);
  expect(d["2016"]).toBe(3.6);
});

test("nsduhAnyMentalIllness matches 2025", async () => {
  expect((await data("nsduhAnyMentalIllness"))["2025"]).toBe(20.6);
});

test("nsduhSeriousMentalIllness matches 2025", async () => {
  expect((await data("nsduhSeriousMentalIllness"))["2025"]).toBe(6.9);
});

test("nsduhAdultDepression matches 2025", async () => {
  expect((await data("nsduhAdultDepression"))["2025"]).toBe(7.4);
});

test("nsduhAdolescentDepression matches 2025", async () => {
  expect((await data("nsduhAdolescentDepression"))["2025"]).toBe(15.1);
});

test("yrbsPersistentSadness matches 2023", async () => {
  expect((await data("yrbsPersistentSadness"))["2023"]).toBe(40);
});

test("yrbsConsideredSuicide matches 2023", async () => {
  expect((await data("yrbsConsideredSuicide"))["2023"]).toBe(20);
});

test("gallupPersonalLifeSatisfied matches published endpoints", async () => {
  const d = await data("gallupPersonalLifeSatisfied");
  expect(d["1982"]).toBe(75);
  expect(d["2025"]).toBe(81);
});

test("gallupPersonalLifeVerySatisfied matches published checkpoints", async () => {
  const d = await data("gallupPersonalLifeVerySatisfied");
  expect(d["2001"]).toBe(55);
  expect(d["2020"]).toBe(65);
  expect(d["2025"]).toBe(44);
});

test("shedDoingOkay matches published endpoints", async () => {
  const d = await data("shedDoingOkay");
  expect(d["2013"]).toBe(62);
  expect(d["2025"]).toBe(73);
});

test("shedCover400 matches published endpoints", async () => {
  const d = await data("shedCover400");
  expect(d["2013"]).toBe(50);
  expect(d["2025"]).toBe(63);
});

test("brfssFrequentMentalDistress matches published endpoints", async () => {
  const d = await data("brfssFrequentMentalDistress");
  expect(d["2019"]).toBe(13.8);
  expect(d["2024"]).toBe(15.6);
});

test("antidepressantUse matches published endpoints", async () => {
  const d = await data("antidepressantUse");
  expect(d["2002"]).toBe(7.7);
  expect(d["2018"]).toBe(13.8);
});
