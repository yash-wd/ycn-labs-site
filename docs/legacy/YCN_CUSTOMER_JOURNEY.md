> [!NOTE]
> **HISTORICAL REFERENCE ONLY — NOT ACTIVE PROJECT AUTHORITY**
> This document is preserved for engineering provenance and historical record.
> It has been superseded by the **YCN Canonical v1.2** specification suite.
> For current active project specifications, task queues, and architecture, consult [`docs/INDEX.md`](../INDEX.md).

---

# YCN Customer Journey Specification

> **DOCUMENT STATUS: DRAFT REVIEW ARTIFACT**
> This document is a working review artifact and does not replace or compete with the canonical specification. Upon owner review and approval, the approved decisions herein will merge directly into [`docs/design/YCN_LABS_VISUAL_MOTION_EXPERIENCE_SPEC_v1.0.md`](docs/design/YCN_LABS_VISUAL_MOTION_EXPERIENCE_SPEC_v1.0.md) (Revision 1.2), and this draft will be archived.

---

## 1. Core Principles & Visual Rules

### A. 3D Is the Camera and Staging — Not the Subject
- **Role of 3D:** 3D provides camera depth, perspective staging, foreground-to-background spatial stacking, layer separation, and scroll-driven camera moves.
- **Surface Imagery:** What is rendered onto those surfaces must be **recognisable, everyday screens** (phones, order tablets, business dashboards)—never abstract circuits, glowing cyan tubes, datum tracks, or unexplained geometry.
- **Upright Text:** All headings, copy, labels, and mock controls remain planar, readable, and visually upright at every scroll position.

### B. Grounded in Real Experience & Consistent Fictional Sample
- The primary demonstration uses one internally consistent running fictional example: **"Sample restaurant · concept demonstration"**.
- **Consistent Sample Arithmetic:**
  - `Paneer Tikka Roll · ₹180`
  - `Dal Makhani Bowl · ₹220`
  - `Fresh Lime Soda · ₹80`
  - **Total:** `₹480 · 3 items` (used consistently across every scene, card, and payload; never described as 2 items).
- Clearly labelled as a concept demonstration; never uses a real client name or sends real data to production endpoints.

### C. State Language Over Metric & Guarantee Claims
- Unsupported absolutes, simulated timings, and achievement claims are removed (no "6.2s", "₹4,500 lost", "3 enquiries missed", "zero-data-loss", "instantly", "in seconds", "Customer happy", "Instant access", or "zero vendor lock-in").
- The story communicates through **factual interface states**:
  - *"Still loading…"* vs *"Menu ready"*
  - *"No new orders"* vs *"New order · ₹480 · 3 items · Accept"*
  - *"Waiting for confirmation…"* vs *"Order confirmed · Preparing"*

### D. Shared Framing for Contrast (Scene 3 & Scene 6)
- **Scene 3 (Failure)** and **Scene 6 (Working System)** share the exact same split-screen composition: customer phone on the left, owner counter screen on the right.
- Both scenes source the **exact same four governed pressure joints** from `apps/web/content/experience.ts`:
  1. `Slow access` (Performance boundary)
  2. `Inaccessible interaction` (Interaction boundary)
  3. `Lost or invalid information` (Validation / persistence boundary)
  4. `Incorrect information boundary` (Access boundary)
- Scene 3 shows the failure consequences; Scene 6 shows the held/resolved outcomes around the identical composition.

### E. Motion Governance & Classification
Every scroll-driven animation beat is classified under one of three governed purposes:
- **`DEMONSTRATES`**: Illustrates a real user or system behaviour (e.g. camera framing a mobile screen, spatial layer cutaway).
- **`NAVIGATES`**: Guides visitor attention or moves an item between connected steps (e.g. order card docking across a connector).
- **`CONFIRMS`**: Signals a state change or completed transaction (e.g. button state transition from pending to accepted).

### F. Mobile Four-Chapter Contract
On mobile viewports (<768px), the 7 scenes group into four coherent narrative chapters per AGENTS §9 (referenced by spec §10.2):
- **Chapter 1:** Scene 1 (Need & Hero Breadth Strip)
- **Chapter 2:** Scenes 2 + 3 (Easy vs Confusing & Pressure Joints)
- **Chapter 3:** Scenes 4 + 5 (Connection & Four Connected Screens)
- **Chapter 4:** Scenes 6 + 7 (Held System & Business Pathways)

