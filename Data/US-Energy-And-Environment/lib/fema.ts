import {getJSON,invariant,type Annual} from "./io.ts";
import {metadata,SPECS} from "./catalog.ts";
import type {Pipeline} from "./meta.ts";
type Declaration={disasterNumber:number;fyDeclared:number;declarationType:string};
export async function buildFema(p:Pipeline):Promise<void>{await p.run("disasterDeclarations",async()=>{
  const base="https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries",data:Annual={},ids=new Map<number,number>();let finished=false;
  for(let skip=0;skip<1000000;skip+=1000){
    const url=new URL(base);url.searchParams.set("$filter","declarationType eq 'DR'");url.searchParams.set("$select","disasterNumber,fyDeclared,declarationType,id");url.searchParams.set("$orderby","id");url.searchParams.set("$top","1000");url.searchParams.set("$skip",String(skip));
    const result=await getJSON<{DisasterDeclarationsSummaries:Declaration[]}>(url.href),rows=result.DisasterDeclarationsSummaries;invariant(Array.isArray(rows),"FEMA declaration array missing");
    for(const r of rows){invariant(r.declarationType==="DR"&&Number.isInteger(r.disasterNumber)&&Number.isInteger(r.fyDeclared),"Invalid FEMA declaration");invariant(!ids.has(r.disasterNumber)||ids.get(r.disasterNumber)===r.fyDeclared,"FEMA conflicting fiscal years");ids.set(r.disasterNumber,r.fyDeclared);}
    if(rows.length<1000){finished=true;break;}
  }
  invariant(finished,"FEMA pagination exceeded limit");for(const y of ids.values()){if(y<1953||y>2025)continue;data[y]=(data[y]??0)+1;}
  for(let y=1953;y<=2025;y++)data[String(y)]??=0; // Complete API traversal establishes zero for years without DR declarations.
  await p.save({key:"disasterDeclarations",data,bounds:SPECS.disasterDeclarations.bounds,meta:metadata("disasterDeclarations","computed from OpenFEMA Disaster Declarations Summaries",base,"Filter declarationType=DR; deduplicate county/designated-area records by disasterNumber; count by fyDeclared. Completed fiscal years through 2025; ongoing FY2026 excluded.","FEMA fyDeclared fiscal-year number; completed fiscal years only.")});
});}
