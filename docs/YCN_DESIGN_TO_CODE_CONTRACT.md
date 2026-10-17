# YCN Labs — Design-to-Code Contract & Token Specifications

**Document ID:** `YCN-V2-DESIGN-CONTRACT-01`  
**Revision:** 1.0.0  
**Effective Date:** 17 October 2026  
**Status:** DRAFT / AUDITED — Prepared for Single Batch Review (GPT & Claude)  
**Governing Documents:** `docs/YCN_DESIGN_SYSTEM.md` (Rev 1.2), `app/globals.css`, `docs/BACKLOG.md` (Task 09)

---

## 1. Executive Summary & Audit Mandate

This contract establishes the formal mathematical and technical bridge between the canonical **YCN Labs Design System** (`docs/YCN_DESIGN_SYSTEM.md`) and the live code implementation across `ycn-labs-site`.

A comprehensive static and visual audit was executed across all components, global stylesheets, and five standard responsive viewports (390px, 768px, 1024px, 1280px, 1440px) under both Dark and Light themes.

### Key Audit Findings
1. **Token Precision:** `app/globals.css` largely adheres to the design system, but contains two surface elevations requiring exact alignment:
   - Light surface elevated: currently `#FFFFFF`, design system specifies `#F8FAFC`.
   - Dark surface elevated: currently `#182337`, design system specifies `#182234`.
2. **Hardcoded Hex Scans:** 65 unique hex color values were detected across `.tsx` and `.css` files. 100% of these have been classified into three distinct categories:
   - **Category A (Direct Drift):** Components using hardcoded `#0470B4`, `#0A0E17`, or ad-hoc slate colors. Must be replaced with semantic CSS variables in Task 09.
   - **Category B (Functional System Exceptions):** Demo dashboard badge states (new, complete, assigned) inside `PhoneChaptersSection.tsx`. Preserved as realistic application states.
   - **Category C (Hardware & Cinematic Frozen Exceptions):** Anodized space gray 3D laptop chassis (`#1A1E29` etc.) and entrance video background bridge tones (`#0F1216` / `#010101`). Preserved under Owner rulings.
3. **Typography Rigor:** The semantic typography classes (`.type-display-hero`, `.type-display-page`, `.type-heading-section`, `.type-heading-card`, `.type-copy-lead`, etc.) in `globals.css` are correctly structured with fluid `clamp()` math and clean font pairings (`Space Grotesk` display + `Inter` sans).
4. **Regional Metadata Drift:** `app/layout.tsx` lines 42 and 90 contain legacy UK references (`en_GB`, `addressCountry: "GB"`). Queued for India-first correction under Task 10.

---

## 2. Canonical Token Contract (Dual-Theme Specifications)

All UI elements must consume these CSS custom properties. No direct hex values may be introduced for brand, canvas, or structural surface roles.

### 2.1 Color Tokens Table

