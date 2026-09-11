# Cache recovery audit

Read 2026-09-10; no network requests. File names do not establish file formats.

- .cache/cv14.zip: HTML; title: Page not found | Bureau of Justice Statistics. Unusable as ZIP.

- .cache/cv15.zip: HTML; title: Page not found | Bureau of Justice Statistics. Unusable as ZIP.

- .cache/cv16.zip: HTML; title: Page not found | Bureau of Justice Statistics. Unusable as ZIP.

- .cache/cv17.zip: HTML; title: Page not found | Bureau of Justice Statistics. Unusable as ZIP.

- .cache/cv18.zip: HTML; title: Page not found | Bureau of Justice Statistics. Unusable as ZIP.

- .cache/cv19.zip: HTML; title: Page not found | Bureau of Justice Statistics. Unusable as ZIP.

- .cache/cv20.zip: HTML; title: Page not found | Bureau of Justice Statistics. Unusable as ZIP.

- .cache/cv21.zip: HTML; title: Page not found | Bureau of Justice Statistics. Unusable as ZIP.

- .cache/ji17st.zip: HTML; title: Page not found | Bureau of Justice Statistics. Unusable as ZIP.

- .cache/ji18st.zip: HTML; title: Page not found | Bureau of Justice Statistics. Unusable as ZIP.

- .cache/ji19st.zip: HTML; title: Page not found | Bureau of Justice Statistics. Unusable as ZIP.

- .cache/ji20st.zip: HTML; title: Page not found | Bureau of Justice Statistics. Unusable as ZIP.

- .cache/ji21st.zip: HTML; title: Page not found | Bureau of Justice Statistics. Unusable as ZIP.

- .cache/cpus16st.zip: HTML; title: Page not found | Bureau of Justice Statistics. Unusable as ZIP.

- .cache/cpus17st.zip: HTML; title: Page not found | Bureau of Justice Statistics. Unusable as ZIP.

- .cache/cpus18st.zip: HTML; title: Page not found | Bureau of Justice Statistics. Unusable as ZIP.

- .cache/cpus19st.zip: HTML; title: Page not found | Bureau of Justice Statistics. Unusable as ZIP.

- .cache/cpus20st.zip: HTML; title: Page not found | Bureau of Justice Statistics. Unusable as ZIP.

- .cache/cpus21st.zip: HTML; title: Log in | Bureau of Justice Statistics. Unusable as ZIP.

- .cache/cpus21_real.zip: HTML; title: Log in | Bureau of Justice Statistics. Unusable as ZIP.

Both 2021 files were re-tested with unzip; each exited 9, "End-of-central-directory signature not found." Neither is the real 2021 edition. Both are BJS login HTML. Text lengths 49686/49686; first differing character at offset 28748; differing request/page markup does not make either statistical data.

Rejected cpus22/cpus23 stitch: 2020: 2130 vs 2140; 2021: 2090 vs 2100; 2022: 2060 vs 2100. Use single 2023 edition (2003–2023), retaining its stated breaks.

IC3 2010.pdf is HTML, not PDF. pdftotext -layout exited 1: "Couldn't read xref table". No 2010 own-edition figure was recovered.

ji17st–ji21st unzip attempts each exited 9. ji22st Table 1 adds 2012=237; every 2013–2022 jail-rate overlap matches ji23st Table 1. Named exception is 12 points, not 11.

cv14–cv21 folders are empty because their ZIP files are error HTML. Do not claim the publisher never released property tables. cv13 and cv22–cv24 are the usable editions; every recent overlapping property-rate value matches.

cpus22st already contains readable revised tables. Re-extraction into its existing directory returned exit 50 (permission denied replacing files). Existing sealed tables were read; no permissions were changed.

GSS labels read directly from release-118 embedded label tables: FEAR 1=yes, 2=no; CAPPUN 1=favor, 2=oppose; COURTS 1=too harshly, 2=not harshly enough, 3=about right; OWNGUN 1=yes, 2=no, 3=refused. Exclude OWNGUN 3.
