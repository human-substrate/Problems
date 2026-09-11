import {command,csv,download,invariant,numeric,put,type Annual} from "./io.ts";
import {metadata,SPECS} from "./catalog.ts";
import type {Pipeline} from "./meta.ts";
// Fixed ten largest metropolitan statistical areas by 2020 Census population; not a changing annual ranking.
const metros=["35620","31080","16980","19100","26420","47900","33100","37980","12060","14460"];
export async function buildAqs(p:Pipeline):Promise<void>{await p.run("unhealthyAqiDays",async()=>{
  const data:Annual={},urls:string[]=[],omitted:number[]=[];
  for(let year=1980;year<=2025;year++){
    const url=`https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_${year}.zip`,path=await download(url,`annual_aqi_by_cbsa_${year}.zip`,"zip");urls.push(url);
    const rows=csv(await command(["unzip","-p",path,`annual_aqi_by_cbsa_${year}.csv`])),h=rows[0],ci=h.indexOf("CBSA Code"),yi=h.indexOf("Year"),di=h.indexOf("Days with AQI"),vs=["Unhealthy Days","Very Unhealthy Days","Hazardous Days"].map(c=>h.indexOf(c));
    invariant(ci>=0&&yi>=0&&di>=0&&vs.every(i=>i>=0),`AQS ${year}: required headers missing`);const seen=new Set<string>();let total=0;
    for(const r of rows.slice(1)){if(!metros.includes(r[ci]))continue;invariant(+r[yi]===year&&!seen.has(r[ci]),`AQS ${year}: duplicate metro/year`);seen.add(r[ci]);invariant(numeric(r[di],"Days with AQI")>0,"AQS metro has no observations");for(const i of vs)total+=numeric(r[i],`AQS ${year} category`);}
    if(seen.size!==10){omitted.push(year);continue;} // Missing metro observations are not zero; omit the incomplete annual aggregate.
    put(data,String(year),total);
  }
  const meta=metadata("unhealthyAqiDays","computed from U.S. EPA AQS annual AQI by CBSA",urls.at(-1)!,`Sum Unhealthy Days + Very Unhealthy Days + Hazardous Days (AQI >150), excluding Unhealthy for Sensitive Groups. Fixed 2020 Census top-ten metro CBSAs: ${metros.join(", ")}. Sum of reported days, not population-weighted; monitor availability varies. Years missing any metro omitted: ${omitted.join(", ")||"none"}.`);meta.historicalSourceUrls=urls.slice(0,-1);
  await p.save({key:"unhealthyAqiDays",data,bounds:SPECS.unhealthyAqiDays.bounds,meta});
});}
