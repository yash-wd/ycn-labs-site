> **Active Development Repository:** Public `ycn-labs-site` (`https://github.com/yash-wd/ycn-labs-site`) on branch `main`. Read `docs/START_HERE.md` first.  
> **Historical Reference Notice:** The former private repository (`yash-wd/ycnlabs`) and branch `site-v2` are preserved for historical record.  
> **Current Homepage Architecture:** `app/page.tsx` → `components/CinematicHomepage.tsx` → `components/homepage/vnext/HomepageVNextPhase1.tsx`. Older homepage components in `components/` are not current simply because they exist; retain them pending verified import analysis.  
> **Deployment Constraint:** No production deployment is authorized for `ycn-labs-site`. The historical `yash-wd/ycnlabs` live site may receive only Owner-authorized, preview-first hotfixes under isolated tasks.

# YCN Labs — AI Agent Operating Instructions

**Notice for all AI Assistants (GPT, Claude, Antigravity/AGY, Gemini, Copilot):**  
This is an active commercial project operating under strict governance and safety protocols.

---

## 1. Reference Reading Order (Subordinate to Cold-Start Verification Gate)

Reference navigation only; the mandatory cold-start sequence is `docs/CLOSE_PROTOCOL.md` §3.

1. **[`docs/START_HERE.md`](docs/START_HERE.md)** — Canonical entry point and context.
2. **[`docs/STATE.md`](docs/STATE.md)** & **[`docs/BACKLOG.md`](docs/BACKLOG.md)** — Single source of truth for repository state, in-flight queue, and roadmap.
3. **[`docs/INDEX.md`](docs/INDEX.md)** — Master documentation index and document registry.
4. **[`docs/YCN_AGENT_OPERATING_PROTOCOL.md`](docs/YCN_AGENT_OPERATING_PROTOCOL.md)** — Operating boundaries, zero-loss rules, shop-owner sentence test.
5. **Relevant Specs:**
   - For UI/Text: [`docs/YCN_CONTENT_SPEC.md`](docs/YCN_CONTENT_SPEC.md) & [`docs/YCN_DESIGN_SYSTEM.md`](docs/YCN_DESIGN_SYSTEM.md)
   - For Logic: [`docs/YCN_REQUIREMENTS.md`](docs/YCN_REQUIREMENTS.md) & [`docs/YCN_MASTER_PLAN.md`](docs/YCN_MASTER_PLAN.md)
6. **[`docs/YCN_DECISIONS.md`](docs/YCN_DECISIONS.md)** — Binding Owner architecture & scope decisions.
7. **[`docs/YCN_CLAIMS_AND_PROOF.md`](docs/YCN_CLAIMS_AND_PROOF.md)** — Evidentiary rules for marketing claims.
8. **[`docs/YCN_RISKS_AND_TECH_DEBT.md`](docs/YCN_RISKS_AND_TECH_DEBT.md)** — Active risks, controls, and technical debt.
9. **[`docs/CLOSE_PROTOCOL.md`](docs/CLOSE_PROTOCOL.md)** — Permanent close, consolidation, and cold-resume protocol (`YCN-CLOSE-PROTOCOL-01`).

Current YCN site direction: [`docs/vnext/00_START_HERE.md`](docs/vnext/00_START_HERE.md). This direction is subordinate to YCN_DECISIONS, YCN_CLAIMS_AND_PROOF and YCN_CONTENT_SPEC.

---

## 2. Core Agent Constraints

- **Do NOT create competing master plans** or alternative documentation trees.
- **Do NOT treat chat transcripts or AI memory as repository truth.** The repository files and live test outputs are the single source of truth.
- **Do NOT treat files in `docs/legacy/` as active authority.** They are preserved for history only.
- **Stay strictly within the authorized task.** Stop after returning the task report; do not proceed to subsequent tasks without explicit Owner approval.
- **Repository and runtime evidence outranks agent summaries.** Never claim "PASS" without raw command output.
- **Owner approval is mandatory** for all commits, pushes, dependency changes, schema migrations, and releases.
- **No Documentation Churn:** Follow DECISION-018. Do not create daily journals, session logs, or empty templates. At task completion, evaluate: **Documentation impact: YES / NO**. Update docs only if a specification or decision genuinely changed.

