import { type Page, type Locator } from "@playwright/test";

export class SbisHeader {
    readonly page: Page;
    readonly headerBaseLocator: Locator
    readonly contactsLink: Locator;


    constructor(page: Page) {
        this.page = page;
        this.headerBaseLocator = this.page.locator("//div[@class='sbisru-Header']")
        this.contactsLink = this.headerBaseLocator.getByRole('link').getByText('Контакты', { exact: true })
    }
}

export default SbisHeader;
