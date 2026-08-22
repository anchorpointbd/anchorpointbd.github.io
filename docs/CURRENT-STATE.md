# Anchor Point Launch 2.5 — current state

Last reconciled: 2026-08-22 (Asia/Dhaka)

This file is the restart point when a chat is compacted, hidden, or opened on another device. It records the project state; it does not replace Git history or the decision log.

## Release candidate

- Repository: `anchorpointbd/anchorpointbd.github.io`
- Working branch: `launch-2.5-candidate`
- Deployed proof-layer head verified at reconciliation: `114ae9a4ec08690f0d737762310c95cb09961d10` (later documentation-only continuity commits may advance the branch)
- Review path: draft pull request #2 into `development`
- Merge status after the continuity commits: open and draft; not merged. The connector currently reports `mergeable: false`, so the candidate must receive a conflict/base review before any merge approval.
- Cloudflare Pages preview: `https://anchor-point-launch-25-preview.pages.dev/`
- Production and `main`: intentionally untouched pending explicit owner approval
- Important local-state note: GitHub connector commits advanced the remote candidate without advancing the local `.git` pointer. The candidate files in this workspace match the newer work; do not reset or discard them merely because local Git reports modifications/untracked files.

## Institutional direction

Anchor Point is presented as a problem-first engineering institution: **Engineering at Ease**. Its operating sequence is **Understand → Diagnose → Explore → Decide → Deliver**. The public promise is disciplined reasoning with alternatives, consequences and escape routes—not a founder biography and not unsupported claims of authority.

The visual and editorial character is premium but approachable: deep navy, sapphire depth, luminous restrained gold, ivory editorial space, Renaissance curiosity, energetic interaction and easy conversation entry. Leonardo da Vinci is used as an intellectual metaphor for observation and connected disciplines, not as borrowed endorsement or copied artwork.

Ambition may be stated as future intent—to help reshape engineering practice and contribute to serious institutional planning—but must never imply existing government mandate, budget authority, client history, certifications or outcomes that cannot be evidenced.

## Final logo record

- Owner source: `C:\Users\Sabbir\Downloads\Development Website\Logo_Final.svg`
- Source SHA-256: `7D1CE4B3A8E43C6688738C6CA702059548F609DBC2604AD349D036BDA9290D31`
- Exact artwork-geometry SHA-256 shared by the source, `assets/logo-anchor-point.svg`, and `assets/logo-emblem.svg`: `12B7D3BE70C356ABF7CA9F4D05D511E1E586ADDE5FCAF9D4834A3393DB3CA390`
- The different whole-file hashes are expected: the web files crop the A4 source canvas and add accessibility metadata. They do not redraw or substitute the artwork.
- Brand colors: main gold `#C49E5D`, deep gold `#89652F`, emblem stroke `#977137`, Anchor Navy `#0B1F3A`; no applied gradient.
- The wordmark and tagline are paths. Preserve their deliberately human character rather than forcing sterile symmetry.

## Implemented public proof layer

- Homepage proof gateway and transparent claim language
- `evidence.html`: three explicitly constructed demonstrations, five sample-output structures, engagement path and capability boundary
- `trust.html`: provider/data map, public/private boundary, security posture and due-diligence gaps
- Engineering Hub: 12 formula-visible tools across everyday, field, student, project, commercial and finance roles; four explainers; legitimate-resource search
- AI Theory Assistant: visible beta/availability caveat, public-question confirmation, privacy warning and graceful unavailable state
- Invitation acceptance, password creation, TOTP enrollment/verification and AAL2 Vault gate
- SEO/social metadata, favicon assets, sitemap, robots, privacy, terms, disclaimers and responsive mobile action dock
- Documentation: audit, operations, proof layer, public-launch readiness, asset provenance and central decision log

## Service and security map

| Layer | Service | Current boundary |
|---|---|---|
| Source/review | GitHub | Candidate branch and draft PR; deployed frontend must be treated as publicly inspectable even if repository visibility changes. |
| Public preview | Cloudflare Pages | Preview URL is HTTPS and safe for authentication redirects; production remains unapproved. |
| Email | Zoho | Institutional mail; SPF/DKIM/DMARC remain operational DNS/account tasks, independent of the website code. |
| Contact intake | Formspree/explicit contact routes | Public enquiries only; no confidential attachments or Vault material. Confirm final routing before launch. |
| Backend | Supabase Free | Auth, Postgres, private Storage, RLS and Edge Functions. Browser code contains only the project URL and publishable key; service-role access stays server-side. |
| AI routing | OpenRouter via Supabase Edge Function | Secret stored in Supabase, never in the browser. Free routes only, no paid fallback, theory-only input, five questions per hashed client/rolling day. |
| Private workspace | Anchor Point Vault | Two-staff initial scope; TOTP/AAL2 and RLS required. Private records/assets must never be indexed publicly or sent to OpenRouter. |

Repository secret scan at reconciliation found no OpenRouter secret, service-role literal, JWT-like secret or private-key block. The Supabase publishable key is intentionally public and is not an administrative secret; RLS remains the real control.

## AI operational truth

The original exposed OpenRouter key was reported revoked. The replacement was reported saved in Supabase Secrets and the Edge Function redeployed. The function requests `openrouter/free`, denies providers marked as collecting request data, allows privacy-compatible free fallbacks, and logs only upstream status/error code.

This is not a contractual zero-retention guarantee. OpenRouter account training/data-use must remain disabled; visitors must not enter names, drawings, measurements, client information, project facts or Vault content. Strict ZDR previously produced no usable free route. A successful end-to-end response and OpenRouter activity should therefore be deliberately re-tested before launch; do not claim the AI is operational until that test passes.

## Recovered review verdict

The simulated 17-perspective review used six fixed points: capture, relevance, credibility, utility, risk comfort and likely action. Its durable verdict was:

> Love at first sight: achieved. Trust sufficient for procurement: not achieved.

The common gap was evidence, not visual ambition. Students and field staff wanted deeper recurring utility; senior engineers and institutional visitors wanted accountable capability proof, sector competence, governance and procurement readiness. That review produced the proof layer above. See `docs/PERSONA-REVIEW-2026-08-22.md`.

## Verified checks and open gates

Verified during the proof-layer pass: JavaScript syntax, internal page HTTP responses, 12/12 calculator presence, 390 px mobile overflow check, headings/IDs/labels/alt text, and successful Cloudflare deployment of the remote candidate head.

Still required before public launch:

1. Owner confirmation of legal name, registration/status, address, contact recipients, privacy controller details and any capability/credential facts.
2. Authorized evidence: anonymized or named experience, sample deliverables, bios/credentials and sector boundaries—or an explicit decision to launch transparently without them.
3. End-to-end staff invitation, TOTP, AAL2, RLS and private Storage tests with both intended staff accounts.
4. End-to-end AI test using a harmless public theory question; confirm OpenRouter activity, refusal/privacy behavior, rate limit and unavailable state.
5. Final contact-form destination, spam handling and retention test.
6. Accessibility, device/browser, performance and security review against the final deployed commit.
7. Owner review and explicit approval before merging/deploying production or changing DNS.

## Next safe action

Open the Cloudflare candidate on desktop and a physical phone, review the proof layer and Hub, then run the Supabase/OpenRouter end-to-end test. Record every objection as an evidence, usability, policy or factual-content issue rather than silently changing the institutional promise.

Sixty questions established discovery. The six hundred questions that follow can give Anchor Point institutional depth—provided each answer becomes evidence, policy, or a reversible decision rather than disappearing inside chat history.

