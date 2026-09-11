# Checked-in publisher files (browser-read)

cdc.gov returns HTTP 403 to every scripted fetch (curl, Bun fetch, any User-Agent). These files were read once through a real Chrome session on 2026-09-10 and checked in. `update.ts` reads them from here and refuses to run if a hash differs. Re-read them the same way when the publisher issues a new edition.

| File | URL | Read | SHA256 |
|---|---|---|---|
| nvsr51_01.pdf | https://www.cdc.gov/nchs/data/nvsr/nvsr51/nvsr51_01.pdf | 2026-09-10 | 44f6a9fc51fe8320219ea95364746fb43c2005d4e85da2cb54ba1df25c09db80 |
| db232.pdf | https://www.cdc.gov/nchs/data/databriefs/db232.pdf | 2026-09-10 | 78ad32dbc8792c787c9cbf645ccf1065728b23c45204544ab2a10faa355839f2 |
| nvsr74-09.pdf | https://www.cdc.gov/nchs/data/nvsr/nvsr74/nvsr74-09.pdf | 2026-09-10 | 8077de26f2b28fe6ec040594d3b8b31736924e90f86d2168ee6b37b1a2aaa1e2 |
| nvsr75-02.pdf | https://www.cdc.gov/nchs/data/nvsr/nvsr75/nvsr75-02.pdf | 2026-09-10 | f43f8d957dec2b972d2cd2e235ff88cc8cfe03d2e09f38458867aaf077991696 |
