import {download,invariant,numeric,put,type Annual} from "./io.ts";
import {xlsRows} from "./xls.ts";
import {metadata,SPECS} from "./catalog.ts";
import type {Pipeline} from "./meta.ts";
export function parseFhwa(sheets:Record<string,string>[][]):Annual{
  const matches:{rows:Record<string,string>[];yc:string;vc:string;sheet:number}[]=[],evidence:string[]=[];
  for(const [sheet,rows]of sheets.entries()){
    const header=rows.find(r=>Object.values(r).some(v=>/^year$/i.test(v.trim())));
    if(!header)continue;
    const yc=Object.keys(header).find(c=>/^year$/i.test(header[c].trim()))!;
    for(const row of rows.filter(r=>r[yc]?.trim()==="2023")){
      evidence.push(`sheet ${sheet}, 2023 row: ${JSON.stringify(row)}`);
      for(const [vc,raw]of Object.entries(row)){
        let value:number;try{value=numeric(raw,`FHWA anchor ${vc}`);}catch{continue;}
        if(vc!==yc&&Math.abs(value-3246817)<=1)matches.push({rows,yc,vc,sheet});
      }
    }
  }
  invariant(matches.length===1,`FHWA expected one 2023 grand-total anchor 3246817 ±1, found ${matches.length}; ${evidence.join("; ")||"no YEAR header/2023 row found"}`);
  const {rows,yc,vc}=matches[0],data:Annual={};
  invariant(rows.some(r=>/million/i.test(Object.values(r).join(" "))),"FHWA million-mile unit missing");
  // Hold the sample-verified column letter fixed for every annual row.
  for(const r of rows){const y=r[yc]?.trim();if(!/^\d{4}$/.test(y??"")||+y<1980||+y>2023)continue;put(data,y,numeric(r[vc],`VM-202 ${y} grand-total column ${vc}`));}
  invariant(Object.keys(data).length===44,"FHWA expected all 44 years 1980–2023");
  return data;
}
export async function buildFhwa(p:Pipeline):Promise<void>{await p.run("vehicleMiles",async()=>{
  const url="https://www.fhwa.dot.gov/policyinformation/statistics/2023/xls/vm202.xls",path=await download(url,"fhwa-2023-vm202.xls","xls");
  const sheets=await Promise.all([0,1,2].map(i=>xlsRows(path,i))),data=parseFhwa(sheets);
  await p.save({key:"vehicleMiles",data,bounds:SPECS.vehicleMiles.bounds,meta:metadata("vehicleMiles","Federal Highway Administration, Highway Statistics 2023",url,"VM-202 all-motor-vehicles total, million vehicle miles; years 1980–2023 from one workbook edition. Grand-total column identified uniquely by the 2023 sample of 3,246,817 (±1) and held fixed across years.")});
});}
