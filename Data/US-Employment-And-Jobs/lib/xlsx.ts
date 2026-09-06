// xlsx.ts — minimal .xlsx reader (zip of XML) with no dependencies: sheet names + rows by sheet name.
// Returns each row as { A: "…", B: "…" } keyed by column letter; shared strings resolved; numbers as strings.
async function member(zip: string, name: string): Promise<string> {
  const p = Bun.spawn(["unzip", "-p", zip, name], { stdout: "pipe", stderr: "pipe" });
  const txt = await new Response(p.stdout).text();
  if ((await p.exited) !== 0) throw new Error(`unzip ${name} from ${zip} failed`);
  return txt;
}
const unesc = (s: string) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
export async function sheetNames(zip: string): Promise<string[]> {
  const wb = await member(zip, "xl/workbook.xml");
  return [...wb.matchAll(/<sheet [^>]*name="([^"]+)"/g)].map((m) => unesc(m[1]));
}
export async function sheetRows(zip: string, sheet?: string | number): Promise<Record<string, string>[]> {
  const wb = await member(zip, "xl/workbook.xml");
  const sheets = [...wb.matchAll(/<sheet [^>]*name="([^"]+)"[^>]*r:id="([^"]+)"/g)].map((m) => ({ name: unesc(m[1]), rid: m[2] }));
  const rels = await member(zip, "xl/_rels/workbook.xml.rels");
  const target = (rid: string) => rels.match(new RegExp(`<Relationship [^>]*Id="${rid}"[^>]*Target="([^"]+)"`))?.[1] ?? rels.match(new RegExp(`<Relationship [^>]*Target="([^"]+)"[^>]*Id="${rid}"`))?.[1];
  const pick = typeof sheet === "number" ? sheets[sheet] : sheet ? sheets.find((s) => s.name === sheet) : sheets[0];
  if (!pick) throw new Error(`sheet ${sheet} not in [${sheets.map((s) => s.name).join(", ")}]`);
  let path = target(pick.rid)!; path = path.startsWith("/") ? path.slice(1) : `xl/${path}`;
  let strings: string[] = [];
  try { const ss = await member(zip, "xl/sharedStrings.xml"); strings = [...ss.matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) => unesc(m[1].replace(/<[^>]+>/g, ""))); } catch {}
  const xml = await member(zip, path);
  const rows: Record<string, string>[] = [];
  for (const r of xml.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)) {
    const cells: Record<string, string> = {};
    for (const c of r[1].matchAll(/<c r="([A-Z]+)(\d+)"([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const [, col, , attrs, inner] = c;
      if (!inner) continue;
      const t = attrs.match(/t="(\w+)"/)?.[1];
      const v = inner.match(/<v>([\s\S]*?)<\/v>/)?.[1];
      if (t === "inlineStr") { cells[col] = unesc(inner.replace(/<[^>]+>/g, "")); continue; }
      if (v === undefined) continue;
      cells[col] = t === "s" ? strings[Number(v)] : unesc(v);
    }
    rows.push(cells);
  }
  return rows;
}
