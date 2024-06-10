//COVERAGE_TAG: GET /wepos/v1/payment/gateways
//COVERAGE_TAG: GET /wepos/v1/payment/summary
//COVERAGE_TAG: GET /wepos/v1/payment/reports
//COVERAGE_TAG: GET /wepos/v1/payment/reports/export

import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '@utils/apiUtils';
import { endPoints } from '@utils/apiEndPoints';
import { schemas } from '@utils/schemas';

test.describe('payment api test', () => {
    let apiUtils: ApiUtils;

    test.beforeAll(async () => {
        apiUtils = new ApiUtils(await request.newContext());
    });

    test.afterAll(async () => {
        await apiUtils.dispose();
    });

    test('get all payment gateways', { tag: ['@lite'] }, async () => {
        const [response, responseBody] = await apiUtils.get(endPoints.getAllPaymentGateways);
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
        expect(responseBody).toMatchSchema(schemas.paymentMethodsSchema);
    });

    test('get payment summary', { tag: ['@lite'] }, async () => {
        const [response, responseBody] = await apiUtils.get(endPoints.getPaymentSummary);
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
        expect(responseBody).toMatchSchema(schemas.paymentSummarySchema);
    });

    test('get payment reports', { tag: ['@lite'] }, async () => {
        const [response, responseBody] = await apiUtils.get(endPoints.getPaymentReports);
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
        expect(responseBody).toMatchSchema(schemas.paymentReportSchema);
    });

    test('get exported report', { tag: ['@lite'] }, async () => {
        //todo: might belong to other description
        const [response, responseBody] = await apiUtils.get(endPoints.getExportedReport);
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
        expect(responseBody).toMatchSchema(schemas.exportedReportSchema);
    });
});
