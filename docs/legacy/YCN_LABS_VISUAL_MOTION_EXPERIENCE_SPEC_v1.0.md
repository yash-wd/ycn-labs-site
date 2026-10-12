> [!NOTE]
> **HISTORICAL REFERENCE ONLY — NOT ACTIVE PROJECT AUTHORITY**
> This document is preserved for engineering provenance and historical record.
> It has been superseded by the **YCN Canonical v1.2** specification suite.
> For current active project specifications, task queues, and architecture, consult [`docs/INDEX.md`](../INDEX.md).

---

# YCN Labs Visual & Motion Experience Specification — revision 1.2

**Status:** CUSTOMER-FIRST REDESIGN TARGET — Revision 1.2 adopting owner-approved customer-journey decisions, closed code/document conflict, everyday screen visual model, and single breadth strip
**Date:** 2026-09-14
**Stable canonical filename:** `YCN_LABS_VISUAL_MOTION_EXPERIENCE_SPEC_v1.0.md` is retained to preserve repository references. Revision 1.2 replaces conflicting prior text directly; do not keep a second active copy.
**Redesign authority:** `AGENTS.md` §3.9. This file contains design decisions and targets, not claims of deployed work.  
**Scope:** YCN Labs presentation layer, visual grammar, scene composition, motion behaviour, responsive adaptation, media treatment, and route-level experience patterns  
**Authority:** Admitted by `AGENTS.md` §3.8 as a technical specification. It is not a roadmap, phase plan, or task queue.  
**Execution pointer:** `PROJECT_STATE.md` only.  
**Canonical art direction:** **The Instrument Field** (grounded in everyday business screens; 3D is camera and staging only).

---

# 1. EXPERIENCE THESIS

YCN Labs is not presented as a sequence of website sections. It is presented as a digital system becoming dependable.

The visitor first understands a literal offer: **websites and software built around their business**. The system metaphor explains that offer; it does not replace it.

The visitor experience is:

**Recognise my need → See a customer action → Understand what can break → See the route → Explore the supporting layers → See the same journey hold → Inspect honest proof → Start a conversation**

The persistent visual idea is the **Signal Line / Digital Business Core**. It is not decoration. It explains the relationship between customer, digital system, and business, and it changes state as the story advances.

The emotional target is **precision, confidence, curiosity, and controlled technical depth** — never spectacle for its own sake.

The site should feel authored, not templated; cinematic, not theatrical; technically serious, not cyberpunk.

---

# 2. GOVERNING UX PRINCIPLES

## 2.1 Motion rule of thumb

> **Render immediately. Reveal progressively. Never make essential content depend on animation.**

All essential headings, body copy, navigation, CTAs, images and diagrams exist server-side in the document from first response.

Motion may change presentation state but never determine whether essential information exists.

## 2.2 Three reading depths

Every major section must work at three depths:

1. **Glance** — one headline plus one dominant visual idea.
2. **Scan** — one or two short supporting lines and clear labels.
3. **Inspect** — optional detail, evidence, progressive disclosure, or a link to `/engineering`, `/work`, or a deep service route.

Business visitors must understand the page at Glance/Scan depth. Technical evaluators may continue into Inspect depth.

## 2.3 One scene, one visual idea

No homepage scene may default to a generic grid of cards when a more direct spatial explanation exists.

Repeated design grammar across adjacent scenes is prohibited unless the repetition is narratively intentional, as with Scene 3 and Scene 6.

## 2.4 Cinema never blocks intent

At all times:

- normal navigation remains usable;
- a direct project-contact action remains reachable;
- a story bypass to `#solutions` remains available where the immersive homepage mode is active;
- the direct contact path remains available;
- no visitor must complete an animation before navigating or converting.

## 2.5 Progressive technical depth

Homepage technical proof is concise and qualitative by default. Full measurements, tools, environments, dates and technical artefacts belong on `/engineering` unless a specific visitor-facing number has separately approved provenance.

---

# 3. VISUAL IDENTITY IN MOTION

## 3.1 Overall visual character

The design language is a **precision instrument for business transformation**.

Primary characteristics:

- large calm negative space;
- strong editorial scale changes;
- fine technical hairlines;
- restrained elevation;
- controlled dark/light contrast bands;
- diagrammatic relationships instead of decorative card stacks;
- small monospaced evidence labels;
- one persistent line/system language;
- measured use of brand blue for action and signal cyan for data/signal states;
- real or clearly labelled conceptual imagery only where it advances the story.

Avoid:

- purple/violet visual language;
- generic SaaS gradient blobs;
- glass everywhere;
- floating particles;
- fake terminal typing;
- fake dashboards presented as evidence;
- unexplained 3D objects;
- stock-office imagery;
- excessive rounded card grids;
- visual effects with no user or business meaning.

### 3.1.1 Canonical art direction — The Instrument Field

The distinguishing device is not a decorative object. The page reads as **a technical field with a working system under inspection**.

Most generic studio sites are built from cards on a background. YCN Labs is built from a **persistent spine with instruments attached to it**:

1. **Continuous spine** — the Signal Line should be perceived as one system across Scenes 1–7. Implementation may use independently revertible scene segments, but adjacent segments should visually hand off at scene boundaries rather than look like unrelated illustrations. Adjacent scene-segment endpoints align within <=1.0px at 390, 768, 1024, 1280 and 1440px, measured using the established T-38-S4 geometry method.
2. **Engineering drawing language** — registration ticks, dimension lines, leader lines, station glyphs, load arrows and restrained field grids may annotate the system when they explain structure, pressure, measurement or state.
3. **Paired pressure fields** — Scenes 3 and 6 are the only two full-width pressure/test fields. They share the same geometry and tonal role because they are the same test with different results. In light theme they may use the inverse cinematic surface; in dark theme they use a clearly differentiated existing semantic surface rather than introducing a new palette. Contrast is measured, never assumed.

Drawing-language rules:

- hairline geometry is the default; heavier strokes are reserved for one focal state;
- annotations use Geist Mono and remain secondary to the business idea;
- no gradient fills, glow, particles or decorative technical clutter;
- line state is never communicated through colour alone;
- the drawing language must survive forced-colors through geometry, text, strokes and shapes;
- after Scene 7 the active instrument/spine choreography retires and Mode B becomes calm proof.

## 3.2 Typography

Geist remains the interface/body typeface. Geist Mono remains the evidence/annotation face.

Typography hierarchy should create the first layer of visual drama before animation is added.

Rules:

- giant type is used only when one idea dominates the frame;
- scene headings are concise;
- supporting copy is capped to short readable measures;
- technical annotations are smaller but must remain comfortably legible at all required viewports;
- paragraphs should not form large uninterrupted walls of text;
- important sentences are broken into visual beats rather than wrapped into dense prose blocks.

## 3.3 Surface language

Use three visual surface families only:

1. **Canvas** — large calm page fields.
2. **Instrument Surface** — small evidence/inspection panels.
3. **Inverse / Cinematic Band** — deliberate dark or contrasting story states.

A scene should not become a mosaic of many independent panels unless the content genuinely requires comparison.

---

# 4. OPENING EXPERIENCE AND BRAND ARRIVAL

## 4.1 First viewport contract & hero demonstration — revision 1.2

The first viewport must contain, visibly and immediately:

- the YCN Labs mark/artwork;
- `Websites and software. Built around your business.` (locked H1);
- `Help customers find you, make it easier to enquire or book, and connect the work behind the scenes.` (locked supporting copy);
- `Tell us what you need` → `/contact` (primary solid action);
- `Explore what we build` → `#solutions` (secondary action, serving as the approved story bypass; separate `Skip the story` control withdrawn per AGENTS §3.10);
- `You don’t need a technical brief to start.` (reassurance microcopy);
- usable primary navigation.

The offer dominates. Real YCN primary actions remain visibly dominant; sample interactive controls must never become the hero's only apparent action.

**Hero demonstration (dual-surface staging):**
The hero composition illustrates both sides of a dependable business connection as ONE demonstration (customer action $\rightarrow$ business arrival):
1. *Customer-facing surface (foreground):* A mobile phone displaying a local dining menu preview (`Paneer Tikka Roll · ₹180`, `Dal Makhani Bowl · ₹220`, `Fresh Lime Soda · ₹80` = `₹480 · 3 items`) with an outlined mock action `[ Example action · View menu & order ]` with secondary descriptor `Sample restaurant · concept demonstration` (`Sample · nothing is sent`). The mock control is non-interactive or purely illustrative; it never reaches `/api/contact`.
2. *Business-side arrival (midground):* The EXISTING R-02 `SampleEnquiryDemo` component, retained as the business-side arrival demonstration (customer action $\rightarrow$ business arrival; not replaced with a newly invented order notification queue).

**Governed disclosure label (AGENTS §7):**
`Interactive concept · sample data, not client work`
*(Prominently preserved; the restaurant-specific descriptor `Sample restaurant · concept demonstration` provides secondary context but does NOT replace this governed disclosure. Non-production behavior: "nothing is sent", and the sample action must never reach `/api/contact`).*

**Single breadth strip (directly beneath hero illustration):**
Directly below the dual-surface composition sits one restrained row of three small recognisable device thumbnails proving that the pattern applies across industries:
1. **Restaurant** (Menu & ordering)
2. **Salon** (Service menu & booking)
3. **Wholesale / Retail** (Catalogue & trade enquiry)

This is one breadth row, not three competing hero compositions and not a second introduction. The dominant example remains the restaurant journey. On small/short mobile screens the illustration may follow below the opening offer and CTA. The message cannot wait for the illustration.

## 4.2 No intro gate

A mandatory 5–8 second autoplay intro film is not part of v1.0 and remains prohibited by `AGENTS.md` §6.4 as a **concept rule**, independent of Lighthouse performance. Better scores do not unlock it; only a later explicit owner policy amendment could do so.

No full-screen overlay may prevent access to content until scroll or JavaScript occurs.

## 4.3 Logo-to-navbar cinematic concept

