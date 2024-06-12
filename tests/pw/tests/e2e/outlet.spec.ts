import { test, Page, request } from '@playwright/test';
import { Outlets } from '@pages/outletPage';
import { ApiUtils } from '@utils/apiUtils';
import { data } from '@utils/testData';
import { payloads } from '@utils/payloads';

test.describe('Outlets test', () => {
    let admin: Outlets;
    // let aPage: Page;
    let apiUtils: ApiUtils;
    let outletId: string;
    let outletName: string;
    let counterName: string;
    let cashierName: string;

    test.use(data.auth.adminAuth);

    test.beforeAll(async ({ browser }) => {
        //     const adminContext = await browser.newContext(data.auth.adminAuth);
        //     aPage = await adminContext.newPage();
        //     admin = new ViewPos(aPage);

        apiUtils = new ApiUtils(await request.newContext());
        [, outletId, outletName] = await apiUtils.createOutlet(payloads.createOutlet(), payloads.adminAuth);
        [, , counterName] = await apiUtils.createCounter(outletId, payloads.createCounter(), payloads.adminAuth);
        [, , cashierName] = await apiUtils.createCashier(outletId, payloads.createCashier(), payloads.adminAuth);
    });

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
        await admin.addOutlet(data.outlet());
    });

    test('admin can edit outlet', { tag: ['@pro'] }, async () => {
        const [, , outletName] = await apiUtils.createOutlet(payloads.createOutlet(), payloads.adminAuth);
        await admin.editOutlet(outletName, data.outlet());
    });

    test('admin can delete outlet', { tag: ['@pro'] }, async () => {
        const [, , outletName] = await apiUtils.createOutlet(payloads.createOutlet(), payloads.adminAuth);
        await admin.deleteOutlet(outletName);
    });

    test('admin can add counter', { tag: ['@pro'] }, async () => {
        await admin.addCounter(outletName, data.counter());
    });

    test('admin can edit counter', { tag: ['@pro'] }, async () => {
        await admin.editCounter(counterName, data.counter());
    });

    test('admin can delete counter', { tag: ['@pro'] }, async () => {
        const [, , counterName] = await apiUtils.createCounter(outletId, payloads.createCounter(), payloads.adminAuth);
        await admin.deleteCounter(counterName);
    });

    test('admin can assign new cashier', { tag: ['@pro'] }, async () => {
        await admin.addCashier(outletName, { ...data.cashier(), firstName: '' });
    });

    test('admin can assign existing cashier', { tag: ['@pro'] }, async () => {
        await admin.addCashier(outletName, cashierName, true);
    });

    test('admin can delete cashier', { tag: ['@pro'] }, async () => {
        const [, , cashierName] = await apiUtils.createCashier(outletId, payloads.createCashier(), payloads.adminAuth);
        await admin.deleteCashier(cashierName);
    });
});
