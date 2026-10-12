> [!NOTE]
> **HISTORICAL REFERENCE ONLY — NOT ACTIVE PROJECT AUTHORITY**
> This document is preserved for engineering provenance and historical record.
> It has been superseded by the **YCN Canonical v1.2** specification suite.
> For current active project specifications, task queues, and architecture, consult [`docs/INDEX.md`](../INDEX.md).

---

# YCN Labs — homepage implementation brief

Status: proposed design and implementation contract for the existing YCN repository. Not a new project, not a deployment report, and not a claim that every reference animation was watched.

## 1. Working location and boundaries

Continue only in `/home/ycn-labs/Desktop/Web Dev - 2026/Practice/ycnlabs`. Inspect the actual current branch and source layout before changing files. The supplied migration report recorded branch `site-v2` and a single Next.js app at the original repository root; that is historical evidence, not fresh verification.

Do not create a repository, run a new application scaffold, copy the v2 folder again, change the framework, repeat the migration, delete old folders or rewrite history. Keep the current contact subsystem, databases, validation, email, rate limiting, service routes, legal pages and deployment configuration outside this presentation task. Retain the approved code and update its presentation in place.

The owner's new cinematic brief replaces the previous decision to postpone the entrance film and use a mostly static homepage. It does not authorise pushes, production deployment, deletion, live test submissions, broader business claims or backend changes. Use existing commit permissions.

This file is a transfer brief. Fold accepted design decisions into the existing active design specification, and keep the task pointer in the current PROJECT.md. Do not introduce another competing master or another numbered website version.

## 2. Reference review: actual evidence and limits

All seven requested URLs were opened with a web text reader. A live Chromium visit was attempted for each, but each failed with ERR_BLOCKED_BY_ADMINISTRATOR in this environment. A Frontify desktop-menu screenshot published by Navbar Gallery was visually inspected. Other image requests were incomplete. Live transitions, timings, mobile movement and the exact EDH fourth section have NOT been independently verified here.

Reference | Evidence available | Intended application
---|---|---
Fourmula — https://fourmula.ai/ | Page content; Navbar Gallery classifies its navigation as full-screen. Live motion not observed. | Restrained menu expansion; one clear navigation hierarchy.
EDH — https://www.edhseries.com/ | Page content and image references for an animated series. Exact fourth section not established. | Study the owner's requested menu/section transition, not its cartoon artwork or playful identity.
Frontify — https://www.frontify.com/en?ref=navbar.gallery | Page content includes media search; gallery screenshot shows compact light navigation panels over photography. Photo-transfer motion not observed. | A local needs finder and continuity of the same photograph across sections.
Kalstore — https://kal-store.com/?ref=navbar.gallery | Page content and gallery mega-menu classification. Movement not observed. | Refined navigation opening/closing, not shopping functionality.
Honda — https://global.honda/jp/wingmark/ | Wing-mark history with dated visual entries. Scroll/idle behaviour comes from the owner's description. | Visual chapters with manual navigation and a controlled optional idle slideshow.
Celsior — https://celsiortech.com/ | How We Do It and One Engineering Platform/50+ Enterprise Partners are present in retrieved content. The moving compositions were not watched. | A stable process stage and readable request movement; no borrowed partner logos, numbers or claims.
BudgetDev — https://www.budgetdev.in/ | Results / Performance Overview content with traffic figures. The live chart animation was not watched. | A clean results-display format; only genuine supplied data may become results.

AGY reference capture is part of implementation preparation, not a separate open-ended research project. Capture desktop and mobile views, menu open/close, and the requested scroll/idle interactions. Identify EDH's fourth section by its heading and screenshot, not an assumed count. Keep source URL, viewport and capture date. A blocked site remains unverified. Do not bypass access controls or invent observations.

## 3. One design language

Internal concept: A customer action becomes organised business work.

Keep the complete official YCN PNG mark, including orbital artwork. Do not substitute the simplified primary SVG or regenerate the logo. Use the existing Geist/Geist Mono setup. Retain the existing white/near-black/cool-neutral palette, with restrained action blue and signal cyan. Choose accessible resolved text colours rather than treating every brand colour as a text colour.

