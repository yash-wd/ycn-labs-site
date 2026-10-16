# YCN Labs — Verified Project State

**Timestamp:** 2026-10-15
**Active Development Repository:** `https://github.com/yash-wd/ycn-labs-site`  
**Active Branch:** `main`  
**Verified Starting HEAD:** `5dbab54fbbba7317efe7b8f5616ae250ce16b0f5`  
**Base GitHub main inspected for this documentation task (14 Oct):** `e56e0d7e3374ece8f26b62ddde9417c30d76b585` (historical task preflight, not a claim about current future HEAD).
**Historical Private Checkpoint:** `11468f4b36b3fdf451cd0bf04e5f2ee2868b45a5` (retained in `yash-wd/ycnlabs`)  
**Initial Public Snapshot Commit:** `2bce139af7865a0458af4b22518d07721c0c3e12`  
**Live HEAD Verification:** Run `git rev-parse HEAD` locally — do not trust static documentation.  
**Upstream Synchronization:** Ensure `git fetch && git status --porcelain` is clean and `HEAD == origin/main`.  
**Local Vault Isolation:** Backups, business records, and proof frames remain strictly local in a private vault outside GitHub.

---

## 1. Verified Quality Gates & Baseline (RUN-VERIFY-01)
- **Quality Gates:** lint / check-types / test / build all exit 0 from fresh clone simulation without `.env.local`.
- **Automated Tests:** 280/280 vitest tests passing across 18 test files (`vitest run`).
- **Type Checking:** 0 errors (`tsc --noEmit`).
- **Lint:** 0 errors / 0 warnings (`eslint .`).
  - *Finding for later review:* `eslint.config.mjs` contains ignore patterns only without substantive lint rule configuration; coverage limitation noted for later quality review (do not expand now).
- **Production Build:** 18/18 routes generated cleanly (`next build --webpack`).
- **Local Environment:** `.env.local` contains only `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` (operating in staging/noindex mode; `NEXT_PUBLIC_SITE_ENV` absent). Note: database, Redis, and email credentials have not yet been configured locally; O-10 access is an active dependency for staging verification.
- **Owner Identity Gate:** Owner confirmed v2 identity on localhost 12 Oct. (Note: Full-site visual acceptance and production readiness are pending and not claimed).
- **Git Hooks & Signing:** Zero active Git hooks; `core.hooksPath` unset; `commit.gpgsign` unset.

---

