# YCN Labs vNext — Homepage Experience Master

**Internal concept:** PRODUCT IN MOTION  
**Status:** Production direction. Exact public copy remains subject to Owner sign-off.

---

## 1. Homepage principle

The homepage should be understood as a sequence of **visual chapters**, not stacked sections.

Every chapter must answer one question.

The product/device is the first visual protagonist, but it is not dragged through the entire page. The experience deliberately changes visual language after the first chapter cluster.

---

# CHAPTER 0 — Entrance Film + Logo Takeover

## Purpose
Create one premium first-impression moment and turn the logo into the starting point of the interface.

## Owner-supplied assets
- horizontal entrance video for desktop/tablet;
- vertical entrance video for mobile.

## Sequence
1. First eligible session loads entrance overlay.
2. Correct desktop/mobile video plays muted, inline.
3. Skip control and Esc are available.
4. At film end, official YCN logo is shown full-screen, isolated.
5. Small, restrained "Scroll to explore" / indicator appears.
6. First scroll gesture drives logo scale/translation toward its exact navbar position.
7. Navbar items animate in from above/staggered.
8. Hero content underneath resolves from soft/hidden to sharp/visible.
9. Entrance overlay is removed from interaction tree.

## Important
Hero DOM exists beneath from frame one. The film is an enhancement, not the only way into the site.

## Reverse
Returning to the top may expand the navbar logo slightly into the hero composition, but the 10-second film does not replay.

---

# CHAPTER 1 — Hero / The Product Enters

## Job
Immediately position YCN around business improvement, not technology categories.

## Working headline
> **Build what moves the business forward.**

## Working support
> YCN Labs turns business problems into digital products that make it easier for customers to act, teams to work clearly, and the business to keep moving.

## Visual
A premium phone/device containing a **real DOM illustrative product** enters the composition.

The phone is not a mockup image with baked text. Its screen is authored HTML/CSS/SVG so copy remains crisp and states can change.

## Motion
- device enters with physical weight;
- controlled camera push-in;
- hero text reveals after logo hand-off;
- no floating card swarm;
- no technology icons.

---

# CHAPTER 2 — Phone Carry-Over / Customer Clarity

## Job
Show what changes for the customer.

## Transition
The same phone from Hero crosses into this chapter rather than disappearing and respawning.

Use a single persisted DOM/device object where practical, or a FLIP/shared-layout illusion with no visible discontinuity.

## Copy direction
> **Make the next step obvious.**

The phone state can demonstrate:
- understand the offer;
- compare/choose;
- one clear action.

Use very short labels.

---

# CHAPTER 3 — Pinned Product Story / Action + Business Response

## Job
Show that YCN designs both what the customer does and what the business does next.

## Pattern
Phone stays composed while text chapters change around it.

Recommended beats:

### 01 — Understand
Visitor knows what is relevant.

### 02 — Act
Enquire / book / buy / apply / request with fewer unnecessary steps.

### 03 — Receive
The action reaches an organised business-side state.

### 04 — Move
Owner/next step/status becomes visible.

The screen state changes while the device remains.

## End state
The phone moves to a final resting composition and **stops being the recurring device**.

This matters. Do not carry the phone through every later chapter.

---

# CHAPTER 4 — Visual Reset / "The front is only half"

## Job
Signal that YCN is not only designing a screen.

## Treatment
No phone continuity.

Use editorial typography + spatial change.

Working line:
> **The experience is only the front.**

Supporting concept:
What happens after a customer acts matters just as much.

This chapter creates breathing room before the laptop sequence.

---

# CHAPTER 5 — Laptop Appears / Blank to Working

## Job
Introduce the business/system side with a new visual language.

## Visual
Premium laptop/device enters with a quiet/blank screen.

## Scroll sequence
1. Laptop appears in physical perspective.
2. Screen wakes/populates with real DOM content.
3. Product state shows a small, understandable business view:
   - New request
   - Owner
   - Next step
   - Status