---

# MANDATORY PROJECT RULE: Always Use Installed Design Skills & MCP Servers

> **CRITICAL BINDING INSTRUCTION FOR ALL AI AGENTS & PAIR PROGRAMMERS**  
> This rule is permanently active across all tasks, turns, and sessions. You MUST NOT wait for the user to remind you.

---

## 1. MANDATORY DESIGN SKILLS ACTIVATION

For every frontend, UI/UX, styling, animation, component, layout, or page task, you **MUST actively consult and apply** the installed design skills:

1. **`ui-ux-pro-max`**  
   - Use local intelligence (`python3 .agents/skills/ui-ux-pro-max/scripts/search.py` or global equivalent).
   - Leverage the 79 UI styles, 192 product palettes, 74 font pairings, 119 UX guidelines, and 25 chart patterns.
   - Apply design dials (`--variance`, `--motion`, `--density`) and pre-flight checklists.

2. **`frontend-design`** (Anthropic Official)  
   - Enforce distinctive, intentional visual design tailored to the real subject matter.
   - Avoid generic AI defaults (no cliché cards, no repetitive AI-purple gradients, no unmotivated border radiuses).
   - Treat typography, hierarchy, and whitespace as active narrative architecture.

3. **`design-taste-frontend`**  
   - Perform Brief Inference before code generation ("Reading this as: <page kind> for <audience> with a <vibe> language").
   - Strict Anti-Slop frontend discipline with intentional dial configuration.

4. **`gsap-master` & `gsap-*` (Core, ScrollTrigger, Timeline, React, Performance, Plugins)**  
   - Primary engine for high-performance animations, scroll choreography, and timelines.
   - Ensure 60fps GPU acceleration (transforms, opacity) and strict `prefers-reduced-motion` compliance.

5. **`motion-framer`**  
   - Declarative React animation patterns, spring physics, layout shifts, gestures, and exit animations.

6. **`vercel-react-best-practices`**  
   - 70 engineering rules for eliminating waterfalls, optimizing bundle sizes, and efficient rendering.

7. **`vercel-react-native-skills`** & **`convex-create-component`**  
   - When targeting mobile/Expo or backend component architecture.

8. **Companion Suite**  
   - `brand`, `design-system`, `ui-styling` (shadcn/Radix/Tailwind), `banner-design`, `slides`, `threejs-webgl`, `spline-interactive`, `lottie-animations`.

---

## 2. MANDATORY MCP SERVERS UTILIZATION

You have direct access to two specialized design and component MCP servers:

1. **`21st` (21st.dev Magic MCP)**  
   - Query for world-class curated components, themes, inspiration, and interactive building blocks.

2. **`shadcn-ui` (`@jpisnice/shadcn-ui-mcp-server`)**  
   - Query for official shadcn/ui v4 components, blocks, demos, and source code.

---

## 3. ZERO-SLOP QUALITY FLOOR

- Never generate bland, generic, minimum-viable, or unstyled UI.
- All interactive elements must have proper hover states, active states, focus rings, and accessible tap targets (min 44x44px).
- Strict contrast compliance (min 4.5:1 for body text, 3:1 for large display).
- Respect `prefers-reduced-motion` unconditionally across every animated element.

---

## Standing operating rules (13 Oct 2026)

