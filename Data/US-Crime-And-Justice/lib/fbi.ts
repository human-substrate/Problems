import { createHash } from "node:crypto";
import { ROOT, invariant, write, type Annual } from "./io.ts";
import { text } from "./cache.ts";
import { META } from "./meta.ts";
import type { Result } from "./build.ts";
export const OFFENSES = {"motor-vehicle-theft":"motorVehicleTheftRate",burglary:"burglaryRate",robbery:"robberyRate","aggravated-assault":"aggravatedAssaultRate"};
export const FBI = Object.values(OFFENSES);
const baseNotes = Object.fromEntries(FBI.map(k=>[k,META[k].note]));
const method = "Sum all twelve monthly offenses.actuals[United States Offenses] counts for each calendar year, divide by that year's December populations.participated_population[United States] (the population covered by reporting agencies, the FBI's own denominator: the twelve monthly offenses.rates values sum to this figure within rounding), then multiply by 100,000; round to one decimal. Drop incomplete years; never sum monthly rates.";
function numeric(v:unknown):number { return typeof v==='number'?v:typeof v==='string'&&v.trim()!==''?Number(v):NaN; }
export function annualize(payload:any):Annual {
  const counts=payload?.offenses?.actuals?.['United States Offenses'];
  const populations=payload?.populations?.participated_population?.['United States'];
  invariant(counts&&populations,'CDE: missing actuals or population maps');
  const data:Annual={};
  for(let year=2000;year<=2025;year++){
    const months=Array.from({length:12},(_,i)=>`${String(i+1).padStart(2,'0')}-${year}`);
    if(!months.every(m=>Object.hasOwn(counts,m)&&Number.isFinite(numeric(counts[m]))))continue;
    const values=months.map(m=>numeric(counts[m])),population=numeric(populations[`12-${year}`]);
    invariant(values.every(v=>v>=0)&&Number.isFinite(population)&&population>0,`CDE ${year}: invalid count or December participated population`);
    data[year]=Math.round(values.reduce((a,b)=>a+b,0)/population*100000*10)/10;
  }
  invariant(Object.keys(data).length>=15,'CDE: fewer than 15 complete years');
  return data;
}
async function source(offense:string):Promise<string>{
  const path=`.cache/cde-${offense}.json`;
  const manifest=await Bun.file(`${ROOT}/sources.json`).json();
  if(manifest.files[path]&&await Bun.file(`${ROOT}/${path}`).exists())return path;
  const url=`https://api.usa.gov/crime/fbi/cde/summarized/national/${offense}?from=01-2000&to=12-2025`;
  const key=process.env.FBI_API_KEY||'DEMO_KEY';
  let response:Response;
  try { response=await fetch(`${url}&API_KEY=${encodeURIComponent(key)}`,{signal:AbortSignal.timeout(30000)}); }
  catch(e){throw new Error(`${url}: fetch failed: ${String(e).replaceAll(encodeURIComponent(key),'[REDACTED]').replaceAll(key,'[REDACTED]')}`);}
  const raw=await response.text();
  invariant(response.status===200,`${url}: LIVE HTTP ${response.status} ${response.statusText}; body: ${raw}`);
  invariant(raw.trim().length>0,'CDE empty HTTP 200 body');
  await write(path,raw);
  const sha256=createHash('sha256').update(new Uint8Array(await Bun.file(`${ROOT}/${path}`).arrayBuffer())).digest('hex');
  const latest=await Bun.file(`${ROOT}/sources.json`).json();
  invariant(latest.files&&/^[a-f0-9]{64}$/.test(sha256),'CDE invalid manifest or seal');
  latest.files[path]={url,read:new Date().toISOString().slice(0,10),sha256};
  await write('sources.json',JSON.stringify(latest,null,2)+'\n');
  return path;
}
export async function fbi(defer:(key:string,error:string)=>void):Promise<Result[]>{
  const results:Result[]=[];
  for(const [offense,key] of Object.entries(OFFENSES)){
    try {
      const path=await source(offense),payload=JSON.parse(await text(path)),data=annualize(payload);
      const horizon=payload?.cde_properties?.max_data_date?.UCR;
      const coverage=payload?.tooltips?.['Percent of Population Coverage']?.['United States'];
      invariant(horizon!==undefined&&coverage!==undefined,`${key}: missing horizon or coverage`);
      const covVals=Object.values(coverage as Record<string,number>).map(Number).filter(Number.isFinite);
      const cov2021=Object.entries(coverage as Record<string,number>).filter(([m])=>m.endsWith("-2021")).map(([,v])=>Number(v));
      await write(`work/coverage-${key}.json`,JSON.stringify({maxDataDate:horizon,percentOfPopulationCoverage:coverage},null,1));
      META[key].note=`${baseNotes[key]} Denominator: the population covered by agencies that reported that month, the FBI's own basis for its CDE rates, so this line is not the same construct as the estimated national rates (violent, property, homicide) beside it, which the FBI estimates for the whole population. Agency coverage of the U.S. population ranged ${Math.min(...covVals).toFixed(1)}–${Math.max(...covVals).toFixed(1)}% across 2000–2024 (${cov2021.length?Math.min(...cov2021).toFixed(1)+"–"+Math.max(...cov2021).toFixed(1)+"% during the 2021 NIBRS transition":"2021 not reported"})`;
      const expected=key==='robberyRate'?60.6:key==='aggravatedAssaultRate'?256.1:undefined;
      if(expected!==undefined&&data[2024]!==expected){
        const row=`| FBI ${key}, 2024 | ${expected} | ${path}: sum of twelve actuals / December participated population × 100,000, rounded to one decimal = ${data[2024]??'missing (incomplete year)'}. Preserve source calculation; do not substitute candidate value. |`;
        const previous=await Bun.file(`${ROOT}/work/mismatches.md`).text();
        if(!previous.includes(row)){invariant(row.includes(path),'CDE mismatch evidence');await write('work/mismatches.md',`\n${row}\n`,true);}
        console.warn(`MISMATCH ${key} 2024: candidate ${expected}, computed ${data[2024]}; recorded in work/mismatches.md`);
      }
      results.push({key,data,bounds:[0,10000],method});
    }catch(e){
      // A rate-limited refetch (HTTP 429 on DEMO_KEY) is transient: keep the last good build of this series rather than dropping it from the index.
      const prior=Bun.file(`${ROOT}/series/${key}.json`);
      if(/HTTP 429/.test(String(e))&&await prior.exists()){
        const s=await prior.json();
        invariant(s?._meta?.key===key&&Object.keys(s.data??{}).length>=15,`${key}: prior build unusable`);
        META[key].note=s._meta.note;
        console.warn(`RETAINED ${key}: refetch rate-limited (HTTP 429); prior build ${s._meta.coverage} kept`);
        results.push({key,data:s.data,bounds:[0,10000],method:"prior build retained after a rate-limited refetch"});
        continue;
      }
      defer(key,String(e));
    }
  }
  return results;
}
