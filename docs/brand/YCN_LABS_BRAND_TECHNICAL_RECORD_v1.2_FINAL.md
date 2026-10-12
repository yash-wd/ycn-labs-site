# YCN LABS — BRAND & LOGO TECHNICAL RECORD

**Version:** 1.2 FINAL
**Status:** SOLE AUTHORITATIVE DOCUMENT. Supersedes and replaces all seven prior audit, specification and governance documents listed in §2.
**Measured:** 2026-08-17
**Scope:** complete end-to-end technical specification of the YCN Labs logo assets — file identity, colour, geometry, resolution, accessibility, metadata, provenance, retention, and remediation.
**Colour space:** sRGB assumed. No ICC profile is embedded in any file.

**New in v1.2:** a consolidated usage rulebook (§15), project file naming (§16), and a decision framework with computed candidate values for choosing your permanent flat palette (§14). Two structural improvements were adopted from a competing specification document; see §2.

> **Rule of this document.** Values marked **MEASURED** were read from file bytes or pixels. Values marked **UNVERIFIABLE** cannot be established from a raster file and must never be published as fact. Where any other document, spec sheet, or memory disagrees, the measurement governs.

---

## 1. THE THREE-LINE SUMMARY

1. Your master is **`YCN_LABS_logo_8K.png`** — 7680 × 7680, RGB, no alpha, 300 DPI metadata, SHA-256 beginning `ca90462d`.
2. Its published palette is **wrong**, its background is **not transparent**, and its real optical detail is **≈1254 px** on a 7680 px grid.
3. **Keep this document and three image files. Everything else can be deleted** — with one correction to what you assumed (see §3).

What to do this week: read §15 (the usage rulebook), delete what §2 and §4 list, then start the §14 palette decision. Everything else is reference.

---

## 2. DOCUMENT RETENTION — FINAL DECISION

Five documents now exist. This is the closing decision on all of them.

| Document | Verdict | Action |
|---|---|---|
| **THIS FILE** — `YCN_LABS_BRAND_TECHNICAL_RECORD_v1.2_FINAL.md` | complete and self-contained | **KEEP — the only document you need** |
| `YCN_LABS_LOGO_TECHNICAL_SPEC_FINAL.md` | **no errors** — all 56 hex codes and 20 numeric claims verified against measurement. But a strict subset: omits both light-theme colour and the evidence chain | **DELETE** — its two best sections adopted here as §15 and §16 |
| `YCN_LABS_BRAND_TECHNICAL_RECORD_v1_1_FINAL.md` | correct, superseded by v1.2 | **DELETE** — fully absorbed here |
| `YCN_LABS_LOGO_TECHNICAL_SPEC.md` | correct, but an earlier draft of this file | **DELETE** — fully absorbed here |
| `YCN_LABS_BRAND_TECHNICAL_RECORD_v1_0_FINAL.md` | correct, superseded | **DELETE** — fully absorbed here |
| `YCN_LABS_FINAL_MASTER_ASSET_GOVERNANCE.md` | correct conclusions, second-hand evidence | **DELETE** — its §1–§9 are absorbed here |
| `YCN_LABS_Final_Logo_Technical_Audit.md` | describes a 2048 px resized copy, not your master | **DELETE** (or archive if you want the audit trail) |
| `YCN_LABS_Final_Logo_Technical_Specification_Pixel_Audit.md` | same — describes the resized copy | **DELETE** (or archive) |

**Why `YCN_LABS_LOGO_TECHNICAL_SPEC_FINAL.md` is not the file to keep — MEASURED, not opinion.** Every hex code (56) and numeric claim (20) in it was extracted and cross-checked against the measurements in this record. **Result: zero values appear in it that are not already here.** It contains no errors and no fabrication; it is an accurate, well-written abridgement. It is also a **strict subset** — it omits all light-theme colour (`#FEFEFE`, `#172E49`, `#059FF2`, `#02B7F5`, `#727378`), the light-theme contrast failures, the measured proof that the light artwork is a different drawing (§3), the evidence chain behind the master hash, the self-verification command, the exact-match counts behind the retired palette, the hashes of the other two files, and the site-token conflict. Deleting this record to keep that one loses information. Deleting that one to keep this record loses nothing.

**Two things adopted from it, with credit.** Its usage rulebook and its project file naming were better structured than the v1.1 equivalents and are incorporated here as **§15** and **§16**. Its retention advice to discard the light artwork is **not** adopted — see §3 for the measurement that contradicts it.

**Why the governance document is not needed.** It correctly identified your master and correctly archived the two 2048 audits. But it reached that conclusion by accepting a hash prefix reported to it, and it asked for two things to be added before the record could be trusted: the full SHA-256, and the C2PA provenance note. Both are already present here — full hashes in §17, provenance in §11. It also lists `YCN_LABS_Same_Image_8K_Lossless.png`, a file that does not exist in your set. Nothing in it is missing from this document.

**Why the two 2048 audits are wrong about your file — MEASURED.** They claim your master is 2048 × 2048, RGBA, with no DPI metadata. Byte-level read of your file:

```
IHDR:  7680 x 7680   bitdepth=8   colortype=2 (RGB)   interlace=0
pHYs:  11811 x 11811 per metre  ->  299.9994 DPI
chunks: IHDR, pHYs, IDAT, IEND
```