The target future motion behaviour is retained as an enhancement:

1. a large cinematic brand mark begins inside the hero composition;
2. as the visitor scrolls, the cinematic mark scales and translates toward the header identity location;
3. the real navbar DOM remains fixed, stable and accessible throughout;
4. near the target point, the cinematic mark crossfades ownership to the real navbar logo;
5. reverse scroll reverses the visual transition;
6. no layout geometry depends on the animated layer;
7. no width/height/top/left animation is required for the primary motion path;
8. reduced-motion users receive a static large-mark hero and normal navbar mark;
9. no-JS and Save-Data paths contain the complete hero without the cinematic layer.

The optional logo handoff is lower priority than customer-action comprehension. Its prototype eligibility follows AGENTS §3.9 E–F; production acceptance still requires measured cost, cleanup and fallbacks.

---

# 5. HOMEPAGE — ONE BUSINESS STORY, SEVEN DISTINCT SCENES

> **NOTE (R-05):** Spec §5 is superseded by AGENTS §3.11 pending rewrite at R-07 (release) after the six-section rebuild is complete.

## 5.0 Shared subject and content model

The persistent subject is **a customer enquiry**, not an unexplained luminous signal. A phone represents the customer's action; an HTML inbox represents the business receiving and acting on it; the spine links scene instruments as before. Use one clearly labelled demonstration with fictional sample content. Do not add invented customer names, revenue, email addresses, order counts, logos or security ratings.

Keep the seven anchor IDs and existing accepted spine infrastructure. A scene-local visual and the inter-scene connective spine remain different primitives. No requirement is fulfilled by pretending unrelated SVG endpoints occupy the same coordinate plane. Measure real visible boundary endpoints when changed; preserve the canonical ≤1.0px criterion.

Source narrative, sample state, pressure/held pairs and normal/reduced-data variants from one content module. Recommended type responsibilities (verify current repo before naming files): `NarrativeScene`, `PressureJoint` with failure/success copy, `ServiceOutcome` with route and capability status, `WorkEvidence` with classification/stage/provenance. The names are proposed interfaces, not claims of existing code.

## 5.1 Scene 1 — The Gap / `#promise`

**Headline:** Websites and software. Built around your business.

**Copy:** Help customers find you, make it easier to enquire or book, and connect the work behind the scenes.

**First action:** Tell us what you need → `/contact`. **Alternative:** Explore what we build → `#solutions`. Reassurance: “You don’t need a technical brief to start.”

**Composition:** Editorial copy on the left; a recognisable customer phone and business inbox on the right. Both interfaces are real HTML in light CSS perspective, not text baked into an image. Keep the actual logo and fonts. The model should feel like a crafted product demonstration rather than a futuristic factory. The scene label and engineering annotations are subordinate, never the main headline.

**Demonstration states:** Rest shows a sample customer action and its intended business destination. Clicking “Send sample enquiry” updates the demonstration to “Sample enquiry received” and “Example complete. No message was sent.” The visitor can reset. This is a local UI simulation, not evidence that a message reached any server. No live contact endpoint is invoked. The business output is described in a polite status region; motion carries no exclusive meaning.

**Motion:** A restrained signal progresses along the drawn route after the explicit action; the inbox changes state. A separate brand handoff may be evaluated later, but does not determine navigation or reveal the offer. No autonomous loop. On reverse story scroll the spatial enhancement reverses; do not overwrite the visitor's explicitly selected sample state.

**Mobile:** Stack customer and business views with distinct captions and sufficient spacing. Do not overlap readable controls or reduce a desktop canvas until controls become tiny. Offer, CTA and bypass take priority above the illustration.

**Static/no-JS:** Both endpoint meanings and the sample relationship are visible; the nonfunctional simulation button is omitted. Real service/contact links remain.

## 5.2 Scene 2 — Conditions / `#quality-budgets`

**Headline:** Your customers shouldn’t have to work this hard.

**Copy:** A useful digital experience gets out of the way. It helps people understand your business and finish what they came to do.

**Dominant visual:** A common inspection bench for three understandable conditions: **find the next step / use it on a phone / complete the action**. Performance, Accessibility and Reliability become the optional explanatory names underneath, not jargon required to understand the section.

The T-83 carriage/bench work may be reused if it supports these meanings. The former freeze is reopened only for the current customer-first copy hierarchy and required local binding. Do not reset accepted mechanisms because a new font-size preference appears.

**Motion:** A single controlled inspection highlight progresses through the three states while all their content remains readable. Avoid “VERIFIED”, “SCANNING” or fabricated live diagnostic badges suggesting an audit of the visitor's business. Use neutral diagram state if a label is required. No numerical score on this scene.

**Static/mobile:** One connected, stacked bench with full readable labels. No accordion required to learn the basic business meaning.

## 5.3 Scene 3 — Pressure / `#the-pressure`

**Headline:** A click means little if nothing happens next.

**Copy:** Slow pages, confusing forms and lost requests interrupt the journey between your customer and your business.

**Shared four-joint definition:**

