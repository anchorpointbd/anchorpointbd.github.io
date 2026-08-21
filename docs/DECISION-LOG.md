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