## 2. In-Flight Workstreams & Execution Queue
- **Governing Plan:** `docs/YCN_MASTER_PLAN.md` §14 (Published Launch Execution Roadmap at `df13f17`, 13 Oct 2026).
- **Task Status:** 00, 01, 02, 06 done; 05 folded.
- **Mandate & Vision:** `YCN-MANDATE-01` published (`82de0a2`); `YCN-VISION-01` / `DECISION-051` + task 11a published (`633c05e`).
- **Owner direction (14 Oct):** **FOUNDATION FIRST; NO UI/BACKEND CODING** until Gate E readiness and an explicit Owner go-ahead. Master Plan §14 remains the only launch plan. Tasks 07–09 PAUSED (not cancelled or done).
- **Gate A (Owner, 14 Oct 2026):** **COMPLETE for business policy (DECISION-052).** Owner approved O-01–O-10 policies: Hyderabad location, India-first; websites lead + selective web apps/automation + maintenance; email/WhatsApp Business with two-working-day internal response target; evidence-first portfolio; custom INR quotes, 50/30/20 billing, 30-day bug fixes, client backup commitment; 12-month enquiry retention; existing logo after visual approval; plan-first CLOSE; 30 Nov provisional launch target, 10 h/week review availability; existing stack, ₹5,000/month operating budget. Open items (legal entity type, legal/privacy review, infrastructure admin permissions) remain release prerequisites. YCN-DOWNLOADS-VERIFY-01 PASS (no unique loss; 6 copies unhashed; no full inventory).
- **Gate B2 (Owner, 15 Oct 2026):** **COMPLETE for design-system rules (YCN-GATE-B2-DESIGN-01).** Inserted Owner-approved design rules into `docs/YCN_DESIGN_SYSTEM.md`: cinematic display scale reserved for homepage Hero and designated chapter headings; standard content scale retained across all other UI; signature perimeter signal at 80 CSS px/s (±5%), fading tail, continuous distance-based phase, one shared rAF ticker, hidden/off-screen pause, reduced-motion static composed frames; four existing placements only (Menu continuous mode pilot first; three CTAs migrate together under Task 07b); max two conspicuous signals animating at once, with header CTA signal paused while Hero CTA is visible. Tasks 07/07b/08/09 still paused until Gate E.
- **Gate C/D (Owner, 15 Oct 2026):** **COMPLETE for documentation/architecture approval only (YCN-ARCH-V1-01).** 11a architecture v1.0 Owner-approved 15 Oct 2026 (YCN-ARCH-V1-01); implementation NOT STARTED; legal clearance NOT GRANTED. HLD/LLD aligns business assumptions, manual operating boundaries (monitored `hello@ycnlabs.com`, privacy forwarding alias, manual WhatsApp Business without API, off-the-shelf GST quotation/invoicing tool in INR) and retention (up to 12 months for inactive pre-sales enquiries, manual only, no automated purge) with DECISION-052. Preserves durable acceptance, atomic deduplication, cookieless analytics, SPF/DKIM/DMARC, children's-data caveat and mandatory Task 12 staging scenarios 4–6.
- **Gate B1 (Owner, 15 Oct 2026):** **COMPLETE for canonical copy and page reviews (DECISION-053/054);** H-03/W-06 and Task 10/12 deltas to Gate E.
- **Gate E (target 21 Oct):** Cross-check business facts, content, design rules, HLD/LLD, law/claims, V1 scope and testable acceptance; name first bounded coding task and obtain explicit Owner approval before resuming.
- **Next foundation milestone (16 Oct Priority Sequence):**
  1. Priority 1 (COMPLETE): `YCN-SEAT-SHARED-OWNERSHIP-01` — Governance and continuity alignment (Three-Seat Shared Ownership, Adaptive Leadership, and Cold-Start Verification Gate established across 8 documents in this reviewed governance commit).
  2. Priority 2 (CODE PUSHED, RELEASE PENDING): Live-claims hotfix on historical production baseline `6a017e0` (`yash-wd/ycnlabs` branch `hotfix/live-claims-2026-10`, commit `5b0d971` pushed; local render verification passed, Vercel Preview acceptance and production promotion pending Owner decision).
  3. Priority 3 (Pending controlled intake): Historical diagnostic-file vault intake (`scripts/`, `scratch/`, `public/brand/` copy-only intake under manifest).
  4. Foundation Milestone: Gate E readiness check (target 21 Oct 2026); provisional planning target 30 November 2026 (DECISION-052 O-09); 10 November is historical; reforecast once at Gate E.