Use large, calm compositions; real people and real devices; readable HTML interface examples; useful close-ups; hairline dividers; modest corner radii and quiet shadowing. Do not introduce purple gradients, gold luxury ornament, neon environments, particles, noisy grids, cartoon people, fake teams or cursor tricks. Do not copy another site's artwork, logo, wording or page layout.

A photo carries the human subject. An enlarged interface close-up carries readable detail. A thin cyan connector, where needed, carries one identifiable sample request. Not every space needs a card.

Keep the H1: Websites and software. Built around your business.
Proposed support: Help customers find you, ask, book or buy. Keep the work behind it organised.
Primary CTA: Tell us what you need.
Secondary CTA: See what we build.
Keep CTA routes matched to the real application.

## 4. Entrance and navbar

### Desired sequence

ELIGIBILITY -> FILM -> LOGO_HOLD -> LOGO_TO_NAV -> NAV_REVEAL -> HERO_REVEAL -> HOME_ACTIVE.
Any error or explicit bypass -> HOME_ACTIVE.

FILM uses the existing selected 10-second portrait or landscape export. Select by initial orientation; assign only one video source after checking eligibility. Do not mount two hidden videos. Muted inline playback is attempted; sound needs an explicit user control. A rejected play promise must offer Play/Continue and must not leave a dead page.

At video end, hold a decoded image of the official logo without a black flash. Validate the last frame against the intended PNG for size, position, aspect ratio, background, colour and unwanted tagline/watermark. Historical measurements are not safe to hardcode for new files. Keep source originals and create web derivatives; use properly permitted exports and do not fabricate licence clearance.

LOGO_HOLD is a viewport-filling stage, not a stretched logo. Contain the complete artwork within safe margins and show a restrained Scroll to explore control. Also allow a keyboard-operable Enter site / Skip intro action. Controls are the explicit usability exception to a logo-only visual.

Use 100dvh for the visible stage with a fallback, and safe-area padding. Measure the actual viewport and logo destination. Do not force a fixed desktop canvas onto phones.

LOGO_TO_NAV uses a decorative presentation copy. The real navbar logo keeps a stable DOM position and is the final owner. Use one scale and translation path, not repeated width/height layout animation. Read the starting and destination rectangles after font/image readiness and on relevant size changes; preserve current progress when recalculating. Crossfade only at matching geometry.

Proposed normalized scroll sequence within a bounded entrance handoff:
- 0.00–0.70: logo moves and scales from the full-screen composition.
- 0.70–0.80: presentation logo and actual navbar logo exchange visibility at the same position.
- 0.80–0.90: navbar items enter a small distance from above, with a short stagger.
- 0.90–1.00: hero composition reveals; subtle media unblur, readable text.
These are proposed choreography ranges, not timings observed on a reference site.

Use direct scroll progress for this sequence. With scrolling stopped, the logo and reveal progress stop. Reverse scrolling reverses the handoff without replaying the video. A fast scroll may advance straight to the correct state; do not force visitors to wait for every beat. Do not hijack wheel, touch or keyboard scrolling.

If a visitor scrolls during the film, stop the film and continue into the handoff from the actual document position. Never reset their scroll to force watching.

Fresh document entry at the top of `/` is eligible. Internal navigation, browser-back restoration, nonzero restored scroll and direct hash targets bypass the entrance. A refresh at the top of `/` may replay it, matching the existing owner requirement. Keep the visited flag in memory across client navigation, not localStorage or sessionStorage.

### Navbar

Desktop: original logo; What we build; Our work; How we work; About; Talk to us; existing theme control and a motion control where appropriate.

Use one compact, stable bar. Menu changes are short translations/fades, not elastic bouncing or a navbar that hides whenever the owner reaches for it. Desktop service disclosure has four broad destinations with one-line explanations. On mobile, a clearly labelled Menu control opens a simple panel; Escape closes it, focus returns to its trigger, and link activation closes it. No hover-only content.

### Content and fallback distinction

The cinematic presentation may wait for scrolling; meaningful HTML must not wait to exist. Server-render headings, links and useful static content. Do not use a page-wide `if (!hasScrolled) return null`.

