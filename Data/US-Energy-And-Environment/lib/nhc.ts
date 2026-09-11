import {getText,links,invariant,type Annual} from "./io.ts";
import {metadata,SPECS} from "./catalog.ts";
import type {Pipeline} from "./meta.ts";
export function parseHurdat(text:string):Annual{
  const lines=text.trim().split(/\r?\n/),data:Annual={},ids=new Set<string>();
  for(let i=0;i<lines.length;){
    const h=lines[i++].split(",").map(c=>c.trim());invariant(/^AL\d{6}$/.test(h[0]),`HURDAT invalid Atlantic header ${h[0]}`);invariant(!ids.has(h[0]),"Duplicate HURDAT storm");ids.add(h[0]);
    const y=h[0].slice(-4),n=Number(h[2]);invariant(Number.isInteger(n)&&n>0&&i+n<=lines.length,"HURDAT truncated track");let peak=0;
    for(let j=0;j<n;j++){const r=lines[i++].split(",").map(c=>c.trim());invariant(/^\d{8}$/.test(r[0])&&Number.isFinite(Number(r[6])),"HURDAT invalid date/wind");peak=Math.max(peak,Number(r[6]));}
    if(+y>2025)continue; // Exclude incomplete or beyond-spec seasons.
    data[y]??=0;if(peak>=34)data[y]++;
  }
  invariant(ids.size>0,"HURDAT empty archive");return data;
}
export async function buildNhc(p:Pipeline):Promise<void>{await p.run("namedStorms",async()=>{
  const landing="https://www.nhc.noaa.gov/data/",urls=links(await getText(landing),landing).filter(u=>new URL(u).hostname==="www.nhc.noaa.gov"&&/\/hurdat2-\d{4}-\d{4}-\d+\.txt$/.test(u));
  invariant(urls.length>0,"NHC Atlantic HURDAT2 link missing");const url=urls.sort((a,b)=>Number(b.match(/hurdat2-\d{4}-(\d{4})/)![1])-Number(a.match(/hurdat2-\d{4}-(\d{4})/)![1]))[0];
  await p.save({key:"namedStorms",data:parseHurdat(await getText(url,"text")),bounds:SPECS.namedStorms.bounds,meta:metadata("namedStorms","computed from NOAA NHC Atlantic HURDAT2",url,"Count each unique AL storm header once when peak track maximum sustained wind (field 7) is at least 34 knots; season from storm ID. Includes systems that reached 34 knots but were never named operationally (every pre-1950 storm, the 2005 unnamed subtropical storm, and Tropical Depression Twenty-Two of 2005 after reanalysis), so a season can exceed the named-storm count in NHC's summary: 2005 is 29 here against 28 there.")});
});}
