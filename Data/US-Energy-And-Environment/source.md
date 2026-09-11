# Sources — US Energy & Environment

Generated from stored provenance; dates below are actual fetch timestamps, not the documentation generation date.

## Arctic September sea ice extent (arcticSeaIce)

- Publisher: NSIDC Sea Ice Index
- Source: <https://noaadata.apps.nsidc.org/NOAA/G02135/north/monthly/data/N_09_extent_v4.0.csv>
- Unit: million km²
- Coverage: 1979–2025
- Annual rule: September mean, keyed to calendar year.
- Method and caveats: Published September monthly mean extent, million square kilometers; extent column, not area. Source dataset version switched in 2025; this run uses the specified v4.0 file throughout.
- Breaks: Source dataset version switched in 2025; this run uses the specified v4.0 file throughout.
- Fetched: 2026-09-11T21:19:58.421Z

## Battery storage capacity (batteryCapacity)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=BTGBPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: GW
- Coverage: 2010–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN BTGBPUS; publisher annual row (MER YYYY13). Original unit: Million Kilowatts. Converted only by the declared unit scale. Exception: battery storage is a recent instrument; 2010–2025, at least 10 annual points. By-source capacity begins in 1989.
- Breaks: Exception: battery storage is a recent instrument; 2010–2025, at least 10 annual points. By-source capacity begins in 1989.
- Fetched: 2026-09-11T21:19:58.421Z

## Billion-dollar disaster cost (billionDollarCost)

- Publisher: computed from NOAA NCEI billion-dollar disaster individual event records
- Source: <https://www.ncei.noaa.gov/access/billions/events-US-1980-2024.csv>
- Unit: billion CPI-adjusted dollars
- Coverage: 1980–2024
- Annual rule: Annual event count and CPI-adjusted cost summed by event begin-year.
- Method and caveats: Computed from individual event records (name, dates, CPI-adjusted cost); annual count and annual cost, summed by event begin-year. Costs converted from millions to billions of dollars; retain archive edition's inflation base; 1980–2024 only. Product retired in 2025; record ends in 2024. No successor data appended (rule 9).
- Breaks: Product retired in 2025; record ends in 2024. No successor data appended (rule 9).
- Fetched: 2026-09-11T21:19:58.421Z

## Billion-dollar disasters (billionDollarDisasters)

- Publisher: computed from NOAA NCEI billion-dollar disaster individual event records
- Source: <https://www.ncei.noaa.gov/access/billions/events-US-1980-2024.csv>
- Unit: events
- Coverage: 1980–2024
- Annual rule: Annual event count and CPI-adjusted cost summed by event begin-year.
- Method and caveats: Computed from individual event records (name, dates, CPI-adjusted cost); annual count and annual cost, summed by event begin-year. Costs converted from millions to billions of dollars; retain archive edition's inflation base; 1980–2024 only. Product retired in 2025; record ends in 2024. No successor data appended (rule 9).
- Breaks: Product retired in 2025; record ends in 2024. No successor data appended (rule 9).
- Fetched: 2026-09-11T21:19:58.421Z

## Total generating capacity (capacityTotal)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=ELGBPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: GW
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN ELGBPUS; publisher annual row (MER YYYY13). Original unit: Million Kilowatts. Converted only by the declared unit scale. By-source capacity begins in 1989; total capacity has earlier coverage.
- Breaks: By-source capacity begins in 1989; total capacity has earlier coverage.
- Fetched: 2026-09-11T21:19:58.421Z

## Mauna Loa atmospheric CO2 (co2Concentration)

- Publisher: NOAA Global Monitoring Laboratory
- Source: <https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_annmean_mlo.csv>
- Unit: ppm
- Coverage: 1959–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: Published annual mean, annual growth, or AGGI column; uncertainty columns are not observations. Maunakea measurements substituted during 2022–23 after the Mauna Loa eruption.
- Breaks: Maunakea measurements substituted during 2022–23 after the Mauna Loa eruption.
- Fetched: 2026-09-11T21:25:39.559Z

## Global atmospheric CO2 growth (co2Growth)

