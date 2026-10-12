# YCN Labs vNext — Motion & Transition System

---

## 1. Motion philosophy

Motion is part of the explanation.

Every animation must communicate one or more of:

- entering;
- focusing;
- carrying continuity;
- transforming;
- revealing;
- connecting;
- progressing;
- receiving;
- settling.

If the animation only says "look, this moves", remove it.

---

## 2. Primary engine

GSAP + ScrollTrigger is the primary homepage choreography system.

Use:
- timelines;
- scrubbed transforms;
- pin only when the story requires a stable frame;
- `matchMedia()`/responsive setup;
- deterministic cleanup in React;
- transform/opacity first;
- FLIP/shared-layout strategy for object hand-offs.

Do not have GSAP and Framer Motion animate the same property on the same narrative element.

Framer Motion is for isolated UI micro-interactions only.

---

## 3. Scroll behavior

### Natural scroll
The browser's normal scroll remains the master input.

Do not:
- hijack wheel events for fake slides;
- trap users in scenes;
- force snap everywhere;
- disable scrolling while waiting for animation.

### Scrub
Use scrub when object motion should track scroll position and reverse naturally.

### Pin
Use pin sparingly for:
- phone chapter;
- laptop portal if needed;
- one stable "How we work" chapter.

Do not pin just to make a section feel cinematic.

---

## 4. Reverse behavior — mandatory

Every scroll-controlled timeline must be verified in both directions.

Acceptance:
- forward and reverse reach equivalent states;
- fast direction change does not leave invisible text or wrong active state;
- resize/rotation refreshes positions safely;
- deep-link/refresh at mid-page does not corrupt scene state.

Prefer one timeline with scroll progress over many one-way triggers for a single scene.

---

## 5. Entrance architecture

### Assets
- Desktop horizontal entrance video.
- Mobile vertical entrance video.
- Poster frame for each.
- Official YCN logo.

### Playback
- autoplay muted + `playsinline` where permitted;
- first eligible session only by default;
- visible skip;
- Esc skip on keyboard;
- film overlay never traps focus;
- reduced-motion: skip film, use composed logo state;
- Save-Data/very slow conditions: skip or use poster/logo path;
- repeat visit: go directly to logo/hero unless Owner later requests replay control.

### End of video
Film hands off to full-screen official logo.

### Scroll hand-off
Use transform-only logo move:
- scale;
- x/y translation;
- optional opacity of surrounding stage;
- measured final navbar slot.

Prefer FLIP-like geometry rather than guessing pixel positions.

### Navbar reveal
After logo is within/near final nav position:
- nav items stagger from top;
- short distance;
- no bouncy easing;
- CTA resolves last or with restrained emphasis.

### Hero reveal
Hero text:
- opacity + small y;
- optional blur only during very short intro if performance tests pass;
- do not animate large blur on every scroll frame.

---

## 6. Idle behavior inspired by Honda

If the user does not scroll after Hero becomes ready:

Allowed:
- subtle product-state drift;
- controlled visual focus change;
- quiet automatic progress between hero media states after an idle delay.

Not allowed:
- auto-scroll the document;
- change the page beneath a reader while they are interacting;
- create autoplay carousel behavior that steals focus.

Pause idle behavior on pointer/keyboard/touch interaction.

Reduced-motion disables it.

---

## 7. Phone carry-over sequence

Recommended technique:
- one persistent DOM object within a shared stage spanning Hero + phone chapters, or
- a FLIP transition between identical shells.

Avoid duplicate-phone crossfade unless there is no visible continuity break.

The device can:
- scale;
- rotate by a few degrees;
- translate;
- change shadow/depth;
- change screen state.

It should not:
- spin;
- float aimlessly;
- bounce;
- behave like a 3D demo.

At end, phone settles and exits the narrative spotlight.

---

## 8. Laptop portal sequence

Build as one spatial timeline.

Example normalized progress:

- 0.00–0.15: laptop enters / screen quiet
- 0.15–0.35: screen content appears
- 0.35–0.60: camera moves closer
- 0.60–0.82: screen rectangle aligns toward viewport
- 0.82–1.00: bezel clears frame; next full-screen scene owns viewport

Reverse uses the same timeline.

Implementation options:
1. DOM/CSS laptop shell + screen content;
2. SVG/PNG high-quality shell + DOM screen;
3. lightweight Three.js only if perspective quality cannot be achieved otherwise and performance budget supports it.

Three.js is not a goal.

