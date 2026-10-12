# YCN LABS — UNIFIED ENTRANCE + CINEMATIC ARCHITECTURE PLAN (FINAL v2)

> [!WARNING]
> **STATUS: PARTIALLY SUPERSEDED**
> 
> Homepage choreography, narrative structure, and any mandatory Scene-5 Three.js requirement yield to `docs/vnext/04_HOMEPAGE_EXPERIENCE_MASTER.md` and `docs/vnext/05_MOTION_AND_TRANSITION_SYSTEM.md`. Mandatory Scene-5 3D is parked; Three.js is optional and must earn a specific scene through review and performance evidence.
> 
> Non-blocking entrance, accessibility, progressive-enhancement, mobile-first, and asset-loading discipline defined in this document remain in force.

---

## 1. DECISION SET (agreed by both seats; Owner's final sign-off makes it binding)

- **D1 — YCN meaning: APPROVED.** No official public expansion; YCN Labs = the brand. Internal motion thinking only: *You → Connected → Now*. In actual animation, the concrete sequence is **request → connection → result**. The mnemonic words are NEVER shown as brand copy.
- **D2 — Taglines: APPROVED.** None on site or entrance. The 8K poster's lines are not canon.
- **D3 — Two assets: APPROVED.** 10s Veo "Continuum" brand film (marketing only) + 2.2–2.6s SVG/GSAP website entrance (code, not video).
- **D4 — Progressive enhancement, mobile-first: APPROVED.**
- **D5 — REVISED & APPROVED: NO persistent homepage-wide Three.js stage.** Desktop architecture: Scenes 0–4 = DOM + SVG + GSAP + restrained 2.5D → **Scene 5 = lazy-loaded Three.js/R3F + ScrollTrigger, fetched only as the user approaches the section** → Scenes 6–7 = DOM + SVG + GSAP, Scene 6 mirroring Scene 3. Rationale: faster opening, less stutter risk, far less complexity, and Scene 5 gains impact precisely because depth increases there.
- **D6 — APPROVED STRONGLY.** Phones never request the Three.js chunk. Not deferred — never fetched.
- **D7 — APPROVED.** Entrance never blocks the page; Hero is rendered and interactive beneath the overlay from frame one.
- **D8 — APPROVED.** Transparent official logo PNGs remain canonical. The 8K orbital poster = motion/art-direction inspiration only. No canon change.

**Process note:** architecture is now decided by design, not by a pending verdict. Owner browser review happens AFTER the §8 implementation pass, judging smoothness + feel of the shipped approach.

---

## 2. THE CONTINUUM CONCEPT (signature motion identity)

The letters are never explained; their geometry is hidden inside the customer journey, and the final logo feels **discovered, not introduced**.

- **Y — the need branches.** A customer request opens into thin possible routes (Y-shaped fork, never labeled).
- **C — the connection forms.** One route is chosen and curves into a continuity arc around the request.
- **N — the next state.** The connected path turns angular and forward-moving (diagonal N energy, never a literal giant N), resolving into a completed business state.
- **Finale — the brand was there all along.** The branch, the arc, the forward path and the nodes reorganize into the official logo composition. Not "icons fade out, logo fades in" — the journey constructs the brand.

**Locked signature motifs (only three, ever):**
1. **The Request** — recognizable enquiry/document object (the customer).
2. **The Signal** — thin cyan line, canonical `#0299C3` light / `#017596` dark (connection & movement).
3. **The Arc** — restrained curved geometry derived from the YCN identity (continuity).
No particles, cubes, orbs, gradient worlds, glow, or bloom — anywhere.

---

## 3. WEBSITE ENTRANCE — SVG/GSAP SPEC (2.2–2.6s)

Timeline (GSAP master timeline; transform/opacity/stroke-dashoffset only):
- **0–0.5s** — Customer-request symbol draws in (form outline, three field lines, status dot).
- **0.5–1.1s** — It branches into the Y-fork geometry (unlabeled).
- **1.1–1.7s** — One route becomes the connection arc; cyan signal travels it.
- **1.7–2.2s** — Forward path resolves; crossfade to the EXACT official logo (theme variant).
- **2.2–2.6s** — Logo settles into the navbar brand slot; overlay fades; Hero was live underneath throughout.

