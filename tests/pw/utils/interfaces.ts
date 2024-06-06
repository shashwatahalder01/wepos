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
