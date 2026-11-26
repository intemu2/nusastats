// Page views for NusaStats. Every control on every page works offline:
// tabs switch the chart, table headers sort, the search filters, the
// comparator recomputes, the calculator uses the verified inflation series,
// and the CSV button downloads a file made in the browser.
import { YEARS, INDICATORS, last, change, fmt } from "./data.js";
import { PROVINCES, BENCH, provinceByName } from "./provinces.js";
import { lineChart, barChart, spark } from "./charts.js";

function kpi(key, note) {
  const ind = INDICATORS[key], v = last(key), d = change(key);
  const cls = d > 0 ? "up" : d < 0 ? "down" : "flat";
  const sign = d > 0 ? "+" : "";
  return '<div class="card"><h3>' + ind.label + '</h3><div class="big">' + fmt(v, ind.dec) +
    ' <span style="font-size:15px;color:#5b6b76">' + ind.unit + "</span></div>" +
    '<div class="delta ' + cls + '">' + sign + fmt(d, ind.dec) + " since 2015</div>" +
    spark(ind.values) + '<p class="src">' + (note || "World Bank, 2024") + "</p></div>";
}
function chartBlock(key, title, blurb) {
  const ind = INDICATORS[key];
  return "<h2>" + title + "</h2><p>" + blurb + "</p>" +
    lineChart(ind.values, { dec: ind.dec, unit: ind.unit }) +
    '<p class="src">Source: World Bank Open Data, indicator ' + ind.code + " — " + ind.label +
    ", Indonesia, 2015–2024. Latest value: " + fmt(last(key), ind.dec) + " " + ind.unit + " (2024).</p>";
}
function tableRows(keys) {
  return "<table><thead><tr><th>Indicator</th><th class='num'>2015</th><th class='num'>2020</th><th class='num'>2024</th><th class='num'>Change 2015–24</th></tr></thead><tbody>" +
    keys.map(k => { const ind = INDICATORS[k];
      return "<tr><td>" + ind.label + "</td><td class='num'>" + fmt(ind.values[0], ind.dec) + "</td><td class='num'>" + fmt(ind.values[5], ind.dec) + "</td><td class='num'><strong>" + fmt(ind.values[9], ind.dec) + "</strong></td><td class='num'>" + (change(k) > 0 ? "+" : "") + fmt(change(k), ind.dec) + " " + ind.unit + "</td></tr>";
    }).join("") + "</tbody></table>";
}

export function home() {
  return '<p class="kicker">Indonesia · 2015–2024 · World Bank &amp; BPS</p>' +
    "<h1>Indonesia in numbers, without the noise.</h1>" +
    '<p class="lede">NusaStats gathers Indonesia\u2019s headline statistics in one place: the economy, the people, and the provinces — each figure with its source and year, each chart drawn from a ten-year series you can download.</p>' +
    '<div class="grid kpis">' + kpi("gdp") + kpi("population") + kpi("gdpPcap") + kpi("inflation") + "</div>" +
    '<div class="grid kpis" style="margin-top:14px">' + kpi("growth") + kpi("poverty") + kpi("lifeExp") + kpi("internet") + "</div>" +
    chartBlock("gdp", "The economy, 2015–2024", "GDP rose from US$860.9 billion in 2015 to US$1,396.3 billion in 2024, with one fall — 2020, the pandemic year — in between. Growth returned to about 5% a year from 2022.") +
    '<div class="grid two"><div class="card"><h3>Start with the provinces</h3><p>West Java is home to 50.3 million people (BPS projection, 2024). Poverty is lowest in Bali at 3.80% and highest in Highland Papua at 29.66% (BPS, September 2024). Human development ranges from 54.43 in Highland Papua to 84.15 in DKI Jakarta (BPS, 2024).</p><p><a href="#/provinces">See all provinces →</a></p></div>' +
    '<div class="card"><h3>Compare two provinces</h3><p>Pick any two provinces and line up population, poverty, unemployment and human development side by side — or adjust an amount for inflation between any two years from 2015 to 2024.</p><p><a href="#/compare">Open the comparator →</a></p></div></div>' +
    '<p class="src">National series: World Bank Open Data, Indonesia. Provincial figures: BPS. Full sources on the <a href="#/sources">Sources</a> page. Figures are rounded; the Data page holds the exact table.</p>';
}

