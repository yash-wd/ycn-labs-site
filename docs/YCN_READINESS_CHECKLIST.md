# YCN Labs — Project Control & Evidence Readiness Checklist

**Document Identifier:** `docs/YCN_READINESS_CHECKLIST.md`  
**Effective Date:** 2026-10-17  
**Controlling Authority:** Standing Owner Directive (Owner alone authorizes; AI seats advise and review)  
**Total Checkpoints:** 143 Discrete Verification Items (`CHK-001` through `CHK-143`)  
**Permanent Rule:** Every project requirement, architectural decision, development change, design token, test, bug fix, migration step, and Owner instruction must be tracked through this checklist. Nothing is marked completed without reproducible evidence (Git commit SHA, automated test output, or preserved hash).

---

## Standard Checkbox Format Legend
1. `[x] **[VERIFIED]**` — Completed with verifiable evidence (Git commit SHA, CI run exit 0, or preserved proof hash).
2. `[ ] **[LOCAL-WIP]**` — Drafted or implemented locally; technical review passed; awaiting publication to `main` or Owner visual sign-off.
3. `[ ] **[PENDING]**` — Defined with clear scope and dependencies; awaiting turn in execution queue.
4. `[ ] **[OWNER-GATE]**` — Blocked on an explicit Owner decision, credential, or visual sitting.

---

## Section 1: Verified Baseline & Session Readiness (15 items)

- [x] **[VERIFIED]** `CHK-001`: Cold-start verification gate run on `ycn-labs-site` (`23c6c86` → `134b0ec` verified on GitHub).
- [x] **[VERIFIED]** `CHK-002`: Gate E published at commit `134b0ec89854e57057f60f50905b219154eeaea2` on `origin/main` (9 files changed).
- [x] **[VERIFIED]** `CHK-003`: Gate E Gitleaks CI workflow verified green on GitHub (run `39018378717`: success).
- [x] **[VERIFIED]** `CHK-004`: Gate E Quality CI workflow verified green on GitHub (lint, check-types, test, build exit 0).
- [x] **[VERIFIED]** `CHK-005`: Published `main` baseline verified at 280/280 passing Vitest tests across 18 test files.
- [x] **[VERIFIED]** `CHK-006`: Historical production hotfix commit `5b0d971` pushed to `yash-wd/ycnlabs:hotfix/live-claims-2026-10`.
- [x] **[VERIFIED]** `CHK-007`: Historical hotfix Vercel Preview deployment confirmed ready on `ycnlabs-staging`.
- [x] **[VERIFIED]** `CHK-008`: Historical build warnings analyzed (3 Sentry warnings cleared as historical missing env variables).
- [x] **[VERIFIED]** `CHK-009`: Historical `.env.local` verified clean (single empty public variable).
- [ ] **[PENDING]** `CHK-010`: Historical live-claims hotfix promotion decision (HOLD by default; live claims risk remains open).
- [x] **[VERIFIED]** `CHK-011`: ChaiUI component skill installed locally to `~/.agents/skills/chaiui` and audited clean.
- [x] **[VERIFIED]** `CHK-012`: ChaiUI review skill installed locally to `~/.agents/skills/chaiui-review` and registered in `AGENTS.md`.
- [ ] **[LOCAL-WIP]** `CHK-013`: Task 07 technical implementation complete in 3 files on branch `wip/YCN-NAV-07` (292 tests pass; velocity 78.68–81.48 px/s).
- [ ] **[OWNER-GATE]** `CHK-014`: Task 07 governance word ruling from Owner (`authorized` to commit to WIP, or `retain` as uncommitted local WIP).
- [x] **[VERIFIED]** `CHK-015`: Local development server port 3005 verified terminated and port free (zero listening processes).

---

## Section 2: Core Operating Rules & Checklist Discipline (15 items)

