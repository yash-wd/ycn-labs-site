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
