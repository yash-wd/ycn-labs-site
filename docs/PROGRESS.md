# YCN V3 sprint — daily scoreboard

One line per field, updated once a day (Owner decision 10 Nov 2026: Option B, light lane).

| Field | Day 1 (12 Nov 2026) | Day 2 (12 Nov 2026) | Day 3 (12 Nov 2026) |
|---|---|---|---|
| Task | Tokens (spacing, radius, elevation, status), section kit, new hero H1 with headline A | Homepage body: what we build, problems we solve (4 screens), how it works, why YCN, 6 questions, final call | What we solve, How we work, Work, About, Engineering rebuilt on the kit |
| Target | Homepage first screen shows what YCN builds in seconds; nothing overlaps; works at 375–1440, both themes, reduced motion | ≤ 600 words, ≤ 8 phone screens, nothing overlaps, keyboard and reduced motion work | Each page ≤ 300 words, one visual per message, ratified headlines kept |
| PR / SHA | See the Day 1 PR (`wip/YCN-V3-UI`) | Same PR, next commit | Same PR, next commit |
| Evidence | 27 files / 348 tests pass; types clean; lint 0 errors; offline build OK; screenshots in the private vault `proof/YCN-V3-SPRINT/day1` | 28 files / 355 tests; 493 words (was 2,960); 7.6 phone screens before the footer; offline build OK | Words: 220 / 189 / 238 / 141 / 205 (were 1,600–2,200); 355 tests; offline build OK |
| Blocker / owner | None for the build. Launch items (legal, licences, hosting, Sentry account) stay with the Owner | None | None |
| Next decision | Owner approved the hero (12 Nov) | Owner approved the homepage (12 Nov); fixes stay "after launch" with no number | Owner: approve the inner pages, then Day 4: Contact, motion, responsive/accessibility pass, Lighthouse, test clean-up |
