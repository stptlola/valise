import { defineConfig, devices } from "@playwright/test";

const port = 3300;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    // En local, un Chromium déjà installé peut être indiqué ici ; la CI installe le sien.
    launchOptions: process.env.PW_CHROMIUM
      ? { executablePath: process.env.PW_CHROMIUM }
      : {},
  },
  projects: [
    { name: "ordinateur", use: { ...devices["Desktop Chrome"] } },
    { name: "téléphone", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `PORT=${port} HOSTNAME=127.0.0.1 npm run serve`,
    url: `http://127.0.0.1:${port}/api/health`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
