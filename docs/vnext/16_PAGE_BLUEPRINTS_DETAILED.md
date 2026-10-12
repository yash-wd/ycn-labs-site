# YCN Labs vNext — Detailed Page Blueprints

**Purpose:** Give any designer/AI/developer enough structure to build the supporting pages without falling back to service-card templates.

---

# 1. HOME `/`

Authority: `04_HOMEPAGE_EXPERIENCE_MASTER.md`.

Primary job:
- make YCN understandable through product storytelling;
- demonstrate customer-side + business-side value;
- establish premium brand perception;
- move visitor to Work or Start a Project.

Primary CTA:
- Start a Project

Secondary CTA:
- View Work

Motion:
- strongest on the site.

---

# 2. WHAT WE SOLVE `/what-we-solve`

## Hero
Working line:
> **Start with what needs to work better.**

Support:
The answer may be a website, product, workflow, portal, app or tailored system. The format comes after the problem.

## Chapter A — Easier to understand
Show a before/after information hierarchy visually:
- unclear options;
- simplified product/offer experience;
- one next action.

Do not claim conversion increase.

## Chapter B — Easier to act
Show:
- enquiry;
- booking;
- order;
- application;
- request;
- customer self-service.

Use one interactive journey, not six cards.

## Chapter C — Easier to run
Show:
- requests entering;
- owner assigned;
- next step;
- progress;
- follow-up.

## Chapter D — Something new
Show how an idea becomes:
- first useful product;
- tested experience;
- working product;
- later expansion.

## Capability disclosure
Only after the outcomes, include a quiet line such as:
"Depending on the need, this can become a website, commerce experience, web product, mobile product, portal, workflow or tailored software."

## CTA
> Tell us what needs to improve.

Motion:
- medium;
- one or two signature interactions, not a second homepage.

---

# 3. WORK `/work`

## Hero
> **Work should prove the point.**

## Filters
Only if enough content exists:
- Client Work
- Internal Product
- Concept Build

Avoid filters by technology.

## Work item
Large editorial row/media block:
- title;
- class/stage;
- problem;
- product/result;
- verified outcome if available;
- media.

## Empty-state honesty
If the public portfolio is still limited:
> We publish work when the scope, stage and evidence are clear.

Do not fill the page with fabricated placeholders.

Motion:
- media-led;
- restrained hover;
- occasional full-width transition.

---

# 4. CASE STUDY `/work/[slug]`

## Hero
- project title;
- classification;
- stage;
- one-line problem;
- primary product media.

## 01 The situation
Business context in plain words.

## 02 What needed to change
Outcome goal.

## 03 The customer experience
Visual walk-through.

## 04 What happens behind it
Workflow/system view.

## 05 Decisions
Key design/product decisions.

## 06 Engineering
Only relevant architecture/quality choices.

## 07 Outcome
Verified proof only.

## 08 Limits/next
What is not claimed; future work if relevant.

## CTA
> What needs to work better in your business?

Motion:
- project-specific;
- protagonist can be the actual product;
- do not force homepage phone/laptop motifs.

---

# 5. HOW WE WORK `/how-we-work`

## Hero
> **Clear decisions before more software.**

## Section 1 — Understand
What is happening now?
Where is the friction?
Who is affected?

## Section 2 — Shape
Journeys, responsibilities, information and smallest useful version.

## Section 3 — Prototype
See the experience before committing to full build.

## Section 4 — Build
Engineer the agreed product.

## Section 5 — Validate
Test important flows and edge cases.

## Section 6 — Launch
Release the approved version.

## Section 7 — Improve
Use real feedback/usage to decide what comes next.

## Working together
- roles;
- communication;
- scope;
- decisions;
- feedback;
- change control.

## CTA
> Start with the problem.

Motion:
- stable frame;
- scroll changes one step at a time;
- calmer than home.

---

# 6. ABOUT `/about`

## Hero
> **Useful software starts with understanding the work.**

## Why YCN
Explain the company point of view.

## Principles
Possible:
- clarity before complexity;
- product before technology;
- engineering that holds up;
- honest proof;
- improve from real use.

## Team/company
Only verified facts:
- people;
- background;
- location;
- operating model.

## What YCN is becoming
May describe direction/future ambition clearly as direction, not current proven capability.

## CTA
> Work with YCN.

Motion:
- editorial;
- image/type;
- no heavy pins needed.

---

# 7. ENGINEERING `/engineering`

## Hero
> **Simple outside. Deliberate underneath.**

## Architecture
How YCN chooses structure based on the problem.

## Performance
Specific practices, not score claims unless measured.

## Accessibility
Specific practices; do not claim conformance unless verified.

## Security
Specific current practices; no "100% secure".

## Reliability
Errors, retries, recovery, observability.

## Testing
Unit/integration/e2e/visual/manual as actually used.

