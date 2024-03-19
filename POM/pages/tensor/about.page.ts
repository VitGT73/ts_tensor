import { type Page, Locator, expect } from "@playwright/test";
import { TensorBasePage } from '@pages/tensor/base.page';

export class TensorAboutPage extends TensorBasePage {
    public powerInPeopleBlock: Locator
    public aboutLink: Locator
    public workingBlock: Locator
    public workingImages: Locator


    constructor(page: Page) {
        super(page);
        this.pageURL = this.tensorURL + '/about';
        this.pageTitle = 'Тензор — IT-компания'

        this.workingBlock = this.page.locator("//div[div[h2[text()='Работаем']]]")
        this.workingImages = this.page.locator("//div[div[h2[text()='Работаем']]]//img")
    }

    public async assertWorkingBlockIsPresent() {
        await expect(this.workingBlock).toBeVisible()
    }

    public async assertAllImagesHaveSameSize() {
        // const allure = require('allure');
        // const allureAttach = allure.attachment;

        // Теперь найдем все изображения внутри этого элемента
        const images = await this.workingImages.all();

        // Получим размер первого изображения
        const firstImage = images[0];
        const firstWidth = await firstImage.getAttribute('width');
        const firstHeight = await firstImage.getAttribute('height');

        for (let i = 1; i < images.length; i++) {
            const image = images[i];
            const width = await image.getAttribute('width');
            const height = await image.getAttribute('height');
            if (width !== firstWidth || height !== firstHeight) {
                // allureAttach("Message", `Image sizes don't match! First: ${firstWidth} x ${firstHeight}, current: ${width} x ${height}`, allure.attachment_type.TEXT);
                throw new Error("Image sizes don't match");
            }
        }

        // allureAttach("Message", `All images are the same size: ${firstWidth} x ${firstHeight}`, allure.attachment_type.TEXT);
    }
}
export default TensorAboutPage;