- [ ] **[LOCAL-WIP]** `CHK-016`: Universal checklist discipline codified in draft `AGENTS.md`: every task, decision, and instruction must have a checklist entry before execution.
- [ ] **[LOCAL-WIP]** `CHK-017`: No unverified claims rule codified in draft `AGENTS.md`: nothing is marked `[VERIFIED]` without Git SHA, CI run, or preserved proof hash.
- [ ] **[LOCAL-WIP]** `CHK-018`: Single active task rule codified in draft `AGENTS.md`: only one authorized task may execute at a time (multi-tasking this week flagged as process deviation).
- [ ] **[LOCAL-WIP]** `CHK-019`: Discrepancy rule codified in draft `AGENTS.md`: stop and report immediately on unexpected differences; never silently rebase, reset, or overwrite.
- [ ] **[LOCAL-WIP]** `CHK-020`: Owner exclusive approval authority codified in draft `AGENTS.md`: Owner alone authorizes commits, pushes, deployments, and decisions; AI consensus is advisory.
- [ ] **[LOCAL-WIP]** `CHK-021`: Proactive advice permission codified in draft `AGENTS.md`: AI seats explicitly encouraged to propose better ideas and identify gaps, executing only upon Owner approval.
- [ ] **[LOCAL-WIP]** `CHK-022`: WIP branch routing rule codified in draft `AGENTS.md`: unreviewed work and drafts route strictly to `wip/<task-id>`, never to `main`.
- [ ] **[LOCAL-WIP]** `CHK-023`: Standard GitHub markdown checkbox format enforced (`- [ ]` and `- [x]`).
- [ ] **[LOCAL-WIP]** `CHK-024`: PostgreSQL durable deduplication standard codified in draft `AGENTS.md` (PostgreSQL transactions and unique constraints enforce deduplication; Redis is ephemeral).
- [ ] **[LOCAL-WIP]** `CHK-025`: 80 px/s signature perimeter motion scope bounded strictly to Navigation Menu capsule (Task 07) and three CTAs.
- [ ] **[LOCAL-WIP]** `CHK-026`: Design proposals boundary codified in draft `AGENTS.md` (draft 1280px max-width, proposed tokens, and font sizes are proposals, not approved replacements).
- [ ] **[LOCAL-WIP]** `CHK-027`: Selective legacy migration rule codified in draft `AGENTS.md`: historical repo `yash-wd/ycnlabs` is never git-merged into `ycn-labs-site`.
- [ ] **[LOCAL-WIP]** `CHK-028`: Rollback capability and historical lead DB retention status recorded as plans/requirements, not verified operational facts.
- [ ] **[LOCAL-WIP]** `CHK-029`: Frozen systems protection codified in draft `AGENTS.md`: `VF19`, `INPUT-GATE-01`, `NAV-07`, `POLISH-TYPE-01`, `HOME-01C` require explicit Owner ruling to modify.
- [ ] **[LOCAL-WIP]** `CHK-030`: Process deviation ledger maintained in draft `STATE.md`: all recorded deviations from 16–17 Oct documented.

---

## Section 3: Daily Synchronization Protocol (10 items)

- [ ] **[LOCAL-WIP]** `CHK-031`: Branch-aware daily start-of-day synchronization command codified across all 3 repositories in draft `AGENTS.md` and `CLOSE_PROTOCOL.md`.
- [ ] **[LOCAL-WIP]** `CHK-032`: Branch-aware daily end-of-day close synchronization command codified across all 3 repositories in draft `CLOSE_PROTOCOL.md`.
- [ ] **[LOCAL-WIP]** `CHK-033`: Independent upstream verification rule codified: each branch compared against its own upstream (`git branch -vv`); `origin/main` recorded separately.
- [ ] **[LOCAL-WIP]** `CHK-034`: Legitimate WIP differentiation rule codified: valid WIP branches differing from `main` must not be flagged as errors.
- [ ] **[LOCAL-WIP]** `CHK-035`: Fail-safe close status codified: report `CLOSE BLOCKED` rather than false success if synchronization cannot complete safely.
- [x] **[VERIFIED]** `CHK-036`: Three-repository registered scope verified (`ycn-labs-site`, `ycn-labs-brand-library`, `ycnlabs` historical).
- [x] **[VERIFIED]** `CHK-037`: Cold-start execution on `ycn-labs-site`: `HEAD` at `134b0ec`, `origin/main` at `134b0ec`.
- [x] **[VERIFIED]** `CHK-038`: Cold-start execution on `ycn-labs-brand-library`: `wip/brand-export-05` at `ffb7715`, clean, synced with origin.
- [x] **[VERIFIED]** `CHK-039`: Cold-start execution on historical `ycnlabs`: `hotfix/live-claims-2026-10` at `5b0d971`, clean on tracked files, synced with origin.
- [ ] **[LOCAL-WIP]** `CHK-040`: Scripted raw proof logging with stdout/stderr and exit codes enforced (earlier proof log truncated by script; current log begins at correction pass).