---

## 2. The 7-Scene Homepage Journey

```
Scene 1: Need          — Customer menu phone + business intake arrival; breadth strip
   ↓
Scene 2: Easy          — Clear prices and single action vs confusing version beside it
   ↓
Scene 3: Failure       — Customer taps Order; all 4 governed pressure joints fail
   ↓
Scene 4: Connection    — Order card (#104 · ₹480 · 3 items) travels across connector
   ↓
Scene 5: Underneath    — 3D spatial separation of four upright everyday business screens
   ↓
Scene 6: Works         — Same framing as Scene 3; all 4 pressure joints held and order accepted
   ↓
Scene 7: Outcome       — Order complete, followed by the four canonical business pathways
```

---

### Scene 1 — Need & Hero Breadth Strip

- **Anchor ID:** `#promise`
- **First Viewport Contract (Visibly & Immediately Present):**
  - **YCN Labs Mark:** Approved brand identity mark.
  - **Primary Headline (Locked H1):** `Websites and software. Built around your business.`
  - **Supporting Sentence (Locked):** `Help customers find you, make it easier to enquire or book, and connect the work behind the scenes.`
  - **Dominant Primary Actions:**
    - `Tell us what you need` $\rightarrow$ `/contact` (Primary solid CTA)
    - `Explore what we build` $\rightarrow$ `#solutions` (Secondary action, serving as the approved story bypass; separate `Skip the story` control withdrawn per AGENTS §3.10)
  - **Reassurance Microcopy:** `You don’t need a technical brief to start.`
  - **Primary Navigation:** Fully usable header (Services, Work, About, Engineering, Contact).
- **Hero Demonstration (Dual-Surface Staging):**
  The hero composition visibly shows BOTH sides of a dependable business connection as ONE demonstration (customer action $\rightarrow$ business arrival):
  1. **Customer-Facing Phone (Foreground):**
     - Menu items & consistent fictional order:
       - `Paneer Tikka Roll · ₹180`
       - `Dal Makhani Bowl · ₹220`
       - `Fresh Lime Soda · ₹80`
       - Total: `₹480 · 3 items`
     - Mock action: `[ Example action · View menu & order ]` (Outlined mock control, non-interactive `<div>` with microcopy `Sample · nothing is sent`; never hits `/api/contact` and never masquerades as the primary hero action).
     - Secondary descriptor: `Sample restaurant · concept demonstration`.
  2. **Business-Facing Arrival (Midground):**
     - The EXISTING R-02 `SampleEnquiryDemo` component, retained as the business-side arrival demonstration (customer action $\rightarrow$ business arrival; not replaced with a newly invented order notification queue).
  - **Governed Disclosure Label (AGENTS §7):**
    `Interactive concept · sample data, not client work`
    *(Prominently preserved; the restaurant-specific descriptor `Sample restaurant · concept demonstration` provides secondary context but does NOT replace this governed disclosure. Non-production behavior: "nothing is sent", and the sample action must never reach `/api/contact`).*
- **Single Breadth Strip (Directly Beneath Hero Illustration):**
  Directly beneath the dual-surface illustration sits one restrained row of three small recognisable device thumbnails showing that the pattern applies across industries:
  1. **Restaurant** (Menu & table ordering)
  2. **Salon** (Service menu & appointment booking)
  3. **Wholesale / Retail** (Product catalogue & trade enquiry)
  *(This is a single breadth row, not three competing hero compositions and not a second introduction).*
- **Motion Beat:** `DEMONSTRATES` — Subtle camera dolly toward the dual-surface composition on initial scroll.
- **Visitor Comprehension:** *"YCN builds websites and software that connect customer actions directly to business operations."*
- **Fallback Specifications:**
  - **Mobile (<768px, Chapter 1):** Phone frame and business screen stack cleanly beneath the headline; breadth strip displays as an evenly spaced 3-column thumbnail row.
  - **No-JS:** Static HTML rendering with zero transform styling; text fully visible; mock button inert.
  - **Reduced Motion:** Camera remains static; dual-surface composition rests at nominal scale.
  - **Save-Data / Reduced-Data:** Uses lightweight HTML/CSS/SVG representations; the optional 3D viewer is not loaded.
  - **Forced Colors:** Transparent borders convert to `1px solid ButtonText`; focus outlines use `Highlight`.
