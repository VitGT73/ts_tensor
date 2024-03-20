import { test } from "@fixtures/pages.fixtures";

test.describe("Пользовательский сценарий №1", () => {
  // test.beforeEach(async ({ page, homePage }) => {
  //   await homePage.load();
  // });

  test("Изменение региона на 'Камчатский край'", async ({ sbisHomePage, sbisContactsPage }) => {
    // Expect a title "to contain" a substring.
    await sbisHomePage.open();
    await sbisHomePage.assertPageUrl();
    await sbisHomePage.header.contactsLink.click();
    await sbisContactsPage.assertPageUrl();
    await sbisContactsPage.assertSelectedRegion();
    await sbisContactsPage.selectedRegion.click();
    await sbisContactsPage.assertRegionListLoaded();
    await sbisContactsPage.selectRegionFromList("Камчатский край");
    await sbisContactsPage.assertSelectedRegion("Камчатский край");
    await sbisContactsPage.assertPartnerCity("Петропавловск-Камчатский");
    await sbisContactsPage.assertTitleContainsRegions("Камчатский край");
    await sbisContactsPage.assertURLContainsRegions("41-kamchatskij-kraj");
  });
});
