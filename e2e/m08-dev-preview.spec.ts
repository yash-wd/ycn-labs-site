import { test, expect, type Browser } from "@playwright/test";

// M08-A Showroom local development browser verification suite.
// Runs against the local development server (http://127.0.0.1:3005) where /m08-preview is active.
// In production builds and CI, /m08-preview returns HTTP 404 (tested in site.spec.ts).

const DEV_BASE_URL = process.env.PW_DEV_URL ?? "http://127.0.0.1:3005";

async function openDevPreview(
  browser: Browser,
  opts: { theme?: "dark" | "light"; width?: number; height?: number } = {}
) {
  const ctx = await browser.newContext({
    viewport: { width: opts.width ?? 1440, height: opts.height ?? 900 },
  });
  if (opts.theme) {
    await ctx.addInitScript((t) => localStorage.setItem("theme", t), opts.theme);
  }
  const page = await ctx.newPage();
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const response = await page.goto(`${DEV_BASE_URL}/m08-preview`, { waitUntil: "networkidle" });
  return { ctx, page, errors, status: response?.status() };
}

test.describe("M08 Showroom local development browser verification", () => {
  test.skip(!process.env.PW_DEV_URL, "Runs against active local development preview server (PW_DEV_URL)");

  const MODES = [
    { id: "website", label: "Websites", stageLabel: "Example: Websites", caption: "A clear website that shows what you do and makes it easy to ask for a visit." },
    { id: "webapp", label: "Web apps", stageLabel: "Example: Web apps", caption: "Customers can ask for a job online and give a preferred day and time, without a phone call." },
    { id: "automation", label: "Automation", stageLabel: "Example: Automation", caption: "Routine follow-ups can run on their own, so fewer of them rely on memory." },
    { id: "crm", label: "CRM & admin", stageLabel: "Example: CRM & admin", caption: "One screen for requests, jobs and customers, so you can see what is still open." },
    { id: "store", label: "Online store", stageLabel: "Example: Online store", caption: "Customers can browse products, fill a cart and place an order online." },
    { id: "learning", label: "Learning platform", stageLabel: "Example: Learning platform", caption: "Students can follow lessons at their own pace and see their progress." },
  ];

  test("renders 6 tabs and controls panel visibility, ARIA relationships, and dynamic announcements without console errors", async ({ browser }) => {
    const { ctx, page, errors, status } = await openDevPreview(browser);
    expect(status).toBe(200);
    expect(errors).toHaveLength(0);

    // Verify selector group label
    const tablist = page.locator('[role="tablist"]');
    await expect(tablist).toHaveAttribute("aria-label", "Choose an example");

    for (const mode of MODES) {
      const tab = page.locator(`#tab-${mode.id}`);
      await expect(tab).toBeVisible();
      await tab.click();
      await expect(tab).toHaveAttribute("aria-selected", "true");
      await expect(tab).toHaveAttribute("aria-controls", `panel-${mode.id}`);

      const panel = page.locator(`#panel-${mode.id}`);
      await expect(panel).toBeVisible();
      await expect(panel).not.toHaveAttribute("hidden");
      await expect(panel).toHaveAttribute("role", "tabpanel");
      await expect(panel).toHaveAttribute("aria-labelledby", `tab-${mode.id}`);
      await expect(panel).toHaveAttribute("aria-label", mode.stageLabel);
      await expect(panel).toHaveAttribute("tabindex", "0");

      // Verify mode caption
      await expect(page.locator("#mode-caption")).toHaveText(mode.caption);

      // Verify dynamic live announcement for all 6 modes
      await expect(page.locator("#mode-announcement")).toHaveText(`${mode.label} example selected.`);

      // Other panels must be hidden and have tabindex="-1"
      for (const other of MODES) {
        if (other.id !== mode.id) {
          const otherPanel = page.locator(`#panel-${other.id}`);
          await expect(otherPanel).toHaveAttribute("hidden", "");
          await expect(otherPanel).toHaveAttribute("tabindex", "-1");
        }
      }
    }
    await ctx.close();
  });

  test("supports complete Arrow-key, Home, End, Tab, and Shift+Tab keyboard navigation", async ({ browser }) => {
    const { ctx, page } = await openDevPreview(browser);
    const firstTab = page.locator("#tab-website");
    await firstTab.focus();
    await expect(firstTab).toBeFocused();

    // ArrowRight moves to webapp
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("#tab-webapp")).toBeFocused();
    await expect(page.locator("#tab-webapp")).toHaveAttribute("aria-selected", "true");

    // ArrowDown moves to automation
    await page.keyboard.press("ArrowDown");
    await expect(page.locator("#tab-automation")).toBeFocused();
    await expect(page.locator("#tab-automation")).toHaveAttribute("aria-selected", "true");

    // End key moves to last tab (learning)
    await page.keyboard.press("End");
    await expect(page.locator("#tab-learning")).toBeFocused();
    await expect(page.locator("#tab-learning")).toHaveAttribute("aria-selected", "true");

    // Home key moves to first tab (website)
    await page.keyboard.press("Home");
    await expect(page.locator("#tab-website")).toBeFocused();
    await expect(page.locator("#tab-website")).toHaveAttribute("aria-selected", "true");

    // Tab moves focus into active panel
    await page.keyboard.press("Tab");
    await expect(page.locator("#panel-website")).toBeFocused();

    // Shift+Tab returns focus to selected tab
    await page.keyboard.press("Shift+Tab");
    await expect(page.locator("#tab-website")).toBeFocused();

    // ArrowLeft wraps to last tab (learning)
    await page.keyboard.press("ArrowLeft");
    await expect(page.locator("#tab-learning")).toBeFocused();
    await expect(page.locator("#tab-learning")).toHaveAttribute("aria-selected", "true");

    // Tab from learning tab moves focus into learning panel
    await page.keyboard.press("Tab");
    await expect(page.locator("#panel-learning")).toBeFocused();

    // Shift+Tab returns focus to learning tab
    await page.keyboard.press("Shift+Tab");
    await expect(page.locator("#tab-learning")).toBeFocused();

    await ctx.close();
  });

  test("renders accessible disclosure banner and no premature enlarged-view control", async ({ browser }) => {
    const { ctx, page } = await openDevPreview(browser);
    const disclosure = page.locator("#demo-disclosure");
    await expect(disclosure).toBeVisible();
    await expect(disclosure).toContainText("Examples only. Example Home Repairs");
    await expect(disclosure).not.toContainText("Fictional concept demonstrations.");

    // The premature enlarged-view button must not exist
    await expect(page.locator("button:has-text('Open larger view')")).toHaveCount(0);
    await expect(page.locator("button:has-text('Close larger view')")).toHaveCount(0);
    await ctx.close();
  });

  test("renders cleanly in dark and light themes across all six modes at 375px mobile and 1440px desktop with no sideways scroll", async ({ browser }) => {
    for (const theme of ["dark", "light"] as const) {
      for (const [width, height] of [[375, 667], [1440, 900]] as const) {
        const { ctx, page, errors, status } = await openDevPreview(browser, { theme, width, height });
        expect(status).toBe(200);
        expect(errors).toHaveLength(0);

        // Verify actual theme class is applied to html element
        await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${theme}\\b`));

        // Verify all 6 modes reflow cleanly without horizontal overflow
        for (const mode of MODES) {
          await page.locator(`#tab-${mode.id}`).click();
          const hasHorizontalOverflow = await page.evaluate(() => {
            return document.documentElement.scrollWidth > window.innerWidth;
          });
          expect(hasHorizontalOverflow).toBe(false);
        }

        await ctx.close();
      }
    }
  });
});
