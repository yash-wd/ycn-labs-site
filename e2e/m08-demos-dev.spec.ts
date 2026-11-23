import { test, expect, type Browser } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// M08-C Showroom Demos Development Browser Verification & 48-Screenshot Matrix
// Runs against local dev preview server (PW_DEV_URL, default http://127.0.0.1:3005).

const DEV_BASE_URL = process.env.PW_DEV_URL ?? 'http://127.0.0.1:3005';
const SCREENSHOT_DIR = path.join(process.cwd(), 'test-results', 'm08-screenshots');

const MODES = ['website', 'webapp', 'crm', 'automation', 'store', 'learning'] as const;
const VIEWPORTS = [
  { width: 320, height: 600 },
  { width: 375, height: 667 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
] as const;
const THEMES = ['light', 'dark'] as const;

function computeSha256(filePath: string): string {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

async function openDevPreview(
  browser: Browser,
  opts: { theme?: 'dark' | 'light'; width?: number; height?: number; cleanCapture?: boolean } = {}
) {
  const ctx = await browser.newContext({
    viewport: { width: opts.width ?? 1440, height: opts.height ?? 900 },
  });
  if (opts.theme) {
    await ctx.addInitScript((t) => localStorage.setItem('theme', t), opts.theme);
  }
  const page = await ctx.newPage();
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const response = await page.goto(`${DEV_BASE_URL}/m08-preview`, { waitUntil: 'networkidle' });

  if (opts.cleanCapture) {
    // In clean screenshot capture mode, ensure Next.js dev indicator and fixed header overlays do not overlap demo elements
    await page.addStyleTag({
      content: `
        /* Hide Next.js dev indicator badge in test capture runs */
        nextjs-portal, [data-nextjs-dev-tools-indicator], #__next-build-watcher, #next-dev-tools-overlay {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
        /* In isolated stage capture, position header away so it does not float over scrolled demo stage */
        #navbar-root {
          position: absolute !important;
          top: -9999px !important;
        }
      `,
    });
  }

  return { ctx, page, errors, status: response?.status() };
}

test.describe('M08-B Showroom Demos Verification', () => {
  test.skip(!process.env.PW_DEV_URL, 'Runs against active local development preview server (PW_DEV_URL)');

  test('captures complete 72-configuration screenshot matrix (6 demos × 6 viewports × 2 themes) with sanitized manifest', async ({
    browser,
  }) => {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

    interface ManifestEntry {
      mode: string;
      width: number;
      height: number;
      theme: string;
      filename: string;
      sha256: string;
      sizeBytes: number;
    }

    const manifestEntries: ManifestEntry[] = [];

    for (const theme of THEMES) {
      for (const vp of VIEWPORTS) {
        const { ctx, page, errors, status } = await openDevPreview(browser, {
          theme,
          width: vp.width,
          height: vp.height,
          cleanCapture: true,
        });

        expect(status).toBe(200);
        expect(errors).toHaveLength(0);

        for (const mode of MODES) {
          const tab = page.locator(`#tab-${mode}`);
          await tab.click();
          await expect(tab).toHaveAttribute('aria-selected', 'true');

          const panel = page.locator(`#panel-${mode}`);
          await expect(panel).toBeVisible();
          await expect(panel).not.toHaveAttribute('hidden');

          // Wait a tick for rendering stability
          await page.waitForTimeout(100);

          const filename = `m08-${mode}-${vp.width}px-${theme}.png`;
          const filePath = path.join(SCREENSHOT_DIR, filename);

          // Capture screenshot of the active demo stage
          await panel.screenshot({ path: filePath });

          expect(fs.existsSync(filePath)).toBe(true);
          const stat = fs.statSync(filePath);
          expect(stat.size).toBeGreaterThan(1000);

          const sha256 = computeSha256(filePath);

          manifestEntries.push({
            mode,
            width: vp.width,
            height: vp.height,
            theme,
            filename,
            sha256,
            sizeBytes: stat.size,
          });
        }

        await ctx.close();
      }
    }

    // Verify all 72 configurations were captured (6 modes × 6 viewports × 2 themes)
    expect(manifestEntries).toHaveLength(72);

    // Write sanitized manifest (no absolute workstation paths; only relative filenames)
    const manifestPath = path.join(SCREENSHOT_DIR, 'manifest.json');
    const manifestData = {
      description: 'M08-D Showroom 72-Configuration Development Preview Matrix',
      source_pr_head_sha: process.env.PR_SOURCE_HEAD_SHA ?? process.env.GITHUB_SHA ?? 'local-run',
      tested_checkout_sha: process.env.TESTED_CHECKOUT_SHA ?? 'local-run',
      workflow_run_id: process.env.GITHUB_RUN_ID ?? 'local-run',
      generatedAt: new Date().toISOString(),
      totalScreenshots: manifestEntries.length,
      entries: manifestEntries,
    };

    fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2), 'utf-8');
    expect(fs.existsSync(manifestPath)).toBe(true);

    // Privacy assertion: manifest must not contain absolute home directory paths
    const manifestRaw = fs.readFileSync(manifestPath, 'utf-8');
    expect(manifestRaw).not.toContain('/home/');
    expect(manifestRaw).not.toContain('ycn-labs');
  });

  test('verifies interactive behaviors in Websites demo', async ({ browser }) => {
    const { ctx, page } = await openDevPreview(browser);
    await page.locator('#tab-website').click();

    // Verify service selection reflects in request area
    // Click Electrical
    await page.locator('#panel-website button:has-text("Electrical")').click();
    await expect(page.locator('#web-contact')).toContainText('Selected: Electrical');

    // Click Painting
    await page.locator('#panel-website button:has-text("Painting")').click();
    await expect(page.locator('#web-contact')).toContainText('Selected: Painting');

    // Click Request a visit in contact section
    await page.locator('#web-contact button:has-text("Request a visit")').click();
    await expect(page.locator('[role="status"]').filter({ hasText: 'Demo only' })).toHaveText(
      'Demo only. Nothing was submitted.'
    );

    await ctx.close();
  });

  test('verifies 3-step interactive flow and required-field validation in Web apps demo', async ({
    browser,
  }) => {
    const { ctx, page } = await openDevPreview(browser);
    await page.locator('#tab-webapp').click();

    // Step 1: Click Continue without selection -> validation error appears and progression is blocked
    await page.locator('#panel-webapp button:has-text("Continue")').click();
    await expect(page.locator('#panel-webapp [role="alert"]')).toHaveText('Please choose a service.');
    await expect(page.locator('#app-main')).toContainText('STEP 1 OF 3');

    // Step 1 was initially defaulted to 'Tap repair'; select 'Wiring check'
    await page.locator('#panel-webapp button:has-text("Wiring check")').click();
    await page.locator('#panel-webapp button:has-text("Continue")').click();

    // Step 2: Choose Day and Time
    await expect(page.locator('#app-main')).toContainText('STEP 2 OF 3');
    await page.locator('#panel-webapp button:has-text("Monday")').click();
    await page.locator('#panel-webapp button:has-text("Evening")').click();
    await page.locator('#panel-webapp button:has-text("Continue")').click();

    // Step 3: Review Details
    await expect(page.locator('#app-main')).toContainText('STEP 3 OF 3');
    await expect(page.locator('#app-main')).toContainText('Anita (sample)');
    await expect(page.locator('#app-main')).toContainText('Wiring check');
    await expect(page.locator('#app-main')).toContainText('Monday');
    await expect(page.locator('#app-main')).toContainText('Evening');

    // Send request
    await page.locator('#panel-webapp button:has-text("Send request (demo)")').click();

    // Done state
    await expect(page.locator('#app-main')).toContainText('Demo result');
    await expect(page.locator('#app-main')).toContainText('Nothing was submitted.');
    await expect(page.locator('#app-main')).toContainText('EXAMPLE-001');

    // Reset via Start again
    await page.locator('#panel-webapp button:has-text("Start again")').click();
    await expect(page.locator('#app-main')).toContainText('STEP 1 OF 3');

    await ctx.close();
  });

  test('verifies CRM search, filtering, status change, technician assignment and reset', async ({
    browser,
  }) => {
    const { ctx, page } = await openDevPreview(browser);
    await page.locator('#tab-crm').click();

    // Search by area
    const searchInput = page.locator('#panel-crm input[placeholder="Search by customer, job or area"]');
    await searchInput.fill('North');
    await expect(page.locator('#panel-crm tbody tr')).toHaveCount(2); // Anita, Joseph

    // Search nonexistent
    await searchInput.fill('NONEXISTENT_QUERY_123');
    await expect(page.locator('#panel-crm tbody tr td')).toHaveText('No requests match.');

    // Clear search
    await searchInput.fill('');
    await expect(page.locator('#panel-crm tbody tr')).toHaveCount(10);

    // Status filter
    const statusSelect = page.locator('#panel-crm select[aria-label="Filter status"]');
    await statusSelect.selectOption('Visit planned');
    await expect(page.locator('#panel-crm tbody tr')).toHaveCount(4); // Ravi, Lakshmi, Joseph, Arjun

    await statusSelect.selectOption('All');

    // Select second record (Ravi)
    await page.locator('#panel-crm tbody tr button:has-text("Ravi")').click();
    await expect(page.locator('#panel-crm aside[aria-label="Request detail inspection"]')).toContainText('Ravi');
    await expect(page.locator('#panel-crm aside[aria-label="Request detail inspection"]')).toContainText('Wiring check');

    // Change status to Done and verify history logging
    const statusChangeSelect = page.locator('#panel-crm select[aria-label="Change status"]');
    await statusChangeSelect.selectOption('Done');
    await expect(
      page.locator('#panel-crm aside[aria-label="Request detail inspection"] [role="status"]')
    ).toContainText('Status updated to Done. Nothing is saved.');
    await expect(
      page.locator('#panel-crm aside[aria-label="Request detail inspection"] ol li').filter({ hasText: 'Status set to Done (demo)' })
    ).toBeVisible();

    // Assign technician and verify history logging
    const techSelect = page.locator('#panel-crm select[aria-label="Assign technician"]');
    await techSelect.selectOption('Deepak');
    await expect(
      page.locator('#panel-crm aside[aria-label="Request detail inspection"] [role="status"]')
    ).toContainText('Technician assigned to Deepak. Nothing is saved.');
    await expect(
      page.locator('#panel-crm aside[aria-label="Request detail inspection"] ol li').filter({ hasText: 'Assigned to Deepak (demo)' })
    ).toBeVisible();

    // Reset sample records
    await page.locator('#panel-crm button:has-text("Reset sample records")').click();
    await expect(page.locator('#panel-crm tbody tr')).toHaveCount(10);

    // Verify Schedule view
    await page.locator('#panel-crm button:has-text("Schedule")').first().click();
    await expect(page.locator('#panel-crm h3:has-text("Planned visits")')).toBeVisible();

    // Verify Customers view
    await page.locator('#panel-crm button:has-text("Customers")').first().click();
    await expect(page.locator('#panel-crm h3:has-text("Customers")')).toBeVisible();

    await ctx.close();
  });

  test('verifies interactive workflow execution, human confirmation gates, failure/retry, and reset in Automation demo', async ({
    browser,
  }) => {
    const { ctx, page } = await openDevPreview(browser);
    await page.locator('#tab-automation').click();

    // 1. Verify initial layout and idle status
    await expect(page.locator('#panel-automation')).toBeVisible();
    await expect(page.locator('#auto-status')).toHaveText('Ready. Press Run example.');
    await expect(
      page.locator('#panel-automation strong:has-text("Example Home Repairs · Workflows")')
    ).toBeVisible();
    await expect(
      page.locator('#panel-automation small:has-text("Person steps need your click.")')
    ).toBeVisible();

    // 2. Run example -> progresses automatically through steps 0, 1, 2 until Human Gate 1 (step 3)
    await page.locator('#panel-automation button[data-action="auto-run"]').click();

    // Human Gate 1: Waiting for owner to confirm the visit
    const confirmBtn = page.locator('#panel-automation button[data-action="auto-confirm"]');
    await expect(confirmBtn).toBeVisible({ timeout: 5000 });
    await expect(confirmBtn).toHaveText('Confirm visit');
    await expect(page.locator('#auto-status')).toHaveText('Waiting for owner to confirm the visit.');
    await expect(
      page.locator('#panel-automation small:has-text("Owner action · not automatic")')
    ).toBeVisible();

    // Verify simulated owner notification appears on lockscreen
    await expect(
      page.locator('#panel-automation [role="region"] strong:has-text("New request")')
    ).toBeVisible();

    // 3. Owner clicks "Confirm visit" -> advances to Human Gate 2 (step 4)
    await confirmBtn.click();
    const completeBtn = page.locator('#panel-automation button[data-action="auto-complete"]');
    await expect(completeBtn).toBeVisible({ timeout: 5000 });
    await expect(completeBtn).toHaveText('Mark job done');
    await expect(page.locator('#auto-status')).toHaveText('Waiting for technician to finish the job.');
    await expect(
      page.locator('#panel-automation small:has-text("Technician action · not automatic")')
    ).toBeVisible();

    // 4. Technician clicks "Mark job done" -> executes step 4 and advances automatically to step 5 (done)
    await completeBtn.click();
    await expect(page.locator('#auto-status')).toHaveText(
      'Example finished. No message was sent.',
      { timeout: 5000 }
    );
    await expect(
      page.locator('#panel-automation ul li:has-text("Sample customer completion update shown")')
    ).toBeVisible();

    // 5. Reset via "Start again"
    await page.locator('#panel-automation button[data-action="auto-reset"]').click();
    await expect(page.locator('#auto-status')).toHaveText('Ready. Press Run example.');

    // 5b. Verify Pause stops automatic progression and Resume continues progression
    await page.locator('#panel-automation button[data-action="auto-run"]').click();
    const pauseBtn = page.locator('#panel-automation button[data-action="auto-pause"]');
    await pauseBtn.click();
    await expect(pauseBtn).toHaveText('Resume');
    const pausedStatusText = await page.locator('#auto-status').textContent();
    expect(pausedStatusText).toContain('Paused at step');

    // Wait 1000ms to verify that automatic progression has genuinely halted while paused
    await page.waitForTimeout(1000);
    await expect(page.locator('#auto-status')).toHaveText(pausedStatusText!);

    // Resume execution
    await pauseBtn.click();
    await expect(pauseBtn).toHaveText('Pause');
    // Progression continues and reaches the owner confirmation gate
    await expect(confirmBtn).toBeVisible({ timeout: 5000 });
    await expect(page.locator('#auto-status')).toHaveText('Waiting for owner to confirm the visit.');

    // Reset again before failure test
    await page.locator('#panel-automation button[data-action="auto-reset"]').click();
    await expect(page.locator('#auto-status')).toHaveText('Ready. Press Run example.');

    // 6. Test simulated failure and retry
    const failToggle = page.locator('#panel-automation button[data-action="auto-fail"]');
    await failToggle.click();
    await expect(failToggle).toHaveAttribute('aria-pressed', 'true');

    await page.locator('#panel-automation button[data-action="auto-run"]').click();

    // Halts at step 2 with failure status
    const retryBtn = page.locator('#panel-automation button[data-action="auto-retry"]');
    await expect(retryBtn).toBeVisible({ timeout: 5000 });
    await expect(retryBtn).toHaveText('Try that step again');
    await expect(page.locator('#auto-status')).toHaveText('Owner alert failed. Try that step again.');
    await expect(
      page.locator('#panel-automation small:has-text("No later steps run before retry.")')
    ).toBeVisible();

    // Click retry -> resumes and reaches owner confirmation gate
    await retryBtn.click();
    await expect(confirmBtn).toBeVisible({ timeout: 5000 });
    await expect(page.locator('#auto-status')).toHaveText('Waiting for owner to confirm the visit.');

    // 7. Test Phone Recipient Switch
    const customerPhoneBtn = page
      .locator('#panel-automation button[data-action="auto-phone"][data-phone="customer"]:visible');
    await customerPhoneBtn.click();
    await expect(customerPhoneBtn).toHaveAttribute('aria-pressed', 'true');

    const ownerPhoneBtn = page
      .locator('#panel-automation button[data-action="auto-phone"][data-phone="owner"]:visible');
    await ownerPhoneBtn.click();
    await expect(ownerPhoneBtn).toHaveAttribute('aria-pressed', 'true');

    await ctx.close();
  });

  test('verifies reduced-motion timing and accessibility are honored in Automation demo', async ({
    browser,
  }) => {
    const { ctx, page } = await openDevPreview(browser);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('#tab-automation').click();

    // Verify reduced-motion media query matches in browser context
    const prefersReduced = await page.evaluate(
      () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    expect(prefersReduced).toBe(true);

    const startTime = Date.now();
    await page.locator('#panel-automation button[data-action="auto-run"]').click();

    // In reduced motion mode, step progression delay is 20ms instead of 680ms
    // Reaching owner confirmation gate (steps 0 -> 1 -> 2) should complete in under 800ms
    const confirmBtn = page.locator('#panel-automation button[data-action="auto-confirm"]');
    await expect(confirmBtn).toBeVisible({ timeout: 2000 });
    const elapsedMs = Date.now() - startTime;
    expect(elapsedMs).toBeLessThan(800);

    // Verify transition: none is enforced on animated controls under prefers-reduced-motion
    const transitionVal = await page
      .locator('#panel-automation button[data-action="auto-select"]')
      .first()
      .evaluate((el) => window.getComputedStyle(el).transition);
    expect(transitionVal).toMatch(/none|0s/);

    await ctx.close();
  });

  test('verifies state preservation across mode switches (Seat #5 R-02 invariant)', async ({
    browser,
  }) => {
    const { ctx, page } = await openDevPreview(browser);

    // 1. In Web apps: advance to Step 2 with specific choices
    await page.locator('#tab-webapp').click();
    await page.locator('#panel-webapp button:has-text("Wiring check")').click();
    await page.locator('#panel-webapp button:has-text("Continue")').click();
    await expect(page.locator('#app-main')).toContainText('STEP 2 OF 3');
    await page.locator('#panel-webapp button:has-text("Monday")').click();

    // 2. Switch to CRM: assign technician on Ravi and verify history entry
    await page.locator('#tab-crm').click();
    await page.locator('#panel-crm tbody tr button:has-text("Ravi")').click();
    await page.locator('#panel-crm select[aria-label="Assign technician"]').selectOption('Suresh');
    await expect(
      page.locator('#panel-crm aside[aria-label="Request detail inspection"] [role="status"]')
    ).toContainText('Technician assigned to Suresh. Nothing is saved.');
    await expect(
      page.locator('#panel-crm aside[aria-label="Request detail inspection"] ol li').filter({ hasText: 'Assigned to Suresh (demo)' })
    ).toBeVisible();

    // 3. Switch to Automation: run and reach Human Gate 1 (Confirm visit)
    await page.locator('#tab-automation').click();
    await page.locator('#panel-automation button[data-action="auto-run"]').click();
    await expect(
      page.locator('#panel-automation button[data-action="auto-confirm"]')
    ).toBeVisible({ timeout: 5000 });

    // 4. Switch back to Web apps: verify it is STILL on Step 2 with Monday selected!
    await page.locator('#tab-webapp').click();
    await expect(page.locator('#app-main')).toContainText('STEP 2 OF 3');
    await expect(page.locator('#panel-webapp button:has-text("Monday")')).toHaveAttribute('aria-pressed', 'true');

    // 5. Switch back to CRM: verify Suresh is STILL assigned to Ravi and history entry persists!
    await page.locator('#tab-crm').click();
    const techVal = await page.locator('#panel-crm select[aria-label="Assign technician"]').inputValue();
    expect(techVal).toBe('Suresh');
    await expect(
      page.locator('#panel-crm aside[aria-label="Request detail inspection"] ol li').filter({ hasText: 'Assigned to Suresh (demo)' })
    ).toBeVisible();

    // 6. Switch back to Automation: verify "Confirm visit" button and waiting state STILL persist!
    await page.locator('#tab-automation').click();
    await expect(
      page.locator('#panel-automation button[data-action="auto-confirm"]')
    ).toBeVisible();
    await expect(page.locator('#auto-status')).toHaveText('Waiting for owner to confirm the visit.');

    await ctx.close();
  });

  test('verifies inactive showroom panels are hidden with display:none and excluded from keyboard traversal', async ({
    browser,
  }) => {
    const { ctx, page } = await openDevPreview(browser);

    // Initial state: Websites tab is active
    await expect(page.locator('#panel-website')).toBeVisible();
    const activeDisplay = await page.locator('#panel-website').evaluate((el) => window.getComputedStyle(el).display);
    expect(activeDisplay).not.toBe('none');

    // Inactive panels must be truly hidden with computed display: none
    const inactivePanelIds = ['#panel-webapp', '#panel-crm', '#panel-automation', '#panel-store', '#panel-learning'];
    for (const id of inactivePanelIds) {
      const panel = page.locator(id);
      await expect(panel).toBeHidden();
      await expect(panel).toHaveAttribute('hidden');
      const display = await panel.evaluate((el) => window.getComputedStyle(el).display);
      expect(display).toBe('none');

      // Verify interactive elements within inactive panels are hidden
      const focusableCount = await panel.locator('button, a, input, select, textarea').count();
      for (let i = 0; i < focusableCount; i++) {
        const item = panel.locator('button, a, input, select, textarea').nth(i);
        await expect(item).toBeHidden();
      }
    }

    await ctx.close();
  });

  test('verifies interactive behaviors in Online Store demo (filtering, details, cart drawer, checkout, and dialog a11y)', async ({
    browser,
  }) => {
    const { ctx, page } = await openDevPreview(browser);

    // Navigate to Store tab
    const storeTab = page.locator('#tab-store');
    await storeTab.click();
    await expect(storeTab).toHaveAttribute('aria-selected', 'true');
    const panel = page.locator('#panel-store');
    await expect(panel).toBeVisible();

    // Verify Brand and initial state
    await expect(panel.locator('header')).toContainText('Example Home Supplies');
    await expect(panel.locator('button[data-action="store-cart"]')).toContainText('Cart (0)');

    // 1. Category Filtering
    const plumbingFilter = panel.locator('nav[role="group"] button[data-action="store-filter"][data-filter="Plumbing"]');
    await plumbingFilter.click();
    await expect(plumbingFilter).toHaveAttribute('aria-pressed', 'true');
    // Only Basin tap and Pipe tape pack should be visible
    const visibleCards = panel.locator('article');
    await expect(visibleCards).toHaveCount(2);
    await expect(visibleCards.nth(0)).toContainText('Basin tap');
    await expect(visibleCards.nth(1)).toContainText('Pipe tape pack');

    // Reset filter to All
    const allFilter = panel.locator('nav[role="group"] button[data-action="store-filter"][data-filter="All"]');
    await allFilter.click();
    await expect(visibleCards).toHaveCount(6);

    // 2. Inline Product Detail Toggle
    const viewTapBtn = panel.locator('button[data-action="store-view"][data-id="tap"]');
    await viewTapBtn.click();
    const detailBox = panel.locator('[class*="storeDetail"]');
    await expect(detailBox).toBeVisible();
    await expect(detailBox).toContainText('Basin tap');
    await expect(detailBox).toContainText('Plumbing · Sample ₹450');

    // Close detail box
    const closeDetailBtn = panel.locator('button[data-action="store-close-detail"]');
    await closeDetailBtn.click();
    await expect(panel.locator('button[data-action="store-close-detail"]')).toHaveCount(0);

    // 3. Cart Drawer & Quantity Controls
    const addTapBtn = panel.locator('button[data-action="store-add"][data-id="tap"]');
    await addTapBtn.click();

    // Drawer should open automatically
    const drawer = panel.locator('aside[role="dialog"]');
    await expect(drawer).toBeVisible();
    await expect(drawer.locator('#cart-title')).toHaveText('Your cart');
    await expect(panel.locator('button[data-action="store-cart"]')).toContainText('Cart (1)');

    // Verify item and initial total
    await expect(drawer).toContainText('Basin tap');
    await expect(drawer).toContainText('₹450');

    // Increase quantity (+)
    const incBtn = drawer.locator('button[data-action="store-increase"][data-id="tap"]');
    await incBtn.click();
    await expect(drawer.locator('b')).toHaveText('2');
    await expect(drawer).toContainText('₹900');
    await expect(panel.locator('button[data-action="store-cart"]')).toContainText('Cart (2)');

    // Decrease quantity (−)
    const decBtn = drawer.locator('button[data-action="store-decrease"][data-id="tap"]');
    await decBtn.click();
    await expect(drawer.locator('b')).toHaveText('1');
    await expect(drawer).toContainText('₹450');

    // 4. Keyboard Escape dismisses drawer and returns focus
    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();
    await expect(panel.locator('button[data-action="store-cart"]')).toBeFocused();

    // 5. Reopen cart, checkout simulation, and completion state
    await panel.locator('button[data-action="store-cart"]').click();
    await expect(drawer).toBeVisible();

    const checkoutBtn = drawer.locator('button[data-action="store-checkout"]');
    await checkoutBtn.click();

    // Verify Order Completion screen
    await expect(drawer.locator('#cart-title')).toHaveText('Demo order');
    await expect(drawer).toContainText('EXAMPLE-ORDER-001');
    await expect(drawer).toContainText('Nothing was bought and no payment was taken.');

    // Click "Keep browsing" to reset cart
    const finishBtn = drawer.locator('button[data-action="store-finish"]');
    await finishBtn.click();
    await expect(drawer).toBeHidden();
    await expect(panel.locator('button[data-action="store-cart"]')).toContainText('Cart (0)');

    await ctx.close();
  });

  test('verifies interactive behaviors in Learning Platform demo (lessons, navigation, progress, quiz, and completion)', async ({
    browser,
  }) => {
    const { ctx, page } = await openDevPreview(browser);

    // Navigate to Learning tab
    const learningTab = page.locator('#tab-learning');
    await learningTab.click();
    await expect(learningTab).toHaveAttribute('aria-selected', 'true');
    const panel = page.locator('#panel-learning');
    await expect(panel).toBeVisible();

    // Verify Brand and initial state
    await expect(panel).toContainText('Example Learning Hub');
    await expect(panel).toContainText('0 of 3 lessons complete');

    // 1. Select Lesson 2 ("Using a keyboard and mouse")
    const lesson2Btn = panel.locator('button[data-action="learn-lesson"][data-index="1"]');
    await lesson2Btn.click();
    await expect(lesson2Btn).toHaveAttribute('aria-pressed', 'true');
    await expect(panel.locator('h3:has-text("Using a keyboard and mouse")')).toBeVisible();

    // 2. Mark Lesson 2 as complete
    const completeBtn = panel.locator('button[data-action="learn-complete"]');
    await expect(completeBtn).toHaveText('Mark lesson as complete');
    await completeBtn.click();
    await expect(completeBtn).toHaveText('Lesson completed ✓');
    await expect(panel).toContainText('1 of 3 lessons complete');

    // Mark Lesson 1 complete
    await panel.locator('button[data-action="learn-lesson"][data-index="0"]').click();
    await panel.locator('button[data-action="learn-complete"]').click();
    await expect(panel).toContainText('2 of 3 lessons complete');

    // Mark Lesson 3 complete
    await panel.locator('button[data-action="learn-lesson"][data-index="2"]').click();
    await panel.locator('button[data-action="learn-complete"]').click();
    await expect(panel).toContainText('3 of 3 lessons complete');

    // 3. Quiz Interaction
    const checkQuizBtn = panel.locator('button[data-action="learn-quiz-check"]');
    const quizResult = panel.locator('#learn-quiz-result');

    // Unanswered check
    await checkQuizBtn.click();
    await expect(quizResult).toHaveText('Choose an answer.');

    // Incorrect choice ("Enter")
    await panel.locator('input[name="lesson-quiz"][value="Enter"]').check();
    await checkQuizBtn.click();
    await expect(quizResult).toHaveText('Not quite. Try again.');

    // Course completion banner must NOT appear while quiz is incorrect
    await expect(panel.locator('div[role="status"]:has-text("Course complete (sample)")')).toHaveCount(0);

    // Correct choice ("Space bar")
    await panel.locator('input[name="lesson-quiz"][value="Space bar"]').check();
    await checkQuizBtn.click();
    await expect(quizResult).toHaveText('Correct.');

    // 4. Course Completion Banner should now appear!
    const completeBanner = panel.locator('div[role="status"]:has-text("Course complete (sample)")');
    await expect(completeBanner).toBeVisible();
    await expect(completeBanner).toContainText('This is a sample record, not a real certificate or qualification.');

    // 5. View Switch to Progress
    const progressNavBtn = panel.locator('button[data-action="learn-view"][data-view="Progress"]').first();
    await progressNavBtn.click();
    await expect(panel).toContainText('3 completed sample lessons. Quiz: correct.');

    // 6. Reset ("Start again")
    const resetBtn = panel.locator('button[data-action="learn-reset"]');
    await resetBtn.click();
    await expect(panel).toContainText('0 of 3 lessons complete');
    await expect(panel.locator('div[role="status"]:has-text("Course complete (sample)")')).toHaveCount(0);

    await ctx.close();
  });

  test('verifies state preservation across all six showroom demonstration tabs', async ({ browser }) => {
    const { ctx, page } = await openDevPreview(browser);

    // 1. In Store: Add an item (LED bulb pack) to cart
    await page.locator('#tab-store').click();
    await page.locator('#panel-store button[data-action="store-add"][data-id="bulb"]').click();
    await expect(page.locator('#panel-store button[data-action="store-cart"]')).toContainText('Cart (1)');
    await page.keyboard.press('Escape'); // close drawer

    // 2. In Learning: Mark Lesson 1 complete
    await page.locator('#tab-learning').click();
    await page.locator('#panel-learning button[data-action="learn-complete"]').click();
    await expect(page.locator('#panel-learning')).toContainText('1 of 3 lessons complete');

    // 3. Switch through Website, Web App, CRM, Automation
    await page.locator('#tab-website').click();
    await expect(page.locator('#panel-website')).toBeVisible();

    await page.locator('#tab-webapp').click();
    await expect(page.locator('#panel-webapp')).toBeVisible();

    await page.locator('#tab-crm').click();
    await expect(page.locator('#panel-crm')).toBeVisible();

    await page.locator('#tab-automation').click();
    await expect(page.locator('#panel-automation')).toBeVisible();

    // 4. Switch back to Store: Verify cart still has 1 item!
    await page.locator('#tab-store').click();
    await expect(page.locator('#panel-store button[data-action="store-cart"]')).toContainText('Cart (1)');

    // 5. Switch back to Learning: Verify 1 of 3 lessons complete is preserved!
    await page.locator('#tab-learning').click();
    await expect(page.locator('#panel-learning')).toContainText('1 of 3 lessons complete');

    await ctx.close();
  });

  test('verifies mobile scrolling and sticky header layout behavior without demonstration overlap in normal viewing', async ({
    browser,
  }) => {
    // Normal viewing mode (cleanCapture: false by default)
    const { ctx, page } = await openDevPreview(browser, { width: 375, height: 667 });

    // Verify header exists and is visible at top of viewport
    const header = page.locator('#navbar-root');
    await expect(header).toBeVisible();

    // Verify showroom section is rendered below hero
    const showroom = page.locator('#showroom');
    await expect(showroom).toBeVisible();

    // Scroll to showroom section
    await showroom.scrollIntoViewIfNeeded();

    // Verify document does not suffer from horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Verify tabs are clickable and interactive while scrolled
    const webappTab = page.locator('#tab-webapp');
    await webappTab.click();
    await expect(webappTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#panel-webapp')).toBeVisible();

    await ctx.close();
  });
});
