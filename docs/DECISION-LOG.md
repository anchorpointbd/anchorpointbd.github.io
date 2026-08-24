# Central decision log

## D-001 — Launch 2.5 architecture (2026-08-21)

- Predominant question: How can two staff operate a useful private Vault at near-zero cost without weakening the public site?
- Decision: Keep the public site static on GitHub Pages; use one Supabase project for private Postgres, Auth, Storage and RLS; add AI only behind a server-side function.
- Alternatives: Firebase (strong free ecosystem, weaker relational/portable records); Cloudflare D1/R2/Workers (excellent edge economics, more auth/integration work); custom VPS (control, but operational burden); client-only storage (rejected: not private or auditable).
- Consequences: Fast setup and SQL portability; free projects can pause, have no automatic backups, and cap database/storage/egress.
- Escape route: Export Postgres with `pg_dump`, download Storage objects plus manifest, and move the static frontend unchanged. Auth users require a planned migration/reset flow.
- Safety: RLS on every private table; private bucket; no public sign-up; no service-role or AI key in browser code.

## D-002 — AI theory assistant

- Decision: Ship the policy and disabled interface; enable only after a server proxy, rate limit, provider/data review, citations, and refusal tests exist.
- Reason: A browser key would be exposed, and free-model availability is not a reliability or safety guarantee.

## D-003 — Content claims

- Decision: Remove unverifiable project/partner/experience counters. Use institutional, problem-first language and no founder-centric biography.

## D-004 — Free service selection (2026-08-21)

- Decision: Use Supabase Free for Auth, Postgres, Storage and the Edge Function; use OpenRouter Free via `openrouter/free` for theory explanations.
- Cost guardrail: five assistant questions per hashed client per rolling day, no automatic paid fallback, and a clear unavailable state when free capacity is exhausted.
- Privacy: the Edge Function hashes a coarse client signal for rate limiting; it stores only the hash, timestamp and returned model identifier. Prompts are sent to OpenRouter and the routed model provider, so confidential/project data is prohibited.
- Escape route: replace the provider call inside the Edge Function without changing the public UI; export standard Postgres and Storage data when leaving Supabase.

## D-005 — Institutional experience direction (2026-08-21)

- Predominant question: How should the public site make visitors feel Anchor Point's ambition before asking them to understand its services?
- Decision: Lead with a provocative problem-first signal, then permanent principles, an interactive service console, recurring-use tools, the ten-year institutional horizon, and a frictionless conversation invitation.
- Visual language: royal midnight and sapphire depth, luminous gold actions, ivory editorial space, framed emblem, restrained kinetic movement, and a persistent mobile action dock.
- Guardrail: ambition must remain accountable. The site may describe the intended horizon, but must not imply existing governmental authority, budget control, project history, or institutional mandates that cannot be evidenced.

## D-006 — Final logo and secure onboarding (2026-08-21)

- Logo: Preserve the supplied final SVG as the source artwork; publish cropped master-lockup and emblem variants because the source uses an A4 canvas that makes direct web placement appear undersized.
- Authentication: Invitation acceptance creates a password, then enrolls and verifies TOTP. Returning staff must reach AAL2 before the Vault interface or private RLS policies permit access.
- Recovery: The original file remains unchanged outside the repository; each integration change is a reversible candidate-branch commit.

## D-007 — Strict AI privacy routing (2026-08-21)

- Decision: Keep OpenRouter free-endpoint training disabled and require Zero Data Retention in the Edge Function request.
- Consequence: The assistant may be unavailable when no free ZDR-compatible provider is available.
- Guardrail: Availability failure is preferable to silently routing a visitor's question through a retaining provider. Confidential and project-specific data remain prohibited.


## D-008 — Operational AI privacy boundary (2026-08-21)

