# Anchor Point continuity protocol

This repository is the durable project memory. Before making a material change:

1. Read `docs/CURRENT-STATE.md`.
2. Read `docs/DECISION-LOG.md`.
3. Inspect the current remote head and draft pull request. Connector-created commits may make the local `.git` pointer older than the deployed candidate files.

## Non-negotiable working rules

- Do not merge or deploy to production, change DNS, or modify `main` without explicit owner approval.
- Work on `launch-2.5-candidate` through reversible commits and a PR-style review into `development`.
- Never place OpenRouter keys, Supabase service-role keys, passwords, private documents, or other secrets in browser code, Git, screenshots, logs, or chat output.
- Treat the supplied `Logo_Final.svg` as the immutable artwork source. The web lockup and emblem may crop its A4 canvas, but must preserve the exact path and divider geometry.
- Distinguish verified fact, owner-supplied fact awaiting verification, constructed demonstration, sample output, and future intent. Never invent clients, credentials, government authority, results, testimonials, or project history.
- Keep public and Vault data separated. Do not transmit project, client, drawing, measurement, personal, or Vault content to the public AI assistant.
- After a material decision or release-candidate change, update `docs/CURRENT-STATE.md` and append a reversible entry to `docs/DECISION-LOG.md`.

## Verification baseline

Check JavaScript syntax, internal links, responsive layout (including 390 px), keyboard/focus behavior, accessible labels, calculator assumptions/formulas, secret scanning, and the deployed preview before asking for launch approval.

