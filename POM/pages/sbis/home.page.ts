import { type Page } from "@playwright/test";
import { SbisBasePage } from '@pages/sbis/base.page';

export class SbisHomePage extends SbisBasePage {
  constructor(page: Page) {
    super(page);
    this.pageURL = this.sbisURL;
    this.pageTitle = 'СБИС — экосистема для бизнеса: учет, управление и коммуникации'
  }
}

export default SbisHomePage;
