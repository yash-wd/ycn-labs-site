# YCN Labs — Design System

**Revision:** 1.2  
**Formula:** Editorial storytelling + software precision + cinematic transformation + restraint.

## 1. Principles

1. **Clarity before spectacle.**
2. **Business first, technology underneath.**
3. **Motion has a job.**
4. **Paused frames must still look intentional.**
5. **Mobile is separately composed.**
6. **Enhancements fail gracefully.**
7. **Cards are not the default layout.**
8. **Do not redesign the final logo.**

## 2. Semantic color system

Use semantic roles everywhere. Do not copy arbitrary hex values into components/scenes.

### Baseline palette

These are the canonical baseline values for this package unless A0 finds an existing owner-approved repository brand record that must be reconciled in M0.

#### Light

| Role | Value | Use |
|---|---:|---|
| Canvas | `#FFFFFF` | page background |
| Section | `#F1F5F9` | alternating section |
| Surface | `#F8FAFC` | raised UI |
| Text primary | `#0A0C10` | headings/body |
| Text secondary | `#475569` | secondary copy |
| Action fill | `#0470B4` | primary button; white text |
| Link text | `#0470B4` | normal link text |
| Signal | `#0299C3` | connection/signal; enquiry signal only |
| Control border | `#66758F` | inputs/focus-adjacent boundaries as tested |
| Logo cyan | `#02C1F7` | logo/decorative only |

#### Dark

| Role | Value | Use |
|---|---:|---|
| Canvas | `#0D111A` | page background |
| Section | `#141C2B` | alternating section |
| Surface | `#182234` | raised UI |
| Text primary | `#F8FAFC` | headings/body |
| Text secondary | `#A8B3C5` | secondary copy |
| Action fill | `#8BD4FF` | primary button; dark text |
| Link text | `#7DD3FC` | readable inline links |
| Signal | `#017596` | connection/signal; enquiry signal only |
| Control border | `#64748B` | boundaries; verify actual state contrast |
| Logo cyan | `#02C1F7` | logo/decorative only |

### Rules

- Logo cyan is never body/link text.
- Signal cyan communicates **connection/information movement**, not every interactive state.
- Success/warning/error are system-state colors with text/icon reinforcement, not brand colors.
- No purple/rainbow/green brand drift.
- Never use a color token as normal text unless actual rendered contrast passes.
- White text on `#0470B4` is an acceptable baseline combination; dark-theme inline links use the lighter link token rather than `#0470B4` on dark canvas.

## 3. Typography

Policy:

1. Audit the font already used by the repository.
2. If it is licensed, readable and works with the logo, retain it.
3. If not, use **Inter** for body/UI.
4. Add **Space Grotesk** for display only if visual comparison shows a clear brand benefit.
5. Maximum two web-font families by default.
6. Logo type remains logo-only.

### Type scale

Use `clamp()` for responsive scaling. Baseline:

- Display: `clamp(2.75rem, 6vw, 5.5rem)`
- H1: `clamp(2.4rem, 5vw, 4rem)`
- H2: `clamp(2rem, 4vw, 2.75rem)`
- H3: `clamp(1.5rem, 2.5vw, 1.9rem)`
- Body L: `1.125–1.25rem`
- Body: `1rem–1.0625rem`
- Small: `0.875rem`
- Caption: `0.75–0.8125rem`

Body line-height about 1.5–1.65; headings about 1.05–1.2. Support 200% zoom and 400% reflow testing.

### Type-role allocation — cinematic vs content (Owner decision, 14 October 2026)

- **Cinematic display role:** Reserved for the homepage Hero and the designated product-story chapter headings. These moments may use the larger editorial sizing direction in `docs/vnext/06_DESIGN_SYSTEM_AND_ART_DIRECTION.md` §3, subject to the existing approved composition and responsive/visual checks. This is **not** a global `h1`/`h2` enlargement rule.
- **Standard content role:** Supporting pages (What We Solve, Work, How We Work, About, Engineering, Contact and legal), navigation, forms, FAQs, ordinary section headings and functional UI retain the established §3 H1/H2/H3/body/caption scale. They must not inherit cinematic sizes just because they contain a heading.
- **No implicit retokenization:** The vNext cinematic numeric ranges are design guidance for eligible scenes; this decision approves **where** cinematic typography belongs, not an unreviewed change to numeric CSS values, font families, existing ratified copy or frozen page geometry. Any later size adjustment requires viewport evidence and the Owner visual gate. Mobile/zoom/reduced-motion variants must retain readable hierarchy without overflow.

