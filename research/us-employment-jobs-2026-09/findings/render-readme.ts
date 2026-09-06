#!/usr/bin/env bun
// render-readme.ts — replaces the ANALYSIS_TABLE marker block in ../README.md with analysis.ts output.
import { join } from "node:path";
const readmePath = join(import.meta.dir, "..", "README.md");
const p = Bun.spawn(["bun", join(import.meta.dir, "analysis.ts")], { stdout: "pipe" });
const table = (await new Response(p.stdout).text()).trim();
let md = await Bun.file(readmePath).text();
const re = /<!-- ANALYSIS_TABLE -->[\s\S]*?<!-- \/ANALYSIS_TABLE -->|<!-- ANALYSIS_TABLE -->/;
if (!re.test(md)) throw new Error("marker missing");
md = md.replace(re, `<!-- ANALYSIS_TABLE -->\n${table}\n<!-- /ANALYSIS_TABLE -->`);
await Bun.write(readmePath, md);
console.log("README table rendered");
