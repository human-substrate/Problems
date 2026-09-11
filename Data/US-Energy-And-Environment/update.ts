#!/usr/bin/env bun
import {mkdir,appendFile,rename} from "node:fs/promises";
import {join} from "node:path";
import {META,type Pipeline,type Result} from "./lib/meta.ts";
import {SPECS} from "./lib/catalog.ts";
import {DIR,invariant,mismatch,scrub} from "./lib/io.ts";
import {buildEia} from "./lib/eia.ts";
import {buildGml} from "./lib/gml.ts";
import {buildNcei} from "./lib/ncei.ts";
import {buildStar} from "./lib/star.ts";
import {buildNsidc} from "./lib/nsidc.ts";
import {buildNifc} from "./lib/nifc.ts";
import {buildNhc} from "./lib/nhc.ts";
import {buildSpc} from "./lib/spc.ts";
import {buildFema} from "./lib/fema.ts";
import {buildBillions} from "./lib/billions.ts";
import {buildFhwa} from "./lib/fhwa.ts";
import {buildNei} from "./lib/nei.ts";
import {buildAqs} from "./lib/aqs.ts";
const now=new Date().toISOString(),args=process.argv.slice(2);
invariant(args.length===0||(args.length===2&&args[0]==="--only"&&args[1].length>0),"Usage: bun update.ts [--only key1,key2 or publisher group]");
const only=args.length?new Set(args[1].split(",")):null;
for(const value of only??[])invariant(value in SPECS||Object.values(SPECS).some(s=>s.group===value),`Unknown --only key/group ${value}`);
const written:Record<string,unknown>={},errors:Record<string,string>={},deferred:Record<string,string>={};
async function atomic(name:string,value:unknown):Promise<void>{const path=join(DIR,name);await Bun.write(`${path}.tmp`,JSON.stringify(value,null,2)+"\n");await rename(`${path}.tmp`,path);}
async function save({key,meta,data,bounds,provisional,partialYear,partialThrough}:Result):Promise<void>{
  invariant(key in SPECS,`Unknown key ${key}`);const years=Object.keys(data).sort();
  invariant(years.length>0&&years.length>=(key==="batteryCapacity"?10:15),`${key}: insufficient annual observations`);
  invariant(key!=="batteryCapacity"||/Exception:/.test(meta.note),"Battery exception must be named");
  for(const field of ["name","unit","source","sourceUrl","note","breaks","annualRule","class","cadence","goodDirection"] as const)invariant(typeof meta[field]==="string"&&meta[field].trim().length>0,`${key}: missing ${field}`);
  invariant(meta.note.includes(meta.breaks),`${key}: breaks absent from note`);
  invariant(!/[?&]api_key=/i.test(JSON.stringify(meta)),`${key}: credential-bearing metadata URL`);
  for(const y of years)invariant(/^\d{4}$/.test(y)&&Number.isFinite(data[y])&&data[y]>=bounds[0]&&data[y]<=bounds[1],`${key} ${y}: ${data[y]} outside [${bounds}]`);
  const sample=SPECS[key].sample;
  if(sample){const[y,expected,tolerance]=sample,actual=data[y];if(actual===undefined||Math.abs(actual-expected)>tolerance)await mismatch(`- ${now} ${key}[${y}]: publisher=${actual??"missing"}; Lane 4=${expected} (tolerance ${tolerance}); ${meta.sourceUrl}`);}
  META[key]=meta;const coverage=`${years[0]}–${years.at(-1)}`;
  await mkdir(join(DIR,"series"),{recursive:true});
  await atomic(`series/${key}.json`,{_meta:{key,...meta,coverage,fetched:now,...(provisional?.length?{provisional}:{}),...(partialYear?{partialYear,partialThrough}:{})},data:Object.fromEntries(years.map(y=>[y,data[y]]))});
  written[key]={...meta,coverage,fetched:now};delete deferred[key];
  console.log(`PASS ${key}: ${coverage} (${years.length}y); latest=${data[years.at(-1)!]}; bounds=[${bounds}]`);
}
const pipeline:Pipeline={save,run:async(key,fn)=>{invariant(key in SPECS,`Uncataloged build key ${key}`);if(only&&!only.has(key)&&!only.has(SPECS[key].group))return;try{await fn();}catch(error){errors[key]=scrub(String(error));console.error(`FAIL ${key}: ${errors[key]}`);}},defer:(key,reason)=>{invariant(key in SPECS&&/HTTP (403|404)|login wall|captcha/i.test(reason)&&! /transport failure|Could not resolve|DNS/i.test(reason),`${key}: genuine publisher deferral evidence required`);deferred[key]=scrub(reason);console.log(`DEFERRED ${key}: ${deferred[key]}`);}};
for(const build of [buildEia,buildGml,buildNcei,buildStar,buildNsidc,buildNifc,buildNhc,buildSpc,buildFema,buildBillions,buildFhwa,buildNei,buildAqs]){
  try{await build(pipeline);}catch(error){errors[build.name]=scrub(String(error));console.error(`FAIL ${build.name}: ${errors[build.name]}`);} // A setup failure must not block later publishers.
}
for(const[key,s]of Object.entries(SPECS)){if(only&&!only.has(key)&&!only.has(s.group))continue;if(!(key in written)&&!(key in errors)&&!(key in deferred))errors[key]="Selected key neither saved, failed, nor deferred";}
const prior=only&&await Bun.file(join(DIR,"index.json")).exists()?await Bun.file(join(DIR,"index.json")).json():{series:{}};
await atomic("index.json",{generated:now,dataset:"US-Energy-And-Environment",series:Object.fromEntries(Object.entries({...prior.series,...written}).sort())});
const oldDeferred:Record<string,string>=await Bun.file(join(DIR,"deferred.json")).exists()?await Bun.file(join(DIR,"deferred.json")).json():{};
for(const key of Object.keys(written))delete oldDeferred[key];
await atomic("deferred.json",{...oldDeferred,...deferred});
await appendFile(join(DIR,"update.log"),scrub(`${now} wrote ${Object.keys(written).length} series; only=${only?[...only].join(","):"all"}; deferred=${Object.keys(deferred).length}; errors=${JSON.stringify(errors)}\n`));
console.log(`Wrote ${Object.keys(written).length} series; ${Object.keys(errors).length} failures`);
if(Object.keys(errors).length)process.exitCode=1;
