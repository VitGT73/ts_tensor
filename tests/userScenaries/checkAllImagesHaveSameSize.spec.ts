// import { test, expect } from '@playwright/test';
import { test, expect } from "@fixtures/pages.fixtures";

test.describe("Сравнение размеров картинок в блоке 'Работаем'", () => {
  // test.beforeEach(async ({ page, homePage }) => {
  //   await homePage.load();
  // });

  test("Открываем сайт 'https://tensor.ru/' в новой вкладке", async ({
    sbisHomePage,
    sbisContactsPage,
    tensorHomePage,
    // tensorAboutPage
  }) => {
    await sbisHomePage.open();
    await sbisHomePage.assertPageUrl();
    await sbisHomePage.header.contactsLink.click();
    await sbisContactsPage.assertPageUrl();
    const pagePromise = sbisContactsPage.page.context().waitForEvent("page");
    await sbisContactsPage.tensorBanner.click();
    const newPage = await pagePromise;
    // await expect(newPage).toHaveURL('https://tensor.ru/')

    // const np = await newPage.innerHTML('//head');
    // console.log(np)
    // await newPage.bringToFront()
    await expect(newPage.locator("//div[p[text()='Сила в людях']]")).toBeVisible();
    // await expect(newPage.locator('//title')).toContainText('Тензор — IT-компания')

    await tensorHomePage.initPage(newPage);
    // tensorAboutPage.initPage(newPage)
    await tensorHomePage.assertPageUrl();
    await tensorHomePage.assertPageTitle();
    // await tensorHomePage.assertPageTitleByLocator();

    // const bd = await newPage.innerHTML('//body');
    // console.log(bd)

    // console.log(tensorHomePage.pageURL)
    // await tensorHomePage.aboutLink.click()
    // await tensorAboutPage.assertPageUrl();
  });

  test("Сравниваем размеры картинок", async ({ tensorHomePage, tensorAboutPage }) => {
    await tensorHomePage.open();
    await tensorHomePage.assertPageUrl();
    await tensorHomePage.aboutLink.click();
    await tensorAboutPage.assertPageUrl();
    await tensorAboutPage.assertWorkingBlockIsPresent();
    await tensorAboutPage.assertAllImagesHaveSameSize();
  });
});