- Evidence: the deployed function was reachable, but the free router returned no usable ZDR route and OpenRouter showed no successful activity.
- Decision: keep OpenRouter account training/input-output use disabled and require `provider.data_collection='deny'` with free fallbacks. Reserve the assistant for public, non-confidential theory questions; Vault/project data never goes to the AI.
- Consequence: this permits more free endpoints than strict ZDR while excluding providers OpenRouter marks as collecting prompt data. It is not a contractual zero-retention guarantee, so the UI and policy prohibit names, drawings, measurements, client data and other project-specific inputs.
- Escape route: restore strict `zdr:true` when a compatible free endpoint is available, or move to a paid ZDR-capable provider without changing the public UI.
- Diagnostics: log only upstream HTTP status and error code in Supabase; never log prompts, responses, keys or visitor identity.

## D-009 — Public proof layer (2026-08-22)

- Predominant question: How can the public site earn serious institutional trust before Anchor Point has authorized project references and a complete public credential pack?
- Decision: Build inspectable method evidence, constructed demonstrations, sample output structures, engagement stages, capability boundaries, a provider/data trust centre, and deeper role-based Hub utility.
- Claim rule: Every strong statement is classified as visible now, verified per engagement, constructed demonstration, future intent, or not claimed.
- Guardrail: Never fabricate clients, projects, registrations, partnerships, government authority, certifications, outcomes, testimonials, or named experience.
- Consequence: The site openly states its pre-launch validation stage and missing owner-verification facts. This is less superficially impressive than invented history and materially more credible under due diligence.
- Escape route: Replace demonstration cases with authorized anonymized or named case evidence as real engagements accumulate; retain labels and provenance in version history.

## D-010 — Role-based Engineering Hub expansion (2026-08-22)

- Decision: Expand from four basic calculators to twelve tools across everyday, field, student, project, commercial and finance lenses; add visible assumptions, four explainers and searchable legitimate resources.
- AI boundary: Present the assistant as an experimental, capacity-dependent beta; require a public-question confirmation and keep calculators, explainers and resources useful when AI is unavailable.
- Safety: Voltage drop, pump power and welding heat input remain theory estimates and explicitly refuse equipment selection, protection sizing, WPS substitution, certification or site authority.

## D-011 — Durable continuity protocol (2026-08-22)

- Predominant question: How can the project survive chat-history display failures, context compaction and handoffs without repeatedly asking the owner to reconstruct decisions?
- Decision: Make `docs/CURRENT-STATE.md`, this decision log and root `AGENTS.md` the mandatory restart sequence; store the recovered persona review as a versioned artifact.
- Operating rule: Reconcile the remote candidate/PR before acting because connector-created commits can leave the local Git pointer behind the deployed files. Update current state after material release-candidate changes.
- Consequence: Small documentation overhead in exchange for reproducible project context independent of one model session or device UI.
- Escape route: Every record is plain Markdown under Git history and can be revised or removed through a reversible reviewed commit.

## D-012 — Public clarity and meaningful visual language (2026-08-22)

- Predominant question: How can the proof layer earn confidence without making an ordinary visitor feel they have opened an internal compliance file?
- Decision: Rename and rewrite Evidence as “How We Work” and Trust as “Information Care”; lead with visitor outcomes, familiar decision examples and plain sharing guidance. Keep the detailed governance facts, but remove unexplained codes and internal-sounding labels from the primary journey.
- Visual decision: Replace the painterly Renaissance scene with original light-background technical linework connecting marine, structural, mechanical, electrical, water and flight systems. Use the exact Anchor Point emblem as a watermark, a restrained action-button signature and the moving object on a measured hero orbit.
- Motion decision: Shorten reveal, console, hover and ticker timing while preserving the reduced-motion mode.
- AI decision: Retain `openrouter/free`, the no-paid-fallback rule and `data_collection: deny`. When live capacity is unavailable, show a clearly labelled reviewed local theory note for supported topics instead of a dead error message. Never present the fallback as an AI answer.
- Evidence: OpenRouter documents free models as low-limit, variable-capacity services suited to experimentation and low-volume use—not guaranteed production availability.
- Escape route: The previous illustration remains in repository history; the refinement stylesheet and new asset can be reverted independently.