---

## 9. Parallax

Use restrained multi-plane depth:
- background: ~0.94–0.98 relative travel;
- content: 1.0;
- foreground: ~1.02–1.06.

Travel should remain small.

Avoid huge background drift and nausea-inducing perspective.

Disable/reduce on mobile/reduced motion.

---

## 10. Text motion

Default:
- line/word reveal only on major statements;
- small distance;
- opacity;
- mask clip when useful.

Do not split every paragraph into animated words.

Body copy should remain readable while user scrolls.

---

## 11. Data/request flow

Use SVG/DOM lines and real labels.

The motion can:
- enter from multiple sources;
- converge;
- assign owner;
- update state;
- move to next step.

No random particles.

No fake live events.

No real personal data in demo flows.

---

## 12. Graph/proof motion

Graph draw must reflect evidence status.

If verified:
- labels and values come from case-study data.

If illustrative:
- display a persistent visible "Illustrative" label;
- do not style it like measured client proof;
- do not use percentages that imply real performance.

---

## 13. Breakpoint motion tiers

### Desktop ≥ 1280
Full choreography where performance allows.

### Laptop/tablet landscape 1024–1279
Most choreography, reduced distances/pins.

### Tablet/large mobile 768–1023
Simplified spatial transitions; fewer simultaneous layers.

### Phones < 768
Preserve narrative, not desktop camera complexity.
- phone story can remain;
- laptop portal may use 2D scale/mask;
- no heavy WebGL;
- no complex multi-pin chain.

---

## 14. Reduced motion

Reduced-motion version:
- no entrance film autoplay;
- logo starts in final or composed state;
- no large spatial travel;
- no scrubbed camera move;
- no parallax;
- phone/laptop states become stacked/static or step-based;
- all content and CTAs remain.

---

## 15. Performance rules

- animate transforms and opacity;
- avoid layout-thrashing top/left/width where transform works;
- use `will-change` only during relevant windows;
- do not leave large animations running offscreen;
- lazy-load heavy media;
- precompute geometry where possible;
- refresh ScrollTrigger after required fonts/media sizing;
- clean up all triggers on route change/unmount.

---

## 16. Debug requirements

During development:
- use ScrollTrigger markers locally;
- test direction changes;
- log active scene/state if needed;
- test 320/375/390/430/768/1024/1280/1440/1920 widths;
- test page refresh at mid-scroll;
- test browser back/forward;
- test resize;
- test touch scroll.

Remove debug markers/log noise before production.

---

## 17. Binding Motion Rules & Reversibility Contract (Claude 02 §3)

- **Engine ownership:** GSAP 3.15 + ScrollTrigger (+ Flip, MotionPath, SplitText where explicitly specified). Framer Motion is reserved strictly for nav/dialog micro-interactions. One rAF loop. `gsap.matchMedia` for desktop/mobile branches; `context().revert()` on route exit and on media-query change; all triggers killed on unmount.
- **Timing tokens:** Micro 120–180 ms · Standard 240–360 ms · Expressive 500–800 ms · Cinematic 1–2 s (entrance, Scene 5 push-in only). Ease: `power2/power3.out` for entrances, `none` for scrub.
- **Allowed animation properties:** `transform`, `opacity`, `stroke-dashoffset`, `clip-path`. Never animate `width`, `height`, `top`, `left`, `margin`, large `blur` (except the entrance media layer), animated `box-shadow`, or `background-attachment: fixed`.
- **Pinning discipline:** Pinned sections on desktop only (Scenes 5, 8, 10). Mobile uses sticky mini-moments ≤ 150vh, native scroll, ≤3 concurrent animated layers, micro-parallax (bg 0.92× / content 1× / fg 1.05×, travel 6–24px).
- **Layout stability & refresh:** `content-visibility: auto` is never applied on pinned or ScrollTrigger-observed sections. `ScrollTrigger.refresh()` is called after fonts load and after any lazy media completes. Pinned sections must have deterministic height.
- **Reduced motion parity:** Every scene renders its final composed state statically; entrance = static logo 400 ms; loops = static SVG; sticky object becomes in-flow with all states shown stacked.
- **Reversibility parity & exceptions:** Scrub-linked timelines only (`scrub: true` or ≤0.6); toggle-based reveals must define `toggleActions: 'play none none reverse'`. Scrolling backward must return every state, position, and opacity exactly to its prior state. The first-session entrance video is the sole one-way exception and does not replay on reverse scroll.