---

## Section 4: Foundation Documents & Milestone Gates (18 items)

- [x] **[VERIFIED]** `CHK-041`: Gate A business policy ratified: DECISION-052 (O-01 through O-10 policies approved on paper).
- [x] **[VERIFIED]** `CHK-042`: Gate A Hyderabad location and India-first business positioning ratified.
- [x] **[VERIFIED]** `CHK-043`: Gate A commercial policies ratified (websites lead, custom INR quotes, 50/30/20 billing, 30-day bug fixes, 12-month enquiry retention).
- [x] **[VERIFIED]** `CHK-044`: Gate B1 canonical copy and page review ratified (DECISION-053 and DECISION-054).
- [x] **[VERIFIED]** `CHK-045`: Gate B2 design-system rules ratified: DECISION-050 / `YCN-GATE-B2-DESIGN-01` in `docs/YCN_DESIGN_SYSTEM.md`.
- [x] **[VERIFIED]** `CHK-046`: Gate B2 cinematic display scale reserved for homepage Hero and designated chapter titles; standard scale elsewhere.
- [x] **[VERIFIED]** `CHK-047`: Gate B2 signature perimeter motion rules ratified (80 px/s ±5%, fading tail, continuous phase, shared ticker, pause off-screen/tab-hidden).
- [x] **[VERIFIED]** `CHK-048`: Gate B2 signature signal placements restricted to four existing locations (Menu pilot + three CTAs under 07b).
- [x] **[VERIFIED]** `CHK-049`: Gate B2 signal concurrency limit ratified (maximum two conspicuous signals animating simultaneously).
- [x] **[VERIFIED]** `CHK-050`: Gate C/D architecture documentation approved on paper (YCN-ARCH-V1-01 v1.0, 15 Oct 2026; implementation NOT started).
- [x] **[VERIFIED]** `CHK-051`: Gate E foundation alignment published on GitHub `main` at `134b0ec` (17 Oct 2026).
- [x] **[VERIFIED]** `CHK-052`: Operations runbook published: `docs/YCN_OPERATIONS_RUNBOOK.md`.
- [x] **[VERIFIED]** `CHK-053`: Discrepancy register published: `docs/YCN_DISCREPANCY_REGISTER.md`.
- [x] **[VERIFIED]** `CHK-054`: Acceptance criteria for Tasks 07–12 published: `docs/vnext/14_ACCEPTANCE_CRITERIA_TASKS_07_12.md`.
- [ ] **[PENDING]** `CHK-055`: Clean draft headers from published Gate E documents (remove "DRAFT — PENDING OWNER COMMIT APPROVAL").
- [ ] **[OWNER-GATE]** `CHK-056`: Option 4 delivery strategy confirmation in Owner's own words (currently "i dont know" on record).
- [ ] **[PENDING]** `CHK-057`: Read `docs/YCN_DECISIONS.md` on next cold start.
- [ ] **[PENDING]** `CHK-058`: Correct India-first metadata in `app/layout.tsx` (`locale: "en_GB"` and `addressCountry: "GB"` → `en_IN` / `IN`).

---

## Section 5: Design-to-Code Contract & Typography (20 items)

