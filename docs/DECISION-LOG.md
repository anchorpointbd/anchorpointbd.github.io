# Anchor Point decision log

This is the append-only record of Launch-1 decisions.

## APD-001 — Preserve V12 logo master; adopt a separate web derivative
- Status: accepted
- Date: 2026-08-21
- Owner: Anchor Point
- Decision: The supplied `ANCHOR_POINT_MASTER_EMBLEM_V12 all logo_final.svg` is the immutable visual master. Launch-1 will use a separately prepared web derivative; the master remains unchanged.
- Why now: The prior repository logo was an embedded JPEG inside an SVG and was not suitable as the approved source asset.
- Evidence: SHA-256 `7D1CE4B3A8E43C6688738C6CA702059548F609DBC2604AD349D036BDA9290D31`; audit record retained outside the repository.
- Implementation: `assets/brand/anchor-point-emblem-v12.svg`.
- Risks and mitigations: Do not crop, recolour, separate, or redraw the master without a superseding decision.
- Approval: user approval, 2026-08-21
- Review: before creating a compact lockup, favicon, or social asset.

## APD-002 — Launch-1 architecture
- Status: accepted
- Date: 2026-08-21
- Owner: Anchor Point
- Decision: Launch-1 is a static, accessible website built on a new `launch-1` branch from `main`. It selectively reuses approved development content; it does not merge the experimental `development` branch.
- Why now: The branches diverged and development contains invalid script integration, experimental public files, and an obsolete logo asset.
- Implementation: semantic HTML, scoped CSS, progressive JavaScript, explicit assets and documentation.
- Risks and mitigations: Maintain an auditable PR and release checklist before deployment.
- Approval: user approval, 2026-08-21
