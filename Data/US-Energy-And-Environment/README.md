# US Energy & Environment

49 annual series covering US energy, air pollution, hazards, and global atmospheric and climate context.

## Quick start

```bash
bun --env-file=$HOME/.claude/.env update.ts
bun --env-file=$HOME/.claude/.env update.ts --only co2Concentration,eia
bun test lib/checks.test.ts
bun docs.ts
```

Requires Bun, unzip, network access, and an EIA API key in the environment. No npm dependencies. Large downloads are validated and cached in .cache; remove a cached file to refresh that edition. Failures are isolated by series and produce a nonzero exit. A subset update preserves unrelated index entries.

## Files and format

Each series/<key>.json contains an _meta provenance block and data mapping year strings to numbers. index.json catalogs successful series. SUMMARY.md highlights observations; source.md gives URLs, methods, breaks, and individual fetch dates. deferred.json contains only documented source deferrals. update.log records refresh results.

## Methodology

Primary publishers only. Calendar years except FEMA fiscal-year numbers; degree-day and annual energy observations follow EIA's annual rows. NOAA global indicators provide global context, not US-only measurements. Computed ratios, means, and event counts say "computed from" in their source. Gaps remain absent; no interpolation is performed here. EPA's own interpolated/projected estimates are retained and labeled. Each note identifies known breaks. The retired NOAA billion-dollar-disaster archive ends in 2024. Battery storage has a named minimum-ten-point exception; all other series require at least fifteen points. Values may revise on refresh; sample mismatches are logged in work/mismatches.md without replacing publisher observations.

## Energy production and use

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Coal production](series/coalProduction.json) | 528,423.418 thousand short tons (2025) | 480,570 thousand short tons (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Crude oil production](series/crudeProduction.json) | 13,586.087 thousand barrels/day (2025) | 5,046.411 thousand barrels/day (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Energy production/consumption](series/energyIndependence.json) | 1.111143 ratio (2025) | 0.991793 ratio (1949) | 1949–2025; 77 points | computed from U.S. Energy Information Administration annual series |
| [Energy intensity](series/energyIntensity.json) | 4.04 thousand Btu/real dollar (2025) | 13.65 thousand Btu/real dollar (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Energy consumption per capita](series/energyPerCapita.json) | 282 million Btu/person (2025) | 207 million Btu/person (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Natural gas marketed production](series/gasProduction.json) | 43,229.11 billion cubic feet (2025) | 5,419.736 billion cubic feet (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Petroleum net imports](series/petroleumNetImports.json) | -2,797.787 thousand barrels/day (2025) | 318.31 thousand barrels/day (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Proved crude oil reserves](series/provedOilReserves.json) | 41,151 million barrels (2021) | 2,500 million barrels (1899) | 1899–2021; 123 points | U.S. Energy Information Administration, crude oil proved reserves |
| [Refinery crude input](series/refineryInput.json) | 16,370.921 thousand barrels/day (2025) | 5,326.633 thousand barrels/day (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Rotary rig count](series/rigCount.json) | 561 rigs (2025) | 2,017 rigs (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Strategic Petroleum Reserve](series/strategicReserve.json) | 413.464 million barrels (2025) | 7.455 million barrels (1977) | 1977–2025; 49 points | U.S. Energy Information Administration, Monthly Energy Review |

