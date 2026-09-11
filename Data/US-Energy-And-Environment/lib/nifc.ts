import {getText,invariant,numeric,put,type Annual} from "./io.ts";
import {metadata,SPECS} from "./catalog.ts";
import type {Pipeline} from "./meta.ts";
export function parseFireAcres(html:string):Annual{
  const tables=[...html.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/gi)].map(m=>m[1]);
  const table=tables.find(t=>/Year/i.test(t)&&/Acres/i.test(t)&&/Fires/i.test(t));invariant(table,"NIFC annual fire/acres table missing");
  const rows=[...table.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map(m=>[...m[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(c=>c[1].replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim()));
  const h=rows.find(r=>r.some(c=>/^Year$/i.test(c)));invariant(h,"NIFC year header missing");const vi=h.findIndex(c=>/Acres/i.test(c));invariant(vi>=0,"NIFC acres column missing");const data:Annual={};
  for(const r of rows){const y=r[0]?.replace(/[*†]/g,"").trim();if(!/^\d{4}$/.test(y??"")||+y<1983||+y>2025)continue;put(data,y,numeric(r[vi]?.replace(/[*†]/g,"").trim(),`NIFC ${y}`));}
  return data;
}
export async function buildNifc(p:Pipeline):Promise<void>{await p.run("wildfireAcres",async()=>{const url="https://www.nifc.gov/fire-information/statistics/wildfires";await p.save({key:"wildfireAcres",data:parseFireAcres(await getText(url)),bounds:SPECS.wildfireAcres.bounds,meta:metadata("wildfireAcres","National Interagency Fire Center",url,"Annual wildfires table, Acres column; 1983–2025 only.")});});}
