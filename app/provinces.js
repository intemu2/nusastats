// Provincial figures, 2024 only, each verified 27 Nov 2026 from the source named.
// Population: BPS interim projection, mid-2024 (Statistik Indonesia 2025).
// Poverty: BPS via Bappenas Simreg, September 2024. TPT: BPS, August 2024.
// HDI: BPS press release 15 Nov 2024. GRDP per capita: BPS via GoodStats,
// current prices (ADHB), top 5 only — ranks 6-10 could not be verified well
// enough, so they are left out rather than guessed.
export const PROVINCES = [
  { name: "West Java", pop: 50345200, poverty: 7.08, tpt: 6.75, hdi: 74.92, grdpPcap: null },
  { name: "East Java", pop: 41814500, poverty: 9.56, tpt: 4.19, hdi: 75.35, grdpPcap: null },
  { name: "Central Java", pop: 37892300, poverty: 9.58, tpt: 4.78, hdi: 73.87, grdpPcap: null },
  { name: "North Sumatra", pop: 15588500, poverty: 7.19, tpt: null, hdi: 75.76, grdpPcap: null },
  { name: "Banten", pop: 12431400, poverty: 5.70, tpt: 6.68, hdi: 76.35, grdpPcap: null },
  { name: "DKI Jakarta", pop: 10684900, poverty: 4.14, tpt: 6.21, hdi: 84.15, grdpPcap: 344.35 },
  { name: "South Sulawesi", pop: 9463400, poverty: 7.77, tpt: 4.19, hdi: 75.18, grdpPcap: null },
  { name: "Lampung", pop: 9419600, poverty: null, tpt: null, hdi: 73.13, grdpPcap: null },
  { name: "South Sumatra", pop: 8837300, poverty: 10.51, tpt: 3.86, hdi: 73.84, grdpPcap: null },
  { name: "Riau", pop: 6728100, poverty: 6.36, tpt: 3.70, hdi: 75.67, grdpPcap: null },
  { name: "Aceh", pop: null, poverty: 12.64, tpt: null, hdi: 75.36, grdpPcap: null },
  { name: "Bali", pop: null, poverty: 3.80, tpt: 1.79, hdi: 78.63, grdpPcap: null },
  { name: "South Kalimantan", pop: null, poverty: 4.02, tpt: null, hdi: null, grdpPcap: null },
  { name: "Riau Islands", pop: null, poverty: 4.78, tpt: 6.39, hdi: 79.89, grdpPcap: 161.42 },
  { name: "East Kalimantan", pop: null, poverty: null, tpt: null, hdi: 78.79, grdpPcap: 212.18 },
  { name: "North Kalimantan", pop: null, poverty: null, tpt: null, hdi: null, grdpPcap: 198.43 },
  { name: "Yogyakarta", pop: null, poverty: null, tpt: null, hdi: 81.62, grdpPcap: null },
  { name: "West Sumatra", pop: null, poverty: null, tpt: null, hdi: 76.43, grdpPcap: null },
  { name: "North Sulawesi", pop: null, poverty: null, tpt: null, hdi: 75.68, grdpPcap: null },
  { name: "Maluku", pop: null, poverty: 15.78, tpt: null, hdi: null, grdpPcap: null },
  { name: "Papua", pop: null, poverty: 18.09, tpt: 6.48, hdi: null, grdpPcap: null },
  { name: "East Nusa Tenggara", pop: null, poverty: 19.02, tpt: 3.02, hdi: 69.14, grdpPcap: null },
  { name: "West Papua", pop: null, poverty: 21.09, tpt: null, hdi: 67.69, grdpPcap: null },
  { name: "Central Papua", pop: null, poverty: 27.60, tpt: 2.75, hdi: 60.25, grdpPcap: null },
  { name: "Highland Papua", pop: null, poverty: 29.66, tpt: 1.32, hdi: 54.43, grdpPcap: null },
  { name: "Southwest Papua", pop: null, poverty: null, tpt: 6.48, hdi: null, grdpPcap: null },
];
// National benchmarks for the same provincial measures (BPS, 2024).
export const BENCH = {
  poverty: { value: 8.57, label: "Indonesia, September 2024: 8.57%" },
  tpt: { value: 4.91, label: "Indonesia, August 2024: 4.91%" },
  hdi: { value: 75.02, label: "Indonesia, 2024: 75.02" },
};
export function provinceByName(name) { return PROVINCES.find(p => p.name === name); }
