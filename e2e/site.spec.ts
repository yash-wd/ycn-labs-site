import { test, expect, type Browser, type Page } from "@playwright/test";

// YCN-V3 & R2 browser regressions suite. Runs against a local production build.
// Contact form tests mock /api/contact to verify UI behavior, recovery and idempotency.

const PAGES = [
  "/",
  "/what-we-solve",
  "/what-we-build",
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

test.describe("M06 NAV-07 Mobile Navigation Accessibility", () => {
  test("initial focus transfers reliably to first navigation link upon opening", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/", { width: 375, height: 812 });
    const trigger = page.locator("#navbar-menu-capsule-button");
    await trigger.click();

    const sheet = page.locator("#mobile-nav-sheet");
    await expect(sheet).toBeVisible();
    await expect(sheet).toHaveAttribute("role", "dialog");
    await expect(sheet).toHaveAttribute("aria-modal", "true");

    const firstLink = sheet.locator('a[href="/work"]').first();
    await expect(firstLink).toBeFocused();
    await ctx.close();
  });

  test("Tab and Shift+Tab remain trapped within mobile dialog and catch escaped focus", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/", { width: 375, height: 812 });
    await page.locator("#navbar-menu-capsule-button").click();
    const sheet = page.locator("#mobile-nav-sheet");
    await expect(sheet).toBeVisible();

    const firstLink = sheet.locator('a[href="/work"]').first();
    const closeBtn = page.locator("#mobile-nav-close-button");
    const lastEl = page.locator("#mobile-menu-cta-button");

    await expect(firstLink).toBeFocused();

    // Focus close button (first focusable in DOM) and Shift+Tab to wrap to last element (#mobile-menu-cta-button)
    await closeBtn.focus();
    await page.keyboard.press("Shift+Tab");
    await expect(lastEl).toBeFocused();

    // Tab from last element wraps to first element (closeBtn)
    await page.keyboard.press("Tab");
    await expect(closeBtn).toBeFocused();

    // Escaped focus: simulate focus outside modal then press Tab
    await page.evaluate(() => document.body.focus());
    await page.keyboard.press("Tab");
    await expect(sheet).toBeVisible();
    const activeIsInside = await page.evaluate(() => {
      const sheetEl = document.getElementById("mobile-nav-sheet");
      return sheetEl ? sheetEl.contains(document.activeElement) : false;
    });
    expect(activeIsInside).toBe(true);

    await ctx.close();
  });

  test("background content is inert and non-interactive while mobile modal is active", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/", { width: 375, height: 812 });
    await page.locator("#navbar-menu-capsule-button").click();
    await expect(page.locator("#mobile-nav-sheet")).toBeVisible();

    // Main and footer must have inert and aria-hidden attributes
    const mainInert = await page.locator("main").getAttribute("inert");
    const mainHidden = await page.locator("main").getAttribute("aria-hidden");
    expect(mainInert).not.toBeNull();
    expect(mainHidden).toBe("true");

    const footerInert = await page.locator("footer").getAttribute("inert");
    const footerHidden = await page.locator("footer").getAttribute("aria-hidden");
    expect(footerInert).not.toBeNull();
    expect(footerHidden).toBe("true");

    // Backdrop is visible
    const backdrop = page.locator("#mobile-nav-backdrop");
    await expect(backdrop).toBeVisible();

    // Close menu and verify inertness is cleared
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-nav-sheet")).toBeHidden();

    const mainCleared = await page.locator("main").getAttribute("inert");
    expect(mainCleared).toBeNull();
    await ctx.close();
  });

  test("Escape key closes mobile menu and restores focus to menu capsule button", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/", { width: 375, height: 812 });
    const trigger = page.locator("#navbar-menu-capsule-button");
    await trigger.click();
    await expect(page.locator("#mobile-nav-sheet")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-nav-sheet")).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await ctx.close();
  });

  test("in-panel close button closes mobile menu and restores focus to menu capsule button", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/", { width: 375, height: 812 });
    const trigger = page.locator("#navbar-menu-capsule-button");
    await trigger.click();
    await expect(page.locator("#mobile-nav-sheet")).toBeVisible();

    await page.locator("#mobile-nav-close-button").click();
    await expect(page.locator("#mobile-nav-sheet")).toBeHidden();
    await expect(trigger).toBeFocused();
    await ctx.close();
  });

  test("capsule toggle button closes mobile menu and restores focus", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/", { width: 375, height: 812 });
    const trigger = page.locator("#navbar-menu-capsule-button");
    await trigger.click();
    await expect(page.locator("#mobile-nav-sheet")).toBeVisible();

    await trigger.click();
    await expect(page.locator("#mobile-nav-sheet")).toBeHidden();
    await expect(trigger).toBeFocused();
    await ctx.close();
  });

  test("backdrop click closes mobile menu and restores focus", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/", { width: 375, height: 812 });
    const trigger = page.locator("#navbar-menu-capsule-button");
    await trigger.click();
    await expect(page.locator("#mobile-nav-sheet")).toBeVisible();

    await page.locator("#mobile-nav-backdrop").click({ position: { x: 20, y: 20 } });
    await expect(page.locator("#mobile-nav-sheet")).toBeHidden();
    await expect(trigger).toBeFocused();
    await ctx.close();
  });

  test("route navigation closes mobile menu, clears inertness, and restores logical focus destination", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/", { width: 375, height: 812 });
    await page.locator("#navbar-menu-capsule-button").click();
    await expect(page.locator("#mobile-nav-sheet")).toBeVisible();

    await page.locator('#mobile-nav-sheet a[href="/work"]').click();
    await expect(page).toHaveURL(/\/work$/);
    await expect(page.locator("#mobile-nav-sheet")).toBeHidden();

    // Logical focus destination on new page is main-content
    await expect(page.locator("#main-content")).toBeFocused();

    // Inertness removed from main
    await expect(page.locator("main")).not.toHaveAttribute("inert");
    await ctx.close();
  });

  test("viewport resize from mobile to desktop closes menu safely and clears inertness", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/", { width: 768, height: 1024 });
    const trigger = page.locator("#navbar-menu-capsule-button");
    await trigger.click();
    await expect(page.locator("#mobile-nav-sheet")).toBeVisible();

    // Resize across 1024px desktop breakpoint
    await page.setViewportSize({ width: 1024, height: 800 });
    await expect(page.locator("#mobile-nav-sheet")).toBeHidden();
    await expect(trigger).toBeFocused();

    await expect(page.locator("main")).not.toHaveAttribute("inert");
    await ctx.close();
  });

  test("reduced motion operation: opens and closes cleanly without delay", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/", { width: 375, height: 812, reduced: true });
    const trigger = page.locator("#navbar-menu-capsule-button");
    await trigger.click();
    await expect(page.locator("#mobile-nav-sheet")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-nav-sheet")).toBeHidden();
    await expect(trigger).toBeFocused();
    await ctx.close();
  });

  test("background clicks and pointer interactions are blocked while mobile modal is active", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/", { width: 375, height: 812 });
    await page.locator("#navbar-menu-capsule-button").click();
    await expect(page.locator("#mobile-nav-sheet")).toBeVisible();

    // Verify background theme toggle wrapper has inert and aria-hidden
    await expect(page.locator("#navbar-theme-toggle-wrapper")).toHaveAttribute("inert");
    await expect(page.locator("#navbar-theme-toggle-wrapper")).toHaveAttribute("aria-hidden", "true");

    // Attempting to dispatch click on background theme toggle does not change theme
    const themeSwitched = await page.evaluate(() => {
      const btn = document.getElementById("navbar-theme-toggle");
      if (!btn) return false;
      const initialDark = document.documentElement.classList.contains("dark");
      try {
        btn.click();
      } catch {
        // Inert element click rejected
      }
      const newDark = document.documentElement.classList.contains("dark");
      return initialDark !== newDark;
    });
    expect(themeSwitched).toBe(false);

    // Verify background main interactive link cannot be clicked or trigger navigation
    const navigated = await page.evaluate(() => {
      const heroLink = document.querySelector<HTMLAnchorElement>("main a[href]");
      if (!heroLink) return false;
      const initialHref = window.location.pathname;
      try {
        heroLink.click();
      } catch {
        // Inert element click rejected
      }
      return window.location.pathname !== initialHref;
    });
    expect(navigated).toBe(false);

    await ctx.close();
  });

  test("rapid toggle sequences cleanly recover state and logical focus without stuck inertness", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/", { width: 375, height: 812 });
    const trigger = page.locator("#navbar-menu-capsule-button");
    const sheet = page.locator("#mobile-nav-sheet");

    // Rapidly toggle menu open and closed 3 consecutive times
    for (let i = 0; i < 3; i++) {
      await trigger.click();
      await expect(sheet).toBeVisible();
      await trigger.click();
      await expect(sheet).toBeHidden();
      await expect(trigger).toBeFocused();
    }

    // After rapid cycles, confirm inertness is fully removed and main is active
    await expect(page.locator("main")).not.toHaveAttribute("inert");
    await expect(page.locator("main")).not.toHaveAttribute("aria-hidden");
    await expect(page.locator("footer")).not.toHaveAttribute("inert");
    await expect(trigger).toBeFocused();

    await ctx.close();
  });

  test("multi-viewport desktop and tablet regression across light and dark themes", async ({ browser }) => {
    for (const theme of ["dark", "light"] as const) {
      for (const width of [1024, 1440]) {
        const { ctx, page } = await open(browser, "/", { theme, width, height: 900 });
        const trigger = page.locator("#navbar-menu-capsule-button");
        await trigger.click();
        await expect(page.locator("#desktop-nav-expanded")).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(trigger).toBeFocused();
        await ctx.close();
      }
    }
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
    await expect(bookBtn).toContainText("Request a visit");
    await bookBtn.click();

    // Notice appears with reset button
    const notice = page.locator(".ycnr-booked-notice");
    await expect(notice).toBeVisible();
    await expect(notice).toContainText("Example only. On a real site, the clinic would receive this request.");

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
    await page.locator("button", { hasText: "Reset example" }).click();
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
    await expect(page.locator(".ycnr-whatsapp-bubble")).toContainText("Example only. Nothing is actually sent.");

    // Reset restarts
    await runBtn.click();
    await expect(indicator).toContainText("1 of 3");
    await ctx.close();
  });

  test("narrow mobile reflow (320px): all key routes render without horizontal overflow", async ({ browser }) => {
    for (const route of ["/", "/work", "/what-we-solve", "/how-we-work", "/about", "/engineering", "/contact"]) {
      const { ctx, page, errors } = await open(browser, route, { width: 320, height: 568 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      expect(errors).toEqual([]);
      await ctx.close();
    }
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
    await expect(page.getByText("Studio concept")).toHaveCount(3);
    await expect(page.getByText("Have a project like this?")).toBeVisible();
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

test.describe("inner pages integrity & accessibility", () => {
  test("single main landmark and canonical CTA on all inner pages", async ({ browser }) => {
    const innerPages = ["/what-we-solve", "/how-we-work", "/about", "/engineering", "/contact"];
    for (const route of innerPages) {
      const { ctx, page } = await open(browser, route);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator("#main-content")).toBeVisible();
      if (route !== "/contact") {
        await expect(page.locator('a[href="/contact"]:has-text("Start a Project")').first()).toBeVisible();
      }
      await ctx.close();
    }
  });

  test("SituationExplorer: keyboard operability and announced state toggle", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/what-we-solve");
    const firstToggle = page.locator('button[aria-label*="Highlight situation 01"]').first();
    await expect(firstToggle).toBeVisible();
    await expect(firstToggle).toHaveAttribute("aria-pressed", "false");
    await expect(firstToggle).toContainText("Select");

    // Keyboard activation with Enter
    await firstToggle.focus();
    await page.keyboard.press("Enter");
    await expect(firstToggle).toHaveAttribute("aria-pressed", "true");
    await expect(firstToggle).toContainText("Selected");

    // Toggle off with Space
    await page.keyboard.press("Space");
    await expect(firstToggle).toHaveAttribute("aria-pressed", "false");
    await expect(firstToggle).toContainText("Select");
    await ctx.close();
  });

  test("EngineeringSimulator: interactive failure mode simulations and example notice", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/engineering");
    await expect(page.getByText("Example only. This shows how the form is designed to behave.")).toBeVisible();

    // Default normal state
    await expect(page.locator('div[role="status"]')).toContainText("Receipt displayed to visitor.");

    // Switch to Email provider outage
    await page.locator('button:has-text("Email provider fails")').click();
    await expect(page.locator('div[role="status"]')).toContainText("The enquiry stays saved. The email can be re-sent.");

    // Switch to Database down
    await page.locator('button:has-text("Database down")').click();
    await expect(page.locator('div[role="status"]')).toContainText("No enquiry is saved, and the visitor is told so. No false thank-you.");
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

  test("@preview in non-production preview mode, displays preview notice and disables submit button", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/contact");
    await expect(page.getByText("Preview only. Enquiries are switched off here, so nothing will be sent.")).toBeVisible();
    const submitBtn = page.locator('form button[type="submit"]');
    await expect(submitBtn).toBeDisabled();
    await expect(submitBtn).toHaveText(/Send my enquiry/);
    await ctx.close();
  });

  test("@preview synthetic direct POST to /api/contact receives HTTP 503 refusal in preview mode", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: {
        name: "Preview Visitor",
        email: "visitor@example.com",
        message: "This enquiry should be refused by the preview boundary.",
      },
    });
    expect(res.status()).toBe(503);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error.code).toBe("SERVICE_UNAVAILABLE");
    expect(json.error.message).toBe("Preview only. Enquiries are switched off here, so nothing will be sent.");
    expect(json).not.toHaveProperty("data");
    expect(json).not.toHaveProperty("leadId");
  });

  test("@preview no-JavaScript safety: disabled button and Enter press cause no submission or navigation", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/contact", { js: false });
    await expect(page.getByText("Preview only. Enquiries are switched off here, so nothing will be sent.")).toBeVisible();

    const requests: { method: string; url: string }[] = [];
    page.on("request", (req) => {
      requests.push({ method: req.method(), url: req.url() });
    });

    const submitBtn = page.locator('form button[type="submit"]');
    await expect(submitBtn).toBeDisabled();

    // Verify form method is POST
    const form = page.locator("form");
    await expect(form).toHaveAttribute("method", "POST");

    // Attempt interaction with disabled button (force click)
    await submitBtn.click({ force: true }).catch(() => {});

    // Attempting to press Enter in text field does not leak data into query string or submit
    const nameInput = page.locator("#name");
    await nameInput.fill("Sensitive Visitor");
    await nameInput.press("Enter");

    // Assert zero contact or submission requests were dispatched
    const contactRequests = requests.filter(
      (r) => r.url.includes("/api/contact") || (r.method === "POST" && r.url.includes("/contact"))
    );
    expect(contactRequests).toHaveLength(0);

    // Assert URL remains /contact without navigation away or query parameter data leakage
    expect(page.url()).not.toContain("?");
    expect(page.url()).not.toContain("Sensitive");
    expect(page.url()).toMatch(/\/contact$/);
    await ctx.close();
  });

  test("no-JavaScript form safety: initial button is disabled and Enter press causes no submission or navigation", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/contact", { js: false });

    const requests: { method: string; url: string }[] = [];
    page.on("request", (req) => {
      requests.push({ method: req.method(), url: req.url() });
    });

    const submitBtn = page.locator('form button[type="submit"]');
    await expect(submitBtn).toBeDisabled();

    // Verify form method is POST
    const form = page.locator("form");
    await expect(form).toHaveAttribute("method", "POST");

    // Attempt interaction with disabled button (force click)
    await submitBtn.click({ force: true }).catch(() => {});

    const nameInput = page.locator("#name");
    await nameInput.fill("Production Visitor");
    await nameInput.press("Enter");

    // Assert zero contact or submission requests were dispatched
    const contactRequests = requests.filter(
      (r) => r.url.includes("/api/contact") || (r.method === "POST" && r.url.includes("/contact"))
    );
    expect(contactRequests).toHaveLength(0);

    // Assert URL remains /contact without navigation away or query parameter data leakage
    expect(page.url()).not.toContain("?");
    expect(page.url()).not.toContain("Production");
    expect(page.url()).toMatch(/\/contact$/);
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