## D-013 — Launch 3.0 ecosystem direction (2026-08-22)

- Predominant question: How can Anchor Point reach engineers through recurring utility while growing beyond a static consulting website?
- Decision: Preserve Launch 2.5 at remote commit `b03a25448871147863bc4b7544152705747c2e09`; create `launch-3.0-candidate` from that exact state; reshape the Engineering Hub into a faculty–department–pathway ecosystem with engineering deep first and limited foundations for business, finance, law and human systems.
- Product model: Anchor Point owns the navigation, taxonomy, original tools, explanations and relationship layer. Third-party knowledge remains with the authoritative publisher and is linked rather than copied or re-hosted.
- Tool model: Separate Scientific Calculator, Unit and Conversion Tools, Engineering Calculators, and Knowledge and Sources. Grow conversion coverage through one verified engine with sector views rather than copied commercial tools.
- Brand: Establish **Anchored in Excellence** as the institutional tagline while retaining **Engineering at Ease** as the operating philosophy.
- Privacy: Remove Information Care from primary navigation. Keep compact Privacy and Terms links, contextual notices, truthful purposes and data rights without publicly marketing the infrastructure stack.
- Mobile: Build web-first toward an installable PWA, then Android and iOS wrappers when store accounts justify them. Core utility remains available without compulsory registration.
- New concepts: Develop an Idea Graveyard only with ownership, confidentiality, moderation and selection boundaries. Evaluate the frustration concept first as a no-storage local Release Pad; never mix emotional disclosures into lead scoring.
- Visual guardrail: No image generation without an owner-approved concept, placement and purpose.
- Escape route: Launch 2.5 remains independently preserved; all Launch 3.0 work stays on its dedicated candidate branch and can be reverted by reviewed commit.

## D-014 — Utility engine and private-first experiments (2026-08-22)

- Decision: Meet broad conversion demand with a tested unit engine and explicit route count, not hundreds of copied or thin pages. Keep every result transparent through reference units, factors and substitution.
- Scientific safety: Parse a limited mathematical grammar locally; do not use `eval` or send expressions to a service. Treat outputs as aids requiring unit, domain and applicability checks.
- Idea Graveyard boundary: Prove the sorting and reflection experience locally before accepting public submissions. Submission remains closed until the owner approves intellectual-property language, confidentiality limits, moderation, retention, deletion and contact rules.
- Release Pad boundary: Keep the initial concept entirely in the browser, with no account, storage, analytics linkage, AI, diagnosis or lead scoring. It is not counselling, crisis support or a monitored channel.
- Reason: Recurring utility can build trust and habit without collecting sensitive data before Anchor Point has the operational capacity to protect and moderate it.
- Escape route: Either concept can remain a private browser tool, move behind the Vault, or be removed through a single reversible change if owner review finds the tone or risk unsuitable.

## D-015 — Owner-review clarity and visual authority (2026-08-23)

- Predominant question: Which Launch 3.0 elements still looked like an intelligent prototype explaining itself rather than a confident institution inviting a useful first conversation?
- Decision: Retain the full Launch 3.0 ecosystem while rewriting the first impression, method, principles, services and horizon in immediately understandable language.
- Identity: Free the emblem from its secondary diamond container; reserve luminous gold for important actions; use a navy emblem on gold buttons; keep watermarks large, quiet and purposeful.
- Journey: Replace duplicate decorative motion with a project-lifecycle map, use smoother navy–blue–ivory transitions and make every animation or diagram support meaning.
- Commercial clarity: Define four engagement paths—Decision Framing, Project and Procurement Strategy, Technical–Commercial Review, and Institutional Planning and Knowledge Systems—with triggers, outputs and typical first steps.
- Technical honesty: Replace “reversible decisions” with “decisions built to adapt.” Anchor Point can identify room to modify, reuse or change course but must never suggest every physical or contractual decision can be reversed.
- Cultural signature: Keep curiosity, connected technical drawing and the napkin-sketch invitation. Remove overt Leonardo explanation so the Renaissance influence is discoverable rather than performed.
- Mobile rule: Preserve access to all content while reducing compulsory vertical reading through visible filters and expandable secondary examples.
- Visual guardrail: No image generation was authorized or used. The existing owner-approved technical asset and exact emblem remain the only visual sources in this pass.
- Escape route: The refinement is isolated in `launch3-polish.css` plus reversible content/behavior edits and can be reviewed or reverted independently.

