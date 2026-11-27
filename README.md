# NusaStats — Indonesia in Numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/intemu2/nusastats/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/intemu2/nusastats/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

An independent, original national statistics portal for Indonesia, built for the make.fun bounty "Make the best national statistics site".

NusaStats gathers Indonesia's headline statistics in one place — the economy, the people, and the provinces — each figure with its source and year, each chart drawn from a ten-year series you can download as CSV. It runs entirely offline from static files: no network requests, no tracking, no cookies.

## What is inside

- **Overview** — eight headline indicators for 2024 with ten-year sparklines
- **Economy** — GDP, growth, GDP per capita, inflation, trade, sector shares, plus an inflation calculator using the verified CPI series
- **People** — population, life expectancy, poverty, internet use, infant and under-5 mortality
- **Provinces** — sortable, searchable table of 26 provinces with population, poverty, unemployment, HDI and GRDP per capita
- **Compare** — pick any two provinces and compare them side by side
- **Data & CSV** — the full national table 2015–2024 and the provincial table, downloadable as CSV
- **Sources** — every indicator code, every provincial source, and where two sources disagree

## Sources

- National series 2015–2024: World Bank Open Data, Indonesia (api.worldbank.org), fetched 27 November 2026.
- Provincial figures 2024: BPS (Statistics Indonesia) — population interim projection mid-2024; poverty September 2024; open unemployment August 2024; HDI 2024; GRDP per capita at current prices, top five provinces only.
- Figures that could not be verified are left blank, never guessed. School enrolment is omitted because the World Bank series covers only 2016–2018 for Indonesia in 2015–2024.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080. The site is plain static files under `app/` with no build step.

## License

MIT. See `LICENSE`.
