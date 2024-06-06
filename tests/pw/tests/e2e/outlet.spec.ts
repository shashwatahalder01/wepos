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

    test('admin can view Outlets', { tag: ['@lite'] }, async () => {
        await admin.outletRenderProperly();
    });

    test('admin can add outlet', { tag: ['@lite'] }, async () => {
        await admin.addOutlet(data.predefined.simpleProduct.product1.name);
    });

    test('admin can edit outlet', { tag: ['@lite'] }, async () => {
        await admin.editdOutlet('Uncategorized');
    });

    test('admin can add counter', { tag: ['@lite'] }, async () => {
        await admin.addCounter('list');
    });

    test('admin can edit counter', { tag: ['@lite'] }, async () => {
        await admin.editCounter(data.predefined.customerInfo.fullName);
    });

    test('admin can delete counter', { tag: ['@lite'] }, async () => {
        await admin.deleteCounter(data.customerDetails());
    });

    test('admin can add cashier', { tag: ['@lite'] }, async () => {
        await admin.addCashier();
    });

    test('admin can delete cashier', { tag: ['@lite'] }, async () => {
        await admin.deleteCashier();
    });
});
