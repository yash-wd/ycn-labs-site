> [!NOTE]
> **HISTORICAL REFERENCE ONLY — NOT ACTIVE PROJECT AUTHORITY**
> This document is preserved for engineering provenance and historical record.
> It has been superseded by the **YCN Canonical v1.2** specification suite.
> For current active project specifications, task queues, and architecture, consult [`docs/INDEX.md`](../INDEX.md).

---

# YCN Labs — Homepage Structure & Architecture v2 (2026-09-17)

Project: `ycnlabs`, branch `site-v2`. One page, nine blocks, one motion library. Premium, calm, Apple-like: large compositions, real photography, one accent, no gimmicks. Every block has a static fallback that is fully readable with no JavaScript, reduced motion, or Save-Data.

## 1. Page flow

```
0 ENTRANCE   film (10 s) → logo full-screen → scroll → logo shrinks into navbar → nav items fly in → hero unblurs
1 HERO       chapters: who we are / what we do / who it is for  (Honda-style, scroll or idle-advance)
2 IMPROVE    "how we improve your business": pinned product cards, scroll-driven  (GSAP)
3 HOW        "how we do it": pinned heading, content swaps  (Celsior-style)
4 RESULTS    results graphs, honest data only  (BudgetDev-style visual)
5 FLOW       requests flowing into one system  (Celsior hub, YCN version)
6 ACTIONS    "what would you like to make easier?" six tappable choices + live sample
7 FAQ        accordion + work items
8 CONTACT    guided form + footer
```

## 2. Block specifications

### 0 — Entrance (cover layer over the real page)
- Eligibility: fresh load at top of `/` only. Internal navigation, back button, hash links, reduced-motion, Save-Data, no-JS: skip straight to HOME. Flag kept in memory, not storage.
- FILM: pick landscape or portrait export by viewport once; mount one `<video muted playsinline preload="auto">`. Poster = first frame. "Skip" control visible from 0 s. Scroll during film = stop film, continue to handoff.
- LOGO HOLD: last film frame crossfades to the official PNG mark (full artwork, orbital rings) centred, contained within 60 % of the shorter viewport side. Text: "Scroll to explore" with a 1 px animated line. Keyboard: Enter = skip.
- LOGO → NAV: scroll-scrubbed (GSAP ScrollTrigger, `scrub: true`) over 100 vh of scroll. One transform path: translate + scale from centre rect to the navbar logo rect, measured at runtime. At 75 % the presentation copy and the real navbar logo swap at identical geometry. 80–90 %: nav items enter from −12 px with 40 ms stagger. 90–100 %: hero unblurs (filter blur 12 px → 0, opacity 0 → 1). Reverse scroll reverses everything; film never replays.
- Nothing "waits for scroll" in the HTML. All content is server-rendered under the cover.

### 1 — Hero chapters (Honda pattern, YCN content)
Five full-viewport chapters, each: one large photograph or 6-second clip, 3–6 word title, one line, chapter index on the side.
1. **We build around your business.** (owner at counter)
2. **Customers find you.** (phone, search result)
3. **They ask, book or buy.** (phone → request)
4. **Your team sees it in one place.** (laptop dashboard)
5. **It keeps working.** (owner, calm desk)
Scroll advances chapters (snap, 600 ms ease). Idle 6 s → auto-advance with a thin progress bar; any input stops auto. Chapter index is clickable. Includes a "What do you want to do?" search-style field (Frontify) that filters the six actions in block 6 and scrolls there. Mobile: same chapters, portrait crops, swipe.

### 2 — How we improve your business (GSAP card sequence)
Pinned 300 vh section. Four cards enter from the right and stack, each with a photo, a plain title, one line:
Website that customers find · Enquiries and bookings without phone calls · One place for orders, jobs and team · Software built for your process.
As each card lands, a before → after micro-visual plays inside it (messy desk → organised desk photo pair; missed call → booking card). Reduced motion: four cards in a grid.

### 3 — How we do it (Celsior pattern)
Pinned two-column: left heading "You know your business. We handle the technology." stays; right column swaps five steps on scroll with a vertical progress line: Talk · Agree scope and cost · See the design · Build and check · Launch and hand over. Each step has one photo crop and one line. Mobile: stacked, line on the left.

### 4 — Results (graphs, honest)
Visual format from BudgetDev: dashboard card, counting numbers, line graph drawing itself. Data rules, choose one per graph:
- **Own measured facts**: YCN site performance (Lighthouse 100, load time), measured and dated. Real, verifiable.
- **Illustrative journey** labelled clearly ("Example: a shop taking bookings online"): a line for missed enquiries going down and a line for bookings going up, no axis numbers, caption "Illustrative. Your numbers depend on your business."
- **Real client results** only after a client agrees in writing. Not now.
No invented counts. This rule protects the premium feel more than any animation.

