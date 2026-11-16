# Public asset manifest

**Checked:** 13 November 2026, branch `wip/YCN-V3-UI` (PR #33). **Updated:** 14 November 2026, branch `wip/YCN-ASSETS-PRUNE-01`.
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

## Not used by any page: kept

| Files | Size | Note |
|---|---|---|
| `brand/ycn-logo-{light,dark}-transparent-{88,176,264}.png` | 12–94 KB | Unused logo sizes. Kept (own artwork, small, handy for future use). |

## Removed on 14 Nov 2026 (Owner decision, exact files approved)

| Files | Why |
|---|---|
| `entrance/ycn-intro-final-{landscape,portrait}-v5.mp4`, `entrance/ycn-intro-final-{landscape,portrait}-poster-v5.webp` | Bypassed intro film (out-of-scope services, AI-generated retail scene with a "YCN" sign); would have been publicly downloadable. `ENTRANCE_FILM_AVAILABLE = false` makes `BrandContinuumFilm` request nothing and fall back to the code entrance if the bypass is ever turned off. |
| `media/clean_organised_laptop_desk.jpg`, `media/messy_desk_books_papers_iphone.jpg` | No page used them; the second shows third-party brands (Apple, LG and others). Supersedes the 13 Nov retention. |
| `brand/ycn-labs-full-{light,dark}.webp` | Unused 1.3 MB duplicates of the PNG logos. |
| `media/SOURCES.md` | **Moved** to `docs/MEDIA_SOURCES.md` (kept, no longer served publicly). |

All removals used `git rm`, so every file stays recoverable from history.

## Removed on 13 Nov 2026 (Owner decision)

17 media files no page showed: the old hero photos (`media/hero/*`, licence unknown), stock clips and photos, capability media and an HDR file. See commit `7904460`.
