# YCN Labs — Documentation Master Index

- **Project:** YCN Labs Official Website & Studio Operations
- **Revision:** 2.0 (DECISION-055 Lean Launch & Scope Freeze System)
- **Current Stage:** Active Development — Lean V1 Launch Sprint (Target: 15 Nov 2026 / Fallback: 30 Nov 2026)
- **Active Canonical Root:** `/home/ycn-labs/Desktop/ycn-labs-site` (`https://github.com/yash-wd/ycn-labs-site`)
- **Operating Framework:** DECISION-055 (1 Builder, 1 Reviewer via GitHub PRs, 10-Point Launch Gate)

---

## 1. Unified Architecture Stack

All project assets, code, specifications, and decisions are unified inside this repository:

1. **[Project Stack Map](PROJECT_STACK.md)** — Architectural blueprint of all folders, layers, and responsibilities.
2. **[Master Strategy 2026–27](YCN_MASTER_STRATEGY_2026-27.md)** — Binding commercial and technical operating plan (Phases 1–4).
3. **[Decisions Stack](decisions/README.md)** — Chronological index and text of all 55 decisions (DECISION-001 to DECISION-055).
4. **[V2 Parking Lot](V2_PARKING_LOT.md)** — Deferred speculative features with SHA pointers and June 2027 reopening criteria.
5. **[Current State](STATE.md)** — Daily single source of truth for branch state, task progress, and closing summaries.
6. **[Launch Backlog](BACKLOG.md)** — Focused execution queue for the 4-week lean launch (Tasks 07, 08, 10, 11, 12, 13, 15, 17).
7. **[Task Gate](TASK_GATE.md)** — Operating constraints, branch isolation, and safety criteria for active work.
8. **[Master Plan](YCN_MASTER_PLAN.md)** — Complete task breakdown across all foundation and implementation phases.
9. **[System Architecture](YCN_SYSTEM_ARCHITECTURE.md)** — Modular Next.js monolith technical specification.
10. **[Content Specification](YCN_CONTENT_SPEC.md)** — Canonical approved public copy for all 18 routes.
11. **[Design System](YCN_DESIGN_SYSTEM.md)** — Color palette, type hierarchy, and motion guidelines.
12. **[Claims & Proof Register](YCN_CLAIMS_AND_PROOF.md)** — Empirical verification requirement for all public claims.
13. **[Brand Records](brand/YCN_LABS_BRAND_TECHNICAL_RECORD_v1.2_FINAL.md)** — Technical brand identity, colors, and 8K master logo asset.

---

## 2. Active Canonical Document Hierarchy

| Document | Filename | Primary Owner | Purpose |
|---|---|---|---|
| **Project Stack** | [`docs/PROJECT_STACK.md`](PROJECT_STACK.md) | Lead Architect | Map of all project layers, code, decisions, and assets |
| **Master Strategy** | [`docs/YCN_MASTER_STRATEGY_2026-27.md`](YCN_MASTER_STRATEGY_2026-27.md) | Owner | 1-Year business & technical roadmap (Launch to Retainers) |
| **Decisions Index** | [`docs/decisions/README.md`](decisions/README.md) | Owner | Complete chronological register of DECISION-001 to 055 |
| **V2 Parking Lot** | [`docs/V2_PARKING_LOT.md`](V2_PARKING_LOT.md) | Owner | Deferred enterprise scope indexed for June 2027 review |
| **Current State** | [`docs/STATE.md`](STATE.md) | All Seats | Daily single source of truth for repository state |
| **Execution Backlog** | [`docs/BACKLOG.md`](BACKLOG.md) | Lead Architect | Active launch sprint task queue |
| **Task Gate** | [`docs/TASK_GATE.md`](TASK_GATE.md) | All Seats | Pre-flight rules and execution bounds |
| **Close Protocol** | [`docs/CLOSE_PROTOCOL.md`](CLOSE_PROTOCOL.md) | Owner | Clean session close and verification protocol |

---

## 3. The 10-Point Launch Gate (Replaces 143-Point Tracker)

Under DECISION-055, release readiness is governed strictly by the 10-Point Launch Gate:
1. `git diff --check` passes with zero whitespace/merge errors.
2. `pnpm run type-check` (`tsc --noEmit`) passes with zero errors.
3. `pnpm run lint` passes (0 errors).
4. `pnpm test` passes all 280+ tests.
5. `pnpm run build` generates all 18 routes cleanly.
6. Real test lead submitted from a mobile device commits to PostgreSQL and notifies Owner.
7. Mobile 375px audit confirms zero horizontal scrollbar or clipped content.
8. Mobile performance verified: LCP $\le$ 2.5s on mobile network.
9. Privacy notice and working contact mailboxes (`hello@`, `privacy@`) live.
10. Rollback mechanism verified in hosting dashboard.
