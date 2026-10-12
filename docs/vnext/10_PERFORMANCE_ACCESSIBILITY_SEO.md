# YCN Labs vNext — Performance, Accessibility & SEO

---

## 1. Performance principle

Cinematic does not mean slow.

The site should feel premium partly because it responds quickly and remains stable.

---

## 2. Targets

Targets are not public claims unless measured.

Where sufficient field data exists:
- LCP p75 ≤ 2.5s
- INP p75 ≤ 200ms
- CLS p75 ≤ 0.1

Lab:
- Lighthouse mobile ≥95 is a target on the agreed profile.

Never report these as achieved without evidence.

---

## 3. Entrance video performance

Critical requirements:
- hero/nav DOM is available underneath the overlay;
- poster available immediately;
- video does not block HTML parsing/content;
- choose mobile/desktop source intelligently;
- skip on Save-Data/reduced-motion/unsupported autoplay as appropriate;
- session flag avoids repeated 10-second cost;
- video resources released after dismissal where practical.

---

## 4. JS budget

- code-split heavy scenes;
- lazy-load below-fold advanced motion;
- no duplicate animation libraries;
- tree-shake;
- no Three.js on phones unless a future explicit decision overturns this with evidence;
- no homepage-wide canvas just because Three.js is installed.

Measure actual route chunks.

---

## 5. Images

- correct intrinsic dimensions;
- priority only for true LCP asset;
- responsive sources;
- modern formats;
- below-fold lazy loading;
- avoid layout shift.

---

## 6. Fonts

Maximum two families by default.

- preload only necessary weights;
- use `font-display` strategy;
- avoid loading every weight/style.

---

## 7. Accessibility

Must support:
- semantic headings;
- landmarks;
- visible focus;
- keyboard navigation;
- no focus trap in entrance;
- 44px-ish touch targets where practical;
- meaningful alt text;
- decorative visuals hidden from AT;
- no meaning by color alone;
- 200% zoom;
- 400% reflow;
- screen-reader-friendly forms/statuses.

WCAG 2.2 AA is a target, not a claim until verified.

---

## 8. Motion accessibility

`prefers-reduced-motion`:
- skips autoplay entrance film;
- disables large scrubbed travel;
- replaces parallax with static layout;
- keeps the phone/product states readable;
- replaces laptop portal with normal section transition;
- keeps every CTA and piece of meaning.

A "Skip experience" control should exist where choreography would otherwise delay access.

---

## 9. SEO

Every public route needs:
- unique title;
- description;
- one logical H1;
- canonical;
- OG metadata;
- crawlable text;
- sitemap/robots;
- accurate structured data only.

Do not hide the actual site message inside canvas or video.

---

## 10. Analytics/privacy

Do not send:
- free-text enquiry content;
- email/phone;
- personally identifying form values

into analytics events.

Track high-level interaction only where needed:
- CTA click;
- form step;
- successful accepted enquiry;
- error category;
- optional motion skip.

Respect consent requirements.

---

## 11. Homepage Performance & Accessibility Contract (Claude 02 §4–§5)

### Performance & LCP
- **LCP Element:** Hero H1 (variant A) — fonts preloaded (Space Grotesk 600, Inter 400/500, WOFF2, `font-display: swap`). Variant B (video): report poster paint, film bytes and LCP identity separately; target mobile LCP < 2.5 s on the skip path — measured, never claimed.
- **Homepage Route JS Budget:** Record before/after; no Three.js on the homepage unless a later ruling adds one signature moment (then desktop-only lazy per Architecture v2 §5). GSAP core + ScrollTrigger + Flip loaded after first paint.
- **Imagery Policy:** No raster imagery above the fold. Below-fold assets lazy; SVG inline ≤15 KB each.
- **Measurement Protocol:** Measure with `next start`, Lighthouse mobile profile, three runs; report raw. Targets remain targets until proven.

### Accessibility Invariants
- Real DOM text, single `<h1>`, semantic HTML landmarks, logical heading order.
- Every `<ProductObject>` state has a screen-reader text alternative.
- Decorative animations marked `aria-hidden="true"`.
- Visible focus rings in both dark and light themes.
- Complete keyboard path through nav, CTAs, FAQ details/summary, and local needs finder; skip link provided.
- Touch tap targets ≥ 44×44px.
- Contrast strictly measured in rendered state (dark and light, ≥4.5:1 for body, ≥3:1 for display).
- 200% zoom and 400% reflow usable without clipping.
- Zero horizontal overflow across all verified viewports: 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920.