- **Technical Relocation:** Bundle budgets, responsive image srcset, and SSR hydration $\rightarrow$ [`apps/web/app/engineering/page.tsx`](apps/web/app/engineering/page.tsx).

---

### Scene 2 — Easy

- **Anchor ID:** `#quality-budgets`
- **The One Large Sentence the Visitor Reads:**
  **"Clear choices and one obvious action make the next step easier to understand."**
- **What Is Shown on Screen (Two Phones Side by Side in Depth):**
  Two phone screens angled gently toward each other:
  - **Left Phone (The Confusing Version):**
    - Unorganised layout, crowded text, overlapping banner.
    - Missing item prices.
    - Status label: `Still loading…`
  - **Right Phone (The Clear Version):**
    - High-contrast typography with clear item descriptions.
    - Visible prices: `Paneer Tikka Roll · ₹180` / `Dal Makhani Bowl · ₹220` / `Fresh Lime Soda · ₹80`.
    - One obvious action button: `[ Add to order ]`.
    - Status label: `Menu ready`
- **Motion Beat:** `DEMONSTRATES` — Right phone receives a calm blue accent border while left phone dims slightly, illustrating visual hierarchy.
- **Visitor Comprehension:** *"Clear layouts and visible pricing make the available choices and next action easier to understand."*
- **Fallback Specifications:**
  - **Mobile (<768px, Chapter 2 Part 1):** Stacked vertically: confusing version above with comparison tag; clear version below with full visual weight.
  - **No-JS:** CSS grid displaying both states side-by-side with full contrast.
  - **Reduced Motion:** Zero opacity or scale transition; both states visible statically.
  - **Save-Data / Reduced-Data:** Static DOM cards without interactive elevation effects.
  - **Forced Colors:** Contrast borders enforced via system color keywords.
- **Technical Relocation:** Touch-target design standards (YCN internal touch-target design target: 44×44 CSS px where practicable; WCAG 2.2 AA conformance is evaluated against the applicable SC 2.5.8 requirements and exceptions) and contrast ratios $\rightarrow$ [`apps/web/app/engineering/page.tsx`](apps/web/app/engineering/page.tsx).

---

### Scene 3 — Failure (All Four Governed Pressure Joints)

- **Anchor ID:** `#the-pressure`
- **The One Large Sentence the Visitor Reads:**
  **"A customer taps Order, but nothing arrives on your counter."**
- **What Is Shown on Screen (Shared Split-Screen Framing):**
  Dual-device composition (customer phone on left, counter tablet on right) with attached cues for **all four governed pressure joints** from `apps/web/content/experience.ts`:
  - **Customer Phone (Left):**
    - Taps `[ Place Order · ₹480 · 3 items ]`.
    - Screen state: `Waiting for confirmation…`
  - **Counter Tablet (Right):**
    - Screen state: `No new orders` (blank intake board).
  - **The Four Attached Failure Joint Cues:**
    1. **Joint J1 · Slow access** (Performance boundary): Slow access: the page remains unavailable while the customer is trying to complete the action.
    2. **Joint J2 · Inaccessible interaction** (Interaction boundary): Layout or input failure leaves the customer unable to finish the action.
    3. **Joint J3 · Lost or invalid information** (Validation / persistence boundary): Lost or invalid information: the business does not receive a usable result from the customer action.
    4. **Joint J4 · Incorrect information boundary** (Access boundary): Uncontrolled data paths risk exposing internal notes or routing orders to the wrong screen.
- **Motion Beat:** `DEMONSTRATES` — Amber warning indicators attach to the four failure boundaries around the shared composition.
- **Visitor Comprehension:** *"A website does not help if slow speeds, confusing forms, lost orders, or broken data boundaries stop the business from operating."*
- **Fallback Specifications:**
  - **Mobile (<768px, Chapter 2 Part 2):** Split vertically with customer phone on top, counter tablet below, and four concise failure cues grouped beneath.
  - **No-JS:** Static cards with explicit amber status badges rendered in server markup.
  - **Reduced Motion:** State badges display in place without flashing or pulsing animations.
  - **Save-Data / Reduced-Data:** Text-based status indicators without background graphic layers.
  - **Forced Colors:** Warning badges use `CanvasText` and `ButtonBorder` with distinctive textual prefixes (`[Warning]`).
