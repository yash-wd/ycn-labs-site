# YCN Labs — Prioritized Lean Launch Backlog (DECISION-055)

**Strategy:** Ship an authentic, high-speed, 18-route studio website and acquire real clients.
**Governing Authority:** DECISION-055 (`docs/decisions/DECISION-055-LEAN-LAUNCH-STRATEGY.md`)
**Launch Target:** 15 November 2026 (Provisional fallback: 30 November 2026)
**Execution Model:** Single builder (AGY) opens GitHub PRs; Single reviewer (GPT/Claude) reviews diffs; Owner merges.
**Readiness Standard:** 10-Point Launch Gate (`docs/INDEX.md` §3).

---

## 1. Active Launch Sprint Queue (4-Week Path to Release)

| Task ID | Workstream / Task Name | Target Date | Status & Next Action | Reviewer |
| :--- | :--- | :--- | :--- | :--- |
| **Task 07** | Navigation Perimeter Morph Pilot | 19 Oct | **Awaiting Owner Visual Ruling:** Dev server active on `http://localhost:3005` (`task-612`). 292 tests pass. Owner says `visual pass` (merge to main) or `drop`. | Claude |
| **Hotfix** | Historical Production Claims Hotfix | 19 Oct | **Awaiting Owner Decision:** Commit `5b0d971` pushed to `hotfix/live-claims-2026-10`. Owner says `promote` or `hold`. | GPT |
| **Task 03** | Essential Vault Disaster Recovery | 19 Oct | **Packaged:** ~55 MB encrypted archive in `proof/YCN-VAULT-BACKUP-01/`. Ready for 10-minute copy to physical USB and cloud drive. | Owner |
| **Task 12** | Staging Lead Reliability Integration | 21–25 Oct | **Ready for Code:** 5 core failure-boundary tests; PostgreSQL idempotency; commit-first HTTP 200 delivery (never false 503). Branch `wip/YCN-LEAD-STAGING-12`. | GPT |
| **Task 08** | Mobile Performance & 1024px Overflow | 26–28 Oct | Fix Capability-03 1024px / 375px overflow. Test LCP on consumer phone on 4G. | Claude |
| **Task 10** | Content, INR Pricing & Legal Notice | 29 Oct–2 Nov | INR budget options ("Not sure yet"), founder bio on `/about`, DPDP privacy notice on `/contact`, mailboxes (`hello@`, `privacy@`). | GPT |
| **Task 13** | Honest Work Showcase & Proof Demo | 3–6 Nov | Rebuild `/work` around Internal Case Study #1 (measured metrics) + 1 interactive local business workflow demonstration. | Claude |
| **Task 15** | Infrastructure, Sentry & Domain Cutover | 7–10 Nov | Vercel Pro ($20/mo), Neon, Resend, Sentry single-rule error capture, DNS configuration. | GPT |
| **Task 17** | Final 10-Point Gate & Release | 11–15 Nov | Complete 10-Point Launch Gate, live test lead verification from phone, DNS cutover, tag `v1.0-launch`. | All Seats |

---

## 2. Completed Foundations
- [x] **`035e142` Governance Foundation Merge:** Checklist system, Task Gate, Owner Instructions Register (OI-01 to OI-19), and design contracts published on `main`.
- [x] **DECISION-055 Strategic Reset:** Unanimously adopted by all seats. Parked speculative features, established 10-point gate, and instituted 1-builder/1-reviewer PR workflow.
- [x] **Master Decisions Stack (`docs/decisions/`):** Unified all 55 decisions structurally in one folder with full index and lookup table.
- [x] **Project Stack Map (`docs/PROJECT_STACK.md`):** Unified folder architecture defined under `/home/ycn-labs/Desktop/ycn-labs-site`.
- [x] **Brand Master Unified:** 8K Master logo (`Main_YCN_LABS_logo_black_8K.png`) imported into `docs/brand/` and `public/brand/`.
- [x] **Automated Test Baseline:** 280+ tests passing, 0 type errors, 0 lint errors, 18/18 routes generating cleanly.

---

## 3. Parked Scope (Deferred to June 2027)
All speculative features and enterprise apparatus are frozen in [`docs/V2_PARKING_LOT.md`](V2_PARKING_LOT.md):
- PARK-01: Operator Notification Hub (OI-19)
- PARK-02: Custom Operator CRM & Pipeline Dashboard
- PARK-03: Blog / CMS & Automated Newsletter
- PARK-04: Web Push Notifications & Advanced Tracking
- PARK-05: 143-Point Readiness Audit Ledger
- PARK-06: Full Design-to-Code Audit Program
- PARK-07: Daily Cold-Start Script Automation
- PARK-08: Extended Logo Derivative Reviews
- PARK-09: 12-Scenario Enterprise Staging Matrix
- PARK-10: Formal User Comprehension Study
