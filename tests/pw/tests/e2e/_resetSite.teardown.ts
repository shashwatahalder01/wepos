import { test, request } from '@playwright/test';
import { ApiUtils } from '@utils/apiUtils';
import { payloads } from '@utils/payloads';

test.describe('test environment', () => {
    let apiUtils: ApiUtils;

    test.beforeAll(async () => {
        apiUtils = new ApiUtils(await request.newContext());
    });

    test.afterAll(async () => {
        await apiUtils.dispose();
    });

    test('delete all media items', async () => {
        await apiUtils.deleteAllMediaItems(payloads.adminAuth);
    });

    test('delete all products', async () => {
        await apiUtils.deleteAllProducts(payloads.adminAuth);
    });

    test('delete all customers', async () => {
        await apiUtils.deleteAllCustomers(payloads.adminAuth);
    });

    test('delete all outlets', async () => {
        await apiUtils.deleteAllOutlets(payloads.adminAuth);
    });

    test('delete all cashiers', async () => {
        await apiUtils.deleteAllUsers(['cashier'], payloads.adminAuth);
    });
});
