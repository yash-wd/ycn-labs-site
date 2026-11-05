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
