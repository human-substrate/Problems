import { getJSON, invariant, put, round, SourceError, type Annual } from "./io.ts";
import { metadata, SPECS } from "./catalog.ts";
import type { Pipeline } from "./meta.ts";
const codes: Record<string,string> = {crudeProduction:"PAPRPUS",gasProduction:"NGMPPUS",coalProduction:"CLPRPUS",petroleumNetImports:"PANIPUS",refineryInput:"CORIPUS",strategicReserve:"COSQPUS",rigCount:"OGNRPUS",generationTotal:"ELETPUS",genCoal:"CLETPUS",genGas:"NGETPUS",genNuclear:"NUETPUS",genHydro:"HVETPUS",genWind:"WYETPUS",genSolar:"SOETPUS",capacityTotal:"ELGBPUS",batteryCapacity:"BTGBPUS",nuclearReactors:"NUOUPUS",nuclearCapacityFactor:"NUCASUS",salesResidential:"ESRCPUS",salesCommercial:"ESCCPUS",salesIndustrial:"ESICPUS",heatingDegreeDays:"ZWHDPUS",coolingDegreeDays:"ZWCDPUS",energyPerCapita:"TETPRUS",energyIntensity:"TETGRUS",co2PerCapita:"CDTPRUS"};
type EiaRow = {period:string; msn?:string; series?:string; duoarea?:string; value:string|number|null; units?:string; unit?:string; "value-units"?:string};
type Response = {response?:{data?:EiaRow[]; total?:string|number; routes?:{id:string;name:string}[]}; error?:unknown};
function authenticated(base: string): string {
  invariant(process.env.EIA_API_KEY, "EIA_API_KEY is missing; load the env file with Bun --env-file");
  const url = new URL(base); url.searchParams.set("api_key", process.env.EIA_API_KEY); return url.href;
}
export function parseEia(response: Response, code: string, petroleum=false): {data:Annual;unit:string} {
  invariant(!response.error && response.response?.data?.length, `EIA ${code}: missing data or API error`);
  const rows = response.response.data;
  invariant(Number(response.response.total) === rows.length, `EIA ${code}: truncated data ${rows.length}/${response.response.total}`);
  const data: Annual = {}, units = new Set<string>();
  for (const row of rows) {
    invariant((petroleum ? row.series === code && row.duoarea === "NUS" : row.msn === code) && /^\d{4}$/.test(row.period), `EIA ${code}: unexpected facet/period`);
    if (Number(row.period) >= new Date().getUTCFullYear()) continue; // Current annual row can be partial; ship completed years only.
    if (row.value === null || /^(NA|Not Available|Not Applicable)$/i.test(String(row.value))) continue; // Publisher missing-value tokens remain absent.
    invariant(String(row.value).trim() !== "" && Number.isFinite(Number(row.value)), `EIA ${code}: invalid value`);
    units.add(row.unit ?? row["value-units"] ?? row.units ?? ""); put(data,row.period,Number(row.value));
  }
  invariant(units.size === 1 && !units.has(""), `EIA ${code}: missing/mixed units`);
  return {data,unit:[...units][0]};
}
async function fetchProvedOilReserves(): Promise<{data:Annual;unit:string;url:string}> {
  const base = new URL("https://api.eia.gov/v2/petroleum/crd/pres/data/");
  for (const [k,v] of Object.entries({frequency:"annual","data[0]":"value","facets[series][]":"RCRR01NUS_1","facets[duoarea][]":"NUS",length:"5000","sort[0][column]":"period","sort[0][direction]":"asc"})) base.searchParams.set(k,v);
  return {...parseEia(await getJSON<Response>(authenticated(base.href)),"RCRR01NUS_1",true),url:base.href};
}
async function fetchMsn(code: string): Promise<{data:Annual;unit:string;url:string}> {
  const base = new URL("https://api.eia.gov/v2/total-energy/data/");
  for (const [k,v] of Object.entries({frequency:"annual","data[0]":"value","facets[msn][]":code,length:"5000","sort[0][column]":"period","sort[0][direction]":"asc"})) base.searchParams.set(k,v);
  try { return {...parseEia(await getJSON<Response>(authenticated(base.href)),code),url:base.href}; }
  catch (error) {
    if (!/HTTP 404/.test(String(error))) throw error; // Non-404 failures retain their actual evidence; changing routes cannot fix transport/auth failures.
    const root = "https://api.eia.gov/v2/electricity/";
    const queue=[root], visited=new Set<string>(), evidence:string[]=[String(error)];
    // Discover nested electricity routes from API metadata; never invent a matching MSN endpoint.
    for(let i=0;i<queue.length&&i<100;i++){
      const route=queue[i];if(visited.has(route))continue;visited.add(route);
      const schema=await getJSON<{response?:{facets?:{id:string}[];routes?:{id:string}[]}}>(authenticated(route));
      for(const child of schema.response?.routes??[]){invariant(/^[a-z0-9-]+$/i.test(child.id),"EIA malformed route identifier");queue.push(new URL(child.id+"/",route).href);}
      if(!schema.response?.facets?.some(f=>f.id==="msn"))continue; // Only MSN-capable routes accept the requested facet.
      const candidate=new URL("data/",route);candidate.search=base.search;
      try{return{...parseEia(await getJSON<Response>(authenticated(candidate.href)),code),url:candidate.href};}
      catch(retry){evidence.push(String(retry));}
    }
    throw new SourceError(evidence.join("; ")+"; electricity discovery exhausted or hit 100-route limit; no matching MSN recovered");
  }
}
export function convertEia(data: Annual, unit: string, target: string): Annual {
  const u = unit.toLowerCase().replaceAll(/[^a-z0-9]/g, ""); let factor = 1;
  const allowed: Record<string,string[]> = {
    "thousand barrels/day":["thousandbarrelsperday"], "billion cubic feet":["billioncubicfeet"],
    "thousand short tons":["thousandshorttons"], "million barrels":["millionbarrels","mmbbl"],
    "rigs":["numberofrigs","rigs","number"], "reactors":["numberofunits","units","number"],
    "percent":["percent"], "degree days":["degreedays","fahrenheitdegreedays","number"],
    "million Btu/person":["millionbtuperperson","millionbtu"],
    "thousand Btu/real dollar":["thousandbtuperchained2017dollar","thousandbtuperchained2017dollars","thousandbtuperdollar"],
    "metric tons/person":["metrictonsofcarbondioxideperperson","metrictonsperperson","metrictonscarbondioxide"],
    "GWh":["millionkilowatthours","gigawatthours"], "GW":["millionkilowatts","gigawatts"],
  };
  if (target === "million barrels" && u === "thousandbarrels") factor = 0.001;
  else if (target === "GWh" && u === "billionkilowatthours") factor = 1000;
  else if (target === "GW" && ["thousandkilowatts","megawatts"].includes(u)) factor = 0.001;
  else invariant(allowed[target]?.includes(u), `EIA unit ${unit} is not verified for ${target}`);
  return Object.fromEntries(Object.entries(data).map(([y,v])=>[y,round(v*factor)]));
}
export async function buildEia(p: Pipeline): Promise<void> {
  for (const [key,code] of Object.entries(codes)) await p.run(key,async()=>{
    const result = await fetchMsn(code), spec=SPECS[key];
    const data = convertEia(result.data,result.unit,spec.unit);
    const first = key === "genWind" ? 1983 : key === "genSolar" ? 1984 : key === "batteryCapacity" ? 2010 : 0;
    const last = 2025;
    for (const y of Object.keys(data)) if (+y < first || +y > last) delete data[y]; // Apply explicitly requested instrument coverage.
    await p.save({key,data,bounds:spec.bounds,meta:metadata(key,"U.S. Energy Information Administration, Monthly Energy Review",result.url,`MSN ${code}; publisher annual row (MER YYYY13). Original unit: ${result.unit}. Converted only by the declared unit scale.`)});
  });
  await p.run("provedOilReserves",async()=>{
    const key="provedOilReserves", result=await fetchProvedOilReserves(), spec=SPECS[key];
    const data=convertEia(result.data,result.unit,spec.unit), last=2021;
    for(const y of Object.keys(data)) if(+y>last) delete data[y];
    await p.save({key,data,bounds:spec.bounds,meta:metadata(key,"U.S. Energy Information Administration, crude oil proved reserves",result.url,`Series RCRR01NUS_1; national duoarea NUS; publisher annual observations through 2021. Original unit: ${result.unit}. Converted only by the declared unit scale.`)});
  });
  for (const [key,num,den] of [["energyIndependence","TEPRBUS","TETCBUS"],["electricityCo2Intensity","TXEIEUS","ELEGPUS"]]) await p.run(key,async()=>{
    const a=await fetchMsn(num), b=await fetchMsn(den), data:Annual={};
    const normalize=(u:string)=>u.toLowerCase().replaceAll(/[^a-z0-9]/g,"");
    let factor=1;
    if (key === "energyIndependence") invariant(a.unit===b.unit, "Energy ratio units differ");
    else {
      invariant(/millionmetricton/.test(normalize(a.unit)),`Unexpected CO2 numerator unit ${a.unit}`);
      const unit=normalize(b.unit);
      invariant(["billionkilowatthours","millionkilowatthours"].includes(unit),`Unexpected generation denominator unit ${b.unit}`);
      factor=unit==="billionkilowatthours"?1:1000;
    }
    for (const [y,v] of Object.entries(a.data)) if (b.data[y] !== undefined) { invariant(b.data[y]>0,`Zero denominator ${y}`); put(data,y,round(v/b.data[y]*factor)); }
    const meta=metadata(key,"computed from U.S. Energy Information Administration annual series",a.url,`${num} divided by ${den}; matched calendar years only. Numerator ${a.unit}; denominator ${b.unit}; unit conversion factor ${factor}.`);
    meta.historicalSourceUrls=[b.url]; await p.save({key,data,meta,bounds:SPECS[key].bounds});
  });
}