- Publisher: NOAA Global Monitoring Laboratory
- Source: <https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_gr_gl.csv>
- Unit: ppm/year
- Coverage: 1959–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: Published annual mean, annual growth, or AGGI column; uncertainty columns are not observations. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Energy CO2 per capita (co2PerCapita)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=CDTPRUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: metric tons/person
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN CDTPRUS; publisher annual row (MER YYYY13). Original unit: Metric Tons Carbon Dioxide. Converted only by the declared unit scale. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Coal production (coalProduction)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=CLPRPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: thousand short tons
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN CLPRPUS; publisher annual row (MER YYYY13). Original unit: Thousand Short Tons. Converted only by the declared unit scale. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Cooling degree days (coolingDegreeDays)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=ZWCDPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: degree days
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN ZWCDPUS; publisher annual row (MER YYYY13). Original unit: Number. Converted only by the declared unit scale. Population weights re-based each census; weight changes affect comparability.
- Breaks: Population weights re-based each census; weight changes affect comparability.
- Fetched: 2026-09-11T21:19:58.421Z

## Crude oil production (crudeProduction)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=PAPRPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: thousand barrels/day
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN PAPRPUS; publisher annual row (MER YYYY13). Original unit: Thousand Barrels per Day. Converted only by the declared unit scale. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Major disaster declarations (disasterDeclarations)

- Publisher: computed from OpenFEMA Disaster Declarations Summaries
- Source: <https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries>
- Unit: declarations
- Coverage: 1953–2025
- Annual rule: FEMA fyDeclared fiscal-year number; completed fiscal years only.
- Method and caveats: Filter declarationType=DR; deduplicate county/designated-area records by disasterNumber; count by fyDeclared. Completed fiscal years through 2025; ongoing FY2026 excluded. Stafford Act 1988 baseline; COVID-19 caused a 2020 anomaly. Fiscal years use FEMA fyDeclared.
- Breaks: Stafford Act 1988 baseline; COVID-19 caused a 2020 anomaly. Fiscal years use FEMA fyDeclared.
- Fetched: 2026-09-11T21:19:58.421Z

## Electricity CO2 intensity (electricityCo2Intensity)

- Publisher: computed from U.S. Energy Information Administration annual series
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=TXEIEUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc> · <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=ELEGPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: metric tons/MWh
- Coverage: 1973–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: TXEIEUS divided by ELEGPUS; matched calendar years only. Numerator Million Metric Tons of Carbon Dioxide; denominator Million Kilowatthours; unit conversion factor 1000. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## NOx emissions excluding wildfires (emissionsNox)

- Publisher: U.S. EPA National Emissions Inventory trends
- Source: <https://www.epa.gov/system/files/other-files/2026-09/national_tier1_caps_04sep2026.xlsx>
- Unit: thousand short tons
- Coverage: 1970–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: Pollutant-specific worksheet, Total without wildfires row, annual year columns. EPA's own estimates throughout: 1970–2001 five-yearly then annual NEI/trends values, 2002–2019 EQUATES-modeled, and the years after the latest full NEI (2020 onward) interpolated or projected by EPA; no interpolation performed here. The workbook's edition notes are retained in work/nei-edition-notes.txt. EQUATES methodology 2002–19; 2020–25 include interpolated/projected estimates. 2020, 2021, 2022, 2023, 2024, and 2025 are in the interpolated/projected period; the workbook methodology reproduced in the note identifies edition-specific assignments.
- Breaks: EQUATES methodology 2002–19; 2020–25 include interpolated/projected estimates. 2020, 2021, 2022, 2023, 2024, and 2025 are in the interpolated/projected period; the workbook methodology reproduced in the note identifies edition-specific assignments.
- Fetched: 2026-09-11T21:49:21.102Z

## PM2.5 emissions excluding wildfires (emissionsPm25)

- Publisher: U.S. EPA National Emissions Inventory trends
- Source: <https://www.epa.gov/system/files/other-files/2026-09/national_tier1_caps_04sep2026.xlsx>
- Unit: thousand short tons
- Coverage: 2002–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: Pollutant-specific worksheet, Total without wildfires row, annual year columns. EPA's own estimates throughout: 1970–2001 five-yearly then annual NEI/trends values, 2002–2019 EQUATES-modeled, and the years after the latest full NEI (2020 onward) interpolated or projected by EPA; no interpolation performed here. The workbook's edition notes are retained in work/nei-edition-notes.txt. EQUATES methodology 2002–19; 2020–25 include interpolated/projected estimates. 2020, 2021, 2022, 2023, 2024, and 2025 are in the interpolated/projected period; the workbook methodology reproduced in the note identifies edition-specific assignments.
- Breaks: EQUATES methodology 2002–19; 2020–25 include interpolated/projected estimates. 2020, 2021, 2022, 2023, 2024, and 2025 are in the interpolated/projected period; the workbook methodology reproduced in the note identifies edition-specific assignments.
- Fetched: 2026-09-11T21:49:21.102Z

