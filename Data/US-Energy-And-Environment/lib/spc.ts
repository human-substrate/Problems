import {csv,getText,links,invariant,type Annual} from "./io.ts";
import {metadata,SPECS} from "./catalog.ts";
import type {Pipeline} from "./meta.ts";
export function parseTornadoes(text:string):Annual{
  const rows=csv(text),h=rows[0],yi=h.indexOf("yr"),oi=h.indexOf("om"),sni=h.indexOf("sn"),moi=h.indexOf("mo"),dyi=h.indexOf("dy");invariant(yi>=0&&oi>=0&&sni>=0&&moi>=0&&dyi>=0,"SPC yr/om/sn/mo/dy headers missing");const ids=new Set<string>(),data:Annual={};let duplicates=0;
  for(const r of rows.slice(1)){const y=r[yi];invariant(/^\d{4}$/.test(y),"SPC invalid year");if(+y<1950||+y>2024)continue;if(r[sni]!=="1")continue; // sn=1 is the whole-tornado record; state segments must not inflate counts.
    const id=`${y}-${r[moi]}-${r[dyi]}-${r[oi]}`;if(ids.has(id)){duplicates++;continue;}ids.add(id);data[y]=(data[y]??0)+1;
  }return data;
}
export async function buildSpc(p:Pipeline):Promise<void>{await p.run("tornadoes",async()=>{
  const landing="https://www.spc.noaa.gov/wcm/",urls=links(await getText(landing),landing).filter(u=>new URL(u).hostname==="www.spc.noaa.gov"&&/1950-\d{4}_actual_tornadoes\.csv$/.test(u));invariant(urls.length>0,"SPC actual tornado CSV link missing");const url=urls.sort().at(-1)!;
  await p.save({key:"tornadoes",data:parseTornadoes(await getText(url,"csv")),bounds:SPECS.tornadoes.bounds,meta:metadata("tornadoes","computed from NOAA Storm Prediction Center tornado records",url,"Annual count of unique yr/mo/dy/om tornado IDs with sn=1 (whole-tornado records), excluding state segments; 1950–2024.")});
});}
