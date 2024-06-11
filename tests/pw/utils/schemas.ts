import { z } from 'zod';

const linksSchema = z.object({
    self: z.array(z.object({ href: z.string().url() })),
    collection: z.array(z.object({ href: z.string().url() })),
});

const customerSchema = z.object({
    id: z.number(),
    date_created: z.coerce.date(),
    date_created_gmt: z.coerce.date(),
    date_modified: z.coerce.date(),
    date_modified_gmt: z.coerce.date(),
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
    role: z.string(),
    username: z.string(),
    billing: z
        .object({
            first_name: z.string(),
            last_name: z.string(),
            company: z.string(),
            address_1: z.string(),
            address_2: z.string(),
            city: z.string(),
            postcode: z.string(),
            country: z.string(),
            state: z.string(),
            email: z.union([z.string().email(), z.literal('')]),
            phone: z.string(),
        })
        .optional(),
    shipping: z
        .object({
            first_name: z.string(),
            last_name: z.string(),
            company: z.string(),
            address_1: z.string(),
            address_2: z.string(),
            city: z.string(),
            postcode: z.string(),
            country: z.string(),
            state: z.string(),
            phone: z.string(),
        })
        .optional(),
    is_paying_customer: z.boolean(),
    avatar_url: z.string().url(),
    meta_data: z
        .array(
            z.object({
                id: z.number(),
                key: z.string(),
                value: z.unknown(),
            }),
        )
        .optional(),
    _links: linksSchema,
});

const couponSchema = z.object({
    id: z.number(),
    code: z.string(),
    amount: z.string(),
    date_created: z.coerce.date(),
    date_created_gmt: z.coerce.date(),
    date_modified: z.coerce.date(),
    date_modified_gmt: z.coerce.date(),
    discount_type: z.string(),
    description: z.string(),
    date_expires: z.nullable(z.string()),
    date_expires_gmt: z.nullable(z.string()),
    usage_count: z.number(),
    individual_use: z.boolean(),
    product_ids: z.array(z.number()),
    excluded_product_ids: z.array(z.string()),
    usage_limit: z.nullable(z.number()),
    usage_limit_per_user: z.nullable(z.number()),
    limit_usage_to_x_items: z.nullable(z.number()),
    free_shipping: z.boolean(),
    product_categories: z.array(z.string()),
    excluded_product_categories: z.array(z.string()),
    exclude_sale_items: z.boolean(),
    minimum_amount: z.string(),
    maximum_amount: z.string(),
    email_restrictions: z.array(z.string()),
    used_by: z.array(z.string()),
    meta_data: z.array(
        z.object({
            id: z.number(),
            key: z.string(),
            value: z.string(),
        }),
    ),
    _links: linksSchema,
});

const formFieldSchema = z.object({
    title: z.string(),
    label: z.string().optional(),
    type: z.string(),
    description: z.string().optional(),
    default: z.string().optional(),
    desc_tip: z.boolean().optional(),
});

const paymentMethodSchema = z.object({
    plugin_id: z.string(),
    id: z.string(),
    errors: z.array(z.unknown()),
    settings: z.object({
        enabled: z.string(),
        title: z.string(),
        description: z.string(),
        instructions: z.string().optional(),
        enable_for_methods: z.array(z.unknown()).optional(),
        enable_for_virtual: z.string().optional(),
    }),
    form_fields: z.record(z.string(), formFieldSchema),
    order_button_text: z.string().nullable(),
    enabled: z.string(),
    title: z.string(),
    description: z.string(),
    chosen: z.unknown().nullable(),
    method_title: z.string(),
    method_description: z.string(),
    has_fields: z.boolean(),
    countries: z.unknown().nullable(),
    availability: z.unknown().nullable(),
    icon: z.string(),
    supports: z.array(z.string()),
    max_amount: z.number(),
    view_transaction_url: z.string(),
    new_method_label: z.string(),
    pay_button_id: z.string(),
    instructions: z.string().optional(),
    enable_for_methods: z.array(z.unknown()).optional(),
    enable_for_virtual: z.boolean().optional(),
});

const dimensionsSchema = z.object({
    length: z.string(),
    width: z.string(),
    height: z.string(),
});

const categorySchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
});

const metaDataSchema = z.object({
    id: z.number(),
    key: z.string(),
    value: z.union([
        z.string(),
        z.object({
            label: z.string(),
            type: z.string(),
            policy: z.string(),
            reasons: z.array(z.string()),
            length: z.string(),
            length_value: z.string(),
            length_duration: z.string(),
            addon_settings: z.array(z.unknown()),
        }),
    ]),
});

const productSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    permalink: z.string().url(),
    date_created: z.coerce.date(),
    date_created_gmt: z.coerce.date(),
    date_modified: z.coerce.date(),
    date_modified_gmt: z.coerce.date(),
    type: z.string(),
    status: z.string(),
    featured: z.boolean(),
    catalog_visibility: z.string(),
    description: z.string(),
    short_description: z.string(),
    sku: z.string().optional(),
    price: z.string().regex(/^\d+(\.\d+)?$/),
    regular_price: z.string().regex(/^\d+(\.\d+)?$/),
    sale_price: z.string().optional(),
    date_on_sale_from: z.null(),
    date_on_sale_from_gmt: z.null(),
    date_on_sale_to: z.null(),
    date_on_sale_to_gmt: z.null(),
    on_sale: z.boolean(),
    purchasable: z.boolean(),
    total_sales: z.number(),
    virtual: z.boolean(),
    downloadable: z.boolean(),
    downloads: z.array(z.unknown()),
    download_limit: z.number(),
    download_expiry: z.number(),
    external_url: z.string().optional(),
    button_text: z.string().optional(),
    tax_status: z.string(),
    tax_class: z.string().optional(),
    manage_stock: z.boolean(),
    stock_quantity: z.null(),
    backorders: z.string(),
    backorders_allowed: z.boolean(),
    backordered: z.boolean(),
    low_stock_amount: z.null(),
    sold_individually: z.boolean(),
    weight: z.string().optional(),
    dimensions: dimensionsSchema,
    shipping_required: z.boolean(),
    shipping_taxable: z.boolean(),
    shipping_class: z.string().optional(),
    shipping_class_id: z.number(),
    reviews_allowed: z.boolean(),
    average_rating: z.string().regex(/^\d+(\.\d+)?$/),
    rating_count: z.number(),
    upsell_ids: z.array(z.unknown()),
    cross_sell_ids: z.array(z.unknown()),
    parent_id: z.number(),
    purchase_note: z.string().optional(),
    categories: z.array(categorySchema),
    tags: z.array(z.unknown()),
    images: z.array(z.unknown()),
    attributes: z.array(z.unknown()),
    default_attributes: z.array(z.unknown()),
    variations: z.array(z.unknown()),
    grouped_products: z.array(z.unknown()),
    menu_order: z.number(),
    price_html: z.string(),
    related_ids: z.array(z.number()),
    meta_data: z.array(metaDataSchema),
    stock_status: z.string(),
    has_options: z.boolean(),
    post_password: z.string().optional(),
    tax_amount: z.string().regex(/^\d+(\.\d+)?$/),
    regular_display_price: z.string().regex(/^\d+(\.\d+)?$/),
    sales_display_price: z.string().regex(/^\d+(\.\d+)?$/),
    barcode: z.string().optional(),
    _links: linksSchema,
});

const addressSchema = z.object({
    address_1: z.string(),
    address_2: z.string(),
    country: z.string(),
    state: z.string(),
    city: z.string(),
    postcode: z.string(),
});

const outletSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    fax: z.string(),
    website: z.string(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    address: addressSchema,
    meta: z.array(z.unknown()).optional(),
    cashiers: z.array(z.unknown()).optional(),
    counters: z.array(z.unknown()).optional(),
    _links: linksSchema.optional(),
});

const counterSchema = z.object({
    name: z.string(),
    number: z.number(),
});

