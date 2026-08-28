## Milestone 2 correction delta (2026-08-29)

- Guided-story labels are locked as Home `Why It Matters`, About `Who They Are`, Services `What They Do`, and Method `How They Work`.
- Optional chapter bridges exist only for About → Services and Services → Method. They use native links, next-page prefetch and cross-document view transitions with reduced-motion fallback. Home has no continuation trigger.
- About origin copy now bridges directly from the capability/opportunity gap. Its former Horizon duplicate is replaced by the proof-gated `How We Grow` maturity ladder: Prove → Build → Connect → Scale.
- Services owns the full client-facing journey and the seven-step illustrative pump-underperformance demonstration. Its five service families use the reference pattern: when it helps, what we do, what you get, typical first step and practical examples.
- Method no longer repeats the Services decision journey or client examples. It now deepens the five stages by what each protects, adds five reasoning quality-control checks, and separates verified, supplied, assumed and missing evidence.
- Duplication ownership: Home owns ambition and the five-stage preview; About owns institutional role/current evidence/proof-gated growth; Services owns commercial scope and the end-to-end engagement; Method owns evidence, assumptions, reasoning QC, governance and traceability.
- Homepage files were not changed in this correction delta. Production, `main` and DNS remain untouched.

## Milestone 2 implementation brief pass (2026-08-29)

- Review branch: `review/m2-implementation-20260829`, continuing from the prior Milestone 2 architecture branch.
- Homepage scope is limited to the authorized `A different starting point` eyebrow wording and its restrained gold/white treatment. The current locked baseline contains no calculator/browser screenshot assets in homepage HTML, so no unrelated ecosystem link or count was removed.
- About, Services and Method retain eight chapters each, now use simpler visitor-facing labels and explanatory copy, and include practical examples at the points where decisions, outputs and boundaries are introduced.
- About continues to Services after its footer; Services continues to Method; Method closes with `There is always room for a better question.` Standard navigation and browser history remain intact.
- Desktop 1440 × 1000 and mobile 390 × 844 checks passed with no horizontal overflow, no browser warnings/errors, two-font output, accessible contact requirements and no WhatsApp text.
- Production, `main` and DNS remain untouched pending visual review.

# Anchor Point Launch 3.0 — current state

## Milestone 2 content/story architecture review (2026-08-28)

- Review branch: `review/m2-content-architecture-20260828`, based on `milestone-1-homepage-locked`.
- Homepage files and output remain unchanged. The existing homepage Method destination `evidence.html#method` is preserved and routed by the Services page to the new dedicated `method.html`.
- About, Services and Method now each use eight visible story chapters with the shared homepage identity, navigation, CTA, segmented progress, utility bar, back-to-top, footer, deep → light → deep journey, restrained reveal motion and reduced-motion behavior.
- About is institutional/documentary; Services is analytical; Method is technical/process-oriented. Claims remain early-stage and evidence-separated.
- Each page closes with the light shared response form: name, email or telephone, short context, consent, optional organization/role and optional visiting-card upload. Email remains the non-form alternative; WhatsApp is absent.
- Production, `main`, DNS and the locked homepage remain untouched pending visual review.

## Milestone 1 archive and freeze (2026-08-28)

- **Milestone 1 — Homepage Locked is complete.** Forward branch: `milestone-1-homepage-locked` from `b37d552`; accepted homepage record: `2d1235d`; final visual commit: `1497c84`.
- Homepage status: **LOCKED / LAUNCH-READY / IMMUTABLE WITHOUT EXPLICIT OWNER CONFIRMATION**.
- Cloudflare prioritized previews were mapped and preserved. Old previews do not consume a finite active-preview allowance, so none were deleted for appearance.
- Historical founder-origin source was recovered at `dffb135:founder.html` and is private recovery material, not approved public copy.
- Canonical closeout records: `docs/MILESTONES.md`, `docs/HOMEPAGE_LOCKED_SPEC.md`, `docs/REFERENCE_PREVIEWS.md`, `docs/RECOVERY_GUIDE.md`, and `docs/internal/ANCHOR_POINT_RECOVERY_STONE.md`.
- Next scope only: About + Services + Method review leading to **Milestone 2 — Website Locked**. No redesign begins in this pass.

## Full-site visual-system propagation (2026-08-28)

- Homepage master visual contract: **FINAL / LOCKED / LAUNCH-READY**. This pass changes no homepage file or visual treatment.
- Shared page sequence: **DEEP → LIGHT → DEEP**, with explicit tonal zones driving the scroll-responsive navigation state.
- Global logo/navigation, page-header hierarchy, one-emblem gold CTA, one segmented progress indicator, transparent canvas, bottom utility bar, footer, back-to-top and existing responsive/accessibility behavior are locked shared standards.
- Cards/boxes are no longer the default secondary-page language. Editorial groups use transparent surfaces, whitespace and fine dividers; functional calculators, forms and authentication panels retain restrained containment where necessary.
- Milestones: Homepage visual system **COMPLETE / LOCKED**; homepage launch readiness **COMPLETE**; shared design-system propagation **COMPLETE after review QA**; secondary page-by-page screenshot/PDF review **NEXT**.
- Production and `main` remain untouched. Review occurs on a dedicated branch and Cloudflare preview.

