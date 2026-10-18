# DECISION-055: Lean V1 Launch, Scope Freeze & One-Year Operating Strategy

**Authority:** YCN Labs Owner
**Date:** 18 October 2026
**Status:** OWNER-FINAL (Adopted with the Eight Consolidated Amendments)
**Supersedes:** Oversized multi-seat governance, 143-point daily readiness tracker, and speculative enterprise feature commitments.
**Canonical Reference Files:**
- Master Strategy: [`docs/YCN_MASTER_STRATEGY_2026-27.md`](../YCN_MASTER_STRATEGY_2026-27.md)
- V2 Parking Lot: [`docs/V2_PARKING_LOT.md`](../V2_PARKING_LOT.md)
- Master Launch Plan: [`docs/YCN_MASTER_PLAN.md`](../YCN_MASTER_PLAN.md)

---

## 1. Context & Purpose
Following an exhaustive review of the project's trajectory across four AI perspectives (GPT, Claude, retired Claude, AGY) and independent fact-checking of statutory tax thresholds, all parties unanimously agreed:
1. YCN Labs is an independent, single-operator creative technology studio with no completed client projects to show yet.
2. The existing multi-seat governance structure (~30 documents, 143-point readiness tracker, multi-seat review loops) was sized for a 10-person regulated team and created an overhead that halted product development.
3. The website exists to serve the business, not to be the business. The priority is launching a truthful, high-craft, fast website in 4 weeks and pivoting 80% of founder energy to acquiring real-world clients.

DECISION-055 formalizes the single, unshakeable strategy for October 2026 through October 2027.

---

## 2. Core Decisions & The Eight Consolidated Amendments

### Amendment 1: Single Builder, Single Reviewer via GitHub PRs
- **Workflow:** AGY executes code tasks locally in isolated git branches and opens a Pull Request on GitHub.
- **Review:** Exactly **one** independent reviewer (GPT or Claude alternating) reviews the PR diff directly on GitHub.
- **Three-Seat Convening:** Three seats convene **only** for:
  1. Production domain deployments (`ycnlabs.com`).
  2. Customer data processing or database migrations.
  3. Binding public legal copy.
- The Owner merges PRs upon reviewer sign-off. This permanently ends using the Owner as a manual message bus between AI chats.

### Amendment 2: Task 12 Lead Reliability at 5 Core Scenarios
Task 12 (Staging Lead Verification) is simplified from a 12-scenario matrix down to 5 critical failure-boundary integration tests:
1. **Valid Lead:** Lead data successfully committed to PostgreSQL and notification email dispatched.
2. **Database Down:** Database unavailable → honest HTTP 503 returned immediately to the visitor.
3. **Email Outage Post-Commit:** PostgreSQL commit succeeds, but Resend API fails → lead is preserved in DB with `notification_status='failed'`, visitor receives HTTP 200 `{ accepted: true }` with lead ID. **Never return a false 503.**
4. **Idempotency Double-Submit:** Consecutive submissions with same `idempotencyKey` → exactly 1 DB row created/updated, original lead reference returned, no duplicate email sent.
5. **Invalid Payload:** Malformed schema or spam injection → rejected with HTTP 400 validation error.

*Staging Infrastructure Rule:* Owner establishes staging accounts (Neon project, Resend domain DNS, Upstash) this week. If staging credentials cannot be verified within 48 hours, launch proceeds with a verified direct email/WhatsApp contact channel with the custom API form temporarily disabled, subject to Owner approval.

### Amendment 3: First Client Pilot at Cost (Not Free)
- Client projects will **never be free**. Free work attracts uncommitted clients and consumes hours needed for studio survival.
- The first pilot client will be contracted **at cost / modest founder rate** under a binding written Scope of Work (SOW) that includes explicit written authorization to publish a case study and metrics.

