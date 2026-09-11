import { invariant, write, ROOT } from "../lib/io.ts";
const before=await Bun.file("index.json").json();
const untouched=await Bun.file("series/executions.json").text();
async function run(args:string[],name:string,expected=0){
  const p=Bun.spawn(args,{cwd:ROOT,stdout:"pipe",stderr:"pipe"});
  const [out,err,exit]=await Promise.all([new Response(p.stdout).text(),new Response(p.stderr).text(),p.exited]);
  const clean=(out+err).replaceAll(ROOT,".");
  invariant(exit===expected,`${name}: exit ${exit}, expected ${expected}: ${clean}`);
  await write(`work/${name}.log`,`${clean}\nexit=${exit}\n`);console.log(`${name}: exit=${exit}`);
}
await run(["bun","update.ts","--only","ncvs"],"only");
const after=await Bun.file("index.json").json();
invariant(JSON.stringify(Object.keys(before.series))===JSON.stringify(Object.keys(after.series)),"--only preserves catalog keys");
invariant(untouched===await Bun.file("series/executions.json").text(),"--only preserves unrelated series bytes");
invariant(Object.keys(await Bun.file("deferred.json").json()).length===4,"--only preserves deferrals");
await run(["bun","update.ts","--only","unknown"],"invalid-selection",1);
await run(["bun",`--env-file=${process.env.HOME}/.claude/.env`,"update.ts"],"update");
await run(["bun","test","lib/checks.test.ts"],"tests");
await run(["bun","docs.ts"],"docs");
const docs=await Promise.all(["README.md","SUMMARY.md","source.md"].map(p=>Bun.file(p).text()));
await run(["bun","docs.ts"],"docs-repeat");
invariant(docs.every((s,i)=>s.length>0),"nonempty docs");
for(const [i,p] of ["README.md","SUMMARY.md","source.md"].entries())invariant(docs[i]===await Bun.file(p).text(),`deterministic docs ${p}`);
const index=await Bun.file("index.json").json(),deferred=await Bun.file("deferred.json").json();
invariant(Object.keys(index.series).length===19&&Object.keys(deferred).length===4,"19+4 completion");
await write("work/results.md","| Key | Disposition | Coverage | Points | Latest | Assert |\n|---|---|---|---:|---:|---|\n"+Object.keys({...index.series,...deferred}).sort().map(k=>{const m=index.series[k];return m?`| ${k} | shipped | ${m.coverage} | ${m.points} | ${m.latest} | pass |`:`| ${k} | deferred | — | 0 | — | n/a |`;}).join("\n")+"\n");
console.log("PASS --only merge, unrelated-file preservation, invalid selection, 19+4 completeness, deterministic docs");
