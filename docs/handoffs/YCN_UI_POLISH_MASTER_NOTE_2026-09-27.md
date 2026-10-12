# YCN LABS — UI POLISH MASTER NOTE · 27 Sep 2026

## Purpose
Persistent owner-directed backlog for post-entrance visual polish. Keep this outside the repo so GPT / Claude / AGY do not drop approved ideas between seats.

## Frozen / accepted
- VF19 entrance is accepted and frozen.
- Do not alter intro films, snapshot mechanism, continuity extraction, Pose A/Pose B geometry, contraction, PNG takeover, or navbar docking unless the Owner reports a regression.
- Navbar logo position/size is fixed and must not move.
- Hero text + phone synchronized reveal and zero-blur behaviour are preserved until an approved polish task changes them.

## Rejected / superseded
- POLISH-NAV-01 always-visible desktop navigation rail is rejected and superseded.
- POLISH-NAV-02 is NOT Owner-approved (superseded by POLISH-NAV-03).

## Owner Rulings — 27 Sep 2026 (INPUT-GATE-01 + POLISH-NAV-03)
### INTRO INPUT LOCK — 27 Sep
During film playback AND post-film contraction, Skip is the only mechanism that may exit/advance the entrance. Wheel, trackpad, touch scroll/swipe, Escape, arrows, PageUp/PageDown, Home/End and Space must not scroll or advance the site. Normal input unlocks only when Pose B/homepage-logo hold is established and the scroll cue is visible. Tab/Shift+Tab may be used only for accessibility to reach Skip; Enter/Space may activate Skip while it is focused.
- Escape currently implemented as disabled — NOT an Owner ruling; ESC remains PENDING (A: Esc = Skip / B: disabled).
- While locked, focus is contained to the entrance layer; Tab/Shift+Tab cycle only among entrance controls (Skip). Hidden navbar and Hero controls are inert (tabIndex -1 / inert) until unlock.

### NAVBAR — 27 Sep
Navbar visual band is transparent. Logo stays fixed left. Menu capsule + theme toggle occupy the visual centre. `Start a Project` remains always visible on the right after entrance release and never lives inside the expanded menu. Menu expands from the centre. Theme transition originates from the actual theme-toggle control position on every viewport.
- TRANSPARENT HEADER is Owner ruling 27 Sep -> DECISION at the approval path with Design System §5/§9 amendments.
- Floating controls over content: Menu, theme toggle, and CTA float directly over page content; each control's surface must carry adequate contrast (>= 4.5:1) independently of page background.
- Responsive fit safety: Collapsed-state rects at 360, 375, and 414 px must maintain >= 12 px gap between zones without shortening copy or moving the logo.

### MENU SHAPE — 27 Sep
Menu is an explicit compact-control exception to the normal 8px button radius and may use a true capsule shape (rounded-full, 44–46px height, min 44px tap target).
- MENU CAPSULE is Owner ruling 27 Sep -> DECISION at the approval path with Design System §5/§9 amendments.

## Owner Rulings — 28 Sep 2026 (POLISH-NAV-04 / POLISH-NAV-05 / POLISH-HOME-01)
- NARROW MOBILE CLUSTER — Owner 28 Sep: right-anchored below 640 px; standalone right CTA removed below 640px and canonical 'Start a Project' CTA placed inside opened mobile menu.
- HEADER BACKDROP BLUR — Owner 28 Sep: full-header backdrop blur, no border/shadow/panel; supersedes the header-only 'no frosted glass' rejection; Design System §5 amendment at the approval path. Blur must remain inert/hidden during takeover-active entrance.
- NAVBAR SITE-WIDE — Owner 28 Sep: one shared Header on every public route.
- SECTION-BY-SECTION POLISH MODE — Owner 28 Sep 2026: after accepted NAV-05, homepage development proceeds in rendered section order. Each visible section is independently inspected, refined, evidenced and Owner-reviewed before the next begins. Entrance and accepted navbar remain frozen except for Owner-reported regressions.

## Owner visual direction
### Navbar
- Keep the logo exactly as-is.
- Default header: minimal logo + Menu control; theme control may remain if it does not crowd.
- Desktop/horizontal: Menu opens a unique horizontal expansion.
- Mobile: responsive full-width/vertical menu; do not cram desktop links.
- Canonical order: Work · What We Solve · How We Work · About.
- Primary CTA: Start a Project.
- Engineering is secondary.
- Menu/Close are allowed UI chrome.
- Dark and light versions must both be designed intentionally.

