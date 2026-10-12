# YCN Labs Website vNext — START HERE

**Version:** 1.0  
**Date:** 21 Sep 2026  
**Purpose:** Single working documentation pack for the next YCN Labs website build.  
**Audience:** Owner, Strategy AI, Challenge/Review AI, AGY execution agent, designers, frontend engineers, QA reviewers.

---

## 1. Why this pack exists

The existing website documentation contains several historical homepage concepts (mobile-shop, "Between", earlier scene architecture). The Owner has now given a newer direction: the website must be about **YCN Labs itself and the business outcomes its products create**, not about a fictional business, a service-card catalogue, a technology-logo wall, or an abstract tech metaphor.

The two current v3 HTML prototypes are **directional studies only (roughly 20% of the expected finished experience)**. They are not production layouts and must not be copied line-for-line.

This pack converts the Owner's latest direction into a buildable site system.

---

## 2. The one-sentence brief

> **Build a premium, cinematic, product-led YCN Labs website where visitors understand how YCN helps a business move forward by watching a digital product change the customer experience and the work behind it — without needing to understand technology.**

Internal experience concept name:

> **PRODUCT IN MOTION**

This is an internal planning name only. It is not public website copy.

---

## 3. Latest Owner direction — binding unless explicitly changed

1. The homepage must **not** be a catalogue of "web development / app development / e-commerce / digital marketing / custom software" cards.
2. The homepage must **not** show React, Next.js, TypeScript, SQL, MongoDB, cloud logos, or similar technology icons as the sales pitch.
3. The visitor should see **what becomes easier, clearer, faster to act on, or better organised for the business**.
4. Visual storytelling must carry the explanation, in the same broad principle that Forge uses one recurring vehicle as the visual argument.
5. YCN's equivalent is a **digital product/device experience**, not a car and not a fake client business.
6. The **phone/device continuity pattern is used only for a defined chapter cluster**. It must not become the one repeated trick for the entire page.
7. After the phone chapter completes, the phone settles with its content and a **new visual concept begins**.
8. One later signature sequence uses a **laptop with a blank/quiet screen**. On scroll, the product appears in the laptop; the camera approaches the screen; the next scene expands out of the screen and occupies the full viewport. Reverse scroll must reconstruct the transition.
9. Use multiple high-quality motion ideas: object carry-over, camera move, mask/reveal, parallax, pinned editorial chapters, screen portal, data/request flow, proof graph, stable-frame content change, and quiet close. **Do not repeat the same pattern in every section.**
10. Scroll-linked experiences should reverse cleanly when the user scrolls back. One-way animation is reserved for the first-session entrance film and genuine one-time UI events.
11. The site must feel like work from a **senior MNC-level product team, principal UI/UX architect and senior frontend engineer**.
12. The visual quality target is **premium and professional, not funky**. Think restraint, confidence and precision rather than visual noise.
13. The site must never feel like "AI slop".
14. The installed frontend skills are a **standing project requirement**. The Owner does not need to repeat this.

---

## 4. Primary reference set

These are inspiration sources, never templates to copy.

| Reference | What YCN should learn |
|---|---|
| https://forgeautomotive.co.uk/ | Recurring visual protagonist; cinematic chapter pacing; object/detail/object continuity; sharp words; full-screen visual storytelling; premium paused frames. |
| https://celsiortech.com/ | Enterprise clarity; strong hierarchy; stable section frames with changing content; clear outcome framing; moving platform/data visual ideas. |
| https://www.octaboot.com/ | Very short, memorable copy; confidence; interactive object moments; fewer explanations; one clear point per screen. |
| https://www.ulmind.com/ | Fluid modern motion and digital-services confidence; use as directional motion reference, not as copy/IA authority. |

Secondary interaction references are documented in `02_REFERENCE_TRANSLATION_MATRIX.md`.

---

## 5. Existing YCN rules retained

Unless this pack explicitly changes them:

- Final supplied YCN Labs logo remains final; do not redraw or distort it.
- Public brand remains **YCN Labs**; do not force a public acronym expansion.
- **Space Grotesk + Inter** remain the preferred display/body pairing.
- Dark-first YCN visual system remains the baseline.
- Existing YCN blue/cyan semantic palette remains the starting palette.
- **"Software, engineered to hold up."** remains a strong descriptor.
- Claims must remain honest. No fake clients, proof, testimonials, numbers, awards, performance claims or growth metrics.
- Technical depth belongs deeper in the site, especially `/engineering`, not in the homepage first reading.
- Mobile must be intentionally composed, not a squeezed desktop.
- Reduced-motion and no-enhancement fallbacks must contain the full meaning.
- Owner browser review is the final visual gate.