## SO2 emissions excluding wildfires (emissionsSo2)

- Publisher: U.S. EPA National Emissions Inventory trends
- Source: <https://www.epa.gov/system/files/other-files/2026-09/national_tier1_caps_04sep2026.xlsx>
- Unit: thousand short tons
- Coverage: 1970–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: Pollutant-specific worksheet, Total without wildfires row, annual year columns. EPA's own estimates throughout: 1970–2001 five-yearly then annual NEI/trends values, 2002–2019 EQUATES-modeled, and the years after the latest full NEI (2020 onward) interpolated or projected by EPA; no interpolation performed here. The workbook's edition notes are retained in work/nei-edition-notes.txt. EQUATES methodology 2002–19; 2020–25 include interpolated/projected estimates. 2020, 2021, 2022, 2023, 2024, and 2025 are in the interpolated/projected period; the workbook methodology reproduced in the note identifies edition-specific assignments.
- Breaks: EQUATES methodology 2002–19; 2020–25 include interpolated/projected estimates. 2020, 2021, 2022, 2023, 2024, and 2025 are in the interpolated/projected period; the workbook methodology reproduced in the note identifies edition-specific assignments.
- Fetched: 2026-09-11T21:49:21.102Z

## VOC emissions excluding wildfires (emissionsVoc)

- Publisher: U.S. EPA National Emissions Inventory trends
- Source: <https://www.epa.gov/system/files/other-files/2026-09/national_tier1_caps_04sep2026.xlsx>
- Unit: thousand short tons
- Coverage: 1970–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: Pollutant-specific worksheet, Total without wildfires row, annual year columns. EPA's own estimates throughout: 1970–2001 five-yearly then annual NEI/trends values, 2002–2019 EQUATES-modeled, and the years after the latest full NEI (2020 onward) interpolated or projected by EPA; no interpolation performed here. The workbook's edition notes are retained in work/nei-edition-notes.txt. EQUATES methodology 2002–19; 2020–25 include interpolated/projected estimates. 2020, 2021, 2022, 2023, 2024, and 2025 are in the interpolated/projected period; the workbook methodology reproduced in the note identifies edition-specific assignments.
- Breaks: EQUATES methodology 2002–19; 2020–25 include interpolated/projected estimates. 2020, 2021, 2022, 2023, 2024, and 2025 are in the interpolated/projected period; the workbook methodology reproduced in the note identifies edition-specific assignments.
- Fetched: 2026-09-11T21:49:21.102Z

## Energy production/consumption (energyIndependence)

- Publisher: computed from U.S. Energy Information Administration annual series
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=TEPRBUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc> · <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=TETCBUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: ratio
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: TEPRBUS divided by TETCBUS; matched calendar years only. Numerator Trillion Btu; denominator Trillion Btu; unit conversion factor 1. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Energy intensity (energyIntensity)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=TETGRUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: thousand Btu/real dollar
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN TETGRUS; publisher annual row (MER YYYY13). Original unit: Thousand Btu per Chained (2017) Dollar. Converted only by the declared unit scale. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Energy consumption per capita (energyPerCapita)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=TETPRUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: million Btu/person
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN TETPRUS; publisher annual row (MER YYYY13). Original unit: Million Btu. Converted only by the declared unit scale. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Natural gas marketed production (gasProduction)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=NGMPPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: billion cubic feet
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN NGMPPUS; publisher annual row (MER YYYY13). Original unit: Billion Cubic Feet. Converted only by the declared unit scale. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Coal electricity generation (genCoal)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=CLETPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: GWh
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN CLETPUS; publisher annual row (MER YYYY13). Original unit: Million Kilowatthours. Converted only by the declared unit scale. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Natural gas electricity generation (genGas)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=NGETPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: GWh
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN NGETPUS; publisher annual row (MER YYYY13). Original unit: Million Kilowatthours. Converted only by the declared unit scale. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Hydroelectric generation (genHydro)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=HVETPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: GWh
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN HVETPUS; publisher annual row (MER YYYY13). Original unit: Million Kilowatthours. Converted only by the declared unit scale. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Nuclear electricity generation (genNuclear)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=NUETPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: GWh
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN NUETPUS; publisher annual row (MER YYYY13). Original unit: Million Kilowatthours. Converted only by the declared unit scale. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Solar electricity generation (genSolar)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=SOETPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: GWh
- Coverage: 1984–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN SOETPUS; publisher annual row (MER YYYY13). Original unit: Million Kilowatthours. Converted only by the declared unit scale. Solar begins in 1984; small-scale PV is included from 2014, a coverage break.
- Breaks: Solar begins in 1984; small-scale PV is included from 2014, a coverage break.
- Fetched: 2026-09-11T21:19:58.421Z

