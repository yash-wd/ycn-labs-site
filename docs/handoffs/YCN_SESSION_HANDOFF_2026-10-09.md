# YCN LABS — SESSION HANDOFF · 09 Oct 2026 (written 10 Oct)
Purpose: start fresh GPT / Claude / AGY chats without history. Supersedes YCN_SESSION_HANDOFF_2026-10-01_PAUSE.md for current state (keep that file for history: §1 tree, §4 HOME-02 history, §7 incidents 1–16).
Authority: explicit Owner rulings → docs/YCN_DECISIONS.md → YCN_CLAIMS_AND_PROOF.md → YCN_CONTENT_SPEC.md → YCN_DESIGN_SYSTEM.md + brand record → docs/vnext/* → legacy. Rulings recorded here, in the 01 Oct handoff §5 and in the master note govern until written into the repo.
Evidence words: VERIFIED = raw output seen by a reviewer; REPORTED = AGY statement only.

## 1. Repository state
- Branch site-v2, HEAD e71ef1b (= origin/site-v2). main / origin/main never touched.
- Uncommitted since 25 Sep: the 23 M + 36 ?? of the 01 Oct handoff, plus 09 Oct edits to: components/homepage/vnext/PhoneChaptersSection.tsx (HOME-02 capability-03 pilot); components/ui/ycn-signal-border.tsx, components/homepage/vnext/BrandContinuumStage.tsx, app/globals.css, __tests__/navbar-polish-04.test.tsx (navbar/entrance regression work).
- ycn-signal-border.tsx, BrandContinuumStage.tsx and navbar-polish-04.test.tsx are UNTRACKED: git cannot restore them, only backups can.
- Change-detection baseline: ../ycn-brand-masters/exports/full-project-review-2026-10-09/CLAUDE_CORE_SET/INDEX.md (SHA of every source file on 09 Oct, before the pilot).
- Raw git status --short:
  M __tests__/content-spec-authority.test.ts
  M __tests__/entrance-b2.test.ts
  M __tests__/phase2-phone-chapters.test.ts
  M app/about/page.tsx
  M app/contact/page.tsx
  M app/credits/page.tsx
  M app/engineering/page.tsx
  M app/globals.css
  M app/how-we-work/page.tsx
  M app/not-found.tsx
  M app/privacy/page.tsx
  M app/what-we-solve/page.tsx
  M app/work/page.tsx
  M components/ContactForm.tsx
  M components/Footer.tsx
  M components/Header.tsx
  M components/homepage/vnext/HeroFoundation.tsx
  M components/homepage/vnext/HomepageFAQSection.tsx
  M components/homepage/vnext/HomepageVNextPhase1.tsx
  M components/homepage/vnext/NeedsFinderAndCloseSection.tsx
  M components/homepage/vnext/PhoneChaptersSection.tsx
  M components/homepage/vnext/TheTurnSection.tsx
  M components/homepage/vnext/WhatWeAreBuildingSection.tsx
  ?? __tests__/hero-polish-01.test.tsx
  ?? __tests__/hero-polish-01b.test.tsx
  ?? __tests__/hero-polish-01c.test.tsx
  ?? __tests__/navbar-polish-03.test.tsx
  ?? __tests__/navbar-polish-04.test.tsx
  ?? __tests__/navbar-polish-05.test.tsx
  ?? __tests__/navbar-polish-06.test.tsx
  ?? __tests__/navbar-polish-07.test.tsx
  ?? components/homepage/vnext/BrandContinuumFilm.tsx
  ?? components/homepage/vnext/BrandContinuumStage.tsx
  ?? components/ui/
  ?? public/brand/ycn-final-live-logo-v5.png
  ?? public/brand/ycn-final-live-logo-v6.png
  ?? public/entrance/
  ?? public/media/capabilities/
  ?? public/media/hero/
  ?? scratch/
  ?? scripts/capture_after_hero.cjs
  ?? scripts/capture_before_hero.cjs
  ?? scripts/capture_checkpoint_01c.cjs
  ?? scripts/capture_hero_image_crops.cjs
  ?? scripts/capture_home01c_evidence.cjs
  ?? scripts/capture_home02_checkpoint.cjs
  ?? scripts/capture_relay_checkpoint.cjs
  ?? scripts/capture_type_before_evidence.cjs
  ?? scripts/capture_type_checkpoint.cjs
  ?? scripts/capture_type_full_evidence.cjs
  ?? scripts/compare_hero_diffs.py
  ?? scripts/diagnose_hero_light_wash.cjs
  ?? scripts/diagnose_mobile_nav.cjs
  ?? scripts/diagnose_premature_scroll.cjs
  ?? scripts/process_hero_assets.py
  ?? scripts/recapture_all.cjs
  ?? scripts/test_geometry.cjs
  ?? scripts/test_mobile_geometry.cjs
  ?? scripts/test_mobile_scroll.cjs
- Files differing from INDEX.md (5 files):
  - __tests__/navbar-polish-04.test.tsx (Current: 4239b9f01f1cb0054ed8e166a082ce5f1a934ba73d511c4610f88a46928db8db | Baseline in INDEX.md: 7f96d8db5042...)
  - app/globals.css (Current: f8d87237f79970a42838e0a227b2323a6036f1f40e2f6580c5b03031cee38a5d | Baseline in INDEX.md: c3796b1d7cfc...)
  - components/homepage/vnext/BrandContinuumStage.tsx (Current: 9d3ed3c2c2c714da3ea938cb2d1ff63b80b653e2cdbd7c1622f6ff28d9ccd471 | Baseline in INDEX.md: 3cdc6fbaf83a...)
  - components/homepage/vnext/PhoneChaptersSection.tsx (Current: 28de9265d693ae7f4de12c89eedfeb8353c33117637df308e5dcbdb62b3b5fb6 | Baseline in INDEX.md: 0ed5c4c9b938...)
  - components/ui/ycn-signal-border.tsx (Current: 935712a9d315ff776d9a15e2f7d026f31bd5d03651f4132d74e33c65b920227c | Baseline in INDEX.md: caf67438c50d...)
- BUILD_ID: KBWwqLW8uk7Zbjpfxsxbo
- Server PID: none (not running)
- Status of YCN-NAV-ORIGINAL-STYLE-01: NOT RUN

## 2. Operating mode
- Seats: Owner (final authority; the only visual approval) · GPT strategy (ONE AGY instruction at a time) · Claude review (audits each instruction once by exception and each AGY report against raw output; never approves visuals) · AGY execution.
- Flow: GPT instruction → Claude audit → Owner sends → AGY builds to a checkpoint (2–8 frames) → Owner verdict PASS / DEFECTS → defects fixed inside the same task.
- AGY evidence: raw command output only (no pre-written results); exit codes via ${PIPESTATUS[0]}; SHA-256 backups before every edit (mandatory for untracked files); scripts under proof/<task>/scripts/; PROTOCOL §10 skills/MCP block in every report (available, used, what each changed, not used and why); no commit, push, main, deploy or canonical-doc edits unless instructed; STOP at checkpoint.
- Copy: every visible string is canon or in an Owner-ratified closed text list. Sending an instruction that contains a ratification block ratifies it.
- Claude cannot open ZIPs or private links: share plain files, max 20 per message.
- Every working day ends with a safe point: handoff update, backup, daily-pack refresh.

## 3. Frozen
Entrance VF19 + INPUT-GATE-01 · NAV-07 · TYPE-01 · HOME-01C Hero. Owner-authorised exceptions (09 Oct): menu-border animation and the "Scroll to explore" cue, bounded fixes only.

## 4. Work done 09 Oct
1. Resume verified (raw git, backup, zip SHA, fresh build, assets 200).
2. Independent full reviews by GPT and Claude. Agreed: continue, do not rebuild, release not ready.
3. HOME-02 Route A+ adopted as a pilot: live-DOM sample screens as bright, theme-invariant product surfaces with colour-coded status pills. Generated screenshots not used. Capability 03 built and corrected (tasks HOME-02-APLUS-PILOT-01 and -FIX).
   Owner-ratified capability-03 sample text: Sidebar Overview · Requests · Tasks · Schedule | Title Requests | Action label New request | Stages Received · Assigned · Next step · Complete | Columns Request · Owner · Next step · Status | Rows: Enquiry / Team member / Reply to customer / New; Booking / Team member / Confirm time / Assigned; Order / Team member / Prepare order / In progress; Follow-up / Team member / Send update / Complete | Disclosure "Sample · nothing is sent" (once).
   Mobile order label → heading → explanation → sample applied to all five capabilities. Colour tokens SAMPLE_STATUS_TOKENS (no purple). File boundary VERIFIED: only PhoneChaptersSection.tsx changed (84-file SHA check).
   Evidence: proof/home-02-aplus-pilot-2026-10-09/ (after frames, PhoneChaptersSection.diff).
   Status: both seats recommend PASS; Owner verdict pending; Claude's diff audit pending.
4. YCN-NAV-ENT-REG-01 applied.
   Scroll cue: one guarded controller (acts only after logo hold), reversible, high-contrast pill, no role="status". Keep.
   Menu border: SVG orbit, 24 px dash, 5 s per lap. The Owner rejected the new look and the speed change between collapsed and expanded. YCN-NAV-ORIGINAL-STYLE-01 was issued: original cyan glow with fading tail, constant 80 px/s driven by requestAnimationFrame, Hero accent border unchanged, plus read-only file-cleanup and continuity reviews. Status: NOT RUN.
   Evidence: proof/ycn-nav-ent-reg-01/ (before/after, playwright-qa/results.json 44/44, planning-evidence/ = 16 frames of the lower sections).

## 5. Confirmed findings to fix (VERIFIED in code unless marked)
Contact (app/api/contact/route.ts, lib/security/ratelimit.ts, components/ContactForm.tsx):
- A saved lead can be shown to the visitor as failed (status-update errors fall through to the 503 path). Fix first.
- Duplicate check runs before the save and the reservation after it: identical concurrent submissions both save. Fix: Redis SET NX before insert.
- Body read in full before the 64 KB check (low; host limit caps it).
- Unsupported form lines: "No data is shared or sold." and the success text promising "structured preliminary thoughts on scope and technical approach". Need Owner-ratified replacements.
- Every error is titled "Temporary failure"; the goal buttons show selection by colour only.
- Correction: missing Upstash credentials do NOT fail open in production (lib/env/server.ts requires them).
Site:
- app/layout.tsx declares addressCountry "GB" and locale en_GB: confirm location.
- metadataBase is configured (close the old item).
- CSP is only frame-ancestors 'none'.
- Hero kicker "Digital Products & Engineering" is unratified.
- Navbar shows the new logo artwork, footer the canonical one.
Quality:
- eslint.config.mjs lints no .ts/.tsx files, so the lint gate proves nothing.
- Vitest runs in node only: no behaviour tests.
- Playwright is installed but unused in the repo.
- Lighthouse not measured since the video entrance.
Docs:
- YCN_DECISIONS.md still states the code entrance (048), Hero phone (043), phone chapters (041) and no generated UI (037), contradicting the build.
- docs/INDEX.md (decisions only to 034), YCN_DOC_GUIDE_PHASES_TO_RELEASE.md and AGENTS.md give conflicting authority maps.
- PROJECT.md says Geist font / port 3005; YCN_HANDOFF.md is frozen at 24 Sep.
Homepage:
- HomepageVNextPhase1.tsx still mounts the old lower sections.
- HOME-03 has no canon copy.
- Likely dead code (verify imports first): CodeEntranceContinuum, LogoTakeoverStage, components/{CinematicLayersSlice, HeroChapters, HowItConnects, HowWeWork, WhatWeBuild, UniversalActions, BuyerFAQ}.tsx, the newsletterSignups table.
AGY reporting: pre-written or unsupported claims recurred on 09 Oct (hand-typed hash = proposed incident #17; invented CSP claims; a promised inventory never created). Treat AGY statements as REPORTED until raw output is shown.

## 6. Open Owner decisions
1. Capability-03 pilot: PASS / DEFECTS.
2. Navbar border (after NAV-ORIGINAL-STYLE-01) and scroll cue: PASS / DEFECTS.
3. Interim commit on site-v2: recommended YES now (three edited files are untracked).
4. Rulebook update (docs only: existing rulings as DECISION-051+, CONTENT_SPEC §3, INDEX.md, YCN_HANDOFF.md, competing maps marked): recommended YES before HOME-03.
5. Homepage structure: GPT 7 chapters (new HOME-03 example copy) vs Claude 6 chapters (HOME-03 + 05 merged into "one request, start to finish" from already-ratified lines). Also: does the results section (DECISION-035, Owner-final) stay?
6. Is YCN Labs UK-based? (GB metadata)
7. Staging credentials (database, Upstash, Resend) and the lead retention period.
8. Replacement wording for the two form lines.
9. Carried: Esc during intro · brand artwork scope · transparent logo export · Hero kicker · release-gate template · incident #17.

## 7. Task order
1. YCN-SAFEPOINT-2026-10-10: save this handoff, backup, daily pack. No code.
2. Finish YCN-NAV-ORIGINAL-STYLE-01 checkpoint → Owner verdict.
3. Claude audits PhoneChaptersSection.diff → Owner capability-03 verdict.
4. Interim commit (Claude audits the staged diff) + rulebook update.
5. HOME-02 capabilities 01, 02, 04, 05: distinct compositions; colour tokens reused; a closed text list per capability; matching reference image as target (../ycn-brand-masters/capability-ui-references-2026-10-01/); photography only without readable signs or generated screens → freeze HOME-02.
6. Homepage structure ruling → remaining chapters one task each, checkpoint-first, canon lines mapped (editorial reset, laptop portal, flow lead, descriptor).
7. Contact fixes (code), then staging verification with credentials.
8. Quality: real ESLint config (dependency approval), Playwright smoke tests, accessibility, Lighthouse ×3, five-person test (needs a reachable URL, e.g. a Vercel preview of site-v2; check env vars first).
9. One approved cleanup list (keep / archive / delete) → release gate → promotion site-v2 → main without the 12 guarded local-main commits.

## 8. Key locations (../ycn-brand-masters/)
- Proofs: proof/home-02-aplus-pilot-2026-10-09/ · proof/ycn-nav-ent-reg-01/ · proof/resume-2026-10-09/
- Backups: backup-2026-10-01-week-pause-home-02f/ · proof/backup-pre-home-02-aplus-pilot-2026-10-09/ · proof/ycn-nav-ent-reg-01/backups/ · backup-2026-10-10-safepoint/
- Exports (DELETE-CANDIDATES after Owner approval, except CLAUDE_CORE_SET/INDEX.md): exports/batch-1-2026-10-09/ · full-project-review-2026-10-09/ · temporary-github-review-2026-10-09/ (local git snapshot; never push) · claude-next-2026-10-09/ · TEMP_YCN_REVIEW_UPLOAD_2026-10-09/
- GPT reviews (non-authoritative, ~/Downloads): YCN_LABS_INDEPENDENT_END_TO_END_AUDIT_2026-10-09.md · YCN_HOMEPAGE_COMPLETION_PLAN_2026-10-09.md

## 9. Daily new-chat pack (YCN_PROJECT_CONTINUITY_WORKSPACE/08_NEW_CHAT_UPLOAD/)
This handoff · amended master note · YCN_DECISIONS · YCN_CONTENT_SPEC · YCN_CLAIMS_AND_PROOF · YCN_DESIGN_SYSTEM · YCN_AGENT_OPERATING_PROTOCOL · seat opening messages. Everything else on request by name. Refresh at every safe point.

## 10. Lessons 09 Oct
- Exports cost a whole day: share plain files in small sets; never bundle the whole project for review.
- AGY reports must be raw output; reviewers verify, never trust summaries.
- A fixed visual target (reference image + closed text list) ended six HOME-02 iterations.
- Constant duration is not constant speed: animation specs must state the perceived quantity (px/s).
- Write the handoff before chats fill up.
