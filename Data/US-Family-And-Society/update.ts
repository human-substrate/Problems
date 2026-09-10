#!/usr/bin/env bun
import { mkdir, writeFile, appendFile } from "node:fs/promises";
import { join } from "node:path";
import { META, type SeriesMeta, type Pipeline, type Result } from "./lib/meta.ts";
import { invariant, type Annual } from "./lib/io.ts";
import { buildCensus } from "./lib/census.ts";
import { buildGss } from "./lib/gss.ts";
import { buildPopulation } from "./lib/population.ts";
import { buildTimeMigration } from "./lib/time-migration.ts";
import { buildBirthsWelfare } from "./lib/births-welfare.ts";
const DIR=import.meta.dir;
const SERIES=join(DIR,"series");
const NOW=new Date().toISOString();
const argAfter=(flag:string):string|null=>{const i=process.argv.indexOf(flag);return i>=0?process.argv[i+1]??null:null;};
invariant(!process.argv.includes("--only")||argAfter("--only"),"--only requires comma-separated series/group names");
const only=argAfter("--only")?new Set(argAfter("--only")!.split(",")):null;
const written:Record<string,{first:string;last:string;latest:number;years:number}>={};
export async function save(key: string, data: Annual, bounds: [number, number], opts: { provisional?: number[]; extraNote?: string; partialYear?: number; partialThrough?: string } = {}): Promise<void> {
  const meta: SeriesMeta = META[key];
  invariant(meta, `${key}: no meta entry`);
  const years = Object.keys(data).sort();
  invariant(years.length > 0, `${key}: no annual values`);
  invariant(years.length >= 15 || /Exception:/.test(meta.note), `${key}: fewer than 15 observations without a named exception`);
  for (const y of years) invariant(/^\d{4}$/.test(y) && Number.isFinite(data[y]) && data[y] >= bounds[0] && data[y] <= bounds[1], `${key} ${y}: ${data[y]} outside [${bounds}]`);
  invariant(meta.breaks && meta.breaks.length > 0, `${key}: breaks must be non-empty`);
  console.log(`PASS bounds ${key}: min=${Math.min(...Object.values(data))} max=${Math.max(...Object.values(data))} bounds=[${bounds}]; breaks=${meta.breaks.length} chars`);
  await mkdir(SERIES, { recursive: true });
  await writeFile(join(SERIES, `${key}.json`), JSON.stringify({
    _meta: { key, ...meta, note: meta.note + (opts.extraNote ? " " + opts.extraNote : ""),
      ...(opts.provisional?.length ? { provisional: opts.provisional } : {}), ...(opts.partialYear ? { partialYear: opts.partialYear, partialThrough: opts.partialThrough } : {}), coverage: `${years[0]}–${years[years.length - 1]}`, fetched: NOW }, data,
  }, null, 2));
  written[key] = { first: years[0], last: years[years.length - 1], latest: data[years[years.length - 1]], years: years.length };
  console.log(`PASS ${key.padEnd(28)} ${years[0]}–${years[years.length - 1]} (${years.length}y)  latest ${data[years[years.length - 1]]}`);
}
const errors:Record<string,string>={};
const deferred:Record<string,string>={};
const seen=new Set<string>();
let depth=0;
const scrub=(value:string)=>value.replaceAll(DIR,".").replaceAll(process.env.HOME??"~~~","~");
export async function run(group:string,fn:()=>Promise<void>):Promise<void>{
  seen.add(group);
  if(only&&!only.has(group)&&depth===0)return; // --only deliberately skips unrelated units.
  depth++;
  try{await fn();}catch(error){const message=scrub(String(error));errors[group]=message;console.error(`FAIL ${group}: ${message}`);}finally{depth--;}
}
const pipeline:Pipeline={run,save:async(result:Result)=>{META[result.key]=result.meta;await save(result.key,result.data,result.bounds,{provisional:result.provisional});},defer:(key,reason)=>{invariant(reason.trim().length>30,`${key}: deferral evidence required`);deferred[key]=scrub(reason);console.log(`DEFERRED ${key}: ${deferred[key]}`);}};
await mkdir(SERIES,{recursive:true});
await buildCensus(pipeline);
await buildPopulation(pipeline);
await buildGss(pipeline);
await buildTimeMigration(pipeline);
await buildBirthsWelfare(pipeline);
if(only)for(const group of only)invariant(seen.has(group),`Unknown --only group ${group}`);
const prior:{series:Record<string,unknown>}=await Bun.file(join(DIR,"index.json")).exists()?await Bun.file(join(DIR,"index.json")).json():{series:{}};
const series:Record<string,unknown>=only?{...prior.series}:{};
for(const[key,w]of Object.entries(written)){const m=META[key];series[key]={name:m.name,unit:m.unit,source:m.source,cadence:m.cadence,annualRule:m.annualRule,class:m.class,coverage:`${w.first}–${w.last}`,fetched:NOW};}
await writeFile(join(DIR,"index.json"),JSON.stringify({generated:NOW,dataset:"US-Family-And-Society",series:Object.fromEntries(Object.entries(series).sort())},null,1));
const oldDeferred:Record<string,string>=only&&await Bun.file(join(DIR,"deferred.json")).exists()?await Bun.file(join(DIR,"deferred.json")).json():{};
for(const key of Object.keys(written))delete oldDeferred[key];
await writeFile(join(DIR,"deferred.json"),JSON.stringify({...oldDeferred,...deferred},null,2));
await appendFile(join(DIR,"update.log"),`${NOW} wrote ${Object.keys(written).length} series${only?` (--only ${[...only].join(",")})`:""}; deferred ${Object.keys(deferred).length}${Object.keys(errors).length?` ERRORS ${JSON.stringify(errors)}`:""}\n`);
if(Object.keys(errors).length){console.error(`\n${Object.keys(errors).length} group(s) failed; wrote ${Object.keys(written).length} series`);process.exit(1);}
console.log(`\nwrote ${Object.keys(written).length} series`);