## Delivery
Environment/deploy/review model as verified.

## Technologies
Show as contextual choices:
"Used when the product needs X", not logo trophies.

## CTA
> Bring a technical question.

Motion:
- diagrams and deliberate transitions;
- no need for cinematic device story.

---

# 8. START A PROJECT `/start-a-project`

## Hero
> **What needs to work better?**

## Form Step 1 — Situation
What is happening today?

## Step 2 — People
Who is this for?
What should they be able to do?

## Step 3 — Business side
What should happen after the customer/user acts?

## Step 4 — Context
Links/files/current tools (optional).

## Step 5 — Planning
Timeline/budget band optional unless later changed.

## Step 6 — Contact
Name/contact/preferred method.

## Confirmation
Show receipt only after durable acceptance.

Do not make project type mandatory first.

Motion:
- minimal;
- progress clarity;
- no cinematic distraction.

---

# 9. THANK YOU `/thank-you`

Show:
- acknowledgement;
- what happens next without unsupported response-time promise;
- reference/receipt if implemented;
- recovery/contact if something is wrong;
- links back to Work/Home.

---

# 10. INSIGHTS `/insights` — later

Only create when YCN has real useful content.

Categories should be business/product/engineering ideas, not SEO filler.

Possible:
- Product thinking
- Business systems
- Engineering
- Accessibility/performance

---

# 11. LEGAL

`/privacy`, `/terms`, `/cookies`

Clear, readable, lightly branded.
No cinematic motion.

---

# 12. 404 / ERROR

Working line:
> **This path does not go anywhere.**

Provide:
- Home
- Work
- Start a Project

Do not create a jokey error page that breaks the premium tone.

---

# 13. Navigation by audience

A non-technical visitor should naturally move:
Home → What We Solve / Work → Start a Project.

A technical evaluator:
Home → Engineering → Work → Start a Project.

A prospective collaborator:
Home → About → Work.

The navigation should support these paths without exposing every possible service.

---

# 14. Owner Addons & Integrated Guardrails (Claude Brief §7)

| Owner wish | How it enters the site | Guardrail |
|---|---|---|
| Video entrance: 10 s brand film (16:9 + 9:16) → logo alone full screen → "scroll" hint → logo shrinks into the navbar → nav items fly in → Hero unblurs | Adopted as **Scene 0 (video variant)**. Orientation-native source, one file fetched, poster-first, muted; logo hold; scroll-scrubbed logo-to-navbar; nav stagger; Hero unblur. | Never blocks: Hero is rendered and usable underneath from the first byte; Skip ≥44px and Esc from 0 s; once per tab (`sessionStorage`); reduced-motion / Save-Data / slow network / return visits get static logo 400 ms; clean rights-cleared export without watermark or tagline (current films carry a generator watermark and a portrait tagline — must be re-exported before use). Owner must ratify this as an amendment of Architecture v2 §3 (code entrance). |
| Honda-style Hero: images/chapters that advance on scroll and auto-advance after idle | Adopted as the **Hero chapter behaviour**: the product object advances through its first states on scroll; after 6 s idle it advances one state with a thin progress line; any input stops auto-advance. | Never moves document scroll; pauses on hover/focus, offscreen, reduced-motion. |
| Frontify: a photo/element transfers to the next section; a search-like "what do you want to do?" field | Adopted as **object hand-off** (the product travels from Hero into the chapter section) and a **local needs finder** on the homepage close: presets + small keyword map → the matching need on What We Build or Start a Project. | Local only; nothing transmitted or stored; not an AI chat. |
| GSAP section with product cards "how we improve their business" | Adopted as the **four chapters** beside the recurring product — not cards. | Card grids are banned by §16 quality bar. |
| Celsior "How we do it" standard section — frame stays, content swaps | Adopted as **"How we do it"**: pinned two-column on desktop, left heading fixed, right content swaps through the 8 steps with a progress line; stacked on mobile. | No long pin on mobile. |
| BudgetDev-style results graphs after technology is added | Adopted as **Results** with two typed data kinds: `illustrative-process` (labelled "Example workflow — not measured business results", no axis numbers, no percentages) and `verified-result` (only with real, dated, permissioned data). | The type system prevents an example rendering as a result. No invented growth curves. |
| Celsior "One engineering platform / requests moving in motion" | Adopted as **Requests flow**: request chips (web form, message, call, walk-in) travel curved paths into the product, outcomes leave (confirmed, quote sent, assigned, reminder); pauses offscreen; static SVG in reduced motion. | No partner logos, no counts. |
| Accordion + remaining sections | FAQ (native details/summary, one open at a time), honest work, Start a Project, footer. | Native `<details>`, one open at a time, durable contact acceptance. |
| "Premium like Apple, professional, not funky" | Standing quality bar across every screen. | One job per screen, restraint, no template chrome. |