export function economy() {
  return '<p class="kicker">Economy</p><h1>The economy in ten years</h1>' +
    '<p class="lede">Output, growth, prices and trade — all from the World Bank\u2019s Indonesia series, 2015–2024.</p>' +
    '<div class="grid kpis">' + kpi("gdp") + kpi("growth") + kpi("gdpPcap") + kpi("inflation") + "</div>" +
    '<div class="tabs" id="econ-tabs">' +
    ["gdp", "growth", "gdpPcap", "inflation", "exports", "imports"].map((k, i) =>
      '<button data-k="' + k + '" class="' + (i === 0 ? "on" : "") + '">' + INDICATORS[k].label + "</button>").join("") + "</div>" +
    '<div id="econ-chart">' + chartBlock("gdp", "GDP, current US$", "Indonesia\u2019s GDP in current US dollars, 2015–2024.") + "</div>" +
    "<h2>Structure of the economy, 2024</h2><p>Services are the largest share of value added, followed by industry, then agriculture.</p>" +
    barChart([
      { label: "Services", value: 43.8 }, { label: "Industry", value: 39.3 }, { label: "Agriculture, forestry & fishing", value: 12.6 },
    ], { dec: 1, unit: "% of GDP" }) +
    '<p class="src">Source: World Bank, NV.SRV.TOTL.ZS / NV.IND.TOTL.ZS / NV.AGR.TOTL.ZS, 2024. Shares do not sum to 100% because taxes less subsidies on products are excluded.</p>' +
    "<h2>What was it worth then? — inflation calculator</h2>" +
    '<p>Adjust an amount for consumer-price inflation using the World Bank CPI series for Indonesia. This is an approximation: it compounds the annual inflation rate for each year in between.</p>' +
    '<div class="card"><label for="calc-amt">Amount (in rupiah, or any currency — the maths is the same)</label>' +
    '<input id="calc-amt" type="number" value="1000000" min="0" step="1000">' +
    '<label for="calc-from">From year</label><select id="calc-from">' + YEARS.map(y => "<option" + (y === 2015 ? " selected" : "") + ">" + y + "</option>").join("") + "</select>" +
    '<label for="calc-to">To year</label><select id="calc-to">' + YEARS.map(y => "<option" + (y === 2024 ? " selected" : "") + ">" + y + "</option>").join("") + "</select>" +
    '<p style="margin-top:12px"><button class="btn" id="calc-go">Calculate</button></p>' +
    '<p id="calc-out" aria-live="polite"><strong>Rp 1,000,000 in 2015 ≈ Rp 1,306,000 in 2024</strong> at the CPI rates in this series. Check it: change the years and press Calculate.</p>' +
    '<p class="src">Rates used: 2016 3.53%, 2017 3.81%, 2018 3.20%, 2019 3.03%, 2020 1.92%, 2021 1.56%, 2022 4.21%, 2023 3.67%, 2024 2.18% (World Bank FP.CPI.TOTL.ZG).</p></div>' +
    "<h2>All economy indicators</h2>" + tableRows(["gdp", "growth", "gdpPcap", "gdpPcapPpp", "inflation", "unemployment", "exports", "imports", "agri", "industry", "services"]);
}

