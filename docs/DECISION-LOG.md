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

