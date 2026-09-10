export type Cadence = "annual";
export type AnnualRule = string;
export type SeriesClass = "living" | "births" | "time" | "religion" | "migration" | "population";
export type SeriesMeta = {
  name: string; unit: string; source: string; sourceUrl: string; historicalSourceUrls?: string[]; note: string;
  goodDirection: "up" | "down" | "neutral";
  cadence: Cadence; annualRule: AnnualRule; class: SeriesClass; breaks: string;
};
export type Result = { key: string; meta: SeriesMeta; data: Record<string, number>; bounds: [number, number]; provisional?: number[] };
export type Pipeline = { run: (group: string, fn: () => Promise<void>) => Promise<void>; save: (result: Result) => Promise<void>; defer: (key: string, reason: string) => void };
export const META: Record<string, SeriesMeta> = {};