## Homepage production launch (2026-08-28)

- Homepage status: **LAUNCHED / ACCEPTED**.
- Approved release source: `homepage-freeze-global-pattern-20260828` at commit `31025a9` plus this release-status record.
- Final launch correction: the existing Examples utility control uses the same active-state handler and unchanged visual effect as Ecosystem and Ask Anchor Point for pointer, keyboard focus, click/tap and reduced-motion behavior.
- No other homepage visual, content, layout, typography, spacing, color, background, animation or interaction was changed for the production launch pass.

## Homepage freeze and shared-pattern propagation (2026-08-28)

- Review branch: `homepage-freeze-global-pattern-20260828`, based exactly on accepted homepage commit `1497c84`.
- Homepage visual acceptance: **COMPLETE / FROZEN**. The only homepage changes in this pass are the approved concise Curiosity lower-right copy and identical pointer/focus/click activation for the existing Examples utility control.
- Shared global component standard: **READY FOR PROPAGATION**. `docs/SHARED-PAGE-PATTERN.md`, `shared-page.css` and `shared-page.js` define the reusable secondary-page presentation contract.
- Shared presentation was applied without content redesign to How We Work, Founder, Ecosystem, Conversion Desk, Scientific Calculator, Idea Graveyard, Release Pad, Privacy, Terms, Information Care and Staff Vault.
- Browser QA at 1440 × 1000 and 390 × 844 confirmed the Curiosity copy renders in three desktop lines, its CTA geometry is unchanged, the three utility states share one interaction path, all propagated pages load without console errors, and no shared layer changes page-specific headings or content order.
- Next phase: **page-by-page refinement of secondary pages**. Their content architecture and meaning remain unchanged until individually reviewed.
- Production, `main` and DNS remain untouched.

## Final locked homepage micro-correction pass (2026-08-28)

- Review branch: `homepage-final-locked-micro-20260828`, based on Reference B at `fa4dd1a`.
- Homepage changes are limited to four owner-requested corrections: stronger Your Situation dash/tag color, a 22% feathered Curiosity reading veil, restored AP emblem plus a quiet same-emblem watermark in the existing ecosystem center circle, and a restrained accessible utility-bar selection effect.
- Desktop and 390 px checks confirm six orbiting destinations, unchanged Curiosity/button geometry, unchanged center-circle dimensions, no horizontal overflow, and reduced-motion support.
- Production, `main`, DNS, secondary pages and all other Reference B treatments remain untouched.

## Strict homepage rollback review (2026-08-28)

- Review branch: `homepage-strict-rollback-20260828`, based on the latest rollback review at `5a3fe24`.
- Hero + Your Situation and the complete lower sequence were restored from accepted reference-A commit `b05933f`, including Horizon, contact, the six live ecosystem destinations and accepted orbit motion.
- A Small Demonstration remains locked. Curiosity retains its accepted artwork and composition; only a feathered 12% local reading veil was added behind the lower-right copy.
- Production, `main`, DNS and secondary pages remain untouched.

## Homepage final micro-polish (2026-08-28)

- Review branch: `homepage-micropolish-20260828`, based on `homepage-focus-20260828` at `4181a6d`.
- Scope remained limited to owner-review items 8, 10, 23 and 32: the hero/Your Situation background layers now overlap without moving their copy; the demonstration decision flow has stronger local contrast; Curiosity uses a transparent split composition in upper-left/lower-right negative space; and the ecosystem watermark, center-label overlap and utility-bar selection state are resolved.
- Desktop and 390 px mobile verification confirmed one progress indicator, no horizontal overflow, no center-label collision and no browser errors.
- Production, `main`, DNS and previously accepted homepage work remain untouched.

## Focused homepage acceptance pass (2026-08-28)

- Review branch: `homepage-focus-20260828`, based on `homepage-v30-pdf43-refine-20260828` at `e4a5617`.
- Scope is limited to the reopened owner-review items; previously accepted logo, header, heading, navigation, contact and ecosystem behavior remains locked.
- Homepage now uses one shared gold CTA treatment, one segmented progress control, a longer hero-to-light bridge, one continuous light middle field, full-canvas Curiosity artwork, restored Horizon construction, and a controlled return to deep at the ecosystem.
- Production, `main`, DNS and the existing preview branches remain untouched.

