# Development branch audit

| Item | Classification | Reason/action |
|---|---|---|
| `index.html`, `style.css`, `main.js` | REFACTOR | Public baseline retained conceptually; rewritten for valid JS, claims, IA and brand consistency. |
| `Logo_test.svg` | KEEP pending rename | Best available logo; owner must confirm it is the master. |
| `404.html`, `CNAME`, `robots.txt`, `sitemap.xml` | REFACTOR | Preserve hosting; update discovery for new public pages. |
| `test index_scrap.html`, `original css_scrap.html`, `chapter 16_scrap.html`, `Test Code Previous` | ARCHIVE | Historical experiments do not belong in deploy root; history remains in Git. |
| Contact form/analytics claims | MOVE/DECIDE | Previous third-party form and analytics need privacy/account review before reactivation. |

Key faults: malformed JavaScript block; duplicated chapter CSS; inconsistent blue/gold system; broken `logo.svg` preload; unsupported marketing counters; SVG-only social card; no legal/privacy boundaries; no Hub/Vault; scrap artifacts deployed publicly.


