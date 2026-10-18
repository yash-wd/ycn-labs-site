# YCN Labs — Documentation Master Index

- **Project:** YCN Labs Official Website
- **Revision:** 1.3 (Canonical System)
- **Current Stage:** Active Development (Foundation Phase; Gates A, B1, B2, C/D complete; Gate E target 21 Oct 2026; live-claims hotfix pending)
- **Active Development Target:** `main` (Verify with `git rev-parse HEAD`; see `docs/STATE.md`) (`https://github.com/yash-wd/ycn-labs-site`)
- **Historical Private Reference:** `site-v2 @ 11468f4b36b3fdf451cd0bf04e5f2ee2868b45a5` (preserved on remote branch `site-v2` in `yash-wd/ycnlabs`; preserved strictly for historical/recovery records)
- **Hosting Provider:** Vercel (No production deployment authorized for `ycn-labs-site`; historical production repo `yash-wd/ycnlabs` receives only Owner-authorized, preview-verified hotfixes)

---

## 1. How to Read This Documentation (document registry; the cold-start sequence is CLOSE_PROTOCOL §3)

For any human engineer, contributor, or AI agent (GPT, Claude, AGY), read in this exact order:

0. **Task Gate ([`docs/TASK_GATE.md`](TASK_GATE.md))** — Read before starting or resuming ANY task. Covers day gate, reading sequence, legal triggers, OI-18 demo gate, and STOP conditions.
1. **Entry Point ([`docs/START_HERE.md`](START_HERE.md))** — Canonical repository entry point and context. Open this first.
2. **Current State ([`docs/STATE.md`](STATE.md))** — Single source of truth for repository state, in-flight work, and recent decisions.
3. **Backlog & Execution Queue ([`docs/BACKLOG.md`](BACKLOG.md))** — Master launch execution queue and active backlog authority.
4. **Readiness Checklist ([`docs/YCN_READINESS_CHECKLIST.md`](YCN_READINESS_CHECKLIST.md))** — Master 143-point project control and evidence readiness ledger.
5. **Agent Governance ([`AGENTS.md`](../AGENTS.md))** — Permanent rules: Three-Seat Shared Ownership, evidence law, and Cold-Start Verification Gate.
6. **This Index ([`docs/INDEX.md`](INDEX.md))** — Understand the active authority and document registry.
7. **Operating Protocol ([`docs/YCN_AGENT_OPERATING_PROTOCOL.md`](YCN_AGENT_OPERATING_PROTOCOL.md))** — Core operational rules and review procedures.
8. **Living Ledgers:**
   - **[Decisions](YCN_DECISIONS.md)** — Binding owner architectural, scope, and vNext decisions (DECISION-001 through DECISION-054).
   - **[Claims & Proof](YCN_CLAIMS_AND_PROOF.md)** — Evidentiary backing for all public marketing claims.
   - **[Content Spec](YCN_CONTENT_SPEC.md)** — Canonical approved public copy and candidate copy under review.
   - **[Design System](YCN_DESIGN_SYSTEM.md)** — Semantic color tokens, type scale, and motion constraints.
   - **[Risks & Technical Debt](YCN_RISKS_AND_TECH_DEBT.md)** — Active risks, controls, and technical debt tracking.
   - **[Changelog](YCN_CHANGELOG.md)** — Project and document revision history.

---

## 2. Active Canonical Document Registry

These files constitute the **single active documentation authority** for the repository.

