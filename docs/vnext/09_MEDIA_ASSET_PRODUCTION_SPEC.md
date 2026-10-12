# YCN Labs vNext — Media & Asset Production Specification

---

## 1. Asset philosophy

The new site should rely less on generic generated photography and more on:

- actual interface design;
- real DOM product screens;
- custom device shells/renders;
- verified project media;
- controlled video/motion;
- original SVG/graphic systems.

Generated imagery is not the spine of the homepage.

---

## 2. Existing entrance assets

Owner has created:
- horizontal entrance video;
- vertical entrance video.

Production needs:
- MP4/H.264 fallback;
- WebM/AV1 or VP9 when practical;
- poster image for each;
- duration metadata;
- dimensions;
- optimized versions for target breakpoints.

Suggested naming:
- `ycn-entrance-desktop.mp4`
- `ycn-entrance-desktop.webm`
- `ycn-entrance-desktop-poster.webp`
- `ycn-entrance-mobile.mp4`
- `ycn-entrance-mobile.webm`
- `ycn-entrance-mobile-poster.webp`

Do not rename the original source files destructively; export production derivatives.

---

## 3. Logo assets

Use official logo files only.

Need:
- light transparent;
- dark transparent;
- exact aspect ratio;
- optimized web derivative if needed.

Never redraw with CSS text.

---

## 4. Phone asset

Preferred:
- CSS/SVG shell or authored 3D render;
- real DOM screen;
- no baked screen copy.

Requirements:
- crisp at 2x DPR;
- no branded phone trademark details unless licensed/necessary;
- physically plausible bezel;
- consistent perspective;
- reusable across desktop/mobile.

---

## 5. Laptop asset

Preferred:
- authored shell with DOM screen;
- high-quality SVG/PNG/3D shell;
- blank/quiet initial screen;
- screen rectangle precisely known for portal transform.

If a raster/3D shell is used:
- transparent background where practical;
- enough resolution for close-up;
- no stock watermark;
- no baked UI.

---

## 6. Illustrative product UI

Build in DOM/Figma/system design.

Must be clearly illustrative if not shipped work.

Suggested states:
- customer offer/choice;
- action flow;
- request received;
- owner assigned;
- next step;
- progress/status;
- completed.

No fake brand names.
No fake customer PII.
No unreadable generated text.

---

## 7. Work/case-study media

Only publish:
- media YCN owns or can legally use;
- client media with permission;
- truthful screenshots;
- accurate stage labels.

For concept builds:
- label as Concept Build.
- do not imply it is a client project.

---

## 8. Image formats

Master:
- high-resolution lossless or high-quality source.

Web derivatives:
- AVIF where compatible/valuable;
- WebP fallback;
- responsive `srcset`;
- sensible sizes rather than serving 8K to phones.

Large full-bleed desktop images may have derivatives around:
- 1280
- 1920
- 2560
- 3200

Mobile:
- 750/828
- 1080
- 1440

Exact sizes depend on source and layout.

---

## 9. Video rules

- muted autoplay only where browser rules allow;
- `playsinline`;
- poster/fallback;
- captions if speech/meaningful audio exists;
- never make essential copy exist only inside video;
- entrance is skippable;
- below-fold videos lazy-load.

---

## 10. Generated media quality gate

If AI generation is used:
- no faces/hands unless absolutely necessary and reviewed;
- no text inside image;
- no fake UI;
- no logos;
- no impossible reflections;
- no plastic materials;
- no "luxury showroom" default;
- no oversharpened HDR;
- no cyberpunk blue;
- no generic stock scene;
- no pretending generated scene is client evidence.

Prefer real product/UI assets whenever possible.

---

## 11. Owner Asset Quality Requirement — Standing (2026-09-21)

All final YCN visual/media assets must begin from professional high-resolution masters. Still-image masters should be 4K minimum and 8K where the workflow/source benefits from it. Video masters should be produced at the highest practical native quality, normally 4K for website film.

High-resolution master quality does not permit wasteful browser delivery. Production media must use responsive derivatives, modern codecs/formats, correct dimensions, CDN transformation and lazy/preload strategy appropriate to its role.

ImageKit or an equivalent image/media CDN may be used for delivery and transformation when this materially improves quality, responsive delivery, caching or repository size.

No production asset may contain generator watermarks, unintended text, fake UI, gibberish, compression damage, obvious AI artifacts or low-resolution upscaling artifacts.

AI-generated imagery is never accepted merely because it is high resolution. Composition, material realism, anatomy/geometry, typography absence and visual authenticity must pass the Owner visual gate.

Where motion requires an object to rotate, transform, change state or reverse with scroll, prefer live DOM/CSS/SVG or an appropriate authored 3D asset over raster imagery.

The execution agent must request missing media from the Owner rather than generating substitute production assets without approval.