Progressive enhancement defaults to the readable site. Do not install a blocking layer late over content the visitor has already started using. If early enhancement cannot start cleanly, use the static experience. A controller error or media failure releases the presentation cover. A startup/stall watchdog must be finite; the logo hold itself may wait indefinitely while Enter site remains available.

No JavaScript, reduced motion, Save-Data and forced-colours paths bypass the decorative entrance. Do not download the film or heavy animation runtime for these paths when the relevant preference is available before loading. No invisible focusable links behind an opaque layer: keyboard use of navigation or bypass reveals the normal site. Decorative clones must be aria-hidden and have no duplicate meaningful IDs.

The 10-second brand sequence has a genuine delay and transfer cost. SSR does not erase that. Report the cost rather than gaming a performance score with an early logo paint.

## 5. Six business sections after the entrance

### S1 — See what YCN helps you do

The headline and contact actions stay fixed while a large visual stage carries three related chapters:
1. See what is on offer: customer and phone; a clear listing/sample offering.
2. Take the next step: that phone shows a local price/question/time request.
3. Give work a next step: the same request appears on the business screen.

Use real photographs with an HTML close-up at a readable size. Do not imply that stock subjects are YCN staff or customers. Keep one concise illustrative-example label.

As the visitor exits the hero, a decorative copy of the selected photograph/media frame moves into the next section's visual stage. The destination is already present and reserved in layout. Do not move the actual video node or a focused interface control across parents. On mobile, use a short continuity crossfade between full-width frames instead of tiny travelling content.

The Honda-style idle behaviour belongs only to this stage, never the logo hold or the whole document. Implement distinct modes: idle autoplay, user-controlled, paused, offscreen. Start from the first chapter; after a proposed 6-second idle dwell, advance one visual chapter. Pause on focus/hover, stop after explicit manual choice until Play is chosen, and stop offscreen/hidden/reduced-motion. Provide Previous, Next and Pause/Play controls. Never move the document scroll from an idle timer. Scroll ownership and autoplay ownership must not compete over the same playhead. When manual input takes ownership, preserve the visible chapter and use it as the continuity anchor; do not jump back to a scroll-derived first frame. Recalculate the remaining chapter transitions from that anchor without programmatically moving the document.

Include a search-shaped needs finder labelled What would you like to make easier? This is YCN's local service finder, not Google Search and not an AI chat assistant. Visible preset buttons avoid requiring typing. Typed input matches a small local keyword map. Show a useful destination or Not sure yet / Talk to us; do not invent unsupported capabilities. Do not transmit or persist queries, put them in shareable URLs, or send them to analytics.

### S2 — What would you like to make easier?

Six options:
- Help customers find me — Show what you offer and how to reach you.
- Let customers ask — Give questions a clear place to arrive.
- Let them choose a time — Show times and request a booking.
- Take orders online — Show items and keep order details together.
- Let them ask for a price — Collect the details needed for a quote.
- Keep my team organised — Give each task a person and next step.

Use a product-display composition: selectable options plus one large shared demo stage. These are examples of software YCN can build, not six finished products being sold. Map options to the four existing service families: websites; enquiries/bookings/orders; business systems; software products.

Each selection updates one local example and its business-side result. A send/try button starts an explicit sample state transition; Reset restores that example. No network requests, fake payments, real appointments or unsolicited contact. Motion moves the selected request or highlights its destination, not all cards at once.

On phones, use a readable two-column choice layout where it fits, a full-width selected demonstration below, and labels that do not rely on colour alone. Reserve the demo height, avoid jumping focus and retain normal keyboard operation.

### S3 — You know your business. We build around it.

Celsior-inspired stable stage: the frame stays consistent; the contents advance through five steps:
1. Talk — Tell us what you want to make easier.
2. Plan — Agree what it needs to do.
3. See the design — Review the screens before we build.
4. Build and check — Try the important tasks on phones and computers.
5. Launch and hand over — Get access and learn how to use it.

A notebook/photo becomes a simple flow, then an interface, then a checked interaction, then a handover view. On wide screens use a modest sticky composition with clickable step navigation and scroll-derived active state. On short/mobile/zoomed viewports use normal vertical steps, not a long pinned sequence.

