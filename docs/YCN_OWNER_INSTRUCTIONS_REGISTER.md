# YCN Labs — Master Owner Instructions Register

**Document ID:** `YCN-OWNER-INSTRUCTIONS-REGISTER-01`  
**Revision:** 1.0.0  
**Effective Date:** 17 October 2026  
**Authority:** Direct Owner Directives (Standing & Permanent Across All Projects)  
**Maintenance Rule:** Append-only ledger. Every direct Owner instruction is numbered, categorized, and tracked to its exact canonical implementation. Mandatory reading at every cold start.

---

## 1. Standing Directives Ledger

| ID | Date | Instruction Category | Instruction Summary (Owner Voice) | Canonical Location | Status |
|---|---|---|---|---|---|
| **OI-01** | 13 Oct 2026 | Governance & Authority | Owner words only: A/B, yes/no, seen, push, close. An AI recommendation is never approval. If anything is unclear, ask: "Sir, I have a question." | `AGENTS.md` §2 Core Constraints | **PUBLISHED** |
| **OI-02** | 13 Oct 2026 | Engineering Standard | Advise at Principal Engineer / CTO level. Truth over comfort. Rigorously classify every claim: `[VERIFIED]`, `[REPORTED]`, `[INFERRED]`, or `[UNKNOWN]`. | `AGENTS.md` Advisory Mandate | **PUBLISHED** |
| **OI-03** | 15 Oct 2026 | Asset & File Custody | Every project file has one home; `~/Downloads` is arrival only; manifest before move/delete; append-only logs; names-only for env secrets. | `AGENTS.md` File-Intake Rule | **PUBLISHED** |
| **OI-04** | 16 Oct 2026 | Multi-Seat Operation | Three-seat shared ownership (GPT, Claude, AGY); independent first, together second; one lead per task; status line on every response. | `AGENTS.md` Multi-Seat Protocol | **PUBLISHED** |
| **OI-05** | 16 Oct 2026 | Session Lifecycle | Asset custody: move not copy, hash before/after, CLOSE is 100% or `CLOSE BLOCKED`. Never declare closed with unverified checks. | `docs/CLOSE_PROTOCOL.md` | **PUBLISHED** |
| **OI-06** | 17 Oct 2026 | Design Systems | ChaiUI installed for all seats; follow design rules — **Owner ruling recorded: YCN design system wins; ChaiUI is a component source.** | `AGENTS.md` §9 (Governance Draft) | **DRAFT** |
| **OI-07** | 17 Oct 2026 | Project Tracking | Checklist for everything; nothing marked done without evidence; every Owner instruction becomes a checklist checkpoint. | `docs/YCN_READINESS_CHECKLIST.md` | **DRAFT** |
| **OI-08** | 17 Oct 2026 | Daily Synchronization | GitHub and local in sync at every start and close across all three repositories (`ycn-labs-site`, `YCN_LABS_BRAND_LIBRARY`, `ycnlabs`). | `AGENTS.md` / `CLOSE_PROTOCOL.md` | **DRAFT** |
| **OI-09** | 17 Oct 2026 | Innovation & Agency | AI seats may propose better ideas, optimizations, and architectures — but execute only after explicit Owner word. | `AGENTS.md` §1.5 | **DRAFT** |
| **OI-10** | 17 Oct 2026 | Task Execution Rule | For every assigned task: research proportional to risk, small temporary working checklist in private vault, mark DONE on completion, delete under manifest. | `AGENTS.md` §4 Working Checklist Rule | **DRAFT** |
| **OI-11** | 17 Oct 2026 | Foundation Sequencing | Foundation first where it governs code: design-to-code contract, logo rulings, migration plan, external checklist — then code. | `docs/STATE.md` / `BACKLOG.md` | **DRAFT** |
| **OI-12** | 17 Oct 2026 | Migration Architecture | Legacy project is NOT merged into new; selective migration with route map, data decision, cutover plan. | `AGENTS.md` Architecture Rules | **DRAFT / PENDING** |
| **OI-13** | 17 Oct 2026 | Brand Assets & Logo | Logo: add wherever necessary — **Evidence boundary: Only the 8K Master is approved; all derivative crops require Owner sitting.** | `docs/YCN_READINESS_CHECKLIST.md` §7 | **OPEN (Sitting Pending)** |
| **OI-14** | 17 Oct 2026 | Visual Precision | Complete colors, fonts, sizes, widths, heights, both themes; homepage must follow standards with zero slop. | `docs/YCN_DESIGN_TO_CODE_CONTRACT.md` | **DRAFT** |
| **OI-15** | 17 Oct 2026 | Speed & Cadence | Work faster without reducing quality; continue task to task; do not close until Owner explicitly says `close`. | `docs/STATE.md` Last Session | **RECORDED** |
| **OI-16** | 17 Oct 2026 | Artifact Intake & Sharing | **Every artifact generated, downloaded, created, shared, or mentioned in any chat must be identified, handed to AGY, stored in its canonical folder, and published to GitHub if project-necessary. Other seats must notify.** | `AGENTS.md` §10 Artifact Intake Rule | **DRAFT** |
| **OI-17** | 17 Oct 2026 | Cross-Project Continuity | Maintain one permanent register of everything the Owner says, acting as permanent wisdom for this and future projects. | `docs/YCN_OWNER_INSTRUCTIONS_REGISTER.md` | **CANONICAL** |
| **OI-18** | 18 Oct 2026 | Visual-First Development | Before working on that part, create an HTML file: what we are developing and how it looks after development, what's the prototype, what it can do and what we can achieve by doing that. Everything has to be created as a sample demo with HTML, CSS and JS — not the complete system, just a demo of how it looks — so that I can have visual clarity and guide better what to do. These visual files are for GPT and Claude only, not for AGY. | `proof/YCN-VISUAL-FIRST-OPS-01/` / `proof/DEMOS/` | **RECORDED (Vault)** |
| **OI-19** | 18 Oct 2026 | Operational Visibility & Legal Scope | Site must investigate and inventory unified operator visibility (new-lead, error, email-sent, delivered/bounced, response and uptime notifications), visitor analytics/open reporting, saving/sharing, offers, blog-related shares, and optional browser notifications and tracking; legal/privacy compliance. Inventoried under existing Tasks 10/12/13/15/17. Tasks 18/19, alert destination, and launch commitments are UNDECIDED pending Owner ruling. | `proof/YCN-VISUAL-FIRST-OPS-01/` | **RECORDED (Scope Inventory)** |