4. Camera approaches laptop.
5. Bezel grows beyond viewport edges.
6. Screen content becomes the full viewport.

## Reverse
Scrolling back:
- full-screen system contracts;
- bezel returns;
- camera pulls back;
- screen can return to quiet state.

This sequence must be one deterministic GSAP timeline.

---

# CHAPTER 6 — Inside the Product / Full-Screen Workflow

## Job
Let the visitor feel they have entered the product.

## Visual language
No device bezel now. Full-screen product/system environment.

Show a simple business flow using plain labels:
- Enquiry / Booking / Order / Request
- Received
- Assigned
- Next action
- In progress
- Complete

## Motion
Request moves through the system as the visitor scrolls.

Avoid:
- database nodes;
- API labels;
- infrastructure diagrams;
- abstract "data nebula";
- code syntax.

The system must look useful before it looks technical.

---

# CHAPTER 7 — Business Flow / Connected Requests

## Inspiration
Celsior's moving platform/data energy, translated into YCN's plain-language model.

## Job
Show that scattered activity can become visible and coordinated.

Possible input streams:
- Website
- Enquiry
- Booking
- Order
- Team update

Possible resolved outputs:
- One owner
- One next step
- Clear status
- Follow-up

## Visual
A restrained stream/flow animation.

No galaxy/particles.
No fake live customer data.
No brand logos unless real/authorized.

---

# CHAPTER 8 — Results / Proof

## Job
Answer: "Does this create a useful result?"

## Visual
BudgetDev-inspired animated graph/data presentation, but evidence-controlled.

### If real verified metrics exist
Animate the actual verified result with source-linked copy.

### If real metrics do not exist
Use one of:
- non-numeric outcome progression;
- clearly labelled "Illustrative model";
- product usage/process example with no claim of measured improvement.

Never invent:
- revenue increase;
- conversion increase;
- cost savings;
- time saved;
- customer growth;
- performance percentage.

---

# CHAPTER 9 — How YCN Works / Stable Frame

## Inspiration
Celsior-style stable section where the frame remains and content changes.

## Job
Explain method without becoming a long timeline.

Suggested four-part working model:
1. Understand
2. Shape
3. Build
4. Improve

## Visual
One standard composition stays in place.
Only key text / small diagram / product state changes as scroll progresses.

This is intentionally calmer than earlier cinematic chapters.

---

# CHAPTER 10 — Work / Evidence

## Job
Show real work honestly.

Use large editorial media, not cards by default.

For each item:
- classification;
- verified stage;
- problem;
- what YCN contributed;
- verified outcome if available.

If evidence is incomplete, do not fake a finished case study.

---

# CHAPTER 11 — FAQ / Accordion

## Job
Answer practical buyer concerns.

Topics:
- I am not technical. Can I still start?
- Do I need to know whether I need a website/app/system?
- Can YCN work with something we already have?
- How are cost and scope decided?
- Who owns the result?
- What happens after launch?
- How is support handled?
- What information should I bring?

Use accessible accordion behavior.

---

# CHAPTER 12 — Quiet Close

## Working line
> **What needs to work better?**

Support:
Start with the business problem. YCN can determine the appropriate product and technology afterward.

Primary CTA:
> **Start a Project**

Descriptor:
> **Software, engineered to hold up.**

Motion:
- minimal;
- no explosive finale;
- product/system settles;
- logo/CTA get room to breathe.

---

## 2. Home section order summary

1. Entrance film
2. Logo takeover → nav
3. Hero + phone enters
4. Phone carries into customer chapter
5. Pinned phone/product story
6. Phone settles
7. Editorial reset
8. Laptop blank → product
9. Zoom into laptop screen
10. Full-screen workflow
11. Connected requests/data flow
12. Verified/illustrative results
13. Stable "How we work" frame
14. Work/evidence
15. FAQ
16. Quiet close

---

## 3. Important variety rule