Include restrained expandable explanations: Built for phones; Clear to use; Keep track of requests; Care with your information. Write these as design/engineering practices, not absolute achieved guarantees. Link genuine technical detail to the existing deeper destination. Ongoing support remains agreed scope.

### S4 — See what changes in everyday work

Keep the crisp chart-like visual the owner requested, but distinguish results from illustrations.

With actual authorised data: chart the real values with measure, units, dates, baseline, method/source and relevant qualifications. Do not convert a correlation into proof that YCN caused a gain. Include a text/table alternative and animate drawing only, not fabricated live readings.

Without such data, the initial component is a clearly labelled process illustration: scattered request sources -> one request list -> assigned next steps. Use a diagrammatic line and state markers; no sales axes, percent increases, invented monthly users, climbing revenue curve or implied customer result. The caption is Example workflow — not measured business results.

Use a type/data contract that prevents a demo from being rendered as a result. Later real datasets can reuse the same visual frame. Do not copy BudgetDev's numbers or promise business growth from an illustrative graph.

### S5 — From their request to your next step

Use the owner's Celsior network reference as a relationship idea, not a partner wall.

Customer actions on one side -> your business in the centre -> the next step on the other side. Use readable request, time, order and task symbols plus short labels. A small request token travels along one path, then docks in the same request record used earlier. A local button lets visitors follow that path. Pause at the completed state; no perpetual stream of imaginary traffic.

Desktop uses a broad horizontal composition; mobile uses a vertical path. SVG draws the connection, HTML supplies the labels. No WebGL or particle field is necessary. Do not display third-party partner logos or a partner count without actual permission and evidence.

### S6 — Work, answers, contact

Show the two existing work examples with their actual classification, implementation stage and verification limits. Source screenshots where real; do not make a design study appear shipped. Avoid fake before/after stock photographs.

FAQ keeps buyer questions: not sure what I need; improve existing website; retain spreadsheets/WhatsApp where appropriate; cost; ownership; after-launch support. Use neutral approved commercial wording. Native details/summary or an equally accessible accordion is sufficient; animate chevron and disclosure gently. No free-running background motion here.

Close with Tell us what you want to improve and a direct contact route. Retain the actual form contract and privacy protections. The form never depends on watching a story or playing a film. Footer: neutral YCN company description, approved routes, credits and legal links.

## 6. Implementation architecture

Reuse actual existing components; the following are responsibilities, not instructions to duplicate similarly named files.

- app/page.tsx: server-rendered composition, content, headings, static media slots, real links.
- Existing Header/Footer: stable accessible shell and route navigation.
- EntranceExperience client island: video lifecycle, orientation choice, logo presentation copy, bypass and handoff state.
- HeroStoryboard client island: current visual chapter, idle/manual mode and photo continuity.
- NeedsFinder client island: local keywords and plain preset choices.
- Existing UniversalActions: local example selection and sample result.
- Existing HowWeWork: shared process stages and responsive sticky enhancement.
- BusinessChanges: typed verified-data/illustrative-diagram rendering.
- Existing HowItConnects: shared request-path demonstration.
- Existing BuyerFAQ and contact entry: native interactions and existing protected contact.
- HomeMotion client controller: scoped GSAP setup/cleanup; no page-wide client conversion.
- content/homepage.ts: the one source for need IDs, sample content, stage labels, routes, media metadata and truth labels.

Use existing Next.js, TypeScript and styling. GSAP plus ScrollTrigger is the proposed scroll runtime; load it only in the eligible homepage enhancement path. Use CSS for ordinary buttons and disclosure. Retain existing Motion components where already useful, but never let GSAP and Motion both own an element's transform. No second scroll-smoothing library, no Three.js, no Spline, no animation network requests.

Use direct `scrub: true` where stopping scroll must stop progress. Numeric scrub has catch-up motion and is not the requested behaviour there. Use scoped matchMedia/context cleanup, kill owned triggers/timers/observers on route exit and preference changes, and never kill unrelated global animations. Use stable outer trigger geometry with animated children. No nested pinning.

Maintain a small home-only state model for selectedNeed and sampleStatus. Separate that state from scroll progress and from the contact form. Do not update React state on every scroll frame. Hero and demo use one consistent sample identity; reset on changing the selected need. Each local UI action must have a real visible result, not a fake success toast.

