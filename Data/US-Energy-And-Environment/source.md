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
- Method and caveats: Pollutant-specific worksheet, Total without wildfires row, annual year columns. Publisher estimates retained; no interpolation performed here. Workbook methodology: All Emissions in this workbook are in kilotons (1000 short tons=2,000,000 lbs)
*Biogenics are not included in the trends
Updated September 4, 2026
Revisions from 2/21/2025: 1) Replaced all data for years 2022 through 2024, adding year 2025 data. 2) 2022 reflects the most-recent 2022 (v2.2) emissions modeling platform data. 3) 2023 reflects the final 2023 NEI (as of May 5, 2026). 4) 2024 is the same as 2023 NEI data but includes year 2024 updates for NOX and SO2 EGU data (https://campd.epa.gov/data) and draft 2024 wildfire and prescribed fires data. 5) 2025 is also the same as the 2023 NEI except for year 2025 NOX and SO2 EGU data and draft 2025 wildfire data, with 2025 prescribed fire estimates held at draft 2024 estimates.  6) 2023 NEI rerun 28sep26 to remove abandoned wells (VOC only, Petroleum Tier)
Updated February 21, 2025
Revisions from 2/9/2024:  1) Replaced year 2020 with EIS report of final 2020 NEI. 2) Replaced years 2021 through 2022 data with emissions modeling data; see latest "Current Methods Used to Estimate Emissions for the Years 2002-2024" documentation on the Trends Procedural Documentation (https://www.epa.gov/air-emissions-inventories/trends-procedural-documentation) site for source category-specific details on what comprises the 2021 through 2024 estimates. 3) Updated year 2023 emissions as either carry-forward from 2022 data, or, for mobile sources, interpolation to projected 2026 modeling data. 4) Introduced year 2024 estimates using 2024 EGU data (NOX and SO2 only from new CAMD site (https://ampd.epa.gov/ampd/), with all other 2024 estimates carried forward from the new 2023 estimates, or interpolated between 2022 and 2026 for mobile sources.
Updated February 9, 2024
Revisions from 4/5/2023: 1) Replaced year 2021 and 2022 data with emissions modeling data; see latest "Current Methods Used to Estimate Emissions for the Years 2002-2023" documentation on the Trends Procedural Documentation (https://www.epa.gov/air-emissions-inventories/trends-procedural-documentation) site for source category-specific details on what comprises the 2021 and 2022 estimates. 2) Introduced year 2023 estimates using 2023 EGU data (NOX and SO2 only from new CAMD site (https://ampd.epa.gov/ampd/), with all other 2023 estimates carried forward from the new 2022 estimates.
Updated April 5, 2023
Revisions from 2/10/2022: 1) Replaced all 2002 through 2019 data with EQUATES-based approach (see reference in next cell); 2) 2020 NEI used for year 2020; 3) 2021 and 2022 Highway Vehicles based on linear interpolation from years 2019 and 2023 modeling platform data, 4) 2021 and 2022 Off-highway based on interpolation from 2020 NEI to 2023 modeling platform data. 5) Introduction of Black Carbon and Organic Carbon (pollutants "EC"  and "OC", respectively), the elemental and organic carbon portions of inventory PM2.5 for years 2002 through 2022.  6) State data summaries now include Puerto Rico, Virgin Island, and Tribal estimates for years 2002 through 2022 for inventory sources where available. 7) Sector-total summaries are also available for years 2002-2022.
EQUATES reference:  https://doi.org/10.1016/j.dib.2023.109022
Updated February 10, 2022
Revisions from 3/25/21: 1) adds 2021 and updated 2020 EGU (NOX and SO2 only) data from new CAMD site (https://ampd.epa.gov/ampd/), 2) 2018 and 2019 emissions data from 2018gc and 2019ge emissions modeling platform state/SCC summaries, 3) carried HI Rx fires (Miscellaneous) from 2017, 4) 2019 wildfires (Miscellaneous) carried forward from 2018gc data where missing in 2018 (AK and HI); 5) Solvents (SCC=2477777777) removed from 2018 estimates, 6) CMV estimates for 2019 use 2018 estimates (2019 erroneous).
Year 2020 and 2021 Highway Vehicles and Off-Highway (nonroad mobile model component) are linear interpolations from the 2019ge and 2023fj emissions modeling inventories.  Year 2020 and 2021 non-EGU estimates (including Off-Highway aircraft, CMV and railroad sources) are carried forward from their 2019ge values (except for CMV (2018) and other exceptions listed above.
Puerto Rico, Virgin Island, and Tribal estimates are again retained while offshore estimates (state FIPS codes 85xxx and 98xxx) are not included.
Updated March 25, 2021
Updated file with the updated (final, January 2021 version) release of the 2017 NEI, correcting aircraft emissions, as well as incorporating some State and Local agency point inventory edits made between the April  2020 NEI release and June 2020. Highway data for 2018 through 2020 also updated to reflect linear interpolation from the 2017 NEI to year 2021"fi" emissions modeling data based on the 2016 emissions modeling platform. Off-highway data for 2018 through 2020 updated to reflect linear interpolation from the 2017 NEI to year 2020"fh" emissions modeling data based on the 2016 emissions modeling platform. FUEL COMB. ELEC. UTIL. estimates for 2018 through 2020 were based on current download from CAMD.  
With the availability of 2020 CAMD data, year 2020 estimates have been estimated for all sources, though it is important to note that other than the CAMD FUEL COMB. ELEC. UTIL estimates, none of the other 2020 estimates are based on actual 2020 inventory collection efforts.  Thus, for those sectors, potential estimates related to the COVID-19 pandemic have not been estimated. A complete estimate of 2020 emissions based on data collection efforts will not be available until the release of the 2020 NEI in the spring of 2023.
Updated April 27, 2020
Updates since May 30, 2019
Updated file with the 2017 NEI.  Updated NOx & SO2 CAMD emissions for 2018 & 2019 for states available.  For states not available through CAMD the 2017 NEI emissions were used to fill in.  For Highway and Off-Highway, 2015 & 2016 values were calculated using the slope between 2014v2 and 2017 NEI where year specific model data were not available.  The year specific model data were 2015 onroad and 2015/2016 nonroad.  In addition, 2018 onroad emissions were included directly from the modeling files.  The 2023 mobile data were used to interpolate mobile emissions for 2018 & 2019.


Updated May 30, 2019
Updates since March 08, 2019
Updated NOx & SO2 CAMD emissions for 2017 and added 2018 for states available.  For states not available through CAMD the 2014 NEI emissions were used to fill in.  For Highway and Off-Highway, 2018 values were calculated using the slope between 2014v2 and the 2017 modeling file and 2015 and 2016 were updated using year specific modeling files.  

Updates since March 27, 2018
Found an error in the code which separates prescribed and wildfires from miscellaneous.  Corrected the code then recalculated prescribed/wildfires and miscellaneous for 2012-2014.  2015-2017 were updated with the new 2014 values.

Updates since December 19, 2016
Added 2014v2 and recalculated emissions for 2012 & 2013 emissions.  Updated 2015-2017 SO2 and NOx electric generating unit emissions to the most recent CAMD available data.  States with data not available from CAMD were pulled forward from 2014v2 NEI.  2015-2017 mobile emissions were calculated using interpolation between 2014v2 NEI and the 2016 modeling files.  The modeling files did not include data for locomotive, commercial marine vessels and aircrafts.  These emissions were pulled forward from the 2014v2 NEI and held constant for 2015-2017.

Notable changes from 2014v1 to 2014v2
1.  Fuel Comb Industrial - new state estimates, limited changes in ICI methodology and updated activity data resulted in changes to PM10, PM2.5, SO2 & VOC
2.  Fuel Comb Other - Limited changes to Residential Wood Combustion resulted in changes to CO, PM10, PM2.5, SO2 & VOC
3.  Petroleum & Related Industries - new estimates from some states and limited changes to Oil & Gas tool resulted in changes to CO, NOx and VOC
4.  Highway Vehicles - New inputs (representative counties, new fleet ages, proportions of alternate fuel vehicles, new VPOP) resulted in significant changes to CO, NOx and VOC
5.  Off-Highway - New rail computed, CMV port limited to water and several states updated activity data resulted in noticeable changes in CO, NOx and VOC
6.  Miscellaneous - New submittals, limited methodology changes in unpaved road dust, fertilizer EFs updated, reintroduced precip-adjustment based on v1, new livestock dust, livestock waste errors fixed.  These changes resulted in noticeable if not significant changes in CO, PM10, PM2.5, SO2, VOC & NH3.
For more detailed documentation on the 2014v2 NEI please refer to the Technical Support Document (TSD) located at: 
https://www.epa.gov/air-emissions-inventories/2014-national-emissions-inventory-nei-technical-support-document-tsd

Updates since February 27, 2014:
Updated 2011 NEI v1 with 2011 NEI v2.  2009 & 2010 non-mobile emissions recalculated as a result of the 2011 update.  Updated 2012, 2013 and 2014 SO2 and NOX electric generating units emissions to the most recent CAMD available data.

Updates since February 17, 2014:
Wildfires for 2002v3 were updated to accurately reflect the inventory published on http://www.epa.gov/ttn/chief/net/2002inventory.html#inventorydata
2003 and 2004 Miscellaneous has been recalculated to reflect the adjustments to the 2002 Wildfire emissions.  This in turn will effect the 2003 and 2004 total emissions.
Updates since December 4, 2013:
Added Puerto Rico, Virgin Islands and Tribal data back into the trend line.  These were discovered to be included in the data prior to 2002 and thus were added back into 2002-present.  These data were estimated using interpolation for interim years and held constant after 2011.
Puerto Rico, Virgin Islands and Tribal data were not present in the MOVES database or for NOx and SO2 CAMD replacements.  The added territories were taken from the NEI years and interpolated values and then appended to the other data sources used for updating.
2012 & 2013 Puerto Rico, Virgin Islands and Tribal data were held constant from the 2011 NEI for all pollutants and tiers.
2013 EGU NOx and SO2 emissions were updating using CAMD's final estimates.

Updates since June 6, 2013:  Now using NEI 2011 v1 at the Tier 1 level.
Onroad & Nonroad updates for 2007, 2009 and 2010 from MOVES.
2006 mobile emissions were recalculated using interpolation between 2005 MOVES data and 2007 MOVES.
2009 & 2010 non-mobile emissions were recalculated using interpolation between NEI 2008v3 and NEI 2011v1.
CEM data for 2013 is currently only available for the first three quarters of the year.  The percent change from the third to fourth quarters in 2012 were used to estimate the final quarter of 2013.  AK and HI CEM data are not provided from CAMD and are held constant from 2011.
Projected 2020 inventory for mobile emissions were used to calculate 2012 and 2013 onroad and nonroad estimates.
2012 and 2013 emissions for non-EGU and non-mobile are held constant from 2011.

Updates since June 12, 2012:  Now using NEI 2008 v3 at the Tier 1 level.
2006 and 2007 were recalculated using interpolation between NEI 2005 v2 and NEI 2008 v3.
2002 and 2005 MOVES data were used to update 2002-2007.  The change in model resulted in noticeable changes in highway emissions from 2001 to 2002 for various pollutants
2012 CEM annual data were used to update the previous estimate.
Updates since June 14, 2011:  Now using NEI 2008v2 at the Tier 1 level.  Adjusted "Open burning" SCCs in 2005 to be more in align with 2008 wildfires.
This update affects emissions for year 2006 and after.
The NEI 2005 v2 and the 2008 NEI v2 are applied to recalculate 2006 and 2007 as an interpolation between 2005v2 and 2008v2.
2009-2012 values were filled with 2008v2 emissions (flat lined) except where noted because presently there is no comprehensive projected inventory available for interpolation based off the NEI 2008v2 inventory.
EGU (electric generating utility) NOx and SO2 emissions for 2009-2011 were updated with continuous emissions monitoring (CEMs) data from the EPA's Acid Rain  Program (CAMD) emissions database.
CEM data for 2012 is currently only available for the first three quarters of the year.  The percent change from the third to fourth quarters in 2011 were used to estimate the final quarter of 2012.  Alaska and Hawaii CEM data are not provided from CAMD and are held constant from 2008.
Projected 2012 inventory data from the 2005-based modeling platform <http://www.epa.gov/ttn/chief/emch/index.html> was used to develop 2009-2012 estimates for the mobile source sectors rather than flat lining and the results were scaled to the 2008v2 emissions to maintain consistency with the flat-line approach for other sectors.  The 2009- 2012 onroad and nonroad data were scaled to the 2008 NEI V2 onroad and nonroad sector data at the state pollutant level  (and gas and diesel  vehicles for onroad). 
An adjustment was applied to the 2005 NEI unclassified  fire emissions to allocate and add those emissions to pre-existing estimate of prescribed fires and wildfires, and provides for a more reasonable exclusion of wildfires for 'anthropogenic only' emissions.
The same  operation was performed for nonroad mobile used NMIM (NONROAD) model results  for monthly-county-SCC, aggregated to state-annual to compute ratios.  The 2012 projected inventory was that used for the final US EPA Cross-State Air Pollution Rule and is a product of the 2005 based modeling platform <http://www.epa.gov/ttn/chief/emch/index.html> which supported the Final Transport Rule.  The purpose of the Final Transport Rule was to identify upwind states’ emissions that significantly contribute to downwind nonattainment or interfere with downwind maintenance of the 1997 and 2006 fine particle (PM2.5) National Ambient Air Quality Standard (NAAQS) and the 1997 ozone NAAQS.   The Cross-State Air Pollution Rule (CSAPR), requires states to significantly improve air quality by reducing power plant emissions that contribute to ozone and/or fine particle pollution in other states.

Emissions in 2008 decreased over 2005 for all pollutants except slight increases for NH3, PM10, and PM2.5. 
NH3: The increase in the miscellaneous category come from prescribed fires and primarily from waste disposal, the latter largely due to the addition of municipal/commercial composting emissions.
PM: The increases in the highway vehicle category are associated with the change to the MOVES estimation model, which has higher PM2.5 emissions than previous model MOBILE6 due to temperature impacts on PM2.5 included in MOVES and based on new emissions testing. The increases in the Miscellaneous category are related to increases in dust from agricultural tilling and livestock especially for PM10.  The apparent increase in PM2.5 from 2005 to 2008 is also related to a change in methods for computing PM2.5 emissions from paved roads.  Specifically, a new method for 2008 paved road emissions was based on truck vehicle miles tracking and road particulate testing in collaboration with industry group for a new emission factor that results in an increase for PM2.5 and decrease for PM10.  These increases offset decreases in other sectors.
While slight increases are observed  up to 2008, the decrease after 2008 may be in part due to our approach to flat-line several categories  in absence of a projection year  emissions inventory. 
For instance for NH3 the trend in emissions from agriculture activities has been upward.  The flatline of the agriculture emissions in the Miscellaneous category from 2008, and the decreases in the other sectors allow for an apparent decrease. 
A thorough discussion of the emissions differences for all pollutants and categories is included in the 2008 v2 release documentation, posted at <http://www.epa.gov/ttn/chief/net/2008neiv2/2008_neiv2_tsd_draft.pdf>. EQUATES methodology 2002–19; 2020–25 include interpolated/projected estimates. 2020, 2021, 2022, 2023, 2024, and 2025 are in the interpolated/projected period; the workbook methodology reproduced in the note identifies edition-specific assignments.
- Breaks: EQUATES methodology 2002–19; 2020–25 include interpolated/projected estimates. 2020, 2021, 2022, 2023, 2024, and 2025 are in the interpolated/projected period; the workbook methodology reproduced in the note identifies edition-specific assignments.
- Fetched: 2026-09-11T21:19:58.421Z

## PM2.5 emissions excluding wildfires (emissionsPm25)

- Publisher: U.S. EPA National Emissions Inventory trends
- Source: <https://www.epa.gov/system/files/other-files/2026-09/national_tier1_caps_04sep2026.xlsx>
- Unit: thousand short tons
- Coverage: 2002–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: Pollutant-specific worksheet, Total without wildfires row, annual year columns. Publisher estimates retained; no interpolation performed here. Workbook methodology: All Emissions in this workbook are in kilotons (1000 short tons=2,000,000 lbs)
*Biogenics are not included in the trends
Updated September 4, 2026
Revisions from 2/21/2025: 1) Replaced all data for years 2022 through 2024, adding year 2025 data. 2) 2022 reflects the most-recent 2022 (v2.2) emissions modeling platform data. 3) 2023 reflects the final 2023 NEI (as of May 5, 2026). 4) 2024 is the same as 2023 NEI data but includes year 2024 updates for NOX and SO2 EGU data (https://campd.epa.gov/data) and draft 2024 wildfire and prescribed fires data. 5) 2025 is also the same as the 2023 NEI except for year 2025 NOX and SO2 EGU data and draft 2025 wildfire data, with 2025 prescribed fire estimates held at draft 2024 estimates.  6) 2023 NEI rerun 28sep26 to remove abandoned wells (VOC only, Petroleum Tier)
Updated February 21, 2025
Revisions from 2/9/2024:  1) Replaced year 2020 with EIS report of final 2020 NEI. 2) Replaced years 2021 through 2022 data with emissions modeling data; see latest "Current Methods Used to Estimate Emissions for the Years 2002-2024" documentation on the Trends Procedural Documentation (https://www.epa.gov/air-emissions-inventories/trends-procedural-documentation) site for source category-specific details on what comprises the 2021 through 2024 estimates. 3) Updated year 2023 emissions as either carry-forward from 2022 data, or, for mobile sources, interpolation to projected 2026 modeling data. 4) Introduced year 2024 estimates using 2024 EGU data (NOX and SO2 only from new CAMD site (https://ampd.epa.gov/ampd/), with all other 2024 estimates carried forward from the new 2023 estimates, or interpolated between 2022 and 2026 for mobile sources.
Updated February 9, 2024
Revisions from 4/5/2023: 1) Replaced year 2021 and 2022 data with emissions modeling data; see latest "Current Methods Used to Estimate Emissions for the Years 2002-2023" documentation on the Trends Procedural Documentation (https://www.epa.gov/air-emissions-inventories/trends-procedural-documentation) site for source category-specific details on what comprises the 2021 and 2022 estimates. 2) Introduced year 2023 estimates using 2023 EGU data (NOX and SO2 only from new CAMD site (https://ampd.epa.gov/ampd/), with all other 2023 estimates carried forward from the new 2022 estimates.
Updated April 5, 2023
Revisions from 2/10/2022: 1) Replaced all 2002 through 2019 data with EQUATES-based approach (see reference in next cell); 2) 2020 NEI used for year 2020; 3) 2021 and 2022 Highway Vehicles based on linear interpolation from years 2019 and 2023 modeling platform data, 4) 2021 and 2022 Off-highway based on interpolation from 2020 NEI to 2023 modeling platform data. 5) Introduction of Black Carbon and Organic Carbon (pollutants "EC"  and "OC", respectively), the elemental and organic carbon portions of inventory PM2.5 for years 2002 through 2022.  6) State data summaries now include Puerto Rico, Virgin Island, and Tribal estimates for years 2002 through 2022 for inventory sources where available. 7) Sector-total summaries are also available for years 2002-2022.
EQUATES reference:  https://doi.org/10.1016/j.dib.2023.109022
Updated February 10, 2022
Revisions from 3/25/21: 1) adds 2021 and updated 2020 EGU (NOX and SO2 only) data from new CAMD site (https://ampd.epa.gov/ampd/), 2) 2018 and 2019 emissions data from 2018gc and 2019ge emissions modeling platform state/SCC summaries, 3) carried HI Rx fires (Miscellaneous) from 2017, 4) 2019 wildfires (Miscellaneous) carried forward from 2018gc data where missing in 2018 (AK and HI); 5) Solvents (SCC=2477777777) removed from 2018 estimates, 6) CMV estimates for 2019 use 2018 estimates (2019 erroneous).
Year 2020 and 2021 Highway Vehicles and Off-Highway (nonroad mobile model component) are linear interpolations from the 2019ge and 2023fj emissions modeling inventories.  Year 2020 and 2021 non-EGU estimates (including Off-Highway aircraft, CMV and railroad sources) are carried forward from their 2019ge values (except for CMV (2018) and other exceptions listed above.
Puerto Rico, Virgin Island, and Tribal estimates are again retained while offshore estimates (state FIPS codes 85xxx and 98xxx) are not included.
Updated March 25, 2021
Updated file with the updated (final, January 2021 version) release of the 2017 NEI, correcting aircraft emissions, as well as incorporating some State and Local agency point inventory edits made between the April  2020 NEI release and June 2020. Highway data for 2018 through 2020 also updated to reflect linear interpolation from the 2017 NEI to year 2021"fi" emissions modeling data based on the 2016 emissions modeling platform. Off-highway data for 2018 through 2020 updated to reflect linear interpolation from the 2017 NEI to year 2020"fh" emissions modeling data based on the 2016 emissions modeling platform. FUEL COMB. ELEC. UTIL. estimates for 2018 through 2020 were based on current download from CAMD.  
With the availability of 2020 CAMD data, year 2020 estimates have been estimated for all sources, though it is important to note that other than the CAMD FUEL COMB. ELEC. UTIL estimates, none of the other 2020 estimates are based on actual 2020 inventory collection efforts.  Thus, for those sectors, potential estimates related to the COVID-19 pandemic have not been estimated. A complete estimate of 2020 emissions based on data collection efforts will not be available until the release of the 2020 NEI in the spring of 2023.
Updated April 27, 2020
Updates since May 30, 2019
Updated file with the 2017 NEI.  Updated NOx & SO2 CAMD emissions for 2018 & 2019 for states available.  For states not available through CAMD the 2017 NEI emissions were used to fill in.  For Highway and Off-Highway, 2015 & 2016 values were calculated using the slope between 2014v2 and 2017 NEI where year specific model data were not available.  The year specific model data were 2015 onroad and 2015/2016 nonroad.  In addition, 2018 onroad emissions were included directly from the modeling files.  The 2023 mobile data were used to interpolate mobile emissions for 2018 & 2019.


Updated May 30, 2019
Updates since March 08, 2019
Updated NOx & SO2 CAMD emissions for 2017 and added 2018 for states available.  For states not available through CAMD the 2014 NEI emissions were used to fill in.  For Highway and Off-Highway, 2018 values were calculated using the slope between 2014v2 and the 2017 modeling file and 2015 and 2016 were updated using year specific modeling files.  

Updates since March 27, 2018
Found an error in the code which separates prescribed and wildfires from miscellaneous.  Corrected the code then recalculated prescribed/wildfires and miscellaneous for 2012-2014.  2015-2017 were updated with the new 2014 values.

Updates since December 19, 2016
Added 2014v2 and recalculated emissions for 2012 & 2013 emissions.  Updated 2015-2017 SO2 and NOx electric generating unit emissions to the most recent CAMD available data.  States with data not available from CAMD were pulled forward from 2014v2 NEI.  2015-2017 mobile emissions were calculated using interpolation between 2014v2 NEI and the 2016 modeling files.  The modeling files did not include data for locomotive, commercial marine vessels and aircrafts.  These emissions were pulled forward from the 2014v2 NEI and held constant for 2015-2017.

Notable changes from 2014v1 to 2014v2
1.  Fuel Comb Industrial - new state estimates, limited changes in ICI methodology and updated activity data resulted in changes to PM10, PM2.5, SO2 & VOC
2.  Fuel Comb Other - Limited changes to Residential Wood Combustion resulted in changes to CO, PM10, PM2.5, SO2 & VOC
3.  Petroleum & Related Industries - new estimates from some states and limited changes to Oil & Gas tool resulted in changes to CO, NOx and VOC
4.  Highway Vehicles - New inputs (representative counties, new fleet ages, proportions of alternate fuel vehicles, new VPOP) resulted in significant changes to CO, NOx and VOC
5.  Off-Highway - New rail computed, CMV port limited to water and several states updated activity data resulted in noticeable changes in CO, NOx and VOC
6.  Miscellaneous - New submittals, limited methodology changes in unpaved road dust, fertilizer EFs updated, reintroduced precip-adjustment based on v1, new livestock dust, livestock waste errors fixed.  These changes resulted in noticeable if not significant changes in CO, PM10, PM2.5, SO2, VOC & NH3.
For more detailed documentation on the 2014v2 NEI please refer to the Technical Support Document (TSD) located at: 
https://www.epa.gov/air-emissions-inventories/2014-national-emissions-inventory-nei-technical-support-document-tsd

Updates since February 27, 2014:
Updated 2011 NEI v1 with 2011 NEI v2.  2009 & 2010 non-mobile emissions recalculated as a result of the 2011 update.  Updated 2012, 2013 and 2014 SO2 and NOX electric generating units emissions to the most recent CAMD available data.

Updates since February 17, 2014:
Wildfires for 2002v3 were updated to accurately reflect the inventory published on http://www.epa.gov/ttn/chief/net/2002inventory.html#inventorydata
2003 and 2004 Miscellaneous has been recalculated to reflect the adjustments to the 2002 Wildfire emissions.  This in turn will effect the 2003 and 2004 total emissions.
Updates since December 4, 2013:
Added Puerto Rico, Virgin Islands and Tribal data back into the trend line.  These were discovered to be included in the data prior to 2002 and thus were added back into 2002-present.  These data were estimated using interpolation for interim years and held constant after 2011.
Puerto Rico, Virgin Islands and Tribal data were not present in the MOVES database or for NOx and SO2 CAMD replacements.  The added territories were taken from the NEI years and interpolated values and then appended to the other data sources used for updating.
2012 & 2013 Puerto Rico, Virgin Islands and Tribal data were held constant from the 2011 NEI for all pollutants and tiers.
2013 EGU NOx and SO2 emissions were updating using CAMD's final estimates.

Updates since June 6, 2013:  Now using NEI 2011 v1 at the Tier 1 level.
Onroad & Nonroad updates for 2007, 2009 and 2010 from MOVES.
2006 mobile emissions were recalculated using interpolation between 2005 MOVES data and 2007 MOVES.
2009 & 2010 non-mobile emissions were recalculated using interpolation between NEI 2008v3 and NEI 2011v1.
CEM data for 2013 is currently only available for the first three quarters of the year.  The percent change from the third to fourth quarters in 2012 were used to estimate the final quarter of 2013.  AK and HI CEM data are not provided from CAMD and are held constant from 2011.
Projected 2020 inventory for mobile emissions were used to calculate 2012 and 2013 onroad and nonroad estimates.
2012 and 2013 emissions for non-EGU and non-mobile are held constant from 2011.

Updates since June 12, 2012:  Now using NEI 2008 v3 at the Tier 1 level.
2006 and 2007 were recalculated using interpolation between NEI 2005 v2 and NEI 2008 v3.
2002 and 2005 MOVES data were used to update 2002-2007.  The change in model resulted in noticeable changes in highway emissions from 2001 to 2002 for various pollutants
2012 CEM annual data were used to update the previous estimate.
Updates since June 14, 2011:  Now using NEI 2008v2 at the Tier 1 level.  Adjusted "Open burning" SCCs in 2005 to be more in align with 2008 wildfires.
This update affects emissions for year 2006 and after.
The NEI 2005 v2 and the 2008 NEI v2 are applied to recalculate 2006 and 2007 as an interpolation between 2005v2 and 2008v2.
2009-2012 values were filled with 2008v2 emissions (flat lined) except where noted because presently there is no comprehensive projected inventory available for interpolation based off the NEI 2008v2 inventory.
EGU (electric generating utility) NOx and SO2 emissions for 2009-2011 were updated with continuous emissions monitoring (CEMs) data from the EPA's Acid Rain  Program (CAMD) emissions database.
CEM data for 2012 is currently only available for the first three quarters of the year.  The percent change from the third to fourth quarters in 2011 were used to estimate the final quarter of 2012.  Alaska and Hawaii CEM data are not provided from CAMD and are held constant from 2008.
Projected 2012 inventory data from the 2005-based modeling platform <http://www.epa.gov/ttn/chief/emch/index.html> was used to develop 2009-2012 estimates for the mobile source sectors rather than flat lining and the results were scaled to the 2008v2 emissions to maintain consistency with the flat-line approach for other sectors.  The 2009- 2012 onroad and nonroad data were scaled to the 2008 NEI V2 onroad and nonroad sector data at the state pollutant level  (and gas and diesel  vehicles for onroad). 
An adjustment was applied to the 2005 NEI unclassified  fire emissions to allocate and add those emissions to pre-existing estimate of prescribed fires and wildfires, and provides for a more reasonable exclusion of wildfires for 'anthropogenic only' emissions.
The same  operation was performed for nonroad mobile used NMIM (NONROAD) model results  for monthly-county-SCC, aggregated to state-annual to compute ratios.  The 2012 projected inventory was that used for the final US EPA Cross-State Air Pollution Rule and is a product of the 2005 based modeling platform <http://www.epa.gov/ttn/chief/emch/index.html> which supported the Final Transport Rule.  The purpose of the Final Transport Rule was to identify upwind states’ emissions that significantly contribute to downwind nonattainment or interfere with downwind maintenance of the 1997 and 2006 fine particle (PM2.5) National Ambient Air Quality Standard (NAAQS) and the 1997 ozone NAAQS.   The Cross-State Air Pollution Rule (CSAPR), requires states to significantly improve air quality by reducing power plant emissions that contribute to ozone and/or fine particle pollution in other states.

Emissions in 2008 decreased over 2005 for all pollutants except slight increases for NH3, PM10, and PM2.5. 
NH3: The increase in the miscellaneous category come from prescribed fires and primarily from waste disposal, the latter largely due to the addition of municipal/commercial composting emissions.
PM: The increases in the highway vehicle category are associated with the change to the MOVES estimation model, which has higher PM2.5 emissions than previous model MOBILE6 due to temperature impacts on PM2.5 included in MOVES and based on new emissions testing. The increases in the Miscellaneous category are related to increases in dust from agricultural tilling and livestock especially for PM10.  The apparent increase in PM2.5 from 2005 to 2008 is also related to a change in methods for computing PM2.5 emissions from paved roads.  Specifically, a new method for 2008 paved road emissions was based on truck vehicle miles tracking and road particulate testing in collaboration with industry group for a new emission factor that results in an increase for PM2.5 and decrease for PM10.  These increases offset decreases in other sectors.
While slight increases are observed  up to 2008, the decrease after 2008 may be in part due to our approach to flat-line several categories  in absence of a projection year  emissions inventory. 
For instance for NH3 the trend in emissions from agriculture activities has been upward.  The flatline of the agriculture emissions in the Miscellaneous category from 2008, and the decreases in the other sectors allow for an apparent decrease. 
A thorough discussion of the emissions differences for all pollutants and categories is included in the 2008 v2 release documentation, posted at <http://www.epa.gov/ttn/chief/net/2008neiv2/2008_neiv2_tsd_draft.pdf>. EQUATES methodology 2002–19; 2020–25 include interpolated/projected estimates. 2020, 2021, 2022, 2023, 2024, and 2025 are in the interpolated/projected period; the workbook methodology reproduced in the note identifies edition-specific assignments.
- Breaks: EQUATES methodology 2002–19; 2020–25 include interpolated/projected estimates. 2020, 2021, 2022, 2023, 2024, and 2025 are in the interpolated/projected period; the workbook methodology reproduced in the note identifies edition-specific assignments.
- Fetched: 2026-09-11T21:19:58.421Z

## SO2 emissions excluding wildfires (emissionsSo2)

- Publisher: U.S. EPA National Emissions Inventory trends
- Source: <https://www.epa.gov/system/files/other-files/2026-09/national_tier1_caps_04sep2026.xlsx>
- Unit: thousand short tons
- Coverage: 1970–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: Pollutant-specific worksheet, Total without wildfires row, annual year columns. Publisher estimates retained; no interpolation performed here. Workbook methodology: All Emissions in this workbook are in kilotons (1000 short tons=2,000,000 lbs)
*Biogenics are not included in the trends
Updated September 4, 2026
Revisions from 2/21/2025: 1) Replaced all data for years 2022 through 2024, adding year 2025 data. 2) 2022 reflects the most-recent 2022 (v2.2) emissions modeling platform data. 3) 2023 reflects the final 2023 NEI (as of May 5, 2026). 4) 2024 is the same as 2023 NEI data but includes year 2024 updates for NOX and SO2 EGU data (https://campd.epa.gov/data) and draft 2024 wildfire and prescribed fires data. 5) 2025 is also the same as the 2023 NEI except for year 2025 NOX and SO2 EGU data and draft 2025 wildfire data, with 2025 prescribed fire estimates held at draft 2024 estimates.  6) 2023 NEI rerun 28sep26 to remove abandoned wells (VOC only, Petroleum Tier)
Updated February 21, 2025
Revisions from 2/9/2024:  1) Replaced year 2020 with EIS report of final 2020 NEI. 2) Replaced years 2021 through 2022 data with emissions modeling data; see latest "Current Methods Used to Estimate Emissions for the Years 2002-2024" documentation on the Trends Procedural Documentation (https://www.epa.gov/air-emissions-inventories/trends-procedural-documentation) site for source category-specific details on what comprises the 2021 through 2024 estimates. 3) Updated year 2023 emissions as either carry-forward from 2022 data, or, for mobile sources, interpolation to projected 2026 modeling data. 4) Introduced year 2024 estimates using 2024 EGU data (NOX and SO2 only from new CAMD site (https://ampd.epa.gov/ampd/), with all other 2024 estimates carried forward from the new 2023 estimates, or interpolated between 2022 and 2026 for mobile sources.
Updated February 9, 2024
Revisions from 4/5/2023: 1) Replaced year 2021 and 2022 data with emissions modeling data; see latest "Current Methods Used to Estimate Emissions for the Years 2002-2023" documentation on the Trends Procedural Documentation (https://www.epa.gov/air-emissions-inventories/trends-procedural-documentation) site for source category-specific details on what comprises the 2021 and 2022 estimates. 2) Introduced year 2023 estimates using 2023 EGU data (NOX and SO2 only from new CAMD site (https://ampd.epa.gov/ampd/), with all other 2023 estimates carried forward from the new 2022 estimates.
Updated April 5, 2023
Revisions from 2/10/2022: 1) Replaced all 2002 through 2019 data with EQUATES-based approach (see reference in next cell); 2) 2020 NEI used for year 2020; 3) 2021 and 2022 Highway Vehicles based on linear interpolation from years 2019 and 2023 modeling platform data, 4) 2021 and 2022 Off-highway based on interpolation from 2020 NEI to 2023 modeling platform data. 5) Introduction of Black Carbon and Organic Carbon (pollutants "EC"  and "OC", respectively), the elemental and organic carbon portions of inventory PM2.5 for years 2002 through 2022.  6) State data summaries now include Puerto Rico, Virgin Island, and Tribal estimates for years 2002 through 2022 for inventory sources where available. 7) Sector-total summaries are also available for years 2002-2022.
EQUATES reference:  https://doi.org/10.1016/j.dib.2023.109022
Updated February 10, 2022
Revisions from 3/25/21: 1) adds 2021 and updated 2020 EGU (NOX and SO2 only) data from new CAMD site (https://ampd.epa.gov/ampd/), 2) 2018 and 2019 emissions data from 2018gc and 2019ge emissions modeling platform state/SCC summaries, 3) carried HI Rx fires (Miscellaneous) from 2017, 4) 2019 wildfires (Miscellaneous) carried forward from 2018gc data where missing in 2018 (AK and HI); 5) Solvents (SCC=2477777777) removed from 2018 estimates, 6) CMV estimates for 2019 use 2018 estimates (2019 erroneous).
Year 2020 and 2021 Highway Vehicles and Off-Highway (nonroad mobile model component) are linear interpolations from the 2019ge and 2023fj emissions modeling inventories.  Year 2020 and 2021 non-EGU estimates (including Off-Highway aircraft, CMV and railroad sources) are carried forward from their 2019ge values (except for CMV (2018) and other exceptions listed above.
Puerto Rico, Virgin Island, and Tribal estimates are again retained while offshore estimates (state FIPS codes 85xxx and 98xxx) are not included.
Updated March 25, 2021
Updated file with the updated (final, January 2021 version) release of the 2017 NEI, correcting aircraft emissions, as well as incorporating some State and Local agency point inventory edits made between the April  2020 NEI release and June 2020. Highway data for 2018 through 2020 also updated to reflect linear interpolation from the 2017 NEI to year 2021"fi" emissions modeling data based on the 2016 emissions modeling platform. Off-highway data for 2018 through 2020 updated to reflect linear interpolation from the 2017 NEI to year 2020"fh" emissions modeling data based on the 2016 emissions modeling platform. FUEL COMB. ELEC. UTIL. estimates for 2018 through 2020 were based on current download from CAMD.  
With the availability of 2020 CAMD data, year 2020 estimates have been estimated for all sources, though it is important to note that other than the CAMD FUEL COMB. ELEC. UTIL estimates, none of the other 2020 estimates are based on actual 2020 inventory collection efforts.  Thus, for those sectors, potential estimates related to the COVID-19 pandemic have not been estimated. A complete estimate of 2020 emissions based on data collection efforts will not be available until the release of the 2020 NEI in the spring of 2023.
Updated April 27, 2020
Updates since May 30, 2019
Updated file with the 2017 NEI.  Updated NOx & SO2 CAMD emissions for 2018 & 2019 for states available.  For states not available through CAMD the 2017 NEI emissions were used to fill in.  For Highway and Off-Highway, 2015 & 2016 values were calculated using the slope between 2014v2 and 2017 NEI where year specific model data were not available.  The year specific model data were 2015 onroad and 2015/2016 nonroad.  In addition, 2018 onroad emissions were included directly from the modeling files.  The 2023 mobile data were used to interpolate mobile emissions for 2018 & 2019.


Updated May 30, 2019
Updates since March 08, 2019
Updated NOx & SO2 CAMD emissions for 2017 and added 2018 for states available.  For states not available through CAMD the 2014 NEI emissions were used to fill in.  For Highway and Off-Highway, 2018 values were calculated using the slope between 2014v2 and the 2017 modeling file and 2015 and 2016 were updated using year specific modeling files.  

Updates since March 27, 2018
Found an error in the code which separates prescribed and wildfires from miscellaneous.  Corrected the code then recalculated prescribed/wildfires and miscellaneous for 2012-2014.  2015-2017 were updated with the new 2014 values.

Updates since December 19, 2016
Added 2014v2 and recalculated emissions for 2012 & 2013 emissions.  Updated 2015-2017 SO2 and NOx electric generating unit emissions to the most recent CAMD available data.  States with data not available from CAMD were pulled forward from 2014v2 NEI.  2015-2017 mobile emissions were calculated using interpolation between 2014v2 NEI and the 2016 modeling files.  The modeling files did not include data for locomotive, commercial marine vessels and aircrafts.  These emissions were pulled forward from the 2014v2 NEI and held constant for 2015-2017.

Notable changes from 2014v1 to 2014v2
1.  Fuel Comb Industrial - new state estimates, limited changes in ICI methodology and updated activity data resulted in changes to PM10, PM2.5, SO2 & VOC
2.  Fuel Comb Other - Limited changes to Residential Wood Combustion resulted in changes to CO, PM10, PM2.5, SO2 & VOC
3.  Petroleum & Related Industries - new estimates from some states and limited changes to Oil & Gas tool resulted in changes to CO, NOx and VOC
4.  Highway Vehicles - New inputs (representative counties, new fleet ages, proportions of alternate fuel vehicles, new VPOP) resulted in significant changes to CO, NOx and VOC
5.  Off-Highway - New rail computed, CMV port limited to water and several states updated activity data resulted in noticeable changes in CO, NOx and VOC
6.  Miscellaneous - New submittals, limited methodology changes in unpaved road dust, fertilizer EFs updated, reintroduced precip-adjustment based on v1, new livestock dust, livestock waste errors fixed.  These changes resulted in noticeable if not significant changes in CO, PM10, PM2.5, SO2, VOC & NH3.
For more detailed documentation on the 2014v2 NEI please refer to the Technical Support Document (TSD) located at: 
https://www.epa.gov/air-emissions-inventories/2014-national-emissions-inventory-nei-technical-support-document-tsd

Updates since February 27, 2014:
Updated 2011 NEI v1 with 2011 NEI v2.  2009 & 2010 non-mobile emissions recalculated as a result of the 2011 update.  Updated 2012, 2013 and 2014 SO2 and NOX electric generating units emissions to the most recent CAMD available data.

Updates since February 17, 2014:
Wildfires for 2002v3 were updated to accurately reflect the inventory published on http://www.epa.gov/ttn/chief/net/2002inventory.html#inventorydata
2003 and 2004 Miscellaneous has been recalculated to reflect the adjustments to the 2002 Wildfire emissions.  This in turn will effect the 2003 and 2004 total emissions.
Updates since December 4, 2013:
Added Puerto Rico, Virgin Islands and Tribal data back into the trend line.  These were discovered to be included in the data prior to 2002 and thus were added back into 2002-present.  These data were estimated using interpolation for interim years and held constant after 2011.
Puerto Rico, Virgin Islands and Tribal data were not present in the MOVES database or for NOx and SO2 CAMD replacements.  The added territories were taken from the NEI years and interpolated values and then appended to the other data sources used for updating.
2012 & 2013 Puerto Rico, Virgin Islands and Tribal data were held constant from the 2011 NEI for all pollutants and tiers.
2013 EGU NOx and SO2 emissions were updating using CAMD's final estimates.

Updates since June 6, 2013:  Now using NEI 2011 v1 at the Tier 1 level.
Onroad & Nonroad updates for 2007, 2009 and 2010 from MOVES.
2006 mobile emissions were recalculated using interpolation between 2005 MOVES data and 2007 MOVES.
2009 & 2010 non-mobile emissions were recalculated using interpolation between NEI 2008v3 and NEI 2011v1.
CEM data for 2013 is currently only available for the first three quarters of the year.  The percent change from the third to fourth quarters in 2012 were used to estimate the final quarter of 2013.  AK and HI CEM data are not provided from CAMD and are held constant from 2011.
Projected 2020 inventory for mobile emissions were used to calculate 2012 and 2013 onroad and nonroad estimates.
2012 and 2013 emissions for non-EGU and non-mobile are held constant from 2011.

Updates since June 12, 2012:  Now using NEI 2008 v3 at the Tier 1 level.
2006 and 2007 were recalculated using interpolation between NEI 2005 v2 and NEI 2008 v3.
2002 and 2005 MOVES data were used to update 2002-2007.  The change in model resulted in noticeable changes in highway emissions from 2001 to 2002 for various pollutants
2012 CEM annual data were used to update the previous estimate.
Updates since June 14, 2011:  Now using NEI 2008v2 at the Tier 1 level.  Adjusted "Open burning" SCCs in 2005 to be more in align with 2008 wildfires.
This update affects emissions for year 2006 and after.
The NEI 2005 v2 and the 2008 NEI v2 are applied to recalculate 2006 and 2007 as an interpolation between 2005v2 and 2008v2.
2009-2012 values were filled with 2008v2 emissions (flat lined) except where noted because presently there is no comprehensive projected inventory available for interpolation based off the NEI 2008v2 inventory.
EGU (electric generating utility) NOx and SO2 emissions for 2009-2011 were updated with continuous emissions monitoring (CEMs) data from the EPA's Acid Rain  Program (CAMD) emissions database.
CEM data for 2012 is currently only available for the first three quarters of the year.  The percent change from the third to fourth quarters in 2011 were used to estimate the final quarter of 2012.  Alaska and Hawaii CEM data are not provided from CAMD and are held constant from 2008.
Projected 2012 inventory data from the 2005-based modeling platform <http://www.epa.gov/ttn/chief/emch/index.html> was used to develop 2009-2012 estimates for the mobile source sectors rather than flat lining and the results were scaled to the 2008v2 emissions to maintain consistency with the flat-line approach for other sectors.  The 2009- 2012 onroad and nonroad data were scaled to the 2008 NEI V2 onroad and nonroad sector data at the state pollutant level  (and gas and diesel  vehicles for onroad). 
An adjustment was applied to the 2005 NEI unclassified  fire emissions to allocate and add those emissions to pre-existing estimate of prescribed fires and wildfires, and provides for a more reasonable exclusion of wildfires for 'anthropogenic only' emissions.
The same  operation was performed for nonroad mobile used NMIM (NONROAD) model results  for monthly-county-SCC, aggregated to state-annual to compute ratios.  The 2012 projected inventory was that used for the final US EPA Cross-State Air Pollution Rule and is a product of the 2005 based modeling platform <http://www.epa.gov/ttn/chief/emch/index.html> which supported the Final Transport Rule.  The purpose of the Final Transport Rule was to identify upwind states’ emissions that significantly contribute to downwind nonattainment or interfere with downwind maintenance of the 1997 and 2006 fine particle (PM2.5) National Ambient Air Quality Standard (NAAQS) and the 1997 ozone NAAQS.   The Cross-State Air Pollution Rule (CSAPR), requires states to significantly improve air quality by reducing power plant emissions that contribute to ozone and/or fine particle pollution in other states.

Emissions in 2008 decreased over 2005 for all pollutants except slight increases for NH3, PM10, and PM2.5. 
NH3: The increase in the miscellaneous category come from prescribed fires and primarily from waste disposal, the latter largely due to the addition of municipal/commercial composting emissions.
PM: The increases in the highway vehicle category are associated with the change to the MOVES estimation model, which has higher PM2.5 emissions than previous model MOBILE6 due to temperature impacts on PM2.5 included in MOVES and based on new emissions testing. The increases in the Miscellaneous category are related to increases in dust from agricultural tilling and livestock especially for PM10.  The apparent increase in PM2.5 from 2005 to 2008 is also related to a change in methods for computing PM2.5 emissions from paved roads.  Specifically, a new method for 2008 paved road emissions was based on truck vehicle miles tracking and road particulate testing in collaboration with industry group for a new emission factor that results in an increase for PM2.5 and decrease for PM10.  These increases offset decreases in other sectors.
While slight increases are observed  up to 2008, the decrease after 2008 may be in part due to our approach to flat-line several categories  in absence of a projection year  emissions inventory. 
For instance for NH3 the trend in emissions from agriculture activities has been upward.  The flatline of the agriculture emissions in the Miscellaneous category from 2008, and the decreases in the other sectors allow for an apparent decrease. 
A thorough discussion of the emissions differences for all pollutants and categories is included in the 2008 v2 release documentation, posted at <http://www.epa.gov/ttn/chief/net/2008neiv2/2008_neiv2_tsd_draft.pdf>. EQUATES methodology 2002–19; 2020–25 include interpolated/projected estimates. 2020, 2021, 2022, 2023, 2024, and 2025 are in the interpolated/projected period; the workbook methodology reproduced in the note identifies edition-specific assignments.
- Breaks: EQUATES methodology 2002–19; 2020–25 include interpolated/projected estimates. 2020, 2021, 2022, 2023, 2024, and 2025 are in the interpolated/projected period; the workbook methodology reproduced in the note identifies edition-specific assignments.
- Fetched: 2026-09-11T21:19:58.421Z

## VOC emissions excluding wildfires (emissionsVoc)

- Publisher: U.S. EPA National Emissions Inventory trends
- Source: <https://www.epa.gov/system/files/other-files/2026-09/national_tier1_caps_04sep2026.xlsx>
- Unit: thousand short tons
- Coverage: 1970–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: Pollutant-specific worksheet, Total without wildfires row, annual year columns. Publisher estimates retained; no interpolation performed here. Workbook methodology: All Emissions in this workbook are in kilotons (1000 short tons=2,000,000 lbs)
*Biogenics are not included in the trends
Updated September 4, 2026
Revisions from 2/21/2025: 1) Replaced all data for years 2022 through 2024, adding year 2025 data. 2) 2022 reflects the most-recent 2022 (v2.2) emissions modeling platform data. 3) 2023 reflects the final 2023 NEI (as of May 5, 2026). 4) 2024 is the same as 2023 NEI data but includes year 2024 updates for NOX and SO2 EGU data (https://campd.epa.gov/data) and draft 2024 wildfire and prescribed fires data. 5) 2025 is also the same as the 2023 NEI except for year 2025 NOX and SO2 EGU data and draft 2025 wildfire data, with 2025 prescribed fire estimates held at draft 2024 estimates.  6) 2023 NEI rerun 28sep26 to remove abandoned wells (VOC only, Petroleum Tier)
Updated February 21, 2025
Revisions from 2/9/2024:  1) Replaced year 2020 with EIS report of final 2020 NEI. 2) Replaced years 2021 through 2022 data with emissions modeling data; see latest "Current Methods Used to Estimate Emissions for the Years 2002-2024" documentation on the Trends Procedural Documentation (https://www.epa.gov/air-emissions-inventories/trends-procedural-documentation) site for source category-specific details on what comprises the 2021 through 2024 estimates. 3) Updated year 2023 emissions as either carry-forward from 2022 data, or, for mobile sources, interpolation to projected 2026 modeling data. 4) Introduced year 2024 estimates using 2024 EGU data (NOX and SO2 only from new CAMD site (https://ampd.epa.gov/ampd/), with all other 2024 estimates carried forward from the new 2023 estimates, or interpolated between 2022 and 2026 for mobile sources.
Updated February 9, 2024
Revisions from 4/5/2023: 1) Replaced year 2021 and 2022 data with emissions modeling data; see latest "Current Methods Used to Estimate Emissions for the Years 2002-2023" documentation on the Trends Procedural Documentation (https://www.epa.gov/air-emissions-inventories/trends-procedural-documentation) site for source category-specific details on what comprises the 2021 and 2022 estimates. 2) Introduced year 2023 estimates using 2023 EGU data (NOX and SO2 only from new CAMD site (https://ampd.epa.gov/ampd/), with all other 2023 estimates carried forward from the new 2022 estimates.
Updated April 5, 2023
Revisions from 2/10/2022: 1) Replaced all 2002 through 2019 data with EQUATES-based approach (see reference in next cell); 2) 2020 NEI used for year 2020; 3) 2021 and 2022 Highway Vehicles based on linear interpolation from years 2019 and 2023 modeling platform data, 4) 2021 and 2022 Off-highway based on interpolation from 2020 NEI to 2023 modeling platform data. 5) Introduction of Black Carbon and Organic Carbon (pollutants "EC"  and "OC", respectively), the elemental and organic carbon portions of inventory PM2.5 for years 2002 through 2022.  6) State data summaries now include Puerto Rico, Virgin Island, and Tribal estimates for years 2002 through 2022 for inventory sources where available. 7) Sector-total summaries are also available for years 2002-2022.
EQUATES reference:  https://doi.org/10.1016/j.dib.2023.109022
Updated February 10, 2022
Revisions from 3/25/21: 1) adds 2021 and updated 2020 EGU (NOX and SO2 only) data from new CAMD site (https://ampd.epa.gov/ampd/), 2) 2018 and 2019 emissions data from 2018gc and 2019ge emissions modeling platform state/SCC summaries, 3) carried HI Rx fires (Miscellaneous) from 2017, 4) 2019 wildfires (Miscellaneous) carried forward from 2018gc data where missing in 2018 (AK and HI); 5) Solvents (SCC=2477777777) removed from 2018 estimates, 6) CMV estimates for 2019 use 2018 estimates (2019 erroneous).
Year 2020 and 2021 Highway Vehicles and Off-Highway (nonroad mobile model component) are linear interpolations from the 2019ge and 2023fj emissions modeling inventories.  Year 2020 and 2021 non-EGU estimates (including Off-Highway aircraft, CMV and railroad sources) are carried forward from their 2019ge values (except for CMV (2018) and other exceptions listed above.
Puerto Rico, Virgin Island, and Tribal estimates are again retained while offshore estimates (state FIPS codes 85xxx and 98xxx) are not included.
Updated March 25, 2021
Updated file with the updated (final, January 2021 version) release of the 2017 NEI, correcting aircraft emissions, as well as incorporating some State and Local agency point inventory edits made between the April  2020 NEI release and June 2020. Highway data for 2018 through 2020 also updated to reflect linear interpolation from the 2017 NEI to year 2021"fi" emissions modeling data based on the 2016 emissions modeling platform. Off-highway data for 2018 through 2020 updated to reflect linear interpolation from the 2017 NEI to year 2020"fh" emissions modeling data based on the 2016 emissions modeling platform. FUEL COMB. ELEC. UTIL. estimates for 2018 through 2020 were based on current download from CAMD.  
With the availability of 2020 CAMD data, year 2020 estimates have been estimated for all sources, though it is important to note that other than the CAMD FUEL COMB. ELEC. UTIL estimates, none of the other 2020 estimates are based on actual 2020 inventory collection efforts.  Thus, for those sectors, potential estimates related to the COVID-19 pandemic have not been estimated. A complete estimate of 2020 emissions based on data collection efforts will not be available until the release of the 2020 NEI in the spring of 2023.
Updated April 27, 2020
Updates since May 30, 2019
Updated file with the 2017 NEI.  Updated NOx & SO2 CAMD emissions for 2018 & 2019 for states available.  For states not available through CAMD the 2017 NEI emissions were used to fill in.  For Highway and Off-Highway, 2015 & 2016 values were calculated using the slope between 2014v2 and 2017 NEI where year specific model data were not available.  The year specific model data were 2015 onroad and 2015/2016 nonroad.  In addition, 2018 onroad emissions were included directly from the modeling files.  The 2023 mobile data were used to interpolate mobile emissions for 2018 & 2019.


Updated May 30, 2019
Updates since March 08, 2019
Updated NOx & SO2 CAMD emissions for 2017 and added 2018 for states available.  For states not available through CAMD the 2014 NEI emissions were used to fill in.  For Highway and Off-Highway, 2018 values were calculated using the slope between 2014v2 and the 2017 modeling file and 2015 and 2016 were updated using year specific modeling files.  

Updates since March 27, 2018
Found an error in the code which separates prescribed and wildfires from miscellaneous.  Corrected the code then recalculated prescribed/wildfires and miscellaneous for 2012-2014.  2015-2017 were updated with the new 2014 values.

Updates since December 19, 2016
Added 2014v2 and recalculated emissions for 2012 & 2013 emissions.  Updated 2015-2017 SO2 and NOx electric generating unit emissions to the most recent CAMD available data.  States with data not available from CAMD were pulled forward from 2014v2 NEI.  2015-2017 mobile emissions were calculated using interpolation between 2014v2 NEI and the 2016 modeling files.  The modeling files did not include data for locomotive, commercial marine vessels and aircrafts.  These emissions were pulled forward from the 2014v2 NEI and held constant for 2015-2017.

Notable changes from 2014v1 to 2014v2
1.  Fuel Comb Industrial - new state estimates, limited changes in ICI methodology and updated activity data resulted in changes to PM10, PM2.5, SO2 & VOC
2.  Fuel Comb Other - Limited changes to Residential Wood Combustion resulted in changes to CO, PM10, PM2.5, SO2 & VOC
3.  Petroleum & Related Industries - new estimates from some states and limited changes to Oil & Gas tool resulted in changes to CO, NOx and VOC
4.  Highway Vehicles - New inputs (representative counties, new fleet ages, proportions of alternate fuel vehicles, new VPOP) resulted in significant changes to CO, NOx and VOC
5.  Off-Highway - New rail computed, CMV port limited to water and several states updated activity data resulted in noticeable changes in CO, NOx and VOC
6.  Miscellaneous - New submittals, limited methodology changes in unpaved road dust, fertilizer EFs updated, reintroduced precip-adjustment based on v1, new livestock dust, livestock waste errors fixed.  These changes resulted in noticeable if not significant changes in CO, PM10, PM2.5, SO2, VOC & NH3.
For more detailed documentation on the 2014v2 NEI please refer to the Technical Support Document (TSD) located at: 
https://www.epa.gov/air-emissions-inventories/2014-national-emissions-inventory-nei-technical-support-document-tsd

Updates since February 27, 2014:
Updated 2011 NEI v1 with 2011 NEI v2.  2009 & 2010 non-mobile emissions recalculated as a result of the 2011 update.  Updated 2012, 2013 and 2014 SO2 and NOX electric generating units emissions to the most recent CAMD available data.

Updates since February 17, 2014:
Wildfires for 2002v3 were updated to accurately reflect the inventory published on http://www.epa.gov/ttn/chief/net/2002inventory.html#inventorydata
2003 and 2004 Miscellaneous has been recalculated to reflect the adjustments to the 2002 Wildfire emissions.  This in turn will effect the 2003 and 2004 total emissions.
Updates since December 4, 2013:
Added Puerto Rico, Virgin Islands and Tribal data back into the trend line.  These were discovered to be included in the data prior to 2002 and thus were added back into 2002-present.  These data were estimated using interpolation for interim years and held constant after 2011.
Puerto Rico, Virgin Islands and Tribal data were not present in the MOVES database or for NOx and SO2 CAMD replacements.  The added territories were taken from the NEI years and interpolated values and then appended to the other data sources used for updating.
2012 & 2013 Puerto Rico, Virgin Islands and Tribal data were held constant from the 2011 NEI for all pollutants and tiers.
2013 EGU NOx and SO2 emissions were updating using CAMD's final estimates.

Updates since June 6, 2013:  Now using NEI 2011 v1 at the Tier 1 level.
Onroad & Nonroad updates for 2007, 2009 and 2010 from MOVES.
2006 mobile emissions were recalculated using interpolation between 2005 MOVES data and 2007 MOVES.
2009 & 2010 non-mobile emissions were recalculated using interpolation between NEI 2008v3 and NEI 2011v1.
CEM data for 2013 is currently only available for the first three quarters of the year.  The percent change from the third to fourth quarters in 2012 were used to estimate the final quarter of 2013.  AK and HI CEM data are not provided from CAMD and are held constant from 2011.
Projected 2020 inventory for mobile emissions were used to calculate 2012 and 2013 onroad and nonroad estimates.
2012 and 2013 emissions for non-EGU and non-mobile are held constant from 2011.

Updates since June 12, 2012:  Now using NEI 2008 v3 at the Tier 1 level.
2006 and 2007 were recalculated using interpolation between NEI 2005 v2 and NEI 2008 v3.
2002 and 2005 MOVES data were used to update 2002-2007.  The change in model resulted in noticeable changes in highway emissions from 2001 to 2002 for various pollutants
2012 CEM annual data were used to update the previous estimate.
Updates since June 14, 2011:  Now using NEI 2008v2 at the Tier 1 level.  Adjusted "Open burning" SCCs in 2005 to be more in align with 2008 wildfires.
This update affects emissions for year 2006 and after.
The NEI 2005 v2 and the 2008 NEI v2 are applied to recalculate 2006 and 2007 as an interpolation between 2005v2 and 2008v2.
2009-2012 values were filled with 2008v2 emissions (flat lined) except where noted because presently there is no comprehensive projected inventory available for interpolation based off the NEI 2008v2 inventory.
EGU (electric generating utility) NOx and SO2 emissions for 2009-2011 were updated with continuous emissions monitoring (CEMs) data from the EPA's Acid Rain  Program (CAMD) emissions database.
CEM data for 2012 is currently only available for the first three quarters of the year.  The percent change from the third to fourth quarters in 2011 were used to estimate the final quarter of 2012.  Alaska and Hawaii CEM data are not provided from CAMD and are held constant from 2008.
Projected 2012 inventory data from the 2005-based modeling platform <http://www.epa.gov/ttn/chief/emch/index.html> was used to develop 2009-2012 estimates for the mobile source sectors rather than flat lining and the results were scaled to the 2008v2 emissions to maintain consistency with the flat-line approach for other sectors.  The 2009- 2012 onroad and nonroad data were scaled to the 2008 NEI V2 onroad and nonroad sector data at the state pollutant level  (and gas and diesel  vehicles for onroad). 
An adjustment was applied to the 2005 NEI unclassified  fire emissions to allocate and add those emissions to pre-existing estimate of prescribed fires and wildfires, and provides for a more reasonable exclusion of wildfires for 'anthropogenic only' emissions.
The same  operation was performed for nonroad mobile used NMIM (NONROAD) model results  for monthly-county-SCC, aggregated to state-annual to compute ratios.  The 2012 projected inventory was that used for the final US EPA Cross-State Air Pollution Rule and is a product of the 2005 based modeling platform <http://www.epa.gov/ttn/chief/emch/index.html> which supported the Final Transport Rule.  The purpose of the Final Transport Rule was to identify upwind states’ emissions that significantly contribute to downwind nonattainment or interfere with downwind maintenance of the 1997 and 2006 fine particle (PM2.5) National Ambient Air Quality Standard (NAAQS) and the 1997 ozone NAAQS.   The Cross-State Air Pollution Rule (CSAPR), requires states to significantly improve air quality by reducing power plant emissions that contribute to ozone and/or fine particle pollution in other states.

Emissions in 2008 decreased over 2005 for all pollutants except slight increases for NH3, PM10, and PM2.5. 
NH3: The increase in the miscellaneous category come from prescribed fires and primarily from waste disposal, the latter largely due to the addition of municipal/commercial composting emissions.
PM: The increases in the highway vehicle category are associated with the change to the MOVES estimation model, which has higher PM2.5 emissions than previous model MOBILE6 due to temperature impacts on PM2.5 included in MOVES and based on new emissions testing. The increases in the Miscellaneous category are related to increases in dust from agricultural tilling and livestock especially for PM10.  The apparent increase in PM2.5 from 2005 to 2008 is also related to a change in methods for computing PM2.5 emissions from paved roads.  Specifically, a new method for 2008 paved road emissions was based on truck vehicle miles tracking and road particulate testing in collaboration with industry group for a new emission factor that results in an increase for PM2.5 and decrease for PM10.  These increases offset decreases in other sectors.
While slight increases are observed  up to 2008, the decrease after 2008 may be in part due to our approach to flat-line several categories  in absence of a projection year  emissions inventory. 
For instance for NH3 the trend in emissions from agriculture activities has been upward.  The flatline of the agriculture emissions in the Miscellaneous category from 2008, and the decreases in the other sectors allow for an apparent decrease. 
A thorough discussion of the emissions differences for all pollutants and categories is included in the 2008 v2 release documentation, posted at <http://www.epa.gov/ttn/chief/net/2008neiv2/2008_neiv2_tsd_draft.pdf>. EQUATES methodology 2002–19; 2020–25 include interpolated/projected estimates. 2020, 2021, 2022, 2023, 2024, and 2025 are in the interpolated/projected period; the workbook methodology reproduced in the note identifies edition-specific assignments.
- Breaks: EQUATES methodology 2002–19; 2020–25 include interpolated/projected estimates. 2020, 2021, 2022, 2023, 2024, and 2025 are in the interpolated/projected period; the workbook methodology reproduced in the note identifies edition-specific assignments.
- Fetched: 2026-09-11T21:19:58.421Z

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
- Method and caveats: 12-month period ending December; global land/ocean anomaly against 1901–2000 or contiguous US precipitation total. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

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

## Atlantic named storms (namedStorms)

- Publisher: computed from NOAA NHC Atlantic HURDAT2
- Source: <https://www.nhc.noaa.gov/data/hurdat/hurdat2-1851-2025-02272026.txt>
- Unit: storms
- Coverage: 1851–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: Count each unique AL storm header once when peak track maximum sustained wind (field 7) is at least 34 knots; season from storm ID. Includes systems that reached 34 knots but were never named operationally (every pre-1950 storm, the 2005 unnamed subtropical storm, and Tropical Depression Twenty-Two of 2005 after reanalysis), so a season can exceed the named-storm count in NHC's summary: 2005 is 29 here against 28 there. Pre-1966 pre-satellite and pre-1944 pre-reconnaissance eras undercount storms.
- Breaks: Pre-1966 pre-satellite and pre-1944 pre-reconnaissance eras undercount storms.
- Fetched: 2026-09-11T21:29:37.756Z

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
- Method and caveats: 12-month period ending December; global land/ocean anomaly against 1901–2000 or contiguous US precipitation total. No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Breaks: No discrete break identified in Lane 4; publisher revisions may revise the full historical series.
- Fetched: 2026-09-11T21:19:58.421Z

## Proved crude oil reserves (provedOilReserves)

- Publisher: U.S. Energy Information Administration, crude oil proved reserves
- Source: <https://api.eia.gov/v2/petroleum/crd/pres/data/?frequency=annual&data%5B0%5D=value&facets%5Bseries%5D%5B%5D=RCRR01NUS_1&facets%5Bduoarea%5D%5B%5D=NUS&length=5000&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=asc>
- Unit: million barrels
- Coverage: 1899–2021
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: Series RCRR01NUS_1; national duoarea NUS; publisher annual observations through 2021. Original unit: MMBBL. Converted only by the declared unit scale. Two-year publication lag; Lane 4 series ends in 2021. Later observations are excluded by this dataset's specified coverage.
- Breaks: Two-year publication lag; Lane 4 series ends in 2021. Later observations are excluded by this dataset's specified coverage.
- Fetched: 2026-09-11T21:19:58.421Z

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
- Unit: mm, publisher reference
- Coverage: 1993–2024
- Annual rule: Calendar-year mean of subannual observations; at least ten observations required. The latest year is excluded until it meets the full-year coverage requirement.
- Method and caveats: Each published observation is the mean of the altimeter missions reporting on that date (TOPEX/Poseidon, Jason-1, Jason-2, Jason-3, Sentinel-6MF overlap at handovers); the annual value is the arithmetic mean of a calendar year's observations, 1993 onward; original reference baseline retained, no rebasing. Inter-mission offsets exist across satellite altimeter generations; the reference-series baseline is retained.
- Breaks: Inter-mission offsets exist across satellite altimeter generations; the reference-series baseline is retained.
- Fetched: 2026-09-11T21:27:18.413Z

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
- Method and caveats: VM-202 all-motor-vehicles total, million vehicle miles; years 1980–2023 from one workbook edition. Grand-total column identified uniquely by the 2023 sample of 3,246,817 (±1) and held fixed across years. 2007–09 HPMS resubmission is a break; specified coverage is 1980–2023.
- Breaks: 2007–09 HPMS resubmission is a break; specified coverage is 1980–2023.
- Fetched: 2026-09-11T21:19:58.421Z

## Wildfire acres burned (wildfireAcres)

- Publisher: National Interagency Fire Center
- Source: <https://www.nifc.gov/fire-information/statistics/wildfires>
- Unit: acres
- Coverage: 1983–2025
- Annual rule: Publisher annual calendar-year observation; incomplete current years excluded.
- Method and caveats: Annual wildfires table, Acres column; 1983–2025 only. Pre-1983 records are not comparable; series starts in 1983.
- Breaks: Pre-1983 records are not comparable; series starts in 1983.
- Fetched: 2026-09-11T21:19:58.421Z