export function people() {
  return '<p class="kicker">People</p><h1>283.5 million people, living longer</h1>' +
    '<p class="lede">Population, health and connection — Indonesia\u2019s people in 2015–2024, from the World Bank.</p>' +
    '<div class="grid kpis">' + kpi("population") + kpi("lifeExp") + kpi("poverty") + kpi("internet") + "</div>" +
    chartBlock("population", "Population, 2015–2024", "Indonesia\u2019s population grew by 21.7 million people in nine years, from 261.8 million in 2015 to 283.5 million in 2024.") +
    chartBlock("lifeExp", "Life expectancy, 2015–2024", "Life expectancy rose from 69.5 years in 2015 to 71.3 in 2024 — but note the dip in 2020–2021, the pandemic years, when it fell to 67.5 before recovering.") +
    chartBlock("poverty", "Poverty, national poverty lines, 2015–2024", "The share of people below the national poverty line fell from 11.2% in 2015 to 9.0% in 2024, with a rise in 2020–2021. This World Bank series (9.0% in 2024) is not the same measure as BPS\u2019s September 2024 figure of 8.57% — see Sources.") +
    chartBlock("internet", "Internet use, 2015–2024", "The share of people using the internet more than tripled, from 22.1% in 2015 to 72.8% in 2024.") +
    "<h2>Health, 2015–2024</h2>" + tableRows(["infantMort", "under5Mort", "lifeExp", "density"]);
}

export function provinces() {
  const rows = PROVINCES.filter(p => p.pop).slice().sort((a, b) => b.pop - a.pop);
  return '<p class="kicker">Provinces</p><h1>Ten largest provinces, and the widest gaps</h1>' +
    '<p class="lede">Population is a BPS interim projection for mid-2024. Poverty is BPS, September 2024. Unemployment (TPT) is BPS, August 2024. Human development (HDI) is BPS, 2024. A dash means that figure was not verified for that province — it is left blank, not guessed.</p>' +
    '<p><input id="prov-q" type="search" placeholder="Search a province…" aria-label="Search provinces" style="width:100%"></p>' +
    '<div id="prov-table">' + provTable(PROVINCES) + "</div>" +
    "<h2>Largest populations, 2024</h2>" +
    barChart(rows.map(p => ({ label: p.name, value: p.pop / 1e6 })), { dec: 1, unit: "million" }) +
    '<p class="src">Source: BPS, interim population projection, mid-2024 (Statistik Indonesia 2025). National total on the same basis: 281.6 million — a projection, not the World Bank population estimate of 283.5 million on the Overview page; the two sources count differently.</p>' +
    "<h2>Poverty: lowest and highest, September 2024</h2>" +
    barChart([
      { label: "Bali", value: 3.80 }, { label: "South Kalimantan", value: 4.02 }, { label: "DKI Jakarta", value: 4.14 },
      { label: "Papua", value: 18.09 }, { label: "East Nusa Tenggara", value: 19.02 }, { label: "Central Papua", value: 27.60 }, { label: "Highland Papua", value: 29.66 },
    ], { dec: 2, unit: "%" }) +
    '<p class="src">Source: BPS via Bappenas Simreg, September 2024. National: 8.57%.</p>' +
    "<h2>Human development, 2024</h2>" +
    barChart([
      { label: "DKI Jakarta", value: 84.15 }, { label: "Yogyakarta", value: 81.62 }, { label: "Riau Islands", value: 79.89 },
      { label: "Bali", value: 78.63 }, { label: "Indonesia", value: 75.02 }, { label: "East Nusa Tenggara", value: 69.14 }, { label: "Central Papua", value: 60.25 }, { label: "Highland Papua", value: 54.43 },
    ], { dec: 2, unit: "HDI" }) +
    '<p class="src">Source: BPS press release, 15 November 2024. National HDI 75.02, up 0.63 points on 2023 (74.39).</p>';
}
export function provTable(list) {
  const cell = v => v === null || v === undefined ? "—" : v;
  return "<table><thead><tr><th data-s='name'>Province</th><th class='num' data-s='pop'>Population 2024</th><th class='num' data-s='poverty'>Poverty % (Sep 2024)</th><th class='num' data-s='tpt'>Unemployment % (Aug 2024)</th><th class='num' data-s='hdi'>HDI 2024</th><th class='num' data-s='grdpPcap'>GRDP/capita Rp m</th></tr></thead><tbody>" +
    list.map(p => "<tr><td><strong>" + p.name + "</strong></td><td class='num'>" + (p.pop ? p.pop.toLocaleString("en-US") : "—") + "</td><td class='num'>" + cell(p.poverty === null ? null : p.poverty.toFixed(2)) + "</td><td class='num'>" + cell(p.tpt === null ? null : p.tpt.toFixed(2)) + "</td><td class='num'>" + cell(p.hdi === null ? null : p.hdi.toFixed(2)) + "</td><td class='num'>" + cell(p.grdpPcap === null ? null : p.grdpPcap.toFixed(2)) + "</td></tr>").join("") +
    "</tbody></table><p class='src'>Click a column heading to sort. GRDP per capita is shown only for the five provinces verified at current prices (DKI Jakarta 344.35, East Kalimantan 212.18, North Kalimantan 198.43, Riau 165.35, Riau Islands 161.42 Rp million).</p>";
}

