// National series for Indonesia, 2015-2024.
// Source: World Bank Open Data (api.worldbank.org), indicator codes shown.
// Values are rounded from the API response fetched 27 Nov 2026; years with
// no API value are omitted. School enrolment is NOT shown: the World Bank
// series has only 2016-2018 (primary) and 2015/2018 (secondary) for 2015-2024.
export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
export const INDICATORS = {
  gdp: { label: "GDP, current US$", code: "NY.GDP.MKTP.CD", unit: "US$ bn", div: 1e9, dec: 0,
    values: [860.9, 931.9, 1015.6, 1042.3, 1119.1, 1059.1, 1186.5, 1319.1, 1371.2, 1396.3] },
  growth: { label: "GDP growth, annual", code: "NY.GDP.MKTP.KD.ZG", unit: "%", div: 1, dec: 2,
    values: [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.70, 5.31, 5.05, 5.03] },
  gdpPcap: { label: "GDP per capita, current US$", code: "NY.GDP.PCAP.CD", unit: "US$", div: 1, dec: 0,
    values: [3288, 3521, 3799, 3861, 4107, 3854, 4287, 4731, 4876, 4925] },
  gdpPcapPpp: { label: "GDP per capita, PPP, current int. $", code: "NY.GDP.PCAP.PP.CD", unit: "int. $", div: 1, dec: 0,
    values: [10028, 10263, 10688, 11372, 11986, 11729, 12757, 14283, 15428, 16472] },
  population: { label: "Population, total", code: "SP.POP.TOTL", unit: "million", div: 1e6, dec: 1,
    values: [261.8, 264.6, 267.3, 270.0, 272.5, 274.8, 276.8, 278.8, 281.2, 283.5] },
  lifeExp: { label: "Life expectancy at birth", code: "SP.DYN.LE00.IN", unit: "years", div: 1, dec: 1,
    values: [69.5, 69.7, 70.0, 70.1, 70.3, 68.8, 67.5, 70.9, 71.1, 71.3] },
  inflation: { label: "Inflation, consumer prices, annual", code: "FP.CPI.TOTL.ZG", unit: "%", div: 1, dec: 2,
    values: [6.36, 3.53, 3.81, 3.20, 3.03, 1.92, 1.56, 4.21, 3.67, 2.18] },
  unemployment: { label: "Unemployment, total, modelled ILO estimate", code: "SL.UEM.TOTL.ZS", unit: "% of labour force", div: 1, dec: 2,
    values: [4.51, 4.30, 3.78, 4.39, 3.59, 4.26, 3.83, 3.46, 3.31, 3.30] },
  poverty: { label: "Poverty headcount, national poverty lines", code: "SI.POV.NAHC", unit: "% of population", div: 1, dec: 1,
    values: [11.2, 10.9, 10.6, 9.8, 9.4, 9.8, 10.1, 9.5, 9.4, 9.0] },
  exports: { label: "Exports of goods and services", code: "NE.EXP.GNFS.ZS", unit: "% of GDP", div: 1, dec: 1,
    values: [21.2, 19.1, 20.2, 21.0, 18.6, 17.3, 21.4, 24.5, 21.8, 22.3] },
  imports: { label: "Imports of goods and services", code: "NE.IMP.GNFS.ZS", unit: "% of GDP", div: 1, dec: 1,
    values: [20.8, 18.3, 19.2, 22.1, 19.0, 15.6, 18.8, 21.0, 19.7, 20.5] },
  infantMort: { label: "Infant mortality rate", code: "SP.DYN.IMRT.IN", unit: "per 1,000 live births", div: 1, dec: 1,
    values: [21.9, 21.0, 20.1, 19.3, 18.5, 17.7, 17.0, 16.3, 15.7, 15.2] },
  under5Mort: { label: "Under-5 mortality rate", code: "SH.DYN.MORT", unit: "per 1,000 live births", div: 1, dec: 1,
    values: [26.1, 25.0, 23.8, 22.8, 21.8, 20.8, 19.9, 19.1, 18.4, 17.7] },
  internet: { label: "Individuals using the Internet", code: "IT.NET.USER.ZS", unit: "% of population", div: 1, dec: 1,
    values: [22.1, 25.4, 32.3, 39.9, 47.7, 53.7, 62.1, 66.5, 69.2, 72.8] },
  forest: { label: "Forest area", code: "AG.LND.FRST.ZS", unit: "% of land area", div: 1, dec: 1,
    values: [50.6, 50.7, 50.7, 50.8, 50.8, 50.9, 50.5, 50.6, 50.6, 50.7] },
  agri: { label: "Agriculture, forestry and fishing, value added", code: "NV.AGR.TOTL.ZS", unit: "% of GDP", div: 1, dec: 1,
    values: [13.5, 13.5, 13.2, 12.8, 12.7, 13.7, 13.3, 12.4, 12.5, 12.6] },
  industry: { label: "Industry, value added", code: "NV.IND.TOTL.ZS", unit: "% of GDP", div: 1, dec: 1,
    values: [40.0, 39.3, 39.4, 39.7, 39.0, 38.2, 39.8, 41.4, 40.2, 39.3] },
  services: { label: "Services, value added", code: "NV.SRV.TOTL.ZS", unit: "% of GDP", div: 1, dec: 1,
    values: [43.3, 43.6, 43.6, 43.4, 44.2, 44.4, 42.8, 41.8, 42.9, 43.8] },
  density: { label: "Population density", code: "EN.POP.DNST", unit: "people per sq. km", div: 1, dec: 1,
    values: [139.4, 140.9, 142.4, 143.8, 145.1, 146.4, 146.2, 147.3, 148.6, 149.8] },
};
export function last(key) { const v = INDICATORS[key].values; return v[v.length - 1]; }
export function change(key) { const v = INDICATORS[key].values; return v[v.length - 1] - v[0]; }
export function fmt(n, dec) {
  return n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}
