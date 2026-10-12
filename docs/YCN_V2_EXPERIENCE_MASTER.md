# YCN V2 — Experience Master & Cinematic Implementation Blueprint

> [!CAUTION]
> **STATUS: HISTORICAL / SUPERSEDED FOR HOMEPAGE EXPERIENCE**
> 
> Do not use this document to design or build the current YCN homepage.
> The former seven-scene visual direction, mobile-shop narrative, and "Between" counter story are retired history.
> 
> **Current active homepage direction:**
> - `docs/vnext/00_START_HERE.md`
> - `docs/vnext/04_HOMEPAGE_EXPERIENCE_MASTER.md`
> - `docs/vnext/05_MOTION_AND_TRANSITION_SYSTEM.md`

---

## 1. North Star: The Continuous Narrative & Comprehension Standard

* **The Zomato / Swiggy / PhonePe Benchmark:** A business proprietor, manager, or customer with zero technical background must immediately understand what YCN Labs builds and how it solves real operational problems simply by experiencing the site.
* **Continuous Journey:** The homepage is NOT seven isolated landing page sections or repetitive card grids. It is ONE continuous narrative:
  **Recognition → Friction → Failure → Discovery → Connection → Resolution → Confidence → Action.**
* **Zero Jargon on the Customer Surface:** No developer terms (e.g. Zod, RLS, Edge TLS, ORM, Redis, App Router) appear on the primary visitor journey. Technical depth and rigorous engineering proof are linked gracefully to `/engineering`.

---

## 2. Complete Homepage Story: Scene Bible (Scenes 0–7)

### Scene 0 — Logo Entrance → Site
* **Visual Expression:** Pure CSS/SVG/DOM animation using official YCN brand marks (`/brand/ycn-logo-*-transparent-*.png` or exact SVG geometry).
* **Narrative Arc:** Real business → digital connection → engineered system → YCN Labs.
* **Transition:** Deliberate, smooth resolution from the brand reveal into the site header and Hero.
* **Prohibitions:** No generic AI particles, matrix code, sci-fi loading screens, floor grids, random tubes, or floating cubes.
* **Architecture:** Self-contained DOM structure allowing future cinematic video background replacement without restructuring.

### Scene 1 — Hero / Immediate Understanding
* **Goal:** A non-technical visitor understands within seconds that YCN connects business problems with useful digital systems.
* **Headline [Canonical HERO-01]:** Websites and software. Built around your business.
* **Supporting Sentence [Canonical HERO-01]:** We build websites, apps and business tools that help customers see what you offer and make your team’s work easier.
* **Primary CTA:** `Start a Project` (`/contact`)
* **Secondary Link:** `See how YCN works` (smooth scrolls to Scene 2/Scene 5)
* **Reassurance [Canonical]:** You don’t need a technical brief to start.
* **Visual Context:** A recognizable business interaction (customer placing an order/booking/enquiry on mobile, meeting a clear operational dispatch card), not abstract tech decoration.
* **Art Direction Rule:** Cyan is **NOT** used decoratively in Hero. Blue (`#0470B4` light / `#8BD4FF` dark) is the interactive action color. Desktop and mobile have dedicated compositions.

### Scene 2 — Recognizable Business Friction
* **Goal:** Visually demonstrate familiar business friction with minimal copy.
* **The Story:** Customer attempts to reach a business, but information scatters across fragmented channels:
  * Missed incoming phone calls
  * WhatsApp and chat messages without tracking
  * Spreadsheets, paper notes, and unrecorded requests
  * Disconnected software tools
* **Visitor Recognition:** `This happens in businesses like mine.`
* **Visual Language [DRAFT COPY]:** Clean visual montage of scattered communication channels causing delays and uncertainty.

### Scene 3 — The Failure Moment
* **Goal:** Create one memorable, high-stakes failure moment that serves as the baseline for Scene 6.
* **The Story [Canonical STORY-03]:** Same customer, genuine enquiry (e.g., urgent service quote or fleet booking). Because the internal workflow is disconnected, the request sits unassigned, waits in an inbox, and fails to progress.
* **Visual Composition:** Clear split between customer waiting ("Sent · Waiting for response") and unassigned back-office inbox ("Unassigned · 3 hours ago").
* **Honest Badging:** `Illustrative Scenario · Disconnected Workflow`.
* **Key Principle:** The tension is the absence of an outcome, not visual gimmickry. This exact composition is mirrored and resolved in Scene 6.

### Scene 4 — The Gap + YCN Pathways
* **Goal:** Transition smoothly from `Here is the problem` to `Here is where YCN fits`.
* **Headline [Canonical STORY-01 / PATHS-01]:** What would you like to make easier?
* **The Gap [Canonical STORY-01]:** A customer wants something your business can provide. The problem is often what happens in between.
* **The 4 Canonical Pathways [PATHS-01]:**
  1. **Websites & Digital Presence:** Help customers find my business — Build a clear digital presence people can understand and act on.
  2. **Customer Experiences:** Make enquiries, bookings or orders easier — Give customers a simpler path from interest to action.
  3. **Business Systems & Workflows:** Reduce repetitive work — Connect information and remove avoidable manual steps where it makes sense.
  4. **Software Products:** Build a product — Turn an idea or business process into a web, mobile or SaaS product.
  * *Not sure yet? Tell us what happens today.*
* **Transition:** Directly introduces the system architecture in Scene 5.