- **Technical Relocation:** Network timeouts, webhook delivery retries, schema validation, and access control isolation $\rightarrow$ [`apps/web/app/engineering/page.tsx`](apps/web/app/engineering/page.tsx).

---

### Scene 4 — Connection (Order Card as Subject)

- **Anchor ID:** `#the-foundation`
- **The One Large Sentence the Visitor Reads:**
  **"We connect the customer's screen directly to yours."**
- **What Is Shown on Screen:**
  The same two devices from Scene 3 linked by a clean, visual transit connector:
  - **Visual Subject:** The recognisable order card reading `Order #104 · ₹480 · 3 items` (`Paneer Tikka Roll, Dal Makhani Bowl, Fresh Lime Soda`).
  - **Subordinate Connector:** A clean geometric transit line connecting the phone to the counter terminal. (No abstract signals, stations, tubes, datum tracks, or unexplained geometry).
- **Motion Beat:** `NAVIGATES` — The order card travels across the connector from the customer's phone and docks into the counter tablet's incoming queue.
- **Visitor Comprehension:** *"This demonstrates how a customer action can connect directly to the business workflow."*
- **Fallback Specifications:**
  - **Mobile (<768px, Chapter 3 Part 1):** 3-step vertical handoff card: Customer Order $\rightarrow$ Direct Delivery $\rightarrow$ Counter Terminal.
  - **No-JS:** Static directional step flow rendered with SVG connector arrows and text labels.
  - **Reduced Motion:** Order card rests docked at the destination terminal with transit path drawn statically.
  - **Save-Data / Reduced-Data:** CSS border connector replacing motion-path animations.
  - **Forced Colors:** Connector line uses `CanvasText` with solid high-contrast stroke.
- **Technical Relocation:** Idempotent transactions, transactional delivery, and queue orchestration $\rightarrow$ [`apps/web/app/engineering/page.tsx`](apps/web/app/engineering/page.tsx).

---

### Scene 5 — Underneath (Four Recognisable Everyday Screens)

- **Anchor ID:** `#services`
- **The One Large Sentence the Visitor Reads:**
  **"Four connected tools working together: menu, orders, notifications, and records."**
- **What Is Shown on Screen (3D Spatial Layer Separation):**
  Four upright, realistic screens separated along the vertical Z-axis. 3D is camera and staging only; all text remains upright, planar HTML:
  1. **Screen 01 · Customer Menu (Phone screen, foreground):**
     *Header:* `01 · WHAT YOUR CUSTOMERS USE`
     *Visual:* Clean mobile menu preview with mock control `[ Example action · Send enquiry ]` (`Sample · nothing is sent`).
     *Summary:* Clear prices and straightforward ordering on any device.
  2. **Screen 02 · Owner's Order Terminal (Counter screen):**
     *Header:* `02 · WHAT YOUR BUSINESS DOES NEXT`
     *Visual:* Incoming order board displaying `Order #104 · ₹480 · 3 items`.
     *Summary:* Orders arrive with customer details, itemized items, and accept action.
  3. **Screen 03 · Optional Staff & Customer Workflow (Kitchen/Staff display):**
     *Header:* `03 · LESS REPETITIVE WORK, OPTIONALLY`
     *Visual:* Notification workflow card: `Notify kitchen display` and vendor-neutral `Send customer confirmation` (optional integration subject to third-party provider).
     *Summary:* Optional notification workflow for staff and customer confirmations.
  4. **Screen 04 · Business Records (Back-office dashboard):**
     *Header:* `04 · WHAT KEEPS IT DEPENDABLE`
     *Visual:* Daily order log, item totals, and customer contact list with structured storage and defined staff access boundaries.
     *Summary:* Operational records organised for the business with defined staff access boundaries.