---

## 2. Artifact Intake Protocol (§OI-16 Implementation)

Whenever an artifact (document, code, checklist, dataset, image, or plan) is created or shared:
1. **Notification:** The generating seat MUST announce the artifact name, byte size, SHA-256 hash, and intended role.
2. **Intake & Verification:** AGY identifies the artifact, verifies its hash, moves it from arrival (`~/Downloads` or chat) to its canonical home in the private vault or repository, and logs it in `proof/INTAKE_YYYY-MM-DD/`.
3. **Publication Assessment:** Evaluate: *Does this artifact belong in the public Git repository?*
   - YES (Canonical docs, specs, schemas): Stage and commit to the appropriate WIP branch under review.
   - NO (Private evidence, raw logs, security scans, chat transcripts): Keep strictly in the private vault `/home/ycn-labs/Desktop/YCN_LABS_MASTER/proof/`.
4. **Zero Silent Loss:** No artifact may remain only in a chat transcript or on an unbacked local desktop.

---

## 3. Historical Process Deviations Log (17 October 2026)

- **DEV-13 (Artifact Intake Omission):** Checklists were generated and downloaded in chat without immediate notification to AGY, leaving them uningested until evening reconciliation. Remediated via `INTAKE_MANIFEST_2026-10-17.md` and this permanent register.
- **DEV-14 (Logo Console Auto-Approve Defaults):** Script in `proof/LOGO_SITTING/index.html` was generated with auto-selected "APPROVED" defaults and automatic deployment claims. Neutralized prior to close; all decisions reset to pending Owner ruling.
- **DEV-15 (Viewport-Only Audit Frame Limitations):** Initial design audit captured 390px viewport frames rather than mandated 375px minimum, with `fullPage: false`. Recorded as an initial pre-audit frame set, not full homepage visual acceptance.
- **DEV-16 (Discarded Uncommitted INDEX.md Edit):** AGY executed `git checkout docs/INDEX.md` to revert an uncommitted edit made on `wip/YCN-NAV-07` prior to switching to `wip/YCN-CHECKLIST-GOVERNANCE-01` and re-applying the edit. The intended content was preserved in commit `0f5ae46` (`b05810b` modified only `docs/STATE.md`), but the operation violated the prohibition against discarding uncommitted work without an explicit manifest.
- **DEV-17 (Inline Register File Rewrite):** Vault register was rewritten using python open(path, "w") to reorder rows instead of strictly appending or preserving raw command append-only logs. Content preservation is AGY-REPORTED (verified by raw grep inspection; before/after file byte hashes not captured prior to overwrite). Violated prohibition against inline whole-file overwrites.
- **DEV-18 (Recurrence of Inline Whole-File Overwrites):** AGY executed inline whole-file python `open(path, "w")` rewrites on `docs/YCN_OWNER_INSTRUCTIONS_REGISTER.md`, `docs/STATE.md`, `docs/START_HERE.md`, and `docs/INDEX.md` during the 18 Oct 11:15 IST governance commit preparation, recurring 40 minutes after logging DEV-17 for the identical pattern. Remediated by enforcing versioned script execution (`proof/YCN-CHECKLIST-GOVERNANCE-01/fix_governance_v2.py`) with before-and-after SHA-256 hashes and diff evidence.
