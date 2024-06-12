import { faker } from '@faker-js/faker';
import 'dotenv/config';

const { USER_PASSWORD } = process.env;

interface user {
    username: string;
    password: string;
}

interface admin {
    username: string;
    password: string;
}

export { admin, user };

export const data = {
    envData: 'utils/data.json',

    env: {
        DOKAN_PRO: process.env.WEPOS_PRO ? true : false,

        // db data
        DB_HOST_NAME: process.env.DB_HOST_NAME,
        DB_USER_NAME: process.env.DB_USER_NAME,
        DB_USER_PASSWORD: process.env.DB_USER_PASSWORD,
        DATABASE: process.env.DATABASE,
        DB_PORT: process.env.DB_PORT,
        DB_PREFIX: process.env.DB_PREFIX,
    },

    systemInfo: 'playwright/systemInfo.json',

    auth: {
        adminAuthFile: 'playwright/.auth/adminStorageState.json',
        vendorAuthFile: 'playwright/.auth/vendorStorageState.json',
        customerAuthFile: 'playwright/.auth/customerStorageState.json',

        adminAuth: {
            storageState: 'playwright/.auth/adminStorageState.json',
        },

        vendorAuth: {
            storageState: 'playwright/.auth/vendorStorageState.json',
        },

        customerAuth: {
            storageState: 'playwright/.auth/customerStorageState.json',
        },

        noAuth: {
            storageState: { cookies: [], origins: [] },
        },
    },

    // keyboard key
    key: {
        arrowDown: 'ArrowDown',
        enter: 'Enter',
        home: 'Home',
        end: 'End',
    },

    // plugin
    plugin: {
        pluginsLite: ['basic-auth', 'wepos', 'woocommerce'],
        plugins: ['basic-auth', 'wepos', 'wepos-pro', 'woocommerce'],
        weposPro: ['wepos-pro'],
        activeClass: 'active',
        pluginName: {
            dokanLite: 'wepos',
            dokanPro: 'wepos-pro',
        },
    },

    // user
    user: {
        username: () => faker.person.firstName('male'),
        password: String(process.env.USER_PASSWORD),

        userDetails: {
            emailDomain: '@email.com',
            name: () => faker.person.firstName('male'),
            firstName: () => faker.person.firstName('male'),
            lastName: () => faker.person.lastName('male'),
            // email: faker.internet.email(),
            email: () => faker.person.firstName('male') + '@email.com',
            role: 'customer',
        },
    },

    // admin
    admin: {
        username: String(process.env.ADMIN),
        password: String(process.env.ADMIN_PASSWORD),
    },

    // customer details
    customerDetails: () => ({
        firstName: faker.person.firstName('male'),
        lastName: faker.person.lastName('male'),
        email: faker.person.firstName('male') + '@email.com',
        address1: 'abc street',
        address2: 'xyz street',
        country: 'United States (US)',
        state: 'New York',
        city: 'New York',
        zipCode: '10006',
        phone: faker.phone.number(),
    }),

    // wepos settings
    weposSettings: {
        // general settings
        general: {
            calculateTaxForFee: 'yes', // yes, no
            barcodeScannerField: 'sku', // id, sku, custom
            saveSuccessMessage: 'Setting has been saved successfully.',
        },

        // receipts settings
        receipts: {
            orderReceiptHeader: 'test order header',
            orderReceiptFooter: 'test order footer',
            saveSuccessMessage: 'Setting has been saved successfully.',
        },
    },

    // outlet
    outlet: () => ({
        outletName: 'outlet_' + faker.company.buzzNoun(),

        address1: 'abc street',
        address2: 'xyz street',
        country: 'US',
        state: 'NY',
        city: 'New York',
        zipCode: '10006',

        email: faker.string.nanoid(10) + '@yopmail.com',
        phone: faker.phone.number(),
        fax: faker.string.alphanumeric(10),
        website: faker.company.buzzNoun() + '.com',
    }),

    // counter
    counter: () => ({
        name: 'counter_' + faker.string.nanoid(5),
        number: faker.string.numeric(5),
    }),

    // cashier
    cashier: () => ({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        website: 'cashier.com',
    }),

    // wepos license
    weposLicense: {
        correctKey: process.env.LICENSE_KEY,
        incorrectKey: 'ABC-123-DEF-456-GHI-789',
    },

    uniqueId: {
        uuid: faker.string.uuid(),
        nanoId: faker.string.nanoid(10),
    },

    // predefined test data
    predefined: {
        simpleProduct: {
            product1: {
                name: 'p1_v1 (simple)',
                productName: () => 'p1_v1 (simple)',
            },
        },

        customerInfo: {
            firstName: 'customer1',
            lastName: 'c1',
            fullName: 'customer1 c1',
            username: 'customer1',
        },
    },

    subUrls: {
        ajax: '/admin-ajax.php',
        post: '/post.php',
        gmap: '/maps/api',

        backend: {
            login: 'wp-login.php',
            adminLogin: 'wp-admin',
            adminLogout: 'wp-login.php?action=logout',
            adminDashboard: 'wp-admin',
            user: 'wp-admin/user-edit.php',
            setupWP: 'wp-admin/install.php',
            general: 'wp-admin/options-general.php',
            permalinks: 'wp-admin/options-permalink.php',
            plugins: 'wp-admin/plugins.php',
            activatePlugin: 'wp-admin/plugins.php?action=activate',
            deactivatePlugin: 'wp-admin/plugins.php?action=deactivate',
            widgets: 'wp-admin/widgets.php',
            editUser: (userId: string) => `wp-admin/user-edit.php?user_id=${userId}`,

            wepos: {
                outlets: 'wp-admin/admin.php?page=wepos#/outlets',
                receipts: 'wp-admin/admin.php?page=wepos#/receipts',
                reports: 'wp-admin/admin.php?page=wepos#/reports',
                settings: 'wp-admin/admin.php?page=wepos#/settings',
                viewPos: 'wepos/#/',
                license: 'wp-admin/admin.php?page=wepos-license',
            },

            wc: {
                products: 'wp-admin/edit.php?post_type=product',
                productDetails: (productId: string) => `wp-admin/post.php?post=${productId}&action=edit`,
                addNewProducts: 'wp-admin/post-new.php?post_type=product',
                addNewCategories: 'wp-admin/edit-tags.php?taxonomy=product_cat&post_type=product',
                addNewAttributes: 'wp-admin/edit.php?post_type=product&page=product_attributes',
                searchAttribute: 'wp-admin/admin-ajax.php?action=woocommerce_json_search_product_attributes',
                term: 'wp-admin/admin-ajax.php?term',
                taxonomyTerms: 'wp-admin/admin-ajax.php?action=woocommerce_json_search_taxonomy_terms',
                taxonomy: 'wp-admin/edit-tags.php?taxonomy',
                coupons: 'wp-admin/edit.php?post_type=shop_coupon',
                addCoupon: 'wp-admin/post-new.php?post_type=shop_coupon',
                orders: 'wp-admin/edit.php?post_type=shop_order',
                settings: 'wp-admin/admin.php?page=wc-settings',
            },
        },

        api: {
            wepos: {
                outlet: 'wepos/v1/outlets',
            },

            wc: {
                products: 'wc/v3/products',
                orders: '/wc/v3/orders',
                store: 'wc/store',
            },
        },
    },

    // image
    image: {
        avatar: 'utils/sampleData/avatar.png',
        wepos: 'utils/sampleData/wepos.png',
        license: 'utils/sampleData/license.png',
    },

    // command
    command: {
        permalink: 'npm run wp-env run tests-cli wp rewrite structure /%postname%/',
        permalinkLocal: `cd ${process.env.SITE_PATH} && wp rewrite structure /%postname%/ && wp rewrite flush`,
        activateTheme: `cd ${process.env.SITE_PATH} && wp theme activate storefront`,
    },
};
