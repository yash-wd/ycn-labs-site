import { test, expect, type Browser, type Page } from "@playwright/test";

// YCN-V3 browser regressions (13 Nov 2026). Runs against a local production build.
// The contact-form tests MOCK /api/contact: they prove the page's behaviour, not that a
// database row was stored or an email arrived. Real enquiry checks need a configured environment.

const PAGES = ["/", "/what-we-solve", "/work", "/how-we-work", "/about", "/engineering", "/contact", "/privacy", "/terms", "/credits"];
const WA = "https://wa.me/918341226694";

async function open(browser: Browser, route: string, opts: { theme?: "dark" | "light"; width?: number; height?: number; reduced?: boolean; js?: boolean } = {}) {
  const ctx = await browser.newContext({
    viewport: { width: opts.width ?? 1440, height: opts.height ?? 900 },
    reducedMotion: opts.reduced ? "reduce" : "no-preference",
    javaScriptEnabled: opts.js ?? true,
  });
  if (opts.theme) await ctx.addInitScript((t) => localStorage.setItem("theme", t), opts.theme);
  const page = await ctx.newPage();
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const response = await page.goto(route, { waitUntil: "networkidle" });
  return { ctx, page, errors, status: response?.status() };
}

const pillOpacities = (page: Page, label: string) =>
  page.evaluate((t) => [...document.querySelectorAll(".v3-shot .v3-pill")]
    .filter((e) => e.textContent?.trim() === t).map((e) => Number(getComputedStyle(e).opacity)), label);

test.describe("every page", () => {
  for (const route of PAGES) {
    test(`${route}: loads with one h1, no errors and no sideways scroll (2 themes × phone/desktop)`, async ({ browser }) => {
      for (const theme of ["dark", "light"] as const) {
        for (const [width, height] of [[375, 812], [1440, 900]]) {
          const { ctx, page, errors, status } = await open(browser, route, { theme, width, height });
          expect(status, `${route} ${theme} ${width}`).toBe(200);
          await expect(page.locator("h1")).toHaveCount(1);
          expect(await page.evaluate(() => document.documentElement.classList.contains("dark"))).toBe(theme === "dark");
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
          expect(errors).toEqual([]);
          await ctx.close();
        }
      }
    });
  }

  test("an unknown path returns 404 with a link home", async ({ browser }) => {
    const { ctx, page, status } = await open(browser, "/no-such-page");
    expect(status).toBe(404);
    await expect(page.locator('main a[href="/"]').first()).toBeVisible();
    await ctx.close();
  });
});

test.describe("navigation and theme", () => {
  test("desktop menu opens, goes to Work, and Escape returns focus to the menu button", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/");
    const trigger = page.locator("#navbar-menu-capsule-button");
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
    await trigger.click();
    await page.locator('#desktop-nav-expanded a[href="/work"]').click();
    await expect(page).toHaveURL(/\/work$/);
    await ctx.close();
  });

  test("phone menu opens as a sheet and links to Contact", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/", { width: 375, height: 812 });
    await page.locator("#navbar-menu-capsule-button").click();
    const sheet = page.locator("#mobile-nav-sheet");
    await expect(sheet).toBeVisible();
    await sheet.locator('a[href="/contact"]').first().click();
    await expect(page).toHaveURL(/\/contact$/);
    await ctx.close();
  });

  test("theme toggle switches between dark and light and remembers it", async ({ browser }) => {
    // No init script here: it would re-apply a theme on every reload.
    const { ctx, page } = await open(browser, "/");
    const isDark = () => page.evaluate(() => document.documentElement.classList.contains("dark"));
    const before = await isDark();
    await page.locator("#navbar-theme-toggle").click();
    await expect.poll(isDark).toBe(!before);
    await page.reload({ waitUntil: "networkidle" });
    expect(await isDark()).toBe(!before);
    await ctx.close();
  });
});

