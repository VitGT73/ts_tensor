import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";
// import Env from "@config/env";

if (process.env.ENV) {
  config({
    path: `.env.${process.env.ENV}`,
    override: true,
  });
} else {
  config();
}

export default defineConfig({
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
  // reporter: [["html"]],
  // reporter: [["list"], ['html', { open: 'never' }], ['allure-playwright', { outputFolder: 'allure-results' }]],
  reporter: process.env.CI
    ? [["github"], ["list"], ["html", { open: "never" }], ["allure-playwright"]]
    : [["list"], ["html"], ["allure-playwright"]],
  // globalTeardown: require.resolve('./utils/config/global-teardown'),
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
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
});

// get the environment type from command line. If none, set it to stage
// const environment = process.env.TEST_ENV || "stage";

// // config object with default configuration and environment specific configuration
// const config: TestConfig = {
//   ...defaultConfig,
//   ...(environment === "prod" ? prodConfig : environment === "stage" ? stageConfig : devConfig),
// };

// export default config;