## Wind electricity generation (genWind)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=WYETPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: GWh
- Coverage: 1983–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN WYETPUS; publisher annual row (MER YYYY13). Original unit: Million Kilowatthours. Converted only by the declared unit scale. Wind series begins in 1983; earlier observations excluded.
- Breaks: Wind series begins in 1983; earlier observations excluded.
- Fetched: 2026-09-11T21:19:58.421Z

## Total electricity generation (generationTotal)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=ELETPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: GWh
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN ELETPUS; publisher annual row (MER YYYY13). Original unit: Million Kilowatthours. Converted only by the declared unit scale. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Global land/ocean temperature anomaly (globalTemperature)

- Publisher: NOAA NCEI Climate at a Glance
- Source: <https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/time-series/globe/land_ocean/12/12/1850-2025.csv>
- Unit: °C vs 1901–2000
- Coverage: 1850–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: 12-month period ending December; global land and ocean surface temperature anomaly against the 1901–2000 average. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:58:42.952Z

## Annual Greenhouse Gas Index (greenhouseGasIndex)

- Publisher: NOAA Global Monitoring Laboratory
- Source: <https://gml.noaa.gov/aggi/AGGI_Table.csv>
- Unit: 1990 = 1
- Coverage: 1979–2024
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: Published annual mean, annual growth, or AGGI column; uncertainty columns are not observations. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Heating degree days (heatingDegreeDays)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=ZWHDPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: degree days
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN ZWHDPUS; publisher annual row (MER YYYY13). Original unit: Number. Converted only by the declared unit scale. Population weights re-based each census; weight changes affect comparability.
- Breaks: Population weights re-based each census; weight changes affect comparability.
- Fetched: 2026-09-11T21:19:58.421Z

## Global atmospheric methane (methaneConcentration)

- Publisher: NOAA Global Monitoring Laboratory
- Source: <https://gml.noaa.gov/webdata/ccgg/trends/ch4/ch4_annmean_gl.csv>
- Unit: ppb
- Coverage: 1984–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: Published annual mean, annual growth, or AGGI column; uncertainty columns are not observations. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Atlantic tropical storms and hurricanes (namedStorms)

- Publisher: computed from NOAA NHC Atlantic HURDAT2
- Source: <https://www.nhc.noaa.gov/data/hurdat/hurdat2-1851-2025-02272026.txt>
- Unit: systems reaching tropical-storm strength (≥34 kt)
- Coverage: 1851–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: Count each unique AL storm header once when peak track maximum sustained wind (field 7) is at least 34 knots; season from storm ID. Includes systems that reached 34 knots but were never named operationally (every pre-1950 storm, the 2005 unnamed subtropical storm, and Tropical Depression Twenty-Two of 2005 after reanalysis), so a season can exceed the named-storm count in NHC's summary: 2005 is 29 here against 28 there. Pre-1966 pre-satellite and pre-1944 pre-reconnaissance eras undercount storms.
- Breaks: Pre-1966 pre-satellite and pre-1944 pre-reconnaissance eras undercount storms.
- Fetched: 2026-09-11T21:58:42.952Z

