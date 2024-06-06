const { WEPOS_PRO } = process.env;

export const dbData = {
    wepos: {
        optionName: {
            weposProLicense: 'appsero_465d36b721b45d397f531ea03bbb5f40_manage_license',
        },

        license: {
            key: WEPOS_PRO,
            status: 'activate',
            remaining: 8,
            activation_limit: 10,
            expiry_days: 13356,
            title: 'Business',
            source_id: 'wepos-pro-business',
            recurring: 1,
        },

        deactivateLicense: {
            key: '',
            status: 'deactivate',
        },
    },

    // wp

    optionName: {
        activePlugins: 'active_plugins',
    },

    plugins: {
        '0': 'Basic-Auth-master/basic-auth.php',
        // '1':'woocommerce/woocommerce.php',
        // '2':'dokan/dokan.php',
        // '3':'dokan-pro/dokan-pro.php',
        // '4':'woocommerce-bookings/woocommerce-bookings.php',
        // '5':'woocommerce-product-addons/woocommerce-product-addons.php',
        // '6':'woocommerce-simple-auctions/woocommerce-simple-auctions.php',
        // '7':'woocommerce-subscriptions/woocommerce-subscriptions.php'
        // curl --user admin:01dokan01 http://dokan5.test/wp-json
        // curl --user admin:01dokan01 http://dokan5.test/wp-json/wp/v2/plugins
    },

    siteSettings: {
        users_can_register: 1,
        start_of_week: 1,
        date_format: 'F j, Y',
        time_format: 'g:i a',
        permalink_structure: '/%postname%/',
        default_role: 'subscriber',
        timezone_string: 'Asia/Dhaka',
    },

    // woocommerce

    woocommerceSettings: {
        woocommerce_enable_myaccount_registration: 'yes',
    },
};
