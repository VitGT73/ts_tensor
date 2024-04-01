import { test } from "@fixtures/pages.fixtures";
import { deleteDirectory } from "@helpers/file.utilities";

test.describe("Пользовательский сценарий №1", () => {
  test.beforeAll(async () => {
    // Пример использования:
    const directoryPath = "./downloads";
    await deleteDirectory(directoryPath);
  });

  test("Сохранение файла в папку /dowloads", async ({ sbisHomePage, sbisDownloadsPage }) => {
    // Expect a title "to contain" a substring.
    await sbisHomePage.open();
    await sbisHomePage.footer.sbisDownloadLink.click();

    await sbisDownloadsPage.assertPageUrl();
    await sbisDownloadsPage.clickSbisPluginTab();
    await sbisDownloadsPage.assertPluginTabIsOpen();
    await sbisDownloadsPage.clickWebInstallerLink();
    await sbisDownloadsPage.assertWebInstallerFileSize();
  });
});
