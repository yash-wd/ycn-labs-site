# YCN Labs vNext — Design System & Art Direction

---

## 1. Art direction sentence

> **Editorial confidence + product precision + cinematic continuity + enterprise restraint.**

The site should feel premium because every choice is controlled, not because it contains many effects.

---

## 2. Color

Retain YCN semantic palette as starting system.

### Dark
- Canvas: `#0D111A`
- Section: `#141C2B`
- Surface: `#182234`
- Text primary: `#F8FAFC`
- Text secondary: `#A8B3C5`
- Action fill: `#8BD4FF`
- Link: `#7DD3FC`
- Signal/flow: `#017596`
- Logo cyan: `#02C1F7` decorative/brand only

### Light
- Canvas: `#FFFFFF`
- Section: `#F1F5F9`
- Surface: `#F8FAFC`
- Text primary: `#0A0C10`
- Text secondary: `#475569`
- Action: `#0470B4`
- Signal: `#0299C3`

Dark-first homepage is preferred, with strategically chosen light/paper sections allowed when they improve pacing.

Do not turn the site into a blue gradient website.

---

## 3. Typography

Preferred:
- **Space Grotesk** — major display statements.
- **Inter** — body, UI, functional text.

Use large editorial display sizes where one idea owns the viewport.

Suggested desktop range:
- Hero display: `clamp(4.5rem, 9vw, 10rem)` depending on composition.
- Chapter display: `clamp(3.25rem, 7vw, 7.5rem)`.
- H2: `clamp(2.5rem, 5vw, 5rem)`.
- Body large: `1.125–1.4rem`.
- Body: `1rem–1.125rem`.

Mobile is separately tuned, not scaled blindly.

Avoid ultra-thin text.
Avoid decorative all-caps paragraphs.
Use uppercase/letterspacing only for small eyebrow/meta labels.

---

## 4. Grid

- Desktop: 12 columns.
- Tablet: 8.
- Mobile: 4.
- Max content width around 1440–1500px for editorial sections.
- Full-bleed cinematic sections may ignore the normal container intentionally.
- Maintain strong alignment anchors even in asymmetrical layouts.

---

## 5. Spacing

Use generous negative space, but every dead area must support composition.

Base scale:
`4 8 12 16 24 32 48 64 80 96 128 160 192`

Cinematic sections may use `100svh–160svh` depending on timeline, but avoid long empty scroll tunnels.

---

## 6. Surfaces

Cards are not the default.

Use:
- editorial full-bleed fields;
- pinned split compositions;
- device screens;
- horizontal rules;
- quiet panels only where containment is meaningful;
- near-flat tonal separation.

Avoid:
- every item in a rounded card;
- huge shadow stacks;
- default glassmorphism;
- pill overload.

---

## 7. Device objects

Phone/laptop visuals should feel product-grade.

Preferred:
- real DOM screen;
- authored shell in CSS/SVG/3D asset;
- physically plausible perspective;
- restrained shadow;
- crisp edges;
- no fake operating-system UI unless intentionally authored.

Do not use low-quality stock mockup PNGs with baked screenshots.

---

## 8. Interface screens inside devices

The interface is illustrative unless it represents real shipped work.

Rules:
- use real DOM text;
- label samples when needed;
- do not display fake brands;
- do not imply a shipped client product;
- keep UI simple enough to read while moving;
- use business language, not developer labels.

Good labels:
- New request
- Received
- Assigned
- Next step
- In progress
- Complete

Bad labels on first-read screen:
- webhook
- PostgreSQL
- queue worker
- schema
- microservice
- token
- ORM

---

## 9. Imagery/media

Preferred order:
1. verified project/product captures;
2. real DOM interfaces;
3. original motion graphics/SVG;
4. professionally authored device/product renders;
5. real photography when it carries a relevant story;
6. generated imagery only when it passes realism/brand review and does not pretend to be client proof.

No generic business stock-photo walls.

---

## 10. Navbar

Desired behavior:
- premium fixed/overlay nav;
- official logo;
- small number of links;
- clear CTA;
- intro logo physically transitions toward nav slot;
- nav items arrive after logo;
- after hero, nav remains calm and usable.

Do not make the nav a showpiece at the expense of accessibility.

---

## 11. Buttons

Primary:
- clear contrast;
- moderate radius;
- strong readable label;
- small motion on hover.

No liquid/magnetic cursor effects unless they genuinely improve feel and remain accessible.

---

## 12. Premium anti-slop checklist

Reject:
- random gradients;
- random diagonal lines;
- fake 3D chrome;
- glowing spheres;
- particle storms;
- copied Bento grids;
- excess cards;
- 20 floating logos;
- decorative code snippets;
- oversized "AI" labels;
- cyberpunk blue;
- glass panels on every section;
- overly rounded everything;
- fake metrics;
- fake client photos;
- generated gibberish text in images.

Accept:
- whitespace;
- strong type;
- one strong object;
- excellent image;
- real interface;
- clean motion;
- meaningful state change;
- precise alignment;
- confident quiet sections.

---

## 13. Responsive design

Mobile must be composed independently.

Do not:
- just stack desktop columns;
- crop important device content;
- preserve desktop pin durations that create 8-screen dead scroll.

Do:
- change camera/framing;
- simplify layers;
- make text larger relative to viewport;
- keep one visual idea at a time;
- preserve story sequence.