| Joint | Failure outcome | Held outcome for Scene 6 |
|---|---|---|
| Slow access | They leave before it loads. | A useful page arrives. |
| Keyboard access | They can’t finish the form. | They can complete the action. |
| Request delivery | They press send. You miss it. | Their enquiry reaches you. |
| Account access | The wrong person sees it. | Each account stays separate. |

**Visual:** The same enquiry route, with physical interruptions at the relevant joints. Place short consequence text beside each failure rather than a wall of independent problem cards. The failed destination is visibly unreached through geometry and text, not red alone. The two pressure fields share geometry, tone and joint positioning.

**Truth label:** “Illustrative failure scenarios.” Do not claim that a particular prospect's current supplier has these defects.

**Motion:** Reuse the accepted T-81 fracture vocabulary where it remains appropriate. Greater movement requires fresh perception/contrast testing, not arbitrary amplitude growth. No glitch art, shaking viewport, explosions or random motion.

## 5.4 Scene 4 — The Route / `#the-foundation`

**Headline:** First, understand the business. Then, connect the dots.

**Copy:** Start with what your customer wants to do and what your business needs to happen next—not a list of technologies.

**Visual:** Customer goal → simple action → right information → useful workflow → clear outcome. These are stations on a connected route, not a separate feature-card layout. Example sublabels: “What do they need?”, “Enquire, book or order”, “Keep what matters”, “Give work a next step”, “Know what happened”. They are counted as prose where applicable; no diagram-label exemption for sentences.

**Motion:** A route draws through sequential stations, each briefly becoming the focal point. All station labels exist before the draw. Connect scroll progress to native document position; reversing scroll reverses the enhancement. No drag-to-progress requirement. Preserve or carefully adapt existing track alignment.

**Mobile:** Vertical path with generous readable steps, never a forced horizontal journey. Link to `/process` for deliverables and decision gates; do not use the homepage as the full project-management manual.

## 5.5 Scene 5 — The Layers / `#services`

**Headline:** One smooth experience. Not a collection of disconnected tools.

**Copy:** Your website is the front door. The work underneath connects customer actions to the people, information and processes behind them.

**Layer ordering, visible first:**

| Layer | Primary business label | Optional explanation |
|---|---|---|
| Customer Experience | What your customers use. | Website, mobile experience, customer portal |
| Operations | What your business does next. | Enquiries, bookings, records, workflows |
| Intelligence (optional) | Less repetitive work. | Useful automation, qualified AI feasibility, human review |
| Resilience | What keeps it dependable. | Testing, access controls and support as scoped |

**Dominant visual:** A crafted four-plane cutaway. Use a recognisable customer screen at the front and a business workflow beneath. Perspective teaches what sits under the interface. Business text stays unrotated and legible in HTML. No “CORE 01”, “conduit transmission” or technical noun-list takes priority over the meaning.

**Automatic base motion:** CSS/SVG layers separate gently and recompose. No more than two parallax depths, desktop only; do not move text away from its semantic reading position. Intelligence visibly branches as optional rather than a compulsory layer on every contract.

**Real 3D:** An explicit **Explore the system in 3D** control opens one scene in a dialog/inline viewport. The production candidate is Three.js with a compact Blender-authored or procedural GLB. The current delivery prototype uses an original native 3D renderer (WebGL with software projection when WebGL is unavailable) to demonstrate mesh rotation and layer separation without an external runtime. These are alternative implementations, not a recommendation to keep both.

Camera controls must include keyboard-operable native sliders/buttons; no drag-only controls and no free-flight maze. Offer rotate, separate layers, reset and close. HTML labels and explanations remain outside the canvas. Stop work on hidden tabs/offscreen; render only when needed; cap texture/draw-call complexity; dispose on close/unmount; handle no-WebGL/context-loss with the complete static cutaway. Capture software-rendered and actual hardware results separately.

**Authoring:** GLB node names map to semantic layers. Use simple PBR materials and restrained lighting; no baked paragraph text, no mandatory HDR map or expensive postprocessing. The supplied procedural GLB is a blockout, not final Blender art direction. The supplied Blender script is an authoring aid and has not been executed in the delivery environment.

## 5.6 Scene 6 — Held / `#how-we-build`

**Headline:** Their action reaches you. Your business moves it forward.

**Copy:** The same customer journey, designed with clear actions, confirmation, appropriate access and a defined next step.

**Visual:** Exactly Scene 3's route and pressure points, now with restrained bracing and an uninterrupted connection. Use the success strings from the shared joint definition. The T-81 fixed glyph / clamp-arm vocabulary is a retained asset, not a reason to restart the pilot.

**Truth label:** “Illustrative desired behaviour · not an audit result.” A simulated check is not proof of zero loss, security compliance, universal accessibility or uptime. The next link opens separately labelled real engineering evidence.

**Motion:** Same test input and opposite route response, with less movement than Pressure. Keep the held route fixed and connected. A successful sample request may show a follow-up state, but must not manufacture a live enquiry.

## 5.7 Scene 7 — Arrival / `#proof`

**Headline:** From “I’m interested” to “let’s talk.”