### Button system
- Use the supplied FlowButton as inspiration, not a literal copy.
- Shared YCN button primitive: directional arrow choreography, controlled fill expansion, tactile press, strong focus state, theme-aware tokens.
- Prefer /components/ui if compatible with current project structure.
- Do not migrate to shadcn or add dependencies just for this effect.
- Keep canonical button copy.

### Signal / shine borders
- Use supplied ShinyButton and 21st.dev border-motion references as inspiration.
- Build one reusable YCN animated-border primitive with a moving signal/light point related to the luminous endpoint beneath the YCN LABS logo.
- Theme-aware in light and dark.
- Apply to important buttons, selected high-value cards/panels, active/focus states, key dividers and selected form controls.
- Do not continuously glow every surface. Calm by default; animate mainly on hover/focus/active or on a very small number of primary CTAs.
- Cyan is never body text.

### Theme transition
- Use the animated theme-toggle reference as inspiration.
- Prefer the View Transitions API with an accessible fallback.
- Persist theme and avoid flash on load.
- Reduced motion: instant switch or minimal fade.
- Accessible state/action label required.
- Avoid a heavy animation dependency if existing stack/browser APIs can do it.

### Border treatment site-wide
- Standardize bordered interactive surfaces around one YCN border primitive.
- Preserve design-system radii and hierarchy.
- No neon/gaming look.
- Avoid always-on animation over large card grids for performance.

### Phone / product protagonist
- Uploaded phone render is styling reference only, never a served raster asset.
- Phone remains DOM/CSS.
- After navbar + interaction primitives are approved, implement persistent Hero → Chapters 01–04 phone journey inspired by GSAP waypoint/Flip behaviour, without Three.js.
- Same phone moves between waypoints, updates content, reverses cleanly and stops after Chapter 04.
- Fine-pointer desktop: restrained cursor perspective tilt.
- Touch/reduced-motion: no tilt.

### Broader visual polish
- Improve background depth, surfaces, transitions, buttons, forms and important cards.
- Quality target: senior design-engineering work, not AI-template aesthetics.
- Avoid glass-card walls, gradient-text clichés, excessive glow, neon tubes and repetitive effects.
- Preserve canonical copy unless Owner separately rules otherwise.

## Outstanding record rulings
- BRAND: new artwork everywhere vs entrance-only/canonical elsewhere.
- TRANSPARENT EXPORT: yes/no.
- Kicker “Digital Products & Engineering”: keep/ratify vs remove.
- SIGNAL-LINE/BORDER EFFECTS: ruled by Owner 27 Sep — permitted on important controls and surfaces with the bounds in this note; supersedes the 'cyan never decorative' lock; DECISION + Design System §2/§6 amendment due at the approval path.
- HERO IMAGERY — Owner 28 Sep: illustrative editorial photographs (team-01, device-02) permitted in the Hero; no team-size, client or product claims; alt text neutral; Claims register row at the approval path.
- HERO PRODUCT OBJECT — Owner 28 Sep: Phone3D removed from the Hero; the Hero is a two-photograph editorial composition. Supersedes the Hero portion of DECISION-022/023/043 (product-in-Hero, phone departure from Hero). Chapters 01–04 keep the DOM/CSS phone (DECISION-041 unchanged). DECISION entry at the approval path.
- HERO GENERATED UI IMAGERY (DECISION-037 Scoped Exception) — Owner 28 Sep: the generated phone/laptop editorial photograph containing conceptual chats/data (`ORIGINAL-ycn-hero-device-ui-02.png`, SHA-256: `a328715ff35060cd93f2350569fac2eca49c62fc76e506baf885ac6cccc2c9bc`) is permitted as illustrative Hero imagery only. It must not be described or presented as YCN product proof, client work, or an actual deployed interface. This is a scoped exception to the generated-UI restriction for this Hero asset only; live product/evidence rules elsewhere remain unchanged. Claims register row at the approval path: Hero device image = illustrative artwork, not a YCN interface. DECISION entry due at approval path.
- Release-gate decisions remain separate.
- POLISH-TYPE-01 GLOBAL TYPOGRAPHY SYSTEM — Owner 28 Sep 2026: Approved and frozen site-wide. Role-based system: Space Grotesk (display/marketing), Inter (UI/body/controls), system monospace (technical only). Full evidence archived in `proof/polish-type-01/`. Pre/post backups in place. Typography is frozen across all routes.
- HOME-01C LIGHT-THEME IMAGE CLARITY FIX — Owner 28 Sep 2026: Resolved. `bg-gradient-to-t from-[var(--bg-canvas)]` overlay divs removed from `#hero-editorial-team-frame` and `#hero-editorial-device-frame`. Photograph pixels retain theme-invariant tonal fidelity (opacity 1, filter none, blend-mode normal across dark/light and 1440/375).
- HOME-02 CONTENT — Owner 28 Sep: previous Chapter 01–04 copy and Signal Sequence presentation are superseded for HOME-02 by the From Customer to Business four-act Relay copy. CONTENT_SPEC / decisions amended at approval path. Supersedes CONTENT_SPEC §3 Chapters 01–04 block and the Section-2 scope of DECISION-020/022/023/041/043/049; DECISION entries at the approval path. Phone3D removed from Section 2; section is rebuilt in normal document flow (no pinning, no sticky stage) with bespoke live DOM interface fragments. Checkpoint covering Opening + Acts 01–02 submitted for Owner review before Acts 03–04 are built.
- STATEMENT-01 flagged as redundant after HOME-02 content ruling; disposition handled in HOME-03.

