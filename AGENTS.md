> **Active Development Repository:** Public `ycn-labs-site` (`https://github.com/yash-wd/ycn-labs-site`) on branch `main`. Read `docs/START_HERE.md` first.  
> **Historical Reference Notice:** The former private repository (`yash-wd/ycnlabs`) and branch `site-v2` are preserved for historical record.  
> **Current Homepage Architecture:** `app/page.tsx` → `components/CinematicHomepage.tsx` → `components/homepage/vnext/HomepageVNextPhase1.tsx`. Older homepage components in `components/` are not current simply because they exist; retain them pending verified import analysis.  
> **Deployment Constraint:** No production deployment is authorized.

# YCN Labs — AI Agent Operating Instructions

**Notice for all AI Assistants (GPT, Claude, Antigravity/AGY, Gemini, Copilot):**  
This is an active commercial project operating under strict governance and safety protocols.

---

## 1. Mandatory Reading Order (Cold Start)

Before proposing or making any change, read these files in order:

1. **[`docs/INDEX.md`](docs/INDEX.md)** — Master documentation index and authority map.
2. **[`docs/YCN_AGENT_OPERATING_PROTOCOL.md`](docs/YCN_AGENT_OPERATING_PROTOCOL.md)** — Operating boundaries, zero-loss rules, shop-owner sentence test.
3. **Relevant Specs:**
   - For UI/Text: [`docs/YCN_CONTENT_SPEC.md`](docs/YCN_CONTENT_SPEC.md) & [`docs/YCN_DESIGN_SYSTEM.md`](docs/YCN_DESIGN_SYSTEM.md)
   - For Logic: [`docs/YCN_REQUIREMENTS.md`](docs/YCN_REQUIREMENTS.md) & [`docs/YCN_MASTER_PLAN.md`](docs/YCN_MASTER_PLAN.md)
4. **[`docs/YCN_AGY_TASKS.md`](docs/YCN_AGY_TASKS.md)** — Current authorized task queue.
5. **[`docs/YCN_DECISIONS.md`](docs/YCN_DECISIONS.md)** — Binding Owner architecture & scope decisions.
6. **[`docs/YCN_CLAIMS_AND_PROOF.md`](docs/YCN_CLAIMS_AND_PROOF.md)** — Evidentiary rules for marketing claims.
7. **[`docs/YCN_RISKS_AND_TECH_DEBT.md`](docs/YCN_RISKS_AND_TECH_DEBT.md)** — Active risks, controls, and technical debt.
8. **[`docs/CLOSE_PROTOCOL.md`](docs/CLOSE_PROTOCOL.md)** — Permanent close, consolidation, and cold-resume protocol (`YCN-CLOSE-PROTOCOL-01`).

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
Start of every chat: git fetch; git status --porcelain; git rev-parse HEAD and origin/main (must match); read docs/START_HERE.md, docs/STATE.md, docs/BACKLOG.md; state HEAD before any work.
Tasks: only from the Owner's message, one at a time, stop at the STOP line, no extra work. Owner words: A/B, yes/no, seen, push. A recommendation is not an approval. Unclear → ask: "Sir, I have a question."
Evidence: raw command output and exit codes; file hashes from sha256sum, never typed; never rewrite a log, never delete your output and rerun silently; on any failure stop and report. Report format: task ID, HEAD before/after, commands + output, changed files, what was NOT done, blockers.
Forbidden without explicit words: rm -rf outside scratch, git reset --hard, git clean, git push --force, --amend on pushed commits, git add -A (use explicit paths). Never print .env values (names only), never read shell history, never paste tokens.
Code: before any code commit run pnpm run lint, check-types, test, build and paste exit codes. One task = one commit with the task ID in the message. Push only after Claude's verdict and the Owner's "push". Exception: CLOSE commits per docs/CLOSE_PROTOCOL.md are pushed on the Owner's word CLOSE. Frozen systems stay frozen: VF19, INPUT-GATE-01, NAV-07, POLISH-TYPE-01, HOME-01C.
Visual work: before/after screenshots at 375/768/1024/1280/1440, both themes, reduced motion; save to the vault under proof/<task-id>/ and give paths.
Dev server: pnpm run dev on port 3005 for development; stop it at day end; pnpm start only to verify a build.
Skills/MCP: use the installed skills and MCP servers where they fit (design, UI/UX, browser, testing); name which one you used in each report; never claim a skill you do not actually have.
End of day, always: every approved green change committed and pushed to main; unfinished work committed to branch wip/<task-id> and pushed (nothing lives only on this laptop); then ./tools/close-day.sh "<done>; <next>" → STATE.md pushed; paste git log -1 and git status; state explicitly if anything remains unpushed.

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
