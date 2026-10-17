# YCN Labs — Master Discrepancy Register & Reconciliation Matrix

**Version:** 1.3  
**Effective Date:** 17 October 2026  
**Status:** DRAFT — PENDING OWNER COMMIT APPROVAL (Gate E Deliverable — `YCN-V2-FOUNDATION-ALIGN-01`)  
**Scope:** Site V2 Foundation Alignment across Business Policy, Content, Design, Architecture & Implementation

---

## 1. Executive Summary

During the transition from the historical website (`yash-wd/ycnlabs`) to Site V2 (`yash-wd/ycn-labs-site`), key discrepancies were identified between legacy assumptions, documentation drafts, and ratified Owner decisions. This register records the authoritative reconciliation for each item as part of **Gate E Foundation Alignment**, distinguishing between resolved foundation policies and open prerequisites awaiting Owner decision.

---

## 2. Reconciled Discrepancy Matrix

| # | Domain | Legacy / Prior Assumption | Authoritative Resolution (Site V2) | Authority / Decision Ref | Status |
|---|---|---|---|---|---|
| **01** | **Geography & Market** | Global Western agency positioning; USD pricing references. | **Hyderabad-based, India-first.** Primary market is Indian businesses and Tier 2/3 founders seeking high-caliber digital engineering. | DECISION-052 (O-01) | **RESOLVED (POLICY)** |
| **02** | **Core Service Scope** | Generic full-stack claims: "SaaS Platforms", "AI Solutions", mobile apps. | **Focused service model:** High-performance websites lead, selective custom web apps / internal automation, and ongoing maintenance. | DECISION-052 (O-02) | **RESOLVED (POLICY)** |
| **03** | **Enquiry Response Time** | Public guarantee: "respond within one business day". | **Realistic operational commitment:** Internal target of two working days. Public copy states: *"We review all inquiries carefully and respond with honest, actionable next steps — no salesperson walls."* | DECISION-052 (O-03) | **RESOLVED (POLICY)** |
| **04** | **Pricing & Billing** | Public budget ranges in USD ("Under $5k", "$5k–$15k"). | **Custom INR-denominated quotes:** Transparent milestone billing: 50% deposit, 30% milestone review, 20% handover. | DECISION-052 (O-05) | **RESOLVED (POLICY)** |
| **05** | **Post-Launch Commitments** | Vague ongoing support / maintenance claims. | **Explicit contractual boundaries:** 30-day bug-fix warranty on delivered scope; full client asset handover commitment with independent backup. | DECISION-052 (O-05) | **RESOLVED (POLICY)** |
| **06** | **Lead Data Retention** | Indefinite retention or automated monthly purge assumptions. | **Up to 12 months for inactive pre-sales enquiries** from last meaningful contact; manual Owner review only, NO automated purge. Subject to legal counsel review. | DECISION-052 (O-06) | **RESOLVED (POLICY), LEGAL CLEARANCE OPEN** |
| **07** | **Visual Identity & Logo** | Proposed complete redesign of corporate brand mark. | **Existing logo mark retained:** Evolution in typography and presentation; any artwork change requires explicit Owner visual approval. | DECISION-052 (O-07) | **RESOLVED (POLICY), VISUAL RULING OPEN** |
| **08** | **CLOSE & File Governance** | Automatic file deletion and unreviewed push scripts. | **Plan-first CLOSE:** No automatic deletion, exact per-file manifests, Owner approval required for pushes and file movements. | DECISION-052 (O-08) | **RESOLVED (POLICY)** |
| **09** | **Launch Timeline** | Historical draft launch date: 10 November 2026. | **Provisional planning target: 30 November 2026.** Bounded roadmap with strict quality gates (Gates A–11). | DECISION-052 (O-09) | **RESOLVED (PLANNING TARGET)** |
| **10** | **Operating Infrastructure** | Multi-region enterprise infrastructure budget assumptions. | **Lean capital discipline:** ₹5,000/month candidate ceiling across Vercel, Neon, Upstash, Resend, and domain services. | DECISION-052 (O-10) | **RESOLVED (POLICY)** |
| **11** | **Legal & Compliance Prerequisites** | Assumed formal corporate entity and completed legal review. | **Prerequisites clearly identified as OPEN:** Legal entity registration, CA tax consultation, and formal counsel review of Privacy/Terms are mandatory pre-launch gates. | DECISION-052 (Open Prerequisites) | **OPEN (AWAITING OWNER ACTION)** |
| **12** | **Implementation Hold & Gate E** | Speculative concurrent feature development during hold. | **Gate E active under 2-day timebox (deadline 21 Oct 2026).** Tasks 07–09 remain paused until Gate E passes and Owner authorizes coding. | Owner Instruction (17 Oct 2026) | **ACTIVE (PENDING GATE E CLOSE)** |
| **13** | **Delivery Strategy (Option 4)** | Competing delivery paths (full rewrite vs historical repair). | **Option 4:** Prioritize Site V2 under Gate E; historical hotfix `5b0d971` remains on HOLD on preview with claims risk open. | 16 Oct Close / Owner Session 17 Oct | **RETAINED WORK — AUTHORIZED VIA GATE E PUSH** |
| **14** | **Design System Authority & ChaiUI** | Potential collision between ChaiUI styling and YCN design system. | **`docs/YCN_DESIGN_SYSTEM.md` is 100% authoritative.** ChaiUI is a supporting component registry and review resource, restyled to YCN tokens. No whole-theme override. | Owner Instruction (17 Oct 2026) | **RETAINED WORK — AUTHORIZED VIA GATE E PUSH** |

---

## 3. Discrepancies Found in Published V2 Documents & Process Deviations