| Design System Role | Canonical Hex | CSS Custom Property | Tailwind Utility | Theme Behavior / Restrictions |
|---|---|---|---|---|
| **Canvas** (Light) | `#FFFFFF` | `--bg-canvas` | `bg-[var(--bg-canvas)]` | Main page background |
| **Canvas** (Dark) | `#0D111A` | `--bg-canvas` | `dark:bg-[var(--bg-canvas)]` | Main dark background |
| **Section** (Light) | `#F1F5F9` | `--bg-surface` | `bg-[var(--bg-surface)]` | Alternating section band |
| **Section** (Dark) | `#141C2B` | `--bg-surface` | `dark:bg-[var(--bg-surface)]` | Alternating section band |
| **Surface Raised** (Light) | `#F8FAFC` | `--bg-surface-elevated` | `bg-[var(--bg-surface-elevated)]` | Raised cards, popovers, dropdowns |
| **Surface Raised** (Dark) | `#182234` | `--bg-surface-elevated` | `dark:bg-[var(--bg-surface-elevated)]` | Raised cards, popovers, dropdowns |
| **Text Primary** (Light) | `#0A0C10` | `--text-primary` | `text-[var(--text-primary)]` | Headings, prominent copy (contrast > 15:1) |
| **Text Primary** (Dark) | `#F8FAFC` | `--text-primary` | `dark:text-[var(--text-primary)]` | Headings, prominent copy (contrast > 15:1) |
| **Text Secondary** (Light) | `#475569` | `--text-secondary` | `text-[var(--text-secondary)]` | Secondary copy, captions (contrast > 4.5:1) |
| **Text Secondary** (Dark) | `#A8B3C5` | `--text-secondary` | `dark:text-[var(--text-secondary)]` | Secondary copy, captions (contrast > 7:1) |
| **Action Fill** (Light) | `#0470B4` | `--action-blue` | `bg-[var(--action-blue)]` | Primary CTA button; text must be `#FFFFFF` |
| **Action Fill** (Dark) | `#8BD4FF` | `--action-blue` | `dark:bg-[var(--action-blue)]` | Primary CTA button; text must be `#0D111A` |
| **Action Hover** (Light) | `#035B94` | `--action-blue-hover` | `hover:bg-[var(--action-blue-hover)]` | 10% darkened interaction state |
| **Action Hover** (Dark) | `#BCE5FF` | `--action-blue-hover` | `dark:hover:bg-[var(--action-blue-hover)]` | Lightened interaction state |
| **Link Text** (Light) | `#0470B4` | `--link-text` | `text-[var(--link-text)]` | Inline links (accessible on white) |
| **Link Text** (Dark) | `#7DD3FC` | `--link-text` | `dark:text-[var(--link-text)]` | Inline links (accessible on #0D111A) |
| **Signal Cyan** (Light) | `#0299C3` | `--signal-cyan` | `text-[var(--signal-cyan)]` | Connection pulses, signals (never text on white) |
| **Signal Cyan** (Dark) | `#017596` | `--signal-cyan` | `dark:text-[var(--signal-cyan)]` | Connection pulses, signals in dark mode |
| **Control Border** (Light) | `#66758F` | `--control-border` | `border-[var(--control-border)]` | Input borders, accessible dividers |
| **Control Border** (Dark) | `#64748B` | `--control-border` | `dark:border-[var(--control-border)]` | Input borders, accessible dividers |
| **Border Subtle** (Light) | `#E2E8F0` | `--border-subtle` | `border-[var(--border-subtle)]` | Quiet container boundaries |
| **Border Subtle** (Dark) | `#1E293B` | `--border-subtle` | `dark:border-[var(--border-subtle)]` | Quiet container boundaries |
| **Logo Cyan** | `#02C1F7` | N/A | N/A | Decorative brand mark accent only; never body |

---

## 3. Component Discrepancy Classification & Remediation Matrix

Every hardcoded hex detected in the repository audit is cataloged below with its target disposition.

### Category A: Direct Brand Drift (Remediated in Task 09)

| Component / File | Line(s) | Current Code | Target Semantic Replacement | Rationale |
|---|---|---|---|---|
| `app/globals.css` | 17 | `--bg-surface-elevated: #FFFFFF;` | `--bg-surface-elevated: #F8FAFC;` | Harmonize with `docs/YCN_DESIGN_SYSTEM.md` §2 Light Surface |
| `app/globals.css` | 36 | `--bg-surface-elevated: #182337;` | `--bg-surface-elevated: #182234;` | Harmonize with `docs/YCN_DESIGN_SYSTEM.md` §2 Dark Surface |
| `components/Footer.tsx` | 6 | `dark:bg-[#0A0E17]` | `dark:bg-[var(--bg-canvas)]` | Remove ad-hoc dark tone `#0A0E17` |
| `components/Footer.tsx` | 44–94 | `text-slate-600 dark:text-slate-400 hover:text-[#0470B4]` | `text-[var(--text-secondary)] hover:text-[var(--link-text)]` | Eliminate hardcoded slate & hex values |
| `components/HowItConnects.tsx` | 8 | `dark:bg-[#0A0E17]` | `dark:bg-[var(--bg-surface)]` | Map to alternating section background `#141C2B` |
| `components/BuyerFAQ.tsx` | 50 | `dark:bg-[#0A0E17]` | `dark:bg-[var(--bg-surface)]` | Map to alternating section background `#141C2B` |
| `components/CinematicLayersSlice.tsx` | 188, 278, 346 | `dark:bg-[#101726]` | `dark:bg-[var(--bg-surface)]` | Map card background to canonical `#141C2B` |
| `components/CinematicLayersSlice.tsx` | 139, 248, 256 | `dark:bg-[#182337]` | `dark:bg-[var(--bg-surface-elevated)]` | Replace direct hex with elevated token |
| `components/CinematicLayersSlice.tsx` | 112, 166, 171 | `bg-[#0299C3] dark:bg-[#017596]` | `var(--signal-cyan)` | Ensure variable consumption |
| `components/HeroChapters.tsx` | 287 | `bg-[#141C2B]` | `bg-[var(--bg-surface)]` | Replace inline hex with CSS variable |

### Category B: Functional Status / Demo UI Exceptions (Preserved)

| Component / File | Line(s) | Value(s) | Purpose | Disposition |
|---|---|---|---|---|
| `PhoneChaptersSection.tsx` | 114 | `#f0f9ff`, `#0369a1` | "New" status pill background/text | **PRESERVED** — Functional status indicator inside customer app demo |
| `PhoneChaptersSection.tsx` | 115, 517 | `#eff6ff`, `#1d4ed8` | "Assigned" status pill background/text | **PRESERVED** — Enterprise workflow status indicator |
| `PhoneChaptersSection.tsx` | 117 | `#ecfdf5`, `#047857` | "Complete" status pill background/text | **PRESERVED** — Enterprise workflow status indicator |
| `PhoneChaptersSection.tsx` | 559, 1024 | `#16a34a` | Success checkmark icon | **PRESERVED** — System state confirmation |
| `IllustrativeResultsSection.tsx` | 124, 137 | `#10B981` | Metric graph positive delta stroke | **PRESERVED** — Chart status color per `YCN_DESIGN_SYSTEM.md` §2 rules |

### Category C: Hardware & Cinematic Frozen Exceptions (Owner Rulings Preserved)

| Component / File | Line(s) | Value(s) | Purpose | Disposition |
|---|---|---|---|---|
| `Laptop3D.tsx` | 16, 46, 64, 89, 96, 105 | `#1A1E29`, `#12161F`, `#252C3D`, `#1B202D`, `#12151F`, `#10131B`, `#0F121A` | Anodized space gray laptop casing, keyboard well, and display bezel | **PRESERVED** — Theme-invariant 3D physical hardware model |
| `BrandContinuumFilm.tsx` | 250 | `#0F1216` (landscape) / `#010101` (portrait) | Video player background edge blending | **PRESERVED** — Frozen visual bridge for cinematic entrance |
| `BrandContinuumStage.tsx` | 536, 538 | `#0F1216` / `#010101` | Initial background bridge tone before canvas initialization | **PRESERVED** — Frozen visual bridge for cinematic entrance |

---

## 4. Typography Scale Architecture

Per `docs/YCN_DESIGN_SYSTEM.md` §3, the type scale is anchored on **Space Grotesk** (display & headings) and **Inter** (body & UI controls).

### 4.1 Hierarchy Matrix

| Role | Class Name | Fluid Sizing Math (`clamp()`) | Font Family | Weight | Line Height | Tracking |
|---|---|---|---|---|---|---|
| **Display Hero** | `.type-display-hero` | `clamp(2.5rem, 5.2vw, 4.75rem)` | Space Grotesk | 600 (Semibold) | 1.02 (0.99 desktop) | `-0.025em` (`-0.035em`) |
| **Display Page** | `.type-display-page` | `clamp(2.25rem, 4.2vw, 3.75rem)` | Space Grotesk | 600 (Semibold) | 1.06 (1.04 desktop) | `-0.02em` (`-0.03em`) |
| **Heading Section** | `.type-heading-section` | `clamp(2rem, 3.4vw, 3.25rem)` | Space Grotesk | 600 (Semibold) | 1.08 | `-0.025em` |
| **Heading Card** | `.type-heading-card` | `clamp(1.25rem, 2vw, 1.75rem)` | Space Grotesk | 600 (Semibold) | 1.22 | `-0.015em` |
| **Copy Lead** | `.type-copy-lead` | `clamp(1.0625rem, 1.3vw, 1.25rem)` | Inter | 400 (Regular) | 1.55 | `-0.005em` |
| **Copy Body** | `.type-copy-body` | `1rem` (16px) | Inter | 400 (Regular) | 1.62 | `normal` |
| **Copy Secondary** | `.type-copy-secondary` | `0.9375rem` (15px) | Inter | 400 (Regular) | 1.55 | `normal` |
| **Control / Button** | `.type-control` | `0.875rem` (14px) | Inter | 600 (Semibold) | 1.25 | `0.01em` |
| **Kicker / Eyebrow** | `.type-kicker` | `0.75rem` (12px) | Inter | 600 (Semibold) | 1.33 | `0.05em` (uppercase) |

---

## 5. Five-Viewport Visual Audit Manifest

Visual verification was conducted on `http://localhost:3005` via Playwright Chromium. All ten resulting screenshots are preserved in the private vault at `/home/ycn-labs/Desktop/YCN_LABS_MASTER/proof/YCN-V2-DESIGN-CONTRACT-01/screenshots/`.

| Viewport Name | Target Device Tier | Dimensions (W×H) | Theme | File Size | SHA-256 Checksum |
|---|---|---|---|---|---|
| `mobile_390` | Modern Smartphone | 390 × 844 px | Dark | 388,101 bytes | `552c8a5e248d92caea86cf12ff46a684ebccba0f3b5752a6f718493f4b9d8554` |
| `mobile_390` | Modern Smartphone | 390 × 844 px | Light | 392,854 bytes | `375b2d23c2596713301a72d46b60f0a7ceb0b05fc12080f0fc4c8f1c8c1bb2be` |
| `tablet_768` | Tablet Portrait | 768 × 1024 px | Dark | 855,045 bytes | `3c0d75e171381b1523d26752ba44bd7d27612639217a8db0f95477229283f254` |
| `tablet_768` | Tablet Portrait | 768 × 1024 px | Light | 854,244 bytes | `e51c4a57adbf7671ae5b725b40e1af6f21eb698d669961eec6811af3f680d427` |
| `desktop_sm_1024` | Small Desktop / Tablet Land | 1024 × 768 px | Dark | 880,217 bytes | `ef323e449324e5ba3284e71ab85145de7d5800c33309b290bdb54fa6ab927b7f` |
| `desktop_sm_1024` | Small Desktop / Tablet Land | 1024 × 768 px | Light | 877,656 bytes | `716ef878920105bd84dc02f5f943c4df0abb1129f7556f1dfd35325153a616ce` |
| `desktop_std_1280` | Standard Laptop | 1280 × 800 px | Dark | 1,123,482 bytes | `564a365763c55d854231810d53557e355091d7e58fb5239738bcad8110b7b693` |
| `desktop_std_1280` | Standard Laptop | 1280 × 800 px | Light | 1,121,769 bytes | `280a866f6d7e077e1f1dc27c56cd57a9aeafdf9e93859ba360a9f88b5eac59ac` |
| `desktop_wide_1440`| High-Resolution Desktop | 1440 × 900 px | Dark | 1,375,515 bytes | `0d0ccaa7af879c9ec0b94718dd87c6003f9240dc63cf517679e6df20d9a3217e` |
| `desktop_wide_1440`| High-Resolution Desktop | 1440 × 900 px | Light | 1,371,353 bytes | `0259245edf340bb33032b486bd3561a91e6218b5782f896e9d33b22132091037` |

---

## 6. Regional Metadata Queue (Task 10 Alignment)

In `app/layout.tsx`:
- **Line 42:** `locale: "en_GB"` → Queue change to `en_IN` (India-First primary audience).
- **Line 90:** `addressCountry: "GB"` → Queue update to Indian entity / international operations format.
- **OG Images:** Verify `/brand/ycn-og-1200x630.jpg` resolves cleanly once Task 11 brand assets land.

---

## 7. Next Actions

1. **Independent Review:** Package submitted to GPT and Claude for single-pass review.
2. **Task 09 Implementation:** Upon Owner approval of this contract, apply the Category A token reconciliations to `app/globals.css` and affected components under an isolated working branch.\n