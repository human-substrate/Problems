import { csv, getText, invariant, numeric, put, type Annual } from "./io.ts";
import { metadata, SPECS } from "./catalog.ts";
import type { Pipeline } from "./meta.ts";
export function parseGml(text: string, aggi=false): Annual {
  const rows=csv(text).filter(r=>!r[0].startsWith("#")), data:Annual={};
  const header=rows.find(r=>r.some(c=>/^year$/i.test(c)));
  invariant(header, "NOAA annual year header missing");
  const yearColumn=header.findIndex(c=>/^year$/i.test(c));
  const valueColumn=aggi?header.findIndex(c=>/^1990\s*=\s*1$/i.test(c)):header.findIndex(c=>/^(mean|ann inc|annual increase|average|growth)$/i.test(c));
  invariant(valueColumn>=0,`NOAA annual value column missing: ${header.join(",")}`);
  for (const row of rows) {
    const year=row[yearColumn];
    if (!/^\d{4}$/.test(year??"") || +year>=new Date().getUTCFullYear()) continue; // Skip comments, header, and incomplete current year.
    const value=numeric(row[valueColumn],`NOAA ${year}`);
    if (value<=-99) continue; // NOAA missing-value sentinel is not an observation.
    put(data,year,value);
  }
  return data;
}
export async function buildGml(p:Pipeline):Promise<void> {
  const sources:Record<string,string>={co2Concentration:"https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_annmean_mlo.csv",co2Growth:"https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_gr_gl.csv",methaneConcentration:"https://gml.noaa.gov/webdata/ccgg/trends/ch4/ch4_annmean_gl.csv",greenhouseGasIndex:"https://gml.noaa.gov/aggi/AGGI_Table.csv"};
  for(const[key,url]of Object.entries(sources)) await p.run(key,async()=>{
    const data=parseGml(await getText(url,"csv"),key==="greenhouseGasIndex");
    await p.save({key,data,bounds:SPECS[key].bounds,meta:metadata(key,"NOAA Global Monitoring Laboratory",url,"Published annual mean, annual growth, or AGGI column; uncertainty columns are not observations.")});
  });
}
