//COVERAGE_TAG: GET /wepos/v1/orders
//COVERAGE_TAG: GET /wepos/v1/orders/(?P<id>[\d]+)

import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '@utils/apiUtils';
import { endPoints } from '@utils/apiEndPoints';
import { payloads } from '@utils/payloads';
import { schemas } from '@utils/schemas';

test.describe('orders api test', () => {
    let apiUtils: ApiUtils;
    let orderId: string;

    test.beforeAll(async () => {
        apiUtils = new ApiUtils(await request.newContext());
        [, , orderId] = await apiUtils.createOrder(payloads.createProduct(), payloads.createOrder);
    });

    test.afterAll(async () => {
        await apiUtils.dispose();
    });

    test('get all orders', { tag: ['@lite'] }, async () => {
        // todo : need to update all test tags
        const [response, responseBody] = await apiUtils.get(endPoints.getAllOrders);
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
        // expect(responseBody).toMatchSchema(schemas.ordersSchema.ordersSchema); //todo: need to fix
    });

    test('get single order', { tag: ['@lite'] }, async () => {
        const [response, responseBody] = await apiUtils.get(endPoints.getSingleOrder(orderId));
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
        // expect(responseBody).toMatchSchema(schemas.ordersSchema.orderSchema); //todo: need to fix
    });
});
