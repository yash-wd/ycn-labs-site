# YCN Labs — Prioritized Delivery Backlog

**Strategy:** Ship customer-facing functionality and verify real enquiry workflows under risk-tiered gates.  
**Operating Principle:** Raw command evidence strictly outranks narrative summaries.
**Governing Execution Order:** Master Plan §14.7 (`docs/YCN_MASTER_PLAN.md`).

---

## Completed Foundations
- [x] **`REPO-READINESS-00`:** Verified repository privacy, outgoing single commit, limited keyword scan 0 matches, drafted canonical context files.
- [x] **`BRAND-FIND-01`:** [SUPERSEDED] Replaced by Owner RULING-01. Authoritative 6675px master ratified; brand library established (`ycn-labs-brand-library`).
- [x] **`PUBLISH-01A`:** Clean source snapshot exported, context layer installed, audited for secrets and oversized objects.
- [x] **First Public Push:** Initialized Git on `main`, pushed to `yash-wd/ycn-labs-site` under personal SSH key with GitHub no-reply committer identity (`3a792e0`).
- [x] **Permanent Close Protocol (`YCN-CLOSE-PROTOCOL-01`):** Installed canonical `docs/CLOSE_PROTOCOL.md` and read-only `tools/close-preflight.sh`. Cross-project reconciliation and cold-resume standard ratified.

---

## Operational Tooling & Maintenance (Carried Forward)
- [ ] **State Script Integration:** Review and test proposed closer integration without overwriting existing `tools/close-day.sh` (carried forward; pending separate tooling review).
- [ ] **`BRAND-LOGO-CARRY-FORWARD` — continuity reminder only, NOT an executable logo task:** Brand repo `yash-wd/ycn-labs-brand-library`, branch `wip/brand-export-05`, last Owner-reported checkpoint `ffb7715`; canonical checklist `14_CONTINUITY/RESUME_HERE.md`. Technical exports/candidates are saved on WIP, but Owner visual acceptance, final production variants and integration are NOT COMPLETE. Do not start logo work automatically, promote WIP to `main`, or change the website logo. Coordinated CLOSE is **plan-first** pending O-08: brand local `main` was reported to contain unapproved logo commits; never publish them to `main`, and do not delete/move files without explicit approved manifest. Do not postpone tasks 03 or 11 for this reminder.

---

## Master Launch Execution Queue (Master Plan §14.7)

*Target Launch: provisional planning target 30 November 2026 (DECISION-052 O-09); 10 November is historical; reforecast once at Gate E.*

**FOUNDATION FIRST — Owner direction, 14 October 2026 (execution hold, NOT a second Master Plan):** Tasks **07–09 code execution PAUSED** until foundation readiness Gate E and explicit Owner approval. Keep `docs/YCN_MASTER_PLAN.md` §14 and its task IDs authoritative. Foundation gates: **A** — **COMPLETE for business policy (DECISION-052, 14 Oct 2026)**; YCN-DOWNLOADS-VERIFY-01 PASS (no unique loss; 6 copies unhashed; no full inventory); open items remain release prerequisites; **B2** — **COMPLETE (YCN-GATE-B2-DESIGN-01, 15 Oct 2026)**; design-system rules committed; tasks 07/07b/08/09 still paused until Gate E; **C/D** — **COMPLETE for documentation/architecture approval only (YCN-ARCH-V1-01, 15 Oct 2026)**; 11a architecture v1.0 Owner-approved 15 Oct 2026 (YCN-ARCH-V1-01); implementation NOT STARTED; legal clearance NOT GRANTED; **B1** — **COMPLETE for canonical copy and page reviews (DECISION-053/054)**; H-03/W-06 and Task 10/12 deltas to Gate E; **E** — cross-check business, content, design, HLD/LLD, legal gates, acceptance tests and first bounded coding task by **21 Oct**. The `vnext` pack and existing requirements/claims register remain controlling within their delegated subjects. No new master plan, speculative CRM/invoicing/SaaS, or UI coding during foundation hold. Unapproved legal copy, consent, and logo remain open. Independently authorised P0 vault backup (03) and live-domain/claims containment (04) may proceed without waiting for UI coding. Raw animation proof stays in the private vault; separately review adding `/proof/` to `.gitignore` before any future proof capture (NOT changed by this docs-only task).

