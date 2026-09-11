import {csv,getText,invariant,numeric,put,type Annual} from "./io.ts";
import {metadata,SPECS} from "./catalog.ts";
import type {Pipeline} from "./meta.ts";
export async function buildNsidc(p:Pipeline):Promise<void>{await p.run("arcticSeaIce",async()=>{
  const url="https://noaadata.apps.nsidc.org/NOAA/G02135/north/monthly/data/N_09_extent_v4.0.csv";
  const rows=csv(await getText(url,"csv")),h=rows[0],yi=h.findIndex(c=>/^year$/i.test(c)),mi=h.findIndex(c=>/^mo(nth)?$/i.test(c)),vi=h.findIndex(c=>/^extent$/i.test(c));
  invariant(yi>=0&&mi>=0&&vi>=0,"NSIDC year/month/extent header missing");
  const data:Annual={};
  for(const r of rows.slice(1)){invariant(Number(r[mi])===9,"NSIDC non-September record");if(+r[yi]>2025)continue;const v=numeric(r[vi],"NSIDC extent");if(v<0)continue;put(data,r[yi],v);}
  await p.save({key:"arcticSeaIce",data,bounds:SPECS.arcticSeaIce.bounds,meta:metadata("arcticSeaIce","NSIDC Sea Ice Index",url,"Published September monthly mean extent, million square kilometers; extent column, not area.","September mean, keyed to calendar year.")});
});}
