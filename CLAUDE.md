# CLAUDE.md — Operating Guidelines for Claude on YCN Labs

Welcome to YCN Labs.

**Role update (Owner decision, 4 Nov 2026 — DECISION-055 Amendment 1):** Local Claude Code, running in VS Code on host `YCN-labs`, is the sole local builder. It follows `AGENTS.md` in full, and it never reviews its own PRs. Each PR has exactly one independent reviewer, designated by the Owner; GPT reviews PRs authored by local Claude Code. A separate Claude chat may act as reviewer only for work it did not author, and the review rules in sections 1–4 below apply to that review. The Owner alone authorizes merges, deployments and releases. AGY is retired from execution; its tools and records are preserved.

Before any work or review, read `docs/START_HERE.md` and `docs/STATE.md`.

---

## 1. Prime Directive
- **Audit by Exception:** Verify that task execution adheres strictly to authorized boundaries. Raw command evidence strictly outranks narrative summaries.
- **Demand Raw Output:** Never accept summarized PASS statements or narrative descriptions alone. Require verbatim terminal logs and verifiable SHA-256 registers.
- **Zero Visual Verdicts:** You audit technical compliance, code quality, accessibility, and tests. Visual verdicts belong exclusively to the Owner.

---

## 2. Canon Hierarchy
Enforce strict conformance with the authoritative canon:
`Owner Rulings` > `docs/YCN_DECISIONS.md` > `docs/YCN_CLAIMS_AND_PROOF.md` > `docs/YCN_CONTENT_SPEC.md` > `docs/YCN_DESIGN_SYSTEM.md` > `docs/vnext/*`.

---

## 3. Incident #17 Vigilance
Watch for known failure patterns:
- Retyped or reconstructed hashes.
- Shifted or renumbered decision items.
- Fabricated tables, invented origins, or ungrounded provenance.
- Discrepancies between stated file counts and raw output.
- Assertions of passes where tests were not actually re-run.

---

## 4. Bounded Scope Enforcement
- Ensure touch sets are minimal and strictly confined to authorized files.
- A Git commit is never Tier 0; committing requires separate explicit authorization.
- Ensure protected components (Hero CTA, scroll cue, entrance) suffer zero regressions.

---

## 5. UI work: Modern Web Guidance and UI/UX skills (Owner, 14 Nov 2026 — until handover)
For every HTML, CSS or client-side JavaScript change in this repo:
- **Modern Web Guidance first:** `pnpx modern-web-guidance@latest search "<2–5 words>"`, then `retrieve` the matching guides and apply them with their fallbacks. Baseline target: Widely available (the default).
- **UI/UX skills, selectively:** `interface-design` and `web-design-guidelines` on every UI task; `impeccable` for audits (its hook stays off); `frontend-design` only for new sections; motion skills only for existing motion. Avoid `design-taste-frontend`, `ui-ux-pro-max` (research only), shadcn/ChaiUI and native-app skills here.
- **The approved V3 design wins:** headline, palette (Space Grotesk + Inter, navy/blue), layout and frozen systems are not changed because a guide or skill suggests it.
- **Report:** list the guides and skills used, the checks run (unit, `pnpm test:e2e`, both themes, 375–1440 px, keyboard, reduced motion) and any limitation.
