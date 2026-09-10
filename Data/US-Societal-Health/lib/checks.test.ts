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
