import { test, Page } from '@playwright/test';
import { Receipts } from '@pages/receiptsPage';
import { data } from '@utils/testData';

test.describe('Receipts test', () => {
    let admin: Receipts;
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
        admin = new Receipts(page);
    });

    test('admin can view receipts', { tag: ['@pro'] }, async () => {
        await admin.receiptsRenderProperly();
    });

    test('admin can set receipt logo', { tag: ['@pro'] }, async () => {
        await admin.setReceiptLogo();
    });

    test('admin can set receipt style', { tag: ['@pro'] }, async () => {
        await admin.setReceiptStyle();
    });

    test('admin can set receipt header details', { tag: ['@pro'] }, async () => {
        await admin.setReceiptHeaderDetails();
    });

    test('admin can set receipt item details', { tag: ['@pro'] }, async () => {
        await admin.setReceiptItemDetails();
    });

    test('admin can set receipt footer details', { tag: ['@pro'] }, async () => {
        await admin.setReceiptFooterDetails();
    });
});