## Execution order (Section-by-Section Map)
1. HOME-01 — Hero [accepted/frozen]
2. HOME-02 — Business First / PATHS-01 [current]
3. HOME-03 — STATEMENT-01 disposition + editorial reset
4. HOME-04 — laptop portal
5. HOME-05 — connected requests
6. HOME-06 — results / How We Work / The Turn
7. HOME-07 — Work / FAQ / needs finder / close / footer
8. Supporting pages — What We Solve, Work, How We Work, About, Engineering, Contact (incl. form focus polish), legal, 404.
*Note: Background and surface depth is applied per section, not as a separate pass. Every queued item from the note appears in exactly one section line above.
11. Full desktop/mobile + dark/light review.
12. Reduced-motion, keyboard, accessibility and performance validation.
13. Approval path / docs / commit only after Owner approval.

## Standing implementation rule
If a stronger engineering implementation achieves the Owner's visual intent while preserving approved concept, assets, content and constraints, use the stronger implementation and explain why.

## 01 Oct 2026 — Week Pause and Current State
- **Project Pause:** The Owner has paused website work for approximately one week (until ~08 Oct 2026).
- **Frozen Accepted Systems:** Entrance VF19 / INPUT-GATE-01 (frozen except open regression ENT-REG-01 below), NAV-07 global navbar (frozen), TYPE-01 global typography (frozen), HOME-01C Hero editorial composition (frozen).
- **HOME-02F Status:** Route A live-DOM checkpoint is built and technically verified (18/18 test suites passing, 280 tests, build green), but is **NOT Owner visually approved**. The Owner reported that the right-side live-DOM surfaces still feel too much like manual/table data and expressed preference for the clearer communication direction in five generated visual interface examples.
- **Reference Image Audit & DECISION-037 Status:** The five generated reference images were copied to `capability-ui-references-2026-10-01/` and independently audited (`IMAGE_REFERENCE_AUDIT.md`). Because `DECISION-037` (OWNER-FINAL) prohibits generated UI screenshots on product surfaces (with only the SHA-bound Hero exception active), **no scoped HOME-02 exception has been authorized yet**. The choice between (A) further refining the live-DOM presentation and (B) authorizing a scoped DECISION-037 exception for cleaned/regenerated images remains the primary open decision to be resolved upon resuming next week.
- **Open Regression ENT-REG-01:** Owner reported that after the intro film/logo state, the "Scroll to explore" cue is sometimes clearly visible and sometimes appears unusually faint/light. Logged as `ENT-REG-01` for a bounded regression task following HOME-02 sign-off.
- **Authoritative Pause Handoff:** Complete session state and resume instructions are recorded in `YCN_SESSION_HANDOFF_2026-10-01_PAUSE.md`.