- **Independent P0 work:** Task 03 private vault encrypted external backup requires its own authorization. Task 04 deployment identification COMPLETE — ycnlabs.com served by Vercel project ycnlabs-staging, repo yash-wd/ycnlabs, branch main, root apps/web, production commit 6a017e0 (30 Aug), Node 24.x, retention 30 days, no checks; site-v2 previews Blocked because commit email hello@ycnlabs.com is not a GitHub account; live claims investigation COMPLETE (proof/YCN-DEPLOY-LIVE-CLAIMS-01); live-claims hotfix NOT STARTED.
- **Nav baseline:** 14 Oct read-only evidence reviewed (findings PASS); measurements and frames moved to PRIVATE vault `proof/YCN-NAV-07/`; no Owner recording required; Task 07 coding on hold.
- **Brand continuity `BRAND-LOGO-CARRY-FORWARD`:** Brand repo `yash-wd/ycn-labs-brand-library`, branch `wip/brand-export-05`, last reported checkpoint `ffb7715`; canonical `14_CONTINUITY/RESUME_HERE.md`. Technical work saved as WIP; Owner visual review and remaining exports pending. **Logo NOT COMPLETE; no automatic integration, approval or WIP promotion.** Coordinated CLOSE must be plan-first, with no brand `main` push (local `main` reportedly contains unapproved work), and no unapproved deletion. Historical repo `yash-wd/ycnlabs`: WIP branches `site-v2` (11468f4) and `quarantine/group-d` (420e61a) pushed at close 15 Oct; untracked diagnostic files in `scripts/`, `scratch/`, `public/brand/` await vault intake (16 Oct, copy-only). This reminder does not delay task 03 or 11.
- **Charter & Operating Governance:** Existing AGENTS charter remains controlling. Review-by-risk tier and CLOSE deletion/push exceptions are proposed rulings pending explicit Owner ratification (O-08 / charter decision).
- **Process Deviations (16 Oct):** AGY assessment transcript executed an unlogged, broad filesystem search (`find /home/ycn-labs`) outside registered project paths; initial edit script failed due to an anchor mismatch in `docs/CLOSE_PROTOCOL.md`; recovered with unauthorized `git checkout -- .` reverting partial edits; overwrote `apply_edits.py` during Stage 2 instead of versioning; `log.txt` contained scripted narration instead of native command-by-command output and exit statuses; blanket trailing-whitespace `rstrip()` stripped intentional Markdown double-space line breaks in `START_HERE.md` and `INDEX.md`; v2 draft introduced incorrect branch name `wip/site-v2` instead of `site-v2` across three files; v2 verification script used `|| true` masking `git diff --check` and `run_cmd` did not fail closed. Corrected in v4 with fail-closed verifier, registered project paths only, versioned helper scripts, append-only collision-protected command wrappers, and zero unauthorized git resets.

---

## 3. Mandatory Preflight Check
Before modifying any source code, run `git fetch && git status --porcelain` to verify a clean working tree aligned with `origin/main`.

---

## Last Session
- **Date:** 2026-10-16 (CLOSE, Owner-authorized)
- **Published today:** `ab26973` governance alignment (Task 1); realign of two local `main` pointers; historical hotfix branch `b8ceba8` → `0e9cc50` → `5b0d971` pushed to `origin/hotfix/live-claims-2026-10`; historical production `main` unchanged at `6a017e01e39da8d68bcca6475bbbbc6dc82821f0` (`6a017e0`).
- **Completed:** Task 1 (`YCN-SEAT-SHARED-OWNERSHIP-01`); Task 2 code (`YCN-LIVE-CLAIMS-HOTFIX-01`, local render verification passed; final Vercel Preview acceptance pending; not promoted to production); screenshot intake + 3 duplicates deleted by Owner-approved manifest; delivery strategy Option 4 agreed by all three seats (Owner confirmation reported via AGY dialog, not yet in the shared record).
- **Not done:** Vercel Preview acceptance of `5b0d971`; build warnings inspection; test lead submission; production promotion; Task 3 historical diagnostic-file intake; Task 03 private vault encrypted external backup.
- **Tomorrow FIRST:** Verify Vercel Preview of `5b0d971` and outstanding release conditions; decide production promotion of the hotfix (one word: promote/hold); then proceed to Gate E `YCN-V2-FOUNDATION-ALIGN-01` (cross-check business facts, content, design rules, HLD/LLD, law/claims, V1 scope, and testable acceptance on Site V2).
- **Owner pending:** Production promotion decision; test lead decision; Vercel Pro; encrypted external drive; private vault repo; V2 Vercel project; CA; lawyer; hello@ / privacy@ email aliases; screenshot / download default paths.
- **Process Deviations (16 Oct):** Broad `find` ×2; `git checkout` of own uncommitted edits ×3; overwritten `apply_edits.py`; build/test run outside the wrapper; un-manifested `NEXT_PUBLIC_CAL_URL` edit; `|| true` masking; whole-file whitespace strip; wrong-SHA verifier with hand-appended PASS; transcript read ×1.
- **Paused items:** Tasks 07–09 paused unchanged pending Gate E foundation readiness.
