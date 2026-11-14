# Public asset manifest

**Checked:** 13 November 2026, branch `wip/YCN-V3-UI` (PR #33).
**Why this matters:** every file in `public/` is downloadable at its URL once the site is deployed, even if no page shows it.
**Rule:** nothing here is deleted without the Owner's approval of the exact files (`git rm` keeps history).

"Used" means a page, component or stylesheet references the file. Recommendations are proposals.

## Used: keep

| Files | Purpose | Licence / source |
|---|---|---|
| `brand/favicon.ico`, `brand/ycn-favicon-32.png`, `brand/ycn-icon-180.png`, `brand/ycn-icon-192.png`, `brand/ycn-icon-512.webp` | Browser and phone icons | YCN Labs own artwork |
| `brand/ycn-logo-{light,dark}-transparent-224.png`, `-448.png` | Header and footer logo | YCN Labs own artwork |
| `brand/ycn-labs-full-{light,dark}.png`, `brand/ycn-final-live-logo-v6.png` | Logo used by the (bypassed) entrance system | YCN Labs own artwork |
| `brand/ycn-og-1200x630.jpg` | Social preview image | YCN Labs own artwork |
| `fonts/inter/*`, `fonts/space-grotesk/*` (with `OFL.txt`) | Self-hosted fonts | SIL Open Font License 1.1 |

## Used only by the bypassed intro film: decision needed

| Files | Size | Status | Recommendation |
|---|---|---|---|
| `entrance/ycn-intro-final-{landscape,portrait}-v5.mp4` | 2.8 MB each | Referenced by `components/homepage/vnext/BrandContinuumFilm.tsx`; never shown while `ENTRANCE_INTERIM_BYPASS = true` | **Exclude from launch.** The film was bypassed because it shows out-of-scope and garbled text; it is still downloadable. Remove from `public/` before launch (or keep only if the Owner plans to bring a corrected film back). |
| `entrance/ycn-intro-final-{landscape,portrait}-poster-v5.webp` | ~40 KB each | Same | Same as the films. |

## Not used by any page: proposals

| Files | Size | Recommendation |
|---|---|---|
| `media/clean_organised_laptop_desk.jpg`, `media/messy_desk_books_papers_iphone.jpg` | 178 + 200 KB | Retained by Owner decision on 13 Nov; no page shows them since the before/after became website screens. CC0. **Remove before launch** unless a page will use them. |
| `media/SOURCES.md` | 10 KB | Provenance record for media, most of it now removed. **Move to `docs/`** so the record survives without being served publicly. |
| `brand/ycn-labs-full-{light,dark}.webp` | 1.3 MB each | Unused duplicates of the PNG logos. **Remove**, or switch the entrance to them (smaller). |
| `brand/ycn-logo-{light,dark}-transparent-{88,176,264}.png` | 12–94 KB | Unused logo sizes. **Keep** (own artwork, small, handy for future use) or remove; low priority. |

## Removed on 13 Nov 2026 (Owner decision)

17 media files no page showed: the old hero photos (`media/hero/*`, licence unknown), stock clips and photos, capability media and an HDR file. See commit `7904460`.
