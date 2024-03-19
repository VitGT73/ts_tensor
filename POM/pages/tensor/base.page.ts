import { type Page, expect } from "@playwright/test";

export class TensorBasePage {
  public page: Page;
  readonly tensorURL: string;
  public pageURL: string;
  public pageTitle: string;

  constructor(page: Page) {
    this.page = page;
    this.tensorURL = "https://tensor.ru";
  }

  public async open() {
    await this.page.goto(this.pageURL);
  }

  public async assertPageTitle() {
    await expect(this.page).toHaveTitle(this.pageTitle);
  }

  public async assertPageUrl() {
    await expect(this.page).toHaveURL(this.pageURL);
  }

  public async initPage(page: Page) {
    this.page = page;
  }
}

export default TensorBasePage;