| Document | Filename | Primary Owner | Purpose | Update Trigger |
|---|---|---|---|---|
| **vNext Site Direction** | [`docs/vnext/00_START_HERE.md`](vnext/00_START_HERE.md) | Owner / Lead Architect | Active Product-led vNext site specification pack entry point | Major design direction update |
| **vNext Manifest** | [`docs/vnext/MANIFEST.md`](vnext/MANIFEST.md) | Lead Architect | Inventory of 17 vNext specs + prototypes | vNext doc update |
| **Master Index** | [`docs/INDEX.md`](INDEX.md) | Lead Architect | Documentation homepage, authority map, and navigation guide | Adding/deprecating docs |
| **Operating Protocol** | [`docs/YCN_AGENT_OPERATING_PROTOCOL.md`](YCN_AGENT_OPERATING_PROTOCOL.md) | Owner | Operational rules, boundaries, and safe execution constraints | Protocol amendment |
| **Owner Instructions Register** | [`docs/YCN_OWNER_INSTRUCTIONS_REGISTER.md`](YCN_OWNER_INSTRUCTIONS_REGISTER.md) | Owner | Permanent register of standing directives, rules, and deviations (OI-01 to OI-17) | Direct Owner instruction |
| **Master Plan** | [`docs/YCN_MASTER_PLAN.md`](YCN_MASTER_PLAN.md) | Lead Architect | High-level system architecture, site topology, and milestones | Major milestone |
| **Requirements** | [`docs/YCN_REQUIREMENTS.md`](YCN_REQUIREMENTS.md) | Product Owner | Business requirements, user journeys, acceptance criteria | Scope revision |
| **Content Spec** | [`docs/YCN_CONTENT_SPEC.md`](YCN_CONTENT_SPEC.md) | Product Owner | Authoritative copy, shop-owner vocabulary, translation tables | Copy revision |
| **Design System** | [`docs/YCN_DESIGN_SYSTEM.md`](YCN_DESIGN_SYSTEM.md) | Design Lead | Semantic tokens, color rules, type scale, motion limits | Token/style change |
| **Design-to-Code Contract** | [`docs/YCN_DESIGN_TO_CODE_CONTRACT.md`](YCN_DESIGN_TO_CODE_CONTRACT.md) | Design & QA Leads | Token mapping, hardcoded hex audit, 5-viewport screenshot matrix | Foundation alignment |
| **Active Execution Queue** | [`docs/BACKLOG.md`](BACKLOG.md) / [`docs/STATE.md`](STATE.md) | Product Owner | Primary active launch execution queue and in-flight status | Task milestone / Close |
| **Readiness Checklist** | [`docs/YCN_READINESS_CHECKLIST.md`](YCN_READINESS_CHECKLIST.md) | Quality Lead / All Seats | 143-point Project Control & Evidence Readiness Checklist | Daily Sync / Task Gate |
| **Historical Task Reference** | [`docs/YCN_AGY_TASKS.md`](YCN_AGY_TASKS.md) | Lead Engineer | Subordinate execution phases aligned with vNext roadmap | Reference only |
| **Test Checklist** | [`docs/YCN_TEST_CHECKLIST.md`](YCN_TEST_CHECKLIST.md) | QA Lead | Regression tests, accessibility audit, fail-closed validation | Test plan update |
| **Decisions Log** | [`docs/YCN_DECISIONS.md`](YCN_DECISIONS.md) | Owner | Binding decision records (DECISION-001 through DECISION-054) | Major decision |
| **Claims & Proof** | [`docs/YCN_CLAIMS_AND_PROOF.md`](YCN_CLAIMS_AND_PROOF.md) | Compliance | Evidentiary ledger proving all public marketing facts | Public claim added |
| **Historical Feature Ideas** | [`docs/YCN_BACKLOG.md`](YCN_BACKLOG.md) | Product Owner | Deferred non-blocking feature ideas preserved for history | Scope triage |
| **Changelog** | [`docs/YCN_CHANGELOG.md`](YCN_CHANGELOG.md) | Lead Engineer | Customer- and system-level version changes | Version release |
| **Risks & Debt** | [`docs/YCN_RISKS_AND_TECH_DEBT.md`](YCN_RISKS_AND_TECH_DEBT.md) | Engineering Lead | Active risk controls and technical debt inventory | Risk/debt change |
| **Brand Technical Record** | [`docs/brand/YCN_LABS_BRAND_TECHNICAL_RECORD_v1.2_FINAL.md`](brand/YCN_LABS_BRAND_TECHNICAL_RECORD_v1.2_FINAL.md) | Brand Custodian | Official logo hashes and brand visual standards | Brand asset update |

---


## 3. Historical Documents (Non-Authoritative)

All superseded specifications, legacy agent files, and obsolete ledgers have been consolidated under:
`docs/legacy/`

> [!WARNING]
> **Files in `docs/legacy/` are strictly historical references.**
> They do **NOT** govern current development. Do not use legacy ledgers (`PROJECT_STATE.md`, old `AGENTS.md`) or obsolete scene plans to guide implementation.

---

## 4. Operational & Governance Rules

1. **Lean Development Documentation (DECISION-018):**  
   We do not maintain daily developer diaries, session notes, per-task narratives, or empty templates during active coding. Living records are limited to Decisions, Changelog, Claims, Risks/Debt, and raw output in `evidence/`.
2. **Documentation Impact Rule for Future Tasks:**  
   Every completed task must answer: **Documentation impact: YES / NO**. Only update docs when a requirement, architecture, token, claim, or risk genuinely changed.
3. **External Evidence Directory:**  
   Detailed task execution logs, screenshots, and review outputs reside in `/home/ycn-labs/Desktop/YCN_LABS_MASTER/proof/<task-id>/` and are not committed into repository docs.
4. **Final Closeout Documentation Pack (Task D3):**  
   At project closeout (post-D2), AGY will generate a complete, professional 16-document MNC/GCC-grade technical documentation pack (`01_PROJECT_OVERVIEW.md` through `16_FINAL_PROJECT_REPORT.md`) derived entirely from the finished, verified codebase and production evidence.