PNG colour type 2 has three channels and **no alpha channel at all** — so "RGBA, alpha = 255" is not a description of your file. Across all nine images, the four small files hash identically in both sessions and **every large file differs**, which is the signature of an upload size cap, not of a different original. Reducing your master to 2048 px reproduces their statistics: 84,965 unique colours against their 86,090; `#000105` at 11.66 % against their 10.91 %; identical top-five background values. Their numbers come out of your file shrunk.

**Verify it yourself in ten seconds — trust no AI on this:**

```bash
# macOS / Linux
shasum -a 256 YCN_LABS_logo_8K.png
python3 -c "from PIL import Image; im=Image.open('YCN_LABS_logo_8K.png'); print(im.size, im.mode, im.info.get('dpi'))"
```
```powershell
# Windows
Get-FileHash .\YCN_LABS_logo_8K.png -Algorithm SHA256
```

Expect `7680 7680`, mode `RGB`, dpi `(299.9994, 299.9994)`, hash starting `ca90462d`. If you get `2048 2048` and `b67bab23`, you are holding the reduced copy — re-download your original before doing anything else.

---

## 3. CORRECTION — THE LIGHT AND DARK LOGOS ARE NOT THE SAME ARTWORK

You said the 8K logo is your final logo and that light and dark "remain the same". **The pixels say otherwise, and this is the one place where deleting the wrong file would cost you something real.**

MEASURED comparison of the two 8K masters at matched scale:

| Test | Result | Meaning |
|---|---|---|
| Ink-shape overlap (IoU of ink masks) | **17.1 %** | different geometry, not a recolour |
| Dark vs inverted light, mean abs difference | 14.65 / 255 | similar *composition*, different *drawing* |
| Artwork bounding box | dark **5620 × 5512** · light **5216 × 4932** | light is 404 px narrower, 580 px shorter |
| Internal gap, mark → tagline | dark **600 px** · light **884 px** | different internal spacing |
| Ink pixel count at matched scale | dark 5,007 · light 3,823 | light artwork is measurably lighter-weight |

These are **two separate renders of the same concept**, not one logo on two backgrounds. If you delete the light master you cannot reproduce it by inverting the dark one — the arcs, node positions, glyph weight and spacing all differ.

**This matters directly to your website.** Your project runs `next-themes` with light and dark modes. A dark-background logo placed on your light theme will show a black box, and inverting the dark logo will not give you the light artwork. **Keep both.**

**Naming decision to make:** your dark master is the primary. Call it that explicitly, and call the light one the light-theme variant — not a second final logo. One primary, one variant.

---

## 4. IMAGE RETENTION — FINAL DECISION

Duplicate detection by SHA-256; near-duplicate detection by normalised mean absolute pixel difference at 256 px (below ~1.0 = same artwork re-encoded).

### KEEP — three files

| File | Measured | Role |
|---|---|---|
| `YCN_LABS_logo_8K.png` | 7680², RGB, 300 DPI, 8,794,933 B | **PRIMARY MASTER — dark** |
| `YCN_LABS_Light_Mode_8K.png` | 7680², RGB, 300 DPI, 4,540,145 B | **LIGHT-THEME VARIANT MASTER** — see §3, do not delete |
| `file_00000000f8a88208af3ca8281c8bec2c.png` | 1536 × 1024, RGB | **only record of the horizontal, icon/app and monochrome lockups.** Differs from every other sheet by 23.62 — not a duplicate. Reference only; its palette is wrong |

### DELETE — six files, no information loss

| File | Measured reason |
|---|---|
| `file_000000005ea08211a3de1bdad6471bf4.png` | **byte-identical** to the dark spec sheet, SHA-256 `998fae1f…` |
| `IMG-20260815-WA0017.jpg` | differs from the light master by **0.40** — same artwork, JPEG-degraded, 73× smaller |
| `IMG-20260815-WA0018.jpg` | differs from the light brand sheet by **0.65** — same artwork, JPEG-degraded, 97× smaller |
| `IMG-20260815-WA0019.jpg` | cropped, letterboxed derivative of the light master |
| `YCN_LABS_Light_Mode_Brand_Identity_8K.png` | spec sheet whose palette contradicts its own printed swatches (§8.3). Delete unless you want the layout as reference |
| `ChatGPT_Image_Aug_17__2026__06_20_00_PM.png` | dark spec sheet, palette does not match the artwork. Delete unless you want the layout as reference |

The last two are your call. They are **not specifications** — they are pictures of a brand with wrong numbers printed on them. If you keep either, label the folder `REFERENCE_ONLY_NOT_SPECIFICATION` so nobody reads a hex code off them in six months.

### Resulting structure

```text
YCN_LABS_BRAND/
├── 01_MASTERS/
│   ├── YCN_LABS_Primary_Dark_RGB_7680.png     (ca90462d…)
│   └── YCN_LABS_Light_Variant_RGB_7680.png    (5a3a38f6…)
├── 02_VECTOR/                                  (empty — see §12 R-1)
├── 03_DOCUMENTATION/
│   └── YCN_LABS_BRAND_TECHNICAL_RECORD_v1.2_FINAL.md
└── 04_REFERENCE_ONLY_NOT_SPECIFICATION/
    └── YCN_LABS_lockup_variations_1536x1024.png
```

---

## 5. MASTER FILE SPECIFICATION — MEASURED

