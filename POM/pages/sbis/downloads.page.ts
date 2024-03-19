import { type Page, Locator, expect } from "@playwright/test";
import { getFileSize } from "@helpers/file.utilites"
import { SbisBasePage } from '@pages/sbis/base.page';

export class SbisDownloadsPage extends SbisBasePage {
  private sbisPluginTab: Locator
  private webInstallerLink: Locator
  public pluginLink: Locator
  public pageReady:Locator
  public tabsWrapers: Locator
  public pluginUrlPart: string
  public reportUrlPart: string
  public webInstallerFilePath: string

  constructor(page: Page) {
    super(page);
    this.pageURL = this.sbisURL + '/download';
    this.pageTitle = 'Скачать СБИС и дополнительное ПО'
    this.sbisPluginTab = this.page.locator("//div[@data-id='plugin']")
    this.webInstallerLink = this.page.getByRole('link', { name: 'Скачать (Exe 8.17 МБ)' })

    this.pluginUrlPart = "tab=plugin"
    this.reportUrlPart = "tab=ereport"
    this.webInstallerFilePath = ''
    // await page.locator('div').filter({ hasText: /^СБИС Плагин$/ }).nth(1).click()
  }

  public async assertPluginTabIsOpen() {
    const re = new RegExp(this.pluginUrlPart, 'g')
    await expect(this.page).toHaveURL(re);
  }

  public async assertReportTabIsOpen() {
    const re = new RegExp(this.reportUrlPart, 'g')
    await expect(this.page).toHaveURL(re);
  }

  public async clickWebInstallerLink(){
    const downloadPromise = this.page.waitForEvent('download');
    await this.webInstallerLink.click();
    const download = await downloadPromise;
    this.webInstallerFilePath = download.suggestedFilename()
    await download.saveAs('./downloads/' + this.webInstallerFilePath);
  }

  public async assertWebInstallerFileSize(){
    const filename = await this.getWebInstallerFileName()
    expect(this.webInstallerFilePath).toEqual(filename)
    const fileSize = await getFileSize(this.webInstallerFilePath);
    await expect(fileSize, "Размер файла не соответствует 8.17 МБ").toEqual(8567928)
  }

  public async getWebInstallerFileName(){
    const link = await this.webInstallerLink.getAttribute('href');
    const filename = link.split('/').pop()
    return filename
  }


  // // assert filename
  // expect(download.suggestedFilename()).toBe("my-file.data");
  // // get and assert stats
  // expect((await fs.promises.stat(await download.path() as string)).size).toBeGreaterThan(200);



  public async clickSbisPluginTab(){
    await this.assertReportTabIsOpen()
    await this.sbisPluginTab.click()
  }
}

export default SbisDownloadsPage;