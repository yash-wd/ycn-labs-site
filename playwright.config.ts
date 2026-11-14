import { defineConfig, devices } from "@playwright/test";
import fs from "fs";
import os from "os";
import path from "path";

// YCN-V3 browser regression suite (Owner decision 13 Nov 2026: in the repo, run locally, not in CI).
// Runs against a local production build: `pnpm test:e2e` builds, then Playwright starts
// `next start` on port 3105. Stop the dev server first: dev and build share the .next folder.
//
// Browsers: Chromium uses the cached build on this machine when present (PW_CHROMIUM_PATH
// overrides). Firefox runs from Playwright's download. WebKit needs system libraries
// (`playwright install-deps`, sudo); enable it with PW_WEBKIT=1 on a machine that has them.
const PORT = Number(process.env.PW_PORT ?? 3105);
const cachedChromium =
  process.env.PW_CHROMIUM_PATH ??
  path.join(os.homedir(), ".cache/ms-playwright/chromium-1228/chrome-linux64/chrome");

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 2,
  retries: 0,
  timeout: 60_000,
  reporter: [["list"]],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: "off",
  },
  webServer: {
    command: `pnpm exec next start -H 127.0.0.1 -p ${PORT}`,
    url: `http://127.0.0.1:${PORT}/`,
    reuseExistingServer: false,
    timeout: 60_000,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: fs.existsSync(cachedChromium) ? { executablePath: cachedChromium } : {},
      },
    },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    ...(process.env.PW_WEBKIT === "1" ? [{ name: "webkit", use: { ...devices["Desktop Safari"] } }] : []),
  ],
});
