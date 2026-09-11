import { checked, text, table } from "./cache.ts";
import { invariant, num, year, vertical, stitch, plain, type Annual } from "./io.ts";
import { readDta } from "./stata.ts";
import { valueLabels } from "./labels.ts";
export type Result = { key: string; data: Annual; bounds: [number, number]; method: string };
const result = (key: string, data: Annual, bounds: [number, number], method: string): Result => ({key,data,bounds,method});
export const GSS = [["gssFearWalking","fear",1,[1,2],"yes"],["gssFavorDeathPenalty","cappun",1,[1,2],"favor"],["gssCourtsNotHarsh","courts",2,[1,2,3],"not harshly enough"],["gssGunInHome","owngun",1,[1,2],"yes"]] as const;
function property(rows: string[][]) {
  const h = rows.findIndex(r=>r.filter(c=>year(c)).length>=5); invariant(h>=0,"property year header");
  const r = rows.slice(h+2).find(r=>/^Total/.test(r[1])); invariant(r,"property total row");
  const ys = rows[h].filter(c=>year(c)).map(c=>year(c)!);
  const cols = rows[h+1].flatMap((c,i)=>/Rate per/.test(c)?[i]:[]);
  invariant(cols.length===ys.length,"property rate columns");
  const d: Annual = {}; ys.forEach((y,i)=>{d[y]=num(r[cols[i]]);}); return d;
}
export async function ncvs(): Promise<Result[]> {
  const rows = await table(".cache/cv24/cv24at01.csv"), violent=vertical(rows,1), reported=vertical(rows,7), share: Annual={};
  for (const y of Object.keys(violent)) { invariant(violent[y]>0&&reported[y]>=0,"NCVS ratio denominator/numerator"); share[y]=Number((100*reported[y]/violent[y]).toFixed(1)); }
  const old: Annual={}; for(const r of await table(".cache/cv13/cv13f01.csv")) {const m=r[0].match(/^\s*'(\d\d)/);if(m){const y=Number(m[1]); old[String(y>=90?1900+y:2000+y)]=num(r[3]);}}
  const recent=stitch(stitch(stitch(property(await table(".cache/cv18/cv18t03.csv")),property(await table(".cache/cv22/cv22t02.csv")),"NCVS property 2018/2022"),property(await table(".cache/cv23/cv23t02.csv")),"NCVS property 2018-2022/2023"),property(await table(".cache/cv24/cv24t02.csv")),"NCVS property 2018-2023/2024");
  delete old["2006"]; // one rule for both NCVS rows: BJS marks 2006 not comparable (methodological changes), so it is omitted here as in ncvsViolentRate
  // Disjoint eras have no overlapping observations to compare. Preserve the documented four-year gap.
  invariant(Math.max(...Object.keys(old).map(Number))===2013 && Math.min(...Object.keys(recent).map(Number))===2014,"NCVS era boundary: cv13 ends 2013, the 2018 bulletin starts 2014");
  return [result("ncvsViolentRate",violent,[0,150],"cv24at01.csv: Year and total violent Rate (column 1); 2006 is publisher -- and omitted."),result("ncvsReportedShare",share,[0,100],"cv24at01.csv: 100 × reported rate (column 7) / total rate (column 1), rounded to 0.1 percentage point; rounded input rates differ from directly published percentages."),result("ncvsPropertyRate",{...old,...recent},[0,500],"cv13f01.csv property column for 1993–2013; the Criminal Victimization 2018 bulletin's Table 3 for 2014–2018; cv22/cv23/cv24 Table 2 total property rate columns for 2018–2024. Every overlapping year across editions must match exactly (2018 across cv18/cv22; 2019–2023 across cv22/cv23/cv24). 2006 is omitted as not comparable, the same rule as the violent series.")];
}
export async function corrections(): Promise<Result[]> {
  const jail23=stitch(vertical(await table(".cache/ji22st/ji22stt01.csv"),8),vertical(await table(".cache/ji23st/ji23stt01.csv"),7),"jail 2022/2023 editions");
  const jail24=vertical(await table(".cache/ji24st/ji24stt01.csv"),7);
  // Newest edition wins on overlap. BJS revised 2021–2023 by one point each in the 2024 edition; anything larger is a parse error, not a revision.
  const revised=Object.keys(jail24).filter(y=>y in jail23&&jail23[y]!==jail24[y]);
  for(const y of revised) invariant(Math.abs(jail23[y]-jail24[y])<=1,`jail 2023/2024 editions: overlap ${y}: ${jail23[y]} != ${jail24[y]}`);
  invariant(JSON.stringify(revised)===JSON.stringify(["2021","2022","2023"]),`jail 2024 edition revised unexpected years: ${revised.join(",")}`);
  const jail={...jail23,...jail24};
  return [result("jailRate",jail,[0,1000],"ji24stt01.csv column 7 (2014–2024, newest wins), ji23stt01.csv column 7 adds 2013, ji22stt01.csv column 8 adds 2012; 2013–2022 overlap of the 2022/2023 editions asserted equal; 2024 edition revises 2021–2023 by one point each."),result("correctionalSupervisionRate",vertical(await table(".cache/cpus23st/cpus23stat01.csv"),1),[0,10000],"cpus23stat01.csv Year and Total under supervision; use this single current-vintage history because the 2022 edition has revised overlap values.")];
}
export async function capital(): Promise<Result[]> { return [result("executions",vertical(await table(".cache/cp23st/cp23stat04.csv"),1),[0,1000],"cp23stat04.csv Year, Executions."),result("deathRowPopulation",vertical(await table(".cache/cp23st/cp23stat01.csv"),1),[0,10000],"cp23stat01.csv Year, Number of prisoners under sentence of death.")]; }
export async function federal(): Promise<Result[]> {
  const d: Annual={}; for(let y=2002;y<=2025;y++) {const s=plain(await text(y===2025?".cache/ussc.html":`.cache/ussc-${y}.html`));const m=s.match(/(?:received documentation on|contains documentation on)\s+([\d,]+)\s+(?:federal felony|cases|felony)/);invariant(m,`USSC ${y}: count not found`);d[y]=num(m[1]);}
  return [result("federalPrisonPopulation",vertical(await table(".cache/bop-pop.csv"),1),[0,500000],"BOP CSV: locate numeric FY rows after BOM/blank and FY headers; Total Population column. Key is fiscal year."),result("federalOffendersSentenced",d,[10000,200000],"Each FY2002–2024 Sourcebook page plus ussc.html (FY2025): Commission received/contains documentation on count of individual sentencing cases; each page supplies only its own fiscal year.")];
}
export async function gallup(): Promise<Result[]> {
  const html=await text(".cache/gallup-crime.html"), out: Result[]=[];
  for(const [key,caption] of [["gallupMoreCrime","More Crime US Table"],["gallupAfraidToWalk","Walk Alone Table"]]) {
    const t=(html.match(/<table[\s\S]*?<\/table>/g)??[]).find(t=>t.includes(`Crime &gt; ${caption}</caption>`));invariant(t,`Gallup ${caption}`);
    const d: Annual={};for(const r of t.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)){const cells=[...r[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map(c=>plain(c[1]));const y=cells[0]?.match(/^(?:19|20)\d\d/)?.[0],v=num(cells[1]);if(y&&Number.isFinite(v)&&!(y in d))d[y]=v;}
    out.push(result(key,d,[0,100],`Gallup Crime > ${caption}: ${key==="gallupMoreCrime"?"More":"Yes"} column. Newest-first dated table: last poll in each year; no averaging or interpolation.`));
  }return out;
}
export async function gss(): Promise<Result[]> {
  const path=await checked(".cache/gss_extracted/GSS_stata/gss7224_r3a.dta"),labels=await valueLabels(path,GSS.map(i=>i[1])),out: Result[]=[];
  for(const [key,v,yes,valid,label] of GSS) {
    invariant(labels[v][yes]===label,`${v}: target code label`);invariant(v!=="owngun"||labels[v][3]==="refused","OWNGUN refusal label");
    const a: Record<string,{yes:number;total:number}>={};
    await readDta(path,["year","wtssps",v],r=>{const w=r.wtssps,x=r[v];if(w===null||w<=0||x===null||!valid.includes(x as never))return;invariant(r.year!==null&&/^\d{4}$/.test(String(r.year)),"GSS year");const z=a[String(r.year)]??={yes:0,total:0};z.total+=w;if(x===yes)z.yes+=w;});
    const d: Annual={};for(const [y,z] of Object.entries(a))if(z.total>=200)d[y]=Number((100*z.yes/z.total).toFixed(1));
    out.push(result(key,d,[0,100],`${v.toUpperCase()}: embedded label ${yes}=${label}; valid ${valid.join(",")}; 100 × sum(WTSSPS for target) / sum(WTSSPS for valid responses), one decimal; weighted denominator >=200. Missing/nonpositive weights and invalid responses excluded.`));
  }return out;
}
export async function ftc(): Promise<Result[]> {
  const r=await table(".cache/ftc-csn/CSVs/2024_CSN_Number_of_Reports_by_Type.csv");
  return [result("fraudReports",vertical(r,1),[0,10000000],"2024_CSN_Number_of_Reports_by_Type.csv: Year, Fraud; not the combined Report_Count table."),result("identityTheftReports",vertical(r,2),[0,10000000],"2024_CSN_Number_of_Reports_by_Type.csv: Year, Identity Theft.")];
}
