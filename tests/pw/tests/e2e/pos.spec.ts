import { test, Page } from '@playwright/test';
import { ViewPos } from '@pages/viewPosPage';
import { data } from '@utils/testData';

test.describe('View POS test', () => {
    let cashier: ViewPos;
    // let cPage: Page;

    test.use(data.auth.adminAuth);

    // test.beforeAll(async ({ browser }) => {
    //     const adminContext = await browser.newContext(data.auth.adminAuth);
    //     cPage = await adminContext.newPage();
    //     cashier = new ViewPos(cPage);
    // });

    // test.afterAll(async () => {
    //     await cPage.close();
    // });

    test.beforeEach(async ({ page }) => {
        cashier = new ViewPos(page);
    });

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
        await cashier.completeSale(data.predefined.simpleProduct.product1.name);
    });

    test('cashier can complete sale with print receipt', { tag: ['@lite'] }, async () => {
        // const chromeBrowser = await chromium.launch({ args: ['--kiosk-printing'] });
        // const adminContext = await chromeBrowser.newContext(data.auth.adminAuth);
        // const cPage = await adminContext.newPage();
        // const cashier = new ViewPos(cPage);
        await cashier.completeSaleWithPrintReceipt(data.predefined.simpleProduct.product1.name);
    });
});