- [x] **`YCN-SEAT-SHARED-OWNERSHIP-01`:** [COMPLETED by reviewed governance commit] Permanent Three-Seat Shared Ownership, Adaptive Leadership, and Cold-Start Verification Gate established across 8 documents (`AGENTS.md`, `START_HERE.md`, `INDEX.md`, `OPERATING_PROTOCOL.md`, `OWNER_WORKING_ROUTINE.md`, `CLOSE_PROTOCOL.md`, `STATE.md`, `BACKLOG.md`).
- [x] **`00 YCN-PLAN-ADOPT-01`:** [PUBLISHED at `df13f17`] Appended reviewed Section 14 to existing master plan; added §12/vNext pointers; aligned BACKLOG/STATE; documentation adopted.
- [x] **`01 YCN-DEV-GENERATION-01`:** [PUBLISHED at `b3a1884`] Configure `agentRules: false` in `next.config.mjs`, ignore and untrack `next-env.d.ts`, prevent dirty worktree on `next dev` startup.
- [x] **`02 YCN-INCIDENT-RECON-01`:** [ACCEPTED by Owner] Accept DEV-VIEW-01 corrected report; assess cause and no-silent-restore rule without replay/destruction.
- [ ] **`03 YCN-VAULT-BACKUP-01`:** Exact approved destination; encrypted copy and checksum/restore verification; no deletes (retains outstanding Owner dependency: destination selection).
- [x] **`04 YCN-DEPLOY-LIVE-CLAIMS-01`:** Deployment identification and live claims investigation COMPLETE (`ycnlabs-staging`, repo `yash-wd/ycnlabs:main`, commit `6a017e0`).
- [ ] **`YCN-LIVE-CLAIMS-HOTFIX-01`:** Live-claims hotfix code pushed to historical branch `hotfix/live-claims-2026-10` (commit `5b0d971`); local production render verification passed; final Vercel Preview acceptance, build warnings review, and production promotion pending Owner decision; `origin/main` unchanged at `6a017e0`.
- [-] **`05 YCN-LOCAL-BASELINE-01`:** [FOLDED into 07/08 by Owner] Local gaps only, clean preflight, env names only, port status, existing proof paths and capability dimensions.
- [x] **`06 YCN-CI-GUARDS-01`:** DONE — CI green on GitHub (runs 38425048674, 38425871036, 38431450309: success).
- [ ] **`07 YCN-NAV-ORIGINAL-STYLE-01`:** PAUSED until Gate E. Read-only Menu/CTA baseline completed 14 Oct; reported Menu speed 51.65→212.45 px/s, CTA ~94.64 nominal, proof in PRIVATE vault `proof/YCN-NAV-07/`. Owner recording no longer needed. When authorised: pilot changes **only** the Menu `continuous` mode at 80 physical px/s; preserve all three CTA `accent` usages; maintain frozen HOME-01C. Future CTA migration requires a distinct Owner ruling for the Hero border-only change. Design review must address three border effects simultaneously visible on the homepage first screen (aim at no more than two conspicuous effects, not a silent cap). Two-round visual rule and full acceptance gates remain binding.
- [ ] **`08 HOME-02-CAP-03-1024`:** PAUSED until Gate E. Fix existing table overflow at 1024px in Capability-03 without changing approved content/other chapters; measure baseline table dimensions before any code change.
- [ ] **`09 YCN-HOME-FINAL-01`:** PAUSED until Gate E. Review and correct verified remaining homepage/entrance/phone/laptop/flow/FAQ defects only; keep ratified copy and frozen systems.
- [ ] **`10 YCN-PAGES-CONTENT-01`:** Route-by-route content, clear services/contact, jurisdiction/currency and claims reconciliation, correct metadata (blocked on O-01..O-06).
- [ ] **`11 YCN-BRAND-MEDIA-01`:** Approve 02a/02b or explicit existing-asset interim; integrate only approved releases, validate source/license and video rights; replace generic stock video clips with authentic YCN studio footage before production release per `public/media/SOURCES.md` (carried forward requirement; blocked on O-07).
- [ ] **`11a YCN-SYSTEM-ARCH-01`:** **v1.0 Owner-approved 15 Oct 2026 (YCN-ARCH-V1-01)** in `docs/YCN_SYSTEM_ARCHITECTURE.md`: code-grounded HLD, lead/consent LLD, analytics, SPF/DKIM/DMARC, children's-data handling, privacy/legal review map and mandatory Task 12 false-503/atomic-dedupe scenarios 4–6. Architecture documentation approved; implementation NOT STARTED; legal clearance NOT GRANTED.
- [ ] **`12 YCN-LEAD-STAGING-01`:** Validated staging env with real Postgres/Upstash/Resend, failure/retry/dedupe tests; confirm lead operator ownership (blocked on O-03/O-06/O-10 and 11a).
- [ ] **`13 YCN-QUALITY-GATE-01`:** Full lint/types/test/build on exact RC; Playwright browsers; accessibility, security/CSP report-only, performance/SEO audits.
- [ ] **`14 YCN-COMPREHENSION-01`:** Observe at least five representative nontechnical users performing find/understand/contact tasks.
- [ ] **`15 YCN-RELEASE-RC-01`:** Freeze SHA, staged smoke, domain/DNS/SSL, required env names, backup, rollback, privacy-respecting analytics live, and incident owner.
- [ ] **`16 YCN-PRODUCTION-LAUNCH-01`:** Separate authorized deploy of exact approved SHA, no incidental source changes.
- [ ] **`17 YCN-POSTLAUNCH-01`:** Operations and measurement after launch: lead SLA/response tracking, uptime/alerts, proposal funnel data from live analytics, incident playbook, maintenance backlog.
