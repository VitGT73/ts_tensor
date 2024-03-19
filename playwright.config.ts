import { devices } from "@playwright/test";
import { PlaywrightTestConfig } from '@playwright/test';
import { TestConfig } from '@config/testConfig';
import { devConfig } from '@config/env/devConfig';
import { prodConfig } from '@config/env/prodConfig';
import { stageConfig } from '@config/env/stageConfig';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const defaultConfig: PlaywrightTestConfig = {
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html']],
  // reporter: [['html'], ['allure-playwright', { outputFolder: 'allure-results' }]],
  // reporter: process.env.CI ? [["github"], ["list"], ["html"], ["@currents/playwright"]] : [["list"], ["html"]],
  // globalTeardown: require.resolve('./utils/config/global-teardown'),
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
};

// get the environment type from command line. If none, set it to stage
const environment = process.env.TEST_ENV || 'stage';

// config object with default configuration and environment specific configuration
const config: TestConfig = {
  ...defaultConfig,
  ...(environment === 'prod' ? prodConfig : environment === 'stage' ? stageConfig : devConfig),
};

export default config;