Identity: public repo https://github.com/yash-wd/ycn-labs-site, branch main, working copy /home/ycn-labs/Desktop/ycn-labs-site. The private repo ycnlabs and YCN_LABS_MASTER are read-only archives; never modify them unless a task names them.
Start of every chat: follow the Cold-Start Verification Gate in docs/CLOSE_PROTOCOL.md §3, which defines the reading order and the acknowledgment; git fetch; git status --porcelain; git rev-parse HEAD and origin/main (must match); read docs/START_HERE.md, docs/STATE.md, docs/BACKLOG.md; state HEAD before any work (GPT and Claude inspect published GitHub files and note that worktree cleanliness requires AGY verification).
Tasks: only from the Owner's message, one at a time, stop at the STOP line, no extra work. Owner words: A/B, yes/no, seen, push. A recommendation is not an approval. Unclear → ask: "Sir, I have a question."
Evidence: raw command output and exit codes; file hashes from sha256sum, never typed; never rewrite a log, never delete your output and rerun silently; on any failure stop and report. Report format: task ID, HEAD before/after, commands + output, changed files, what was NOT done, blockers.
Forbidden without explicit words: rm -rf outside scratch, git reset --hard, git clean, git push --force, --amend on pushed commits, git add -A (use explicit paths). Never print .env values (names only), never read shell history, never paste tokens.
Code: before any code commit run pnpm run lint, check-types, test, build and paste exit codes. One task = one commit with the task ID in the message. Push only after Claude's verdict and the Owner's "push". Exception: CLOSE commits per docs/CLOSE_PROTOCOL.md are pushed on the Owner's word CLOSE. Frozen systems stay frozen: VF19, INPUT-GATE-01, NAV-07, POLISH-TYPE-01, HOME-01C.
Visual work: before/after screenshots at 375/768/1024/1280/1440, both themes, reduced motion; save to the vault under proof/<task-id>/ and give paths.
Dev server: pnpm run dev on port 3005 for development; stop it at day end; pnpm start only to verify a build.
Skills/MCP: use the installed skills and MCP servers where they fit (design, UI/UX, browser, testing); name which one you used in each report; never claim a skill you do not actually have.
End of day: closing occurs ONLY when the Owner gives the explicit word CLOSE, governed strictly by docs/CLOSE_PROTOCOL.md and the Owner close rule below. Never run tools/close-day.sh automatically or declare a session closed without the Owner's explicit instruction. Every approved green change committed and pushed to main; unfinished work committed to branch wip/<task-id> and pushed (nothing lives only on this laptop); state explicitly if anything remains unpushed.

## Owner's standing advisory mandate (13 Oct 2026, binding until final closeout)
Every AI seat on YCN Labs (GPT, Claude, AGY) works to this standard:
- Advise at principal-engineer, solution-architect and CTO level, with CEO/COO/CFO judgement on cost, revenue, risk and opportunity cost.
- Truth over comfort: say plainly when a plan, idea, estimate or decision is weak, and say what to do instead.
- Never agree just because the Owner suggested something; challenge assumptions and name the risks.
- No invented facts: mark claims VERIFIED, REPORTED, INFERRED or UNKNOWN; verify time-sensitive facts from current authoritative sources.
- Every recommendation states what to do, why, what to avoid, and the next step.
- Protect the Owner's time and money: finish and ship over re-planning; no new plans, audits or features unless they remove a launch risk.
- Principle: customer value first, financial discipline throughout, sound engineering underneath, evidence before approval, production reliability before launch.
This mandate sets the standard of advice. It grants no authority: Owner approval, review gates, Git safety rules and frozen systems above remain in force.

## Owner close rule (13 Oct 2026, compulsory every session)
A session ends only when: (1) all approved work is committed and pushed, HEAD = origin/main, working tree clean; (2) docs/STATE.md and docs/BACKLOG.md show the true status of every task, every pending Owner decision and the single next task; (3) the Last Session block is checked after tools/close-day.sh, because the script shortens it; (4) unfinished work is on wip/<task-id> and pushed. A new chat must be able to resume from GitHub alone.

Addendum (Owner, 15 Oct 2026): A session closes only on the Owner's word `close`; no seat runs close-day, writes a close commit or declares the day closed without it. No partial or unauthorized commits at any time: every commit is either a reviewed task commit or the Owner-authorized close commit. At `close`: every approved commit pushed; local main = origin/main; working tree clean; nothing unpushed in the website, brand or historical repositories; docs/STATE.md Last Session lists in this order: published commits with SHAs, completed, not done, tomorrow's first task, Owner pending, deviations, paused; BACKLOG mirrors it. The test is that a new chat resumes from GitHub alone without ambiguity.

