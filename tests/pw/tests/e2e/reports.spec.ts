import { test, Page } from '@playwright/test';
import { Reports } from '@pages/reportsPage';
import { data } from '@utils/testData';

test.describe('Reports test', () => {
    let admin: Reports;
    // let aPage: Page;

    test.use(data.auth.adminAuth);

    // test.beforeAll(async ({ browser }) => {
    //     const adminContext = await browser.newContext(data.auth.adminAuth);
    //     aPage = await adminContext.newPage();
    //     admin = new ViewPos(aPage);
    // });

    // test.afterAll(async () => {
    //     await cPage.close();
    // });

    test.beforeEach(async ({ page }) => {
        admin = new Reports(page);
    });

    test('admin can view report', { tag: ['@pro'] }, async () => {
        await admin.reportsRenderProperly();
    });

    // test('admin can filter report by payment method', { tag: ['@pro'] }, async () => {
    //     await admin.filterReport();
    // });

    test('admin can clear filter', { tag: ['@pro'] }, async () => {
        await admin.clearFilter();
    });

    test('admin can export sales report', { tag: ['@pro'] }, async () => {
        await admin.exportReport();
    });
});