Do not use:
- phone carry-over again after its chapter;
- laptop portal a second time;
- parallax on every section;
- pinning on every section;
- split text on every heading.

A premium page has rhythm: motion → stillness → motion → clarity → proof → action.

---

## 4. Execution Contract (Claude Homepage Production Spec)

### 0. The Object — Spec Once, Reuse Everywhere

`<ProductObject>`: a DOM phone frame (and, in Scene 5, a laptop frame) whose `screen` contains named **states**. Real text, real controls (inert), "Sample · nothing is sent" label always inside the frame. Never a raster, never a video, never generated imagery.

| State | Face | Screen content (plain words, no vendor names, no prices) | Used in |
|---|---|---|---|
| S0 `find` | customer | "Your business" — what you offer, where and when, one action "Ask a question" | Hero, Ch.01, list |
| S1 `ask` | customer | "Ask a question" — a typed request, Send, then "Sent · Received by your business" | Ch.02 |
| S2 `handle` | business | "Requests" — new request Assigned; booking Confirmed; order Reply sent; "Every request has a name and a next step." | Ch.03, laptop |
| S3 `keep` | business | "Today" — everything running OK, backups OK, "Something wrong? You know who to call" | Ch.04 |
| S4 `grow` | both | the same product with a second channel/team member added — room for what comes next | Ch.05 [CANDIDATE] |

State changes are cross-fades of layers inside one screen (opacity/transform only), 300–450 ms, reversible. The object itself moves only by transform (translate/scale/rotate). One instance is authoritative per section; hand-offs between sections use GSAP **Flip** (measure destination rect → animate transform) so the object appears to travel, and the arriving section's content reveals *from* the object.

---

### 1. Scene List & Viewport Jobs

| # | Scene | Job (one per screen) | Object | Height / pin |
|---|---|---|---|---|
| 0 | Entrance | Brand arrival, never blocking | logo only | overlay, scrubbed 100vh hand-off |
| 1 | Hero | Immediate understanding | enters from right, comes close | 100svh |
| 2 | Statement | One sharp truth | none | 70svh |
| 3 | Chapters 01–04 | The product earns its place | stays (sticky) while text scrolls | 4 × 100svh desktop / 4 × 70svh mobile, sticky object, no pin |
| 4 | Hand-off | The object travels to the desk | phone → laptop screen | 120vh scrub |
| 5 | Inside the business (laptop) | Camera enters the screen; the business side fills the viewport | laptop screen becomes the page | pinned 200vh desktop; stacked mobile |
| 6 | Customer side / Business side | Two faces of one product | split, both states | 100svh |
| 7 | Results | What changes, shown as illustrative graphs | none | 100svh |
| 8 | How we do it | Frame stays, content swaps through 8 steps | none | pinned 300vh desktop / stacked mobile |
| 9 | Requests flow | Requests move into the product, outcomes leave | object centre | 100svh, loop paused offscreen |
| 10 | The turn | "Software, engineered to hold up." | none | pinned 110vh desktop / scrub mobile |
| 11 | Honest work | What we are building | none | auto |
| 12 | FAQ | Buyer questions | none | auto |
| 13 | Start a Project | One action; local needs finder | none | auto |
| — | Footer | Canon lines | none | auto |

Reversibility rule for every scene: scrub-linked timelines only (`scrub: true` or ≤0.6); toggle-based reveals must define `toggleActions:'play none none reverse'`. Scrolling back must return every state, position and opacity exactly.

---

### 2. Scene-by-Scene Detailed Execution Specifications

#### Scene 0 — Entrance
Two permitted variants; Owner chooses.
- **A — Code (Architecture v2 §3):** request symbol draws → Y-fork → arc with cyan signal → exact official logo → settles into navbar; 2.2–2.6 s.
- **B — Video (Owner addon):** orientation-native film, poster-first, muted, one source fetched; on end, the final frame crossfades to the official logo PNG held centred within 60% of the shorter side on `#0D111A`; "Scroll" hint; then a **scroll-scrubbed 100vh hand-off**:
  * 0–70%: logo translates and scales along one transform path to the measured navbar slot;
  * 70–80%: presentation logo and real navbar logo swap at identical geometry;
  * 80–90%: nav items enter from −12px, 40 ms stagger;
  * 90–100%: Hero unblurs (blur 12→0 on the media layer only, never on body text) and fades in.