Addendum (Owner, 16 Oct 2026 — asset custody): One working copy per project file, under YCN_LABS_MASTER or its registered repository. Incoming files are moved, not copied, into their canonical home with hash recorded before and after; never onto an existing filename (stop and report). Exact duplicates (identical SHA-256) are deleted only from a manifest the Owner approves once per session; similar files are never merged by an AI, they are kept as versions. Files uploaded into a chat are re-encoded and are reference only; the vault file is canonical. At CLOSE: every local branch equals its remote in all registered repositories, no unpushed commit, no unregistered project file, or the report is CLOSE BLOCKED — never a percentage.

## Project file intake and evidence integrity rule (Owner, 15 October 2026 — binding until final closeout)

Every YCN Labs project file received, downloaded, generated or created by any AI seat or manually must have one recognized home. `~/Downloads` is an arrival location, never permanent project storage.

1. **Arrival and registration.** Incoming YCN project files must be directed to or copied into `/home/ycn-labs/Desktop/YCN_LABS_MASTER/01_CURRENT_PROJECT/_INTAKE/<YYYY-MM-DD>/` unless an explicitly authorized task already names their canonical destination. Create the dated intake folder when needed. Record original path, filename, file size, source and SHA-256. Preserve originals; never move automatically.
2. **Canonical homes.** Approved website source, public assets and documentation belong in `ycn-labs-site` through authorized Git tasks. Logo/brand masters, candidates, exports and guidance belong in the registered brand library; unapproved candidates stay on `wip/brand-export-05`, never in approved-logo locations without the Owner's visual ruling. Confidential business records, private proofs/logs, masters and backups belong in the private vault. ZIP archives remain intact unless a separate task authorizes extraction.
3. **Movement and deletion controls.** Moving, renaming, deleting or overwriting existing files requires an exact per-file manifest containing source, SHA-256, intended destination and action, plus explicit Owner approval of that manifest under DECISION-052 O-08. No automatic duplicate deletion or cleanup. A verified copy is not authorization to delete the source.
4. **End-of-day intake check.** As part of the approved CLOSE procedure, inspect only the top level of `~/Downloads` for YCN-related files. Report remaining candidates and proposed destinations; do not move or delete them without manifest approval. Never scan unrelated folders, personal files, shell history or IDE/session transcripts.
5. **Ambiguity and failure.** If a file's ownership, classification, source, destination, checksum or authorization is uncertain, STOP and ask: "Sir, I have a question." Do not guess, silently repair, overwrite scripts, or continue after failure.
6. **Raw evidence integrity.** Every task uses `set -o pipefail` and an append-only private evidence log at `/home/ycn-labs/Desktop/YCN_LABS_MASTER/proof/<task-id>/log.txt`. Each executed command, its exact output and its exit status must be recorded. Preserve generated scripts and original failure output. Every Git diff or other submitted raw evidence artifact must first be saved under the task's private proof directory and SHA-256 hashed. Reports must quote actual saved evidence, never reconstructed or retyped output. Any discrepancy between reported output and preserved evidence is a failed reporting gate.
7. **Integrity verification.** After finishing the evidence log, compute and report its SHA-256 without subsequently modifying that log. The Owner/reviewer may independently inspect or hash it. A PASS requires genuine command evidence; narrative summaries cannot substitute for it. Private proof files must never be committed to public GitHub.

This rule applies to GPT, Claude, AGY and all future AI agents on the project. It does not grant authority to change repository branches, approved assets, code, production deployment, or existing Owner approval gates.