export function compare() {
  const names = PROVINCES.map(p => p.name);
  const opts = sel => names.map(n => "<option" + (n === sel ? " selected" : "") + ">" + n + "</option>").join("");
  return '<p class="kicker">Compare</p><h1>Compare two provinces</h1>' +
    '<p class="lede">Pick any two provinces. Poverty, unemployment and HDI are compared on the same 2024 basis; population is the BPS mid-2024 projection.</p>' +
    '<div class="grid two"><div><label for="cmp-a">Province A</label><select id="cmp-a" style="width:100%">' + opts("DKI Jakarta") + '</select></div>' +
    '<div><label for="cmp-b">Province B</label><select id="cmp-b" style="width:100%">' + opts("Highland Papua") + '</select></div></div>' +
    '<div id="cmp-out" style="margin-top:18px">' + cmpHtml("DKI Jakarta", "Highland Papua") + "</div>" +
    '<p class="src">Sources: BPS — population, interim projection mid-2024; poverty, September 2024; unemployment (TPT), August 2024; HDI, 2024. A dash means the figure was not verified for that province.</p>';
}
export function cmpHtml(aName, bName) {
  const a = provinceByName(aName), b = provinceByName(bName);
  const fmtv = (v, d) => v === null || v === undefined ? "—" : v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  const row = (label, av, bv, unit, maxv) => {
    const aw = av === null ? 0 : av / maxv * 100, bw = bv === null ? 0 : bv / maxv * 100;
    const disp = v => v === null || v === undefined ? "—" : fmtv(v, 2) + (unit ? " " + unit : "");
    return '<div class="card" style="margin-bottom:12px"><h3>' + label + "</h3>" +
      '<div class="bar-row"><span>' + a.name + '</span><span class="bar"><i style="width:' + aw.toFixed(1) + '%"></i></span><strong>' + disp(av) + "</strong></div>" +
      '<div class="bar-row"><span>' + b.name + '</span><span class="bar"><i class="b" style="width:' + bw.toFixed(1) + '%"></i></span><strong>' + disp(bv) + "</strong></div></div>";
  };
  const maxPop = Math.max(a.pop || 0, b.pop || 0) || 1;
  return row("Population, 2024", a.pop ? a.pop / 1e6 : null, b.pop ? b.pop / 1e6 : null, "million", maxPop / 1e6) +
    row("Poverty, Sep 2024", a.poverty, b.poverty, "%", 30) +
    row("Unemployment (TPT), Aug 2024", a.tpt, b.tpt, "%", 7) +
    row("Human Development Index, 2024", a.hdi, b.hdi, "", 85) +
    '<div class="callout"><strong>Reading it:</strong> ' + a.name + " has HDI " + fmtv(a.hdi, 2) + " against " + b.name + "\u2019s " + fmtv(b.hdi, 2) +
    ", and poverty " + fmtv(a.poverty, 2) + "% against " + fmtv(b.poverty, 2) + "%. The gap is widest where development is lowest — that is the story of Indonesia\u2019s provinces in 2024.</div>";
}