## Electricity generation and sales

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Coal electricity generation](series/genCoal.json) | 737,150.711 GWh (2025) | 135,451.32 GWh (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Natural gas electricity generation](series/genGas.json) | 1,807,338.288 GWh (2025) | 36,966.709 GWh (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Hydroelectric generation](series/genHydro.json) | 247,023.21 GWh (2025) | 94,772.992 GWh (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Nuclear electricity generation](series/genNuclear.json) | 784,780.718 GWh (2025) | 0 GWh (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Solar electricity generation](series/genSolar.json) | 295,671.383 GWh (2025) | 5.248 GWh (1984) | 1984–2025; 42 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Wind electricity generation](series/genWind.json) | 464,390.61 GWh (2025) | 2.668 GWh (1983) | 1983–2025; 43 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Total electricity generation](series/generationTotal.json) | 4,429,501.604 GWh (2025) | 296,124.289 GWh (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Nuclear capacity factor](series/nuclearCapacityFactor.json) | 91 percent (2025) | 53.5 percent (1973) | 1973–2025; 53 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Commercial electricity sales](series/salesCommercial.json) | 1,493,486.094 GWh (2025) | 58,647.204 GWh (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Industrial electricity sales](series/salesIndustrial.json) | 1,042,216.915 GWh (2025) | 122,590.923 GWh (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Residential electricity sales](series/salesResidential.json) | 1,514,993.23 GWh (2025) | 66,791.968 GWh (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |

## Generating infrastructure

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Battery storage capacity](series/batteryCapacity.json) | 42.795 GW (2025) | 0.028 GW (2010) | 2010–2025; 16 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Total generating capacity](series/capacityTotal.json) | 1,279.235 GW (2025) | 63.4 GW (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Operable nuclear reactors](series/nuclearReactors.json) | 94 reactors (2025) | 1 reactors (1957) | 1957–2025; 69 points | U.S. Energy Information Administration, Monthly Energy Review |

## Transportation

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Vehicle miles traveled](series/vehicleMiles.json) | 3,246,817.01765 million vehicle miles (2023) | 1,527,295 million vehicle miles (1980) | 1980–2023; 44 points | Federal Highway Administration, Highway Statistics 2023 |

## Atmosphere

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Mauna Loa atmospheric CO2](series/co2Concentration.json) | 427.35 ppm (2025) | 315.98 ppm (1959) | 1959–2025; 67 points | NOAA Global Monitoring Laboratory |
| [Global atmospheric CO2 growth](series/co2Growth.json) | 2.06 ppm/year (2025) | 0.96 ppm/year (1959) | 1959–2025; 67 points | NOAA Global Monitoring Laboratory |
| [Energy CO2 per capita](series/co2PerCapita.json) | 14.3 metric tons/person (2025) | 14.8 metric tons/person (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Electricity CO2 intensity](series/electricityCo2Intensity.json) | 0.34744 metric tons/MWh (2025) | 0.691236 metric tons/MWh (1973) | 1973–2025; 53 points | computed from U.S. Energy Information Administration annual series |
| [Annual Greenhouse Gas Index](series/greenhouseGasIndex.json) | 1.538 1990 = 1 (2024) | 0.78 1990 = 1 (1979) | 1979–2024; 46 points | NOAA Global Monitoring Laboratory |
| [Global atmospheric methane](series/methaneConcentration.json) | 1,935.94 ppb (2025) | 1,644.84 ppb (1984) | 1984–2025; 42 points | NOAA Global Monitoring Laboratory |

## Climate

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Arctic September sea ice extent](series/arcticSeaIce.json) | 4.75 million km² (2025) | 7.05 million km² (1979) | 1979–2025; 47 points | NSIDC Sea Ice Index |
| [Cooling degree days](series/coolingDegreeDays.json) | 1,540 degree days (2025) | 1,103 degree days (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Global land/ocean temperature anomaly](series/globalTemperature.json) | 1.12 °C vs 1901–2000 (2025) | -0.15 °C vs 1901–2000 (1850) | 1850–2025; 176 points | NOAA NCEI Climate at a Glance |
| [Heating degree days](series/heatingDegreeDays.json) | 4,021 degree days (2025) | 4,933 degree days (1949) | 1949–2025; 77 points | U.S. Energy Information Administration, Monthly Energy Review |
| [Contiguous US precipitation](series/precipitation.json) | 29.25 inches (2025) | 27.53 inches (1895) | 1895–2025; 131 points | NOAA NCEI Climate at a Glance |
| [Global mean sea level](series/seaLevel.json) | 81.887162 mm, publisher reference (2024) | -19.405 mm, publisher reference (1993) | 1993–2024; 32 points | computed from NOAA STAR satellite altimetry |