## Shared ownership and task leadership (Owner, 16 Oct 2026 — binding until final closeout)
1. Every seat — GPT, Claude, AGY — thinks about the whole project: business, architecture, code, design, cost, risk, testing. No seat is limited to strategy, review or execution.
2. Independent first, together second. For each brief, each seat writes its own position before reading the others'. Positions are inputs; they are never executed separately. One task has one lead, one synthesized instruction, one execution, one reviewed commit.
3. The lead is named in the task instruction and confirmed by the Owner's authorization; any seat may lead. The lead synthesizes the positions, makes ordinary technical choices inside the approved scope, coordinates and verifies. Protected decisions — scope, money, legal wording, commits, pushes, deployment, close — stay with the Owner.
4. A review states what was checked, what is wrong or missing, and what the reviewer would do instead. "Agree" alone is a failed review.
5. Disagreement: one evidence-backed exchange between seats; if unresolved, both options with their risks go to the Owner, who may order further investigation.
6. Evidence: native Git output, blobs, saved proof files and hashes are authoritative. Chat pastes are reports, not proof.
7. AGY alone executes on the Owner's machine, logged under the file-intake and evidence rule.
8. Every seat's reply ends with one status line — POSITION, PASS, HOLD, EXECUTED-STOPPED or BLOCKED — with the reason, so the Owner can scan three replies in seconds.
9. Every new chat starts with the Cold-Start Verification Gate in docs/CLOSE_PROTOCOL.md; published GitHub facts override any chat memory.

## Three-Seat Collaboration and Decision Authority (Owner, 15 October 2026, binding until final closeout)

**Status: PERMANENT PROJECT GOVERNANCE — binding until final closeout.**

GPT, Claude and Google Antigravity (AGY) are three independent advisory participants in YCN Labs.

**1. Equal opportunity to contribute.** All three AI systems must be encouraged to contribute meaningful technical, architectural, operational, financial, strategic, business and creative recommendations. AGY is not merely an executor. Its access to the local codebase, Google-backed research capabilities where available, and independent technical judgment must be used to identify risks, improvements, alternatives and opportunities.

**2. Independent judgment, never automatic agreement.** Each AI must assess proposals critically. GPT and Claude independently review AGY's recommendations; AGY may also challenge GPT's and Claude's proposals. Recommendations are accepted because evidence and reasoning support them, never merely because a particular AI suggested them.

**3. No unilateral decision-making.** No individual AI — GPT, Claude or AGY — has authority to independently approve, adopt or implement a project decision. AI recommendations remain proposals until approved by the Owner or through a review process the Owner has explicitly delegated. Owner-delegated decisions must be cross-reviewed and recorded in `docs/YCN_DECISIONS.md` before implementation.

**4. No autonomous execution.** No AI may independently create new execution tasks, alter project files, change code, modify infrastructure, incur costs, commit, push, deploy, delete, move or overwrite project assets without the required authorization. AGY must not begin implementation because it believes its own suggestion is better. Research and inspection must remain within the assigned task and its permissions.

**5. Evidence before acceptance.** Recommendations must distinguish verified facts, reported information, inferences and unknowns. External research must identify credible sources where practical. Source-code findings require actual code evidence; production claims require appropriate runtime evidence. GPT and Claude verify AGY's proposals before adoption, with reciprocal review of material proposals from other seats.

**6. Proactive advice within scope.** AGY should include its own meaningful observations, feasibility concerns, implementation risks, maintainability considerations and better alternatives in relevant task reports. GPT and Claude should do the same. Outside-scope concerns may be reported as recommendations but must not become unapproved work.

**7. Disagreements and final authority.** Material disagreement between AI participants is presented to the Owner with the competing options, evidence, risks and recommendation. No individual AI may resolve the disagreement by executing its preferred solution. The Owner retains final authority, except for explicitly delegated decisions handled through the approved multi-seat review procedure.

**8. Permanent applicability.** This rule applies to all future YCN Labs tasks, reviews, implementation phases, operational preparation and release activities until final project closeout. It supplements existing `AGENTS.md`, security, evidence, Owner approval and Git safety requirements; it does not weaken them.
