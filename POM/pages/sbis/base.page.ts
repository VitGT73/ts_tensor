import { type Page, expect } from "@playwright/test";
import Env from "@helpers/env";
import { SbisFooter } from "@components/sbis/footer";
import { SbisHeader } from "@components/sbis/header";

export class SbisBasePage {
  readonly page: Page;
  readonly sbisURL: string;
  public pageURL: string;
  public pageTitle: string;
  readonly footer: SbisFooter;
  readonly header: SbisHeader;

  constructor(page: Page) {
    this.page = page;
    this.sbisURL = Env.SBIS_URL;
    this.footer = new SbisFooter(page);
    this.header = new SbisHeader(page);
  }

  public async open() {
    await this.page.goto(this.pageURL, { waitUntil: "load" });
  }

  public async assertPageTitle() {
    await expect(this.page).toHaveTitle(this.pageTitle);
  }

  public async assertPageUrl() {
    await expect(this.page).toHaveURL(this.pageURL);
  }
}

export default SbisBasePage;