### 3.1 Published Documentation Discrepancies (Cross-Check Audit)
As required by Gate E cross-check protocol (`docs/STATE.md`), the following documentation discrepancies were identified within published V2 files (to be corrected in the 17 Oct close commit; not modified in this 9-file Gate E package):

1. **`docs/STATE.md` §2 Historical Hotfix Status Drift:** Stated *"live-claims hotfix NOT STARTED"*, while current operational truth is that branch `hotfix/live-claims-2026-10` (`5b0d971`) was pushed to origin, verified on Vercel preview, and placed on official **HOLD**. Identified; to be corrected in the 17 Oct close commit.
2. **`docs/STATE.md` Header Stale Date:** Stamped *"2026-10-15"*, which fell behind the ratified 16 October CLOSE session. Identified; to be corrected in the 17 Oct close commit.
3. **`docs/STATE.md` Baseline Commit Pointer:** Stated *"Verified Starting HEAD 5dbab54"*, whereas the canonical remote baseline is `23c6c86607a275f84e8b05fe22cdf32aa91a23a6`. Identified; to be corrected in the 17 Oct close commit.

### 3.2 Process Deviation — Evidence Custody & Deletion Record
- **Event:** Deletion of public repository proof directory `/home/ycn-labs/Desktop/ycn-labs-site/proof/` (containing v1.2 `log.txt`) and generator script `/home/ycn-labs/Desktop/ycn-labs-site/scripts/gate-e-align.py`.
- **Deviation:** Executed via `rm -rf` without an explicit Owner-approved per-file manifest, violating `AGENTS.md` Rule 6 and DECISION-018/DECISION-052 (O-08).
- **Evidence Continuity & Disposition:** No prior copy of the v1.2 log was saved before deletion; that run is documented only in chat summaries. No files were silently recreated. The v1.3/v1.4 fail-closed log in the private vault (`/home/ycn-labs/Desktop/YCN_LABS_MASTER/proof/YCN-V2-FOUNDATION-ALIGN-01/log.txt`) serves as the sole surviving authoritative execution record. This deviation is formally logged here and in tonight's CLOSE deviation register.

---

## 4. First Bounded Coding Task Named

Pursuant to Gate E exit requirements (`docs/STATE.md: Gate E - name first bounded coding task`):
- **Named Task:** **`Task 07: YCN-NAV-ORIGINAL-STYLE-01` (Navigation Menu Continuous Motion Pilot)**
- **Exact Scope:** Restore approved Menu button perimeter animation at 80 px/s in `continuous` mode; mobile drawer and keyboard accessibility.
- **Explicit Boundary:** Primary CTA signal lighting and border changes are excluded and reserved for separately authorized Task 07b. Zero ChaiUI theme override. Coding commences only after explicit Owner authorization.

---

## 5. ESLint Accepted Warning Baseline (88 Warnings, 0 Errors)

With `typescript-eslint 8.71.2` actively inspecting all TypeScript and TSX files across the codebase, ESLint passes with **0 errors**. The 88 warnings are cataloged below as the accepted Gate E baseline (not to be enlarged into unrelated feature cleanup), citing the exact file locations from the ESLint JSON report:

| Rule ID | Severity | Count | Exact File Locations |
| :--- | :--- | :--- | :--- |
| `@typescript-eslint/no-unused-vars` | Warning | 46 | `components/homepage/vnext/` (BrandContinuumFilm, BrandContinuumStage, ConnectedRequestsSection, EditorialLaptopPortalSection, HomepageVNextPhase1, LogoTakeoverStage, PhoneChaptersSection), `components/` (CinematicLayersSlice, Header, HeroChapters, HowItConnects), `app/` (contact, how-we-work, not-found, what-we-solve, work), `__tests__/` (entrance-b2, hero-polish-01, navbar-polish-03/04/05, phase7-backend-hardening) |
| `@typescript-eslint/no-explicit-any` | Warning | 25 | `app/api/contact/route.ts`, `components/ContactForm.tsx`, `components/JsonLd.tsx`, `components/UniversalActions.tsx`, `lib/db/recovery.ts`, `lib/security/sanitize.ts`, `__tests__/` (contact-api, phase7-backend-hardening, phase9-security-hardening) |
| `no-console` | Warning | 12 | `app/api/contact/route.ts` (1), `components/homepage/vnext/BrandContinuumStage.tsx` (1), `components/homepage/vnext/entrance-diagnostics.ts` (1), `scripts/recover-leads.ts` (9) |
| `prefer-const` | Warning | 3 | `components/homepage/vnext/LogoTakeoverStage.tsx` (3 un-reassigned coordinate variables) |
| `@typescript-eslint/no-require-imports` | Warning | 2 | `__tests__/phase2-phone-chapters.test.ts` (2 dynamic require statements) |
| **TOTAL** | — | **88 Warnings, 0 Errors** | **PASS (Accepted Baseline across 28 files)** |

---

## 6. Unresolved Owner Decisions (Preserved as Open)

The following items require Owner action and are **not assumed as approved**:
1. **Instruction Status:** Prior consolidated instruction was unconfirmed / not formally sent by Owner ("i dont know"); work retained as reviewed and formally authorized for commit/push by Owner.
2. **Gate E Commit & Push Approval:** Formally authorized by Owner on 17 Oct 2026 (`push`).
3. **Vercel Pro Decision:** Confirm whether Vercel Pro subscription will be activated for staging password isolation (Task 12 prerequisite).
4. **Encrypted External Backup Destination (Task 03):** Designate external drive path for offline encrypted backup of private vault assets.
5. **Legal & Professional Clearance (Prerequisite 10):** Entity structure selection, CA tax consultation, and legal review of terms/privacy.
