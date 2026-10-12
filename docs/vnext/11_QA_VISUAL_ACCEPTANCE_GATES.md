# YCN Labs vNext — QA & Visual Acceptance Gates

---

## 1. Owner visual gate

No AI, agent, developer or automated test can declare the site visually approved.

The Owner reviews the rendered site in browser.

---

## 2. Premium visual gate

Reject the build if it feels:
- card-template heavy;
- like a component gallery;
- like generic SaaS;
- like AI-generated technology art;
- visually noisy;
- dependent on tech logos;
- dependent on fake proof.

Accept only if:
- each major viewport has one clear visual job;
- object continuity feels intentional;
- typography is strong;
- spacing is deliberate;
- media is crisp;
- motion has weight and restraint;
- mobile looks designed.

---

## 3. Forge-principle gate

Ask:
- Is there a clear visual subject?
- Does it come close/transform/return meaningfully?
- Can the visitor understand the work through the visual sequence?
- Does the page still make sense with short copy?
- Are there memorable beats, not just section fades?

Do not compare pixel-for-pixel with Forge.

---

## 4. Phone sequence gate

- same device continuity is believable;
- screen states are readable;
- chapter change maps to product change;
- phone does not overstay;
- final position is composed;
- reverse scroll restores prior state.

---

## 5. Laptop portal gate

- laptop is premium, not stock;
- screen starts quiet;
- product appears clearly;
- camera move is smooth;
- screen/viewport alignment is exact;
- bezel exit is seamless;
- reverse sequence is seamless;
- no white flash/layout jump.

---

## 6. Scroll reversal gate

Test:
- slow forward;
- slow back;
- fast forward/back oscillation;
- trackpad momentum;
- touch scroll;
- PageUp/PageDown;
- resize after mid-scroll.

No state corruption.

---

## 7. Pause-frame gate

Pause at representative progress values:
- 0%
- 25%
- 50%
- 75%
- 100%

Every frame should look intentionally designed.

If intermediate frames look like broken transforms, redesign.

---

## 8. AI-slop gate

Fail if the live site shows:
- unnecessary glow;
- random gradients;
- fake 3D;
- technology tunnels;
- generic stock mockups;
- repeated bento cards;
- fake metrics;
- gibberish imagery text;
- meaningless motion.

---

## 9. Content comprehension gate

Before release, run real-user test.

At minimum ask:
1. What does YCN Labs do?
2. What can YCN help a business improve?
3. What would you click next?
4. What did the phone/product story show?
5. Did you need technical knowledge?

Target:
- non-technical/business-owner participants answer 1–3 reasonably;
- most participants understand the product story;
- technical participant can find Engineering depth.

Do not count AI simulation as the user test.

---

## 10. Responsive matrix

Review:
- 320
- 375
- 390
- 430
- 768
- 1024
- 1280
- 1440
- 1920

Also:
- portrait/landscape;
- high DPR;
- slow network profile;
- reduced motion.

---

## 11. Browser matrix

At minimum:
- Chrome desktop;
- Safari desktop if available;
- Firefox;
- Edge;
- iOS Safari;
- Android Chrome.

---

## 12. Functional quality

- all nav links;
- all CTAs;
- form validation;
- form acceptance/recovery;
- accordion keyboard behavior;
- skip intro;
- Esc intro skip;
- browser back;
- route transitions;
- 404.

---

## 13. Performance quality

Required before candidate:
- build passes;
- actual bundle output reviewed;
- LCP resource known;
- no unexpected Three.js on phone;
- no huge video/image waste;
- no layout shift from device shells.

---

## 14. Claims quality

Every factual proof statement:
- exists in Claims & Proof register;
- evidence matches wording;
- status permits publication.

Graph values are audited like any other claim.

---

## 15. AGY Evidence & Visual Verification Protocol (Claude 02 §7)

For every homepage implementation pass, the AGY execution report must contain:
1. **Raw command tails and exit codes** for `pnpm run lint`, `pnpm run check-types`, `pnpm test`, and `pnpm run build` (all exit 0).
2. **`next start` preview verification** (local URL and host IP reported).
3. **Required viewport screenshots:** Captured at 1440px, 1024px, 768px, and 375px across both dark and light themes.
4. **Reduced-motion capture:** Visual proof that animations render final composed static states when `prefers-reduced-motion: reduce`.
5. **Network capture verification:** Proving zero Three.js or video fetch on the skip path and on phone viewports.
6. **Route JS budget:** Measured route JS before/after.
7. **Lighthouse measurement:** LCP element and CLS from Lighthouse mobile profile (three consecutive runs, raw tails reported).
8. **Keyboard traversal note:** Verified tab order through nav, CTAs, FAQ details/summary, and local needs finder.
9. **Exact changed-file list:** Complete inventory of modified/created files.
10. **Failure disclosure:** Complete disclosure of any failed attempts or unexpected behaviors encountered.

**Stop Rule:** Stop immediately after presenting this evidence. The Owner's browser review is the sole visual approval gate before proceeding to subsequent implementation.