**Copy:** That’s the kind of connection your website should make.

**Dominant visual:** The customer action reaches the business, and the two sides settle into one composed result. This is the single culmination—not a second promise of guaranteed commercial growth. Show “The connection holds” as a secondary philosophy label if useful.

**Motion:** One deliberate end-to-end completion. Avoid fireworks, excessive glow or confetti. Then movement stops and the page becomes calm proof. High-amplitude/depth motion must already have reduced before the proof content begins.

**Conversion:** “Let’s talk about your business” → `/contact`. Contact, proof and service links never require completing this scene. No forced minimum scroll duration. Maximum negative space is a compositional intention, not an empty-screen height requirement.

---

# 6. MODE B — PROOF AFTER THE CINEMATIC STORY

Mode B is intentionally calmer than Scenes 1–7.

The visitor has already understood the story. Mode B answers: **Can you prove it?**

Required qualities:

- fewer homepage components;
- real work/evidence first;
- no second cinematic sequence;
- concise proof summaries with links to full detail;
- technical evidence moves to `/engineering` rather than being duplicated in full;
- FAQ remains functional and readable;
- final CTA remains direct.

Mode B reduction should favour clarity over preserving every existing homepage section. The active pressure/test instrumentation and continuous-spine choreography end with Scene 7; Mode B may retain the same typography, hairlines and surface discipline, but it must not begin a second instrument sequence.

---

# 7. NAVIGATION EXPERIENCE

## 7.1 Desktop

Navigation remains restrained:

- YCN Labs logo;
- Services;
- Work;
- Engineering;
- Process;
- About;
- theme control;
- one primary project-contact CTA; clearer labels may change, existing route destinations do not.

No mega-menu unless future route/content volume creates a demonstrated need.

The header may change surface opacity, blur and shadow on scroll, but should not resize as part of the normal scroll state.

## 7.2 Mobile

Use a clean drawer with large tap targets and clear hierarchy.

The drawer is navigation, not an immersive scene.

If future same-page scene anchors are ever added to the drawer, closing behaviour must be explicitly handled because pathname-only closing does not respond to hash changes.

## 7.3 Cinematic logo handoff

The travelling logo is a separate presentational layer. The real header logo remains accessible and structurally stable.

---

# 8. DEEP-ROUTE SIGNATURE VISUALS

Each important route receives one signature visual grammar. No deep route receives a second seven-scene cinematic sequence.

| Route | Signature visual contract |
|---|---|
| `/services` | Outcome selector that maps business goals to verified service routes |
| `/services/web` | Discovery → responsive experience → enquiry journey |
| `/services/web-apps` | User → interface → workflow → data relationship |
| `/services/saas` | Tenant → workspace → core action → billing/reporting architecture |
| `/services/ai` | Input → validation → model → guardrails → human review → output |
| `/services/mobile` | Interface → API → sync → notification → offline/online state |
| `/services/software` | Roles → workflow → integrations → auditability |
| `/work` | Real evidence-led project gallery; visual before prose |
| `/work/[slug]` | Problem → constraints → screens/diagram → decisions → verification |
| `/process` | Signal Line timeline: Understand → Define → Design → Engineer → Verify → Launch → Support |
| `/engineering` | Technical proof centre: measurements, tests, diagrams, architecture, monitoring/handover evidence |
| `/about` | Studio operating model and accountability; no fake team/founder imagery |
| `/contact` | Calm, extremely direct conversion path; guided brief may enhance but never replace the form |
| `/blog` | Editorial and calm; diagrams only when they genuinely clarify the article |
| legal | Text-first, quiet, high-legibility presentation |

---

# 9. MOTION SYSTEM

## 9.1 Motion classes

Every motion must be classifiable as:

- **DEMONSTRATES** — shows system behaviour or cause/effect;
- **NAVIGATES** — communicates position/progression/orientation;
- **CONFIRMS** — acknowledges an action or state change.

Atmosphere is not a default motion class.

## 9.2 Preferred motion techniques

Prefer:

- transform;
- measured SVG `stroke-dashoffset`;
- clipping/masking where content remains semantically present;
- small opacity changes only for non-critical enhancement;
- CSS perspective;
- state-driven Framer Motion transitions already within the project;
- scroll-position-derived reversible state.

Avoid:

- layout-driven animation of width/height/top/left;
- large animated blur;
- continuous decorative loops;
- scroll jacking;
- motion that continues without relation to user input or meaningful state;
- critical text beginning hidden.

## 9.3 2.5D before 3D

The complete default experience uses SVG/CSS/perspective. Optional true 3D is evaluated for teaching value; it never replaces the accessible base.

Approved visual depth tools include:

- layered planes;
- perspective transform;
- subtle z-axis scaling;
- masks;
- clipping;
- two-layer maximum parallax where already allowed;
- controlled static shadow/depth cues.

For this owner-requested redesign, AGENTS §3.9 allows an isolated Three.js/Blender-backed prototype and a separately budgeted opt-in viewer. Production release remains gated. R3F is not added unless its benefit over plain Three.js is specifically justified.

---