- [ ] **[PENDING]** `CHK-059`: Draft canonical Token Contract specification in `docs/YCN_DESIGN_TO_CODE_CONTRACT.md`.
- [ ] **[PENDING]** `CHK-060`: Map semantic token `--ycn-surface-base` across Dark and Light themes.
- [ ] **[PENDING]** `CHK-061`: Map semantic token `--ycn-surface-raised` across Dark and Light themes.
- [ ] **[PENDING]** `CHK-062`: Map semantic token `--ycn-surface-overlay` across Dark and Light themes.
- [ ] **[PENDING]** `CHK-063`: Map semantic token `--ycn-border-subtle` across Dark and Light themes.
- [ ] **[PENDING]** `CHK-064`: Map semantic token `--ycn-border-strong` across Dark and Light themes.
- [ ] **[PENDING]** `CHK-065`: Map semantic token `--ycn-text-primary` across Dark and Light themes.
- [ ] **[PENDING]** `CHK-066`: Map semantic token `--ycn-text-secondary` across Dark and Light themes.
- [ ] **[PENDING]** `CHK-067`: Reconcile dark raised surface drift (`#182337` → published standard `#182234`).
- [ ] **[PENDING]** `CHK-068`: Reconcile light raised surface drift (hardcoded `#FFFFFF` → published standard `#F8FAFC`).
- [ ] **[PENDING]** `CHK-069`: Reconcile hardcoded signal cyan hexes across components to semantic tokens.
- [ ] **[PENDING]** `CHK-070`: Standardize typography hierarchy: Space Grotesk (display/headings) and Inter (body/UI).
- [ ] **[PENDING]** `CHK-071`: Enforce cinematic type scale restriction to Hero and designated chapter headings only.
- [ ] **[PENDING]** `CHK-072`: Enforce standard content type scale across all other UI components.
- [ ] **[PENDING]** `CHK-073`: Map every hardcoded `font-size` in components to the approved type scale.
- [ ] **[PENDING]** `CHK-074`: Audit and reconcile proposed container widths against `docs/YCN_DESIGN_SYSTEM.md`.
- [ ] **[PENDING]** `CHK-075`: Enforce 12-column desktop / 8-column tablet / 4-column mobile grid rules.
- [ ] **[PENDING]** `CHK-076`: Enforce 4px spacing rhythm across layout containers and component padding.
- [ ] **[PENDING]** `CHK-077`: Standardize button component variants, corner radii, and elevation states.
- [ ] **[PENDING]** `CHK-078`: Enforce minimum 44x44px accessible tap targets across all interactive elements.

---

## Section 6: 5-Viewport Homepage Component Audit (18 items)

- [ ] **[PENDING]** `CHK-079`: Verify WCAG AA contrast compliance (minimum 4.5:1 body text) in Dark Theme.
- [ ] **[PENDING]** `CHK-080`: Verify WCAG AA contrast compliance (minimum 4.5:1 body text) in Light Theme.
- [ ] **[PENDING]** `CHK-081`: Verify graphical and large text contrast compliance (minimum 3:1) in both themes.
- [ ] **[PENDING]** `CHK-082`: Homepage Component Audit at 375px (Mobile Small) in Dark Theme.
- [ ] **[PENDING]** `CHK-083`: Homepage Component Audit at 375px (Mobile Small) in Light Theme.
- [ ] **[PENDING]** `CHK-084`: Homepage Component Audit at 768px (Tablet) in Dark Theme.
- [ ] **[PENDING]** `CHK-085`: Homepage Component Audit at 768px (Tablet) in Light Theme.
- [ ] **[PENDING]** `CHK-086`: Homepage Component Audit at 1024px (Laptop/Desktop Small) in Dark Theme.
- [ ] **[PENDING]** `CHK-087`: Homepage Component Audit at 1024px (Laptop/Desktop Small) in Light Theme.
- [ ] **[PENDING]** `CHK-088`: Homepage Component Audit at 1280px (Desktop) in Dark Theme.
- [ ] **[PENDING]** `CHK-089`: Homepage Component Audit at 1280px (Desktop) in Light Theme.
- [ ] **[PENDING]** `CHK-090`: Homepage Component Audit at 1440px (Wide Desktop) in Dark Theme.
- [ ] **[PENDING]** `CHK-091`: Homepage Component Audit at 1440px (Wide Desktop) in Light Theme.
- [ ] **[PENDING]** `CHK-092`: Verify `prefers-reduced-motion` compliance across all animated homepage sections.
- [ ] **[PENDING]** `CHK-093`: Compile Homepage Discrepancy Matrix classifying findings (Task 09, exception, out-of-scope).
- [ ] **[OWNER-GATE]** `CHK-094`: Owner ruling on frozen system collisions identified during homepage audit.
- [ ] **[PENDING]** `CHK-095`: Capture and hash baseline screenshots for all 10 viewport/theme permutations.
- [ ] **[PENDING]** `CHK-096`: Review header and footer component heights against responsive specs.

