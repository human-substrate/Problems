import { open } from "node:fs/promises";
import { join } from "node:path";
import { CACHE, command, download, invariant, round } from "./io.ts";
import { readDta } from "./stata.ts";
import type { Pipeline } from "./meta.ts";
const URL = "https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip";
export async function valueLabels(path: string, wanted: string[]): Promise<Record<string, Record<string, string>>> {
  const file = await open(path, "r");
  try {
    const h = Buffer.alloc(4096);
    invariant((await file.read(h, 0, h.length, 0)).bytesRead === h.length, "GSS short header");
    const text = h.toString("latin1");
    invariant(text.includes("<release>118</release>") && text.includes("<byteorder>LSF</byteorder>"), "GSS expected little-endian Stata118");
    const offset = text.indexOf("<map>") + 5;
    invariant(offset >= 5, "GSS missing map");
    const start = Number(h.readBigUInt64LE(offset + 88)), end = Number(h.readBigUInt64LE(offset + 96));
    invariant(end > start && end-start < 20000000, "GSS label section size changed");
    const labels = Buffer.alloc(end-start);
    invariant((await file.read(labels,0,labels.length,start)).bytesRead === labels.length, "GSS truncated label section");
    const out: Record<string, Record<string,string>> = {};
    let position = 0;
    while ((position = labels.indexOf("<lbl>", position)) !== -1) {
      const nameStart = position + 9;
      const name = labels.toString("utf8",nameStart,nameStart+129).split("\0")[0];
      const body = nameStart + 132;
      invariant(body+8 <= labels.length,"GSS truncated label table");
      const count = labels.readUInt32LE(body), textLength = labels.readUInt32LE(body+4);
      const strings = body + 8 + count*8;
      invariant(count > 0 && count < 100000 && strings+textLength <= labels.length,"GSS invalid label lengths");
      if (wanted.includes(name)) {
        const values: Record<string,string> = {};
        for(let i=0;i<count;i++) {
          const strStart = strings + labels.readUInt32LE(body+8+i*4);
          const strEnd = labels.indexOf(0,strStart);
          invariant(strStart >= strings && strEnd < strings+textLength && strEnd >= strStart,"GSS invalid label offset");
          values[labels.readInt32LE(body+8+count*4+i*4)] = labels.toString("utf8",strStart,strEnd);
        }
        out[name]=values;
      }
      position = strings+textLength;
    }
    invariant(wanted.every(name=>out[name]), `GSS missing label tables ${wanted.filter(name=>!out[name])}`);
    return out;
  } finally { await file.close(); }
}
export async function buildGss(p: Pipeline): Promise<void> {
  await p.run("gss", async()=>{
    const zip=await download(URL,"GSS_stata.zip");
    const member="GSS_stata/gss7224_r3a.dta";
    const list=await command(["unzip","-Z1",zip]);
    invariant(list.split("\n").filter(x=>x===member).length===1,"GSS expected cumulative member missing");
    const path=join(CACHE,member);
    if (!await Bun.file(path).exists()) await command(["unzip","-o","-q",zip,member,"-d",CACHE]);
    const labels=await valueLabels(path,["ATTEND","RELIG","SOCIAL"]);
    labels.SOCFREND=labels.SOCIAL;
    invariant(labels.ATTEND[6]==="nearly every week" && labels.ATTEND[7]==="every week" && labels.ATTEND[8]==="several times a week","GSS ATTEND codes changed");
    invariant(labels.RELIG[4]==="none","GSS RELIG none code changed");
    invariant(/several times a month|sev.*month/i.test(labels.SOCFREND[3]),"GSS SOCFREND threshold changed");
    console.log(`PASS GSS labels: ${JSON.stringify(labels)}`);
    const items=[{key:"gssAttendWeekly",variable:"attend",positive:[6,7,8],valid:[0,1,2,3,4,5,6,7,8],name:"Attend religious services nearly weekly or more"}, {key:"gssNoReligion",variable:"relig",positive:[4],valid:Array.from({length:13},(_,i)=>i+1),name:"No religious preference"}, {key:"gssSocialFriends",variable:"socfrend",positive:[1,2,3],valid:[1,2,3,4,5,6,7],name:"Social evenings with friends at least several times a month"}];
    const acc: Record<string,Record<string,{pos:number;all:number}>> = Object.fromEntries(items.map(it=>[it.key,{}]));
    let count=0;
    await readDta(path,["year","wtssps",...items.map(i=>i.variable)],r=>{
      count++;
      invariant(r.year!==null && Number.isInteger(r.year) && r.year>=1972 && r.year<=2024,"GSS invalid survey year");
      const w=r.wtssps;
      if(w===null||w<=0) return; // Missing/nonpositive weights never enter either sum.
      for(const it of items) {
        const v=r[it.variable];
        if(v===null||!it.valid.includes(v)) continue; // Missing and non-substantive labels excluded.
        const a=acc[it.key][r.year]??={pos:0,all:0};
        a.all+=w;
        if(it.positive.includes(v)) a.pos+=w;
      }
    });
    invariant(count>70000 && count<100000,"GSS cumulative row count changed");
    for(const it of items) await p.run(it.key,async()=>{
      const data:Record<string,number>={};
      for(const [y,a]of Object.entries(acc[it.key])) {
        if(a.all>=200) data[y]=round(100*a.pos/a.all);
        else console.log(`OMIT ${it.key} ${y}: weighted responses ${a.all} below 200`);
      }
      await p.save({key:it.key,data,bounds:[0,100],meta:{name:it.name,unit:"percent of valid weighted adult responses",source:"computed from the NORC General Social Survey cumulative microdata (WTSSPS-weighted shares)",sourceUrl:URL,goodDirection:"neutral",cadence:"annual",annualRule:"survey year; unsurveyed years omitted",class:"religion",breaks:"2021 push-to-web pandemic design; 2022 and 2024 mixed mode differ from historical in-person interviews.",note:`Computed from cumulative Stata public microdata, WTSSPS-weighted numerator divided by valid weighted denominator, minimum 200 weighted responses per year. ${it.variable.toUpperCase()} positive codes ${it.positive.join(",")} (${it.positive.map(code=>labels[it.variable.toUpperCase()][code]).join("; ")}); valid codes ${it.valid.join(",")}. Missing years are not interpolated.${it.variable==="socfrend"?" SOCFREND concerns evenings with friends outside the neighborhood.":""}`}});
    });
  });
}
