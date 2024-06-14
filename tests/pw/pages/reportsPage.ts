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

    // filter reports
    async filterReports(input: string, action: string) {
        await this.goToReports();
        await this.click(reports.filterReport);

        switch (action) {
            case 'by-paymentMthod':
                await this.click(reports.filters.filterByPaymentMethod);
                await this.clearAndType(reports.filters.filterInput, input);
                await this.pressAndWaitForResponse(data.subUrls.api.wepos.payment, data.key.enter);
                break;

            case 'by-customer':
                await this.click(reports.filters.filterByCustomer);
                await this.clearAndType(reports.filters.filterInput, input);
                await this.pressAndWaitForResponse(data.subUrls.api.wepos.payment, data.key.enter);
                await this.clearFilter();
                break;

            case 'by-outlet':
                await this.click(reports.filters.filterByOutlet);
                await this.clearAndType(reports.filters.filterInput, input);
                await this.pressAndWaitForResponse(data.subUrls.api.wepos.payment, data.key.enter);
                await this.clearFilter();
                break;

            case 'by-cashier':
                await this.click(reports.filters.filterByCashier);
                await this.clearAndType(reports.filters.filterInput, input);
                await this.pressAndWaitForResponse(data.subUrls.api.wepos.payment, data.key.enter);
                await this.clearFilter();
                break;

            default:
                break;
        }

        // const count = (await this.getElementText(abuseReportAdmin.numberOfRowsFound))?.split(' ')[0];  //todo: need to fix
        // expect(Number(count)).toBeGreaterThan(0);

        // await this.clearFilter();
    }

    // clear filter
    async clearFilter() {
        await this.goToReports();
        await this.click(reports.filters.reset); //todo: click and wait for multiple requests

        //todo: assertion
    }

    // export report
    async exportReport() {
        await this.goToReports();
        await this.clickAndWaitForDownload(reports.exportReport);
    }
}
