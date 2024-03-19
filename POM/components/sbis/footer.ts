import { type Page, type Locator } from "@playwright/test";

export class SbisFooter {
    readonly page: Page;
    readonly sbisDownloadLink: Locator;
    readonly loginItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sbisDownloadLink = page.getByRole('link').getByText('Скачать локальные версии', { exact: true })
    }
}

export default SbisFooter;
