// Small, dependency-free SVG charts. All charts are drawn from the data
// files; nothing is fetched, and no chart library is vendored.
// Revision: softer area fill, a highlighted 2024 point with its value,
// fewer, lighter gridlines, and bar tracks so bars read at a glance.
import { YEARS } from "./data.js";
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
export function lineChart(values, opts) {
  const o = Object.assign({ color: "#2e3a8c", w: 680, h: 270, dec: 1, unit: "" }, opts || {});
  const padL = 60, padR = 14, padT = 26, padB = 30;
  const min = Math.min.apply(null, values), max = Math.max.apply(null, values);
  const span = (max - min) || 1, lo = min - span * 0.14, hi = max + span * 0.14;
  const x = i => padL + i * (o.w - padL - padR) / (values.length - 1);
  const y = v => padT + (hi - v) * (o.h - padT - padB) / (hi - lo);
  const pts = values.map((v, i) => x(i).toFixed(1) + "," + y(v).toFixed(1)).join(" ");
  const area = padL + "," + (o.h - padB) + " " + pts + " " + x(values.length - 1).toFixed(1) + "," + (o.h - padB);
  const fmtV = v => v.toLocaleString("en-US", { minimumFractionDigits: o.dec, maximumFractionDigits: o.dec });
  let grid = "";
  for (let g = 0; g <= 2; g++) {
    const v = lo + (hi - lo) * g / 2, yy = y(v);
    grid += '<line x1="' + padL + '" y1="' + yy.toFixed(1) + '" x2="' + (o.w - padR) + '" y2="' + yy.toFixed(1) + '" stroke="#e6efe9"/>' +
      '<text class="axis" x="' + (padL - 8) + '" y="' + (yy + 4).toFixed(1) + '" text-anchor="end">' + v.toFixed(o.dec) + "</text>";
  }
  let labels = "";
  YEARS.forEach((yr, i) => { if (i % 2 === 0) labels += '<text class="axis" x="' + x(i).toFixed(1) + '" y="' + (o.h - 9) + '" text-anchor="middle">' + yr + "</text>"; });
  let dots = "";
  values.forEach((v, i) => {
    const last = i === values.length - 1;
    dots += '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(v).toFixed(1) + '" r="' + (last ? 5.5 : 3) + '" fill="' + (last ? "#c65d3b" : o.color) + '"' + (last ? ' stroke="#fff" stroke-width="2"' : "") + '><title>' + YEARS[i] + ": " + fmtV(v) + (o.unit ? " " + esc(o.unit) : "") + "</title></circle>";
  });
  const endLabel = '<text class="axis-val" x="' + x(values.length - 1).toFixed(1) + '" y="' + (y(values[values.length - 1]) - 12).toFixed(1) + '" text-anchor="end">' + fmtV(values[values.length - 1]) + (o.unit ? " " + esc(o.unit) : "") + " · 2024</text>";
  const startLabel = '<text class="axis" x="' + x(0).toFixed(1) + '" y="' + (y(values[0]) - 10).toFixed(1) + '" text-anchor="start">' + fmtV(values[0]) + " · 2015</text>";
  return '<svg class="chart" viewBox="0 0 ' + o.w + " " + o.h + '" role="img" aria-label="Line chart, 2015 to 2024">' +
    grid + '<polygon points="' + area + '" fill="' + o.color + '" opacity="0.08"/>' +
    '<polyline points="' + pts + '" fill="none" stroke="' + o.color + '" stroke-width="2.75" stroke-linejoin="round" stroke-linecap="round"/>' +
    dots + startLabel + endLabel + labels + "</svg>";
}
export function barChart(rows, opts) {
  // rows: [{label, value}] — horizontal bars on a light track, value at the end.
  const o = Object.assign({ color: "#2e3a8c", w: 680, dec: 1, unit: "" }, opts || {});
  const max = Math.max.apply(null, rows.map(r => r.value)) || 1;
  const rowH = 36, h = rows.length * rowH + 10;
  let body = "";
  rows.forEach((r, i) => {
    const yy = 10 + i * rowH, bw = Math.max(3, (r.value / max) * 420);
    body += '<text class="axis" x="0" y="' + (yy + 16) + '" font-weight="600" fill="#33454f">' + esc(r.label) + "</text>" +
      '<rect x="150" y="' + (yy + 3) + '" width="420" height="20" rx="10" fill="#e6efe9"/>' +
      '<rect x="150" y="' + (yy + 3) + '" width="' + bw.toFixed(1) + '" height="20" rx="10" fill="' + o.color + '"/>' +
      '<text class="axis-val" x="' + (580) + '" y="' + (yy + 17) + '" text-anchor="start">' + r.value.toLocaleString("en-US", { minimumFractionDigits: o.dec, maximumFractionDigits: o.dec }) + (o.unit ? " " + esc(o.unit) : "") + "</text>";
  });
  return '<svg class="chart" viewBox="0 0 ' + o.w + " " + h + '" role="img" aria-label="Bar chart">' + body + "</svg>";
}
export function spark(values, color) {
  const w = 120, h = 34, min = Math.min.apply(null, values), max = Math.max.apply(null, values);
  const span = (max - min) || 1;
  const pts = values.map((v, i) => (i * w / (values.length - 1)).toFixed(1) + "," + (h - 4 - (v - min) / span * (h - 8)).toFixed(1)).join(" ");
  const firstY = h - 4 - (values[0] - min) / span * (h - 8);
  const lastX = w, lastY = h - 4 - (values[values.length - 1] - min) / span * (h - 8);
  return '<svg class="spark" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + " " + h + '" aria-hidden="true"><line x1="0" y1="' + (h - 1) + '" x2="' + w + '" y2="' + (h - 1) + '" stroke="#e2ddcf"/><polyline points="' + pts + '" fill="none" stroke="' + (color || "#2e3a8c") + '" stroke-width="2"/><circle cx="0" cy="' + firstY.toFixed(1) + '" r="2.5" fill="' + (color || "#2e3a8c") + '"/><circle cx="' + lastX.toFixed(1) + '" cy="' + lastY.toFixed(1) + '" r="3" fill="#c65d3b"/></svg>';
}