**Rules:**
- Overlay is `fixed`; page fully rendered and interactive beneath (D7). If entrance assets/JS aren't ready in ~800ms, skip silently.
- Skip button ≥44px visible immediately; **Esc also skips**; on dismissal, focus moves into the page (Hero/first landmark); the overlay never traps keyboard focus.
- Persistence: `sessionStorage.ycnEntranceSeen` = once per tab (accepted default). If Owner prefers "once per period across tabs," switch to `localStorage` with timestamp TTL (e.g., 24h) — implementation may support both behind one constant.
- `prefers-reduced-motion` → static official logo 400ms → done.
- Mobile runs the same entrance, may shorten to ~2.0s. No video download involved.
- No tagline, no mnemonic text, no acronym labels.

---

## 4. VEO 3 BRAND FILM — "YCN CONTINUUM" (10s, marketing only)

Upload the OFFICIAL transparent logo as reference. Solid `#070A11` background. 1080p+ 16:9 master (optional 9:16 re-render). Beats: 0–1.5s Need (document opens into three thin routes, brief Y geometry) → 1.5–3.2s Choice (two routes recede, signal travels the chosen one, C-arc begins) → 3.2–5.4s Connection (three simple states: received → organized → action; no cards/servers/cloud icons) → 5.4–7.3s Next (path turns angular/forward, N energy, request resolves) → 7.3–8.8s the geometries reorganize toward the brand composition → 8.8–10s exact logo (composited in post).

**Key conceptual instruction (include verbatim):**
> The animation must feel as though the YCN identity was geometrically hidden inside the customer journey from the beginning. A branching request path, a continuous connection curve, and a forward workflow trajectory gradually adopt geometric relationships inspired by the official YCN mark. Do not visibly draw or label the letters Y, C, or N as an acronym. The final official logo should feel discovered rather than introduced.

**Color/negative locks (from v1, still binding):** white/near-white strokes; cyan `#0299C3` exclusively for the travelling signal; no glow/bloom/particles/gradients/text/letterform-drawing/people; end ~95% convergence and hold; composite the real logo over the final 0.5s in post. Multiple takes; pick cleanest convergence. Produced in parallel; never blocks website development.

---

## 5. SITE ARCHITECTURE (final)

**One story, different camera per device.** request → fragmentation → stall → YCN → connection → result → CTA.

- **Universal (all devices):** complete semantic DOM story; enquiry object #YCN-8041 as DOM; IntersectionObserver staged reveals (300–450ms, transform/opacity); reduced-motion = final states.
- **Mobile/default (Tier 2):** SVG signal drawn by scroll (stroke-dashoffset); **vertical** Scene 3 stall and identical-geometry Scene 6 completion; micro-parallax (bg ~0.92×, content 1×, foreground ~1.05×; 6–24px perceived travel) in Hero, Scene 2 drift-apart, Scene 4, Scene 6; sticky mini-moments 120–150vh (native scroll, no pins); `svh/dvh`; passive listeners; no `background-attachment: fixed`; no animated blur/shadow; ≤3 concurrent animated layers; Scene 5 = vertical SVG signal through four stacked tiers, no pin, no 3D. **Three.js never fetched.**
- **Desktop (Tier 3):** Scenes 0–4 and 6–7 same DOM/SVG/GSAP language with more room; **Scene 5 only** mounts a lazy Three.js canvas (dynamic import triggered by approach — e.g., IntersectionObserver rootMargin one viewport ahead) with the system planes, spatial signal, and the single ScrollTrigger pin; canvas unmounts/disposes cleanly after the section if beneficial.
- **Detection order:** reduced-motion → Save-Data/slow network → mobile/touch viewport (<1024px or coarse pointer) → WebGL probe → (secondary hints only: deviceMemory/hardwareConcurrency) → lazy Scene-5 3D.

**Implementation cautions:**
- Bundle savings are MEASURED, not assumed — record actual per-route and chunk sizes before/after; do not quote prior numbers (e.g., "349 KB") as expected results.
- `content-visibility: auto` only on ordinary below-fold content; NEVER on the pinned Scene 5 or any element measured by ScrollTrigger/observers (it changes layout measurement timing).
- ScrollTrigger.refresh() after fonts/images load; pinned section needs deterministic height.

---

## 6. WHAT GETS REMOVED FROM CURRENT CODE
- The homepage-wide persistent `StageCanvas`/`JourneyStage` mounting (replaced by Scene-5-local lazy canvas).
- Any mobile path that initializes WebGL.
- The video-loader plan (entrance is now §3 code).
Keep: canonical copy/palette from 92835aa/3ce1b9c, Scene 3/6 mirroring, enquiry object, GSAP 3.15.0, journeyStore scroll tracking (still useful for SVG signal + progress bar), claims discipline, a11y patterns.

