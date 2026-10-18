# YCN Labs — Unified Project Stack & File Architecture

**Canonical Root:** `/home/ycn-labs/Desktop/ycn-labs-site`
**Git Repository:** `yash-wd/ycn-labs-site` (`https://github.com/yash-wd/ycn-labs-site`)
**Operating Standard:** DECISION-055 (Lean V1 Launch, Scope Freeze & One-Year Operating Strategy)
**Last Reconciled:** 18 October 2026

---

## 1. Structural Overview: Everything in One Folder

All project-related files, architectural decisions, specifications, code, and brand assets are unified into a single, cohesive repository structure:

```
/home/ycn-labs/Desktop/ycn-labs-site/
├── app/                          # LAYER 1: Core 18 Next.js App Router routes
├── components/                   # LAYER 1: UI Components (Navigation, DeviceShell, VNext stages)
├── lib/                          # LAYER 1: Shared utilities (db, validation, ratelimit, security)
├── tests/                        # LAYER 1: Automated test suites (19 test files, 280+ tests)
├── public/                       # LAYER 6: Static public assets and optimized brand media
│   └── brand/                    #           Web-optimized brand logos & authoritative 8K master
├── docs/                         # THE CENTRAL DOCUMENTATION & GOVERNANCE STACK
│   ├── decisions/                # LAYER 2: Structural Decisions Stack (001 to 055)
│   │   ├── README.md             #           Phase-by-phase index and quick lookup table
│   │   ├── DECISION-055-...      #           The ratified Lean Launch Reset Decision
│   │   └── DECISIONS_MASTER_...  #           Complete, unabridged text of all 55 decisions
│   ├── YCN_MASTER_STRATEGY_...   # LAYER 3: Master Strategy Oct 2026 -> Oct 2027
│   ├── V2_PARKING_LOT.md         # LAYER 3: Strategic scope freeze index (parked until June 2027)
│   ├── YCN_MASTER_PLAN.md        # LAYER 3: Master Launch Plan (Tasks 01 to 17)
│   ├── STATE.md                  # LAYER 4: Daily single source of truth for repository state
│   ├── BACKLOG.md                # LAYER 4: Active launch queue and task statuses
│   ├── TASK_GATE.md              # LAYER 4: Pre-execution task requirements and safety checks
│   ├── CLOSE_PROTOCOL.md         # LAYER 4: Session close protocol and verification
│   ├── YCN_SYSTEM_ARCHITECTURE.md# LAYER 5: Modular Next.js monolith architecture spec
│   ├── YCN_CONTENT_SPEC.md       # LAYER 5: Canonical approved public copy and messaging
│   ├── YCN_DESIGN_SYSTEM.md      # LAYER 5: Semantic color tokens, typography scales
│   ├── YCN_DESIGN_TO_CODE_...    # LAYER 5: Design-to-code layout contracts
│   ├── YCN_CLAIMS_AND_PROOF.md   # LAYER 5: Evidentiary proof for public marketing statements
│   └── brand/                    # LAYER 6: Brand technical records and 8K master asset
└── proof/                        # LAYER 7: Active task staging proofs & demos
    ├── YCN-LEAD-STAGING-12/      #           Task 12 Lead Reliability checklist & test plans
    └── DEMOS/                    #           Approved interactive HTML visual demos
```

---

## 2. Layer-by-Layer Detail

### Layer 1: Code & Application Stack
- **Framework:** Next.js 16.3.6 (App Router), React 19, TypeScript 5.8, Tailwind CSS v4.
- **Routes (18 Canonical):**
  - Public Marketing: `/` (Home), `/services`, `/work`, `/how-we-work`, `/engineering`, `/about`, `/contact`, `/what-we-solve`.
  - Utility & Legal: `/privacy`, `/terms`, `/credits`, `/404`.
  - Interactive Stages: Entrance Continuum (`CodeEntranceContinuum`), Phone3D stage, Laptop portal.
- **Quality Gates:** 100% clean builds, 0 type errors (`tsc --noEmit`), 280+ tests passing.

