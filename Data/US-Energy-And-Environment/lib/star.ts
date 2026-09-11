import {csv,getText,invariant,numeric,put,round,type Annual} from "./io.ts";
import {metadata,SPECS} from "./catalog.ts";
import type {Pipeline} from "./meta.ts";
export function parseSeaLevel(text:string):Annual {
  // NOAA STAR publishes one column per altimeter mission (TOPEX/Poseidon, Jason-1/2/3, Sentinel-6MF) with
  // overlapping observations across mission handovers; each row is one decimal-year observation. The
  // observation value is the mean of the missions reporting on that row, then the calendar year is the
  // mean of its observations. Comment lines begin with #.
  const rows=csv(text).filter(r=>r.length>1&&!String(r[0]).startsWith("#"));
  const header=rows.find(r=>/^year$/i.test(String(r[0]).trim()));
  invariant(header,"STAR header row starting with year not found");
  const missions=header.slice(1).filter(c=>c.trim()!=="");
  invariant(missions.length>=2,"STAR mission columns not found");
  invariant(/mm\/year|millimeter|\bmm\b/i.test(text.slice(0,5000)),"STAR millimeter unit not verified");
  const values:Record<string,number[]>={};
  for(const row of rows.slice(rows.indexOf(header)+1)) {
    if(!/^\d{4}(?:\.\d+)?$/.test(row[0]??"")) continue; // Ignore publisher annotations, not observations.
    const year=String(Math.floor(Number(row[0])));
    if(+year<1993||+year>2025) continue; // Fixed completed-year Lane 4 coverage.
    const obs=row.slice(1,1+missions.length).filter(c=>c!==undefined&&c.trim()!=="").map((c,i)=>numeric(c,`STAR ${year} mission ${i}`)).filter(v=>v>-999);
    if(obs.length===0) continue;
    (values[year]??=[]).push(obs.reduce((a,b)=>a+b,0)/obs.length);
  }
  const data:Annual={}, last=Math.max(...Object.keys(values).map(Number));
  for(const[y,vs]of Object.entries(values)){if(+y===last&&vs.length<10)continue;invariant(vs.length>=10,`STAR ${y}: insufficient subannual coverage`);put(data,y,round(vs.reduce((a,b)=>a+b,0)/vs.length));}
  return data;
}
export async function buildStar(p:Pipeline):Promise<void>{await p.run("seaLevel",async()=>{
  const url="https://www.star.nesdis.noaa.gov/socd/lsa/SeaLevelRise/slr/slr_sla_gbl_free_ref_90.csv";
  await p.save({key:"seaLevel",data:parseSeaLevel(await getText(url,"csv")),bounds:SPECS.seaLevel.bounds,meta:metadata("seaLevel","computed from NOAA STAR satellite altimetry",url,"Each published observation is the mean of the altimeter missions reporting on that date (TOPEX/Poseidon, Jason-1, Jason-2, Jason-3, Sentinel-6MF overlap at handovers); the annual value is the arithmetic mean of a calendar year's observations, 1993 onward; original reference baseline retained, no rebasing.","Calendar-year mean of subannual observations; at least ten observations required. The latest year is excluded until it meets the full-year coverage requirement.")});
});}
