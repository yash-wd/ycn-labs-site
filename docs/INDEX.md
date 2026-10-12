# YCN Labs — Documentation Master Index

**Project:** YCN Labs Official Website  
**Revision:** 1.2 (Canonical System)  
**Current Stage:** Post-A0V / M0 Documentation Migration (Uncommitted, pending Owner review)  
**Active Development Target:** `main @ 5dbab54fbbba7317efe7b8f5616ae250ce16b0f5` (`https://github.com/yash-wd/ycn-labs-site`)  
**Historical Private Reference:** `site-v2 @ ddbca970e98b7992c9a2410087a3a7ec64c6d29b` (private monorepo checkpoint, preserved for historical recovery only)  
**Hosting Provider:** Vercel (No production deployment authorized during active development)

---

## 1. How to Read This Documentation

For any human engineer, contributor, or AI agent (GPT, Claude, AGY), read in this exact order:

1. **Current Site Direction Entry Point (`docs/vnext/00_START_HERE.md`)** — Product-led vNext specification and master entry point.
2. **This Index (`docs/INDEX.md`)** — Understand the active authority and document registry.
3. **[Operating Protocol](YCN_AGENT_OPERATING_PROTOCOL.md)** — Core rules: safety gates, zero data loss, four-sentence standard, and mandatory frontend design skills consultation.
4. **[Current State Handoff](YCN_HANDOFF.md)** — Current branch, pending Owner rulings, and execution roadmap.
5. **Living Ledgers:**
   - **[Decisions](YCN_DECISIONS.md)** — Binding owner architectural, scope, and vNext decisions (DECISION-001 through 034).
   - **[Claims & Proof](YCN_CLAIMS_AND_PROOF.md)** — Evidentiary backing for all public marketing claims.
   - **[Content Spec](YCN_CONTENT_SPEC.md)** — Canonical approved public copy and candidate copy under review.
   - **[Design System](YCN_DESIGN_SYSTEM.md)** — Semantic color tokens, type scale, and motion constraints.
   - **[Task Queue](YCN_AGY_TASKS.md)** — Execution phases aligned with vNext implementation roadmap.
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
| **Master Plan** | [`docs/YCN_MASTER_PLAN.md`](YCN_MASTER_PLAN.md) | Lead Architect | High-level system architecture, site topology, and milestones | Major milestone |
| **Requirements** | [`docs/YCN_REQUIREMENTS.md`](YCN_REQUIREMENTS.md) | Product Owner | Business requirements, user journeys, acceptance criteria | Scope revision |
| **Content Spec** | [`docs/YCN_CONTENT_SPEC.md`](YCN_CONTENT_SPEC.md) | Product Owner | Authoritative copy, shop-owner vocabulary, translation tables | Copy revision |
| **Design System** | [`docs/YCN_DESIGN_SYSTEM.md`](YCN_DESIGN_SYSTEM.md) | Design Lead | Semantic tokens, color rules, type scale, motion limits | Token/style change |
| **Task Queue** | [`docs/YCN_AGY_TASKS.md`](YCN_AGY_TASKS.md) | Lead Engineer | Executable task queue aligned with vNext roadmap | Task completion |
| **Test Checklist** | [`docs/YCN_TEST_CHECKLIST.md`](YCN_TEST_CHECKLIST.md) | QA Lead | Regression tests, accessibility audit, fail-closed validation | Test plan update |
| **Decisions Log** | [`docs/YCN_DECISIONS.md`](YCN_DECISIONS.md) | Owner | Binding decision records (DECISION-001 through 034) | Major decision |
| **Claims & Proof** | [`docs/YCN_CLAIMS_AND_PROOF.md`](YCN_CLAIMS_AND_PROOF.md) | Compliance | Evidentiary ledger proving all public marketing facts | Public claim added |
| **Backlog** | [`docs/YCN_BACKLOG.md`](YCN_BACKLOG.md) | Product Owner | Future features and non-blocking ideas deferred post-launch | Scope triage |
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
   Detailed task execution logs, screenshots, and review outputs reside in `/home/ycn-labs/Desktop/ycnlabs.com/YCN-PROJECT/evidence/` and are not committed into repository docs.
4. **Final Closeout Documentation Pack (Task D3):**  
   At project closeout (post-D2), AGY will generate a complete, professional 16-document MNC/GCC-grade technical documentation pack (`01_PROJECT_OVERVIEW.md` through `16_FINAL_PROJECT_REPORT.md`) derived entirely from the finished, verified codebase and production evidence.