## Corrected homepage v3.5 review (2026-08-27)

- Active branch: `review/homepage-v3.0-corrected-2026-08-27`, created directly from remote `launch-3.0-candidate` at `f6cbb406c8846947803792570bcf783354d3e8d2`.
- Launch 3.0 is the architectural and visual source. The six-month/v3.2 branch is a donor only for the requested small demonstration, clearer invitation language and active gold navigation cue.
- Homepage journey is `YOU → PROBLEM → AP THINKING → OUTCOME`; deeper principles, engagement detail, process exposition and accountability material are removed from the homepage.
- Production, `main`, DNS and the existing v3.2 preview remain untouched.

Last reconciled: 2026-08-22 (Asia/Dhaka)

This file is the restart point when a chat is compacted, hidden, or opened on another device. It records the project state; it does not replace Git history or the decision log.

## Release candidate

- Repository: `anchorpointbd/anchorpointbd.github.io`
- Frozen predecessor: `launch-2.5-candidate` at remote commit `b03a25448871147863bc4b7544152705747c2e09`
- Working branch: `launch-3.0-candidate`, created from that exact predecessor commit
- Deployed proof-layer head verified at reconciliation: `114ae9a4ec08690f0d737762310c95cb09961d10` (later documentation-only continuity commits may advance the branch)
- Review path: draft pull request #2 into `development`
- Merge status after the continuity commits: open and draft; not merged. The connector currently reports `mergeable: false`, so the candidate must receive a conflict/base review before any merge approval.
- Cloudflare Pages preview: `https://anchor-point-launch-25-preview.pages.dev/`
- Production and `main`: intentionally untouched pending explicit owner approval
- Important local-state note: GitHub connector commits advanced the remote candidate without advancing the local `.git` pointer. The candidate files in this workspace match the newer work; do not reset or discard them merely because local Git reports modifications/untracked files.

## Institutional direction

Anchor Point is presented as a problem-first engineering institution: **Engineering at Ease**. Its operating sequence is **Understand → Diagnose → Explore → Decide → Deliver**. The public promise is disciplined reasoning with alternatives, consequences and escape routes—not a founder biography and not unsupported claims of authority.

Launch 3.0 adds **Anchored in Excellence** as the institutional tagline and turns the Engineering Hub into the entry point for a connected, recurring-use knowledge ecosystem. The information architecture uses a familiar faculty → department → pathway progression without representing Anchor Point as a university. Engineering is deep first; business, finance, law and human systems begin as limited foundations.

Third-party knowledge remains with original publishers. Anchor Point links, classifies and explains; it does not copy or re-host university repositories, standards, papers or proprietary calculators. See `docs/LAUNCH-3-OWNER-BRIEF.md` for the durable product scope, mobile direction, Idea Graveyard boundaries, private-release evaluation and image-approval rule.

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

### Visitor-language refinement (2026-08-22)

- Evidence is now presented publicly as **How We Work**; Trust is presented as **Information Care**.
- Unexplained labels such as `ANCHOR SIGNAL / 001`, `DEMO / MARINE 01` and `AP / SERVICE 01` were replaced with meaningful visitor language.
- The Renaissance painting was replaced with original white/ivory technical linework; the exact master emblem now appears as restrained watermark/action/motion geometry.
- Motion timings were shortened and mobile overflow rechecked at 390 px.
- The Theory Assistant retains live OpenRouter Free routing, but capacity failures now fall back to clearly labelled reviewed notes for voltage drop, welding heat input, payback/NPV and NPSH. The fallback is not represented as AI.

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

### Launch 3.0 foundation implemented (2026-08-22)

- The Hub now opens as an ecosystem: five growing faculties, seven engineering departments and six task pathways. Engineering is the deep starting faculty; Projects and Business, Finance and Economics, Law and Governance, and Human Systems and Arts are intentionally light foundations.
- Four desks separate different intentions: Scientific Calculator, Conversion Desk, Engineering Calculators, and Knowledge and Sources.
- The new conversion engine contains 26 quantities and 816 directed unit-pair routes, sorted by sector. It displays reference units, factors, formula and substitution; impossible temperatures below absolute zero are rejected.
- The scientific desk uses a local expression parser rather than dynamic code execution. It supports constants, functions, degree/radian/gradian modes, precision control and in-page history.
- Bangladesh university-library pathways now include BUET, MIST, CUET, KUET, RUET and DUET, linking to their own authoritative systems rather than copying their collections.
- Idea Graveyard and Release Pad exist as `noindex`, local-only concept workbenches. Neither stores, transmits, scores or turns a disclosure into a lead. Public submission remains closed pending approved ownership, privacy, moderation, deletion and escalation rules.
- Information Care is out of the ordinary visitor journey. The old page is retained for recoverability but marked `noindex`; the compact Privacy and Terms pages remain in the footer.
- No image was generated or added during this Launch 3.0 pass.

