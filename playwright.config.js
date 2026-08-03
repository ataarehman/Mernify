// @ts-check
const { defineConfig, devices } = require('@playwright/test')

/**
 * Playwright configuration for Mernify AI chat tests.
 * Run: npx playwright test
 * Headed: npx playwright test --headed
 * UI mode: npx playwright test --ui
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: 1,
  reporter: [['html', { open: 'never' }], ['line']],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  // Start dev server automatically when running tests locally
  webServer: {
    command: 'npx vite --port 5173',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 60_000,
    env: {
      VITE_MERNIFY_AI_ENABLED: 'true',
    },
  },
})
