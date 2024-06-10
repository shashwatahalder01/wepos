import { Page } from '@playwright/test';
import { BasePage } from '@pages/basePage';
import { selector } from '@pages/selectors';
import { data } from '@utils/testData';

// selectors
const receipts = selector.admin.wepos.receipts;

export class Receipts extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // navigation

    async goToReceipts() {
        await this.goIfNotThere(data.subUrls.backend.wepos.receipts);
    }

    // receipts render properly
    async receiptsRenderProperly() {
        await this.goToReceipts();

        await this.toBeVisible(receipts.reportText);
        await this.toBeVisible(receipts.exportReport);

        // check if overview elements are  visible
        await this.multipleElementVisible(receipts.overview);

        // todo: add more checks
    }

    // set receipt logo
    async setReceiptLogo() {
        await this.goToReceipts();
        await this.click(receipts.filterReport);
        // todo : add swithch for filter options
    }

    // ser receipt style
    async setReceiptStyle() {
        await this.goToReceipts();
        await this.click(receipts.filterReport);
        await this.click(receipts.filters.reset); //todo: click and wait for multiple requests
    }

    // ser receipt header details
    async setReceiptHeaderDetails() {
        await this.goToReceipts();
        await this.clickAndWaitForDownload(receipts.exportReport);
    }

    // ser receipt header details
    async setReceiptItemDetails() {
        await this.goToReceipts();
        await this.clickAndWaitForDownload(receipts.exportReport);
    }

    // ser receipt header details
    async setReceiptFooterDetails() {
        await this.goToReceipts();
        await this.clickAndWaitForDownload(receipts.exportReport);
    }
}
