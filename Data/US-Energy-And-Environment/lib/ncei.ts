import {csv,getText,invariant,numeric,put,type Annual} from "./io.ts";
import {metadata,SPECS} from "./catalog.ts";
import type {Pipeline} from "./meta.ts";
export function parseCag(text:string):Annual {
  const rows=csv(text), data:Annual={};
  invariant(rows.some(r=>/^(date|year)$/i.test(r[0]) && /value|anomaly|departure/i.test(r[1]??"")),"CAG date/value header missing");
  for(const r of rows) {
    if(!/^\d{4}(12)?$/.test(r[0])) continue; // Metadata/header lines are not data.
    const year=r[0].slice(0,4); if(+year>=new Date().getUTCFullYear()) continue; // No partial year.
    const v=numeric(r[1],`CAG ${year}`); if(v<=-99) continue; // Missing sentinel.
    put(data,year,v);
  }
  return data;
}
export async function buildNcei(p:Pipeline):Promise<void> {
  const end=new Date().getUTCFullYear()-1;
  const sources:Record<string,string>={globalTemperature:`https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/time-series/globe/land_ocean/12/12/1850-${end}.csv`,precipitation:`https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/national/time-series/110/pcp/12/12/1895-${end}.csv`};
  for(const[key,url]of Object.entries(sources)) await p.run(key,async()=>{
    const text=await getText(url,"csv");
    invariant(key!=="globalTemperature"||/1901.*2000/.test(text),"Global temperature reference period 1901–2000 not verified in response");
    await p.save({key,data:parseCag(text),bounds:SPECS[key].bounds,meta:metadata(key,"NOAA NCEI Climate at a Glance",url,key==="globalTemperature"?"12-month period ending December; global land and ocean surface temperature anomaly against the 1901–2000 average.":"12-month period ending December; contiguous United States precipitation total in inches.")});
  });
}
