import { text } from "./cache.ts";
import { invariant, num, type Annual } from "./io.ts";
import type { Result } from "./build.ts";
// Each expression selects the edition's own national annual total, never a crime-type subtotal.
const counts: Record<number, RegExp> = {
  2011:/Of the ([\d,]+) complaints received in 2011/,
  2012:/In 2012, the IC3 received ([\d,]+) consumer complaints/,
  2013:/In 2013, the IC3 received ([\d,]+) consumer complaints/,
  2014:/In 2014, the IC3 received ([\d,]+) complaints/,
  2015:/Totals\s+\$ 637,112,290\s+\$ 433,599,232\s+([\d,]+)\s+\$ 1,070,711,522/,
  2016:/IC3 received a total of ([\d,]+) complaints/,
  2017:/In 2017, IC3 received a total of ([\d,]+) complaints/,
  2018:/2018, IC3 received a total of ([\d,]+) complaints/,
  2019:/in 2019, IC3 received a total of ([\d,]+) complaints/,
  2020:/in 2020: ([\d,]+), with reported losses/,
  2021:/public: ([\d,]+) reported complaints/,
  2022:/the IC3 received ([\d,]+) complaints/,
  2023:/([\d,]+) complaints were registered/,
  2024:/In 2024, complaints totaled ([\d,]+), with losses/,
  2025:/2025 complaint highlights: ([\d,]+) complaints/,
};
const losses: Record<number,[RegExp,number]> = {
  2011:[/adjusted dollar loss of complaints was \$([\d.]+) million/,0.001],
  2012:[/adjusted dollar loss of \$(\d{3},\d{3},\d{3})/,1e-9],
  2013:[/adjusted dollar loss of \$(\d{3},\d{3},\d{3})/,1e-9],
  2014:[/adjusted dollar loss of \$(\d{3},\d{3},\d{3})/,1e-9],
  2015:[/Totals\s+\$ 637,112,290\s+\$ 433,599,232\s+288,012\s+\$ ([\d,]+)/,1e-9],
  2016:[/a total victim loss of \$([\d.]+) billion/,1],
  2017:[/\$([\d.]+) Billion\s+Over 800/,1],
  2018:[/\$([\d.]+) Billion\s+\+\+\+Complaints Received/,1],
  2019:[/losses exceeding \$([\d.]+) billion/,1],
  2020:[/Total losses of \$([\d.]+) billion were reported in 2020/,1],
  2021:[/potential losses exceeding \$([\d.]+) billion/,1],
  2022:[/800,944\s+2022\s+\$([\d.]+) Billion/,1],
  2023:[/losses exceeding \$([\d.]+) billion/,1],
  2024:[/complaints totaled 859,532, with losses of \$([\d.]+) billion/,1],
  2025:[/2025 complaint highlights: 1,008,597 complaints; \$([\d.]+) billion/,1],
};
export async function ic3(): Promise<Result[]> {
  const c: Annual={},l: Annual={},raw: Record<number,string>={};
  for(let y=2011;y<=2025;y++) {
    raw[y]=await text(`.cache/ic3/${y}.txt`);const s=raw[y].replace(/\s+/g," ");
    const cm=s.match(counts[y]),lm=s.match(losses[y][0]);invariant(cm&&lm,`IC3 ${y} missing own-year count/loss`);
    c[y]=num(cm[1]);l[y]=Number((num(lm[1])*losses[y][1]).toFixed(9));
  }
  // The later charts repeat 2017–2023. Compare every included overlapping chart point.
  // Precision-aware equality uses the chart's published 0.1-billion precision, without changing shipped precision.
  for(const edition of [2021,2022,2023]) {
    const s=raw[edition],start=s.indexOf("Complaints and Losses over the Last Five Years"),end=s.indexOf("Accessibility description:",start);
    invariant(start>=0&&end>start,`IC3 ${edition} chart bounds`);
    const chart=s.slice(start,end);let n=0;
    const pairs=[...chart.matchAll(/([\d,]+)\s+((?:19|20)\d{2})\b([\s\S]*?)(?=\n\s*[\d,]+\s*\n\s*(?:19|20)\d{2}\b|\n\s*Complaints\s+Losses)/g)];
    for(const m of pairs){const y=m[2],dollar=[...m[3].matchAll(/\$([\d.]+) Billion/g)].at(-1);invariant(dollar,`IC3 chart ${edition}/${y} loss`);invariant(c[y]===num(m[1]),`IC3 complaint overlap ${edition}/${y}`);invariant(Number(l[y].toFixed(1))===num(dollar[1]),`IC3 loss overlap ${edition}/${y}`);n++;}
    invariant(n===5,`IC3 ${edition}: expected five overlap points, got ${n}`);console.log(`PASS overlap IC3 ${edition}: 5 complaint counts and 5 losses at chart precision`);
  }
  return [{key:"ic3Complaints",data:c,bounds:[0,2000000],method:"Each 2011–2025 edition's own annual count; 2015 national totals row. Later 2021–2023 five-year chart overlaps asserted equal. Earlier milestone charts excluded after conflicting retrospective counts were found."},{key:"ic3Losses",data:l,bounds:[0,100],method:"Own-edition annual loss totals: 2011 overview millions; 2012–2015 dollar totals; 2016–2018 summary panels; 2019 overview; 2020 summary; 2021 overview; 2022 chart; 2023 overview; 2024–2025 headline. Convert dollars/millions to billions without adding precision. 2021–2023 chart overlaps asserted equal at chart precision (0.1 billion)."}];
}
