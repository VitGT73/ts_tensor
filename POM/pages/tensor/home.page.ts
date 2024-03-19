import { type Page, Locator, expect } from "@playwright/test";
import { TensorBasePage } from '@pages/tensor/base.page';

export class TensorHomePage extends TensorBasePage {
    public powerInPeopleBlock: Locator
    public aboutLink: Locator

    constructor(page: Page) {
        super(page);
        this.pageURL = this.tensorURL;
        this.pageTitle = 'Тензор — IT-компания'

        this.powerInPeopleBlock = this.page.locator("//div[p[text()='Сила в людях']]")
        this.aboutLink = this.powerInPeopleBlock.getByRole('link', { name: 'Подробнее' })
    }

    public async assertPowerInPeopleBlockIsPresent() {
        await expect(this.powerInPeopleBlock).toBeAttached()
    }

    public async assertPageTitleByLocator(): Promise<void> {
        await expect(this.page.locator('//title')).toContainText(this.pageTitle)

    }
}

export default TensorHomePage;