- **Motion Beat:** `DEMONSTRATES` — On desktop scroll, the four upright screens smoothly separate vertically, illustrating that the same order `#104` coordinates across all four tools.
- **Visitor Comprehension:** *"I don't need disconnected tools. The customer menu, counter screen, kitchen workflow, and sales records connect as one dependable system."*
- **Default Implementation & Architecture:** Four upright screens rendered with semantic HTML, responsive CSS, and Framer Motion offsets (zero new dependencies).
- **Optional 3D Viewer (Gated Future Path):** The **Explore the system in 3D** cutaway remains an optional, separately budgeted, owner-gated future path governed by AGENTS §3.9 E–F (≤250 KiB opt-in JS, ≤500 KiB GLB). It is NOT part of this release and nothing about it is implemented in this production deliverable.
- **Fallback Specifications:**
  - **Mobile (<768px, Chapter 3 Part 2):** Four upright cards stacked in resting vertical flow with responsive flex headers (`01 · ...`, etc.) that fit without wrapping to three lines. Zero 3D container tilt.
  - **No-JS:** Static 4-card stack in semantic HTML; full parity with motion view.
  - **Reduced Motion:** Cards rest at fixed vertical offsets without scroll-linked translation.
  - **Save-Data / Reduced-Data:** Flat border cards without perspective backplates or gradient shadows.
  - **Forced Colors:** Cards styled with `Window` and `WindowText`; active highlights use `Highlight`.
- **Technical Relocation:** Postgres Row-Level Security, multi-role authorization, data ownership, and export formats $\rightarrow$ [`apps/web/app/engineering/page.tsx`](apps/web/app/engineering/page.tsx) with link `"See how we engineer this →"`.

---

### Scene 6 — Works (All Four Governed Pressure Joints Held)

- **Anchor ID:** `#how-we-build`
- **The One Large Sentence the Visitor Reads:**
  **"Their order reaches your counter. Your team accepts and prepares it."**
- **What Is Shown on Screen (Shared Framing Identical to Scene 3):**
  The identical counter and phone staging from Scene 3, now showing the illustrative held state:
  - **Governed Truth Label:**
    `Illustrative desired behaviour · not an audit result.`
    *(Preserved prominently; does not imply zero data loss, universal accessibility, security, reliability or production delivery).*
  - **Customer Phone (Left):**
    - Screen displays confirmed order card: `Order #104 Confirmed · Preparing`.
  - **Counter Tablet (Right):**
    - Displays incoming card: `New order · ₹480 · 3 items` (`Paneer Tikka Roll, Dal Makhani Bowl, Fresh Lime Soda`).
    - Action button: `[ Accept Order ]`.
  - **The Four Governed Pressure Joints (Held Outcomes):**
    1. **Joint J1 · Slow access $\rightarrow$ Held:** The page content and primary action remain available in the illustrated held state.
    2. **Joint J2 · Inaccessible interaction $\rightarrow$ Held:** Keyboard-operable controls and clear interaction states support completion.
    3. **Joint J3 · Lost or invalid information $\rightarrow$ Held:** The action reaches the intended workflow; `Order #104` arrives intact with item details.
    4. **Joint J4 · Incorrect information boundary $\rightarrow$ Held:** Information remains contained within the intended access rules; orders reach the counter, not unintended channels.
- **Motion Beat:** `CONFIRMS` — Action button transitions to `Accepted · Sent to kitchen`, confirming order acceptance.
- **Visitor Comprehension:** *"The loop is dependable: the customer sees their order confirmed, and the business receives the exact details needed to fulfill it."*
- **Fallback Specifications:**
  - **Mobile (<768px, Chapter 4 Part 1):** Shared layout matching Scene 3 mobile view, with green resolved state badges.
  - **No-JS:** Confirmed customer screen and accepted counter screen displayed in resting state.
  - **Reduced Motion:** Static confirmation state without simulated click animations.
  - **Save-Data / Reduced-Data:** Flat status badges without celebratory decorative effects.
  - **Forced Colors:** Status indicators use `ButtonText` with text prefix `[Confirmed]`.
- **Technical Relocation:** Verification gates, runtime error boundaries, and integration test coverage $\rightarrow$ [`apps/web/app/engineering/page.tsx`](apps/web/app/engineering/page.tsx).

---

### Scene 7 — Outcome & The Four Canonical Pathways

- **Anchor ID:** `#proof`
- **Narrative Headline & Subtitle:**
  - Headline: `From “I’m interested” to “let’s talk.”`
  - Subtitle: `That’s the kind of connection your website should make.`
- **The One Large Sentence the Visitor Reads:**
  **"Order complete. Now choose what your business needs built."**
