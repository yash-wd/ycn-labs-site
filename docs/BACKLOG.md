# YCN Labs — Prioritized Delivery Backlog

**Strategy:** Ship customer-facing functionality and verify real enquiry workflows under risk-tiered gates.  
**Operating Principle:** Raw command evidence strictly outranks narrative summaries.  
**Governing Execution Order:** Master Plan §14.7 (`docs/YCN_MASTER_PLAN.md`).  
**Master Readiness Tracker:** [`docs/YCN_READINESS_CHECKLIST.md`](YCN_READINESS_CHECKLIST.md) (143-point control ledger; recorded status: 33/143 = 23.1%).  
**V1 Milestone Progress:** 7 / 15 accepted major milestones (46.7% milestone-count progress; baseline v1.1 adopted 18 Nov 2026 under DECISION-057 Clarification, updated 20 Nov 2026).

---

## 1. V1 Release Major-Milestone Baseline (Version 1.1 — 18 Nov 2026, updated 20 Nov 2026)

> **Measurement Formula:**  
> $$\text{Milestone Progress \%} = \frac{\text{Accepted Major Milestones}}{\text{Total Baseline Milestones (15)}} \times 100 = \frac{7}{15} \times 100 = 46.7\%$$  
> *Note: This represents milestone-count progress across agreed deliverables, NOT elapsed engineering hours, remaining effort, or audited launch readiness.* The denominator is fixed at 15 and may only be revised with explicit Owner approval and a versioned record. (Note on history: An earlier draft proposed 14 milestones at 28.6%, which bundled release operations into M13 and included video-dependent media; superseded before merge by this 15-milestone baseline).

