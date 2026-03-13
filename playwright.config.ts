import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'always' }],
    ['list']
  ],
  use: {
    headless: false,
    navigationTimeout: 60000,
    actionTimeout: 15000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
      use: { headless: true },
    },
    {
      name: 'authenticated',
      testIgnore: /auth\.setup\.ts/,
      dependencies: ['setup'],
      use: { headless: true },
    },
  ],
});