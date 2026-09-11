import { download, getText, invariant, numeric, round, type Annual, type Row } from "./io.ts";
import { xlsRows } from "./xls.ts";
import { sheetRows } from "./xlsx.ts";
import type { Pipeline, SeriesMeta } from "./meta.ts";
const BASE="https://www2.census.gov/programs-surveys/demo/tables/families/time-series/";
const CPS="2014 ASEC questionnaire redesign; decennial population-control revisions (the publisher's lettered r rows, taken over the original); 2021 appears twice in the tables (the later-method row is taken); 2025 uses Vintage-2025 population controls; 2019 onward includes same-sex married couples.";
type LivingSpec={key:string;file:string;name:string;unit:string;markers:string[];value:(r:Row)=>number;note:string;bounds:[number,number];section?:string;column?:string};
const n=(r:Row,c:string)=>numeric(r[c],`${r.A} ${c}`);
const share=(r:Row,a:string,b:string)=>{const numerator=n(r,a),denominator=n(r,b);invariant(denominator>0&&numerator<=denominator,`${r.A}: invalid ratio ${a}/${b}`);return round(100*numerator/denominator);};
const SPECS:LivingSpec[]=[
{key:"medianAgeFirstMarriageMen",file:"marital/ms2.xls",name:"Median age at first marriage, men",unit:"years",markers:["MS-2.","Men's median"],value:r=>n(r,"B"),note:"Decennial observations before 1947 and annual CPS thereafter; same-sex marriages included from 2019.",bounds:[15,45]},
{key:"medianAgeFirstMarriageWomen",file:"marital/ms2.xls",name:"Median age at first marriage, women",unit:"years",markers:["MS-2.","Women's median"],value:r=>n(r,"C"),note:"Decennial observations before 1947 and annual CPS thereafter; same-sex marriages included from 2019.",bounds:[15,45]},
{key:"adultsMarried",file:"marital/ms1.xls",name:"Married population aged 15 and older",unit:"percent",markers:["MS-1.","Married1"],section:".All races",value:r=>{const total=n(r,"B")+n(r,"J"),married=n(r,"C")+n(r,"K");invariant(total>0&&married<=total,"MS1 invalid married counts");return round(100*married/total);},note:"Computed from married men plus married women divided by total men plus total women, all races, aged 15 and older. Includes spouse absent and separated. Same-sex married couples included since 2019.",bounds:[0,100]},
{key:"marriedCoupleHouseholds",file:"households/hh1.xls",name:"Married-couple households",unit:"percent of households",markers:["HH-1.","Married couples","Total households"],value:r=>share(r,"D","B"),note:"Computed from married-couple households divided by all households. Counts use householder person weights, not the Housing Vacancy Survey housing-unit weights. HH-1 lists 1980, 1984, 1988, 1993, 2011 and 2021 twice: a footnote-lettered row (1980r, 1984b, 1988a, 1993r) or 'r'-suffixed row (2011r, 2021r) plus a plain row for the same year. The lettered/r-suffixed row is always the later-method value — HH-1's own footnotes read 'a Data based on 1988 revised processing', 'b Incorporates Hispanic-origin population controls', 'r Revised based on population from the most recent decennial census' — so it is selected deterministically over the plain row (annualRows in lib/census.ts).",bounds:[0,100]},
{key:"onePersonHouseholds",file:"households/hh4.xls",name:"One-person households",unit:"percent of households",markers:["HH-4.","One","All households"],value:r=>share(r,"C","B"),note:"Computed from one-person households divided by all households; uses person-weighted CPS household estimates.",bounds:[0,100]},
{key:"householdSize",file:"households/hh6.xls",name:"Average household size",unit:"people per household",markers:["HH-6.","Average population per household"],value:r=>n(r,"C"),note:"Publisher average population per household, all households; not average family size.",bounds:[1,6]},
{key:"childrenWithTwoParents",file:"children/ch1.xls",name:"Children living with two parents",unit:"percent of children under 18",markers:["CH-1.","Two parents","Total children under 18"],value:r=>share(r,"C","B"),note:"Computed from two-parent children divided by children under 18 in table scope. Excludes child householders, subfamily reference persons and spouses. In 2007 take 2007y (PELNMOM/PELNDAD, identifying both cohabiting parents), never 2007x (A_PARENT); gender-neutral PEPAR1/PEPAR2 pointers from 2019.",bounds:[0,100]},
{key:"oneParentFamilies",file:"families/fm1.xls",name:"One-parent families with own children under 18",unit:"percent of families with own children under 18",markers:["FM-1.","One parent families"],value:r=>share(r,"E","C"),note:"Computed from one-parent families divided by all families with own children under 18, not all families. Unrelated subfamilies included before 1980; earlier totals were revised by Census.",bounds:[0,100]},
{key:"youngAdultsWithParents",file:"adults/ad1.xls",name:"Adults aged 25–34 living with parents",unit:"percent",markers:["AD-1.","householder","Percent"],section:".25 to 34 years",value:r=>{const total=n(r,"B")+n(r,"F"),children=n(r,"C")+n(r,"G");invariant(total>0&&children<=total,"AD1 invalid counts");return round(100*children/total);},note:"Computed from male plus female children of householders divided by male plus female population aged 25–34, never averaging sex-specific percentages. Unmarried college students in dormitories are counted in their parents' homes in CPS data.",bounds:[0,100]},
{key:"cohabitingCouples",file:"adults/uc1.xls",breaks:"2014 ASEC questionnaire redesign; decennial population-control revisions (the publisher's lettered r rows, taken over the original); 2021 appears twice in the tables (the later-method row is taken); before 2007 restricted to couples with a householder partner.",name:"Unmarried opposite-sex couples, direct measure",unit:"thousands of couples",markers:["UC-1.","Unmarried couples","POSSLQ"],column:"B",value:r=>n(r,"B"),note:"Direct relationship measure, 1996–2023. Before 2007 restricted to couples with a householder partner; all opposite-sex unmarried couples included from 2007. Paired with POSSLQ, never joined to it. The publisher file ends in 2023.",bounds:[0,20000]},
{key:"cohabitingCouplesPosslq",file:"adults/uc1.xls",breaks:"Discontinued after 2006 when the CPS began measuring cohabitation directly; decennial population-control revisions (the publisher's lettered r rows, taken over the original).",name:"Opposite-sex adults sharing living quarters, POSSLQ",unit:"thousands of couples",markers:["UC-1.","POSSLQ"],column:"F",value:r=>n(r,"F"),note:"Indirect Partners of Opposite Sex Sharing Living Quarters classification; adults need not identify as unmarried partners. Decennial 1960/1970 and annual 1977–2006 observations, including three earlier annual observations present in the source beyond the requested 1980 start. Discontinued in 2007 when CPS measured cohabitation directly. Paired with cohabitingCouples, never joined; the direct measure's householder restriction changed in 2007.",bounds:[0,20000]},
];
export function annualRows(rows:Row[],section?:string):Map<string,Row> {
  const start=section?rows.findIndex(r=>r.A===section):0;
  invariant(start>=0,`Missing section ${section}`);
  const selected=new Map<string,Row>();
  for(const row of rows.slice(start)) {
    const label=(row.A??"").replace(/^\.+/,"").trim();
    if(section&&selected.size>0&&row.A?.startsWith(".")&&!/^\.+\d{4}/.test(row.A)) break;
    const year=label.match(/^((?:18|19|20)\d\d)/)?.[1];
    if(!year) continue; // Headings, source notes and blank rows are not observations.
    const previous=selected.get(year);
    if(previous) {
      // Publisher footnote letters (a-z) each mark a specific methodology revision for that row (e.g. HH-1's
      // "a  Data based on 1988 revised processing.", "b  Incorporates Hispanic-origin population controls.",
      // "r  Revised based on population from the most recent decennial census."). Every such lettered row is the
      // later-method value, comparable forward to subsequent years; the unlettered row beside it is the
      // as-originally-published value, comparable backward. The "r" suffix (optionally combined with one other
      // letter, e.g. "2021z, r") is Census's own explicit revision marker and outranks a bare letter; CH-1's 2007
      // is the one hand-documented exception, where "y" (PELNMOM/PELNDAD) is chosen over "x" (A_PARENT) by name
      // because neither is a population-control revision.
      const preferred=(value:string)=> /2007y/.test(value)?3:/\d{4}(?:[a-z], )?r(?:\b|,)/.test(value)?2:/^\d{4}[a-z]$/.test(value)?1:0;
      const oldRank=preferred(previous.A??""),newRank=preferred(row.A??"");
      invariant(oldRank!==newRank,`Unresolved duplicate year ${year}: ${previous.A} / ${row.A}`);
      if(newRank>oldRank) selected.set(year,row);
    } else selected.set(year,row);
  }
  invariant(selected.size>=15&&selected.size<200,`Unexpected annual row count ${selected.size}`);
  return selected;
}
export async function buildCensus(p:Pipeline):Promise<void>{
  for(const spec of SPECS) await p.run(spec.key,async()=>{
    const rows=await xlsRows(await download(BASE+spec.file,spec.file.split("/").at(-1)!));
    invariant(rows.length>50&&rows.length<1000,`${spec.key}: empty/truncated table`);
    const text=JSON.stringify(rows);
    invariant(spec.markers.every(marker=>text.includes(marker))&&text.includes("Source:"),`${spec.key}: header/source markers changed`);
    const data:Annual={};
    for(const [year,row] of annualRows(rows,spec.section)) {
      if(spec.column&&["N","*"].includes(row[spec.column])) continue; // Publisher missing/discontinued instrument cells.
      if(spec.key==="youngAdultsWithParents"&&row.C==="N"&&row.G==="N") continue; // AD1 publishes no parent counts for 1982.
      data[year]=spec.value(row);
    }
    const meta:SeriesMeta={name:spec.name,unit:spec.unit,source:(["adultsMarried","youngAdultsWithParents","marriedCoupleHouseholds","onePersonHouseholds","childrenWithTwoParents","oneParentFamilies"].includes(spec.key)?"computed from the U.S. Census Bureau historical family and living-arrangement tables (counts divided within the same table)":"U.S. Census Bureau, historical family and living-arrangement tables"),sourceUrl:BASE+spec.file,goodDirection:"neutral",cadence:"annual",annualRule:"publisher survey/census year; sparse historical observations retained",class:"living",breaks:spec.breaks??CPS,note:spec.note};
    await p.save({key:spec.key,data,meta,bounds:spec.bounds});
  });
  await p.run("childlessWomen40to44",async()=>{
    const url="https://www2.census.gov/programs-surveys/demo/tables/fertility/time-series/his-cps/h1.xlsx";
    const rows=await sheetRows(await download(url,"fertility.xlsx"));
    invariant(rows.length>50&&rows.length<300&&rows.some(r=>r.K==="40 to 44 years"),"Fertility header/rows changed");
    const start=rows.findIndex(r=>r.A==="PERCENT CHILDLESS"),end=rows.findIndex(r=>r.A?.startsWith("BIRTHS IN THE LAST YEAR"));
    invariant(start>0&&end>start,"Fertility panel markers missing");
    const data:Annual={};
    for(const r of rows.slice(start+1,end)) {const year=r.A?.match(/^\d{4}/)?.[0];if(year){invariant(!Object.hasOwn(data,year),`Fertility duplicate ${year}`);data[year]=round(n(r,"K"),1);}}
    invariant(Object.keys(data).length===28,"Fertility expected 28 observations");
    await p.save({key:"childlessWomen40to44",data,bounds:[0,100],meta:{name:"Women aged 40–44 who are childless",unit:"percent",source:"U.S. Census Bureau, CPS June fertility supplement, Historical Table 1",sourceUrl:url,goodDirection:"neutral",cadence:"annual",annualRule:"survey year; biennial and irregular gaps retained",class:"births",breaks:"2012 processing changes affected childlessness estimates; 2002 counts corrected in 2014.",note:"Percent childless among women aged 40–44, column K of the PERCENT CHILDLESS panel. Selected survey years 1976–2024, primarily biennial in recent decades; gaps are legitimate, not interpolated."}});
  });
  await p.run("moversShare",async()=>{
    const landing="https://www.census.gov/data/tables/time-series/demo/geographic-mobility/historic.html";
    const fallback="https://www2.census.gov/programs-surveys/demo/tables/geographic-mobility/time-series/historic/tab-a-1.xls";
    let url=fallback,rows:Row[];
    try {
      const html=await getText(landing);
      const links=[...html.matchAll(/href="([^"]+hst_mig_a_1\.xlsx)"/g)].map(m=>m[1]);
      invariant(links.length===1,"Mobility landing expected one current Table A1 XLSX link");
      url=links[0]; invariant(new URL(url).hostname==="www2.census.gov","Unexpected mobility publisher host");
      rows=await sheetRows(await download(url,"mobility-new.xlsx"));
    }catch(e){console.log(`FALLBACK mobility: ${String(e)}`);url=fallback;rows=await xlsRows(await download(url,"mobility.xls"));}
    invariant(rows.length>100&&rows.length<500,"Mobility unexpected row count");
    invariant(JSON.stringify(rows).includes("Total movers"),"Mobility total movers header missing");
    const begin=rows.findIndex(r=>/^percent$/i.test(r.A??""));
    const end=rows.findIndex((r,i)=>i>begin&&/Share of Movers|^Footnotes|^Note/i.test(r.A??""));
    invariant(begin>=0&&end>begin,"Mobility percent panel missing");
    const data:Annual={};
    for(const r of rows.slice(begin+1,end)) {
      const label=r.A??"";
      const range=label.match(/^(\d{4})\s*[-–]\s*(\d{2,4})/);
      const year=range?String(range[2].length===4?Number(range[2]):Math.floor(Number(range[1])/100)*100+Number(range[2])):label.match(/^\d{4}/)?.[0];
      if(!year)continue;
      if(Object.hasOwn(data,year))continue; // Newest-control row is listed first in Table A1.
      if(["N","X","-","(NA)"].includes(r.D))continue; // Publisher does not supply a comparable one-year estimate.
      invariant(n(r,"B")===100,`${year}: not the PERCENT panel`);
      data[year]=round(n(r,"D"),1);
    }
    await p.save({key:"moversShare",data,bounds:[0,100],meta:{name:"Moved residence in the preceding year",unit:"percent of population aged 1 and older",source:"U.S. Census Bureau, CPS ASEC Geographic Mobility Table A-1",sourceUrl:url,historicalSourceUrls:[landing,fallback],goodDirection:"neutral",cadence:"annual",annualRule:"survey/end year of the one-year movement interval",class:"living",breaks:"Question wording changed in 2004; 1972–75 and 1977–80 lack comparable one-year estimates. 2014 ASEC redesign; 2004 question wording change; 1972–75 and 1977–80 not collected; 2020-controls revision of 2020.",note:"PERCENT panel, Total movers column. Uses the later-method population-control row, listed first, for duplicate years. The current workbook reaches 2023. Its 2020-controls estimate for 2020 is 9.2%; the 2010-controls row is 9.3%. No interpolation."}});
  });
  await p.run("foreignBornShareDecennial",async()=>{
    const url="https://www2.census.gov/library/working-papers/2006/demo/pop-twps0081/tab01.xls";
    const rows=await xlsRows(await download(url,"foreign-born.xls"));
    invariant(rows.length>40&&rows.length<100&&JSON.stringify(rows).includes("Foreign-\\nborn"),"Nativity header/row shape changed");
    const start=rows.findIndex(r=>r.A==="PERCENT\n  DISTRIBUTION"),end=rows.findIndex(r=>r.A==="Footnotes:");
    invariant(start>0&&end>start,"Nativity PERCENT panel missing");
    const data:Annual={};
    for(const r of rows.slice(start+1,end)){const y=r.A?.match(/^\d{4}/)?.[0];if(y){invariant(!Object.hasOwn(data,y)&&n(r,"B")===100,"Nativity duplicate/non-percent row");data[y]=round(n(r,"H"),1);}}
    invariant(Object.keys(data).length===16,"Nativity expected sixteen decennial observations");
    await p.save({key:"foreignBornShareDecennial",data,bounds:[0,100],meta:{name:"Foreign-born population, decennial census",unit:"percent",source:"U.S. Census Bureau, Working Paper 81, Table 1",sourceUrl:url,goodDirection:"neutral",cadence:"annual",annualRule:"decennial observation year; no interpolation",class:"migration",breaks:"Alaska and Hawaii included from 1960; historical geography and nativity coverage vary.",note:"Sixteen decennial observations from 1850–2000, not annual ACS. Published percentage in the foreign-born column. For 1850/1860 the source assumes enslaved people were native-born; 1890 excludes certain Indian Territory/reservation populations. 1970 uses the 15-percent sample."}});
  });
  await p.run("foreignBornShare",async()=>p.defer("foreignBornShare","No CENSUS_API_KEY found via `has CENSUS_API_KEY` (returned CENSUS_API_KEY no); environment key absent. Annual ACS B05002_013E / B05002_001E requires the key under this task contract. Intended endpoint: https://api.census.gov/data/<year>/acs/acs1?get=B05002_001E,B05002_013E&for=us:1. Supply CENSUS_API_KEY to enable the annual line; the decennial series is retained separately."));
}