# 10. RESPONSIVE EXPERIENCE

Desktop and mobile are related compositions, not scaled copies.

## 10.1 Desktop

- seven scene narrative remains visible;
- spatial compositions may use horizontal relationships and larger negative space;
- no scroll-jacking;
- any pinning requires later explicit approval and measured justification.

## 10.2 Mobile

The existing four-chapter content contract remains governing.

Visual adaptation rules:

- horizontal routes become vertical;
- exploded layers become stacked depth bands;
- no desktop parallax below 768px;
- no long pinned viewport;
- motion distance and amplitude reduce substantially;
- contact remains reachable in one action;
- all information remains present;
- scene visuals must remain understandable with motion removed.

---

# 11. MEDIA AND ASSET TREATMENT

## 11.1 Current default

Self-host reviewed production assets by default, consistent with existing policy.

Do not procure a media platform merely to create infrastructure before enough real media exists.

## 11.2 Vendor shortlist — deferred, not active

If asset volume later justifies managed media delivery, evaluate **one** ecosystem only:

- ImageKit;
- Cloudinary;
- Cloudflare Images + Stream.

No vendor selection, account dependency, monthly spend, or runtime integration is authorised by this specification.

## 11.3 Image/video use

- real project evidence is preferred;
- generated conceptual imagery must remain clearly illustrative and obey the existing human-imagery ruling;
- generated readable UI is not used as project proof;
- intro autoplay video is excluded from v1.0;
- if video is ever separately authorised, the complete no-video experience remains the base product.

---

# 12. CONTENT SYSTEM

## 12.1 Homepage copy density

Follow AGENTS §3.9 G: no minimum word count and no arbitrary filler. Each scene is understood from headline + visual + one short explanation. The ≤350-word narrative target is a design budget, not a measured claim.

Long technical detail belongs in progressive disclosure or `/engineering`.

## 12.2 Copy hierarchy

Each scene should generally contain:

- one eyebrow/chapter label;
- one primary heading;
- one short explanatory statement;
- visual labels directly tied to the composition;
- optional proof/deep-link;
- no redundant paragraph repeating the visual.

## 12.3 Truth

No visual treatment may make a target look like an achievement, a concept look like client work, or an offered capability look like verified delivery.

Labels and evidence rules in `AGENTS.md` and `PROJECT_STATE.md` remain binding.

---

# 13. ACCESSIBILITY AND FALLBACK EXPERIENCE

Every scene and signature visual must have a complete static interpretation.

Required paths:

- **No JavaScript:** all copy, headings, anchors, navigation, CTAs and meaningful static diagrams exist.
- **Reduced Motion:** no cinematic choreography; use final/representative static states and normal interaction feedback.
- **Save-Data / Reduced-Data:** no non-essential scene media or cinematic JS; content remains complete.
- **Forced Colors:** line state and system state remain understandable using geometry, strokes, text and shapes rather than colour alone.

Keyboard access, screen-reader reading order, zoom, 320px reflow and visible focus remain release requirements.

---

# 14. PERFORMANCE CONTRACT FOR VISUAL DESIGN

Performance is a design property.

A visual treatment that misses the active project budget is not production-grade regardless of appearance.

Design implications:

- fixed intrinsic media dimensions;
- no unnecessary global animation runtime;
- scene-level code remains route-scoped;
- below-fold media is lazy;
- assets use the smallest viable variant;
- cinematic candidates follow AGENTS §3.9 prototype permission and distinct production release gates;
- static scenes remain independently launchable;
- every future motion scene has a kill switch and clean fallback.

---

# 15. ACCEPTANCE TEST FOR “UNIQUE”

A scene is not considered finished merely because it looks polished.

## 15.1 Design acceptance

1. A visitor can understand the business idea at **Glance** depth without reading the body copy.
2. The scene has one dominant spatial idea rather than a generic card layout.
3. The visual teaches something about the system or business outcome.
4. Its grammar is materially distinct from the scenes immediately before and after it, except the intentional Scene 3 / Scene 6 mirror.
5. The scene still communicates its meaning with all motion removed.
6. Copy follows Glance → Scan → Inspect and materially reduces unnecessary visible text.
7. The experience is truthful and properly labelled; concepts never masquerade as client evidence.
8. It avoids common agency/SaaS visual clichés and the prohibited treatments in `AGENTS.md`.
9. Removing the visual would make the idea harder to understand. If not, the visual is probably decorative and should be reconsidered.
10. Instrument Field devices are used only where they explain structure, state, pressure, measurement or continuity.

## 15.2 Structural and verification acceptance

For every scene rebuild, AGY must verify current code before deciding the implementation shape. Code wins on implementation facts.

The task evidence must record, where applicable:

- server-rendered meaningful static state with no required client hook in Phase 3;
- locked anchor ID preserved and heading structure explained if it changes;
- shared Scene 3 / Scene 6 test data sourced once rather than copied in two scene files, unless current code forces a different owner-approved structure;
- geometry and horizontal-overflow checks at the task's required mobile, tablet and desktop widths, including 390px and 1280px;
- light and dark theme state explicitly asserted for accessibility/contrast checks;
- text and meaningful non-text contrast from resolved computed colours, not token names;
- no-JS completeness;
- reduced-motion / Save-Data implications when motion-relevant code is later introduced;
- forced-colors legibility verified rather than inferred;
- LCP element identity and CLS checked for regression when the scene can affect them;
- `pnpm turbo run lint check-types test build --force` (or the current repository-equivalent required by policy) with raw exit status;
- diff shown before commit, explicit-path staging only, owner approval before commit, and no push by AGY.

The visual specification is an acceptance contract, not permission to bypass `AGENTS.md` phase gates or stop conditions.

---

# 16. TARGET EXPERIENCE SUMMARY

The finished YCN Labs site should make a visitor feel that they:

1. entered a precise digital system;
2. understood the business promise immediately;
3. saw the customer-to-business connection;
4. watched that connection fail under realistic pressure;
5. saw the route deliberately designed;
6. understood the deeper layers beneath a simple experience;
7. watched the same system survive the test;
8. saw the final signal reach the business;
9. inspected real proof;
10. chose whether to start a project.

The site is not presenting sections.

**It is presenting a system becoming dependable.**

---

# 17. GOVERNANCE / CHANGE CONTROL

This specification is intentionally not a task queue.

- `AGENTS.md` governs policy, prohibited work, phase authorisation and budgets.
- `PROJECT_STATE.md` governs verified state and the single next task.
- repository code/runtime govern current implementation facts.
- this file governs the approved visual/interaction target within an authorised task.

After adoption, AGY and other agents must not silently rewrite this specification.

`YCN_LABS_VISUAL_MOTION_RECORD_v1.0.md` is not a second active authority file. Its accepted art-direction ideas are consolidated here; keep the separate draft outside the active repository authority set.

Any exception must be owner-authorised, explicit, narrowly scoped, and recorded in `AGENTS.md` if it changes policy or in `PROJECT_STATE.md` if it changes verified state/task execution.



---

# 18. CUSTOMER-FIRST IMPLEMENTATION CONTRACT — REVISION 1.1

## 18.1 Direct outcome entry

Hero and navigation link directly to `#solutions` / `/services`. The visitor need not scroll the whole story. Four primary pathways are enough at first; each uses a real link and names the service after the problem.

| Visitor language | Service explanation | Existing destination |
|---|---|---|
| Help people find and contact us | Websites and digital experiences | `/services/web` |
| Take bookings or organise enquiries | Web applications and workflows | `/services/web-apps` |
| Spend less time on manual work | Business systems and integrations | `/services/software` |
| Turn an idea into a software product | Product discovery and SaaS planning | `/services/saas` |

Mobile applications and AI remain discoverable on the services hub at the appropriate depth. Availability and implementation claims require the capability register, particularly the historical Q6 AI limitation. No new package prices or guaranteed results are implied by these example pathways. “I’m not sure yet” links directly to contact, not a quiz that withholds access.

The prototype places a compact selector after the story with direct hero/header bypasses. In production test whether moving the same selector immediately below the hero improves discovery without creating a second introduction. This placement experiment does not change the seven anchor order. One canonical selector, not two full duplicate blocks.

## 18.2 Services, process and contact copy

Services hub headline: **What would you like to make easier?** Supporting line: “Start with the problem. We’ll discuss a practical first step before defining the technology.” Remove internal sales taxonomy such as “primary wedge” or “adjacency” from first-reading copy.

Each service route follows: recognisable need → one concrete demonstration → possible scope and exclusions → how the work is approached → evidence with maturity → contact. Do not advertise every feature implied by a library as a delivered capability. Distinguish optional integrations, third-party costs, implementation discovery and support scope.

Process uses Understand → Define → Design → Engineer → Verify → Launch → Support. A five-stage public grouping may be retained only if these responsibilities and handoffs are visibly mapped, not silently omitted. Each step says what the client supplies or decides and what artifact comes back. Ongoing support is contracted, not an unlimited implied obligation.

Contact headline: **What should work better?** Supporting text: “Tell us what you’re trying to change. You don’t need to arrive with the technical answer.” Replace the internal “Direct Lead Pipeline” framing. Preserve form behavior, booking intent gating, data contracts and owner-attested response wording. Explain uncertain budget/timeline handling honestly; do not submit a fabricated value to satisfy validation.

## 18.3 Buyer questions and trust

Use buyer-facing FAQ questions: “I don’t know whether I need a website or an app”; “Do I need to replace my existing website?”; “Can WhatsApp and spreadsheets stay?”; “Can a smaller business work with you?”; “What happens after launch?”; “Who owns the code and how is cost decided?” Answers discuss fit and agreed scope rather than unlimited promises.

Work examples show classification and maturity separately. Preserve the two existing classifications but add design-stage status unless updated implementation evidence exists. Remove template-wide checked badges from untested designs. The studio website's own dated engineering evidence is legitimate evidence about that website, not an unrelated client's results.