| ID | Major Deliverable | Status | Acceptance Evidence / Prerequisite |
| :---: | :--- | :---: | :--- |
| **M01** | **V3 website foundation** | **[VERIFIED]** | Merged PR #33 (`120136a`). Clean rebuild, semantic tokens, Playwright test suite. |
| **M02** | **Inner pages & content alignment** | **[VERIFIED]** | Merged PR #40 (`724d943`). Ratified Hero H1, 38-test Playwright CI, founder bio clean. |
| **M03** | **Protected governance, maintenance & SEO** | **[VERIFIED]** | Merged PR #41 (`6caf77b`). GitHub `Protect main` ruleset, fail-safe SEO, 5 governance rules. |
| **M04** | **Fail-closed staging contact boundary** | **[VERIFIED]** | Merged PR #42 (`0c164a0`). HTTP 503 fail-closed guard, preview notice, disabled submit, CI run 44166441221. |
| **M05** | **Private staging deployed & verified** | **[VERIFIED — OWNER-ATTESTED]** | Netlify private staging (`ycn-labs-site-staging`) confirmed by Owner on 18 Nov 2026 deployed from `main@d9b1039`; fail-closed staging contact verified; robots disallowed; private logs; git-deploy locked; DECISION-058. |
| **M06** | **NAV-07 mobile navigation accessibility** | **[VERIFIED]** | Merged PR #44 (commit `d47fe73`). `#mobile-nav-sheet` initial focus, tab containment, background inertness, WCAG keyboard pass (`YCN-NAV-07-A11Y-01`). |
| **M07** | **Homepage hero visual prototype & wording** | **[VERIFIED — OWNER-ACCEPTED]** | Prototype `YCN_M07_Candidate_04_Hero_Polish.html` (SHA-256 `d779c92af7b339ec9146118c381e8c37d4219f9d86f561706e121852249e748f`) accepted by Owner on 20 Nov 2026. Ratified 6-capability showroom scope and lightweight two-device hero; DECISION-059. |
| **M08** | **Six-mode hero & showroom implementation** | `[IN PROGRESS]` | Component implementation (M08-A Foundation **[VERIFIED]** merged PR #45 at `cf6932c`; M08-B interactive device interiors Websites/Web-apps/CRM `[LOCAL-WIP]` on `wip/YCN-M08-B-SHOWROOM-DEMOS-01`; M08-C Automation `[PENDING]`; M08-D Online Store & Learning Hub `[PENDING]`). |
| **M09** | **Responsive, accessibility & performance polish** | `[PENDING]` | 375/768/1024/1280/1440 px multi-viewport audit, color contrast min 4.5:1, reduced-motion pass. |
| **M10** | **First approved blog publication & SEO** | `[PENDING]` | Editorial content approved by Owner, factual verification, structured metadata, sitemap check. |
| **M11** | **Owner business inputs & estimate pilot** | `[PENDING]` | Attributable case details, pricing guidance, legal entity confirmation, enquiry handling test. |
| **M12** | **Legal pages & privacy clearance** | `[PENDING]` | Privacy policy and Terms finalized from business facts; counsel review; privacy claims reconciled. |
| **M13** | **Enquiry operations, monitoring & backups** | `[PENDING]` | Real DB/Resend staging enquiry acceptance; monitoring payload scrub test; backup & rollback verification. |
| **M14** | **Real-device audits & release candidate** | `[PENDING]` | Physical Android/iPhone verification, WebKit check, 5-person comprehension test pass. |
| **M15** | **Owner-authorized production launch** | `[PENDING]` | DNS cutover, production secrets provisioning, post-launch smoke test, release tag. |

### Parallel Track (Outside V1 Launch Denominator)
- **`MEDIA-01` (Gallery Videos & Homepage Discovery):** Dedicated `/gallery` or `/media` page showcasing recorded client project demonstrations, business awareness videos, and social media channels; plus homepage discovery route. Tracked in parallel as media assets are produced by the Owner; does not gate or block the V1 launch percentage.

---

## 2. Current Work — 22 November 2026 (supersedes older ordering below)

- [x] **M08-A Foundation (`YCN-M08-A-FOUNDATION-01`):** **[VERIFIED]** Merged PR #45 into `main` at `cf6932c4f3647a60331c0a207bd1e8864a1f5e22`. Modular hero & showroom foundation (`HeroSection.tsx`, `HeroDeviceVisual.tsx`, `ShowroomFoundation.tsx`, `showroomModes.ts`), dev-only preview route `app/m08-preview/page.tsx`, and 21 unit tests.
- [ ] **M08-B Showroom Demos (`YCN-M08-B-SHOWROOM-DEMOS-01`) [LOCAL-WIP]:** Interactive demonstration interiors for Websites (`ExampleWebsite.tsx`), Web apps (`ExampleWebApp.tsx`), CRM & admin (`ExampleCrmAdmin.tsx`), and device shells (`ExampleDeviceFrames.tsx`). 40 Vitest unit tests passing across foundation and demos suites; dedicated `playwright.m08-dev.config.ts` running against local dev server capturing 36-screenshot matrix; isolated CI job `dev-preview-chromium` added to `.github/workflows/ci.yml`. Strictly bounded within 14 permitted files.
- [ ] **M08-C Showroom Automation (`YCN-M08-C-SHOWROOM-AUTOMATION-01`) [PENDING]:** Interactive demonstration interior for Automation product type.
- [ ] **M08-D Showroom Online Store & Learning Platform (`YCN-M08-D-SHOWROOM-STORE-LEARNING-01`) [PENDING]:** Interactive demonstration interiors for Online store and Learning platform product types.
- [ ] **`MEDIA-01` [PENDING]:** Dedicated media / gallery page for client project screen recordings, educational videos on web development & apps for business owners, and social media channels; plus landing/homepage section routing to this page.
- [ ] **Privacy, Terms & Legal Copy:** Complete legal review; resolve unsupported ContactForm statement `"We respect your privacy. No data is shared or sold."` in conjunction with Privacy policy (Task PR #35 / legal clearance).
- [ ] **Pre-Launch Operational Verification:** Real database and email acceptance against configured staging service, operational monitoring alert check, durable backup & rollback dry-run, WebKit and physical device testing, and 5-person comprehension testing before public cutover.
- [ ] **Owner Visual Refinements:** Consolidate Owner design suggestions and backlog enhancements into a single prioritized, bounded post-merge design task.

---

## 3. Current Work — 20 November 2026

- [x] **M06 NAV-07 Mobile Navigation Accessibility Remediation (`YCN-NAV-07-A11Y-01`):** **[VERIFIED]** Merged PR #44 into `main` at `d47fe73cc1eabbfad74d599fe3a66e309418a985`. Remediated `#mobile-nav-sheet` focus management, tab containment, background inertness, and keyboard controls. Verified on GitHub Actions (`quality` and `gitleaks`).
- [x] **M07 Homepage Hero Visual Prototype & Interactive Showroom Direction:** **[VERIFIED — OWNER-ACCEPTED]** Candidate 04 Hero Polish prototype (`YCN_M07_Candidate_04_Hero_Polish.html`, SHA-256 `d779c92af7b339ec9146118c381e8c37d4219f9d86f561706e121852249e748f`) formally accepted by Owner on 20 Nov 2026. Ratified 6-capability showroom scope and lightweight two-device hero (DECISION-059).
- [ ] **M08 Six-Mode Hero & Showroom Implementation (`YCN-M08-A-FOUNDATION-01` & `YCN-M08-B-SHOWROOM-DEMOS-01`):**
  - [ ] **M08-A Foundation (`YCN-M08-A-FOUNDATION-01`) [LOCAL-WIP]:** Modular components implemented under `components/m08/`, dev-only preview route `app/m08-preview/page.tsx` (returns 404 in production/staging), 337 unit tests green, 56 Chromium tests passed on CI (run 44685233655), Next.js 16.3.6 production build passed. PR #45 open as Draft; awaiting final review.
  - [ ] **M08-B Interactive Demos (`YCN-M08-B-SHOWROOM-DEMOS-01`) [PENDING]:** Interactive device interior implementations for the 6 showroom products (Websites, Web apps, Automation, CRM & admin, Online store, Learning platform).
- [ ] **`MEDIA-01` [PENDING]:** Dedicated media / gallery page for client project screen recordings, educational videos on web development & apps for business owners, and social media channels; plus landing/homepage section routing to this page.
- [ ] **Privacy, Terms & Legal Copy:** Complete legal review; resolve unsupported ContactForm statement `"We respect your privacy. No data is shared or sold."` in conjunction with Privacy policy (Task PR #35 / legal clearance).
- [ ] **Pre-Launch Operational Verification:** Real database and email acceptance against configured staging service, operational monitoring alert check, durable backup & rollback dry-run, WebKit and physical device testing, and 5-person comprehension testing before public cutover.
- [ ] **Owner Visual Refinements:** Consolidate Owner design suggestions and backlog enhancements into a single prioritized, bounded post-merge design task.

---

## Current Work — 18 November 2026 (supersedes older ordering below)

- [x] **PR #42 (`YCN-STAGING-ISOLATION-01`):** Merged into `main` at `0c164a0ce42cba011f83a85272723d8835f9c27e` (reviewed head `36b6779`). Fail-closed server contact guard (`503 SERVICE_UNAVAILABLE`), preview notice, disabled submit button, pre-hydration form safety, two-config CI, synthetic preview test, verified on GitHub CI and Gitleaks.
- [x] **PR #43 (`YCN-OPS-PLAYBOOK-01`):** Merged into `main` at `d9b10396acb661ea77ae60f41165f073c5bc12f4` (reviewed head `7de125f`). Adopted Five-Seat AI Delivery Playbook (`docs/YCN_AI_DELIVERY_PLAYBOOK.md`), numbered routing protocol (#1 to #5), faster delivery governance, DECISION-057, milestone briefings, safe CLOSE contract, verified on GitHub CI (run 44260276078) and Gitleaks (run 44260276117).
- [x] **M05 Private Netlify Staging Deployment & Verification:** **[VERIFIED — OWNER-ATTESTED]** Netlify project `ycn-labs-site-staging` deployed from `main@d9b1039`. Verified staging env variables, fail-closed contact form HTTP 503, robots disallow, private access, locked auto-publishing, private logs, and git-based deployment enforcement (DECISION-058). No production deployment or DNS decision.
- [ ] **M06 NAV-07 Mobile Navigation Accessibility Remediation (`YCN-NAV-07-A11Y-01`) [IN PROGRESS]:** Remediate mobile navigation accessibility defects without navbar redesign: initial focus on opening, tab/shift-tab containment, background inertness and interaction blocking, Escape and capsule focus restoration, route change focus safety, mobile-to-desktop resize cleanup, exit-animation panel non-interactivity, and Playwright browser regression test suite.
- [ ] **`MEDIA-01` [PENDING]:** Dedicated media / gallery page for client project screen recordings, educational videos on web development & apps for business owners, and social media channels; plus landing/homepage section routing to this page.
- [ ] **Privacy, Terms & Legal Copy:** Complete legal review; resolve unsupported ContactForm statement `"We respect your privacy. No data is shared or sold."` in conjunction with Privacy policy (Task PR #35 / legal clearance).
- [ ] **Pre-Launch Operational Verification:** Real database and email acceptance against configured staging service, operational monitoring alert check, durable backup & rollback dry-run, WebKit and physical device testing, and 5-person comprehension testing before public cutover.
- [ ] **Owner Visual Refinements:** Consolidate Owner design suggestions and backlog enhancements into a single prioritized, bounded post-merge design task.

---

## 3. Deferred Growth & Improvement Triggers

- **`GROWTH-01` (#1 First-Clients Plan):** #1 first-clients plan; Owner's sector and offer decisions are due now at the next business review.
- **`GROWTH-02` (Prospect Shortlist):** Owner's private list of up to 20 prospects; prepare after GROWTH-01 approval. No geographic restriction unless Owner specifies one.
- **`EARLY-UX-01` (Five Supervised Demonstrations):** Five supervised demonstrations to real people selected by Owner. M05 trigger reached. Do not represent this as M14 final acceptance.
- **`AI-TRIAL-01` (Free-AI Public Prospect-Research Trial):** Optional one-week free-AI public prospect-research trial. M05 trigger reached; execution requires Owner approval and #1 supervision. Every entry must have a source link; #1 validates a sample. No additional permanent seat or private data.
- **`PRICE-01` (Starting-Price Research):** #1 sourced starting-price research before public price commitments or quotations, when Owner authorizes.
- **`GROWTH-03` (Direct 1-to-1 Outreach):** Individually approved one-to-one outreach only after M15 public launch, starting-price decisions and one credible real project ready to show.
- **`SOCIAL-01` (Brand Social Channels):** Review LinkedIn and Google Business Profile setup after M15; verify business eligibility and details before publishing.
- **`SEC-OPINION-01` (External Security Opinion):** Optional one-off different-model assessment at any material security gate, using a public commit only; not an automatic extra approval authority.
- **`OPS-MARKETING-CAPACITY` (Marketing Capacity Review):** Review a separate marketing seat only after launch, if measured #1 workload demonstrates overload.
- **`MEDIA-01` Subtriggers (Original Video Roadmap):** Videos 1–2 may be prepared after M05; videos 3–4 after M08 hero implementation. Preserve client-media permission boundaries (under DECISION-052/DECISION-054, no client screen recordings, code, or identifiable assets may be featured without explicit prior written authorization).

### Reporting Rule: Parked Items Now Due
- In standardized milestone delivery briefings, #2 Working GPT explicitly reports eligible parked items whose milestone trigger has been reached (e.g. M05 reaching EARLY-UX-01, GROWTH-01 decisions, AI-TRIAL-01 consideration, and MEDIA-01 videos 1–2).
- Purely a manual reporting protocol in seat handovers; no automated notifications or alerts are claimed.

---

## Current Work — 17 November 2026

- [x] **PR #40 (Inner Pages & Content Alignment):** Merged into `main` at `724d94320098dd073ec2f67bebd1fec8c8456ed6` (reviewed head `350383d`). Added 38-test Chromium Playwright suite to CI, ratified Hero H1 per DECISION-056, reconciled founder/specialists copy, removed unapproved commercial promises, restored Contact reassurance and strict test guards, qualified Engineering claims and simulator.
- [x] **Repository Protection (`Protect main`):** GitHub branch protection ruleset enabled on default branch `main`, requiring pull requests and `quality` + `gitleaks` checks, blocking force pushes and branch deletions.
- [x] **PR #41 (Post-Merge Maintenance & Records):** Merged into `main` at `6caf77b658e83c66a122c4a1ceabfac93acb5fa0` (reviewed head `7a3c5eb`). Updated `AGENTS.md` with 5 governance rules, updated SEO fail-safe behavior in `app/robots.ts` and `app/sitemap.ts`, added SEO regression tests (`__tests__/post-merge-seo.test.ts`).
- [ ] **`YCN-STAGING-ISOLATION-01` [LOCAL-WIP / Awaiting Review]:** Implemented fail-closed server contact guard (`503 SERVICE_UNAVAILABLE`) in `app/api/contact/route.ts`, preview notice and disabled submit button in `components/ContactForm.tsx`, pre-hydration / No-JS form safety with POST method, two-configuration CI in `.github/workflows/ci.yml`, and 13 isolation/precedence/No-JS tests in `__tests__/staging-isolation.test.ts`. All 316 unit tests passing.
- [ ] **Protected Staging Trial:** Separate hosting and Owner authorization (Netlify staging preview with isolated credentials; no production deployment).
- [ ] **Mobile Navigation Accessibility Remediation:** Fix confirmed focus transfer, tab containment, and background inertness defects on `#mobile-nav-sheet` (separate Owner-authorized `NAV-07` remediation task).
- [ ] **Privacy, Terms & Legal Copy:** Complete legal review; resolve unsupported ContactForm statement `"We respect your privacy. No data is shared or sold."` in conjunction with Privacy policy (Task PR #35 / legal clearance).
- [ ] **Pre-Launch Operational Verification:** Real database and email acceptance against configured staging service, operational monitoring alert check, durable backup & rollback dry-run, WebKit and physical device testing, and 5-person comprehension testing before public cutover.
- [ ] **Owner Visual Refinements:** Consolidate Owner design suggestions and backlog enhancements into a single prioritized, bounded post-merge design task.

### Open Decisions & Carry-Forward Ledger (17 Nov 2026)

- **Repository Visibility:** Repository remains public for now; Owner will make a separate decision regarding repository privacy prior to production launch.
- **SEO Metadata Alignment:** `app/layout.tsx` metadata retains older title/description; to be reconciled with the ratified H1 in a future separately approved SEO task.
- **Permanent Close Protocol:** Workstation sessions remain OPEN until the Owner gives the explicit typed word `CLOSE` per `docs/CLOSE_PROTOCOL.md`.
- **Master Readiness Checklist:** Reconcile master 143-point readiness tracker in `docs/YCN_READINESS_CHECKLIST.md` following maintenance merge.
- **Off-Device Backup & Tooling Review:** Off-device private vault backup verification pending; review reported change to `tools/copy_plan.py` (location unverified; not tracked in repository).
- **Owner Pending Business Inputs:** Founder facts and photograph, real attributable project details, starting price guidance, hosting provider decision, designated secondary enquiry responder, and legal/CA review.

---

## Current Work — 13 November 2026 (supersedes older ordering below)
- [x] **V3 front-end rebuild (Option B), PR #33:** hero, homepage, inner pages, contact channels, tokens, archive, GPT findings F1–F5, Work/About links, WhatsApp button, media clean-up, static signal borders, hero still frame without JavaScript.
- [x] **Browser test suite:** `pnpm test:e2e` (Playwright, local production build, Chromium + Firefox).
- [x] **Monitoring prepared (PR #33):** Sentry off until `SENTRY_DSN` is set; allow-list sends only the error type, fixed route/stage/error-category tags, a UUID request ID, project-relative code location (file under app/, lib/ or components/, function, line), environment and time; request paths, messages, other extra data and contexts are dropped. This is a filter, not a guarantee: before switching it on, inspect real error payloads from synthetic enquiries on a production build (privacy and usefulness) and confirm a test alert reaches a named person. Live alert not verified (deferred).
- [ ] **Owner read-only deploy check before any merge:** installed GitHub Apps' access to `ycn-labs-site`, and any host project linked to it (see STATE.md).
- [ ] **Merge:** this docs PR, then PR #33 at exact SHAs (Owner).
- [ ] **Privacy and Terms:** rewrite from the vault fact sheet, then lawyer review (Owner supplies business facts O1–O10).
- [ ] **Asset decisions:** `docs/ASSET_MANIFEST.md` (intro film, desk photos, unused logo sizes).
- [ ] **Real phones and WebKit:** Android/iPhone checks; Playwright WebKit needs a machine with its system libraries (WebKit tests are not real Safari/iPhone tests).
- [ ] **Real enquiry test:** current V3 form against a configured database and email (existing staging or local services; mocked browser tests do not count).
- [ ] **Comprehension test:** 5 business owners (Owner kept 5 on 13 Nov).
- [ ] **DEFERRED by the Owner (no subscriptions now):** hosting and protected preview, production database, live monitoring, DNS/email authentication, analytics, cutover. Launch date is set when hosting is chosen.

## Completed Foundations
- [x] **`REPO-READINESS-00`:** Verified repository privacy, outgoing single commit, limited keyword scan 0 matches, drafted canonical context files.
- [x] **`BRAND-FIND-01`:** [SUPERSEDED] Replaced by Owner RULING-01. Authoritative 6675px master ratified; brand library established (`ycn-labs-brand-library`).
- [x] **`PUBLISH-01A`:** Clean source snapshot exported, context layer installed, audited for secrets and oversized objects.
- [x] **First Public Push:** Initialized Git on `main`, pushed to `yash-wd/ycn-labs-site` under personal SSH key with GitHub no-reply committer identity (`3a792e0`).
- [x] **Permanent Close Protocol (`YCN-CLOSE-PROTOCOL-01`):** Installed canonical `docs/CLOSE_PROTOCOL.md` and read-only `tools/close-preflight.sh`. Cross-project reconciliation and cold-resume standard ratified.
- [x] **Gate E Baseline (`YCN-V2-FOUNDATION-ALIGN-01`):** [PUBLISHED at `134b0ec`, 17 Oct 2026] Foundation alignment documentation baseline published (cross-checked business facts, content, design rules, HLD/LLD, law/claims, V1 scope, runbook, discrepancy register, and acceptance criteria 07–12). Final Gate E readiness check target 21 Oct 2026; code execution hold maintained.
- [ ] **`YCN-CHECKLIST-GOVERNANCE-01`:** [LOCAL DRAFT / IN PROGRESS, 17 Oct 2026] Project-wide checklist tracking system established across canonical files; awaiting independent multi-seat review.

---

## Operational Tooling & Maintenance (Carried Forward)
- [ ] **State Script Integration:** Review and test proposed closer integration without overwriting existing `tools/close-day.sh` (carried forward; pending separate tooling review).
- [ ] **[OWNER-GATE]** **Claude Code MCP setup:** DEFERRED until a task needs it. Candidates: `shadcn-ui` MCP pinned to `@jpisnice/shadcn-ui-mcp-server@3.0.0` at user scope, and 21st MCP with a new key entered privately by the Owner. The 27 AGY design skills are already available at user scope (5 Nov 2026).
- [ ] **`BRAND-LOGO-CARRY-FORWARD` — continuity reminder only, NOT an executable logo task:** Brand repo `yash-wd/ycn-labs-brand-library`, branch `wip/brand-export-05`, last Owner-reported checkpoint `ffb7715`; canonical checklist `14_CONTINUITY/RESUME_HERE.md`. Technical exports/candidates are saved on WIP, but Owner visual acceptance, final production variants and integration are NOT COMPLETE. Do not start logo work automatically, promote WIP to `main`, or change the website logo. Coordinated CLOSE is **plan-first** pending O-08: brand local `main` was reported to contain unapproved logo commits; never publish them to `main`, and do not delete/move files without explicit approved manifest. Do not postpone tasks 03 or 11 for this reminder.

---

## Master Launch Execution Queue (Master Plan §14.7)

*Target Launch: provisional planning target 30 November 2026 (DECISION-052 O-09); 10 November is historical; reforecast once at Gate E.*

**FOUNDATION FIRST — Owner direction, 14 October 2026 (execution hold, NOT a second Master Plan):** Tasks **07–09 code execution PAUSED** until foundation readiness Gate E and explicit Owner approval. Keep `docs/YCN_MASTER_PLAN.md` §14 and its task IDs authoritative. Foundation gates: **A** — **COMPLETE for business policy (DECISION-052, 14 Oct 2026)**; YCN-DOWNLOADS-VERIFY-01 PASS (no unique loss; 6 copies unhashed; no full inventory); open items remain release prerequisites; **B2** — **COMPLETE (YCN-GATE-B2-DESIGN-01, 15 Oct 2026)**; design-system rules committed; tasks 07/07b/08/09 still paused until Gate E; **C/D** — **COMPLETE for documentation/architecture approval only (YCN-ARCH-V1-01, 15 Oct 2026)**; 11a architecture v1.0 Owner-approved 15 Oct 2026 (YCN-ARCH-V1-01); implementation NOT STARTED; legal clearance NOT GRANTED; **B1** — **COMPLETE for canonical copy and page reviews (DECISION-053/054)**; H-03/W-06 and Task 10/12 deltas to Gate E; **E** — **Foundation alignment baseline published at commit `134b0ec` (17 Oct 2026)**; cross-checking business, content, design, HLD/LLD, legal gates, acceptance tests, runbook, and discrepancy register; final Gate E readiness check target 21 Oct 2026; coding hold maintained. The `vnext` pack and existing requirements/claims register remain controlling within their delegated subjects. No new master plan, speculative CRM/invoicing/SaaS, or UI coding during foundation hold. Unapproved legal copy, consent, and logo remain open. Independently authorised P0 vault backup (03) and live-domain/claims containment (04) may proceed without waiting for UI coding. Raw animation proof stays in the private vault; separately review adding `/proof/` to `.gitignore` before any future proof capture (NOT changed by this docs-only task).

- [x] **`YCN-SEAT-SHARED-OWNERSHIP-01`:** [COMPLETED by reviewed governance commit] Permanent Three-Seat Shared Ownership, Adaptive Leadership, and Cold-Start Verification Gate established across 8 documents (`AGENTS.md`, `START_HERE.md`, `INDEX.md`, `OPERATING_PROTOCOL.md`, `OWNER_WORKING_ROUTINE.md`, `CLOSE_PROTOCOL.md`, `STATE.md`, `BACKLOG.md`).
- [x] **`00 YCN-PLAN-ADOPT-01`:** [PUBLISHED at `df13f17`] Appended reviewed Section 14 to existing master plan; added §12/vNext pointers; aligned BACKLOG/STATE; documentation adopted.
- [x] **`01 YCN-DEV-GENERATION-01`:** [PUBLISHED at `b3a1884`] Configure `agentRules: false` in `next.config.mjs`, ignore and untrack `next-env.d.ts`, prevent dirty worktree on `next dev` startup.
- [x] **`02 YCN-INCIDENT-RECON-01`:** [ACCEPTED by Owner] Accept DEV-VIEW-01 corrected report; assess cause and no-silent-restore rule without replay/destruction.
- [ ] **`03 YCN-VAULT-BACKUP-01`:** Exact approved destination; encrypted copy and checksum/restore verification; no deletes (retains outstanding Owner dependency: destination selection).
- [x] **`04 YCN-DEPLOY-LIVE-CLAIMS-01`:** Deployment identification and live claims investigation COMPLETE (`ycnlabs-staging`, repo `yash-wd/ycnlabs:main`, commit `6a017e0`).
- [ ] **`YCN-LIVE-CLAIMS-HOTFIX-01`:** Live-claims hotfix code pushed to historical branch `hotfix/live-claims-2026-10` (commit `5b0d971`); local production render verification passed; final Vercel Preview acceptance, build warnings review, and production promotion pending Owner decision; `origin/main` unchanged at `6a017e0`.
- [-] **`05 YCN-LOCAL-BASELINE-01`:** [FOLDED into 07/08 by Owner] Local gaps only, clean preflight, env names only, port status, existing proof paths and capability dimensions.
- [x] **`06 YCN-CI-GUARDS-01`:** DONE — CI green on GitHub (runs 38425048674, 38425871036, 38431450309: success).
- [ ] **`07 YCN-NAV-ORIGINAL-STYLE-01`:** [LOCAL WIP — TECHNICAL PASS, PENDING OWNER VISUAL ACCEPTANCE] Read-only Menu/CTA baseline completed 14 Oct; reported Menu speed 51.65→212.45 px/s, CTA ~94.64 nominal, proof in PRIVATE vault `proof/YCN-NAV-07/`. Technical implementation v4.0 complete in 3 files on branch `wip/YCN-NAV-07` (GSAP ticker sole owner, 80 px/s ±5% physical speed, continuous morph progression, off-screen and tab-hidden pauses, static reduced-motion highlight, 292 passing vitest tests). Technical PASS accepted by GPT and Claude. Uncommitted on `wip/YCN-NAV-07`; awaiting Owner visual review on localhost:3005 and governance word (`authorized` to commit to WIP, or `retain` as uncommitted local WIP). Pilot changes **only** the Menu `continuous` mode at 80 physical px/s; preserve all three CTA `accent` usages; maintain frozen HOME-01C. Future CTA migration requires a distinct Owner ruling for the Hero border-only change. Design review must address three border effects simultaneously visible on the homepage first screen (aim at no more than two conspicuous effects, not a silent cap). Two-round visual rule and full acceptance gates remain binding.

---

## Scheduled 3-Day Foundation & Design Alignment Program (Pre-Development)
- [ ] **Day 1: Design-to-Code Contract & 5-Viewport Homepage Audit:** Owner visual reviews (Task 07 look, 10 min; Logo sitting, 30 min); draft `docs/YCN_DESIGN_TO_CODE_CONTRACT.md` (tokens, typography, layout, components, motion); execute 5-viewport homepage audit (375, 768, 1024, 1280, 1440px) in Dark, Light, and reduced motion.
- [ ] **Day 2: Discrepancy Matrix, Migration Plan & India-First Metadata Fix:** Compile Homepage Discrepancy Matrix; draft `docs/YCN_MIGRATION_AND_CUTOVER_PLAN.md` (301 redirect map, non-git-merge migration, lead DB 12-month legal retention, rollback); fix `en_GB`/`GB` metadata in `app/layout.tsx` to `en_IN`/`IN`; multi-seat review.
- [ ] **Day 3: Owner Rulings & Foundation Package Lock:** Owner rulings on frozen system collisions, logo variant promotions (`04_APPROVED_LOGO_VARIANTS/`), Neon data strategy, and staging isolation; lock and commit foundation documentation.

---
- [ ] **`08 HOME-02-CAP-03-1024`:** PAUSED until Gate E. Fix existing table overflow at 1024px in Capability-03 without changing approved content/other chapters; measure baseline table dimensions before any code change.
- [ ] **`09 YCN-HOME-FINAL-01`:** PAUSED until Gate E. Review and correct verified remaining homepage/entrance/phone/laptop/flow/FAQ defects only; keep ratified copy and frozen systems.
- [ ] **`10 YCN-PAGES-CONTENT-01`:** Route-by-route content, clear services/contact, jurisdiction/currency and claims reconciliation, correct metadata (blocked on O-01..O-06). *Scope includes OI-19 privacy notice copy and enquiry handling separation from marketing permissions.*
  - **Task 10b progress (5 Nov 2026):** Done: Owner copy rulings (PR #17), ownership wording aligned to DECISION-054 (PR #18), contact-form "Build a product" stored value (PR #20). Service list settled: business websites, selected web applications, scoped automation and integrations, optional paid maintenance.
  - [x] Founder/About section: implemented with Owner-approved wording (PR #22, 9 Nov 2026). A real founder photograph is a separate later task (hidden photo slot until the Owner supplies the file; no placeholder).
  - [ ] **[OWNER-GATE]** Business inputs: legal entity name and city, a genuine portfolio project or "none", INR pricing wording, three testers.
  - [ ] **[CONFIRMED 10 Nov 2026, legal]** `app/privacy/page.tsx` §4 says "Under UK and GDPR data protection regulations" on an India-first site. Counsel-approved wording needed before launch (Task 15 legal scope).
  - [ ] **[Owner 10 Nov 2026]** Phone/WhatsApp contact channel on `/contact` (number approved; pre-launch; own task).
  - [ ] **[Owner 10 Nov 2026, POST-LAUNCH]** Visual-first inner pages ("One enquiry, three screens", Work and What We Solve visuals) and the About/Work copy distill. Owner decision: launch first, visuals after.
- [ ] **`11 YCN-BRAND-MEDIA-01`:** Approve 02a/02b or explicit existing-asset interim; integrate only approved releases, validate source/license and video rights; replace generic stock video clips with authentic YCN studio footage before production release per `docs/MEDIA_SOURCES.md` (moved from `public/media/` on 14 Nov 2026; carried forward requirement; blocked on O-07).
  - [x] **[PRE-LAUNCH, Owner 9 Nov 2026]** *(Resolved by removal: the Hero images on 13 Nov 2026, commit `7904460`, and the entrance films on 14 Nov 2026, branch `wip/YCN-ASSETS-PRUNE-01`, both by Owner decision. The old media files below are no longer present in `public/` and are not requested by the currently bypassed entrance.)* Confirm the source, licence and usage rights of the entrance films (`public/entrance/ycn-intro-final-{landscape,portrait}-v5.mp4`), the Hero photographs (`public/media/hero/ycn-hero-team-v1.webp`, `ycn-hero-device-v1.webp`) and the formerly used Hero device image (`ycn-hero-device-ui-v2.webp`). None is recorded in `public/media/SOURCES.md` (now `docs/MEDIA_SOURCES.md`, a historical provenance record) or `/credits`. The film is currently bypassed (DECISION-048 Amendment 1).
- [ ] **`11a YCN-SYSTEM-ARCH-01`:** **v1.0 Owner-approved 15 Oct 2026 (YCN-ARCH-V1-01)** in `docs/YCN_SYSTEM_ARCHITECTURE.md`: code-grounded HLD, lead/consent LLD, analytics, SPF/DKIM/DMARC, children's-data handling, privacy/legal review map and mandatory Task 12 false-503/atomic-dedupe scenarios 4–6. Architecture documentation approved; implementation NOT STARTED; legal clearance NOT GRANTED.
- [x] **`12 YCN-LEAD-STAGING-01`:** **[VERIFIED]** Lead Reliability & Staging Acceptance verified across four distinct evidence layers on `main` (`3804259`, PR #13 `361d5d2`, PR #15 `3804259`):
  1. *Automated Test Contracts:* Vitest regression suite passing 20/20 files, 302/302 tests (exit code 0); covers storage failure, email failure isolation, idempotency deduplication, rate limiting, and phone format acceptance.
  2. *Live API Boundary Tests:* Local HTTP API verified: Scenario 1 accepted (200, `data.accepted: true`), Scenario 2 honest storage failure (503, `STORAGE_FAILURE`, zero false receipt), Scenario 4 concurrent idempotency (Req 1 200, Req 2 200 `duplicate: true`, single DB insert), Scenario 5 validation rejection (400, `INVALID_INPUT`, field errors), and Phone format API accepted (200).
  3. *Live Owner-Verified Neon & Zoho:* Real enquiry #1 accepted, stored in Neon `ycn_staging`, delivered to Zoho (`hello@ycnlabs.com`); Scenario 3 email failure isolation verified (lead committed in Neon, `notification_status: failed`, `attempts: 1`; recovery executed via `scripts/recover-leads.ts --retry` → transitioned to `sent`, `attempts: 2`, single retry email received in Zoho); Scenario 4 idempotency SQL verified in Neon (`matching_rows = 1`).
  4. *Physical Device Verification:* Form submission verified from physical Android phone via local production build (`next start`) on Wi-Fi LAN; mobile UI controls (Improvement Goal highlight, message inputs, timeline select) confirmed responsive; on-screen success receipt displayed; matching operator notification received in Zoho at 10:35 AM IST (`lead_13df30cb…`, exact identifier preserved in vault); Neon row verified by Owner in SQL console (`accepted / sent / 1 attempt`). Earlier dev-mode GET reloads documented as dev-mode failure (cause hypothesised, not proven); no mobile-form change required; staging database holds 8 test leads total (AGY-reported; 7 prior + 1 phone lead).
  Not yet verified; carried forward to Tasks 13/15: delivery/bounce webhooks, Sentry error-monitoring and alert verification, and named primary/backup lead-operator ownership (O-03/O-06/O-10, OI-19). These capabilities must not be represented as verified or production-ready until their respective acceptance gates pass.
- [ ] **`13 YCN-QUALITY-GATE-01`:** Full lint/types/test/build on exact RC; Playwright browsers; accessibility, security/CSP report-only, performance/SEO audits. *Scope includes OI-19 verification: privacy-respecting aggregates, cookieless audience measurement, no cross-site identifiers.*
  - [ ] **[CONFIRMED 10 Nov 2026]** CSP is partial: `next.config.mjs` sets only `frame-ancestors 'none'` (plus X-Frame-Options and HSTS). Broader policy and headers to be verified on a deployed preview.
  - [ ] **[CONFIRMED 10 Nov 2026]** Rate limiting: verify trusted client-IP (`x-forwarded-for`) handling behind the real proxy and behaviour when Redis is configured but unreachable. (Without credentials the limiter passes requests; production refuses to start without them, `lib/env/server.ts`.)
  - [ ] **[UNKNOWN]** Performance: no Lighthouse/LCP measurement exists for the current build; historical figures (mobile 93, LCP 2.63 s) predate the 9–10 Nov hero changes.
  - [ ] **[CONFIRMED 10 Nov 2026]** No end-to-end tests in the repo or CI; Firefox/WebKit untested (Chromium only).
  - [ ] **[Later, Owner OK needed]** Remove unused `clsx` and `tailwind-merge`; archive 10 unreachable legacy components (import trace 10 Nov 2026). Post-launch.
- [ ] **`14 YCN-COMPREHENSION-01`:** Observe at least five representative nontechnical users performing find/understand/contact tasks.
  - [ ] **[DECISION NEEDED]** Sample size conflict: this line says five; the Lean Launch annotation (Task 14, below) says three. Owner to fix one number before testing.
- [ ] **`15 YCN-RELEASE-RC-01`:** Freeze SHA, staged smoke, domain/DNS/SSL, required env names, backup, rollback, privacy-respecting analytics live, and incident owner. *Scope includes OI-19 production uptime/error alerting verification.*
  - [ ] **[CONFIRMED 10 Nov 2026, HIGH]** Sentry is not initialised: the SDK is installed and `app/api/contact/route.ts` calls `Sentry.captureException`, but there is no `Sentry.init`, instrumentation file or `withSentryConfig`. Alert delivery is unverified. Needs its own approved task (DSN entered privately by the Owner) and one verified test alert.
  - [ ] **[CONFIRMED 10 Nov 2026]** `/api/health` is a liveness check only (static `ok`); it does not test the database, Redis or email. Decide whether a dependency-readiness check is needed for monitoring.
  - [ ] **[REPORTED, decision needed]** The architecture's privacy-notice/consent-evidence tables are not in `lib/db/schema.ts` (only `leads`, `newsletter_signups`). Counsel and Owner to decide whether V1 needs them.
  - [ ] **[REPORTED]** Named primary and backup lead operators are not recorded; required before launch.
  - [ ] **[REPORTED]** Redirect inventory from the old site (`yash-wd/ycnlabs`) before domain cutover; `next.config.mjs` currently has one redirect (`/what-we-build`).
  - [ ] **[UNKNOWN]** Off-device backup of the private vault: the 18–19 Oct archives are on the same SSD; whether the 6 Nov Google Drive upload included the vault is unverified.
  - [ ] **[UNKNOWN as of 10 Nov; see STATE Deployment check, 13 Nov]** Whether any hosting project is linked to this repository (pending Owner check); the current content of `ycnlabs.com` (old site, claims hotfix) was not checked on 10 Nov.
  - **Legal review scope (5 Nov 2026):** include `/terms` §2 ownership and portfolio-permission wording, which conflicts with DECISION-054 and DECISION-052 O-05. Not changed in PR #18; needs counsel and an Owner ruling.
- [ ] **`16 YCN-PRODUCTION-LAUNCH-01`:** Separate authorized deploy of exact approved SHA, no incidental source changes.
- [ ] **`17 YCN-POSTLAUNCH-01`:** Operations and measurement after launch: lead SLA/response tracking, uptime/alerts, proposal funnel data from live analytics, incident playbook, maintenance backlog.

---

## Postlaunch & vNext Proposed Candidates (Unnumbered / Proposal Only)
- **`POSTLAUNCH-VNEXT-CANDIDATES`:** Evaluated features proposed under OI-19 (blog-related shares, promotional offers, save/install shortcuts, user-initiated optional push notifications). Kept as candidate inventory; not ratified for V1. Tasks 18/19 are proposals pending explicit Owner ruling.

*OI-19 Operational Decisions Pending Owner Ruling: Notification hub destination (Telegram / Slack / Dedicated Email / Internal Dashboard), Task 18/19 formal creation, and Lean vs Full execution path remain UNDECIDED.*

---

## Lean Launch Scope Annotations (DECISION-055 Proposed)

The following execution scope adjustments apply to existing task IDs 07–17 upon DECISION-055 adoption:

- **Task 07 (Navigation):** Single pilot for Menu perimeter morph (`continuous` mode, 80 px/s). Pending Owner visual verdict (`visual pass` or `drop`). No further animation cycles.
- **Task 08 (Capability-03 Overflow):** Focused fix for 1024px and 375px table overflow on Capability-03 without changing surrounding layout.
- **Task 09 (Homepage Polish):** Bounded mobile LCP check on a consumer device over 4G; if LCP > 2.5s, serve static hero on mobile. No new visual features.
- **Task 10 (Pages Content & Privacy):** Route-by-route India-first content pass (`en_IN`, INR pricing defaults, "Not sure yet" budget option, founder bio on About, concise DPDP notice on `/contact`).
- **Task 11 (Brand Media):** Web-sized logo assets generated from 8K master (no crops, no new artwork). Authentic media only.
- **Task 12 (Lead Reliability):** 5 core failure-boundary integration journeys (valid lead, DB down, post-commit email failure preserves lead, idempotency deduplication, invalid input rejection). DB commit is sole durability barrier. Staging accounts established by Owner; fallback to direct verified email if blocked.
- **Task 13 (Quality Assurance Gate):** Cross-browser and device QA across mobile 375px, keyboard accessibility, Dark/Light modes, and automated test suite.
- **Task 14 (Comprehension):** Informal review by showing the site to three local business owners and observing navigation.
- **Task 15 (Release Candidate):** Environment verification, single-rule Sentry error capture, cookieless analytics, DNS cutover preparation, rollback rehearsal.
- **Task 16 (Production Launch):** Authorized deployment to `ycnlabs.com` upon Owner command on exact verified commit.
- **Task 17 (Postlaunch Operations):** Handover to maintenance mode (≤ 3 hours/week); 30-day post-launch fix window; customer acquisition outreach active.
