import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';
import os from 'os';
import path from 'path';

// M08-B Dedicated Isolated Development-Browser Test Configuration
// Runs against local or CI temporary development preview server (PW_DEV_URL, default http://127.0.0.1:3005).
// Strictly Chromium-only to avoid corrupting production Playwright test lane.

const DEV_PORT = Number(process.env.PW_DEV_PORT ?? 3005);
const DEV_URL = process.env.PW_DEV_URL ?? `http://127.0.0.1:${DEV_PORT}`;

const cachedChromium =
  process.env.PW_CHROMIUM_PATH ??
  path.join(os.homedir(), '.cache/ms-playwright/chromium-1228/chrome-linux64/chrome');

export default defineConfig({
  testDir: './e2e',
  testMatch: /m08-.*\.spec\.ts/,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 60_000,
  reporter: [['list']],
  use: {
    baseURL: DEV_URL,
    trace: 'off',
    screenshot: 'off',
  },
  projects: [
    {
      name: 'chromium-dev',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: fs.existsSync(cachedChromium) ? { executablePath: cachedChromium } : {},
      },
    },
  ],
});
