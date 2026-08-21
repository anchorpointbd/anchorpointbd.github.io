# Launch 2.5 operations

## Architecture and setup

Public pages are dependency-light HTML/CSS/JS on GitHub Pages. The Vault browser receives only `SUPABASE_URL` and the public anon key in `config.js`; RLS is the authorization boundary. Never add `service_role`, database passwords, SMTP credentials, or AI keys.

1. Create a Supabase project; run `supabase/schema.sql` in SQL Editor.
2. Disable public sign-up; invite exactly two staff; enable TOTP MFA; insert their `profiles` rows, with one `admin`.
3. Put URL and anon key in `config.js`; configure exact production/preview redirect URLs.
4. Verify anon users cannot read any table/object; staff can work; only admin can manage users/templates/delete files.

## Free-tier limits and migration

At decision time Supabase Free includes 500 MB database, 1 GB file storage, 5 GB egress, 50,000 MAU, and two active projects; inactive projects can pause after one week. Free has no automatic backups. Confirm current pricing before account creation. For two staff this is practical, not production-resilient.

Weekly: export schema/data, export a Storage manifest and files, encrypt the backup, keep one offline copy, and perform a quarterly restore drill. Migration path: standard Postgres export to managed Postgres; object copy to S3-compatible storage; switch the frontend adapter and force credential resets if auth hashes cannot migrate.

## AI policy

The assistant explains theory, variables, assumptions, standards-discovery steps and verification questions. It refuses final design approval, equipment selection, protection sizing, site methods, bypasses, emergency instructions, fabricated clauses and decisions. Use a server-side Edge Function with an AI key, authentication, per-user rate limits, minimal logging, no confidential prompts by default, and a clear model/provider disclosure. OpenRouter free routing is suitable only for experiments because availability and daily request limits vary.

Selected implementation: `supabase/functions/theory-assistant` calls `openrouter/free`; the provider key is stored only as the Edge Function secret `OPENROUTER_API_KEY`. The site caps use at five questions per hashed client per rolling day and never falls back to a paid model.

Deploy after linking the Supabase CLI: `supabase secrets set OPENROUTER_API_KEY=...`, then `supabase functions deploy theory-assistant`. Add the deployed Supabase URL and anon key to `config.js`. Keep JWT verification enabled. For preview domains, temporarily add the exact preview origin to the function allowlist and remove it before launch.

## Deployment and recovery

No production deployment or merge is authorized yet. Preview this branch first. Rollback is a Git revert or prior commit; data rollback requires the encrypted backups above. DNS/CNAME stays unchanged unless the owner explicitly approves changes.

## Required owner decisions

Approve the two staff emails/roles, Supabase account/region, data classification and retention periods, backup custodian, legal text, AI provider/data policy, verified company contact details, and the final master logo/social artwork.

## Staff invitation acceptance

The callback page is `/accept-invite.html`. It detects the Supabase invitation session, requires a 12-character password, enrolls TOTP, verifies the first code, and only then links to the Vault. Returning sessions are gated by authenticator assurance level; private database and Storage policies must use the AAL2 migration in `supabase/migrations/20260821_staff_onboarding_mfa.sql`.

Store the OpenRouter replacement key only in Supabase Edge Function secrets as `OPENROUTER_API_KEY`. A key exposed in chat, source code, screenshots, or browser JavaScript must be revoked. The Edge Function requests ZDR routing; lack of a compatible free endpoint is an expected unavailable state, not permission to weaken privacy.
