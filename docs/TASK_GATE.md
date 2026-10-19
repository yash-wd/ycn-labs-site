# YCN Labs — Pre-Task Gate & Authoritative Document Index

**Purpose:** A short, task-by-task navigation and readiness gate, not a second master plan or an independent source of approvals. **Applicability:** GPT, Claude, AGY and future project participants. **Status:** proposed correction of the document on `wip/YCN-CHECKLIST-GOVERNANCE-01`; it is binding in the repository only after the required review and Owner-authorized integration.

> **Precedence:** Exact Owner rulings and the controlling files linked below prevail if they conflict with this index. Record the discrepancy; never silently choose one. A document, commit, approved *demo* or technical PASS does not itself grant authority to modify protected code, spend money or deploy.

## 0. Before ANY task: cold-start and evidence integrity

- Follow [`docs/CLOSE_PROTOCOL.md` §3](CLOSE_PROTOCOL.md) and [`AGENTS.md`](../AGENTS.md). AGY verifies **all three registered repositories** with native Git: fetch, status, branch/upstream comparison, exact published heads, and `origin/main` separately. A WIP branch is compared with its **own tracking upstream**, not automatically with `main`.
- GPT/Claude verify available published GitHub blobs **at exact SHA refs**; neither can certify the Owner laptop's worktree or private vault without AGY's preserved native output. Identify unexpected divergences, missing remotes, and undisposed untracked files. Do not silently reset, discard or overwrite work.
- Compare the private `YCN_LABS_MASTER/LAST_CLOSE.txt` checkpoint with current refs and timestamp. A post-close change is **a disclosed delta**, not retroactively part of the prior close. Preserve the historical close record; route later decisions through an attributed, hash-verified private addendum.
- The **cold-start generator is a candidate until reviewed and installed**. Use the native Cold-Start Verification Gate regardless; the absence of an uninstalled generator does **not** by itself block read-only inspection or supersede the canonical procedure. Never present a chat summary or an unverified addendum as native proof.

## 1. Mandatory reading order: every new or resumed task

1. [`AGENTS.md`](../AGENTS.md): Owner authority, three-seat boundaries, frozen systems, custody, evidence, approvals and STOP rules.
2. [`docs/START_HERE.md`](START_HERE.md): active V2 architecture, authoritative document hierarchy and repository identity.
3. [`docs/STATE.md`](STATE.md): current queue **and** dated Last Session; distinguish historical facts from current refs.
4. [`docs/BACKLOG.md`](BACKLOG.md): the exact task ID, dependencies, scope and status.
5. [`docs/YCN_OWNER_INSTRUCTIONS_REGISTER.md`](YCN_OWNER_INSTRUCTIONS_REGISTER.md): OI directives and deviations. **While unmerged, read this from the explicitly pinned governance branch**; do not assume it exists on `main`.
6. [`docs/YCN_DECISIONS.md`](YCN_DECISIONS.md): binding decisions and express supersessions relevant to the task.
7. [`docs/YCN_MASTER_PLAN.md` §14](YCN_MASTER_PLAN.md): canonical delivery sequence, acceptance criteria and scope constraints. Do not invent Task 18/19 or alter the plan without Owner approval.
8. [`docs/INDEX.md`](INDEX.md): additional specialized document links, where needed.

**Task intake:** Identify the single task ID, intended outcome, protected file boundaries, dependencies, Owner authorization, evidence required and STOP line. A recommendation, discussion or status summary is not authorization.

## 2. Additional references by scope

| If a task touches… | Read first / control |
|---|---|
| UI, visual, motion, accessibility | [`YCN_DESIGN_SYSTEM.md`](YCN_DESIGN_SYSTEM.md) (wins), [`YCN_CONTENT_SPEC.md`](YCN_CONTENT_SPEC.md), the **draft** [`YCN_DESIGN_TO_CODE_CONTRACT.md`](YCN_DESIGN_TO_CODE_CONTRACT.md) and the exact `app/globals.css` blob. Respect VF19, INPUT-GATE-01, NAV-07, POLISH-TYPE-01 and HOME-01C frozen-system rulings. |
| Homepage, routes, migration or marketing claims | [`YCN_CLAIMS_AND_PROOF.md`](YCN_CLAIMS_AND_PROOF.md), [`YCN_DECISIONS.md`](YCN_DECISIONS.md), active `docs/vnext/` specs and [`YCN_MASTER_PLAN.md`](YCN_MASTER_PLAN.md). Legacy code is **never Git-merged into V2**. |
| Enquiries, email, monitoring, analytics, data or privacy | [`YCN_SYSTEM_ARCHITECTURE.md`](YCN_SYSTEM_ARCHITECTURE.md), [`docs/vnext/14_ACCEPTANCE_CRITERIA_TASKS_07_12.md`](vnext/14_ACCEPTANCE_CRITERIA_TASKS_07_12.md), [`YCN_CLAIMS_AND_PROOF.md`](YCN_CLAIMS_AND_PROOF.md), and authorized legal review. Preserve durable acceptance and verified operator recovery; do not bypass the existing Task 12 release gate. |
| Ops notification hub, subscriptions, blog, saving/sharing, tracking or push | Owner's OI-19 request and the private candidate demo/checklist; classify **existing, planned, proposed, approved, deferred**. Do not assume a new dashboard, blog, push system or Tasks 18/19 have been approved for V1. |
| Logo, media or third-party assets | Brand RULING-01 and brand library's `14_CONTINUITY/RESUME_HERE.md`; source and license inventory. Only approved masters/derivatives may be promoted after exact Owner visual ruling. |
| Security, hosting, releases or operations | [`YCN_OPERATIONS_RUNBOOK.md`](YCN_OPERATIONS_RUNBOOK.md), [`YCN_RISKS_AND_TECH_DEBT.md`](YCN_RISKS_AND_TECH_DEBT.md), [`CLOSE_PROTOCOL.md`](CLOSE_PROTOCOL.md); verify provider settings and Owner release authorization. |
| Any file receipt, export, rename, overwrite, move, delete or backup | `AGENTS.md` intake/evidence rule, DECISION-052 O-08 and exact per-file approved manifest. Keep secrets, raw proof, private documents and backups outside public GitHub. |