export const schemas = {
    weposSettingsSchema: z.object({
        wepos_general: z.object({
            enable_fee_tax: z.enum(['yes', 'no']),
            barcode_scanner_field: z.enum(['id', 'sku', 'custom']),
        }),
        wepos_receipts: z.object({
            receipt_header: z.string(),
            receipt_footer: z.string(),
        }),
        woo_tax: z.object({
            wc_tax_display_shop: z.enum(['excl', 'incl']),
            wc_tax_display_cart: z.enum(['excl', 'incl']),
        }),
    }),

    taxesSchema: z.array(
        z.object({
            id: z.number(),
            country: z.string().optional(),
            state: z.string().optional(),
            postcode: z.string().optional(),
            city: z.string().optional(),
            rate: z.string().regex(/^\d+(\.\d+)?$/), // Ensures rate is a numeric string
            name: z.string(),
            priority: z.number(),
            compound: z.boolean(),
            shipping: z.boolean(),
            order: z.number(),
            class: z.string(),
            percentage_rate: z.string().regex(/^\d+%$/), // Ensures percentage_rate is in the format of "10%"
            _links: linksSchema,
        }),
    ),

    customersSchema: {
        customerSchema: customerSchema,
        customersSchema: z.array(customerSchema),
    },

    couponsSchema: {
        couponSchema: couponSchema,
        couponsSchema: z.array(couponSchema),
        updateBatchCoupons: z.object({
            create: z.array(couponSchema).optional(),
            update: z.array(couponSchema).optional(),
            delete: z.array(couponSchema).optional(),
        }),
    },

    productsSchema: {
        productSchema: productSchema,
        productsSchema: z.array(productSchema), //todo: need to fix
    },

    // ordersSchema: {
    //     orderSchema: orderSchema,
    //     ordersSchema: z.array(orderSchema),  //todo: need to fix
    // },

    paymentMethodsSchema: z.array(paymentMethodSchema),
    paymentSummarySchema: z.array(
        z.object({
            payment_date: z.string(),
            total_amount: z.number(),
            orders_count: z.number(),
            products_count: z.number(),
        }),
    ),
    paymentReportSchema: z.array(
        z.object({
            order_id: z.number(),
            payment_date: z.string(),
            payment_date_formatted: z.string(),
            payment_method: z.string(),
            customer_id: z.number(),
            customer_name: z.string(),
            cashier_id: z.number(),
            cashier_name: z.string(),
            outlet_id: z.number(),
            order_amount: z.number(),
            order_products_count: z.number(),
        }),
    ),

    exportedReportSchema: z.object({
        success: z.boolean(),
        data: z.object({
            step: z.string(),
            percentage: z.number().int().min(0).max(100),
            url: z.string().url(),
        }),
    }),

    outletsSchema: {
        outletSchema: outletSchema,
        outletsSchema: z.array(outletSchema),
        deleteSchema: z.array(
            z.object({
                id: z.string(),
                name: z.string(),
                email: z.string().email(),
                phone: z.string(),
                fax: z.string(),
                website: z.string(),
                created_at: z.coerce.date(),
                updated_at: z.coerce.date(),
                address_1: z.string(),
                address_2: z.string(),
                country: z.string(),
                state: z.string(),
                city: z.string(),
                postcode: z.string(),
                meta: z.string().optional(),
                cashiers: z.array(z.unknown()),
                counters: z.array(z.unknown()),
            }),
        ),
    },

    counterSchema: z.object({
        id: z.number().or(z.string()),
        outlet_id: z.number().or(z.string()),
        name: z.string(),
        number: z.string(),
        _links: linksSchema,
    }),

    cashierSchema: z.object({
        id: z.number(),
        avatar: z.string().url(),
        full_name: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email(),
        display_name: z.string(),
        created_at: z.coerce.date(),
        phone: z.string().optional(),
        address: z.string().optional(),
        outlets: z.array(outletSchema).optional(),
        _links: linksSchema.optional(),
    }),

    updateCahierSchema: z.number(),

    cashierLoginSchema: z
        .object({
            id: z.string(),
            user_id: z.string(),
            outlet_id: z.string(),
            counter_id: z.string(),
            is_logged_in: z.union([z.string(), z.number()]),
            login_at: z.string(),
            logout_at: z.nullable(z.string()),
            outlet_name: z.string(),
            counter_name: z.string(),
            number: z.string(),
        })
        .or(z.boolean()),

    loginLogoutCashier: z.object({
        id: z.number(),
        outlet_id: z.string(),
        counter_id: z.string(),
    }),

    assignCashierSchema: z.array(
        z.object({
            data: z.object({
                id: z.number(),
                avatar: z.string().url(),
                full_name: z.string(),
                first_name: z.string(),
                last_name: z.string(),
                email: z.string().email(),
                display_name: z.string(),
                created_at: z.coerce.date(),
            }),
            headers: z.array(z.unknown()), // assuming headers can be of any type
            status: z.number(),
        }),
    ),

    receiptSchema: z.object({
        style: z.object({
            padding: z.object({
                top: z.string().regex(/^\d+$/),
                right: z.string().regex(/^\d+$/),
                bottom: z.string().regex(/^\d+$/),
                left: z.string().regex(/^\d+$/),
            }),
            headingFontSize: z.string().regex(/^\d+$/),
            paragraphFontSize: z.string().regex(/^\d+$/),
        }),
        logo: z.object({
            id: z.string(),
            title: z.string(),
            url: z.string(),
            width: z.string().regex(/^\d+$/),
            height: z.string().regex(/^\d+$/),
        }),
        header: z.object({
            showOutletName: z.boolean(),
            showOutletAddress: z.boolean(),
            showOutletPhone: z.boolean(),
            phoneLabel: z.string(),
            showOutletEmail: z.boolean(),
            emailLabel: z.string(),
            showOutletFax: z.boolean(),
            faxLabel: z.string(),
            showOutletWebsite: z.boolean(),
            websiteLabel: z.string(),
            showOrderDate: z.boolean(),
            showCashierInfo: z.boolean(),
            cashierNameLabel: z.string(),
            counterNameLabel: z.string(),
            showOrderId: z.boolean(),
            orderIdLabel: z.string(),
            showCustomerDetails: z.boolean(),
            customerNameLabel: z.string(),
            customerIdLabel: z.string(),
            showVatNumber: z.boolean(),
            vatNumberLabel: z.string(),
            vatNumber: z.string(),
            showOrderNote: z.boolean(),
            orderNoteLabel: z.string(),
            orderNote: z.string(),
        }),
        items: z.object({
            colSpanNo: z.string().regex(/^\d+$/),
            showUnitCostColumn: z.boolean(),
            productColumnLabel: z.string(),
            costColumnLabel: z.string(),
            quantityColumnLabel: z.string(),
            totalColumnLabel: z.string(),
            showDiscountRow: z.boolean(),
            showTaxRow: z.boolean(),
            showFeeRow: z.boolean(),
            showPaymentMethod: z.boolean(),
        }),
        footer: z.object({
            showFooter: z.boolean(),
            footerText: z.string(),
        }),
    }),
};
