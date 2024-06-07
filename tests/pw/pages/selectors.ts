export const selector = {
    // selectors
    frontend: {
        // fronted menus
        home: '//a[contains(text(),"Home")]',
        cart: '//a[contains(text(),"Cart")]',
        checkout: '//a[contains(text(),"Checkout")]',
        myAccount: '//a[contains(text(),"My account")]',
        shop: '//a[contains(text(),"Shop")]',

        // user login
        username: '#username',
        userPassword: '#password',
        rememberMe: '#rememberme',
        logIn: '//button[@value="Log in"]',
        lostPassword: '.woocommerce-LostPassword > a',

        // user logout
        customerLogout: '.woocommerce-MyAccount-navigation-link--customer-logout > a',
        vendorLogout: '.fa-power-off',

        // page not found
        pageNotFound: '//h1[text()="Oops! That page can’t be found."]',
    },

    backend: {
        // page not found
        pageNotFound: '//h1[text()="Oops! That page can’t be found."]',

        // setup
        alreadyInstalled: '//h1[contains(text(), "Already Installed")]',
        languageContinue: '#language-continue',
        letsGo: '//a[contains(text(), "go!")]',

        // db setup
        dbName: '#dbname',
        dbUserName: '#uname',
        dbPassword: '#pwd',
        dbHost: '#dbhost',
        dbTablePrefix: '#prefix',
        submit: '.step input',
        runTheInstallation: '.step a',

        // site info
        siteTitle: '#weblog_title',
        adminUserName: '#user_login',
        adminPassword: '#pass1',
        adminEmail: '#admin_email',
        searchEngineVisibility: '#blog_public',
        installWp: '#submit',
        successLoginIn: '.step a',

        // Admin Login
        email: '#user_login',
        password: '#user_pass',
        rememberMe: '#rememberme',
        login: '#wp-submit',
        dashboardMenu: '.wp-first-item > .wp-menu-name',
        dashboardText: '.wrap h1',

        // Admin Logout
        userMenu: 'li#wp-admin-bar-my-account',
        logout: 'li#wp-admin-bar-logout a',

        // Logout Message
        logoutSuccessMessage: 'div#login-message p',

        // Login Error
        loginError: '#login_error',
    },

    // Admin

    admin: {
        // Admin Dashboard
        aDashboard: {
            // Dashboard Menus
            dashboard: '.wp-first-item .wp-menu-name',
            posts: '.menu-icon-post .wp-menu-name',
            media: '.menu-icon-media .wp-menu-name',
            pages: '.menu-icon-page .wp-menu-name',
            comments: '.menu-icon-comments .wp-menu-name',
            wooCommerce: '.toplevel_page_woocommerce .wp-menu-name',
            wepos: '.toplevel_page_wepos .wp-menu-name',
            appearance: '.menu-icon-appearance .wp-menu-name',
            plugins: '.menu-icon-plugins .wp-menu-name',
            users: '.menu-icon-users .wp-menu-name',
            tools: '.menu-icon-tools .wp-menu-name',
            settings: '.menu-icon-settings .wp-menu-name',
            // Collapse Menu
            collapseMenu: '#collapse-button',
        },

        // Dashboard
        dashboard: {
            // Menus
            home: '//li[@id="menu-dashboard"]//a[contains(text(),"Home")]',
            updates: '//li[@id="menu-dashboard"]//a[contains(text(),"Updates ")]',
        },

        // wepos
        wepos: {
            // Wepos Menus
            menus: {
                outlets: '//li[contains(@class,"toplevel_page_wepos")]//a[text()="Outlets"]',
                receipts: '//li[contains(@class,"toplevel_page_wepos")]//a[text()="Receipts"]',
                reports: '//li[contains(@class,"toplevel_page_wepos")]//a[text()="Reports"]',
                settings: '//li[contains(@class,"toplevel_page_wepos")]//a[text()="Settings"]',
                viewPos: '//li[contains(@class,"toplevel_page_wepos")]//a[text()="View POS"]',
                license: '//li[contains(@class,"toplevel_page_wepos")]//a[text()="License"]',
            },

            // outlets
            outlets: {
                outletsText: '//h2//span[text()="Outlets"]',
                addOutlet: '//a[contains(text(),"Add Outlet")]',
                noOutletsFound: 'div.no-outlet-found p',

                outlets: 'div.outlet',

                outlet: (outletName: string) => `//div[@class='outlet']//h3[text()='${outletName}']/../../..`,

                outletContent: {
                    // outlet tabs
                    outletCounter: (outletName: string) => `//div[@class='outlet']//h3[text()='${outletName}']/../../..//div[@class="tabs"]//span[text()='Counter']/..`,
                    outletCashier: (outletName: string) => `//div[@class='outlet']//h3[text()='${outletName}']/../../..//div[@class="tabs"]//span[text()='Cashier']/..`,

                    // counter
                    counter: (counterName: string) => `//div[@class='counter-content']//span[text()='${counterName}']/../..`,
                    editCounter: (counterName: string) => `//div[@class='counter-content']//span[text()='${counterName}']/../..//span[@class="flaticon-circle-edit"]/..`,
                    deleteCounter: (counterName: string) => `//div[@class='counter-content']//span[text()='${counterName}']/../..//span[@class="flaticon-delete"]/..`,

                    // cashier
                    cashier: (counterName: string) => `//div[@class='cashier-content']//span[text()='${counterName}']/../..`,
                    deletecashier: (counterName: string) => `//div[@class='cashier-content']//span[text()='${counterName}']/../..//span[@class="flaticon-delete"]/..`,

                    canceldelete: '//div[@class="confirm-action"]//button[text()="Cancel"]',
                    confirmdelete: '//div[@class="confirm-action"]//button[text()="Delete"]',
                },

                outletDetails: {
                    outletName: '//input[@placeholder="Outlet Name"]',
                    outletLocation: {
                        address1: '//div[@class="wepos-modal"]//input[contains(@placeholder,"Address 1")]',
                        address2: '//div[@class="wepos-modal"]//input[contains(@placeholder,"Address 2")]',
                        countryDropdown: 'div.customer-country  div.multiselect__select',
                        countryInput: 'input.multiselect__input',
                        searchedCountry: 'span.multiselect__option--highlight',
                        state: '//div[@class="wepos-modal"]//input[contains(@placeholder,"State")]',
                        city: '//div[@class="wepos-modal"]//input[contains(@placeholder,"City")]',
                        zipCode: '//div[@class="wepos-modal"]//input[contains(@placeholder,"Postal/Zip Code")]',
                    },
                    contactDetails: {
                        email: '//div[@class="wepos-modal"]//input[contains(@placeholder,"Email")]',
                        phone: '//div[@class="wepos-modal"]//input[contains(@placeholder,"Phone")]',
                        fax: '//div[@class="wepos-modal"]//input[contains(@placeholder,"Fax")]',
                        website: '//div[@class="wepos-modal"]//input[contains(@placeholder,"Website")]',
                    },
                },

                createOutlet: '//button[text()="Create Outlet"]',
                updateOutlet: '//button[text()="Update Outlet"]',

                // outletMoreOption: 'div.outlet div.v-popover',
                outletMoreOption: (outletName: string) => `//div[@class='outlet']//h3[text()='${outletName}']/../../..//div[@class="v-popover"]`,
                outletMoreOptions: {
                    addCounter: '//div[contains(@class,"wepos-outlet-settings")]//a[contains(text(),"Add Counter")]',
                    addCashier: '//div[contains(@class,"wepos-outlet-settings")]//a[contains(text(),"Add Cashier")]',
                    editOutlet: '//div[contains(@class,"wepos-outlet-settings")]//a[contains(text(),"Edit")]',
                    deleteOutlet: '//div[contains(@class,"wepos-outlet-settings")]//a[contains(text(),"Delete")]',
                },

                addCounter: 'div.counter-content a',
                counter: {
                    name: '//div[@class="wepos-modal"]//input[@placeholder="Counter Name"]',
                    number: '//div[@class="wepos-modal"]//input[@placeholder="Counter Number"]',
                    addCounter: '//div[@class="wepos-modal"]//button[text()="Create Counter"]',
                    updateCounter: '//div[@class="wepos-modal"]//button[text()="Update Counter"]',
                },

                addCashier: 'div.cashier-content a',
                cashier: {
                    cashierDropdown: 'div.customer-country  div.multiselect__select',
                    cashierInput: 'input.multiselect__input',
                    searchedCashier: 'span.multiselect__option--highlight',

                    createCashier: 'a.create-new-cashier-link',

                    // cashier details
                    cashierDetails: {
                        firstName: '//div[@class="wepos-modal"]//input[contains(@placeholder,"First Name")]',
                        lastName: '//div[@class="wepos-modal"]//input[contains(@placeholder,"Last Name")]',
                        email: '//div[@class="wepos-modal"]//input[contains(@placeholder,"Email")]',
                        phone: '//div[@class="wepos-modal"]//input[contains(@placeholder,"Phone")]',
                        website: '//div[@class="wepos-modal"]//input[contains(@placeholder,"Website")]',
                        create: '//div[@class="wepos-modal"]//button[text()="Create Cashier"]',
                    },

                    assignCashier: '//div[@class="wepos-modal"]//button[text()="Assign Cashiers"]',
                },
            },

            // receipts
            receipts: {
                //todo: need to add selectors
            },

            // reports
            reports: {
                reportText: '//h1[text()="Reports"]',
                exportReport: 'div.reports-filtering-buttons button.export-btn',

                // filters
                filterReport: 'div.reports-filtering-buttons button.filter-btn',
                filters: {
                    filterByPaymentMethod: '',
                    filterByCustomer: '',
                    filterByOutlet: '', //todo: need to add selectors
                    filterByCashier: '',
                    filterByDate: '',
                    filterByOther: '//select[@name="filter_by_other"]',
                    reset: 'a.filtering-reset-btn',
                },

                overview: {
                    salesAmount: '//div[@class="overview-section"]//div[@class="summary-single summary-amount"]',
                    totalItems: '//div[@class="overview-section"]//div[@class="summary-single summary-order-qty"]',
                    totalOrders: '//div[@class="overview-section"]//div[@class="summary-single summary-order-qty"]',
                    chart: 'canvas#line-chart',
                },

                //todo: need to add selectors reports
            },

            // settings
            settings: {
                settingsText: '//h2[text()="Settings"]',

                sections: {
                    settingsMenuSection: 'div.wepos-settings h2.nav-tab-wrapper',
                    settingsMenuDetailsSection: 'div.wepos-settings div.metabox-holder',
                },

                saveChanges: (type: string) => `div#wepos_${type} input#submit`,
                saveSuccessMessage: 'div#setting-message_updated',

                // Setting Menus
                menus: {
                    general: '//a[contains(@class, "nav-tab") and contains(text(),"General")]',
                    receipts: '//a[contains(@class, "nav-tab") and contains(text(),"Receipts")]',
                },

                general: {
                    calculateTaxForFee: 'select#wepos_general\\[enable_fee_tax\\]', // yes, no
                    barcodeScannerField: 'select#wepos_general\\[barcode_scanner_field\\]', // id, sku, custom
                },

                receipts: {
                    orderReceiptHeaderIframe: 'tr.receipt_header iframe',
                    orderReceiptHeaderHtmlBody: '#tinymce',
                    orderReceiptFooterIframe: 'tr.receipt_footer iframe',
                    orderReceiptFooterHtmlBody: '#tinymce',
                },
            },

            modal: {
                modal: 'div.wepos-modal ',
                modalContent: 'div.wepos-modal div.wepos-modal-content',
                closeModal: 'span.modal-close',
            },

            viewPos: {
                outlet: 'select#outlet',
                counter: 'select#counter',
                goToPos: 'input[value="Go to POS"]',
                backToMainSite: '.footer a',

                // search product
                searchProduct: 'input#product-search',
                searchedProduct: (productName: string) => `//li[@class='product-search-item selected']//a[contains(text(),'${productName}')]`,
                searchType: (type: string) => `//div[@class='search-type']//a[contains(text(),'${type}')]`, // Product, Scan

                // category
                categoryDropdown: 'div.category div.multiselect__select',
                categoryInput: 'input.multiselect__input',
                uncategorized: '//span[text()[normalize-space()="Uncategorized"]]/..',
                searchedCategory: 'span.multiselect__option--highlight',
                selectedCategory: (category: string) => `//a[contains(text(),'${category}')]/../..//li[@class='router-link-exact-active router-link-active']`,

                // View Style
                layoutStyle: (style: string) => `.toggle-view .${style}-view`, // list, grid

                // Product Container
                productContainer: '.items-wrapper',

                // search customer
                searchCustomer: 'input#customer-search',
                searchedCustomer: '//li[@class="customer-search-item selected"]//span[contains(@class,"name")]',

                // add new customer
                addNewCustomer: 'span.add-new-customer',
                customerdetails: {
                    firstName: '//div[@class="wepos-modal"]//input[contains(@placeholder,"First Name")]',
                    lastName: '//div[@class="wepos-modal"]//input[contains(@placeholder,"Last Name")]',
                    email: '//div[@class="wepos-modal"]//input[contains(@placeholder,"Email")] ',
                    address1: ' //div[@class="wepos-modal"]//input[contains(@placeholder,"Address 1")]',
                    address2: ' //div[@class="wepos-modal"]//input[contains(@placeholder,"Address 2")]',
                    countryDropdown: 'div.customer-country  div.multiselect__select',
                    countryInput: 'input.multiselect__input',
                    searchedCountry: 'span.multiselect__option--highlight',
                    state: '//div[@class="wepos-modal"]//input[contains(@placeholder,"States")]',
                    city: '//div[@class="wepos-modal"]//input[contains(@placeholder,"City")]',
                    zipCode: '//div[@class="wepos-modal"]//input[contains(@placeholder,"Zip/Postal Code")]',
                    phone: '//div[@class="wepos-modal"]//input[contains(@placeholder,"Phone")]',
                    addCustomer: 'button.add-new-customer-btn',
                },

                // more options
                moreOption: 'div.more-options button.wepos-button',
                moreoptions: {
                    emptyCart: '//a[.="Empty Cart"]',
                    help: '//a[.="Help"]',
                    switchCounter: '//a[.="Switch Counter"]',
                    logout: '//a[.="Logout"]',
                },

                shortcutKeys: '//h2[text()="Shortcut Keys"]',

                cart: {
                    cart: 'div.content-cart',
                    emptyCart: '//table[@class="cart-table"]//p[text()="Empty Cart"]',
                    cartTitle: 'span.cart-title',
                    cartProduct: (productName: string) => `//tbody//tr//td[text()[normalize-space()='${productName}']]`,
                    cartProductQuantity: (productName: string) => `//tbody//tr//td[text()[normalize-space()='${productName}']]/..//td[@class='qty']`,
                    removeCartProduct: (productName: string) => `//tbody//tr//td[text()[normalize-space()='${productName}']]/..//td[@class='remove']`,
                    editCartProduct: (productName: string) => `//tbody//tr//td[text()[normalize-space()='${productName}']]/..//td[@class='action']`,
                    productQuantityInput: (productName: string) => `//tbody//tr//td[text()[normalize-space()='${productName}']]/..//following-sibling::tr[@class='update-quantity-wrap'][1]//span[@class='qty-number']//input`,

                    // subtotal
                    subtotal: '//table[@class="cart-total-table"]//td[contains(text(), "Subtotal")]',

                    // cart options
                    addDiscount: '//tr[@class="cart-action"]//a[contains(text(),"Add Discount")]',
                    addFee: '//tr[@class="cart-action"]//a[contains(text(),"Add Fee")]',

                    feeDetails: {
                        feeInput: 'div.fee-keypad input',
                        feeType: (type: string) => `//button[@data-action="${type}"]`, //percent, flat
                        feeAmount: (type: string) => `//table[@class='cart-total-table']//td[contains(text(), '${type}')]//span[@class='name']`,
                    },

                    // add note
                    addNote: '//tr[@class="cart-action"]//a[contains(text(),"Add Note")]',
                    noteDetails: {
                        noteInput: 'div.customer-note textarea',
                        addNote: 'button.add-note-btn',
                    },
                    noteText: 'td.note-text',

                    payNow: 'tr.pay-now',
                },

                // saleSummary
                saleSummary: {
                    payAmount: 'span.pay-amount',

                    cashInput: 'input#input-cash-amount',
                    backToSale: 'div.footer a.back-btn',
                    processPayment: 'button.process-checkout-btn',

                    saleCompleted: '//h2[text()="Sale Completed"]',
                    printReceipt: 'button.print-btn',
                    newSale: 'button.new-sale-btn',
                },
            },

            // License
            license: {
                licenseText: '.appsero-license-settings-wrapper h1',

                activateSection: {
                    licenseSection: '.appsero-license-settings.appsero-license-section',
                    licenseKeyInput: '.license-input-fields .license-input-key input',
                    activateLicense: '//button[contains(text(),"Activate License")]',
                },

                deactivateLicense: 'button.deactive-button',
                refreshLicense: 'button.appsero-license-refresh-button',
                activateLicenseInfo: 'div.active-license-info',

                successNotice: 'div.notice-success.appsero-license-section',
                errorNotice: 'div.notice-error.appsero-license-section',
            },

            confirmAction: 'button.swal2-confirm',
            cancelAction: 'button.swal2-cancel',
        },
    },
};
