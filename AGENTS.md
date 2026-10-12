> Public repo, branch main: read docs/START_HERE.md first.

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