Both variants: fixed overlay; page rendered and interactive beneath from the first byte; Skip ≥44px and Esc; focus moves to Hero on dismiss; `sessionStorage.ycnEntranceSeen`; reduced-motion / Save-Data / slow connection / any media error → static logo 400 ms; internal navigation and back/forward never replay; mobile shortens to ~2 s (A) or uses the 9:16 film (B). Nothing loads below the fold until the entrance is 80% done.

#### Scene 1 — Hero
Grid 1.1fr / 0.9fr desktop; stacked mobile (text first, object below, object ≤48vw). Copy: H1 HERO-01, sub, "Start a Project" primary, "See what we build" ghost, reassurance. Object enters from +40% x, rotateY −26→−14°, scale .86→1, 1.1 s power3.out, after the entrance hands off. Scroll scrub across the Hero: rotateY −14→−4, scale 1→1.08 (the camera comes closer). Honda behaviour: object states S0→S1 advance on scroll thresholds; after 6 s idle with no input, advance one state with a 1px progress line; stop on any input, on hover/focus, offscreen, reduced-motion. Hero `<img>`-free: LCP element is the H1; no media above the fold except the entrance film (variant B) which is reported as its own cost.

#### Scene 2 — Statement
Dark section. **[CANDIDATE]** "Your customers shouldn't need an explanation." + "A good product says what it does the moment someone opens it. Then it gets out of the way." Type-only. Enters as one line reveal (SplitText lines, 500 ms) — the only non-scrubbed reveal outside the entrance.

#### Scene 3 — Chapters (the car returns)
Two columns desktop: object column `position: sticky; top: 0; height: 100svh` (native sticky, not pin); text column of four chapters, each `min-height: 100svh`, each with counter `01 / 04`, H2, one line, ghost CTA "Start a Project". Chapter enter (top 55%) switches object state S0→S1→S2→S3 (onEnter/onEnterBack). Mobile: object sticky at top:64px, ≤48vw wide, chapters 70svh, text below. Copy **[CANDIDATE]**:
- 01: "Customers find you — and understand you." / "What you offer, where you are, when you're open, how to reach you. Clear on the first screen, on any phone."
- 02: "They ask, book or order without waiting for a call back." / "One simple path from 'I'm interested' to a request your business actually receives."
- 03: "Your team sees every request in one place." / "Calls, messages and notes stop living in five places. Each request gets a name and a next step."
- 04: "It keeps working. Someone answers when it doesn't." / "Tested before launch, watched after it, supported as agreed."
A subtle idle float on the object (y ±8px, 2.6 s, sine) — stops in reduced motion. After chapter 04 the sticky releases and the object performs the hand-off (Scene 4). After that hand-off this sticky-object pattern is **not used again** on the page.

#### Scene 4 — Hand-off (phone → desk)
120vh scrub. On desktop: GSAP Flip captures the phone's rect, the laptop section's screen rect is the target; the phone scales/translates into the laptop screen while the laptop frame fades in around it (the phone becomes the app on the desk). On mobile: 90vh crossfade — the phone shrinks upward as the laptop frame rises; no Flip across sticky boundaries (keeps native scroll clean). Reversible.