### Amendment 4: 10-Minute Off-Device Vault Disaster Recovery
- Disaster recovery requires physical media separation. The current `/mnt/workSpace` snapshot is on the same physical NVMe SSD (`nvme0n1`) as the OS.
- The Owner packages the ~55 MB essential vault (`proof/`, `foundation/`, registers, logos) into an encrypted single-file archive (`7z`/`tar.gz`) and copies it to two independent locations:
  1. A dedicated physical USB drive.
  2. A secure personal cloud drive.

### Amendment 5: Commercial Reality & Truthful Pricing
- Reject all invented fixed price bands (e.g. "₹35,000 fixed") and subjective promises ("if it's not beautiful you don't pay").
- Commercial policy stands under Gate A: **Custom INR quotations** based on scope, revisions, and effort, with **50/30/20 milestone billing**.
- Public case studies will publish **only measured technical facts** (actual Lighthouse lab scores, bundle sizes, test coverage), never fabricated client results or unmeasured targets.

### Amendment 6: Work Page Launches with Honest Showcase
- Launch `/work` with:
  1. **Internal Case Study #1:** YCN Labs Studio Website — fully documented engineering and design case study with verified metrics (18 routes, 280 tests, sub-2s mobile load, technical trade-offs).
  2. **Interactive Demonstration:** A working local business workflow prototype clearly and transparently labeled as a demonstration of technical capability.
- The first real client pilot is initiated during the launch phase and published upon verified completion.

### Amendment 7: Strategic Scope Freeze via Pointer Index (`docs/V2_PARKING_LOT.md`)
- Speculative and enterprise features are deferred to June 2027 using a clean pointer index (`docs/V2_PARKING_LOT.md`).
- Git tag `v1-scope-freeze` anchors this commit.
- **Zero file deletions:** All original architectural plans, prototypes, and research remain intact in Git history and master records.

### Amendment 8: Governance Floor & Tax Nuances
- **Governance Floor:** Zero new governance documents, trackers, or registers until June 2027. Deviations are logged only for destructive or wrong-push incidents as a single line in task checklists. OI-18 HTML demos are restricted to brand-new visible UI screens.
- **Verified Tax Nuances:**
  1. *Section 194J TDS:* The ₹50,000 annual threshold (10% professional / 2% technical) applies only when the client is a company, firm, or individual under statutory tax audit. Unaudited small businesses and individuals do not deduct TDS.
  2. *GST & Reverse Charge:* Registration is required once turnover crosses ₹20 Lakhs (₹10 Lakhs in special category states). The founder will consult a Chartered Accountant before the first invoice regarding applicability of IGST Reverse Charge on imported SaaS subscriptions (Vercel, Neon, Resend, Sentry).

---

## 3. Timeline & Execution Phases
- **Phase 1 (18 Oct – 15 Nov 2026):** Lean V1 Launch (Fallback: 30 Nov 2026).
- **Phase 2 (15 Nov 2026 – 31 Jan 2027):** Real-world client acquisition (10 contacts/week, 2 case studies secured).
- **Phase 3 (Feb – May 2027):** Cashflow & retainers (₹3.5k–₹7.5k/month Care Plans, CA setup).
- **Phase 4 (June 2027):** Evidence-based V2.0 evaluation against client demand and revenue.

---

## 4. The 10-Point Launch Gate
The 143-point readiness tracker is replaced by the following 10 objective checks:
1. `git diff --check` passes with zero errors.
2. `pnpm run type-check` (`tsc --noEmit`) passes with zero errors.
3. `pnpm run lint` passes (0 errors).
4. `pnpm test` passes all 280+ tests across all 19 test files.
5. `pnpm run build` generates all 18 routes cleanly.
6. Real test lead submitted from a mobile device commits to PostgreSQL and notifies Owner.
7. Mobile 375px audit confirms zero horizontal scrollbar or clipped content.
8. Mobile performance verified: LCP $\le$ 2.5s on mobile network.
9. Privacy notice and working contact mailboxes (`hello@`, `privacy@`) live.
10. Rollback mechanism verified in hosting dashboard.
