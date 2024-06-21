import { test, Page, request } from '@playwright/test';
import { ViewPos } from '@pages/viewPosPage';
import { LoginPage } from '@pages/loginPage';
import { ApiUtils } from '@utils/apiUtils';
import { dbUtils } from '@utils/dbUtils';
import { data } from '@utils/testData';
import { payloads } from '@utils/payloads';
import { responseBody } from '@utils/interfaces';

const { WEPOS_PRO, USER_PASSWORD, PRODUCT_ID, CUSTOMER_ID } = process.env;

test.describe('Pos test', () => {
    let cashier: ViewPos;
    let cPage: Page;
    let apiUtils: ApiUtils;
    let responseBodyCounter: responseBody;
    let outletId: string;
    let outletName: string;
    let counterId: string;
    let counterName: string;
    let orderId: string;

    test.beforeAll(async ({ browser }) => {
        const adminContext = await browser.newContext(data.auth.adminAuth);
        cPage = await adminContext.newPage();
        cashier = new ViewPos(cPage);

        apiUtils = new ApiUtils(await request.newContext());
        if (WEPOS_PRO) {
            await dbUtils.deleteTable('wepos_login');

            [, outletId, outletName] = await apiUtils.createOutlet(payloads.createOutlet(), payloads.adminAuth);
            console.log('outletId:', outletId, 'outletName:', outletName);
            [responseBodyCounter, counterId, counterName] = await apiUtils.createCounter(outletId, payloads.createCounter(), payloads.adminAuth);
            await apiUtils.assignCashier(outletId, ['1'], payloads.adminAuth);
            cashier = new ViewPos(cPage, outletName, `${counterName} - ${responseBodyCounter.number}`);
            [, , orderId] = await apiUtils.createOrder(PRODUCT_ID, { ...payloads.createOrder, customer_id: CUSTOMER_ID }, payloads.adminAuth);
        }
    });

    test.afterAll(async () => {
        if (WEPOS_PRO) {
            await apiUtils.logoutCashier('1', outletId, counterId, payloads.adminAuth);
        }
        await apiUtils.dispose();
        await cPage.close();
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
        await cashier.searchCustomer(data.predefined.customerInfo.email);
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

    test('cashier can logout', { tag: ['@lite'] }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        let cashier = new ViewPos(page);
        const [responseBody, cashierId] = await apiUtils.createUser({ ...payloads.createUser(), roles: 'administrator' }, payloads.adminAuth);
        if (WEPOS_PRO) {
            const [, outletId, outletName] = await apiUtils.createOutlet(payloads.createOutlet(), payloads.adminAuth);
            const [responseBodyCounter, , counterName] = await apiUtils.createCounter(outletId, payloads.createCounter(), payloads.adminAuth);

            cashier = new ViewPos(page, outletName, `${counterName} - ${responseBodyCounter.number}`);
            await apiUtils.assignCashier(outletId, [cashierId], payloads.adminAuth);
        }

        await loginPage.adminLogin({ username: responseBody.username, password: USER_PASSWORD });
        await cashier.logout();
    });

    test('cashier can add product to cart', { tag: ['@lite'] }, async () => {
        await cashier.addToCart(data.predefined.simpleProduct.product1.name);
    });

    test('cashier can add customer to cart', { tag: ['@lite'] }, async () => {
        const [responseBody, , customerEmail] = await apiUtils.createCustomer(payloads.createCustomer(), payloads.adminAuth);
        await cashier.addCustomerToCart(customerEmail, `${responseBody.billing.first_name} ${responseBody.billing.last_name}`);
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
        await cashier.addNote(data.predefined.simpleProduct.product1.name, 'This is a test note');
    });

    test('cashier can complete sale by cash', { tag: ['@lite'] }, async () => {
        await cashier.completeSale(data.predefined.simpleProduct.product1.name, data.paymentGateway);
    });

    test('cashier can complete sale by card', { tag: ['@pro'] }, async () => {
        await cashier.completeSale(data.predefined.simpleProduct.product1.name, { ...data.paymentGateway, name: 'card' });
    });

    test('cashier can complete sale with print receipt', { tag: ['@lite'] }, async () => {
        await cashier.completeSaleWithPrintReceipt(data.predefined.simpleProduct.product1.name, data.paymentGateway);
    });

    test('cashier can switch counter', { tag: ['@pro'] }, async () => {
        console.log(outletId);
        const [responseBodyCounter, counterId, counterName] = await apiUtils.createCounter(outletId, payloads.createCounter(), payloads.adminAuth);
        await cashier.switchCounter(outletName, `${counterName} - ${responseBodyCounter.number}`);

        // reset: logout cashier from the counter
        await apiUtils.logoutCashier('1', outletId, counterId, payloads.adminAuth);
    });

    test('cashier can view products', { tag: ['@pro'] }, async () => {
        await cashier.viewProducts();
    });

    test('cashier can search products', { tag: ['@pro'] }, async () => {
        await cashier.searchProductOnProductPage(data.predefined.simpleProduct.product1.name);
    });

    test('cashier can edit product', { tag: ['@pro'] }, async () => {
        const [, , productName] = await apiUtils.createProduct(payloads.createProduct(), payloads.adminAuth);
        await cashier.editProduct(productName, { ...data.productDetails(), category: data.predefined.category, tag: data.predefined.tag });
    });

    test('cashier can delete product', { tag: ['@pro'] }, async () => {
        const [, , productName] = await apiUtils.createProduct(payloads.createProduct(), payloads.adminAuth);
        await cashier.deleteProduct(productName);
    });

    test('cashier can perform bulk action on products', { tag: ['@pro'] }, async () => {
        const [, , productName] = await apiUtils.createProduct(payloads.createProduct(), payloads.adminAuth);
        await cashier.bulkActionOnProducts(productName, 'delete');
    });

    test('cashier can view orders', { tag: ['@pro'] }, async () => {
        await cashier.viewOrders();
    });

    test('cashier can search orders', { tag: ['@pro'] }, async () => {
        test.skip(true, 'feature does not work');
        await cashier.searchOrder(orderId);
    });

    test('cashier can filter orders by customer', { tag: ['@pro'] }, async () => {
        await cashier.filterOrders(data.predefined.customerInfo.username, 'by-customer');
    });

    test('cashier can filter orders by status', { tag: ['@pro'] }, async () => {
        await cashier.filterOrders('Completed', 'by-status');
    });

    test('cashier can view order details', { tag: ['@pro'] }, async () => {
        await cashier.viewOrderDetails(orderId);
    });

    test('cashier can add order note', { tag: ['@pro'] }, async () => {
        await cashier.addOrderNote(orderId, 'test order note');
    });

    test('cashier can delete order note', { tag: ['@pro'] }, async () => {
        const orderNote = payloads.createOrderNote;
        const [, orderId] = await apiUtils.createOrderNote(PRODUCT_ID, payloads.createOrder, orderNote, payloads.adminAuth);
        await cashier.deleteOrderNote(orderId, orderNote.note);
    });

    test('cashier can perform bulk action on orders', { tag: ['@pro'] }, async () => {
        test.skip(true, 'feature does not work');
    });

    test('cashier can refund order', { tag: ['@pro'] }, async () => {
        test.skip(true, 'feature does not work');
    });

    test('cashier can view customers', { tag: ['@pro'] }, async () => {
        await cashier.viewCustomers();
    });

    test('cashier can search customers', { tag: ['@pro'] }, async () => {
        await cashier.searchCustomerOnCustomerPage(data.predefined.customerInfo.email);
    });

    test('cashier can add new customer on customer page', { tag: ['@pro'] }, async () => {
        await cashier.addCustomerOnCustomerPage(data.customerDetails());
    });

    test('cashier can edit customer', { tag: ['@pro'] }, async () => {
        const [, , customerEmail] = await apiUtils.createCustomer(payloads.createCustomer(), payloads.adminAuth);
        await cashier.editCustomer(customerEmail, { ...data.customerDetails(), country: 'Canada', state: 'Alberta' });
    });

    test('cashier can delete customer', { tag: ['@pro'] }, async () => {
        const [, , customerEmail] = await apiUtils.createCustomer(payloads.createCustomer(), payloads.adminAuth);
        await cashier.deleteCustomer(customerEmail);
    });

    test('cashier can perform bulk action on customers', { tag: ['@pro'] }, async () => {
        const [, , customerEmail] = await apiUtils.createCustomer(payloads.createCustomer(), payloads.adminAuth);
        await cashier.bulkActionOnCustomers(customerEmail, 'delete');
    });

    test('cashier can update cashier profile', { tag: ['@pro'] }, async () => {
        await cashier.updateCashierProfile(data.cashierProfileDetails);
    });
});