## 4. Spacing and grid

4px base scale: `4 8 12 16 24 32 48 64 80 96 128 160 192`.

- Desktop: 12-column.
- Tablet: 8-column.
- Mobile: 4-column.
- Max content width: about 1360px unless the existing system has a strong reason otherwise.
- Mobile page margins: ~16–20px.
- Desktop margins: scale to ~64px or container logic.

Cinematic sections can breathe, but do not require large dead scroll distances.

## 5. Shape and surfaces

- Buttons: ~8px radius.
- Inputs: ~12px.
- Cards/panels: 16–20px where a contained entity is genuinely useful.
- Pill only for compact tags/status.
- Prefer border + tonal separation over large shadows on dark backgrounds.
- Avoid glassmorphism-by-default.

## 6. YCN visual motif

The orbital arc / nodes from the final logo may inspire a restrained recurring system:

- section-divider arc;
- single signal node following a path;
- dotted = not connected;
- solid = connected;
- brief pulse = received.

Do not redraw the actual logo in CSS. Do not create full-screen particle constellations or spinning globes.

## 7. Motion

Timing tokens:

- Micro: 120–180ms
- Standard: 240–360ms
- Expressive: 500–800ms
- Cinematic: 1–2s, rare

Every motion answers one question: what should the user understand changed?

Allowed meanings: entering, connecting, transforming, progressing, receiving, settling.

Natural scrolling by default. No scroll-jacking. “Skip experience” should bypass optional choreography. Reduced motion provides static composed frames with full meaningful-content parity.

### Signature perimeter signal — controlled opt-in motion (Owner decision, 14 October 2026)

**Visual meaning:** One luminous signal node with a short, softly fading tail travels along the **actual rounded-rectangle/capsule perimeter** of an eligible control. This extends the single-node-following-a-path motif in §6. The existing **Start a Project** border is an optical reference for the highlight/tail, **not** a calibrated speed reference. Do not replace the path with a fixed-time rotating conic gradient or illuminate all controls by default.

**Documented design tokens (implementation mapping is a later coding task):**

| Token | Owner-approved contract |
|---|---|
| `motion.signatureBorder.speed` | **80 CSS pixels of perimeter travel per second** in each steady state, collapsed and expanded; measured tolerance **±5%**. This is distance along the rendered border path, **not** a fixed lap duration or device-hardware pixels per second. |
| `motion.signatureBorder.trail` | A short, tapered, smoothly fading cyan/blue-white signal tail consistent with the existing CTA appearance; final optical details follow Owner browser acceptance. Use existing semantic brand/signal roles, not new arbitrary hex colors. |
| `motion.signatureBorder.phase` | A continuous distance-based position driven by elapsed monotonic time and measured path geometry. Changing dimensions must not restart the orbit or visibly jump its position. Lap duration naturally changes with perimeter length. |
| `motion.signatureBorder.scheduler` | **One shared requestAnimationFrame-based ticker/clock** for the border family, not one timer or animation loop per instance. Coordinate with existing site/GSAP motion ownership; avoid competing animation owners or per-frame layout reads. |
| `motion.signatureBorder.visibility` | Pause work while the document is hidden, the control is off-screen, or its decorative effect is intentionally suppressed by the visibility-priority rule. Resume smoothly without a phase jump. Measure geometry on size changes, not every frame. |
| `motion.signatureBorder.reducedMotion` | Static, deliberately composed border presentation under `prefers-reduced-motion: reduce`; no traveling node, and no loss of focus visibility, contrast, label readability or keyboard operation. |
| `motion.signatureBorder.eligibility` | Only the **four existing placements**: Menu, header CTA, mobile-menu CTA and Hero CTA. No new animated inputs, cards, dividers, footers, buttons or sections are authorized. |

**Simultaneous visibility and priority:** No more than **two conspicuous perimeter signals** should animate on screen at once. On the homepage, **while the Hero's Start a Project CTA is visible, pause only the header CTA's decorative signal**; the Hero CTA keeps its signal. Once the Hero CTA is no longer visible, the header CTA signal may resume. The header button itself remains interactive and keyboard-accessible throughout. When a mobile navigation overlay is open, do not keep a visibly obscured background signal running behind it; verify the two-signal budget in the real composition. Use an explicit visibility/priority rule, **not** an arbitrary silent global cap that unpredictably disables a primary action. This priority behavior is part of the **later CTA migration (Task 07b)**, not the Menu-only pilot or this documentation change.

