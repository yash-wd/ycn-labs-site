# YCN LABS — DOCUMENT GUIDE: WHICH DOCS GOVERN WHICH PHASE (until release)
_Keep this file with YCN_HANDOFF.md. AGY reads all docs from the repo; uploads below apply only to GPT/Claude chats._

---

## 0. THE FULL DOCUMENT INVENTORY (repo `docs/` unless noted)

**Living / always-current (the spine):**
- `YCN_HANDOFF.md` — current state, rules, roadmap. THE continuity file. Must be updated by AGY at the end of every phase. When any doc conflicts with it on current state, the handoff rules.
- `YCN_UNIFIED_ENTRANCE_ARCHITECTURE_FINAL_v2.md` — locked entrance + cinematic architecture authority.

**Binding reference (canon — change only by Owner ruling):**
- `YCN_CONTENT_SPEC.md` — every canonical sentence on the site.
- `YCN_CLAIMS_AND_PROOF.md` — claims register; what may be said publicly and what evidence backs it.
- `YCN_DESIGN_SYSTEM.md` — palette, type, tokens (being corrected to match handoff per ruling R1).
- `YCN_DECISIONS.md` — historical binding Owner decisions (architecture/scope).

**Scope & build reference:**
- `YCN_MASTER_PLAN.md` — overall phases, release steps, acceptance criteria.
- `YCN_REQUIREMENTS.md` — functional requirements (matters most for the enquiry backend).
- `YCN_V2_EXPERIENCE_MASTER.md` — implemented homepage experience/shot map (derived; canon wins on conflict).
- `YCN_RISKS_AND_TECH_DEBT.md` — active risks and debt; governs hardening.

**Process / historical:**
- `INDEX.md` — authority map of all docs.
- `YCN_AGENT_OPERATING_PROTOCOL.md`, `YCN_AGY_TASKS.md` — old gate-era process; superseded by the accelerated mode in the handoff, kept for history.
- `docs/legacy/` — history only, never authority.
- Evidence report: `/home/ycn-labs/Desktop/ycnlabs.com/YCN-PROJECT/evidence/B2/12_AGY_ACCELERATED_BUILD_REPORT.md` — consolidated build evidence.
- `AGENTS.md` / `GEMINI.md` (repo roots) — agent operating rules AGY loads automatically.

---

## 1. PHASE MAP — what to upload to GPT/Claude per phase

### PHASE A — NOW: Owner browser review of b49f46a + ONE tuning pass
**Uploads needed:** the 6 already shared (HANDOFF, ARCHITECTURE_v2, CONTENT_SPEC, CLAIMS_AND_PROOF, EXPERIENCE_MASTER, DESIGN_SYSTEM). **Nothing more.**
Flow: Owner verdict → GPT writes ONE tuning instruction → Claude audits → AGY executes → Owner re-checks → homepage APPROVED.
Exit: AGY updates HANDOFF ("homepage approved at <SHA>").

### PHASE B — Supporting pages visual alignment (/what-we-build, /how-we-work, /about, /engineering)
**New uploads:** none — same 6 govern. CONTENT_SPEC = the copy for each page; ARCHITECTURE_v2's design language (three motifs, no AI-slop, tiering) extends to these pages; /engineering is where technical depth lives.
Guard: Claude audits that homepage claims discipline carries over; no jargon leaks onto customer pages.
Exit: HANDOFF updated; Owner browser pass over all four pages.

### PHASE C — B3 Enquiry/Contact backend
**ADD uploads:** `YCN_REQUIREMENTS.md` + `YCN_MASTER_PLAN.md` (+ `YCN_DECISIONS.md` if backend architecture questions arise).
This is the first real backend work: form → validation → storage → notification. Claims rule: the site may only describe what the shipped backend actually does. Security/privacy basics live in requirements.
Exit: working enquiry flow verified end-to-end locally; HANDOFF updated.

### PHASE D — Work page
**ADD:** Owner's JS-Learn evidence (screenshots/repo/links — Owner provides; this is the blocker AGY cannot create). CLAIMS_AND_PROOF governs hard: every portfolio claim needs its evidence entry; "Design Study" labels stay on non-client work.
Exit: Work page live locally with only evidenced items; HANDOFF updated.

### PHASE E — Hardening (a11y / SEO / performance / security)
**ADD:** `YCN_RISKS_AND_TECH_DEBT.md`.
Checklist source: architecture v2 §5 cautions + design-system a11y rules (44px targets, 4.5:1 contrast, focus states, reduced-motion) + measured (never assumed) bundle/LCP numbers.
Exit: risks doc updated with what was fixed vs accepted; HANDOFF updated.

### PHASE F — D1 Testing: device regression + five-person comprehension test
**Docs:** MASTER_PLAN acceptance criteria (already uploaded in C). The five-person no-explanation test is the real gate: five non-technical people scroll the site; each must state what YCN does and how to start, unaided. Device pass: 375/768/1024/1440, light/dark, reduced motion, real phone network check (no 3D chunk on mobile).
Exit: results recorded in evidence report; failures loop back as targeted fixes only.

### PHASE G — D2 Freeze & Production release
**Docs:** MASTER_PLAN release steps + HANDOFF's promotion rule (memorize it): promote the exact approved site-v2 candidate to production main **WITHOUT importing the 12 guarded local-main commits**; verify live on ycnlabs.com; have rollback = redeploy previous main SHA (6a017e0 lineage) ready before promoting.
Exit: live site verified; HANDOFF final update; project moves to maintenance mode.

---

## 2. STANDING RULES ACROSS ALL PHASES (never re-upload, never renegotiate)
1. Never touch main (local 8fd4837 / origin 6a017e0) until Phase G's controlled promotion.
2. Push only `refs/heads/site-v2:refs/heads/site-v2`.
3. Claims register binding; Sample/Illustrative labels stay; no guarantees/jargon/invented taglines.
4. lint / check-types / test / build exit 0 before every commit.
5. Owner browser review is the only visual gate; AGY never self-approves, never fabricates evidence.
6. Measured numbers only — no FPS/bundle claims without method.
7. End of every phase: AGY updates YCN_HANDOFF.md in a docs commit. That habit is what makes any future chat swap painless — the 6-file upload always stays sufficient because the handoff always carries the delta.

## 3. IF A CHAT FILLS UP AGAIN (repeatable recipe)
Upload: current `YCN_HANDOFF.md` + `ARCHITECTURE_v2` + this guide + the phase-specific docs from §1. Paste the one-paragraph seat assignment (strategy / review). Done — no history needed, ever.

_End of guide._
