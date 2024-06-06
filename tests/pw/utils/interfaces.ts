// customer details
export interface customerDetails {
    firstName: string;
    lastName: string;
    email: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    phone: string;
}

// wepos settings
export interface weposSettings {
    general: {
        calculateTaxForFee: string;
        barcodeScannerField: string;
        saveSuccessMessage: string;
    };
    receipts: {
        orderReceiptHeader: string;
        orderReceiptFooter: string;
        saveSuccessMessage: string;
    };
}

export interface outlet {
    outletName: string;

    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;

    email: string;
    phone: string;
    fax: string;
    website: string;
}
export interface outlet {
    outletName: string;

    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;

    email: string;
    phone: string;
    fax: string;
    website: string;
}
export interface counter {
    name: string;
    number: string;
}

export interface cashier {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    website: string;
    create: string;
}
