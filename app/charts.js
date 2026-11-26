// Small, dependency-free SVG charts. All charts are drawn from the data
// files; nothing is fetched, and no chart library is vendored.
import { YEARS } from "./data.js";
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
export function lineChart(values, opts) {
  const o = Object.assign({ color: "#0b6b5c", w: 680, h: 260, dec: 1, unit: "" }, opts || {});
  const padL = 58, padR = 12, padT = 14, padB = 28;
  const min = Math.min.apply(null, values), max = Math.max.apply(null, values);
  const span = (max - min) || 1, lo = min - span * 0.12, hi = max + span * 0.12;
  const x = i => padL + i * (o.w - padL - padR) / (values.length - 1);
  const y = v => padT + (hi - v) * (o.h - padT - padB) / (hi - lo);
  const pts = values.map((v, i) => x(i).toFixed(1) + "," + y(v).toFixed(1)).join(" ");
  let grid = "";
  for (let g = 0; g <= 3; g++) {
    const v = lo + (hi - lo) * g / 3, yy = y(v);
    grid += '<line x1="' + padL + '" y1="' + yy.toFixed(1) + '" x2="' + (o.w - padR) + '" y2="' + yy.toFixed(1) + '" stroke="#e3ebe8"/>' +
      '<text class="axis" x="' + (padL - 6) + '" y="' + (yy + 4).toFixed(1) + '" text-anchor="end">' + v.toFixed(o.dec) + "</text>";
  }
  let labels = "";
  YEARS.forEach((yr, i) => { if (i % 2 === 0) labels += '<text class="axis" x="' + x(i).toFixed(1) + '" y="' + (o.h - 8) + '" text-anchor="middle">' + yr + "</text>"; });
  let dots = "";
  values.forEach((v, i) => { dots += '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(v).toFixed(1) + '" r="3.5" fill="' + o.color + '"><title>' + YEARS[i] + ": " + v.toLocaleString("en-US") + (o.unit ? " " + esc(o.unit) : "") + "</title></circle>"; });
  return '<svg class="chart" viewBox="0 0 ' + o.w + " " + o.h + '" role="img" aria-label="Line chart, 2015 to 2024">' +
    grid + '<polyline points="' + pts + '" fill="none" stroke="' + o.color + '" stroke-width="2.5" stroke-linejoin="round"/>' +
    dots + labels + "</svg>";
}
export function barChart(rows, opts) {
  // rows: [{label, value}] — horizontal bars, value shown at the end.
  const o = Object.assign({ color: "#0b6b5c", w: 680, dec: 1, unit: "" }, opts || {});
  const max = Math.max.apply(null, rows.map(r => r.value)) || 1;
  const rowH = 34, h = rows.length * rowH + 8;
  let body = "";
  rows.forEach((r, i) => {
    const yy = 8 + i * rowH, bw = Math.max(2, (r.value / max) * 420);
    body += '<text class="axis" x="0" y="' + (yy + 15) + '">' + esc(r.label) + "</text>" +
      '<rect x="150" y="' + (yy + 2) + '" width="' + bw.toFixed(1) + '" height="18" rx="4" fill="' + o.color + '"/>' +
      '<text class="axis" x="' + (158 + bw).toFixed(1) + '" y="' + (yy + 15) + '">' + r.value.toLocaleString("en-US", { minimumFractionDigits: o.dec, maximumFractionDigits: o.dec }) + (o.unit ? " " + esc(o.unit) : "") + "</text>";
  });
  return '<svg class="chart" viewBox="0 0 ' + o.w + " " + h + '" role="img" aria-label="Bar chart">' + body + "</svg>";
}
export function spark(values, color) {
  const w = 120, h = 34, min = Math.min.apply(null, values), max = Math.max.apply(null, values);
  const span = (max - min) || 1;
  const pts = values.map((v, i) => (i * w / (values.length - 1)).toFixed(1) + "," + (h - 4 - (v - min) / span * (h - 8)).toFixed(1)).join(" ");
  return '<svg class="spark" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + " " + h + '" aria-hidden="true"><polyline points="' + pts + '" fill="none" stroke="' + (color || "#0b6b5c") + '" stroke-width="2"/></svg>';
}
