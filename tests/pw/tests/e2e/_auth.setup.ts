import { test as setup, expect, request } from '@playwright/test';
import { LoginPage } from '@pages/loginPage';
import { ApiUtils } from '@utils/apiUtils';
import { payloads } from '@utils/payloads';
import { data } from '@utils/testData';
import { helpers } from '@utils/helpers';

const { LOCAL, WEPOS_PRO } = process.env;

setup.describe('authenticate users & set permalink', () => {
    let apiUtils: ApiUtils;

    setup.beforeAll(async () => {
        apiUtils = new ApiUtils(await request.newContext());
    });

    setup.afterAll(async () => {
        await apiUtils.dispose();
    });

    setup('authenticate admin', { tag: ['@lite'] }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.adminLogin(data.admin, data.auth.adminAuthFile);
    });

    setup('add a product', { tag: ['@lite'] }, async () => {
        // delete previous store products with predefined name if any
        await apiUtils.deleteAllProducts(data.predefined.simpleProduct.product1.name, payloads.adminAuth);
        // create store product
        const [, productId] = await apiUtils.createProduct({ ...payloads.createProduct(), name: data.predefined.simpleProduct.product1.name }, payloads.adminAuth);
        helpers.createEnvVar('PRODUCT_ID', productId);
    });

    setup('wepos pro enabled or not', { tag: ['@lite'] }, async () => {
        setup.skip(LOCAL, 'Skip on Local testing');
        let res = await apiUtils.checkPluginsExistence(data.plugin.weposPro, payloads.adminAuth);
        if (res) {
            res = await apiUtils.pluginsActiveOrNot(data.plugin.weposPro, payloads.adminAuth);
        }
        WEPOS_PRO ? expect(res).toBeTruthy() : expect(res).toBeFalsy();
    });

    setup('get test environment info', { tag: ['@lite'] }, async () => {
        const [, systemInfo] = await apiUtils.getSystemStatus(payloads.adminAuth);
        helpers.writeFile(data.systemInfo, JSON.stringify(systemInfo));
    });

    setup('add customer', { tag: ['@lite'] }, async () => {
        const [, customerId] = await apiUtils.createCustomer(payloads.createCustomer1, payloads.adminAuth);
        // helpers.createEnvVar('CUSTOMER_ID', customerId);
    });
});
