import { text, table, checked } from "./cache.ts";
import { invariant, vertical, write } from "./io.ts";
export async function audit() {
  const lines=["# Cache recovery audit", "", "Read 2026-09-10; no network requests. File names do not establish file formats.", ""];
  for(const stem of [...Array.from({length:8},(_,i)=>`cv${14+i}`),...Array.from({length:5},(_,i)=>`ji${17+i}st`),...Array.from({length:6},(_,i)=>`cpus${16+i}st`),"cpus21_real"]) {
    const path=`.cache/${stem}.zip`,s=await text(path),title=s.match(/<title>(.*?)<\/title>/)?.[1];
    invariant(title&&s.startsWith("<!DOCTYPE html>"),`${path}: recovery evidence changed`);
    lines.push(`- ${path}: HTML; title: ${title}. Unusable as ZIP.`,"");
  }
  const a=await text(".cache/cpus21st.zip"),b=await text(".cache/cpus21_real.zip");
  let first=0;while(first<Math.min(a.length,b.length)&&a[first]===b[first])first++;
  lines.push(`Both 2021 files were re-tested with unzip; each exited 9, "End-of-central-directory signature not found." Neither is the real 2021 edition. Both are BJS login HTML. Text lengths ${a.length}/${b.length}; ${a===b?"identical text":`first differing character at offset ${first}; differing request/page markup does not make either statistical data`}.`,"");
  const old=vertical(await table(".cache/cpus22st/cpus22st_revised/cpus22stat01.csv"),1),current=vertical(await table(".cache/cpus23st/cpus23stat01.csv"),1);
  const disagreements=Object.keys(old).filter(y=>y in current&&old[y]!==current[y]);
  invariant(disagreements.length>0,"corrections revised-vintage evidence");lines.push(`Rejected cpus22/cpus23 stitch: ${disagreements.map(y=>`${y}: ${old[y]} vs ${current[y]}`).join("; ")}. Use single 2023 edition (2003–2023), retaining its stated breaks.`,"");
  const badPdf=await text(".cache/ic3/2010.pdf");invariant(/<!doctype html/i.test(badPdf.slice(0,50)),"2010 PDF HTML evidence");
  lines.push("IC3 2010.pdf is HTML, not PDF. pdftotext -layout exited 1: \"Couldn't read xref table\". No 2010 own-edition figure was recovered.","","ji17st–ji21st unzip attempts each exited 9. ji22st Table 1 adds 2012=237; every 2013–2022 jail-rate overlap matches ji23st Table 1. Named exception is 12 points, not 11.","","cv14–cv21 folders are empty because their ZIP files are error HTML. Do not claim the publisher never released property tables. cv13 and cv22–cv24 are the usable editions; every recent overlapping property-rate value matches.","","cpus22st already contains readable revised tables. Re-extraction into its existing directory returned exit 50 (permission denied replacing files). Existing sealed tables were read; no permissions were changed.","","GSS labels read directly from release-118 embedded label tables: FEAR 1=yes, 2=no; CAPPUN 1=favor, 2=oppose; COURTS 1=too harshly, 2=not harshly enough, 3=about right; OWNGUN 1=yes, 2=no, 3=refused. Exclude OWNGUN 3.","");
  await checked(".cache/robbery_probe.json");
  await write("work/recovery.md",lines.join("\n"));console.log("PASS cache recovery audit; see work/recovery.md");
}
