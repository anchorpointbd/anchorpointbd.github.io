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