| Property | Primary (dark) | Light variant |
|---|---|---|
| Pixel dimensions | 7680 × 7680 | 7680 × 7680 |
| Aspect ratio | 1:1 | 1:1 |
| PNG colour type | 2 (RGB), 8 bit/channel | 2 (RGB), 8 bit/channel |
| **Alpha channel** | **none** | **none** |
| **Transparency** | **none — opaque fill** | **none — opaque fill** |
| `pHYs` / DPI | present, 299.9994 | present, 299.9994 |
| ICC profile | **none** | **none** |
| EXIF / text / C2PA | none | none |
| Interlacing | non-interlaced | non-interlaced |
| File size | 8,794,933 B (8.39 MiB) | 4,540,145 B (4.33 MiB) |
| Unique RGB triplets | **375,219** | — |
| Background fill | `#000105` (11.734 % of frame) | `#FEFEFE` |
| SHA-256 | `ca90462d827c4ce074c5dc2fd892c5e180b51a8f9e4470c4b6c158afeb92b183` | `5a3a38f6120b2399218e78ffa8af90b618fc2dfed281281b429558575ed5e8c4` |

**The "PNG (Transparent Background)" claim on your spec sheets is false.** Colour type 2 files cannot carry transparency. All independent audits agree on this point and it is correct.

---

## 6. RESOLUTION — THE 8K LABEL IS INTERPOLATION

Method: take a 2048 px crop of the densest region at full resolution, downscale by a factor, upscale back with the same filter, measure error against the original. Real detail cannot be discarded without a large error.

| Reconstructed from (full-frame equivalent) | Mean abs error /255 | p99 | Max |
|---|---|---|---|
| 960 px | 1.201 | 20 | 79 |
| **1254 px** | **0.540** | **9** | **64** |
| 1600 px | 0.352 | 5 | 52 |
| 1920 px | 0.282 | 4 | 44 |
| 3840 px | 0.141 | 2 | 11 |

**True optical detail ≈ 1254 px.** Rebuilding the entire 7680 px image from a 1254 px version reproduces it to an average of 0.54/255 per channel — visually identical. This matches the generation history: a ~1254 px render enlarged with LANCZOS plus an unsharp mask, saved at 300 DPI.

**Rules that follow — do not get these wrong in a print order or a client quote:**

- 7680 px at 300 DPI *implies* 25.6 in. The detail supports **≈ 4.2 in** (1254 ÷ 300).
- Never send this file to a large-format printer as a master.
- Honest wording: **"1254 px of real detail delivered on a 7680 px grid."**
- DPI metadata adds no detail. Pixel dimensions govern digital use; DPI only maps pixels to physical size.
- Do not upscale further. Enlarging an upscale compounds the softness.

---

## 7. GEOMETRY — MEASURED

| Metric | Primary (dark) | Light variant |
|---|---|---|
| Artwork bounding box | x 1140–6760, y 1088–6600 → **5620 × 5512** | x 1364–6580, y 1464–6396 → **5216 × 4932** |
| Mark + wordmark block | 5620 × 4580 | 5216 × 3880 |
| Tagline block | 4816 × 548 | 4668 × 568 |
| Clear gap, mark → tagline | 600 px | 884 px |
| Margins L / R / T / B | 1140 / 920 / 1088 / 1080 | 1364 / 1100 / 1464 / 1284 |

**Two defects:**

- **Off-centre lockup.** The primary's left margin exceeds its right by **220 px — 23.9 % asymmetry**. Any mechanical centring — favicon, app icon, letterhead, social avatar — will sit visibly right of centre. Crop deliberately, do not centre automatically.
- **Variants not registered.** See §3. Swapping one for the other in a fixed layout moves the mark.

---

## 8. AUTHORITATIVE PALETTE — MEASURED, USE THIS

Derived by k-means on ink pixels with the background masked out, then confirmed per element by eroding each shape 7–25 px inward so glow and anti-aliasing are excluded and only the true fill contributes. Median governs.

**Both themes are specified below.** These are **measured, not authored** values — see §14.1 for why that distinction matters and what to do about it before the vector master is commissioned.

### 8.1 Dark theme

```css
--ycn-bg-dark:       #000105;  /* measured background — NOT pure black       */
--ycn-white:         #F8FAFD;  /* YCN glyph body                             */
--ycn-cyan-hot:      #61F9FE;  /* arc peak highlight                         */
--ycn-cyan:          #02C1F7;  /* LABS wordmark — PRIMARY BRAND CYAN         */
--ycn-blue:          #048ADD;  /* mid arc, node dots                         */
--ycn-blue-deep:     #006BD5;  /* lower arc sweep                            */
--ycn-blue-shadow:   #08598A;  /* recessed strokes                           */
--ycn-field:         #103453;  /* dark blue glow field / network mesh         */
--ycn-grey:          #ABADAF;  /* secondary tagline                          */
--ycn-grey-dim:      #6E7276;  /* lowest-emphasis text                       */
--ycn-bullet:        #00ADE9;  /* tagline separator dots                     */
```

| Element | Median (governing) | p10 → p90 spread |
|---|---|---|
| YCN glyph | `#F8FAFD` | `#E7F1F7` → `#FEFEFF` |
| LABS glyph | `#02C1F7` | `#0097EA` → `#08E9FF` |
| Arc, upper segment | `#6EF9FD` | `#5FF2F8` → `#BAFCFF` |
| Arc, mid-left | `#3DE4FD` | `#1AC4EB` → `#CDFEFF` |
| Arc, lower sweep | `#0074D8` | `#0069CF` → `#06D0FD` |
| Tagline line 1 | `#F4F4F7` | `#A4B2B8` → `#FFFFFF` |
| Tagline line 2 | `#ABADAF` | `#7E8083` → `#C6C7C9` |
| Beam end flare core | `#FFFFFF` | cyan halo from `#0293D2` outward |
| Exact `#FFFFFF` pixels | 151,992 (0.258 % of frame) | genuinely present |

