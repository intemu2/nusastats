// NusaStats router and page wiring. Hash routing only; no network calls.
import { YEARS, INDICATORS, fmt } from "./data.js";
import { PROVINCES, provinceByName } from "./provinces.js";
import { home, economy, people, provinces, provTable, compare, cmpHtml, dataPage, sources } from "./views.js";

const app = document.getElementById("app");
const ROUTES = { "": home, economy, people, provinces, compare, data: dataPage, sources };

function render() {
  const key = (location.hash || "#/").replace(/^#\//, "").split("?")[0];
  const view = ROUTES[key] || home;
  app.innerHTML = view();
  document.querySelectorAll("nav a").forEach(a => {
    const k = a.getAttribute("href").replace(/^#\//, "");
    a.classList.toggle("on", k === key || (k === "" && key === ""));
  });
  window.scrollTo(0, 0);
  wire(key);
}

function download(name, text) {
  const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
function nationalCsv() {
  let out = "indicator,code,unit," + YEARS.join(",") + "\n";
  for (const [k, ind] of Object.entries(INDICATORS)) {
    out += '"' + ind.label + '",' + ind.code + ',"' + ind.unit + '",' + ind.values.map(v => fmt(v, ind.dec)).join(",") + "\n";
  }
  return out;
}
function provCsv() {
  let out = "province,population_2024,poverty_pct_sep2024,unemployment_pct_aug2024,hdi_2024,grdp_per_capita_rp_million\n";
  for (const p of PROVINCES) {
    out += '"' + p.name + '",' + (p.pop || "") + "," + (p.poverty ?? "") + "," + (p.tpt ?? "") + "," + (p.hdi ?? "") + "," + (p.grdpPcap ?? "") + "\n";
  }
  return out;
}

function wire(key) {
  if (key === "economy") {
    const tabs = document.getElementById("econ-tabs");
    if (tabs) tabs.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      tabs.querySelectorAll("button").forEach(x => x.classList.remove("on"));
      b.classList.add("on");
      const ind = INDICATORS[b.dataset.k];
      document.getElementById("econ-chart").innerHTML =
        "<h2>" + ind.label + "</h2><p>" + ind.label + ", Indonesia, 2015–2024.</p>" +
        '<div id="chart-holder"></div><p class="src">Source: World Bank Open Data, indicator ' + ind.code + ", 2015–2024. Latest: " + fmt(ind.values[9], ind.dec) + " " + ind.unit + " (2024).</p>";
      import("./charts.js").then(m => {
        document.getElementById("chart-holder").innerHTML = m.lineChart(ind.values, { dec: ind.dec, unit: ind.unit });
      });
    });
    const go = document.getElementById("calc-go");
    if (go) go.addEventListener("click", () => {
      const amt = parseFloat(document.getElementById("calc-amt").value) || 0;
      const from = parseInt(document.getElementById("calc-from").value, 10);
      const to = parseInt(document.getElementById("calc-to").value, 10);
      const out = document.getElementById("calc-out");
      if (from === to) { out.innerHTML = "<strong>Same year — no change.</strong> Pick two different years."; return; }
      const inf = INDICATORS.inflation.values;
      let factor = 1, lo = Math.min(from, to), hi = Math.max(from, to);
      for (let y = lo + 1; y <= hi; y++) factor *= 1 + inf[YEARS.indexOf(y)] / 100;
      const val = from < to ? amt * factor : amt / factor;
      out.innerHTML = "<strong>" + amt.toLocaleString("en-US") + " in " + from + " ≈ " + Math.round(val).toLocaleString("en-US") + " in " + to + "</strong> at the CPI rates in this series (cumulative factor " + factor.toFixed(3) + ").";
    });
  }
  if (key === "provinces") {
    let sortKey = "pop", asc = false;
    const q = document.getElementById("prov-q");
    const apply = () => {
      const term = (q.value || "").toLowerCase();
      let list = PROVINCES.filter(p => p.name.toLowerCase().includes(term));
      list = list.slice().sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        if (av === null || av === undefined) return 1;
        if (bv === null || bv === undefined) return -1;
        if (typeof av === "string") return asc ? av.localeCompare(bv) : bv.localeCompare(av);
        return asc ? av - bv : bv - av;
      });
      document.getElementById("prov-table").innerHTML = provTable(list);
      bindHeads();
    };
    const bindHeads = () => {
      document.querySelectorAll("#prov-table th").forEach(th => th.addEventListener("click", () => {
        const k = th.dataset.s;
        if (k === sortKey) asc = !asc; else { sortKey = k; asc = k === "name"; }
        apply();
      }));
    };
    q.addEventListener("input", apply);
    bindHeads();
  }
  if (key === "compare") {
    const redo = () => {
      const a = document.getElementById("cmp-a").value, b = document.getElementById("cmp-b").value;
      document.getElementById("cmp-out").innerHTML = cmpHtml(a, b);
    };
    document.getElementById("cmp-a").addEventListener("change", redo);
    document.getElementById("cmp-b").addEventListener("change", redo);
  }
  if (key === "data") {
    document.getElementById("csv-btn").addEventListener("click", () => download("nusastats-indonesia-national-2015-2024.csv", nationalCsv()));
    document.getElementById("csv-prov-btn").addEventListener("click", () => download("nusastats-indonesia-provinces-2024.csv", provCsv()));
    let sortKey = "pop", asc = false;
    document.querySelectorAll("#app table th").forEach(th => th.addEventListener("click", () => {
      const k = th.dataset.s; if (!k) return;
      if (k === sortKey) asc = !asc; else { sortKey = k; asc = k === "name"; }
      const list = PROVINCES.slice().sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        if (av === null || av === undefined) return 1;
        if (bv === null || bv === undefined) return -1;
        if (typeof av === "string") return asc ? av.localeCompare(bv) : bv.localeCompare(av);
        return asc ? av - bv : bv - av;
      });
      const tables = document.querySelectorAll("#app table");
      if (tables[1]) tables[1].outerHTML = provTable(list);
    }));
  }
}
window.addEventListener("hashchange", render);
render();