### Scene 5 — YCN Connects the System (The Layers)
* **Goal:** The central visual engine showing the complete customer-to-business flow.
* **Flow:** CUSTOMER → EXPERIENCE → SYSTEM → BUSINESS WORKFLOW → RESULT.
* **Cyan Signal:** Cyan (`#0299C3` light / `#017596` dark) is activated here as the **meaningful travelling signal** representing the customer enquiry moving through the system.
* **The 4 Connected Layers:**
  * **Layer 1 [Canonical LAYER-01]: What your customers use** — Website, mobile experience, or customer booking interface.
  * **Layer 2 [Canonical LAYER-02]: What your business does next** — Enquiry received → assigned → followed up with clear ownership.
  * **Layer 3 [Canonical LAYER-03]: Less repetitive work, optionally** — Optional automated confirmations and status updates. People stay in control.
  * **Layer 4 [Canonical LAYER-04]: What keeps it dependable** — Testing, secure access, recovery, and structured data handling before entering the workflow. Links to `/engineering`.
* **Honest Badging:** `Sample · Nothing is sent`.
* **Implementation:** Real DOM content, SVG signal paths, CSS spatial depth.

### Scene 6 — Same Moment, Better Outcome
* **Goal:** Emotional and commercial payoff by returning to the exact composition of Scene 3.
* **The Story [Canonical STORY-06]:** Same customer, same request. But with YCN in place:
  * Customer submits enquiry → verified instantly.
  * Back office receives notification immediately with pre-filled details.
  * Task is claimed and assigned to a specific team member.
  * Customer receives instant confirmation with expected turnaround time.
* **Headline [Canonical STORY-06]:** The connection holds.
* **Badging:** `Illustrative Scenario · Connected Workflow`.
* **Resolution:** Visual proof that a connected system prevents dropped business.

### Scene 7 — Value + Proof + Action
* **Goal:** Summarize capabilities into tangible business outcomes, provide honest pathways, and drive the closing action.
* **Outcomes Over Tech:** Websites that convert, systems that save hours, products built to scale.
* **Honest Proof Badging:** `Internal Product`, `Design Study`, `Prototype` (no fabricated clients or unverified metrics).
* **Navigation Hub:** Clean routes to What We Build, Work, How We Work, Engineering, and About.
* **Closing Action [Canonical HOME Closing CTA]:**
  * **H2:** Tell us what you’re trying to improve.
  * **Body:** You don’t need to know whether the answer is a website, app or software system. Tell us what is happening today and what you want to change.
  * **Primary CTA:** `Start a Project` (`/contact`).
  * **Reassurance:** You don’t need a technical brief to start.

---

## 3. Global Art Direction & Design Discipline

* **One Cohesive Narrative:** No disjointed card stacks or arbitrary template blocks. Every transition flows logically into the next step of the customer journey.
* **Color Discipline:**
  * **Cyan (`#0299C3` light / `#017596` dark):** Reserved exclusively for the active Customer/Enquiry Signal starting in Scene 5. NEVER used as decorative background tint in Hero.
  * **Blue (`#0470B4` light / `#8BD4FF` dark):** Interactive buttons, navigation links, and primary action states.
  * **Neutrals (Slate palette):** Crisp structural surfaces, typographic hierarchy, and subtle framing.
* **Real DOM Text:** 100% of body, headlines, and captions live in the real DOM for accessibility, SEO, and crisp font rendering.
* **Whitespace & Structure:** Breathing room and clean layout rhythm replace excessive borders and heavy box shadows.
* **Responsive Architecture:**
  * **Desktop:** Spatial depth, controlled scroll choreography, SVG path animations, interactive toggles.
  * **Mobile:** Clean vertical stacked narrative with zero horizontal overflow, touch-sized buttons (minimum 44x44px), and immediate value communication above the fold.
* **Reduced Motion:** With `prefers-reduced-motion: reduce`, all animations instantly resolve to full, static, beautiful compositions with zero information loss.
---

## 4. Final Implemented 3D Cinematic Shot Map & Architecture

### Architectural Composition
* **Master Coordinator:** `<CinematicHomepage>` in `components/cinematic/CinematicHomepage.tsx`
* **Subtle Global Metric:** `<JourneyProgress>` (non-intrusive top-edge journey progression line)
* **Persistent Spatial Stage:** `<JourneyStage>` with lazy-loaded dynamic Three.js `<StageCanvas>` (single canvas instance, 60fps RAF loop, smooth camera lerp, zero WebGL duplicate contexts)
* **Accessibility & SEO Floor:** 100% of headings, descriptions, buttons, and badges live in semantic DOM. Three.js canvas is strictly supportive and tagged `aria-hidden="true"`.

### The Recurring Story Object: Customer Request (#YCN-8041)
* **Scene 1 (Hero):** Request created — clean glass geometric capsule with dormant core, resting at camera center.
* **Scene 2 (Friction):** Request surrounded by drifting disconnected channel tags (WhatsApp note, missed call, unread email, manual spreadsheet row).
* **Scene 3 (Failure):** Request stalls at operational boundary — signal dies, amber warning state, zero ownership.
* **Scene 4 (The Gap):** YCN enters as connector — 4 canonical business pathways branch around the central gap, signal awakens with pulsing cyan.
* **Scene 5 (System Climax):** Request becomes the active cyan signal passing through 4 functional system planes (Customer Layer, Business Layer, Optional Automation Branch with toggle, and Dependable Foundation).
* **Scene 6 (Resolution):** Same physical composition as Scene 3, but now completed — request received, owned, and moving forward with warm relief tone.
* **Scene 7 (Finale):** Request expands into broader YCN capability lanes, refined typographic navigation, and climax project CTA (`Start a Project`).