### 8.2 Light theme

```css
--ycn-bg-light:      #FEFEFE;  /* measured background — NOT pure white       */
--ycn-ink:           #172E49;  /* YCN glyph, primary text ink                */
--ycn-blue-light:    #059FF2;  /* LABS wordmark — LOGO ONLY, 2.87:1          */
--ycn-cyan-light:    #02B7F5;  /* arc cyan — DECORATIVE ONLY, 2.29:1         */
--ycn-blue-light-dk: #0087EA;  /* darkest measured stop of the LABS gradient */
--ycn-grey-light:    #727378;  /* secondary tagline, 4.69:1                  */
```

`#172E49` has the tightest spread in the entire set (`#162C46` → `#19304C`) and is the most reliable value in your identity. If you need one anchor colour, use that.

### 8.3 Gradients — measured, three-stop

```
Arc (dark):    #61F9FE  →  #18C4FE  →  #006BD5
LABS (dark):   #0097EA  →  #02C1F7  →  #08E9FF
LABS (light):  #0087EA  →  #059FF2  →  #0CB6FA
YCN metallic:  #E7F1F7  →  #F8FAFD  →  #FFFFFF (hard highlight)
Dark field:    #000105  →  #103453
```

### 8.4 Retired palettes — never publish these again

Your three spec sheets name **three mutually contradictory palettes**:

| Sheet | Calls the cyan | Calls the blue | Calls the dark |
|---|---|---|---|
| Dark spec sheet (1254 px) | `#00F0FF` / `#00B8E6` | `#0080B3` | — |
| Lockup sheet (1536 px) | `#00E6FF` | `#007BFF` | `#0D1117` |
| Light brand sheet (7680 px) | `#00F0FF` / `#00B8E6` | `#0077B8` | `#0D1B2A` |

Exhaustive search across all 58,982,400 pixels of the primary master:

| Claimed | Exact matches | Verdict |
|---|---|---|
| `#00F0FF` | 63 of 59 M | not the artwork colour |
| `#00B8E6` | **1** of 59 M | absent |
| `#0080B3` | 0 | absent |
| `#B3E5FF` | 0 | absent |
| `#A0A7B3` | 0 | absent — real grey is `#ABADAF` |
| `#FFFFFF` | 151,992 | **present** |

In the light master, `#0D1B2A` and `#6B7280` return **zero** exact matches; the real values are `#172E49` and `#727378`.

**Retire from every sheet, deck, site and contract:** `#00F0FF`, `#00E6FF`, `#00B8E6`, `#0080B3`, `#0077B8`, `#007BFF`, `#B3E5FF`, `#A0A7B3`, `#A6B0BB`, `#0D1117`, `#0D1B2A`, `#6B7280`. Keep them only if labelled "original concept reference" — never "brand palette".

**Also retire the 2048-derived values** `#02162B`, `#013161`, `#828385`, `#06C1F7`, `#03A2ED`, `#03DCF8`, `#3DE4F9`, `#FBFCFD`, `#EAF2F7`, `#B2B3B4`. They were measured competently but on a blurred copy; downscale averaging pulls every value off. They are close cousins of the correct values, not the correct values.

**The sheets contradict their own swatches.** Measured chip colour versus the hex printed beside it on the light brand sheet:

| Chip label | Actually renders as | Per-channel error |
|---|---|---|
| `#00F0FF` | `#01F0FD` | (1, 0, 2) |
| `#00B8E6` | `#01C0F6` | (1, 8, 16) |
| `#0077B8` | `#0191E2` | (1, 26, **42**) |
| `#B3E5FF` | `#9DDCFD` | (**22**, 9, 2) |
| `#0D1B2A` | `#0F2B4A` | (2, 16, **32**) |
| `#6B7280` | `#77808C` | (12, 14, 12) |

A chip cannot sit 42 levels from its own printed label in a genuine specification. This is the proof that the sheets are generated imagery, not authored specifications.

---

## 9. CHANNEL CLIPPING — MEASURED

| File | R = 255 | G = 255 | B = 255 | exact `#FFFFFF` |
|---|---|---|---|---|
| primary (dark) | 0.344 % | 0.398 % | **0.661 %** | 0.258 % |
| light variant | 27.693 % | 18.409 % | 24.476 % | 14.602 % |

In the primary master the LABS wordmark, bright arc segments, beam and several nodes contain pixels with green and/or blue **pinned at 255** — `#02FFFF`, `#09FFFF`, `#15FFFF`, `#1DFFFF`. Interior detail there is destroyed, not merely bright.

1. **Print.** These values sit outside CMYK gamut. They will shift to a duller cyan in any process print and no proof adjustment recovers the flattened interior.
2. **Correction.** Clipped regions cannot be re-graded. Fixing the cyan requires re-rendering from a master, not editing this PNG.
3. **Cause.** The unsharp mask applied during upscaling pushed already-high channels to the ceiling.

---

## 10. ACCESSIBILITY — CALCULATED FROM MEASURED COLOURS