### Owner-review polish implemented (2026-08-23)

- The homepage now answers the commercial question in the first screen: Anchor Point supports engineering, project, procurement and institutional decisions from early ideas through troubled operations.
- The opening promise is now “See the real problem. Choose the next move.” It replaces the narrow pre-project framing, Bangladesh-first hero label and technically inaccurate “reversible decisions” language.
- The emblem is freed from the decorative diamond and given greater scale. Gold actions now use a high-contrast navy emblem and clear arrow endpoint; large section watermarks remain restrained.
- The duplicated moving process ticker is replaced by a useful project-lifecycle strip. The five-step method uses direct questions, and the main warning is elevated as an editorial pull-quote.
- Permanent principles use plain language and explain the practical benefit to future teams.
- The service console now presents four concrete engagement paths with a trigger situation, what Anchor Point does, what the client receives and a typical first step.
- Renaissance influence remains through technical linework, connection and curiosity, while the prominent quotation, repeated name and joke are removed.
- How We Work retains all three demonstrations but presents one full flagship walkthrough and two optional expandable examples.
- Hub language introduces faculties as familiar knowledge areas, mobile filters wrap visibly, and AI is labelled as an experimental theory companion rather than a headline capability.
- The vision now states a credible sequence: now, next and ten-year horizon. Bangladesh remains the operating root without limiting the opening impression.
- No image was generated, replaced or commissioned during this refinement.

### Startup accountability correction (2026-08-23)

- The homepage now states the current stage directly instead of implying a mature anonymous team: early-stage, founder-led and Dhaka-based, with assignment-specific people, competence, registrations, conflicts and delivery responsibility to be verified before commitment.
- The brand hierarchy is explicit: **Anchored in Excellence** is the standard; **Engineering at Ease** is the experience being built; the homepage proposition remains “See the real problem. Choose the next move.”
- Existing product proof is surfaced as four working desks, 26 conversion quantities, 816 directed unit routes and six Bangladesh library paths. These are inspectable product facts, not client or adoption claims.
- The four service tabs now expose ARIA tab/tabpanel roles, selected state and keyboard navigation. Mobile footer/contact clearance is reserved beneath the fixed action dock.
- Homepage title, description, Open Graph and Twitter metadata now describe the actual engineering/project/procurement proposition consistently.
- No contact form was added because the archived Formspree destination, recipient, retention, spam controls and deletion process are not approved launch facts.
- No image was generated, edited or added in this correction.

### Ecosystem proof composition (2026-08-23)

- The homepage Ecosystem section now shows three real candidate captures rather than an imagined product: Scientific Desk, Conversion Desk and Hydraulic Pump Power calculator.
- The shown outputs are reproducible from the working candidate and remain accompanied by verification boundaries. The composition is product proof, not evidence of clients, adoption or professional approval.
- No generative image model was used; the captures were taken from the actual local interfaces after exercising their real controls.

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

### Constructed Decision Anatomy (2026-08-24)

- The generic flagship vessel example on How We Work was replaced by an anonymized constructed demonstration: **When the calculation began defending the decision**.
- The sequence shows an early equipment choice, developed-load pressure, a first correction, a phase-compatibility conflict, system reframing and the controls required to make assumptions inspectable.
- The public story does not identify the owner, employer, client, vessel, suppliers, classification society, dates, values or outcome. It does not claim the underlying historical project as an Anchor Point credential.
- The story explicitly warns that a mathematically correct calculation can mislead when assumptions are selected to protect a committed decision.
- Founder-page work remains separate and was not started or inferred from an unfinished owner script.

### Founder origin, contact intake and 50-calculator expansion (2026-08-24)

- Added `founder.html` with the opening line **From a napkin sketch to a future worth building**. The page converts the owner’s early-career frustration into an institution-building purpose without publishing family details or presenting an informal professional network as an appointed team.
- Restored the owner’s existing Formspree endpoint `meajewyn` for a minimal callback form delivered to `info@anchorpoint.com.bd`. Removed the public WhatsApp route and did not add visiting-card upload.
- Contact collection is limited to name, required email, optional organization/role/telephone, preferred contact method and a short non-confidential message. Anchor Point owns deletion from Formspree and the institutional mailbox; routine non-engagement enquiries have a documented 90-day post-response deletion period.
- Added a data-driven library of 50 screening calculators across Civil, Mechanical, Marine, Electrical, Energy, Computing and Materials. Every card exposes its formula and the same verification boundary.
- Removed the homepage screenshot composition. The Ecosystem is now represented by a code-native seven-discipline map with restrained motion and no generated imagery.
- Production remains untouched. Founder identity, credentials and biography remain pending separately approved facts.

