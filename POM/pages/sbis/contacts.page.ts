import { type Page, expect, Locator } from "@playwright/test";
import { SbisBasePage } from "@pages/sbis/base.page";

export class SbisContactsPage extends SbisBasePage {
  public baseTitle: string;
  readonly tensorBanner: Locator;
  readonly selectedRegion: Locator;
  readonly selectRegionHeader: Locator;
  // readonly choiseRegionRendered: Locator
  // readonly regionLinkCSSSelector: Locator
  readonly partnerItemLink: Locator;
  readonly allRegions: Locator;

  constructor(page: Page) {
    super(page);
    this.pageURL = this.sbisURL + "/contacts";
    this.baseTitle = "СБИС Контакты — ";

    this.tensorBanner = this.page.locator("(//a[@title='tensor.ru']//img)[1]");
    this.selectedRegion = this.page.locator("//div[div[h2[text()='Контакты']]]//span/span");
    this.selectRegionHeader = this.page.getByRole("heading", { name: "Выберите свой регион" });
    this.allRegions = this.page.locator("//div[@name='dialog']//li");
    // this.regionLinkCSSSelector = this.page.locator('span.sbis_ru-link[title*="{}"]')
    this.partnerItemLink = this.page.locator("#city-id-2");
  }

  public async assertPageOpened() {
    await expect(this.page).toHaveURL(this.pageURL);
    await expect(this.page).not.toHaveURL(this.pageURL);
  }

  public async assertSelectedRegion(region: string) {
    await expect(this.selectedRegion).toContainText(region);
  }

  public async assertRegionListLoaded() {
    await expect(this.selectRegionHeader).toBeVisible();
    await expect(this.allRegions).toHaveCount(90);
  }

  public async assertPartnerCity(city: string) {
    await expect(this.partnerItemLink).toContainText(city);
  }

  public async assertTitleContainsRegions(region) {
    const re = new RegExp(region, "g");
    await expect(this.page).toHaveTitle(re);
  }

  public async assertURLContainsRegions(region) {
    const re = new RegExp(region, "g");
    await expect(this.page).toHaveURL(re);
  }

  public async selectRegionFromList(region: string) {
    await this.assertRegionListLoaded();
    await this.allRegions.filter({ hasText: region }).click();
  }
}
export default SbisContactsPage;