| Pair | Ratio | AA text (4.5:1) | AA large / UI (3:1) |
|---|---|---|---|
| `#F8FAFD` on `#000105` | 19.95:1 | PASS | PASS |
| `#FFFFFF` on `#000105` | 20.86:1 | PASS | PASS |
| `#02C1F7` on `#000105` | 9.91:1 | PASS | PASS |
| `#ABADAF` on `#000105` | 9.27:1 | PASS | PASS |
| `#172E49` on `#FEFEFE` | 13.67:1 | PASS | PASS |
| `#727378` on `#FEFEFE` | 4.69:1 | PASS (narrow) | PASS |
| **`#059FF2` on `#FEFEFE`** | **2.87:1** | **FAIL** | **FAIL** |
| **`#02B7F5` on `#FEFEFE`** | **2.29:1** | **FAIL** | **FAIL** |
| `#00B8E6` on `#FFFFFF` (retired) | 2.33:1 | FAIL | FAIL |
| `#00F0FF` on `#FFFFFF` (retired) | 1.41:1 | FAIL | FAIL |

**Governing rule.** The brand cyan is fine inside the logotype — logos are exempt from WCAG 1.4.3. It becomes a defect the instant that cyan is used on a light surface for body text, links, labels, meaningful icon strokes, or focus indicators. On dark surfaces it passes comfortably at 9.91:1.

**Open decision for your website.** Your site currently locks `--brand-primary: #1e5bff` and `--brand-accent: #22d3ee`. Neither matches the measured logo colours. This is a real decision with three options and computed candidate values — **worked through in full at §14**. Do not let the two systems drift together by accident.

---

## 11. METADATA AND PROVENANCE — MEASURED

The 1254 px and 1536 px sheets carry an embedded PNG **`caBX` chunk containing a C2PA content-credentials manifest** (`urn:c2pa:d6e438c2-…`, with an embedded SVG icon and a `c2pa.assertions` block). This is machine-readable provenance recording AI generation, and it travels with the file wherever it is published.

The three 7680 px files contain **no such chunk** — only `IHDR`, `pHYs`, `IDAT`, `IEND`. The re-save during upscaling stripped it.

Decide deliberately whether you want that metadata published. Do not discover it after a client or journalist does. Note also that the absence of the chunk on the masters does not make them non-AI-generated — it means the record was removed, not that the origin changed.

---

## 12. UNVERIFIABLE — NEVER STATE AS FACT

- **Typography.** A raster carries no font metadata, no glyph outlines, no tracking values. Your sheets disagree with each other (`Exo 2` versus `Eurostile Next / Exo 2`), so at most one could be right, and the letterforms are **segmented and notched** in ways stock Exo 2 is not. Approved wording:
  - **YCN** — custom segmented geometric wordmark artwork. Not live text.
  - **LABS** — wide-tracked geometric uppercase; Exo 2 SemiBold as a *reconstruction reference only*.
  - **Taglines** — geometric uppercase supporting type; Montserrat Regular as a *reference only*.
  - Letter-spacing in px is meaningless without a stated font size. Specify in em or as a fraction of cap height.
- **CMYK equivalents.** No profile-based conversion was performed. Stating CMYK numbers without a target profile and rendering intent would be fabrication. The gamut warning in §9 derives from channel values, not from a press proof.
- **Rendered appearance.** All values here are file-internal. No display, browser or printer was measured.
- **Vector paths, gradient stop percentages, layer structure, blend modes, glow parameters.** Unrecoverable from a flattened raster.
- **Trademark, rights and clearance status** of the artwork.

---

## 13. REMEDIATION — PRIORITISED

| # | Action | Closes | Effort |
|---|---|---|---|
| **R-1** | **Commission a true vector master (SVG + PDF, optionally AI/EPS)** with separate objects for YCN outlines, LABS, arcs, nodes, network lines, taglines, and a glow-free base geometry. | transparency, resolution ceiling, clipping, gradient truth, CMYK path, editability — **every other item is patching a raster** | High, external |
| R-2 | Publish §8 and withdraw every retired palette from all sheets, decks, and the site. | wrong colours reaching print and CSS | **Low — today** |
| R-3 | Record typography per §12. | a false font spec entering your CSS | **Low — today** |
| R-4 | Delete the six images and five documents marked DELETE in §2 and §4. Keep three images and this file. | duplicate-master confusion | **Low — today** |
| R-5 | Rename masters per §4 so "primary" and "variant" are unambiguous, and stop using "8K" in filenames. | the exact identity confusion that produced five contradictory audits | Low |
| R-6 | **Work through §14 and record the palette decision with a date.** Options and computed candidates are already prepared. | uncontrolled brand drift; unusable cyan on light surfaces | Low — decision only |
| R-7 | Re-render the cyan without channel clipping, from the vector master. | §9 | Medium, after R-1 |
| R-8 | Export true-transparency PNGs at 1024 / 2048 / 4096 px plus an optically re-centred square icon crop. | §5, §7 | Low, after R-1 |
| R-9 | Embed an sRGB ICC profile in every raster deliverable. | §5 unmanaged colour | Low |
| R-10 | Re-register light and dark variants to a shared bounding box; define clear space and minimum size as a fraction of LABS cap height, not px. | §3, §7 | Medium |
| R-11 | Record the SHA-256 of every approved master and verify before use. | §2 | Low |

---

## 14. CHOOSING YOUR PERMANENT PALETTE — DECISION FRAMEWORK

**Read this before you commission the vector master, not after.** It is the most consequential open decision in this document.

### 14.1 The problem, stated honestly

The colours in §8 are **measured, not authored**. Your logo was produced by an image model from a prompt. Nobody ever chose `#02C1F7`; it emerged from rendering. So §8 answers *"what colours are in this file"* — it cannot answer *"what colours did the designer specify"*, because no such specification ever existed.

That is fine for describing the asset you have. It is **not** a foundation for a brand you intend to run for years, for three measured reasons:

1. `#02C1F7` scores **2.11:1 on white** — it fails every WCAG threshold. Unusable for text, links, labels, meaningful icons or focus rings on any light surface.
2. Parts of the cyan are channel-clipped (§9). The original values there are gone, not merely unmeasured.
3. Emergent values are awkward for suppliers. A printer, embroiderer or sign-maker wants a small set of deliberate colours with a defined CMYK and Pantone equivalent.

**The decision:** at vector-master time you either (a) reproduce the measured values exactly and accept the constraints, or (b) adopt a deliberate palette that is visually faithful but engineered to pass contrast and survive print. Option (b) is what a mature brand does. Option (a) is defensible only if you accept that the cyan can never carry text on light backgrounds.

### 14.2 Computed candidates — MEASURED

Hue and saturation held constant, brightness reduced until each contrast threshold is met. These preserve the character of the logo colour while becoming usable.

**From the logo cyan `#02C1F7`** (hue 193.2°, saturation 0.99 held):

| Candidate | On `#FFFFFF` | On `#000105` | Verdict |
|---|---|---|---|
| `#02C1F7` (measured, as-is) | **2.11:1 FAIL** | 9.91:1 PASS | logotype and dark surfaces only |
| **`#02A1CE`** | **3.00:1** | 6.95:1 | passes AA for large text, UI components, icon strokes |
| **`#0181A4`** | **4.51:1** | 4.63:1 | passes AA for body text on **both** themes — the dual-theme safe choice |
| `#01617C` | 7.01:1 | 2.98:1 | AAA on white, too dark for the dark theme |

**From the logo blue `#048ADD`** (hue 202.9°, saturation 0.98 held):

| Candidate | On `#FFFFFF` | On `#000105` | Verdict |
|---|---|---|---|
| `#048ADD` (measured, as-is) | 3.69:1 | 5.65:1 | AA large only on white |
| `#049AF7` | 3.00:1 | 6.95:1 | brighter, dark-theme leaning |
| **`#047BC5`** | **4.51:1** | 4.63:1 | body text safe on both themes |
| `#035D95` | 7.01:1 | 2.98:1 | AAA on white, weak on dark |

### 14.3 Reconciling with your existing site tokens — MEASURED

Your site currently locks these. Measured against both backgrounds:

| Token | Value | On `#FFFFFF` | On `#000105` | Note |
|---|---|---|---|---|
| `--brand-primary` | `#1e5bff` | 5.26:1 | 3.97:1 | usable both themes; a **different hue** from the logo (blue-violet vs cyan-blue) |
| `--brand-accent` | `#22d3ee` | **1.81:1 FAIL** | 11.54:1 | same problem as the logo cyan — decoration only on light |
| `--brand-secondary` | `#0e7c7b` | 5.01:1 | 4.16:1 | teal; unrelated to the logo |
| logo cyan | `#02C1F7` | **2.11:1 FAIL** | 9.91:1 | |
| logo blue | `#048ADD` | 3.69:1 | 5.65:1 | |

**Your site and your logo are currently two different colour systems.** Neither is wrong; they simply do not match, and nobody has decided which governs.

### 14.4 The three options — this is an owner decision, not a measurement

| Option | What it means | Cost | Consequence |
|---|---|---|---|
| **A — logo governs** | site tokens move toward the logo family; adopt `#0181A4` / `#047BC5` as the text-safe pair, keep `#02C1F7` as the logotype and dark-surface accent | site-wide token change, re-run accessibility on every route | one coherent identity; highest long-term value |
| **B — site governs** | keep `#1e5bff` / `#22d3ee`; the logo is treated as a separate artefact with its own palette | no code change | permanent low-grade mismatch between logo and interface; visible on every page |
| **C — deliberate reconciliation** | choose a new small palette at vector-master time, hue-anchored between the two, engineered for contrast, CMYK and Pantone | design time plus a token migration | cleanest outcome; the option a brand consultancy would recommend |

**Whichever you pick, record the decision with a date and reasoning.** An undecided palette drifts: in twelve months you will have four cyans in circulation and no way to tell which is correct.

### 14.5 The specification to hand your vector designer

When commissioning R-1, require these deliverables so this section never has to be rewritten:

- flat brand colours as **named tokens** with sRGB hex, plus a supplied CMYK conversion against a stated ICC profile, plus nearest Pantone for each
- every gradient as **explicit stops with percentages**, not a rendered approximation
- **no channel-clipped values** — every colour inside sRGB with headroom
- text-safe and decoration-only colours **labelled as such**, with measured contrast on both `#FFFFFF` and the dark surface
- clear space and minimum size expressed as a fraction of LABS cap height
- light and dark variants registered to a **shared bounding box**
- an optically centred square icon lockup as a separate artboard

---

## 15. USAGE RULEBOOK

*Structure adopted from `YCN_LABS_LOGO_TECHNICAL_SPEC_FINAL.md` §15, extended to cover both themes.*

### USE

- `YCN_LABS_logo_8K.png` with the SHA-256 in §17 as the approved **dark raster master**
- `YCN_LABS_Light_Mode_8K.png` with its SHA-256 as the approved **light-theme variant** (§3)
- the colours and gradients in §8 — and only those
- `#000105` as the surrounding background wherever the dark logo must sit seamlessly
- `#FEFEFE` as the surrounding background for the light variant
- `YCN` described as custom logo artwork, never as live text
- a deliberately re-cropped, optically centred export for any square icon (§7)
- `#02C1F7` freely on dark surfaces (9.91:1)

### DO NOT USE