---

## Section 7: Brand & Logo Authority (12 items)

- [x] **[VERIFIED]** `CHK-097`: Master logo approved: Owner RULING-01 approved `Main_YCN_LABS_logo_black_8K__6675x5195.png` (`01_IMMUTABLE_SOURCE/`).
- [ ] **[LOCAL-WIP]** `CHK-098`: Derivative candidates inventory verified on `wip/brand-export-05` in brand library repo.
- [x] **[VERIFIED]** `CHK-099`: Directory `04_APPROVED_LOGO_VARIANTS/` confirmed empty; zero unapproved derivatives promoted.
- [ ] **[OWNER-GATE]** `CHK-100`: Owner 30-minute visual review sitting: dark transparent mark on dark canvas.
- [ ] **[OWNER-GATE]** `CHK-101`: Owner visual review sitting: light transparent mark on light canvas.
- [ ] **[OWNER-GATE]** `CHK-102`: Owner visual review sitting: favicon at 16x16, 32x32, and 48x48 px.
- [ ] **[OWNER-GATE]** `CHK-103`: Owner visual review sitting: OpenGraph social preview card.
- [ ] **[PENDING]** `CHK-104`: Promote approved variants from `wip/brand-export-05` to `04_APPROVED_LOGO_VARIANTS/` following Owner sitting.
- [ ] **[PENDING]** `CHK-105`: Compile site-wide logo placement map (Header, Footer, Favicon, Web Manifest, OG tags).
- [ ] **[PENDING]** `CHK-106`: Execute Task 11 brand asset integration strictly with approved variants.
- [ ] **[OWNER-GATE]** `CHK-107`: Brand library `main` currently unprotected on GitHub (`protected: false`); configuring GitHub branch protection is an Owner-gated action item.
- [ ] **[PENDING]** `CHK-108`: Audit and replace generic stock video footage with authentic YCN studio footage per `public/media/SOURCES.md`.

---

## Section 8: Selective Legacy Migration & 301 Cutover (15 items)

- [ ] **[PENDING]** `CHK-109`: Comprehensive inventory of legacy site routes, assets, integrations, and environment variable names.
- [ ] **[PENDING]** `CHK-110`: Map historical Vercel project configuration (`ycnlabs-staging`) and deployment settings.
- [ ] **[PENDING]** `CHK-111`: Draft 301 redirect architecture in `next.config.mjs` for all indexed legacy URLs.
- [ ] **[PENDING]** `CHK-112`: Verify zero 404 errors for legacy inbound traffic across search engine indexed routes.
- [ ] **[PENDING]** `CHK-113`: Selective carry-over list compiled with SHA-256 hashes for Owner-approved historical assets.
- [ ] **[PENDING]** `CHK-114`: Confirm zero bulk Git merge of `yash-wd/ycnlabs` into `ycn-labs-site`.
- [ ] **[OWNER-GATE]** `CHK-115`: Neon lead database strategy decision: shared production DB vs one-time row migration.
- [ ] **[LOCAL-WIP]** `CHK-116`: Approved architecture constraint: production lead records prohibited from staging/preview environments (technical verification of preview DB pending Task 12).
- [ ] **[PENDING]** `CHK-117`: Verify 12-month legal retention compliance for pre-sales enquiries under DECISION-052.
- [ ] **[PENDING]** `CHK-118`: Scope Resend email provider configuration reuse across preview and production.
- [ ] **[OWNER-GATE]** `CHK-119`: Provision dedicated Upstash Redis instance for Site V2 rate-limiting.
- [ ] **[OWNER-GATE]** `CHK-120`: Provision dedicated Sentry project for Site V2 and configure `SENTRY_AUTH_TOKEN`.
- [ ] **[PENDING]** `CHK-121`: Draft domain cutover procedure including DNS TTL lowering schedule.
- [ ] **[PENDING]** `CHK-122`: Verify 30-day rollback capability plan (re-pointing domain to historical Vercel deployment).
- [ ] **[OWNER-GATE]** `CHK-123`: Historical hotfix `5b0d971` final disposition: promote to production or retire upon V2 cutover.