- **What Is Shown on Screen:**
  1. **Brief Story Conclusion:**
     Small resolved receipt card: `Order #104 complete · Recorded in sales records`.
  2. **The Four Canonical Business Pathways (Aligned to Spec §18.1):**
     Presented as clear, outcome-led cards with small recognisable visual screen cues:
     - **Pathway 01 · Help people find and contact us**
       *Visual Cue:* Clean mobile website card with visible phone and enquiry actions.
       *Service:* Websites and digital experiences.
       *Action:* `Explore website services →` (links to `/services/web`)
     - **Pathway 02 · Take bookings or organise enquiries**
       *Visual Cue:* Booking calendar and enquiry management screen.
       *Service:* Web applications and workflows.
       *Action:* `Explore web applications →` (links to `/services/web-apps`)
     - **Pathway 03 · Spend less time on manual work**
       *Visual Cue:* Synchronized data card connecting daily operations.
       *Service:* Business systems and integrations.
       *Action:* `Explore software systems →` (links to `/services/software`)
     - **Pathway 04 · Turn an idea into a software product**
       *Visual Cue:* Product workspace card showing discovery planning and user accounts.
       *Service:* Product discovery and SaaS planning.
       *Action:* `Explore SaaS planning →` (links to `/services/saas`)
  3. **Direct Contact Action:**
     `[ Start a conversation → ]` (links to `/contact`) with supporting line: *"Tell us what you're trying to change. You don't need a technical brief to start."*
- **Motion Beat:** `NAVIGATES` — The four pathway cards highlight and elevate on hover/focus.
- **Visitor Comprehension:** *"Whether I need a clear website or a full business system, YCN has a structured pathway for it."*
- **Fallback Specifications:**
  - **Mobile (<768px, Chapter 4 Part 2):** 1-column card stack with full-width tap targets.
  - **No-JS:** Semantic HTML card grid with direct server-rendered links.
  - **Reduced Motion:** Static cards without hover elevation transforms.
  - **Save-Data / Reduced-Data:** Text and icon cards without background asset overhead.
  - **Forced Colors:** Cards bordered with `ButtonBorder`, links highlighted with `LinkText`.
- **Technical Relocation:** Client repository ownership, deployment procedures, and verified deliverables $\rightarrow$ [`apps/web/app/engineering/page.tsx`](apps/web/app/engineering/page.tsx).

---

## 3. Breadth Strip & Multi-Industry Demonstration

Directly beneath the Scene 1 hero demonstration, the single breadth strip proves that the restaurant demonstration is one concrete example of a universal pattern:

$$\mathbf{Customer \longrightarrow Action \longrightarrow Business \longrightarrow Result}$$

| Business Type | Customer Sees | Action Taken | Business Receives | Result |
|---|---|---|---|---|
| **Restaurant (Primary)** | Digital menu & item prices | Selects 3 items (`₹480`) | Notification on counter terminal | Order confirmed and logged |
| **Salon & Appointment** | Service menu & staff availability | Selects service and time slot | Entry on appointment calendar | Customer confirmation dispatched |
| **Wholesale / Retail** | Product catalogue & trade tiers | Submits order inquiry | Notification on owner's device | Order logged in business records |

*Summary line:* **"Different businesses, the same pattern: a customer action connects to a business workflow."**

---

## 4. Technical Detail Relocation Directory

Technical, architectural, and performance claims are relocated from marketing copy to dedicated documentation in `/engineering`, linked via `"See how we engineer this →"`:

| Technical Standard (Removed from Story) | Destination |
|---|---|
| Performance budgets, Core Web Vitals targets | [`apps/web/app/engineering/page.tsx`](apps/web/app/engineering/page.tsx) |
| Schema validation contracts and type safety | [`apps/web/app/engineering/page.tsx`](apps/web/app/engineering/page.tsx) |
| Reliable transaction delivery, persistence boundaries | [`apps/web/app/engineering/page.tsx`](apps/web/app/engineering/page.tsx) |
| PostgreSQL Row-Level Security, data ownership | [`apps/web/app/engineering/page.tsx`](apps/web/app/engineering/page.tsx) |
| SSR hydration, Save-Data compliance, no-JS fallback parity | [`apps/web/app/engineering/page.tsx`](apps/web/app/engineering/page.tsx) |
| Automated integration tests, CI/CD quality gates | [`apps/web/app/engineering/page.tsx`](apps/web/app/engineering/page.tsx) |