#### Scene 5 — Inside the business (the laptop)
Pinned 200vh on desktop. The laptop frame sits centred with a **blank dark screen**;
- At 0–25%: the screen lights and state S2 (`handle`) fades in;
- At 25–70%: the camera pushes in (container scale 1→1.9, translate to keep the screen centred) until the screen's edges pass the viewport edges;
- At 70–100%: the frame is gone and the business interface **is the page** — the request list, owner, next step, progress — with the section's H2 laid over it from the screen's own layout. Copy **[CANDIDATE]** "Simple outside. Structured inside." / "Customers should not have to understand your internal process. Your team should not have to fight the product to do the work."
Leaving the section, the scale returns (reverse on scroll back). Mobile: no pin; laptop frame at 90vw, then the interface expands to full width beneath it in native scroll (a scrubbed scale 1→1.15 only). `will-change: transform` set on enter, removed on leave. Nothing inside is a raster: the "screen" is DOM at 100% zoom.

#### Scene 6 — Customer side / Business side
Full-viewport split (stacked mobile): left the phone in S1 with "Make the next step obvious."; right the business list in S2 with "Make the next step visible." **[CANDIDATE]** headings. One thin signal line joins them and draws on scrub (stroke-dashoffset) — the only cyan on screen.

#### Scene 7 — Results (illustrative)
H2 **[CANDIDATE]** "What changes when the work has somewhere to go." Two typed graphs drawn as inline SVG animated by scrub (stroke-dashoffset; no chart library): "requests that reach someone" rising, "requests waiting" falling — **no axis numbers, no percentages, no counts**; caption "Example workflow — not measured business results. Your numbers depend on your business."
Data contract: `kind: 'illustrative-process'` (fixed shapes) | `kind: 'verified-result'` (value, unit, dates, source, method, permission — incomplete config throws, never renders). Text/table alternative for screen readers.

#### Scene 8 — How we do it
Desktop: pinned two-column, left "You know your business. We know technology." fixed; right swaps Talk → Understand → Plan → Design → Build → Test → Launch → Improve with one line each and a vertical progress line; scrub over 300vh, reversible. Mobile: stacked list with the line filling as each step passes. Reassurance line from CONTENT_SPEC §6.

#### Scene 9 — Requests flow
Centre: the product object (S2). Left edge: chips "Web form", "Message", "Phone call", "Walk-in" travel curved SVG paths into it; right edge: "Booking confirmed", "Quote sent", "Job assigned", "Reminder" leave. 12 s loop, GSAP MotionPath, paused when offscreen and on hidden tab; static SVG in reduced motion. No logos, no counts, no partner names. Label "Sample · illustrative".

#### Scene 10 — The turn
Pinned 110vh desktop: "Software," present; "engineered to hold up." arrives (opacity .15→1, y 20→0, colour ink2→ink). Support **[CANDIDATE]** "Talk, understand, plan, design, build, test, launch, improve. Eight steps in plain language, and you see the design before we build it." Mobile: scrub without pin.

#### Scene 11 — Honest work
"What we are building" block per CONTENT_SPEC HOME—Work; items only when the claims register allows.

#### Scene 12 — FAQ
CONTENT_SPEC §10, native `<details>`, one open at a time, 250 ms chevron/disclosure, no background motion.

#### Scene 13 — Start a Project + needs finder
H "Tell us what you're trying to improve." + body + primary CTA + reassurance (canon). Above the CTA, the local needs finder: label "What would you like to make easier?", four preset buttons (the four PATHS) + "Not sure yet", optional typed input matched against a ~30-word local map → deep link to `/what-we-build#need` or `/contact`. No network, no storage, no analytics.

#### Footer
Canonical footer per CONTENT_SPEC §11.

---

### 3. Homepage Elements to Remove (Lineage b49f46a Cleanup)

- **Remove:** The homepage-wide diagram/card sections that failed the Owner gate: pathway card grid, layer cards with icons, any engineering-terms surface (Zod/PostgreSQL/Sentry/RLS), enquiry-object diagram scene, Scene-5 3D canvas (parked until a ruling), any "Illustrative Scenario" shop copy, any character/scenario photography plans.
- **Keep:** Nav shell, theme provider, canon copy positions, contact subsystem, claims discipline, a11y patterns, GSAP setup, entrance skeleton (to be replaced by Scene 0 variant chosen).