---

## Section 9: External Infrastructure, Production Readiness & Legal (13 items)

- [ ] **[OWNER-GATE]** `CHK-124`: Configure GitHub branch protection on `yash-wd/ycn-labs-site:main` (require PR + passing CI).
- [ ] **[OWNER-GATE]** `CHK-125`: Configure GitHub branch protection on brand library `main`.
- [ ] **[OWNER-GATE]** `CHK-126`: Provision dedicated Vercel project for Site V2 with preview password protection.
- [ ] **[OWNER-GATE]** `CHK-127`: Staging environment isolation decision: Neon database branching (free) vs Vercel Pro.
- [ ] **[OWNER-GATE]** `CHK-128`: Provision and verify active corporate mailboxes: `hello@ycnlabs.com` and `privacy@ycnlabs.com`.
- [ ] **[OWNER-GATE]** `CHK-129`: Select and provide external encrypted backup destination drive for Task 03 private vault.
- [ ] **[OWNER-GATE]** `CHK-130`: Chartered Accountant (CA) consultation on corporate structure and invoicing compliance.
- [ ] **[OWNER-GATE]** `CHK-131`: Legal consultation on privacy policy, terms of service, and DPDP Act compliance.
- [ ] **[OWNER-GATE]** `CHK-132`: Formalize business entity type (proprietorship / LLP / Pvt Ltd).
- [ ] **[OWNER-GATE]** `CHK-133`: Select cookieless, privacy-respecting analytics provider.
- [ ] **[OWNER-GATE]** `CHK-134`: Configure uptime monitoring service and alert thresholds.
- [ ] **[OWNER-GATE]** `CHK-135`: Designate named incident response owner for production operations.
- [ ] **[PENDING]** `CHK-136`: Modernize GitHub Actions CI workflow pins (`actions/checkout`, `gitleaks-action`) ahead of Node deprecation deadlines.

---

## Section 10: Master Plan Delivery Sequence Tasks 00–17 (7 items)

- [ ] **[LOCAL-WIP]** `CHK-137`: Foundation tasks completed: Tasks 00 (`df13f17`), 01 (`b3a1884`), 02, 04, 05 (folded), 06 (CI green), Gate E (`134b0ec`) published on `main`; Phase 0 remains open while Task 03 (offline vault backup) is pending Owner drive destination.
- [ ] **[PENDING]** `CHK-138`: Task 03 (`YCN-VAULT-BACKUP-01`): offline encrypted vault backup (blocked on Owner drive destination).
- [ ] **[LOCAL-WIP]** `CHK-139`: Task 07 (`YCN-NAV-ORIGINAL-STYLE-01`): Navigation Menu motion pilot (Technical PASS; Owner visual review and commit pending).
- [ ] **[PENDING]** `CHK-140`: Task 08 (`HOME-02-CAP-03-1024`): fix table overflow at 1024px in Capability-03 without altering approved content.
- [ ] **[PENDING]** `CHK-141`: Task 09 (`YCN-HOME-FINAL-01`): align homepage components strictly to ratified Design-to-Code Contract.
- [ ] **[PENDING]** `CHK-142`: Tasks 10–12: Content & Blueprints (10), Brand Logo Integration (11), Architecture & Lead Staging (11a/12).
- [ ] **[PENDING]** `CHK-143`: Tasks 13–17: Quality Gate RC (13), User Testing (14), Release Candidate (15), Production Launch (16), Post-Launch Operations (17).