---

## 6. What this pack supersedes

For homepage experience direction, this pack supersedes:

- DECISION-019 "Between" photographic counter concept;
- the mobile-shop story;
- the old seven-scene homepage narrative where it conflicts with the new Product-in-Motion experience;
- the old media pack based on shop/counter photography;
- any requirement to keep Scene 3/Scene 6 as that former business-counter story;
- any idea that Scene 5 must contain Three.js simply because it existed in the older architecture.

Three.js remains available only if a later, measured implementation proves it improves a specific moment.

Historical files must be preserved as history rather than silently rewritten.

---

## 7. What does **not** get superseded

Keep and reconcile rather than discard:

- logo and brand technical records;
- claims and proof discipline;
- repository/branch safety;
- accessibility, reduced motion, SEO, security and performance requirements;
- evidence discipline;
- honest work/case-study classification;
- contact/enquiry reliability requirements;
- final technical closeout documentation requirement.

---

## 8. Required read order for any AI or developer

1. `00_START_HERE.md`
2. `01_OWNER_VISION_AND_NON_NEGOTIABLES.md`
3. `03_INFORMATION_ARCHITECTURE_AND_PAGE_PLAN.md`
4. `04_HOMEPAGE_EXPERIENCE_MASTER.md`
5. `05_MOTION_AND_TRANSITION_SYSTEM.md`
6. `06_DESIGN_SYSTEM_AND_ART_DIRECTION.md`
7. `07_CONTENT_AND_MESSAGING_STANDARD.md`
8. `08_FRONTEND_ARCHITECTURE_AND_SKILLS.md`
9. `09_MEDIA_ASSET_PRODUCTION_SPEC.md`
10. `10_PERFORMANCE_ACCESSIBILITY_SEO.md`
11. `11_QA_VISUAL_ACCEPTANCE_GATES.md`
12. `12_AGENT_PROTOCOL_POINTER.md`
13. `13_IMPLEMENTATION_ROADMAP.md`
14. `14_DECISIONS_POINTER.md`
15. `15_AGY_ADOPTION_AND_FIRST_BUILD_INSTRUCTION.md`
16. `16_PAGE_BLUEPRINTS_DETAILED.md`

Reference translation lives in `02_REFERENCE_TRANSLATION_MATRIX.md`.

Before implementation, the execution agent must also read the repository's current claims register, brand record and current codebase.

---

## 9. Authority & Precedence Order

Required authority order:
1. **Explicit latest Owner ruling**
2. **`../YCN_DECISIONS.md`**
3. **`../YCN_CLAIMS_AND_PROOF.md`**
4. **`../YCN_CONTENT_SPEC.md`**
5. **`../YCN_DESIGN_SYSTEM.md` and verified brand records**
6. **this vNext pack (`docs/vnext/*`)**
7. **`../YCN_BRAND_EXPERIENCE_REFERENCE_MASTER_FINAL.md`** — reference only
8. **`../legacy/*`** — history only

`../YCN_HANDOFF.md` is read first for CURRENT STATE, but it does not override higher factual/content/decision authority.

> [!IMPORTANT]
> **Permanent Historical Separation Statement:**  
> The current YCN homepage design is **PRODUCT-LED vNext**. Mobile-shop, Between/counter photography, SIGNAL→STRUCTURE and former seven-scene visual directions are historical only and must not be used for new design or implementation.

No AI may create an "Owner ruling" the Owner did not state.

---


## 10. Prototype status

The two current v3 HTML files are useful because they demonstrate:

- outcome-led language;
- a recurring phone/product object;
- product states changing while content moves;
- the beginning of product-led visual storytelling;
- GSAP/ScrollTrigger feasibility.

They do **not** define the finished site's layout, copy, spacing, components or final motion. Treat them as a 20% direction reference.

---

## 11. Definition of done for the website

A successful YCN site should allow a non-technical business owner to say, in substance:

> "YCN understands what needs to improve in my business, designs a digital product around that problem, builds the customer side and the work behind it, and stays focused on making the product useful — not on showing me technology names."

A technical visitor should be able to go deeper and see credible engineering discipline without forcing that complexity on everyone else.
