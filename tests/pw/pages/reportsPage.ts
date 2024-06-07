import { Page } from '@playwright/test';
import { BasePage } from '@pages/basePage';
import { selector } from '@pages/selectors';
import { data } from '@utils/testData';

// selectors
const reports = selector.admin.wepos.reports;

export class Reports extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // navigation

    async goToReports() {
        await this.goIfNotThere(data.subUrls.backend.wepos.reports);
    }

    // reports render properly
    async reportsRenderProperly() {
        await this.goToReports();

        await this.toBeVisible(reports.reportText);
        await this.toBeVisible(reports.exportReport);

        // check if overview elements are  visible
        await this.multipleElementVisible(reports.overview);

        // todo: add more checks
    }

    // filter report
    async filterReport() {
        await this.goToReports();
        await this.click(reports.filterReport);
        // todo : add swithch for filter options
    }

    // clear filter
    async clearFilter() {
        await this.goToReports();
        await this.click(reports.filterReport);
        await this.click(reports.filters.reset); //todo: click and wait for multiple requests
    }

    // export report
    async exportReport() {
        await this.goToReports();
        await this.clickAndWaitForDownload(reports.exportReport);
    }
}
