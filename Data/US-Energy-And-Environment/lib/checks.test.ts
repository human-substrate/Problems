import {expect,test} from "bun:test";
import {SPECS} from "./catalog.ts";
const data=async(key:string):Promise<Record<string,number>>=>(await Bun.file(new URL(`../series/${key}.json`,import.meta.url)).json()).data;
// A tolerance-0 sample compares at the sample's own decimal precision: Lane 4 recorded rounded publisher values (42.8 for 42.795).
// Lane 4 gives no matching numeric sample for 15 keys. Those tests explicitly check
// coverage and catalog bounds, not a fabricated publisher benchmark. In particular,
// its 1970 SO2 utilities figure is not the requested Total without wildfires measure.
for(const[key,spec]of Object.entries(SPECS))test(`${key}: ${spec.sample?"Lane 4 sample":"coverage and bounds (no numeric sample supplied)"}`,async()=>{
  const d=await data(key),ys=Object.keys(d).sort();
  expect(ys.length).toBeGreaterThanOrEqual(key==="batteryCapacity"?10:15);
  if(spec.sample){const[y,value,tolerance]=spec.sample;if(tolerance===0){const dec=(String(value).split(".")[1]??"").length;expect(Number(d[y].toFixed(dec))).toBe(value);}else{expect(d[y]).toBeGreaterThanOrEqual(value-tolerance);expect(d[y]).toBeLessThanOrEqual(value+tolerance);}}
  else for(const v of Object.values(d)){expect(Number.isFinite(v)).toBe(true);expect(v).toBeGreaterThanOrEqual(spec.bounds[0]);expect(v).toBeLessThanOrEqual(spec.bounds[1]);}
});
// HURDAT2 carries 29 systems at ≥34 kt in 2005: the 28 of the official season summary plus Tropical Depression Twenty-Two, reanalyzed to 40 kt but never named. The count is the HURDAT2 rule, stated in the series note.
test("named storms historical HURDAT2 count",async()=>{expect((await data("namedStorms"))["2005"]).toBe(29);});
test("retired archive ends at 2024",async()=>{for(const key of ["billionDollarDisasters","billionDollarCost"])expect(Object.keys(await data(key)).sort().at(-1)).toBe("2024");});