## Nuclear capacity factor (nuclearCapacityFactor)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=NUCASUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: percent
- Coverage: 1973–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN NUCASUS; publisher annual row (MER YYYY13). Original unit: Percent. Converted only by the declared unit scale. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Operable nuclear reactors (nuclearReactors)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=NUOUPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: reactors
- Coverage: 1957–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN NUOUPUS; publisher annual row (MER YYYY13). Original unit: Number. Converted only by the declared unit scale. EIA operable reactors differ from NRC operating reactors; the definitions must not be interchanged.
- Breaks: EIA operable reactors differ from NRC operating reactors; the definitions must not be interchanged.
- Fetched: 2026-09-11T21:19:58.421Z

## Petroleum net imports (petroleumNetImports)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=PANIPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: thousand barrels/day
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN PANIPUS; publisher annual row (MER YYYY13). Original unit: Thousand Barrels per Day. Converted only by the declared unit scale. Negative values mean net exports; net exporter since 2020.
- Breaks: Negative values mean net exports; net exporter since 2020.
- Fetched: 2026-09-11T21:19:58.421Z

## Contiguous US precipitation (precipitation)

- Publisher: NOAA NCEI Climate at a Glance
- Source: <https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/national/time-series/110/pcp/12/12/1895-2025.csv>
- Unit: inches
- Coverage: 1895–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: 12-month period ending December; contiguous United States precipitation total in inches. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:58:42.952Z

## Proved crude oil reserves (provedOilReserves)

- Publisher: U.S. Energy Information Administration, crude oil proved reserves
- Source: <https://api.eia.gov/v2/petroleum/crd/pres/data/?frequency=annual&data%5B0%5D=value&facets%5Bseries%5D%5B%5D=RCRR01NUS_1&facets%5Bduoarea%5D%5B%5D=NUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: million barrels
- Coverage: 1899–2021
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: Series RCRR01NUS_1; national duoarea NUS; publisher annual observations through 2021. Original unit: MMBBL. Converted only by the declared unit scale. Two-year publication lag: EIA's latest published annual reserves estimate is 2021 (live check 2026-09-11), so the series ends there and extends when EIA publishes.
- Breaks: Two-year publication lag: EIA's latest published annual reserves estimate is 2021 (live check 2026-09-11), so the series ends there and extends when EIA publishes.
- Fetched: 2026-09-11T21:58:42.952Z

## Refinery crude input (refineryInput)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=CORIPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: thousand barrels/day
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN CORIPUS; publisher annual row (MER YYYY13). Original unit: Thousand Barrels per Day. Converted only by the declared unit scale. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Rotary rig count (rigCount)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=OGNRPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: rigs
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN OGNRPUS; publisher annual row (MER YYYY13). Original unit: Number of Rigs. Converted only by the declared unit scale. EIA republishes Baker Hughes rig counts; Baker Hughes is the measurement origin.
- Breaks: EIA republishes Baker Hughes rig counts; Baker Hughes is the measurement origin.
- Fetched: 2026-09-11T21:19:58.421Z

## Commercial electricity sales (salesCommercial)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=ESCCPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: GWh
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN ESCCPUS; publisher annual row (MER YYYY13). Original unit: Million Kilowatthours. Converted only by the declared unit scale. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Industrial electricity sales (salesIndustrial)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=ESICPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: GWh
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN ESICPUS; publisher annual row (MER YYYY13). Original unit: Million Kilowatthours. Converted only by the declared unit scale. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Residential electricity sales (salesResidential)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=ESRCPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: GWh
- Coverage: 1949–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN ESRCPUS; publisher annual row (MER YYYY13). Original unit: Million Kilowatthours. Converted only by the declared unit scale. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Global mean sea level (seaLevel)

- Publisher: computed from NOAA STAR satellite altimetry
- Source: <https://www.star.nesdis.noaa.gov/socd/lsa/SeaLevelRise/slr/slr_sla_gbl_free_ref_90.csv>
- Unit: mm above the satellite-era reference mean (NOAA STAR sea level anomaly)
- Coverage: 1993–2024
- Annual rule: Calendar-year mean of subannual observations; at least ten observations required. The latest year is excluded until it meets the full-year coverage requirement.
- Method and caveats: Each published observation is the mean of the altimeter missions reporting on that date (TOPEX/Poseidon, Jason-1, Jason-2, Jason-3, Sentinel-6MF overlap at handovers); the annual value is the arithmetic mean of a calendar year's observations, 1993 onward; original reference baseline retained, no rebasing. Inter-mission offsets exist across satellite altimeter generations; the reference-series baseline is retained.
- Breaks: Inter-mission offsets exist across satellite altimeter generations; the reference-series baseline is retained.
- Fetched: 2026-09-11T21:58:42.952Z

