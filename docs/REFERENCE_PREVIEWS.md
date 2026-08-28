# Reference previews

Cloudflare Pages project: `anchor-point-launch-25-preview`. Checked 2026-08-28 against account deployment data.

Cloudflare documents unlimited active preview deployments. The Free plan limits builds to 500 per month and one concurrent build; deleting an old deployment does not refund a completed build. For this project, cleanup is therefore a documentation exercise, not quota recovery.

| Preview | Commit / branch | Role | Recommendation |
|---|---|---|---|
| `launch-3-0-candidate.anchor-point-launch-25-preview.pages.dev` | `f6cbb40` / `launch-3.0-candidate` | Content and institutional-history source | **KEEP** |
| `review-global-page-system-20.anchor-point-launch-25-preview.pages.dev` | `b37d552` / `review/global-page-system-20260828` | Locked homepage plus shared secondary-page baseline | **KEEP** |
| `homepage-v30-continuity-refi.anchor-point-launch-25-preview.pages.dev` | `4ff5b15` / `homepage-v30-continuity-refine-20260827` | Intermediate continuity correction | OPTIONAL |
| `homepage-v30-pdf43-refine-20.anchor-point-launch-25-preview.pages.dev` | `e4a5617` / `homepage-v30-pdf43-refine-20260828` | 43-point review checkpoint | **KEEP** |
| `review-homepage-acceptance-2.anchor-point-launch-25-preview.pages.dev` | `b05933f` / `review/homepage-acceptance-20260828` | Accepted rollback donor/reference A | **KEEP** |
| `homepage-strict-rollback-202.anchor-point-launch-25-preview.pages.dev` | `fa4dd1a` / `homepage-strict-rollback-20260828` | Strict rollback/reference B | OPTIONAL |
| `homepage-final-locked-micro.anchor-point-launch-25-preview.pages.dev` | `1497c84` / `homepage-final-locked-micro-20260828` | Final locked visual state | **KEEP** |
| `homepage-freeze-global-patte.anchor-point-launch-25-preview.pages.dev` | `2d1235d` / `homepage-freeze-global-pattern-20260828` | Acceptance/documentation checkpoint | **KEEP** |

## Minimal notebook set

Keep four links: Launch 3.0 Candidate (content), PDF43 Refine (major visual-review checkpoint), Homepage Final Locked Micro (final visual), and Review Global Page System (Milestone 2 starting context). Keep Homepage Acceptance 2 only while rollback provenance remains useful. The continuity-refine and strict-rollback links are safe to drop from the personal notebook, but the Cloudflare deployments themselves should remain because their presence does not reduce preview capacity.

No prioritized deployment was deleted during the Milestone 1 cleanup.