## Natural hazards and declarations

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [Billion-dollar disaster cost](series/billionDollarCost.json) | 182.7136 billion CPI-adjusted dollars (2024) | 45.6738 billion CPI-adjusted dollars (1980) | 1980–2024; 44 points | computed from NOAA NCEI billion-dollar disaster individual event records |
| [Billion-dollar disasters](series/billionDollarDisasters.json) | 27 events (2024) | 3 events (1980) | 1980–2024; 44 points | computed from NOAA NCEI billion-dollar disaster individual event records |
| [Major disaster declarations](series/disasterDeclarations.json) | 61 declarations (2025) | 10 declarations (1953) | 1953–2025; 73 points | computed from OpenFEMA Disaster Declarations Summaries |
| [Atlantic named storms](series/namedStorms.json) | 13 storms (2025) | 6 storms (1851) | 1851–2025; 175 points | computed from NOAA NHC Atlantic HURDAT2 |
| [US tornadoes](series/tornadoes.json) | 1,765 tornadoes (2024) | 200 tornadoes (1950) | 1950–2024; 75 points | computed from NOAA Storm Prediction Center tornado records |
| [Wildfire acres burned](series/wildfireAcres.json) | 5,131,474 acres (2025) | 1,323,666 acres (1983) | 1983–2025; 43 points | National Interagency Fire Center |

## Air pollution

| Series | Latest | First | Coverage | Publisher |
|---|---|---|---|---|
| [NOx emissions excluding wildfires](series/emissionsNox.json) | 7,854.808718 thousand short tons (2025) | 26,883 thousand short tons (1970) | 1970–2025; 40 points | U.S. EPA National Emissions Inventory trends |
| [PM2.5 emissions excluding wildfires](series/emissionsPm25.json) | 4,233.600163 thousand short tons (2025) | 4,443.018995 thousand short tons (2002) | 2002–2025; 24 points | U.S. EPA National Emissions Inventory trends |
| [SO2 emissions excluding wildfires](series/emissionsSo2.json) | 1,601.188867 thousand short tons (2025) | 31,218 thousand short tons (1970) | 1970–2025; 40 points | U.S. EPA National Emissions Inventory trends |
| [VOC emissions excluding wildfires](series/emissionsVoc.json) | 12,272.29277 thousand short tons (2025) | 33,742 thousand short tons (1970) | 1970–2025; 40 points | U.S. EPA National Emissions Inventory trends |
| [Unhealthy-or-worse AQI days across ten metros](series/unhealthyAqiDays.json) | 62 metro-days (2025) | 656 metro-days (1980) | 1980–2025; 46 points | computed from U.S. EPA AQS annual AQI by CBSA |

## Not included, and why

These dispositions come from the Lane 4 research, not access probes made by this build.

| Candidate | Reason |
|---|---|
| New-vehicle fuel economy | Deferred: full-trend CSV needs browser-free verification. |
| EV share / charging ports | Deferred: scripted access blocked in Lane 4; manufacturer origin and station/port seam. |
| Pipeline mileage / incidents | Deferred: PHMSA scripted access blocked in Lane 4; 2010 form change. |
| Transmission line miles | Cut, rule 4: no consistent public annual series; EIA-411 discontinued. |
| Grid SAIDI/SAIFI | Deferred: 2013–2024 gives twelve years; customer weighting and IEEE-1366 methods need resolution. |
| Interconnection queue | Deferred: LBNL scripted access blocked in Lane 4. |
| Data-center electricity load | Cut, rule 3: projections only, no historical series. |
| Nitrous oxide | Cut by Lane 4 rule 3 disposition: no additional long-run story beyond CO2/CH4. |
| EPA GHG inventory | Cut this run, rule 6: edition recalculation and draft/final status. |
| National mean PM2.5 | Deferred: EPA fixed-site completeness rule must be replicated. |
| Population above NAAQS | Cut, rule 6: changing standards and latest-year-only coverage. |
| TRI / drinking-water violations | Cut, rules 6/4: chemical-list and reporting seams. |

See [source.md](source.md) and [methodology](../../research/us-stats-expansion-2026-09/METHODOLOGY.md). Regenerated 2026-09-11.