### 5 — Requests flow into one system (Celsior hub, YCN version)
Centre: YCN mark. Left edge: request chips (WhatsApp message, web form, phone call, walk-in, Instagram DM) travel along curved paths into the centre. Right edge: outcomes leave (Booking confirmed, Quote sent, Job assigned, Reminder). Continuous, slow (12 s loop), pauses when off-screen, static SVG in reduced motion.

### 6 — What would you like to make easier? (kept from current build)
Six choice cards; tapping crossfades a phone mock and slides in the matching laptop card. "Illustrative example · Nothing is sent."

### 7 — Answers and work
Accordion (6 FAQ, one open at a time, 250 ms). Two work items, honestly labelled Internal product / Concept build.

### 8 — Contact + footer
Guided form (existing subsystem). Footer with logo, links, credits.

## 3. Navbar (Fourmula / Kal-store)
Fixed, 64 px, transparent over hero then frosted (backdrop-blur 12 px, 80 % background) after 40 px scroll. Logo left (the real element the entrance lands on). Items: What we build · Our work · How we work · About · **Talk to us** (button) · theme toggle. "What we build" opens a full-width panel (translate −8 px + fade, 200 ms) with four destinations and one line each. Mobile: Menu button → full-screen panel, items stagger in, Escape closes. Never hides on scroll.

## 4. Technical architecture
- Next.js App Router in `ycnlabs`, single app. Tailwind v4 tokens, Geist via next/font.
- **Motion: GSAP + ScrollTrigger only** (free licence since 2025). Remove Framer Motion; one library, one timeline model. No Lenis / scroll hijacking: native scroll, `scrub` for scroll-linked blocks, `snap` only inside the hero chapters.
- Theme: next-themes, class strategy, `@custom-variant dark` in CSS. Default: **dark** (brand was designed for dark), light available, system respected on first visit if the owner prefers (decision below).
- Entrance = a client component that mounts over server-rendered content; a controller with states FILM → HOLD → HANDOFF → HOME; any error releases the cover.
- Each heavy block is a `dynamic()` import loaded when within 1.5 viewports.
- Charts: inline SVG animated with GSAP (stroke-dashoffset, counters). No chart library.
- Video: `<video>` with MP4 (H.264) + WebM (VP9). Hero clips loop muted; block 5 is SVG, not video.

## 5. Assets on ImageKit (URL transforms do resizing; upload originals once)
| Asset | Spec | Use |
|---|---|---|
| Entrance film landscape | 1920×1080, 10 s, H.264 ≤ 2.5 MB, WebM ≤ 2 MB, last frame = clean logo on solid background, first frame exported as poster JPG | Block 0 desktop |
| Entrance film portrait | 1080×1920, same rules | Block 0 mobile |
| Official mark | PNG 2048 px transparent, dark and light variants | Navbar, entrance, footer, hub centre |
| Chapter media ×5 | photo 2400×1350 + portrait crop 1080×1620, or 6 s clip 1280 px ≤ 600 KB | Block 1 |
| Card photos ×4 + before/after pairs ×2 | 1600×1000 | Block 2 |
| Step crops ×5 | 1200×800 | Block 3 |
| Phone and laptop screen mocks | HTML, not images | Blocks 1, 6 |
ImageKit URLs use `tr=w-...,f-auto,q-80`; `srcset` at 640/1024/1600/2400; `loading="lazy"` for everything below the fold; `fetchpriority="high"` only on the first chapter image.

## 6. Performance budget (measured on 4G, mid-range Android)
- Skip-path (reduced motion, return visits): LCP ≤ 2.5 s, CLS 0, JS ≤ 220 KB gz.
- Entrance path: poster paints ≤ 1.2 s; film streams (never blocks); GSAP (≈ 25 KB gz) loads after first paint; nothing else downloads until the film is 80 % done.
- Fonts: two weights of Geist, `font-display: swap`. Images AVIF/WebP via ImageKit. No third-party scripts except Vercel Analytics.
- Animations use only transform, opacity, filter; `will-change` set just before and removed after. All ScrollTriggers killed on unmount.

## 7. Build order (each phase reviewed on your phone before the next)
1. Navbar + theme + tokens + hero chapters (static media, no entrance).
2. Blocks 2, 3, 6 with GSAP.
3. Blocks 4, 5, 7, 8.
4. Entrance film + logo handoff (last, because it is the riskiest and needs the final films).
5. Performance pass, real-people test (3 owners, 10 seconds), deploy.

## 8. Decisions needed from the owner
1. Default theme: dark first (recommended for this brand) or follow the phone setting?
2. Results block: own measured site facts + labelled illustrative journey (recommended), or leave results out until a real client agrees?
3. Entrance: replay on every refresh (current requirement) or once per visit (recommended: visitors returning within the session skip it)?
