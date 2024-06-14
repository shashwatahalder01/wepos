import { test, Page, request } from '@playwright/test';
import { ViewPos } from '@pages/viewPosPage';
import { ApiUtils } from '@utils/apiUtils';
import { data } from '@utils/testData';
import { payloads } from '@utils/payloads';
import { responseBody } from '@utils/interfaces';

const { WEPOS_PRO } = process.env;

test.describe('View POS test', () => {
    let cashier: ViewPos;
    let cPage: Page;
    let apiUtils: ApiUtils;
    let responseBodyCounter: responseBody;
    let outletId: string;
    let outletName: string;
    let counterId: string;
    let counterName: string;

    // test.use(data.auth.adminAuth);

    test.beforeAll(async ({ browser }) => {
        const adminContext = await browser.newContext(data.auth.adminAuth);
        cPage = await adminContext.newPage();
        cashier = new ViewPos(cPage);
        if (WEPOS_PRO) {
            apiUtils = new ApiUtils(await request.newContext());
            [, outletId, outletName] = await apiUtils.createOutlet(payloads.createOutlet(), payloads.adminAuth);
            [responseBodyCounter, counterId, counterName] = await apiUtils.createCounter(outletId, payloads.createCounter(), payloads.adminAuth);
            await apiUtils.assignCashier(outletId, ['1'], payloads.adminAuth);
            cashier = new ViewPos(cPage, outletName, `${counterName} - ${responseBodyCounter.number}`);
        }
    });

    test.afterAll(async () => {
        await apiUtils.logoutCahiser('1', outletId, counterId, payloads.adminAuth);
        await apiUtils.dispose();
        await cPage.close();
    });

    // test.beforeEach(async ({ page }) => {
    //     cashier = new ViewPos(page);
    // });

    test('cashier can view pos', { tag: ['@lite'] }, async () => {
        await cashier.posRenderProperly();
    });

    test('cashier can search product', { tag: ['@lite'] }, async () => {
        await cashier.searchProduct(data.predefined.simpleProduct.product1.name);
    });

    test('cashier can filter product', { tag: ['@lite'] }, async () => {
        await cashier.filterProducts('Uncategorized');
    });

    test('cashier can toggle product view layout', { tag: ['@lite'] }, async () => {
        await cashier.toggleLayout('list');
    });

    test('cashier can search customer', { tag: ['@lite'] }, async () => {
        await cashier.searchCustomer(data.predefined.customerInfo.fullName);
    });

    test('cashier can add new customer', { tag: ['@lite'] }, async () => {
        await cashier.addCustomer(data.customerDetails());
    });

    test('cashier can empty cart', { tag: ['@lite'] }, async () => {
        await cashier.emptyCart();
    });

    test('cashier can view keyboard shortcuts', { tag: ['@lite'] }, async () => {
        await cashier.viewKeyboardShortcut();
    });

    test.skip('cashier can switch counter', { tag: ['@pro'] }, async () => {
        await cashier.switchCounter();
    });

    test.skip('cashier can logout', { tag: ['@lite'] }, async () => {
        await cashier.logout();
    });

    test('cashier can add product to cart', { tag: ['@lite'] }, async () => {
        await cashier.addToCart(data.predefined.simpleProduct.product1.name);
    });

    test('cashier can edit product quantity', { tag: ['@lite'] }, async () => {
        await cashier.editCartProductQuantity(data.predefined.simpleProduct.product1.name, '5');
    });

    test('cashier can remove product from cart', { tag: ['@lite'] }, async () => {
        await cashier.removeCartProduct(data.predefined.simpleProduct.product1.name);
    });

    test('cashier can add discount', { tag: ['@lite'] }, async () => {
        await cashier.addDiscount(data.predefined.simpleProduct.product1.name, 'percent', '10');
    });

    test('cashier can add fee', { tag: ['@lite'] }, async () => {
        await cashier.addFee(data.predefined.simpleProduct.product1.name, 'percent', '10');
    });

    test('cashier can add note', { tag: ['@lite'] }, async () => {
        await cashier.addnote(data.predefined.simpleProduct.product1.name, 'This is a test note');
    });

    test('cashier can complete sale', { tag: ['@lite'] }, async () => {
        //todo: by cash by card
        await cashier.completeSale(data.predefined.simpleProduct.product1.name);
    });

    test('cashier can complete sale with print receipt', { tag: ['@lite'] }, async () => {
        // const chromeBrowser = await chromium.launch({ args: ['--kiosk-printing'] });
        // const adminContext = await chromeBrowser.newContext(data.auth.adminAuth);
        // const cPage = await adminContext.newPage();
        // const cashier = new ViewPos(cPage);
        await cashier.completeSaleWithPrintReceipt(data.predefined.simpleProduct.product1.name);
    });

    //todo: has more tests for wepos submenus
    //todo: need to run parallelly
});