---

## 5. Mobile Four-Chapter Organization

| Chapter | Scenes Included | Mobile Narrative Role | Viewport Flow |
|---|---|---|---|
| **Chapter 1** | Scene 1 | Need, Brand Arrival, Primary CTAs & Breadth Strip | Sticky brand bar, upright hero cards, 3-thumb breadth strip |
| **Chapter 2** | Scenes 2 + 3 | Easy Decision vs Confusing Layout & Four Pressure Joints | Vertical phone comparison, split phone-counter failure card with J1–J4 cues |
| **Chapter 3** | Scenes 4 + 5 | Direct Connection & Four Connected Everyday Screens | 3-step vertical handoff card, 4 stacked upright cards (flex headers, zero 3D tilt) |
| **Chapter 4** | Scenes 6 + 7 | Resolved System (J1–J4 Held) & Four Business Pathways | Dual-surface confirmed state, 4 canonical pathway cards, direct contact CTA |

---

## 6. Motion Governance Matrix

| Scene | Motion Beat Description | Purpose Classification | Reduced-Motion Behavior |
|---|---|---|---|
| **Scene 1** | Camera dolly toward dual-surface composition | `DEMONSTRATES` | Static resting framing |
| **Scene 2** | Visual emphasis on clear menu phone | `DEMONSTRATES` | Static side-by-side display |
| **Scene 3** | Failure indicators attach to J1–J4 boundaries | `DEMONSTRATES` | Static warning badges |
| **Scene 4** | Order card docks from phone to counter screen | `NAVIGATES` | Static docked card with line |
| **Scene 5** | Four upright screens separate along Z-axis | `DEMONSTRATES` | Clean vertical offset stack |
| **Scene 6** | Order card status transitions to accepted | `CONFIRMS` | Instant static state display |
| **Scene 7** | Pathway cards elevate on focus/hover | `NAVIGATES` | Static outline focus rings |

---

## 7. Review Criteria & Confirmation

- [x] **Draft Status:** Tagged as a draft review artifact; approved decisions will merge into `docs/design/YCN_LABS_VISUAL_MOTION_EXPERIENCE_SPEC_v1.0.md` revision 1.2.
- [x] **Hero First-Viewport Contract:** Preserves locked H1, locked supporting sentence, YCN mark, dominant primary CTAs (`/contact`, `#solutions` story bypass; separate `Skip the story` withdrawn per AGENTS §3.10), and primary nav.
- [x] **Single Breadth Strip:** Three restrained thumbnails (restaurant, salon, wholesale) directly beneath Scene 1 illustration; restaurant remains dominant running example.
- [x] **All Four Pressure Joints Restored:** Sourced directly from `apps/web/content/experience.ts` (Slow access, Inaccessible interaction, Lost or invalid information, Incorrect information boundary); reused in S3 (failed) and S6 (held).
- [x] **Shared S3 / S6 Framing:** Identical customer-phone + owner-screen split framing with attached joint state cues.
- [x] **Order Card as Subject:** Scene 4 treats the order card as the visual subject; route connector is subordinate.
- [x] **Four Everyday Screens in Scene 5:** Upright readable HTML; 3D is camera/staging only; no abstract architectural planes.
- [x] **Four Canonical Pathways in Scene 7:** Aligned to Spec §18.1 (including Pathway 4 as Product discovery and SaaS planning $\rightarrow$ `/services/saas`) with small visual screen cues.
- [x] **Arithmetic Consistency:** Fictional order is ₹180 + ₹220 + ₹80 = ₹480 = 3 items everywhere.
- [x] **Vendor-Neutral Wording:** Third-party vendor names replaced with neutral specifications ("Send customer confirmation").
- [x] **Complete Fallback Coverage:** Mobile 4-chapter contract, no-JS, reduced motion, Save-Data, and forced colors explicitly specified for all scenes.
- [x] **Motion Purpose Classification:** Every beat classified as DEMONSTRATES, NAVIGATES, or CONFIRMS.
- [x] **Repository-Relative References:** Machine-specific URLs removed; `/engineering` references point to existing repository files.