## 3. Legal/commercial applicability checks (not legal approval)

| Trigger | Minimum gate before implementation/claim of compliance |
|---|---|
| Personal data, contact forms or privacy notices | Classify actual data/purposes, service providers, applicable law and processing basis with counsel; prepare accurate itemized notice where legally required. Keep enquiry handling **separate** from optional marketing consent. The Owner-approved **up-to-12-month inactive pre-sales policy** is **not verified implemented**; retention/erasure, contact channel and privacy-rights procedure need approved and tested operation. Check the DPDP Act 2023, Rules 2025 and phased commencement. |
| Analytics, identifiers or audience measurement | Prefer data-minimized, privacy-respecting aggregates; disclose actual collection and provider. Before any identifying/cross-site tracking, document necessity, lawful basis, notices, consent/opt-out if applicable, security and Owner/legal approval. Never assume “cookieless = no legal review.” |
| Email, WhatsApp, promotional offers, newsletters or browser push | Verify authenticated email sending and provider event handling; distinguish *sent*, *delivered*, *opened* and *human replied*. Separate transactional from marketing purposes; verify channel-specific permission/opt-out as required. Push must be user-initiated and browser-compatible. No automatic marketing enrollment or push prompt on load. |
| Public identity, claims, metadata, portfolio or copy | Support the exact claim under [`YCN_CLAIMS_AND_PROOF.md`](YCN_CLAIMS_AND_PROOF.md); reconcile market, currency, jurisdiction and legal entity. No unverified client results, offices, years, certifications or guarantees. Legal publication is counsel/Owner-gated. |
| Commercial hosting, finance or third-party rights | Check current hosting contract and plan: Vercel Hobby is non-commercial; **commercial Vercel hosting** requires an eligible paid plan, but another authorized commercial host may also be evaluated. Respect DECISION-052's **₹5,000/month candidate ceiling**, which is not procurement approval. Verify licenses and actual asset rights. |

**Legal caution:** This table is a *review trigger* only; counsel determines actual obligations, commencement, wording and applicability. Do not describe the website as “DPDP-compliant” until implementation, operational controls and applicable legal assessment are substantiated.

## 4. Owner's OI-18 visual-first gate

- **GPT or Claude only** authors and revises a standalone, locally viewable HTML/CSS/JS prototype *before substantive new work*, including nonvisual workflows shown as mock output/process views. AGY **never authors or edits demos**; AGY may intake/hash/test one and separately implement authorized production code.
- Each versioned demo shows intended appearance and behavior, purpose/value, limitations, questions for the Owner and a clear verdict area. Prefer offline/no external requests, dark and light themes, desktop and **375px** mobile; disclose the design-token/source SHA and simulated data.
- Obtain Owner demo verdict (`demo pass`, `demo change: …`, or `demo drop`). **Demo approval ≠ permission to commit, change a frozen system, integrate, deploy or claim real-system acceptance.** Obtain those approvals separately under existing governance.
- Do **not** fabricate blanket exemptions. For already-started tasks, routine corrections or urgent preservation work (including Task 03), preserve the existing authorization and ask the Owner to rule on any necessary demo exception/sequence.

## 5. Evidence → review → publication → STOP

1. Under the active task, AGY prepares private `proof/<task-id>/CHECKLIST.md` and append-only `log.txt`. Capture actual executed commands, raw output, exit statuses, proof hashes and source/output refs. Never silently restore, overwrite, truncate, delete or rerun failed work.
2. Apply task-appropriate tests and evidence, including `pnpm` quality checks for code and real staging acceptance for data/notification changes. A passing unit test/build does **not** prove provider delivery, legal compliance or production readiness.
3. GPT and Claude independently review **one finished, unchanged package** under current Three-Seat Shared Ownership rules. Proposed reduced Tier-2 reviews and `lean` are **not currently approved**; do not enact them by reference to this page.
4. Owner separately decides visual acceptance, legal/protected exceptions, changes, commit, push, merge and deploy. Record which authorizations are present and exactly what was **not** done. Never merge an old/historical repo into V2.
5. **STOP and disclose:** conflicting or stale evidence; unavailable authority/ref; missing necessary Owner authorization; an unexpected dirty/diverged worktree; changed frozen systems without ruling; unsupported legal claim; unregistered artifact or file mutation; failed test or lost evidence.

**Return status:** `POSITION`, `PASS`, `HOLD`, `BLOCKED` or `EXECUTED-STOPPED` with source-backed reason. The single next authorized task remains in `STATE.md`/`BACKLOG.md`, not in this index.

## 6. Amendments Effective on DECISION-055 Adoption
- **PR-Based Single Review:** AGY opens a GitHub Pull Request on an isolated branch; exactly one independent reviewer (GPT or Claude alternating) reviews the diff; three seats convene only for production deployments, customer data handling, or binding legal text.
- **OI-18 Visual Demo Scope:** HTML demos are required for brand-new visible UI screens or changed customer workflows only; backend reliability fixes, schema edits, and scripts require behavioral test contracts and test outputs, not decorative HTML previews.
- **Protected Actions Boundary:** AGY prepares changes and opens PRs; AGY never merges to main, pushes tags, or records adoption without explicit typed Owner authorization.