**Implementation boundaries and acceptance:**

1. **Task 07 (Menu pilot):** Implement the new distance-based engine for `YcnSignalBorder`'s `continuous` mode only. Keep `accent` mode behavior byte-identical; do not change the header/mobile/Hero CTAs. The Hero is frozen under HOME-01C.
2. **Task 07b (separate Owner authorization):** Migrate all three existing `accent` CTA placements together, including only a specifically approved **border-only** change to the frozen Hero CTA. Apply the header/Hero priority and simultaneous-visibility rule then; add no new border instances.
3. **Geometry:** Derive accurate path length from the rounded shape; remeasure on width/height/radius changes. Do not map one 5-second normalized lap to differently sized Menu states. Do not reset progress when Menu expands or collapses.
4. **Proof:** Measure **80 CSS px/s ±5%** in both steady Menu states, confirm continuous position during the morph, check light/dark and reduced-motion variants, keyboard/focus/hover, desktop/mobile breakpoints, page-hidden/off-screen suspension, and the homepage first-screen two-signal behavior in Task 07b. Retain raw reports and visual proof **only in the private vault** (`proof/YCN-NAV-07/`), with the two-round Owner visual review.
5. **Change gate:** These are approved **design rules**, not authorization for frontend code edits, global reanimation, changes to the frozen HOME-01C scene, or a push. Coding resumes only after foundation Gate E and a separate approved scoped task.

## 8. 3D / WebGL

Default: HTML + CSS + SVG.

Three.js/WebGL only when:

1. the scene is clearer with it than without it;
2. there is a static/DOM fallback;
3. mobile and reduced-motion behavior is defined;
4. measured performance remains within budget;
5. dependency/asset cost is justified.

Banned by default: floor grids, thick tubes, random rings, blobs, planets, particles, heavy bloom, decorative 3D that communicates nothing.

## 9. Component system

Foundation:
- Container, Section, Stack, Grid, Divider

Navigation:
- Navbar, MobileNav

Content:
- SectionHeading, ProblemPath, WorkCard, HonestyBadge, ProcessStep, LayerPanel, FAQItem

Actions:
- PrimaryButton, SecondaryButton, TextLink

Forms:
- Input, Textarea, Select/ChoiceGroup, ContactMethod, StepFlow, FieldError, SubmissionState

System:
- Toast/StatusMessage, Modal only where necessary, ErrorBoundary/Fallback, EmptyState, Skeleton where useful

Signature:
- SignalPath
- ConnectionScene (shared Pressure/Held entities)
- LayerStack

Do not build a generic 100-component library before the product needs it.

### Signature border — component scope

`YcnSignalBorder` is an **opt-in enhancement**, not a universal button/input/card style. Its existing `continuous` (Menu) and `accent` (three CTAs) modes have **separate implementation approvals**; the Menu pilot must not silently modify any CTA or the frozen HOME-01C Hero. A paused signal never removes the underlying button, semantic label, visible keyboard focus, hover/active feedback or reduced-motion/static affordance. Eligibility and visibility priority are governed by §7.

## 10. States

Every interactive component defines:

`default · hover · focus · active · disabled · loading · success · error`

Focus cannot rely on color alone and must remain visible in both themes.

## 11. Imagery

Prefer:

- real DOM interfaces;
- product screenshots when real;
- original SVG system diagrams;
- device mockups based on real UI;
- later, authentic photos of actual businesses with permission.

Avoid generic Western stock photography that misrepresents the audience and fake interface screenshots presented as shipped products.

## 12. Pause test

At representative points in every story scene, pause the animation. The composition should still communicate customer → business → connection/state. If it becomes random floating decoration, redesign it.

## 13. Accessibility/performance design rules

- Real text is DOM text.
- Visible focus.
- Keyboard path through story controls/forms.
- Touch targets around 44px where practical.
- Semantic headings.
- Responsive images (`AVIF/WebP` where suitable).
- Below-fold heavy assets lazy loaded.
- Avoid layout-thrashing animation; prefer transform/opacity.
- Do not publish Lighthouse/CWV/WCAG claims until tested/verified.
