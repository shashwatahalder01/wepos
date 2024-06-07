import { test, Page } from '@playwright/test';
import { Outlets } from '@pages/outletPage';
import { data } from '@utils/testData';

test.describe('Outlets test', () => {
    let admin: Outlets;
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
        admin = new Outlets(page);
    });

    test('admin can view outlets', { tag: ['@pro'] }, async () => {
        await admin.outletsRenderProperly();
    });

    test('admin can add outlet', { tag: ['@pro'] }, async () => {
        await admin.addOutlet(data.predefined.simpleProduct.product1.name);
    });

    test('admin can edit outlet', { tag: ['@pro'] }, async () => {
        await admin.editOutlet('Uncategorized');
    });

    test('admin can delete outlet', { tag: ['@pro'] }, async () => {
        await admin.deleteOutlet('Uncategorized');
    });

    test('admin can add counter', { tag: ['@pro'] }, async () => {
        await admin.addCounter('list');
    });

    test('admin can edit counter', { tag: ['@pro'] }, async () => {
        await admin.editCounter(data.predefined.customerInfo.fullName);
    });

    test('admin can delete counter', { tag: ['@pro'] }, async () => {
        await admin.deleteCounter(data.customerDetails());
    });

    test('admin can assign new cashier', { tag: ['@pro'] }, async () => {
        await admin.addCashier();
    });

    test('admin can assign existing cashier', { tag: ['@pro'] }, async () => {
        await admin.addCashier();
    });

    test('admin can delete cashier', { tag: ['@pro'] }, async () => {
        await admin.deleteCashier();
    });
});