## Strategic Petroleum Reserve (strategicReserve)

- Publisher: U.S. Energy Information Administration, Monthly Energy Review
- Source: <https://api.eia.gov/v2/total-energy/data/?frequency=annual&data%5B0%5D=value&facets%5Bmsn%5D%5B%5D=COSQPUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: million barrels
- Coverage: 1977–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: MSN COSQPUS; publisher annual row (MER YYYY13). Original unit: Million Barrels. Converted only by the declared unit scale. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## US tornadoes (tornadoes)

- Publisher: computed from NOAA Storm Prediction Center tornado records
- Source: <https://www.spc.noaa.gov/wcm/data/1950-2025_actual_tornadoes.csv>
- Unit: tornadoes
- Coverage: 1950–2024
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: Annual count of unique yr/mo/dy/om tornado IDs with sn=1 (whole-tornado records), excluding state segments; 1950–2024. 2007 Enhanced Fujita scale change and Doppler-era detection improvements affect comparability.
- Breaks: 2007 Enhanced Fujita scale change and Doppler-era detection improvements affect comparability.
- Fetched: 2026-09-11T21:19:58.421Z

## Unhealthy-or-worse AQI days across ten metros (unhealthyAqiDays)

- Publisher: computed from U.S. EPA AQS annual AQI by CBSA
- Source: <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2025.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1980.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1981.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1982.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1983.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1984.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1985.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1986.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1987.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1988.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1989.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1990.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1991.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1992.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1993.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1994.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1995.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1996.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1997.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1998.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_1999.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2000.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2001.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2002.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2003.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2004.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2005.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2006.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2007.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2008.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2009.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2010.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2011.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2012.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2013.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2014.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2015.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2016.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2017.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2018.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2019.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2020.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2021.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2022.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2023.zip> · <https://aqs.epa.gov/aqsweb/airdata/annual_aqi_by_cbsa_2024.zip>
- Unit: metro-days
- Coverage: 1980–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: Sum Unhealthy Days + Very Unhealthy Days + Hazardous Days (AQI >150), excluding Unhealthy for Sensitive Groups. Fixed 2020 Census top-ten metro CBSAs: 35620, 31080, 16980, 19100, 26420, 47900, 33100, 37980, 12060, 14460. Sum of reported days, not population-weighted; monitor availability varies. Years missing any metro omitted: none. 2024 PM2.5 AQI breakpoint revision changes category thresholds; fixed ten-metro 2020 Census population ranking; changes in monitoring availability affect counts.
- Breaks: 2024 PM2.5 AQI breakpoint revision changes category thresholds; fixed ten-metro 2020 Census population ranking; changes in monitoring availability affect counts.
- Fetched: 2026-09-11T21:19:58.421Z

## Vehicle miles traveled (vehicleMiles)

- Publisher: Federal Highway Administration, Highway Statistics 2023
- Source: <https://www.fhwa.dot.gov/policyinformation/statistics/2023/xls/vm202.xls>
- Unit: million vehicle miles
- Coverage: 1980–2023
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: VM-202 all-motor-vehicles total, million vehicle miles; years 1980–2023 from one workbook edition. Grand-total column identified uniquely by the 2023 sample of 3,246,817 (±1) and held fixed across years. 2007–09 HPMS resubmission is a break. Highway Statistics 2023 is the latest edition FHWA has published (the 2024 workbook does not exist yet), so the series ends at 2023 and extends with the next edition.
- Breaks: 2007–09 HPMS resubmission is a break. Highway Statistics 2023 is the latest edition FHWA has published (the 2024 workbook does not exist yet), so the series ends at 2023 and extends with the next edition.
- Fetched: 2026-09-11T21:58:42.952Z

## Wildfire acres burned (wildfireAcres)

- Publisher: National Interagency Fire Center
- Source: <https://www.nifc.gov/fire-information/statistics/wildfires>
- Unit: acres
- Coverage: 1983–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: Annual wildfires table, Acres column; 1983–2025 only. Pre-1983 records are not comparable; series starts in 1983.
- Breaks: Pre-1983 records are not comparable; series starts in 1983.
- Fetched: 2026-09-11T21:19:58.421Z