- the 2048 × 2048 copy (`b67bab23…`) as a master — reject it on sight
- any JPEG or WhatsApp derivative as a design source
- any hex code from the generated specification sheets (§8.4)
- any value derived from the 2048 copy (§8.4, second list)
- `Exo 2` or `Montserrat` stated as the proven logo fonts (§12)
- `#02C1F7`, `#02B7F5`, `#059FF2` or `#22d3ee` for text, links, labels, meaningful icon strokes or focus rings **on light surfaces** — all fail WCAG (§10, §14)
- this raster for large-format print, signage, embroidery or anything above ~4.2 in (§6)
- invented CMYK values — no conversion without a target ICC profile and a proof (§12)
- mechanical centring for icon crops (§7)
- further upscaling — enlarging an upscale compounds the softness
- the dark master on a light background, or an inversion of it in place of the light variant (§3)

---

## 16. PROJECT FILE NAMING

*Structure adopted from `YCN_LABS_LOGO_TECHNICAL_SPEC_FINAL.md` §16, extended for both variants.*

Current state:

```text
YCN_LABS_BRAND/
├── logo/
│   ├── YCN_LABS_Primary_Dark_RGB_7680.png      ca90462d…
│   └── YCN_LABS_Light_Variant_RGB_7680.png     5a3a38f6…
├── reference/
│   └── YCN_LABS_lockup_variations_1536x1024.png    97e404e7…  NOT A SPECIFICATION
└── docs/
    └── YCN_LABS_BRAND_TECHNICAL_RECORD_v1.2_FINAL.md
```

After the vector master lands (R-1):

```text
YCN_LABS_BRAND/
├── vector/
│   ├── YCN_LABS_Master_Dark.svg
│   ├── YCN_LABS_Master_Light.svg
│   └── YCN_LABS_Master_Icon.svg
├── logo/
│   ├── YCN_LABS_Primary_Dark_RGB_7680.png
│   ├── YCN_LABS_Light_Variant_RGB_7680.png
│   ├── YCN_LABS_Transparent_RGB_4096.png
│   └── YCN_LABS_Icon_Square_1024.png
├── print/
│   └── YCN_LABS_Master_CMYK.pdf
└── docs/
    └── YCN_LABS_BRAND_TECHNICAL_RECORD_v2.0.md
```

**Stop using "8K" in filenames.** It is the claim that caused five contradictory audits. Name files by role and true pixel dimensions.

---

## 17. IDENTITY BLOCK — RECORD THESE HASHES

```
PRIMARY MASTER (dark), 7680x7680 RGB, 300 DPI:
  ca90462d827c4ce074c5dc2fd892c5e180b51a8f9e4470c4b6c158afeb92b183

LIGHT VARIANT MASTER, 7680x7680 RGB, 300 DPI:
  5a3a38f6120b2399218e78ffa8af90b618fc2dfed281281b429558575ed5e8c4

LOCKUP VARIATIONS REFERENCE, 1536x1024 RGB:
  97e404e7207b0200d410b669f360aa55211a685bfa00a732a896574f5b7396f0

KNOWN NON-MASTER (a 2048x2048 RGBA re-encoded copy in circulation —
reject this file if you encounter it):
  b67bab23722702bbff5dadd4fb80bee1a5b7cf42b550c84113e6a77d3c4a63fa
```

---

## 18. METHOD RECORD

- Raw PNG chunk parsing (`IHDR`, `pHYs`, `iCCP`, `caBX`) directly from file bytes, without a library interpretation layer.
- SHA-256 and MD5 over full file bytes for identity and duplicate detection.
- Exhaustive per-pixel search over all 58,982,400 pixels for palette verification; per-channel Chebyshev distance at thresholds 0, 5, 12.
- Dominant palette: k-means (k = 8, `n_init` = 6, seed 0) on a 1920 px proxy with the background luminance-masked.
- Per-element fills: full-resolution crops, luminance-masked, then eroded 7–25 px with a minimum filter so glow and anti-aliased edges are excluded. Median governs; mode and p10/p90 reported.
- Effective resolution: LANCZOS down/up round-trip on a 2048 px crop of the densest region.
- Derivative confirmation: master reduced to 2048 px via LANCZOS, BICUBIC and BILINEAR, then re-measured against the competing audits' published statistics.
- Light-versus-dark identity: ink-mask intersection-over-union and inverted-luminance difference at matched scale.
- Near-duplicate detection: normalised 256 px mean absolute difference.
- Contrast: WCAG relative-luminance formula applied to measured hex values, computed against both `#FFFFFF` and the measured dark field `#000105`.
- Candidate palette values (§14.2): hue and saturation held constant in HSV, brightness scanned in 0.001 steps to the largest value meeting each contrast threshold.
- Competing-document verification (§2): all hex codes and numeric claims extracted by regex from `YCN_LABS_LOGO_TECHNICAL_SPEC_FINAL.md` and set-differenced against this record.

Every number in this document came from one of the above. No value is estimated, inferred, or carried forward from any prior document, including my own earlier drafts.

---

## 19. CHANGE CONTROL

Version 1.2, describing the files as measured on 2026-08-17. This document becomes stale the moment a vector master exists. When R-1 lands, supersede §5–§9 and §14 from the vector source, publish as v2.0, and retain this version as the record of the raster era. Do not edit measured values in place — append a dated correction, so the audit trail survives.

---

## 20. B3c ASSET RECORD & LINEAGE ADDENDUM (2026-09-24)

### 20.1 Six-File Measured Asset Table

