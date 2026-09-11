import {csv,getText,invariant,numeric,round,type Annual} from "./io.ts";
import {metadata,SPECS} from "./catalog.ts";
import type {Pipeline} from "./meta.ts";
export function parseBillions(text:string):{count:Annual;cost:Annual}{
  const rows=csv(text),h=rows.find(r=>r.includes("Name")&&r.includes("Begin Date")&&r.includes("CPI-Adjusted Cost"));
  invariant(h,"NCEI billion-dollar event name/date/CPI-adjusted cost header missing");
  invariant(/Cost values are in millions of dollars/i.test(text),"NCEI event cost unit missing");
  const yi=h.indexOf("Begin Date"),vi=h.indexOf("CPI-Adjusted Cost"),ni=h.indexOf("Name"),count:Annual={},cost:Annual={};
  for(const r of rows.slice(rows.indexOf(h)+1)){
    invariant(r[ni]&&/^\d{8}$/.test(r[yi]??""),"NCEI invalid event name/begin date");
    const y=r[yi].slice(0,4);invariant(+y>=1980&&+y<=2024,`NCEI event year out of range: ${y}`);
    const value=numeric(r[vi],`NCEI CPI-adjusted event cost ${y}`);invariant(value>=0,`NCEI negative event cost ${y}`);
    count[y]=(count[y]??0)+1;cost[y]=(cost[y]??0)+value;
  }
  invariant(Object.keys(count).length>=30,"NCEI event archive must cover at least 30 distinct years in 1980–2024");
  for(const y of Object.keys(cost))cost[y]=round(cost[y]/1000);
  return{count,cost};
}
export async function buildBillions(p:Pipeline):Promise<void>{
  let loaded:Promise<{url:string;count:Annual;cost:Annual}>|undefined;
  const load=()=>loaded??=(async()=>{
    const url="https://www.ncei.noaa.gov/access/billions/events-US-1980-2024.csv";
    return{url,...parseBillions(await getText(url,"csv"))};
  })();
  for(const key of ["billionDollarDisasters","billionDollarCost"])await p.run(key,async()=>{const r=await load();await p.save({key,data:key==="billionDollarCost"?r.cost:r.count,bounds:SPECS[key].bounds,meta:metadata(key,"computed from NOAA NCEI billion-dollar disaster individual event records",r.url,"Computed from individual event records (name, dates, CPI-adjusted cost); annual count and annual cost, summed by event begin-year. Costs converted from millions to billions of dollars; retain archive edition's inflation base; 1980–2024 only.","Annual event count and CPI-adjusted cost summed by event begin-year.")});});
}
