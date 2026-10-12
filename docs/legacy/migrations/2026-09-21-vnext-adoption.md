STATUS: COMPLETED MIGRATION RECORD — NOT ACTIVE AUTHORITY

# YCN LABS — DOCS MIGRATION & OWNER RULING
**Purpose:** put 01 and 02 into the repository canon without creating a second competing authority, and record exactly what the Owner still has to decide.

## 1. How these files fit the existing canon
The repo already has a canonical set (INDEX → PROTOCOL → MASTER_PLAN → REQUIREMENTS → CONTENT_SPEC → DESIGN_SYSTEM → AGY_TASKS → TEST_CHECKLIST → DECISIONS → CLAIMS → BACKLOG → CHANGELOG → HANDOFF → ARCHITECTURE v2 → reference master). These two new files do not replace it:
- `01_YCN_SITE_MASTER_BRIEF.md` → committed as `docs/YCN_SITE_MASTER_BRIEF.md`. Precedence: below explicit Owner rulings and CONTENT_SPEC/CLAIMS, above the reference master. It is the "what the site is" file every new chat reads after HANDOFF.
- `02_HOMEPAGE_PRODUCTION_SPEC.md` → committed as `docs/YCN_HOMEPAGE_PRODUCTION_SPEC.md`. It is the execution contract for the homepage pass (the document GPT was going to write; it now exists and GPT refines it only where the Owner asks).
- The reference master stays reference. `YCN_V2_EXPERIENCE_MASTER.md` is marked historical (its scene bible is superseded by 02).

## 2. Owner ruling — paste in your name to GPT, Claude and AGY
> **Owner ruling, 21 Sep 2026 (final direction).** DECISION-019 ("Between") is superseded. The homepage subject is the product YCN makes, shown as a live DOM screen that travels through the page (Forge pattern: one object returns in every chapter). No scenario photography, no service cards, no technology names or logos on the homepage. Direction per docs/YCN_SITE_MASTER_BRIEF.md; homepage per docs/YCN_HOMEPAGE_PRODUCTION_SPEC.md. The frontend skills map in the brief §5 and the quality bar in §3 are standing rules — do not ask me again. Canon copy unchanged; candidate lines pending my ratification (03 §4). Palette, fonts, logo, claims register, Git rules and Architecture D4–D8 unchanged. Entrance variant: **[A code / B video — Owner to state]**.

## 3. AGY docs-only task (one commit, then stop)
1. Verify branch/HEAD/sync with raw output (site-v2, HEAD 3d358a6, origin in sync, mains untouched).
2. Add `docs/YCN_SITE_MASTER_BRIEF.md` and `docs/YCN_HOMEPAGE_PRODUCTION_SPEC.md` (contents of 01 and 02, unchanged except the ratified decisions filled in).
3. `YCN_DECISIONS.md`: mark DECISION-019 SUPERSEDED (keep text); add **DECISION-020 · Homepage subject = the product object (Forge pattern) · OWNER-FINAL** with the ruling text; add **DECISION-021 · Homepage excludes service cards and technology names · OWNER-FINAL**; add **DECISION-022 · Entrance variant [A/B]** as the Owner states.
4. `YCN_HANDOFF.md`: replace "R4 continuity & execution rules" items 1–3 with a pointer to DECISION-020/021 and the two new docs; update PENDING NOW to "homepage pass per PRODUCTION_SPEC after Owner ratifies candidate copy"; keep everything else.
5. `YCN_CONTENT_SPEC.md`: no canon changes; add a "Candidate copy under review" block listing §4 below verbatim, each line marked CANDIDATE. When the Owner ratifies, move lines into canon positions in the same commit as the ratification.
6. `YCN_UNIFIED_ENTRANCE_ARCHITECTURE_FINAL_v2.md`: if variant B is chosen, add an Owner amendment note to §3 ("video variant per PRODUCTION_SPEC Scene 0B; all non-blocking rules retained"); D5/D6 (Scene-5-only lazy 3D) become "parked — no homepage 3D unless a later ruling names one signature moment".
7. `YCN_BRAND_EXPERIENCE_REFERENCE_MASTER_FINAL.md` §31–32: mark the counter prompts superseded ("no scenario photography; the product object is DOM").
8. `YCN_V2_EXPERIENCE_MASTER.md`: header note "historical; scene bible superseded by YCN_HOMEPAGE_PRODUCTION_SPEC.md".
9. `INDEX.md`: register the two new documents; correct the target candidate SHA. `YCN_CHANGELOG.md`: one dated entry.
10. lint / check-types / test / build exit 0 → commit → push `refs/heads/site-v2:refs/heads/site-v2` → report raw → STOP. No code.

## 4. Candidate copy awaiting the Owner's yes (edit freely; your words win)
- Statement: "Your customers shouldn't need an explanation." / "A good product says what it does the moment someone opens it. Then it gets out of the way."
- Chapter 01: "Customers find you — and understand you." / "What you offer, where you are, when you're open, how to reach you. Clear on the first screen, on any phone."
- Chapter 02: "They ask, book or order without waiting for a call back." / "One simple path from 'I'm interested' to a request your business actually receives."
- Chapter 03: "Your team sees every request in one place." / "Calls, messages and notes stop living in five places. Each request gets a name and a next step."
- Chapter 04: "It keeps working. Someone answers when it doesn't." / "Tested before launch, watched after it, supported as agreed."
- Chapter 05 (optional): "Room for what comes next." / "Customers, team, new channels, new workflows — on the same foundation."
- Laptop section: "Simple outside. Structured inside." / "Customers should not have to understand your internal process. Your team should not have to fight the product to do the work."
- Split: "Make the next step obvious." / "Make the next step visible."
- Results: "What changes when the work has somewhere to go."
- Rule line (may appear on Engineering, not homepage): "The technology is a decision. Not the pitch."
- Turn support: "Talk, understand, plan, design, build, test, launch, improve. Eight steps in plain language, and you see the design before we build it."
- Product screen strings: "Your business · What you offer · Where and when · Ask a question · Sent · Received by your business · Requests · New request · Assigned · Confirmed · Reply sent · Every request has a name and a next step · Today · Everything running · Backups · Something wrong? You know who to call".

## 5. Decisions only the Owner can make (answer these, then the build starts)
1. Entrance: A (code, 2.4 s) or B (video, 10 s + logo hold). If B: the films must be re-exported clean (no watermark, no portrait tagline) and the Owner sets audio policy (recommend muted; sound only on explicit tap).
2. Candidate copy in §4: ratify, edit, or reject line by line.
3. Chapter 05 "grow": include or drop (four chapters is tighter; five matches GPT's "leave room for what comes next").
4. Results section: keep as illustrative graphs now, or hold until the first real, permissioned client data exists.
5. Any single signature 3D moment (e.g. Scene 5 push-in in WebGL) — or none. Recommendation: none for launch; DOM/GSAP does the job and phones never pay for it.

## 6. Pipeline from here
Owner answers §5 → AGY docs commit (§3) → Claude audits commit → AGY homepage pass per PRODUCTION_SPEC (one continuous pass, local WIP commits, one push) → AGY evidence per 02 §7 → Claude audit by exception → **Owner browser review on desktop and phone** → fixes → supporting pages per MASTER_BRIEF §6 → contact backend → Work page → hardening → five-person test → freeze → controlled promotion to production.
