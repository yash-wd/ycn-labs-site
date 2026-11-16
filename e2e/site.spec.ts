import { test, expect, type Browser, type Page } from "@playwright/test";

// YCN-V3 & R2 browser regressions suite. Runs against a local production build.
// Contact form tests mock /api/contact to verify UI behavior, recovery and idempotency.

const PAGES = [
  "/",
  "/what-we-solve",
  "/work",
  "/work/ycn-labs-website",
  "/work/service-business-website",
  "/work/request-workspace",
  "/work/quotation-builder",
  "/how-we-work",
  "/about",
  "/engineering",
  "/contact",
  "/privacy",
  "/terms",
  "/credits",
  "/blog",
  "/gallery",
  "/updates",
];
const WA = "https://wa.me/918341226694";

async function open(
  browser: Browser,
  route: string,
  opts: { theme?: "dark" | "light"; width?: number; height?: number; reduced?: boolean; js?: boolean } = {}
) {
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

test.describe("every route", () => {
  for (const route of PAGES) {
    test(`${route}: loads with one h1, no errors and no sideways scroll (2 themes × phone/desktop)`, async ({ browser }) => {
      for (const theme of ["dark", "light"] as const) {
        for (const [width, height] of [
          [375, 812],
          [1440, 900],
        ]) {
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

test.describe("Homepage R2 Interactive Demonstrations", () => {
  test("scene switching: Websites, Web apps, Automation tabs switch cleanly", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/");
    await expect(page.locator("#scene-website")).toBeVisible();

    // Switch to Web apps
    await page.locator('button[data-scene="app"]').click();
    await expect(page.locator("#scene-app")).toBeVisible();
    await expect(page.locator("#scene-website")).toBeHidden();

    // Switch to Automation
    await page.locator('button[data-scene="automation"]').click();
    await expect(page.locator("#scene-automation")).toBeVisible();
    await expect(page.locator("#scene-app")).toBeHidden();

    // Switch back to Websites
    await page.locator('button[data-scene="website"]').click();
    await expect(page.locator("#scene-website")).toBeVisible();
    await ctx.close();
  });

  test("Websites scene: service selection and simulated preview flow", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/");
    const serviceButtons = page.locator(".ycnr-service-card");
    await expect(serviceButtons).toHaveCount(2);

    // Select second service
    await serviceButtons.nth(1).click();
    await expect(serviceButtons.nth(1)).toHaveClass(/active/);

    // Click preview action
    const bookBtn = page.locator(".ycnr-demo-action-btn");
    await expect(bookBtn).toContainText("Preview visit request");
    await bookBtn.click();

    // Notice appears with reset button
    const notice = page.locator(".ycnr-booked-notice");
    await expect(notice).toBeVisible();
    await expect(notice).toContainText("Browser demonstration only — no real request transmitted");

    // Reset button resets state
    await page.locator(".ycnr-reset-demo-btn").click();
    await expect(page.locator(".ycnr-demo-action-btn")).toBeVisible();
    await ctx.close();
  });

  test("Web apps scene: status advancement and terminal Replied state until reset", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/");
    await page.locator('button[data-scene="app"]').click();

    const rowBadge = page.locator(".ycnr-table-row").first().locator("button");
    await expect(rowBadge).toContainText("NEW");

    // Advance to Assigned
    await rowBadge.click();
    await expect(rowBadge).toContainText("ASSIGNED");

    // Advance to Replied (terminal)
    await rowBadge.click();
    await expect(rowBadge).toContainText("REPLIED");
    await expect(rowBadge).toBeDisabled();

    // Clicking does not wrap around
    await rowBadge.click({ force: true });
    await expect(rowBadge).toContainText("REPLIED");

    // Reset queue restores initial status
    await page.locator("button", { hasText: "Reset queue" }).click();
    await expect(rowBadge).toContainText("NEW");
    await expect(rowBadge).toBeEnabled();
    await ctx.close();
  });

  test("Automation scene: step advancement and simulation replay", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/");
    await page.locator('button[data-scene="automation"]').click();

    const runBtn = page.locator(".ycnr-run-flow-btn");
    const indicator = page.locator(".ycnr-flow-indicator");

    await expect(indicator).toContainText("1 of 3");
    await runBtn.click();
    await expect(indicator).toContainText("2 of 3");
    await runBtn.click();
    await expect(indicator).toContainText("3 of 3");
    await expect(page.locator(".ycnr-whatsapp-bubble")).toBeVisible();

    // Replay restarts
    await runBtn.click();
    await expect(indicator).toContainText("1 of 3");
    await ctx.close();
  });

  test("Keyboard navigation and reduced motion compliance", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/", { reduced: true });
    const tab = page.locator('button[data-scene="website"]');
    await tab.focus();
    await expect(tab).toBeFocused();

    // Arrow or Tab focus to next button
    await page.keyboard.press("Tab");
    await expect(page.locator('button[data-scene="app"]')).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#scene-app")).toBeVisible();

    // Reduced motion maintains full visibility and no layout breaks
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await ctx.close();
  });
});

test.describe("Work portfolio and case studies", () => {
  test("/work displays all four case studies and invitation card with truthful badges", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/work");
    await expect(page.locator("h1")).toHaveText("We show our work honestly.");

    // Check all 4 study links
    await expect(page.locator('a[href="/work/ycn-labs-website"]')).toBeVisible();
    await expect(page.locator('a[href="/work/service-business-website"]')).toBeVisible();
    await expect(page.locator('a[href="/work/request-workspace"]')).toBeVisible();
    await expect(page.locator('a[href="/work/quotation-builder"]')).toBeVisible();

    // Check truthful classification badges
    await expect(page.getByText("Internal build · In development")).toBeVisible();
    await expect(page.getByText("Independent concept · Demonstration")).toHaveCount(3);
    await expect(page.getByText("Next project invitation")).toBeVisible();
    await ctx.close();
  });

  test("/work/request-workspace: interactive requests table with terminal Replied state", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/work/request-workspace");
    await expect(page.locator("h1")).toContainText("Every request needs an owner");

    const firstActionBtn = page.locator("table button").first();
    await expect(firstActionBtn).toContainText("Next");

    // Advance to Assigned
    await firstActionBtn.click();
    await expect(firstActionBtn).toContainText("Next");

    // Advance to Replied (terminal)
    await firstActionBtn.click();
    await expect(firstActionBtn).toContainText("Done");
    await expect(firstActionBtn).toBeDisabled();

    // Reset button restores table
    await page.locator("button", { hasText: "Reset example" }).click();
    await expect(firstActionBtn).toContainText("Next");
    await expect(firstActionBtn).toBeEnabled();
    await ctx.close();
  });

  test("/work/quotation-builder: dynamic recalculation in INR", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/work/quotation-builder");
    await expect(page.locator("h1")).toContainText("Less copying. A clearer quote.");

    const qtyInput = page.locator('input[type="number"]').first();
    const rateInput = page.locator('input[type="number"]').nth(1);

    await qtyInput.fill("5");
    await rateInput.fill("2000");

    // Total should display ₹10,000
    await expect(page.locator("strong[aria-live='polite']")).toContainText("10,000");
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
    await page.route("**/api/contact", (r) => {
      calls++;
      return r.abort();
    });
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
      await r.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, data: { accepted: true } }),
      });
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
      await r.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          error: { code: "STORAGE_FAILURE", message: "We could not save your request. Please try again." },
        }),
      });
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