Define chart content as a discriminated union:
- kind: illustrative-process; fixed explanatory stages; no results/metrics fields.
- kind: verified-result; actual values, unit, dates, source, methodology, permission/status.
Reject an incomplete verified-result configuration rather than filling it with invented values.

Do not insert a chatbot, account system, checkout, CMS, chart library, new database or real-time infrastructure merely for the homepage.

## 7. Media and performance targets

These are proposed budgets, not measured current performance:
- One intro source requested, never both orientations.
- Portrait intro target <=2 MB; landscape <=3 MB if acceptable image quality survives. Report actual duration/bytes and any exception.
- Hero poster target <=150 KB; meaningful responsive photos normally <=200 KB for the delivered size.
- Initial route transfer excluding an explicitly reported intro: aim <=1 MB, then measure and tune.
- Incremental homepage motion JS: aim <=100 KiB gzip; measure the production output, not a claim about library size.
- One video actively decoding at a time. Pause offscreen and hidden tabs. Do not preload all clips during the intro.
- No WebGL/HDR download in this implementation.

Fixed image dimensions, responsive sizes and lazy below-fold media. Keep primary text out of expensive blur filters; animate a small media layer for the requested unblur treatment, and offer a static mobile fallback. Do not schedule a second hero video while the intro is decoding.

Report actual LCP element and layout shift on both the normal entrance and bypass path. An early logo paint is not proof that the useful offer was visible. Also report observed time to usable navigation/offer. Do not advertise Lighthouse/field results on the homepage without their own dated evidence.

## 8. Verification and implementation sequence

1. In the original repository, establish the current source/branch, reproducible dependency installation and existing protected tests. The last supplied log ended with install failure; do not assume it still fails or that a later report already fixes it. Preserve current work. No monorepo conversion or migration replay.
2. Capture requested references in AGY's working browser. Resolve exact EDH fourth section from visual evidence. Check the two actual entrance files and official logo derivatives. Do not regenerate videos merely because the filenames are unfamiliar.
3. Implement the entire page composition in place, then the entrance/nav/hero handoff. Review one continuous desktop/mobile recording of that experience before polishing every lower interaction. No separate HTML rebuild or new website version.
4. Complete actions, stable process stage, truthful chart/diagram, request path and final sections within the same composition.
5. Run the real project's lint/type/test/build scripts and a production-like `next start` preview. Use existing tests plus focused interaction checks, not a new giant evidence framework.

Check 320/360/390/768/1024/1440 widths, landscape phone, zoom/reflow, keyboard, focus, screen-reader order, contrast, reduced motion, Save-Data, forced colours and JS disabled. Test fresh load, rejected autoplay, stalled media, skip, reverse/rapid scroll, resize during handoff, client navigation, restored scroll/hash links, hidden tabs and browser back. Prove only the selected film is fetched and no sample or search sends data. Preserve real contact tests; no live recipients or production database writes.

Final deliverables: preview source directory/branch; continuous desktop and mobile screen recordings showing input and pauses; representative screenshots; command logs and actual failures; exact remaining limitations. Screenshots alone do not establish motion behaviour. Do not claim reference fidelity, performance or accessibility properties that were not tested.

No push, hosted deployment, production-setting change or cleanup without the owner's explicit approval. Keep the public website available while this presentation work is reviewed.

## 9. Primary technical sources used for this proposal

- MDN autoplay: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay
- W3C audio control: https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html
- W3C pause/stop/hide: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide
- W3C carousel animation guidance: https://www.w3.org/WAI/tutorials/carousels/animations/
- W3C reduced motion technique: https://www.w3.org/WAI/WCAG22/Techniques/css/C39
- Google Search and lazy-loaded content: https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading
- Next.js server/client composition: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js lazy loading: https://nextjs.org/docs/app/guides/lazy-loading
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP matchMedia: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
- LCP definition and measurement: https://web.dev/articles/lcp

Research date: 2026-09-17. Retrieved pages may be cached snapshots. Reference mechanics not observed in live playback are explicitly marked above. No workstation repository or production site was changed while preparing this brief.
