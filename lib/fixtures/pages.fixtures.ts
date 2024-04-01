import { test as base } from "@playwright/test";

import SbisHomePage from "@pages/sbis/home.page";
import SbisContactsPage from "@pages/sbis/contacts.page";
import SbisDownloadsPage from "@pages/sbis/downloads.page";
import TensorHomePage from "@pages/tensor/home.page";
import TensorAboutPage from "@pages/tensor/about.page";

export interface myPages {
  sbisHomePage: SbisHomePage;
  sbisContactsPage: SbisContactsPage;
  sbisDownloadsPage: SbisDownloadsPage;
  tensorHomePage: TensorHomePage;
  tensorAboutPage: TensorAboutPage;
}

export const test = base.extend<myPages>({
  sbisHomePage: async ({ page }, use) => {
    const sbisHomePage = new SbisHomePage(page);
    await use(sbisHomePage);
  },

  sbisContactsPage: async ({ page }, use) => {
    const sbisContactsPage = new SbisContactsPage(page);
    await use(sbisContactsPage);
  },

  sbisDownloadsPage: async ({ page }, use) => {
    const sbisDownloadsPage = new SbisDownloadsPage(page);
    await use(sbisDownloadsPage);
  },

  tensorHomePage: async ({ page }, use) => {
    const tensorHomePage = new TensorHomePage(page);
    await use(tensorHomePage);
  },

  tensorAboutPage: async ({ page }, use) => {
    const tensorAboutPage = new TensorAboutPage(page);
    await use(tensorAboutPage);
  },
});

export { expect } from "@playwright/test";