Measurements executed directly against asset bytes and pixels under Python PIL / SHA-256:

| File Location | Dimensions | Aspect Ratio | Color Mode | File Size | SHA-256 (Full) | Role / Status |
|---|---|---|---|---|---|---|
| `../ycn-brand-masters/masters/ycn-logo-dark-transparent-MASTER.png` | 5620 × 4580 | 1.22708 | RGBA (real alpha) | 6,894,566 bytes | `85808a7d15646a4847f75612eda95ddda09c9b51c4177f46e0b6814225a07784` | Private Master (Dark presentation source) |
| `../ycn-brand-masters/masters/ycn-logo-light-transparent-MASTER.png` | 5620 × 4580 | 1.22708 | RGBA (real alpha) | 7,470,756 bytes | `416de4b7c83a051cf9d11c3e4c88a36690b8be248ef5edb81f7a350af72b28a9` | Private Master (Light presentation source; provenance UNKNOWN) |
| `public/brand/ycn-logo-dark-transparent-448.png` | 550 × 448 | 1.22768 | RGBA | 238,626 bytes | `49ba58704e04baf56f9411c18bf092031d47a2b7a11453b01d35c9c0a81b0ada` | Production Canonical Navbar Mark (Dark) |
| `public/brand/ycn-logo-light-transparent-448.png` | 550 × 448 | 1.22768 | RGBA | 254,075 bytes | `87e5e880941ffeaf808af5c7e1232008c2955fbcc6f04aea0c6dabdb6a77340e` | Production Canonical Navbar Mark (Light) |
| `../ycn-brand-masters/Main_YCN_LABS_logo_black_8K.png` | 6675 × 5195 | 1.28489 | RGB (opaque ≈`#000104`) | 8,794,933 bytes | `0ceebe4ccf81c478b8b2b2b6674f98ccc4dc93308c8a0e053243984c3a2c2be3` | Private Alternate Render (Dark; removed from repo root) |
| `../ycn-brand-masters/Main_YCN_LABS_logo_white_8K.png` | 7680 × 4362 | 1.76066 | RGB (opaque vignette `#F1F8FC`–`#FBFCFD`) | 12,019,410 bytes | `3e3871fa8f1fe9ce73b05437f8c444c2357e82635136dd333480102151b1d87f` | Private Alternate Render (Light; removed from repo root) |

### 20.2 Proven RGBA MASTER → Canonical 448 Lineage

Deterministic PIL Lanczos downscaling (`Image.Resampling.LANCZOS`) of the private RGBA MASTERs directly to 550 × 448 produces an exact byte-for-pixel match with the canonical navbar marks:
- Maximum RGBA difference: `[0, 0, 0, 0]`
- Mean RGBA difference: `[0, 0, 0, 0]`

The navbar marks and the 2048 px presentation derivatives are therefore mathematically proven to originate from the exact same artwork render. This shared lineage is designed to preserve matched geometry and visual continuity into the navbar; final appearance remains browser-observed.

### 20.3 B3c Production Presentation Derivatives (`public/brand/`)

To support high-DPR full-screen entrance and takeover presentation without serving heavy unoptimized masters, B3c generated production derivatives from the RGBA MASTERs via deterministic PIL Lanczos downscale (target width 2048 px, height 1669 px). No alpha thresholding, synthetic alpha generation, or geometry clipping was performed:

- `public/brand/ycn-labs-full-dark.png` (2048 × 1669, RGBA, 1,720,623 bytes, SHA-256 `7b93f719bf60cf75379b8d59cffb7f9f84348deb924a4bbff3fee3d39d75de78`)
- `public/brand/ycn-labs-full-dark.webp` (2048 × 1669, RGBA lossless, 1,289,072 bytes, SHA-256 `a9191e3b320ba7a3a2e433e82f74a9c20bdff194000043950342ad4611e748f5`)
- `public/brand/ycn-labs-full-light.png` (2048 × 1669, RGBA, 1,932,649 bytes, SHA-256 `480bba869e3c0f489911dc3b2f98eb859d3c762648de7fb12ee11a9677335c89`)
- `public/brand/ycn-labs-full-light.webp` (2048 × 1669, RGBA lossless, 1,386,686 bytes, SHA-256 `7a626d28394f146848bb211b9e0dd6fa6507817dc19b44d43b946492467415fb`)

### 20.4 Asset Provenance & Optical Detail Distinctions

1. **Light MASTER Provenance:** The light RGBA MASTER dimensions (5620 × 4580) match the dark MASTER block rather than the light artwork proportions described in §7. Its historical origin remains UNKNOWN unless independently evidenced. Under Brand Record §6 round-trip testing, it exhibits higher maximum reconstruction error along the outer glow perimeter (119–152 vs ~27–87 for dark). This measurement is consistent with steeper alpha gradient transitions along high-contrast arc borders (INFERRED); the measurement does not establish historical extraction method or provenance.
2. **Optical Resolution vs Pixel Dimensions:** All candidate raster assets exist on large pixel grids (5620–7680 px), but round-trip downscale testing places their measured effective optical detail in the ≈1254–1600 px band. No current raster asset delivers true 4K/8K detail independent of scale. Commissioning a genuine vector master (R-1) remains the sole technical remedy for arbitrary resolution scaling.
3. **Status of 23 Sep Opaque Files:** The Owner-supplied opaque 8K files (`Main_YCN_LABS_logo_*_8K.png`) are catalogued as private alternate renders in `../ycn-brand-masters/`. They are not production assets, are not referenced in application code, and carry no decision naming them official.

