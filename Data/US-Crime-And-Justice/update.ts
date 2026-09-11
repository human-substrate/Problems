#!/usr/bin/env bun
import { META, KEYS } from "./lib/meta.ts";
import { ROOT, invariant, write } from "./lib/io.ts";
import { fbi, FBI } from "./lib/fbi.ts";
import { ncvs, corrections, capital, federal, gallup, gss, ftc, GSS, type Result } from "./lib/build.ts";
import { ic3 } from "./lib/ic3.ts";
import { audit } from "./lib/audit.ts";
const NOW=new Date().toISOString();
const groups: Record<string,{keys:string[];build:(defer:(key:string,error:string)=>void)=>Promise<Result[]>}>={
  fbi:{keys:FBI,build:fbi},
  ncvs:{keys:["ncvsViolentRate","ncvsPropertyRate","ncvsReportedShare"],build:ncvs},
  corrections:{keys:["jailRate","correctionalSupervisionRate"],build:corrections},
  capital:{keys:["executions","deathRowPopulation"],build:capital},
  federal:{keys:["federalPrisonPopulation","federalOffendersSentenced"],build:federal},
  gallup:{keys:["gallupMoreCrime","gallupAfraidToWalk"],build:gallup},
  gss:{keys:GSS.map(i=>i[0]),build:gss},ftc:{keys:["fraudReports","identityTheftReports"],build:ftc},
  ic3:{keys:["ic3Complaints","ic3Losses"],build:ic3},
};
const args=process.argv.slice(2),i=args.indexOf("--only");
invariant(args.length===0||(i===0&&args.length===2&&args[1].length>0),"usage: bun update.ts [--only group,key,...]");
const only=i>=0?new Set(args[1].split(",")):null;
if(only)for(const k of only)invariant(k==="fbi"||k==="audit"||k in groups||KEYS.includes(k),`unknown --only selection ${k}`);
const selected=(group:string,keys:string[])=>!only||only.has(group)||keys.some(k=>only.has(k));
const written: Record<string,unknown>={},deferred:Record<string,string>={},errors:Record<string,string>={},logs:string[]=[];
const scrub=(s:string)=>s.replaceAll(ROOT,".").replace(/\/Users\/[^/\s]+/g,"~");
function log(s:string){logs.push(scrub(s));console.log(scrub(s));}
async function run(group:string,fn:()=>Promise<void>){try{await fn();}catch(e){errors[group]=scrub(String(e));log(`FAIL ${group}: ${errors[group]}`);}}
async function save(r:Result){
  const m=META[r.key],ys=Object.keys(r.data).sort();invariant(m,`${r.key}: missing metadata`);
  invariant(ys.length>=15||(/Exception: 12 annual points/.test(m.note)&&ys.length===12),`${r.key}: insufficient annual points`);
  invariant(m.breaks.trim().length>0&&r.method.length>0,`${r.key}: missing breaks/method`);
  invariant(!r.key.startsWith("gss")&&!r.key.startsWith("ncvsReported")||/computed from/i.test(m.source),`${r.key}: computed source label`);
  for(const y of ys)invariant(/^\d{4}$/.test(y)&&Number.isFinite(r.data[y])&&r.data[y]>=r.bounds[0]&&r.data[y]<=r.bounds[1],`${r.key} ${y}: outside bounds [${r.bounds}]`);
  const meta={key:r.key,...m,method:r.method,bounds:r.bounds,coverage:`${ys[0]}–${ys.at(-1)}`,fetched:NOW,sourceRead:"2026-09-10"};
  await write(`series/${r.key}.json`,JSON.stringify({_meta:meta,data:Object.fromEntries(ys.map(y=>[y,r.data[y]]))},null,2)+"\n");
  written[r.key]={...meta,points:ys.length,latest:r.data[ys.at(-1)!]};log(`PASS ${r.key}: ${meta.coverage} (${ys.length} points), latest ${r.data[ys.at(-1)!]}`);
}
if(selected("audit",[]))await run("audit",audit);
for(const [group,g] of Object.entries(groups))if(selected(group,g.keys))await run(group,async()=>{const rows=await g.build((key,error)=>{deferred[key]=scrub(error);log(`DEFERRED ${key}: ${error}`);});invariant(new Set(rows.map(r=>r.key)).size===rows.length&&g.keys.every(k=>rows.some(r=>r.key===k)||(k in deferred))&&rows.every(r=>g.keys.includes(r.key)),`${group}: missing result`);for(const r of rows)if(!only||only.has(group)||only.has(r.key))await save(r);});
const indexPath=`${ROOT}/index.json`,defPath=`${ROOT}/deferred.json`;
const prior=only&&await Bun.file(indexPath).exists()?await Bun.file(indexPath).json():{series:{}};
const oldDeferred:Record<string,string>=only&&await Bun.file(defPath).exists()?await Bun.file(defPath).json():{};
for(const k of Object.keys(written))delete oldDeferred[k];
const series={...prior.series,...written},allDeferred={...oldDeferred,...deferred};
for(const k of Object.keys(allDeferred))delete series[k];
if(!only&&!Object.keys(errors).length)invariant(KEYS.every(k=>(k in series)!==(k in allDeferred))&&Object.keys(series).length>=19&&Object.keys(series).length<=23&&Object.keys(allDeferred).every(k=>FBI.includes(k)),"completeness: 19–23 shipped; only FBI keys may defer");
await write("index.json",JSON.stringify({dataset:"US-Crime-And-Justice",generated:NOW,sourceRead:"2026-09-10",series:Object.fromEntries(Object.entries(series).sort())},null,2)+"\n");
await write("deferred.json",JSON.stringify(allDeferred,null,2)+"\n");
log(`wrote ${Object.keys(written).length} series; index ${Object.keys(series).length}; deferred ${Object.keys(allDeferred).length}; errors ${Object.keys(errors).length}`);
await write("update.log",`${NOW}${only?` --only ${[...only].join(",")}`:""}\n${logs.join("\n")}\n`,true);
if(Object.keys(errors).length)process.exit(1);