### Layer 2: Decisions Stack (`docs/decisions/`)
Every binding decision across the project's lifetime is stacked and indexed in `docs/decisions/`:
- **DECISION-001 to 017:** Brand identity, typography, color policy, dark canvas, honest proof baseline.
- **DECISION-018 to 050:** Product-led vNext architecture, live DOM continuum, mobile viewports.
- **DECISION-051 to 052:** Business systems foundation and Gate A commercial policy.
- **DECISION-053 to 054:** Gate B1 content spec ratifications, India-first context, DPDP privacy rules.
- **DECISION-055:** Strategic Reset, lean V1 launch scope freeze, PR review workflow, 10-point gate.

### Layer 3: Strategic Stack
- **`YCN_MASTER_STRATEGY_2026-27.md`:** The governing commercial and technical strategy for the year:
  - Checkpoint 1 (15 Nov 2026): Lean V1 live on custom domain.
  - Checkpoint 2 (31 Jan 2027): 2 real client projects delivered and featured on `/work`.
  - Checkpoint 3 (31 May 2027): First recurring maintenance retainer (`YCN Care Plan`).
  - Checkpoint 4 (June 2027): Evidence-based V2.0 evaluation.
- **`V2_PARKING_LOT.md`:** All deferred enterprise features (OI-19 notification hub, CRM, blog/CMS, web push, 143-item audit) indexed with exact Git SHAs and reopening conditions.
- **`YCN_MASTER_PLAN.md`:** The canonical launch task breakdown (Tasks 01–17).

### Layer 4: Operations & Launch Gate Stack
- **`STATE.md`:** Authoritative current state ledger updated at every session close.
- **`BACKLOG.md`:** The concrete execution tasks remaining for V1 launch (Tasks 07, 08, 10, 11, 12, 13, 15, 17).
- **`TASK_GATE.md`:** Bounded operating rules: single branch per task, test requirements, safety bounds.
- **The 10-Point Launch Gate:** Replaces the 143-point tracker with ten automated and empirical verification criteria.

### Layer 5: Technical Specifications Stack
- **`YCN_SYSTEM_ARCHITECTURE.md`:** Complete Next.js modular architecture, database schema, and security boundary.
- **`YCN_CONTENT_SPEC.md`:** Exact approved copy for every page and section.
- **`YCN_DESIGN_SYSTEM.md`:** Dark-canvas palette (`#0D111A`), amber/gold accents, typography hierarchy.
- **`YCN_CLAIMS_AND_PROOF.md`:** Claims register ensuring zero false or unmeasured metrics are published.

### Layer 6: Brand & Media Stack
- **Authoritative Master:** `Main_YCN_LABS_logo_black_8K.png` (SHA: `0ceebe4ccf81...`, 8192×8192).
- **Locations:** Stored in `docs/brand/` for permanent documentation and in `public/brand/` for runtime delivery.
- **Responsive Standard:** CSS vector/raster scaling; no unverified manual cropping derivatives.

### Layer 7: Staging Proofs & Demos
- **`proof/YCN-LEAD-STAGING-12/`:** Architectural blueprints, idempotency specs, and 5-scenario integration checklist for Task 12.
- **`proof/DEMOS/`:** Approved visual HTML prototypes for review.

### Layer 8: Off-Device Backup Stack
- **Essential Vault:** The ~55 MB core vault containing all proof folders, foundation records, and registers is packaged into an encrypted archive in `proof/YCN-VAULT-BACKUP-01/`.
- **Media Rule:** Copied to a physical USB stick and personal cloud drive, protecting against single-SSD hardware failures.

---

## 3. How to Operate in This Stack
1. **Never create ad-hoc governance:** Do not create new trackers, checklists, or deviation ledgers.
2. **Execute via Pull Requests:** One builder (AGY), one reviewer (GPT/Claude), Owner merges on GitHub.
3. **Keep it stacked:** Every new document, test, or asset belongs strictly within this folder structure.