## D-016 — Startup accountability and launch trust (2026-08-23)

- Predominant question: How can an early-stage Anchor Point answer the valid “who is accountable?” objection without inventing a mature team, project history, credentials or social proof?
- Decision: State the current stage directly. Present Anchor Point as an early-stage, founder-led engineering institution in Dhaka; distinguish inspectable method/product proof from people, competence and scope evidence that must be verified for the actual assignment.
- Brand hierarchy: **Anchored in Excellence** is the institutional standard; **Engineering at Ease** is the experience being built; “See the real problem. Choose the next move.” remains the homepage proposition.
- Proof: Surface the implemented Ecosystem scale—four desks, 26 conversion quantities, 816 directed routes and six Bangladesh library paths—without presenting usage, adoption or project outcomes that do not exist.
- Accessibility: Treat the four services as a real keyboard-operable tab interface with selected-state announcements. Preserve mobile footer clearance beneath the fixed action dock.
- Contact boundary: Do not restore the archived Formspree endpoint or add a collection form until its owner, recipient, retention, spam controls, deletion process and privacy notice are approved and tested.
- Visual guardrail: No image was generated, edited or added. Image concepts remain subject to separate owner approval.
- Escape route: The accountability section, brand bridge, Ecosystem proof strip and metadata/accessibility changes are isolated and can be revised independently when verified owner/legal facts become publishable.

## D-017 — Ecosystem proof composition (2026-08-23)

- Decision: Replace abstract claims of recurring utility with three real captures from the working candidate: the Scientific Desk resolving `sin(45)^2 + cos(45)^2 = 1`, the Conversion Desk resolving `1 bar = 14.503773773 psi`, and the Hydraulic Pump Power calculator showing its default-input estimate and verification boundary.
- Provenance: Captures come from the local Launch 3.0 candidate at a controlled desktop viewport. They are not generated interfaces, concept mockups, adoption evidence or third-party products.
- Treatment: Present the captures as one restrained proof composition inside the Ecosystem section, with accurate alternative text, lazy loading, explicit result boundaries and reduced-motion support.
- Visual guardrail: No generative image model was used. The composition may be regenerated only from verified live interfaces when those interfaces materially change.

## D-018 — Anonymized Decision Anatomy (2026-08-24)

- Predominant question: How can Anchor Point demonstrate its problem-first philosophy through lived engineering tension without exposing confidential history or presenting unverified experience as a client credential?
- Decision: Publish a constructed, anonymized flagship walkthrough titled **When the calculation began defending the decision**. Show the movement from provisional confidence through system conflict to explicit assumptions, operating cases and verification controls.
- Claim boundary: Remove all client, employer, vessel, supplier, classification, date, value, outcome and personal identifiers. State that details and sequence are simplified and that the demonstration is not a verified project credential or client case study.
- Integrity lesson: A calculation must be permitted to disprove a committed design. Exclusions, concurrency, continuous versus maximum capability, source-consumer compatibility, redundancy and test evidence must remain visible.
- Founder boundary: Do not create or imply founder-page claims until the owner supplies and approves the separate script and publishable facts.
- Escape route: The walkthrough is isolated in one flagship HTML block and dedicated CSS classes; it can be revised or replaced without affecting the remaining proof layer.