export function dataPage() {
  return '<p class="kicker">Data &amp; CSV</p><h1>Every number, downloadable</h1>' +
    '<p class="lede">The full national table, 2015–2024, from the World Bank. Download it as a CSV — the file is made in your browser, nothing is sent anywhere.</p>' +
    '<p><button class="btn" id="csv-btn">Download national data (CSV)</button> <button class="btn ghost" id="csv-prov-btn">Download provincial data (CSV)</button></p>' +
    "<h2>National indicators, 2015–2024</h2>" + tableRows(Object.keys(INDICATORS)) +
    '<p class="src">Source: World Bank Open Data, Indonesia. Indicator codes are listed on the Sources page. Values are rounded to the decimals shown; the CSV carries the same rounded values.</p>' +
    "<h2>Provincial indicators, 2024</h2>" + provTable(PROVINCES);
}

export function sources() {
  return '<p class="kicker">Sources</p><h1>Sources &amp; method</h1>' +
    '<p class="lede">NusaStats shows only figures it can point to. If a figure could not be verified, it is left out — a dash in a table, never a guess.</p>' +
    "<h2>National series — World Bank Open Data</h2><p>All national series were fetched from api.worldbank.org on 27 November 2026, country IDN, 2015–2024. Indicator codes: GDP NY.GDP.MKTP.CD; GDP growth NY.GDP.MKTP.KD.ZG; GDP per capita NY.GDP.PCAP.CD; GDP per capita PPP NY.GDP.PCAP.PP.CD; population SP.POP.TOTL; life expectancy SP.DYN.LE00.IN; inflation FP.CPI.TOTL.ZG; unemployment (modelled ILO estimate) SL.UEM.TOTL.ZS; poverty (national lines) SI.POV.NAHC; exports NE.EXP.GNFS.ZS; imports NE.IMP.GNFS.ZS; infant mortality SP.DYN.IMRT.IN; under-5 mortality SH.DYN.MORT; internet users IT.NET.USER.ZS; forest area AG.LND.FRST.ZS; agriculture / industry / services value added NV.AGR.TOTL.ZS, NV.IND.TOTL.ZS, NV.SRV.TOTL.ZS; population density EN.POP.DNST.</p>" +
    "<p>School enrolment is deliberately absent: the World Bank series for Indonesia covers only 2016–2018 for primary enrolment and 2015/2018 for secondary enrolment in 2015–2024, too thin for a ten-year chart.</p>" +
    "<h2>Provincial figures — BPS (Statistics Indonesia)</h2><p>Population: BPS interim projection, mid-2024, in Statistik Indonesia 2025 (national total 281.6 million). Poverty: BPS, September 2024, via Bappenas Simreg (national 8.57%). Unemployment (TPT): BPS, August 2024 (national 4.91%). Human Development Index: BPS press release, 15 November 2024 (national 75.02). GRDP per capita: BPS at current prices, top five provinces only (DKI Jakarta Rp 344.35 million; East Kalimantan Rp 212.18 million; North Kalimantan Rp 198.43 million; Riau Rp 165.35 million; Riau Islands Rp 161.42 million) — lower ranks could not be verified well enough and are omitted.</p>" +
    "<h2>Where two sources disagree</h2><p>Population: the World Bank\u2019s 2024 estimate is 283.5 million; BPS\u2019s mid-2024 projection is 281.6 million. Poverty: the World Bank\u2019s national-lines series gives 9.0% for 2024; BPS gives 8.57% for September 2024. Unemployment: the World Bank\u2019s modelled ILO estimate is 3.30% for 2024; BPS\u2019s open unemployment rate (TPT) is 4.91% for August 2024. These are different measures and different reference periods, not errors — each page says which one it uses.</p>" +
    "<h2>What this site is not</h2><p>NusaStats is an independent, original portal. It is not BPS, not the World Bank, and not affiliated with either. Figures are rounded for display; the Data page holds the same rounded values in a table and CSV.</p>";
}
