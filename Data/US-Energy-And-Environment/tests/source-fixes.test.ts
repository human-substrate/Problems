import {test,expect} from "bun:test";
import {parseEia,convertEia} from "../lib/eia.ts";
import {parseGml} from "../lib/gml.ts";
import {parseCag} from "../lib/ncei.ts";
import {parseSeaLevel} from "../lib/star.ts";
import {parseTornadoes} from "../lib/spc.ts";
import {parseBillions} from "../lib/billions.ts";
import {parseFhwa} from "../lib/fhwa.ts";
// Offline fixtures: reported source excerpts plus synthetic rows for edge cases.
test("petroleum facets, units, missing values and strict validation",()=>{
  const row={series:"RCRR01NUS_1",duoarea:"NUS",period:"2021",value:"41151",units:"MMBBL"};
  const parsed=parseEia({response:{total:2,data:[row,{...row,period:"2020",value:null}]}},row.series,true);
  expect(convertEia(parsed.data,parsed.unit,"million barrels")).toEqual({2021:41151});
  expect(()=>parseEia({response:{total:1,data:[{...row,duoarea:"OTHER"}]}},row.series,true)).toThrow("facet/period");
  expect(()=>parseEia({response:{total:2,data:[row]}},row.series,true)).toThrow("truncated");
  expect(convertEia({2024:100},"Number","degree days")).toEqual({2024:100});
  expect(convertEia({2024:14},"Metric Tons Carbon Dioxide","metric tons/person")).toEqual({2024:14});
});
test("AGGI selects index rather than duplicate Total columns",()=>{
  expect(parseGml("Year,CO2,CH4,N2O,CFC*,HCFCs,HFCs*,Total,Total,1990 = 1,change *\n2024,1,2,3,4,5,6,7,8,1.538,0.1",true)).toEqual({2024:1.538});
});
test("CAG departure header after comment preamble and existing Value header",()=>{
  expect(parseCag('# Title: "Global Land and Ocean January - December Average Temperature Departures"\n# Units: Degrees Celsius\n# Base Period: 1901-2000\nYear,Departure from Average\n1850,-0.15')).toEqual({1850:-0.15});
  expect(parseCag("Year,Value\n2024,30")).toEqual({2024:30});
});
const sea=(y:number,n:number)=>Array.from({length:n},(_,i)=>`${y+(i+1)/100},10,`).join("\n");
test("sea level drops short final year but rejects short earlier year",()=>{
  expect(parseSeaLevel(`#trend = 3.11 mm/year\nyear,TOPEX/Poseidon,Jason-1\n${sea(2024,10)}\n${sea(2025,6)}`)).toEqual({2024:10});
  expect(()=>parseSeaLevel(`#trend = 3.11 mm/year\nyear,TOPEX/Poseidon,Jason-1\n${sea(2023,6)}\n${sea(2024,10)}`)).toThrow("insufficient");
});
test("SPC sentinel numbers on distinct dates count separately; duplicates and segments do not",()=>{
  expect(parseTornadoes("yr,mo,dy,om,sn\n1995,05,09,9999,1\n1995,05,13,9999,1\n1995,05,09,9999,1\n1995,05,09,9999,0")).toEqual({1995:2});
});
const events="Weather and Climate Billion-Dollar Disasters to affect the U.S. from 1980-2024\nCost values are in millions of dollars\nName,Disaster,Begin Date,End Date,CPI-Adjusted Cost,Unadjusted Cost,Deaths\n"+Array.from({length:30},(_,i)=>`"Synthetic, event",Flooding,${1980+i}0101,${1980+i}0102,1000,500,0`).join("\n");
test("event counts and costs aggregate by begin year with gaps allowed",()=>{
  const result=parseBillions(events+'\nExtra,Flooding,19801231,19810102,2756.4,706.8,30');
  expect(result.count[1980]).toBe(2);expect(result.cost[1980]).toBe(3.7564);expect(result.count[2024]).toBeUndefined();
  expect(()=>parseBillions(events+'\nBad,Flooding,20250101,20250102,1,1,0')).toThrow("out of range");
});
const fhwa=()=>[{A:"Million vehicle miles"},{A:"YEAR",B:"TOTAL",C:"TOTAL",D:"TOTAL"},...Array.from({length:44},(_,i)=>({A:String(2023-i),B:"100",C:"200",D:String(3246817-i)}))];
test("FHWA finds unique sample column across sheets and holds it fixed",()=>{
  const result=parseFhwa([[{A:"notes"}],fhwa(),[]]);expect(result[2023]).toBe(3246817);expect(result[1980]).toBe(3246774);
  expect(()=>parseFhwa([fhwa().map(r=>(r.D?{...r,D:"300"}:r))])).toThrow("found 0");
  expect(()=>parseFhwa([fhwa().map(r=>(r.D?{...r,C:r.D}:r))])).toThrow("found 2");
  expect(()=>parseFhwa([fhwa().map(r=>r.A==="1980"?{...r,D:""}:r)])).toThrow("1980 grand-total column D");
});