test.describe("motion (WCAG 2.2.2)", () => {
  test("hero: Pause/Play works by mouse and keyboard and is remembered in the tab", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/");
    const figure = page.locator(".v3-stage-wrap");
    const button = page.locator("#hero-motion-toggle");
    await expect(figure).toHaveAttribute("data-motion", "");
    await expect(button).toBeVisible();
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(button).toHaveText(/Play animation/);
    const states = await page.evaluate(() => [...document.querySelectorAll(".v3-stage .v3-anim-press, .v3-stage .v3-anim-travel, .v3-stage .v3-pill-new")].map((e) => getComputedStyle(e).animationPlayState));
    expect(states.every((s) => s === "paused")).toBe(true);
    await page.reload({ waitUntil: "networkidle" });
    await expect(figure).toHaveAttribute("data-paused", "");
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(figure).not.toHaveAttribute("data-paused", "");
    await page.keyboard.press("Space");
    await expect(figure).toHaveAttribute("data-paused", "");
    await ctx.close();
  });

  test("hero: still frame with reduced motion (no loop, no button)", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/", { reduced: true });
    await expect(page.locator(".v3-stage-wrap")).not.toHaveAttribute("data-motion", "");
    await expect(page.locator("#hero-motion-toggle")).toBeHidden();
    expect(await page.evaluate(() => getComputedStyle(document.querySelector(".v3-stage .v3-anim-travel")!).animationName)).toBe("none");
    await ctx.close();
  });

  test("hero: still frame without JavaScript (nothing moves that can't be stopped)", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/", { js: false });
    await expect(page.locator(".v3-stage-wrap")).not.toHaveAttribute("data-motion", "");
    const r = await page.evaluate(() => ({
      travel: getComputedStyle(document.querySelector(".v3-stage .v3-anim-travel")!).animationName,
      press: getComputedStyle(document.querySelector(".v3-stage .v3-anim-press")!).animationName,
      sent: Number(getComputedStyle(document.querySelector(".v3-stage .v3-pill-sent")!).opacity),
      nw: Number(getComputedStyle(document.querySelector(".v3-stage .v3-pill-new")!).opacity),
    }));
    expect(r).toEqual({ travel: "none", press: "none", sent: 0, nw: 1 });
    await ctx.close();
  });

  test("static demo screens always show their labels (F1)", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/work");
    for (let i = 0; i < 4; i++) {
      expect(await pillOpacities(page, "Reply sent")).toEqual([1]);
      expect(await pillOpacities(page, "New")).toEqual([1]);
      await page.waitForTimeout(2100);
    }
    await ctx.close();
  });

  test("header menu and button borders do not loop (Owner decision 13 Nov 2026)", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/");
    const read = () => page.evaluate(() => ({
      orbit: [...document.querySelectorAll("rect.ycn-navbar-perimeter-orbit")].map((r) => r.getAttribute("stroke-dashoffset")),
      spins: [...document.querySelectorAll("#navbar-root span, #hero-foundation-root span")].filter((s) => getComputedStyle(s).animationName.includes("spin")).length,
    }));
    const first = await read();
    await page.waitForTimeout(1200);
    const second = await read();
    expect(second.orbit).toEqual(first.orbit);
    expect(second.spins).toBe(0);
    await ctx.close();
  });
});

test.describe("homepage content", () => {
  test("FAQ opens from the keyboard; Why YCN links to Work and About; WhatsApp sits beside the final call", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/");
    const first = page.locator("#questions details").first();
    await first.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(first).toHaveAttribute("open", "");
    await expect(page.locator('#why-ycn a[href="/work"]')).toBeVisible();
    await expect(page.locator('#why-ycn a[href="/about"]')).toBeVisible();
    const wa = page.locator(`#start a[href="${WA}"]`);
    await expect(wa).toHaveAttribute("rel", "noopener noreferrer");
    await expect(page.locator('#start a[href="/contact"]')).toBeVisible();
    await ctx.close();
  });
});

test.describe("contact page (API mocked)", () => {
  async function fill(page: Page) {
    await page.fill("#whatHappensToday", "Orders arrive on WhatsApp and get missed at weekends.");
    await page.fill("#whatToChange", "One list of orders that the team can follow up.");
    await page.fill("#name", "Test Owner");
    await page.fill("#email", "owner@example.com");
  }

  test("direct channels point to the approved number and address", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/contact");
    await expect(page.locator('a[href="tel:+918341226694"]')).toBeVisible();
    await expect(page.locator(`a[href="${WA}"]`).first()).toBeVisible();
    await expect(page.locator('a[href="mailto:hello@ycnlabs.com"]')).toBeVisible();
    await ctx.close();
  });

  test("empty submit shows field errors and sends nothing", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/contact");
    let calls = 0;
    await page.route("**/api/contact", (r) => { calls++; return r.abort(); });
    await page.locator('form button[type="submit"]').click();
    await expect(page.getByText("Name must be at least 2 characters")).toBeVisible();
    expect(calls).toBe(0);
    await ctx.close();
  });

  test("accepted response shows the receipt; the request carries an idempotency key", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/contact");
    let body: Record<string, unknown> = {};
    await page.route("**/api/contact", async (r) => {
      body = r.request().postDataJSON();
      await r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true, data: { accepted: true } }) });
    });
    await fill(page);
    await page.locator('form button[type="submit"]').click();
    await expect(page.getByText("We received your request.")).toBeVisible();
    expect(typeof body.idempotencyKey).toBe("string");
    await ctx.close();
  });

  test("a storage failure shows an error, keeps the typed text, and retries with the same key", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/contact");
    const keys: unknown[] = [];
    await page.route("**/api/contact", async (r) => {
      keys.push(r.request().postDataJSON().idempotencyKey);
      await r.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ success: false, error: { code: "STORAGE_FAILURE", message: "We could not save your request. Please try again." } }) });
    });
    await fill(page);
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('form [role="alert"]')).toContainText("We could not save your request");
    await expect(page.getByText("We received your request.")).toHaveCount(0);
    await expect(page.locator("#name")).toHaveValue("Test Owner");
    await page.locator('form button[type="submit"]').click();
    await expect.poll(() => keys.length).toBe(2);
    expect(keys[0]).toBe(keys[1]);
    await ctx.close();
  });
});
