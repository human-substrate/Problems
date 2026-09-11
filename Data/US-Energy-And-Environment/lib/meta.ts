export type SeriesClass = "production" | "generation" | "grid" | "transport" | "atmosphere" | "climate" | "hazards" | "pollution";
export type SeriesMeta = {
  name: string; unit: string; source: string; sourceUrl: string; historicalSourceUrls?: string[];
  note: string; breaks: string; goodDirection: "up" | "down" | "neutral";
  cadence: "annual"; annualRule: string; class: SeriesClass;
};
export type Result = { key: string; meta: SeriesMeta; data: Record<string, number>; bounds: [number, number]; provisional?: number[]; partialYear?: number; partialThrough?: string };
export type Pipeline = { run: (group: string, fn: () => Promise<void>) => Promise<void>; save: (result: Result) => Promise<void>; defer: (key: string, reason: string) => void };
// Populated only after a builder supplies validated metadata to Pipeline.save.
export const META: Record<string, SeriesMeta> = {};