---

## 7. SEQUENCE
1. Owner signs off D1–D8 as written here (D5 in revised form).
2. Paste §8 to AGY — one combined implementation pass.
3. Veo Continuum film produced in parallel (non-blocking).
4. Owner browser review of the RESULT (smoothness first, then feel), on phone and desktop.
5. Roadmap resumes per YCN_HANDOFF.md: supporting pages → enquiry backend → Work → hardening → testing → release.

---

## 8. AGY TASK (paste as-is once Owner signs off)

```
AGY — OWNER AUTHORIZED: IMPLEMENT FINAL ENTRANCE + ARCHITECTURE (per
docs/YCN_UNIFIED_ENTRANCE_ARCHITECTURE_FINAL.md v2; read it first — it is
the single source of truth and supersedes prior entrance/3D plans).

One continuous pass. No per-scene gates. Local WIP commits allowed, push once.

1. ENTRANCE: Replace the current EntranceScene with the §3 SVG/GSAP
   Continuum entrance (2.2–2.6s): request draws → Y-fork branch → one
   route becomes the connection arc with travelling cyan signal →
   crossfade to EXACT official logo PNG (theme variant) → settle into
   navbar slot. Hero rendered and interactive beneath from frame one;
   skip button ≥44px + Esc skips + focus moves into page on dismissal;
   no focus trap; sessionStorage seen-flag (constant allows localStorage
   TTL variant); reduced-motion = static logo 400ms; assets not ready in
   ~800ms = skip silently. Canonical palette only. No tagline/mnemonic
   text anywhere.

2. REMOVE HOMEPAGE-WIDE 3D: Unmount the global persistent
   StageCanvas/JourneyStage. Scenes 0–4 and 6–7 are DOM + SVG + GSAP +
   restrained 2.5D on ALL devices.

3. SCENE 5 DESKTOP ONLY: Rebuild Scene 5's spatial reveal as a
   section-local, lazy Three.js canvas: dynamic import triggered only
   when a desktop-capable client approaches the section
   (IntersectionObserver, ~1 viewport rootMargin), gated by the §5
   detection order (reduced-motion / Save-Data / viewport≥1024 + fine
   pointer / WebGL probe). Single ScrollTrigger pin remains desktop-only.
   Dispose cleanly. Mobile Scene 5 = vertical SVG signal through four
   stacked tiers, no pin, no 3D.

4. MOBILE CINEMATIC PATH (Tier 2): scroll-drawn SVG signal per scene
   (stroke-dashoffset via journeyStore); VERTICAL Scene 3 stall and
   identical-geometry Scene 6 completion; micro-parallax bg 0.92× /
   content 1× / foreground 1.05× (6–24px travel) in Hero, Scene 2
   drift-apart, Scene 4, Scene 6; sticky mini-moments 120–150vh, native
   scroll; svh/dvh units; no background-attachment:fixed; no animated
   blur/shadow; ≤3 concurrent animated layers. PHONES MUST NEVER FETCH
   THE THREE.JS CHUNK — verify via network/build analysis.

5. CAUTIONS: content-visibility:auto never on pinned/observed cinematic
   sections; ScrollTrigger.refresh() after fonts/images; pinned section
   deterministic height.

6. PRESERVE: canonical copy/palette/claims (3ce1b9c state), Scene 3/6
   mirror, enquiry object #YCN-8041, a11y patterns, all routes.

7. MEASURE, DON'T ASSUME: record actual before/after homepage route JS,
   mobile-fetched JS total, and the Scene-5 lazy chunk size from real
   build output. No FPS claims without a named measurement method.

8. VALIDATE: lint / check-types / test / build all exit 0. Inspect 1440 /
   1024 / 768 / 375, light/dark, reduced motion, keyboard, no horizontal
   overflow, Scene 5 enter/exit clean, phones show no WebGL request.

9. COMMIT once: "feat(site-v2): continuum entrance and scene-scoped 3D
   architecture". Push refs/heads/site-v2:refs/heads/site-v2 only. Never
   touch main. No visual self-approval; stop for Owner browser review.
```

_End of FINAL v2. This file is the single source of truth for entrance + architecture._
