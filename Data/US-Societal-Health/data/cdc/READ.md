# Checked-in publisher files (browser-read)

cdc.gov returns HTTP 403 to every scripted fetch (curl, Bun fetch, any User-Agent). These files were read once through a real Chrome session on 2026-09-10 and checked in. `update.ts` reads them from here and refuses to run if a hash differs. Re-read them the same way when the publisher issues a new edition.

| File | URL | Read | SHA256 |
|---|---|---|---|
| hus2017-046.pdf | https://www.cdc.gov/nchs/data/hus/2017/046.pdf | 2026-09-10 | 0cd14450528938ca9d6437b9504cbf62f644eae1346a12e4615b48f97420bfee |
| db76.pdf | https://www.cdc.gov/nchs/data/databriefs/db76.pdf | 2026-09-10 | 7612cf2c2e96da89824b24237399bdb42ef2d6f477e441bfc0e132d9d29a9e07 |
| db283.pdf | https://www.cdc.gov/nchs/data/databriefs/db283.pdf | 2026-09-10 | 42b2848c5a68f4c7f756fadc812b17460de8cb5e2d69616503b2b7e562e900e3 |
| db377.pdf | https://www.cdc.gov/nchs/data/databriefs/db377-H.pdf | 2026-09-10 | 7582de2e56ca61e6137f14aec4bb4e47593e4aeadcc886c33cec1384846e61e7 |
| yrbs-dstr-2023.pdf | https://www.cdc.gov/yrbs/dstr/pdf/YRBS-2023-Data-Summary-Trend-Report.pdf | 2026-09-10 | a519f6a185ed0462733083e1af07dd299088de6e47e0ed0c9c78ced49c0effbf |
