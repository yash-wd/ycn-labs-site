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

    const siteFooter = page.locator("footer:not(main footer)");
    const footerInert = await siteFooter.getAttribute("inert");
    const footerHidden = await siteFooter.getAttribute("aria-hidden");
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
    const siteFooterCleared = await siteFooter.getAttribute("inert");
    expect(siteFooterCleared).toBeNull();
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

    // Inertness removed from main and actual site footer
    await expect(page.locator("main")).not.toHaveAttribute("inert");
    await expect(page.locator("footer:not(main footer)")).not.toHaveAttribute("inert");
    await expect(page.locator("footer:not(main footer)")).not.toHaveAttribute("aria-hidden");
    await ctx.close();
  });

  test("viewport resize from mobile to desktop closes menu safely and clears inertness", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/", { width: 768, height: 1024 });
    const trigger = page.locator("#navbar-menu-capsule-button");
    await trigger.click();
    await expect(page.locator("#mobile-nav-sheet")).toBeVisible();
    await expect(page.locator("footer:not(main footer)")).toHaveAttribute("inert");
    await expect(page.locator("footer:not(main footer)")).toHaveAttribute("aria-hidden", "true");

    // Resize across 1024px desktop breakpoint
    await page.setViewportSize({ width: 1024, height: 800 });
    await expect(page.locator("#mobile-nav-sheet")).toBeHidden();
    await expect(trigger).toBeFocused();

    await expect(page.locator("main")).not.toHaveAttribute("inert");
    await expect(page.locator("footer:not(main footer)")).not.toHaveAttribute("inert");
    await expect(page.locator("footer:not(main footer)")).not.toHaveAttribute("aria-hidden");
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
    const trigger = page.locator("#navbar-menu-capsule-button");
    const sheet = page.locator("#mobile-nav-sheet");

    // Open mobile menu
    await trigger.click();
    await expect(sheet).toBeVisible();

    // Verify background containers have inert and aria-hidden
    await expect(page.locator("main")).toHaveAttribute("inert");
    await expect(page.locator("main")).toHaveAttribute("aria-hidden", "true");
    await expect(page.locator("#navbar-theme-toggle-wrapper")).toHaveAttribute("inert");
    await expect(page.locator("#navbar-theme-toggle-wrapper")).toHaveAttribute("aria-hidden", "true");

    // Record initial page state
    const initialUrl = page.url();
    const initialHtmlClass = await page.locator("html").getAttribute("class");

    // 1. Observable action: Attempting to click inert background theme toggle does NOT activate it
    const themeToggle = page.locator("#navbar-theme-toggle");
    const themeBox = await themeToggle.boundingBox();
    expect(themeBox).not.toBeNull();
    if (themeBox) {
      await page.mouse.click(themeBox.x + themeBox.width / 2, themeBox.y + themeBox.height / 2);
    }

    // Verify theme toggle action did NOT execute (theme class on <html> is unchanged)
    const afterThemeClickHtmlClass = await page.locator("html").getAttribute("class");
    expect(afterThemeClickHtmlClass).toBe(initialHtmlClass);
    // Menu remains open (inert button click did not trigger action or dismiss sheet)
    await expect(sheet).toBeVisible();

    // 2. Observable action: Clicking on background content outside the menu sheet hits #mobile-nav-backdrop
    const sheetBox = await sheet.boundingBox();
    expect(sheetBox).not.toBeNull();
    if (sheetBox) {
      // Backdrop at z-30 intercepts pointer event below the menu sheet
      await page.mouse.click(sheetBox.x + sheetBox.width / 2, sheetBox.y + sheetBox.height + 40);
    }

    // Modal dismisses via backdrop interaction
    await expect(sheet).toBeHidden();
    await expect(trigger).toBeFocused();

    // Observable outcome: No unwanted navigation occurred (remains on initial URL)
    await expect(page).toHaveURL(initialUrl);

    // Verify inertness is removed once modal is dismissed
    await expect(page.locator("main")).not.toHaveAttribute("inert");
    await expect(page.locator("#navbar-theme-toggle-wrapper")).not.toHaveAttribute("inert");

    // 3. Observable verification: Now that modal is closed and inertness cleared,
    // verify normal Playwright pointer click on theme toggle works as intended.
    await themeToggle.click();
    const isDark = () => page.evaluate(() => document.documentElement.classList.contains("dark"));
    const initialDark = initialHtmlClass?.includes("dark") ?? false;
    await expect.poll(isDark).toBe(!initialDark);

    await ctx.close();
  });

  test("rapid reopen during exit animation cleanly recovers state, focus, and clears inertness", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/", { width: 375, height: 812 });
    const trigger = page.locator("#navbar-menu-capsule-button");
    const sheet = page.locator("#mobile-nav-sheet");

    // 1. Standard open
    await trigger.click();
    await expect(sheet).toBeVisible();
    await expect(sheet.locator('a[href="/work"]').first()).toBeFocused();

    // 2. Trigger close: exit animation begins (duration: 420ms)
    await trigger.click();
    // Capsule button flips state immediately
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    // 3. Immediately trigger reopen while the exit animation is in-flight
    // (without waiting for sheet to finish closing or become hidden)
    await trigger.click();

    // Sheet re-opens cleanly, aborting exit animation
    await expect(sheet).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(sheet).not.toHaveAttribute("inert");
    await expect(sheet).not.toHaveAttribute("aria-hidden");
    await expect(sheet.locator('a[href="/work"]').first()).toBeFocused();

    // Background remains inert while menu is active
    await expect(page.locator("main")).toHaveAttribute("inert");
    await expect(page.locator("main")).toHaveAttribute("aria-hidden", "true");

    // 4. Close via Escape key and verify full recovery
    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();
    await expect(trigger).toBeFocused();

    // Confirm all background elements have inertness removed completely
    await expect(page.locator("main")).not.toHaveAttribute("inert");
    await expect(page.locator("main")).not.toHaveAttribute("aria-hidden");
    await expect(page.locator("footer:not(main footer)")).not.toHaveAttribute("inert");
    await expect(page.locator("footer:not(main footer)")).not.toHaveAttribute("aria-hidden");
    await expect(page.locator("#navbar-theme-toggle-wrapper")).not.toHaveAttribute("inert");

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

test.describe("Integrated Homepage Hero & Six-Mode Showroom", () => {
  test("integrated homepage structure: exactly one H1, main landmark, hero CTAs, and showroom anchor", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/");
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText("Websites that earn trust.");
    await expect(h1).toContainText("Software that saves time.");

    const main = page.locator("main");
    await expect(main).toHaveCount(1);

    await expect(page.locator('a[href="/contact"]').first()).toBeVisible();
    await expect(page.locator('a[href="/what-we-solve"]').first()).toBeVisible();
    await expect(page.locator('a[href="#showroom"]').first()).toBeVisible();
    await expect(page.locator("#showroom")).toBeVisible();
    await expect(page.locator("#showroom-title")).toHaveText("Explore what we can build");

    await ctx.close();
  });

  test("showroom switching: all six demonstration tabs switch cleanly and inactive panels are hidden", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/");
    await expect(page.locator("#panel-website")).toBeVisible();

    const modes = ["webapp", "automation", "crm", "store", "learning", "website"];
    for (const mode of modes) {
      const tab = page.locator(`#tab-${mode}`);
      await expect(tab).toBeVisible();
      await tab.click();
      await expect(tab).toHaveAttribute("aria-selected", "true");
      await expect(page.locator(`#panel-${mode}`)).toBeVisible();

      // Inactive panels must be hidden
      for (const other of modes) {
        if (other !== mode) {
          await expect(page.locator(`#panel-${other}`)).toBeHidden();
        }
      }
    }

    await ctx.close();
  });

  test("CRM demo on homepage: search, filtering, and 10px status badges", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/");
    await page.locator("#tab-crm").click();
    await expect(page.locator("#panel-crm")).toBeVisible();

    const searchInput = page.locator('#panel-crm input[placeholder*="Search by customer"]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill("Anita");
    await expect(page.locator('#panel-crm td:has-text("Tap repair")')).toBeVisible();

    // Reset filter
    await page.locator('#panel-crm button:has-text("Reset sample records")').click();
    await expect(page.locator('#panel-crm td:has-text("Wiring check")')).toBeVisible();

    // Verify status badge text size is at least 10px
    const badge = page.locator('#panel-crm [class*="pChip"]').first();
    const fontSize = await badge.evaluate((el) => window.getComputedStyle(el).fontSize);
    expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(10);

    await ctx.close();
  });

  test("Automation demo on homepage: complete flow through human gates, failure toggle, and retry", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/");
    await page.locator("#tab-automation").click();
    await expect(page.locator("#panel-automation")).toBeVisible();

    // 1. Run example -> progresses to Human Gate 1 (Confirm visit)
    const runBtn = page.locator('#panel-automation button[data-action="auto-run"]');
    await expect(runBtn).toBeVisible();
    await runBtn.click();

    // Human Gate 1: Waiting for owner to confirm the visit
    const confirmBtn = page.locator('#panel-automation button[data-action="auto-confirm"]');
    await expect(confirmBtn).toBeVisible({ timeout: 5000 });
    await expect(confirmBtn).toHaveText("Confirm visit");
    await confirmBtn.click();

    // Human Gate 2: Waiting for technician to mark job done
    const completeBtn = page.locator('#panel-automation button[data-action="auto-complete"]');
    await expect(completeBtn).toBeVisible({ timeout: 5000 });
    await expect(completeBtn).toHaveText("Mark job done");
    await completeBtn.click();

    // Finishes flow
    await expect(page.locator("#panel-automation #auto-status")).toHaveText(
      "Example finished. No message was sent.",
      { timeout: 5000 }
    );

    // Reset flow
    const resetBtn = page.locator('#panel-automation button[data-action="auto-reset"]');
    await resetBtn.click();
    await expect(page.locator("#panel-automation #auto-status")).toHaveText("Ready. Press Run example.");

    // Failure toggle & retry flow
    const failToggle = page.locator('#panel-automation button[data-action="auto-fail"]');
    await failToggle.click();
    await expect(failToggle).toHaveAttribute("aria-pressed", "true");

    await runBtn.click();
    const retryBtn = page.locator('#panel-automation button[data-action="auto-retry"]');
    await expect(retryBtn).toBeVisible({ timeout: 5000 });
    await expect(retryBtn).toHaveText("Try that step again");

    await ctx.close();
  });

  test("Store demo on homepage: all four category controls, cart drawer, and cross-mode state preservation", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/");
    await page.locator("#tab-store").click();
    await expect(page.locator("#panel-store")).toBeVisible();

    const panel = page.locator("#panel-store");

    // 1. Test all four category filters scoped to category navigation group
    const filterAll = panel.locator('nav[role="group"] button[data-action="store-filter"][data-filter="All"]');
    const filterPlumbing = panel.locator('nav[role="group"] button[data-action="store-filter"][data-filter="Plumbing"]');
    const filterElectrical = panel.locator('nav[role="group"] button[data-action="store-filter"][data-filter="Electrical"]');
    const filterTools = panel.locator('nav[role="group"] button[data-action="store-filter"][data-filter="Tools and paint"]');

    // Plumbing: Basin tap, Pipe tape pack (2 items)
    await filterPlumbing.click();
    await expect(filterPlumbing).toHaveAttribute("aria-pressed", "true");
    await expect(panel.locator("article")).toHaveCount(2);
    await expect(panel.locator('article:has-text("Basin tap")')).toBeVisible();

    // Electrical: LED bulb pack, Extension board (2 items)
    await filterElectrical.click();
    await expect(filterElectrical).toHaveAttribute("aria-pressed", "true");
    await expect(panel.locator("article")).toHaveCount(2);
    await expect(panel.locator('article:has-text("LED bulb pack")')).toBeVisible();

    // Tools and paint: Tool kit, Paint brush set (2 items)
    await filterTools.click();
    await expect(filterTools).toHaveAttribute("aria-pressed", "true");
    await expect(panel.locator("article")).toHaveCount(2);
    await expect(panel.locator('article:has-text("Tool kit")')).toBeVisible();

    // All: 6 items
    await filterAll.click();
    await expect(filterAll).toHaveAttribute("aria-pressed", "true");
    await expect(panel.locator("article")).toHaveCount(6);

    // 2. Add to cart & open cart drawer
    const addTapBtn = panel.locator('button[data-action="store-add"][data-id="tap"]');
    await addTapBtn.click();

    const drawer = panel.locator('aside[role="dialog"]');
    await expect(drawer).toBeVisible();
    await expect(drawer.locator("#cart-title")).toHaveText("Your cart");
    await expect(panel.locator('button[data-action="store-cart"]')).toContainText("Cart (1)");

    // Close drawer via Escape key
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();

    // 3. Cross-mode state preservation: switch away to CRM, then back to Store
    await page.locator("#tab-crm").click();
    await expect(page.locator("#panel-crm")).toBeVisible();
    await expect(panel).toBeHidden();

    // Return to Store: cart retains item
    await page.locator("#tab-store").click();
    await expect(panel).toBeVisible();
    await expect(panel.locator('button[data-action="store-cart"]')).toContainText("Cart (1)");

    await ctx.close();
  });

  test("Websites, Web apps, and Learning platform demonstrations interact correctly", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/");

    // 1. Websites interaction: select service and request visit
    await page.locator("#tab-website").click();
    const websitePanel = page.locator("#panel-website");
    await expect(websitePanel).toBeVisible();

    const electricalService = websitePanel.locator('button:has-text("Electrical")').first();
    await electricalService.click();
    await expect(websitePanel.locator('text=Selected: Electrical')).toBeVisible();

    const submitVisitBtn = websitePanel.locator('button:has-text("Request a visit")').last();
    await submitVisitBtn.click();
    await expect(websitePanel.locator('[role="status"]')).toContainText("Demo only. Nothing was submitted.");

    // 2. Web apps interaction: 3-step booking flow
    await page.locator("#tab-webapp").click();
    const webappPanel = page.locator("#panel-webapp");
    await expect(webappPanel).toBeVisible();

    // Step 1: select service
    await webappPanel.locator('button:has-text("Tap repair")').click();
    await webappPanel.locator('button:has-text("Continue")').click();

    // Step 2: select day & time
    await webappPanel.locator('button:has-text("Saturday")').click();
    await webappPanel.locator('button:has-text("Morning")').click();
    await webappPanel.locator('button:has-text("Continue")').click();

    // Step 3: review request and send
    await expect(webappPanel.locator("h2")).toHaveText("Check your request");
    await webappPanel.locator('button:has-text("Send request (demo)")').click();

    // Step 4: confirmation screen
    await expect(webappPanel.locator("h2")).toHaveText("Demo result");
    await expect(webappPanel.locator("text=EXAMPLE-001")).toBeVisible();

    // Reset webapp
    await webappPanel.locator('button:has-text("Start again")').click();
    await expect(webappPanel.locator("h2")).toHaveText("What do you need?");

    // 3. Learning platform interaction: lesson selection, quiz answer, and view toggle
    await page.locator("#tab-learning").click();
    const learningPanel = page.locator("#panel-learning");
    await expect(learningPanel).toBeVisible();

    // Select second lesson
    await learningPanel.locator('button[data-action="learn-lesson"][data-index="1"]').click();
    await expect(learningPanel.locator("h3:has-text('Using a keyboard and mouse')")).toBeVisible();

    // Quiz radio selection
    const spaceBarRadio = learningPanel.locator('input[type="radio"][value="Space bar"]');
    await spaceBarRadio.check();
    await learningPanel.locator('button:has-text("Check answer")').click();
    await expect(learningPanel.locator('#learn-quiz-result')).toHaveText("Correct.");

    // Toggle view to Progress
    await learningPanel.locator('button[data-action="learn-view"][data-view="Progress"]').first().click();
    await expect(learningPanel.locator("text=answered correctly.")).toBeVisible();

    await ctx.close();
  });

  test("Hero CTA button contrast and focus indicators across light and dark themes", async ({ browser }) => {
    for (const theme of ["light", "dark"] as const) {
      const { ctx, page } = await open(browser, "/", { theme });
      const primaryCta = page.locator('#hero-foundation-root a[href="/contact"]');
      const secondaryCta = page.locator('#hero-foundation-root a[href="/what-we-solve"]');

      await expect(primaryCta).toBeVisible();
      await expect(secondaryCta).toBeVisible();

      // Check computed styles
      const primaryStyles = await primaryCta.evaluate((el) => {
        const cs = window.getComputedStyle(el);
        return { color: cs.color, backgroundColor: cs.backgroundColor };
      });

      if (theme === "light") {
        // Light theme primary CTA: white text (rgb(255, 255, 255)) on blue background (rgb(4, 112, 180))
        expect(primaryStyles.color).toBe("rgb(255, 255, 255)");
        expect(primaryStyles.backgroundColor).toBe("rgb(4, 112, 180)");
      } else {
        // Dark theme primary CTA: dark text (rgb(7, 16, 24)) on bright cyan background (rgb(2, 193, 247))
        expect(primaryStyles.color).toBe("rgb(7, 16, 24)");
        expect(primaryStyles.backgroundColor).toBe("rgb(2, 193, 247)");
      }

      // Check focus visibility
      await primaryCta.focus();
      await expect(primaryCta).toBeFocused();
      const outline = await primaryCta.evaluate((el) => window.getComputedStyle(el).outlineStyle);
      expect(outline).toBe("solid");

      await ctx.close();
    }
  });

  test("narrow mobile reflow (320px): all key routes render without horizontal overflow", async ({ browser }) => {
    for (const route of ["/", "/work", "/what-we-solve", "/how-we-work", "/about", "/engineering", "/contact"]) {
      const { ctx, page, errors } = await open(browser, route, { width: 320, height: 568 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      expect(errors).toEqual([]);
      await ctx.close();
    }
  });

  test("Keyboard navigation and reduced motion compliance on integrated homepage", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/", { reduced: true });
    const tabWebsite = page.locator("#tab-website");
    await tabWebsite.focus();
    await expect(tabWebsite).toBeFocused();

    // Arrow navigation across tabs
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("#tab-webapp")).toBeFocused();
    await expect(page.locator("#panel-webapp")).toBeVisible();

    // Reduced motion maintains full visibility and zero horizontal overflow
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await ctx.close();
  });

  test("M09-B visual regressions: hero clears fixed navbar across all target widths and desktop Menu capsule stays visible during Tab navigation", async ({ browser }) => {
    for (const theme of ["light", "dark"] as const) {
      for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
        const { ctx, page } = await open(browser, "/", { width, height: 900, theme });
        const geometry = await page.evaluate(() => {
          const hdr = document.querySelector("header")?.getBoundingClientRect();
          const h1 = document.getElementById("hero-title")?.getBoundingClientRect();
          const trigger = document.getElementById("navbar-menu-capsule-button");
          const labelSpan = trigger?.querySelector("span");
          const shellBox = trigger?.parentElement?.getBoundingClientRect();
          const labelBox = labelSpan?.getBoundingClientRect();
          return {
            headerBottom: hdr ? hdr.bottom : 0,
            h1Top: h1 ? h1.top : 0,
            overflow: document.documentElement.scrollWidth > window.innerWidth,
            labelInsideCapsule: Boolean(
              shellBox &&
                labelBox &&
                labelBox.width > 0 &&
                labelBox.left >= shellBox.left &&
                labelBox.right <= shellBox.right
            ),
          };
        });
        expect(geometry.h1Top, `${theme} ${width} hero h1 top >= header bottom`).toBeGreaterThanOrEqual(
          geometry.headerBottom
        );
        expect(geometry.overflow, `${theme} ${width} horizontal overflow`).toBe(false);
        expect(geometry.labelInsideCapsule, `${theme} ${width} capsule label visible`).toBe(true);
        await ctx.close();
      }
    }

    // Desktop Tab navigation skips collapsed #desktop-nav-expanded and preserves capsule scrollLeft = 0
    for (const reduced of [false, true]) {
      const { ctx, page } = await open(browser, "/", { width: 1440, height: 900, reduced });
      const rail = page.locator("#desktop-nav-expanded");
      await expect(rail).toHaveAttribute("inert", "");
      await expect(rail).toHaveAttribute("aria-hidden", "true");

      for (let i = 0; i < 8; i++) {
        await page.keyboard.press("Tab");
        const inCollapsedRail = await page.evaluate(() => {
          const r = document.getElementById("desktop-nav-expanded");
          return Boolean(r && r.contains(document.activeElement));
        });
        expect(inCollapsedRail).toBe(false);
      }

      const afterTab = await page.evaluate(() => {
        const trigger = document.getElementById("navbar-menu-capsule-button");
        const shellBox = trigger?.parentElement?.getBoundingClientRect();
        const labelBox = trigger?.querySelector("span")?.getBoundingClientRect();
        return {
          scrollLeft: trigger?.parentElement?.scrollLeft ?? -1,
          labelInside: Boolean(
            shellBox && labelBox && labelBox.left >= shellBox.left && labelBox.right <= shellBox.right
          ),
        };
      });
      expect(afterTab.scrollLeft).toBe(0);
      expect(afterTab.labelInside).toBe(true);
      await ctx.close();
    }
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

test.describe("M08 preview route isolation", () => {
  test("/m08-preview returns HTTP 404 in production environment", async ({ browser }) => {
    const { ctx, page, status } = await open(browser, "/m08-preview");
    expect(status).toBe(404);
    await expect(page.locator("h1")).toContainText("This path does not go anywhere.");
    await expect(page.getByText("404 Not Found")).toBeVisible();
    await ctx.close();
  });
});
