import { test, expect, type Browser } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// M08-B Showroom Demos Development Browser Verification & 36-Screenshot Matrix
// Runs against local dev preview server (PW_DEV_URL, default http://127.0.0.1:3005).

const DEV_BASE_URL = process.env.PW_DEV_URL ?? 'http://127.0.0.1:3005';
const SCREENSHOT_DIR = path.join(process.cwd(), 'test-results', 'm08-screenshots');

const MODES = ['website', 'webapp', 'crm'] as const;
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
  opts: { theme?: 'dark' | 'light'; width?: number; height?: number } = {}
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
  return { ctx, page, errors, status: response?.status() };
}

test.describe('M08-B Showroom Demos Verification', () => {
  test.skip(!process.env.PW_DEV_URL, 'Runs against active local development preview server (PW_DEV_URL)');

  test('captures complete 36-configuration screenshot matrix (3 demos × 6 viewports × 2 themes) with sanitized manifest', async ({
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

    // Verify all 36 configurations were captured
    expect(manifestEntries).toHaveLength(36);

    // Write sanitized manifest (no absolute workstation paths; only relative filenames)
    const manifestPath = path.join(SCREENSHOT_DIR, 'manifest.json');
    const manifestData = {
      description: 'M08-B Showroom 36-Configuration Development Preview Matrix',
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

    // 3. Switch back to Web apps: verify it is STILL on Step 2 with Monday selected!
    await page.locator('#tab-webapp').click();
    await expect(page.locator('#app-main')).toContainText('STEP 2 OF 3');
    await expect(page.locator('#panel-webapp button:has-text("Monday")')).toHaveAttribute('aria-pressed', 'true');

    // 4. Switch back to CRM: verify Suresh is STILL assigned to Ravi and history entry persists!
    await page.locator('#tab-crm').click();
    const techVal = await page.locator('#panel-crm select[aria-label="Assign technician"]').inputValue();
    expect(techVal).toBe('Suresh');
    await expect(
      page.locator('#panel-crm aside[aria-label="Request detail inspection"] ol li').filter({ hasText: 'Assigned to Suresh (demo)' })
    ).toBeVisible();

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
});