About explains accountability, communication and delivery arrangements. Do not claim senior oversight, employed architects, offices or regular named-system integrations without support. Avoid artificial scarcity, corporate-name borrowing, “world class” scores and fictional testimonials.

Recommended metadata draft: title “YCN Labs | Websites & Software for Your Business”; description “Explore websites, applications and business systems built around customer needs and daily work. Start with a conversation about what should work better.” Verify each advertised service's current capability before publishing. Preserve canonical URLs and truthful structured data; no invented review/star/rating schema.

## 18.4 Cinematic composition and asset direction

Retain white/near-black/cool-neutral/blue/cyan and existing Geist/Geist Mono. Use a quiet light opening, paired dark Pressure/Held fields, an architectural cutaway and a quiet end-state. Dark mode is equally designed, not an inverted screenshot. Avoid gratuitous glass, purples, decorative particles and stock-team imagery.

The 3D asset brief is specific: a recognisable customer device, a business workspace and four separable planes linked by an enquiry route. No abstract cube as the lead concept. Prototype models may be low-poly; finish comes from proportions, materials, lighting, movement and composition rather than polygon count. Export neutral geometry/materials; overlay all important UI and copy in accessible HTML.

Blender may create refined meshes and still/poster assets offline. GSAP/ScrollTrigger may own reversible webpage choreography; Three.js may own the optional geometry renderer. Spline is an alternative toolchain candidate, not a second runtime. A short rendered video is not the default because it cannot substitute for interactive, text-accessible states. No managed media service or paid plan is assumed necessary.

Native scrolling remains in control. Desktop depth is limited and purposeful; mobile stacks devices and layers. A visitor can stop, reverse, tab to a link, bypass the story or turn motion off at any moment. When motion is off, the site still tells the same story.

## 18.5 Production integration boundaries

The standalone prototype is a design reference, not a replacement application. Port its content and presentational components into the existing Next.js system; do not overwrite the repo with a static HTML site. Reuse existing Header, tokens, SceneShell, persistent spine, route content, shared S3/S6 data, themes and verified API surfaces where appropriate.

Keep the text/layout as Server Components. Mount small client islands for explicit sample interaction, brief controls and orchestration. Preserve the request-time reduced-data split verified at T-82 after checking actual code. A client check that hides a scene after its bundle downloads does not satisfy no-scene-JS delivery. Test direct navigation and client transitions; ensure a normal route prefetch cannot pull heavy motion into the reduced-data session.

No essential browser width decision should produce a hydration mismatch or duplicate headings. Do not load multiple animation drivers for the same transform. Measure source parity and network transfer in the exact production bundler, not an unrelated analyzer output. Keep context-loss fallback, error boundaries, import failure, view teardown, browser-back and theme changes in the test matrix.

Real contact submission, persistence, acknowledgements and spam/rate-limit behavior stay out of the demo. A prototype's “received” state has no backend significance. All test submissions to real systems need deliberate test authorization and disposal rules.

## 18.6 Delivery evidence and customer test

A usable release preview must show the full path, not only a beautiful hero screenshot. Check ordinary mobile viewing before building elaborate magnified evidence tooling. Capture full-viewport states with scroll position identified; do not misclassify an element-screenshot scroll effect as a live sticky-header bug.

Report source read, local code execution, browser rendering, automated checks, direct visual inspection, real participant feedback and production verification separately. No “100% WCAG compliant” result from an axe scan alone. No “will convert clients” claim from a design review. Proposed target counts and byte ceilings are not observed results.

Visitor-test prompts and pass targets are in AGENTS §3.9 G; task ordering stays only in PROJECT_STATE. Report what people actually said and clicked. When terminology fails comprehension, change the words or visual relationship before adding another renderer.

## 18.7 Research basis and limits

Source-derived direction: supplied AGENTS §§7–10 and visual spec's Glance/Scan/Inspect; recorded T-75 cinematic intent; T-80–T-83 acceptance boundaries; R4 design-only maturity and Q6 capability qualification.

New designer decisions: literal hero offer, enquiry demonstration, revised scene copy, maturity/verification presentation, bounded prototype technology permission, new density contract and customer test protocol. These are not misrepresented as historical decisions.

Public technical documentation checked for implementation direction on 2026-09-12:
- GSAP `gsap.matchMedia()` — media-query setup and automatic reversion: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
- GSAP ScrollTrigger — native scroll-linked timing and reversible progress: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Next.js lazy loading — selective client component/library loading: https://nextjs.org/docs/app/guides/lazy-loading
- Blender glTF exporter — glTF/PBR authoring and export: https://docs.blender.org/manual/en/latest/addons/scene_gltf2.html
- Three.js manual and disposal guidance: https://threejs.org/manual/ and https://discourse.threejs.org/t/when-to-dispose-how-to-completely-clean-up-a-three-js-scene/1549
- W3C animation-from-interactions guidance: https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html

Version compatibility, package licensing, browser behavior and byte costs must be verified against the installed project before adoption. No new production dependency was installed for the delivered prototype. Spline's current export/performance documentation could not be reliably retrieved in this session; no claim about a paid tier, export entitlement or exact runtime size is made.
