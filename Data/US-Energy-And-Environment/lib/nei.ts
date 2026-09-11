import {download,getText,links,invariant,numeric,put,type Annual} from "./io.ts";
import {sheetNames,sheetRows} from "./xlsx.ts";
import {metadata,SPECS} from "./catalog.ts";
import type {Pipeline} from "./meta.ts";
const sheetFor:Record<string,string>={emissionsSo2:"SO2",emissionsNox:"NOX",emissionsPm25:"PM25Primary",emissionsVoc:"VOC"};
export async function buildNei(p:Pipeline):Promise<void>{
  let workbook:Promise<{url:string;path:string;names:string[]}>|undefined;
  const load=()=>workbook??=(async()=>{const landing="https://www.epa.gov/air-emissions-inventories/air-pollutant-emissions-trends-data",urls=links(await getText(landing),landing).filter(u=>new URL(u).hostname.endsWith("epa.gov")&&/national_tier1_caps.*\.xlsx(?:\?|$)/i.test(u));invariant(urls.length===1,`EPA NEI expected one national_tier1_caps workbook, found ${urls.length}`);const url=urls[0],path=await download(url,"national_tier1_caps.xlsx");return{url,path,names:await sheetNames(path)};})();
  for(const[key,expected]of Object.entries(sheetFor))await p.run(key,async()=>{
    const{url,path,names}=await load(),data:Annual={};const editionNotes:string[]=[];
    const selected=names.find(n=>n===expected);invariant(selected,`NEI ${key}: expected worksheet ${expected} missing`);
    for(const name of names){const rows=await sheetRows(path,name),all=rows.map(r=>Object.values(r).join(" ")).join("\n");
      if(/read.?me|notes|method/i.test(name))editionNotes.push(all); // Retain edition-specific estimation descriptions in provenance.
      if(name!==selected)continue;
      const yearRow=rows.find(r=>Object.values(r).filter(v=>/^(19|20)\d{2}$/.test(v.trim())).length>=15);invariant(yearRow,`NEI ${name}: annual column headers missing`);
      const totals=rows.filter(r=>Object.values(r).some(v=>/^total\s+without\s+wildfires$/i.test(v.trim())));invariant(totals.length===1,`NEI ${name}: expected one Total without wildfires row`);
      invariant(/thousand.*tons|1,000.*tons|1000.*tons/i.test(all),`NEI ${name}: thousand-ton units not verified`);
      for(const[c,y]of Object.entries(yearRow)){if(!/^(19|20)\d{2}$/.test(y)||+y>2025)continue;const raw=totals[0][c];if(raw===undefined||raw.trim()===""||/^NA|^--$/.test(raw))continue;put(data,y,numeric(raw,`NEI ${key} ${y}`));}
    }
    const evidence=editionNotes.join("\n");invariant(/interpolat|project/i.test(evidence),"NEI edition estimation notes missing");
    await Bun.write(new URL("../work/nei-edition-notes.txt",import.meta.url),evidence);
    const meta=metadata(key,"U.S. EPA National Emissions Inventory trends",url,`Pollutant-specific worksheet, Total without wildfires row, annual year columns. EPA's own estimates throughout: ${key==="emissionsPm25"?"EPA publishes no PM2.5 total without wildfires before 2002, so this line begins in 2002;":"1970–2001 five-yearly then annual NEI/trends values,"} 2002–2019 EQUATES-modeled, and the years after the latest full NEI (2020 onward) interpolated or projected by EPA; no interpolation performed here.`);
    await p.save({key,data,bounds:SPECS[key].bounds,meta});
  });
}
