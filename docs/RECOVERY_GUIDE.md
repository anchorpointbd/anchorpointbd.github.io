# Milestone 1 recovery guide

1. Use branch `milestone-1-homepage-locked` at `b37d5523dc3db9a43602f0f691a5df94e29a4568` as the clean forward baseline.
2. Verify the homepage acceptance record at `2d1235d` and final visual change at `1497c84`.
3. Compare the deployment aliases in `docs/REFERENCE_PREVIEWS.md` with Cloudflare deployment metadata before changing or removing a preview.
4. Recover any historical snapshot directly by its full commit SHA in `docs/MILESTONES.md`; branch deletion is never required for recovery.
5. The early founder-origin source is `founder.html` introduced at `dffb135` and styled at `2f8312b`; inspect it privately with `git show dffb135:founder.html`. It contains a restrained personal-origin narrative about overlooked capability, professional frustration, recognition, and building a place for contribution. Do not republish it without a privacy/content review.
6. Later About review work is preserved at `d1f974a` and `79cb3ca` but is outside the Milestone 1 baseline.
7. Before any homepage change, obtain explicit owner confirmation. Documentation-only maintenance must produce an empty diff for homepage implementation files.

