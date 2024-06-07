import { ConsoleMessage, Page, expect } from '@playwright/test';
import { BasePage } from '@pages/basePage';
import { selector } from '@pages/selectors';
import { data } from '@utils/testData';
import { customerDetails } from '@utils/interfaces';
import { helpers } from '@utils/helpers';

const { WEPOS_PRO } = process.env;

// selectors
const wepos = selector.admin.wepos;
const pos = selector.admin.wepos.viewPos;

export class ViewPos extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // navigation

    async goToPos() {
        await this.goIfNotThere(data.subUrls.backend.wepos.viewPos);
    }

    // pos render properly
    async posRenderProperly() {
        await this.goToPos();

        // serach product
        await this.toBeVisible(pos.searchProduct);
        await this.toBeVisible(pos.searchType('Product'));
        await this.toBeVisible(pos.searchType('Scan'));

        // category
        await this.toBeVisible(pos.categoryDropdown);

        // layout style
        await this.toBeVisible(pos.layoutStyle('grid'));
        await this.toBeVisible(pos.layoutStyle('list'));

        // product container
        await this.toBeVisible(pos.productContainer);

        // customer
        await this.toBeVisible(pos.searchCustomer);
        await this.toBeVisible(pos.addNewCustomer);

        // more option
        await this.toBeVisible(pos.moreOption);

        // cart
        await this.toBeVisible(pos.cart.cart);

        // subtotal
        await this.toBeVisible(pos.cart.subtotal);

        // cart options
        await this.toBeVisible(pos.cart.addDiscount);
        await this.toBeVisible(pos.cart.addFee);
        await this.toBeVisible(pos.cart.addNote);

        // pay now
        await this.toBeVisible(pos.cart.payNow);
    }

    // search product
    async searchProduct(productName: string) {
        await this.goToPos();
        await this.click(pos.searchType('Product'));
        await this.clearInputField(pos.searchProduct);
        await this.type(pos.searchProduct, productName);
        await this.toBeVisible(pos.searchedProduct(productName));
    }

    // filter product
    async filterProducts(categoryName: string) {
        await this.goToPos();
        await this.click(pos.categoryDropdown);
        await this.click(pos.uncategorized);
        await this.toBeVisible(pos.selectedCategory(categoryName));
    }

    // toggle layout
    async toggleLayout(style: string) {
        await this.goToPos();
        await this.click(pos.layoutStyle(style));
        await this.toContainClass(pos.productContainer, style);
    }

    // search customer
    async searchCustomer(customerName: string) {
        await this.goToPos();
        await this.type(pos.searchCustomer, customerName);
        await this.toContainText(pos.searchedCustomer, customerName);
    }

    // add new customer
    async addCustomer(customerdetails: customerDetails) {
        await this.goToPos();
        await this.click(pos.addNewCustomer);
        await this.clearAndType(pos.customerdetails.firstName, customerdetails.firstName);
        await this.clearAndType(pos.customerdetails.lastName, customerdetails.lastName);
        await this.clearAndType(pos.customerdetails.email, customerdetails.email);
        await this.clearAndType(pos.customerdetails.address1, customerdetails.address1);
        await this.clearAndType(pos.customerdetails.address2, customerdetails.address2);
        // await this.click(pos.customerdetails.countryDropdown);
        // await this.clearAndType(pos.customerdetails.countryInput, customerdetails.country);
        // await this.click(pos.customerdetails.searchedCountry);
        await this.clearAndType(pos.customerdetails.state, customerdetails.state);
        await this.clearAndType(pos.customerdetails.city, customerdetails.city);
        await this.clearAndType(pos.customerdetails.zipCode, customerdetails.zipCode);
        await this.clearAndType(pos.customerdetails.phone, customerdetails.phone);

        await this.click(pos.customerdetails.addCustomer);
        await this.toHaveValue(pos.searchCustomer, `${customerdetails.firstName} ${customerdetails.lastName}`);
    }

    // empty cart
    async emptyCart() {
        await this.goToPos();
        await this.click(pos.moreOption);
        await this.click(pos.moreoptions.emptyCart);
        await this.toBeVisible(pos.cart.emptyCart);
    }

    // view keyboard shortcut
    async viewKeyboardShortcut() {
        await this.goToPos();
        await this.click(pos.moreOption);
        await this.click(pos.moreoptions.help);
        await this.toBeVisible(pos.shortcutKeys);
        await this.click(wepos.modal.closeModal);
    }

    //  switch counter
    async switchCounter() {
        await this.goToPos();
        await this.click(pos.moreOption);
        await this.clickAndWaitForLoadState(pos.moreoptions.switchCounter);
        // todo: add switch counter logic
    }

    //  logout
    async logout() {
        await this.goToPos();
        await this.click(pos.moreOption);
        await this.clickAndWaitForLoadState(pos.moreoptions.logout);
        await this.toBeVisible(selector.frontend.myAccount);
    }

    // add product to cart
    async addToCart(productName: string) {
        await this.searchProduct(productName);
        await this.pressOnSelector(pos.searchedProduct(productName), 'Enter');
        await this.toBeVisible(pos.cart.cartProduct(productName));
    }

    // update cart product quantity
    async editCartProductQuantity(productName: string, quantity: string) {
        await this.addToCart(productName);
        await this.click(pos.cart.editCartProduct(productName));
        await this.clearAndType(pos.cart.productQuantityInput(productName), quantity);
        await this.toContainText(pos.cart.cartProductQuantity(productName), quantity);
    }

    // remove product from cart
    async removeCartProduct(productName: string) {
        await this.addToCart(productName);
        await this.click(pos.cart.removeCartProduct(productName));
        await this.notToBeVisible(pos.cart.cartProduct(productName));
    }

    // add discount
    async addDiscount(productName: string, type: string, amount: string) {
        await this.addToCart(productName);
        await this.click(pos.cart.addDiscount);
        await this.clearAndType(pos.cart.feeDetails.feeInput, amount);
        await this.click(pos.cart.feeDetails.feeType(type));
        await this.toContainText(pos.cart.feeDetails.feeAmount('Discount'), amount);
    }

    // add fee
    async addFee(productName: string, type: string, amount: string) {
        await this.addToCart(productName);
        await this.click(pos.cart.addFee);
        await this.clearAndType(pos.cart.feeDetails.feeInput, amount);
        await this.click(pos.cart.feeDetails.feeType(type));
        await this.toContainText(pos.cart.feeDetails.feeAmount('Fee'), amount);
    }

    // add note
    async addnote(productName: string, note: string) {
        await this.addToCart(productName);
        await this.click(pos.cart.addNote);
        await this.clearAndType(pos.cart.noteDetails.noteInput, note);
        await this.click(pos.cart.noteDetails.addNote);
        await this.toContainText(pos.cart.noteText, note);
    }

    // complete sale
    async completeSale(productName: string, closeModal: boolean = true) {
        await this.addToCart(productName);
        await this.click(pos.cart.payNow);
        const amount = (await this.getElementText(pos.saleSummary.payAmount)) as string;
        await this.clearAndType(pos.saleSummary.cashInput, helpers.removeCurrencySign(amount));
        await this.clickAndAcceptAndWaitForResponse(data.subUrls.api.wc.orders, pos.saleSummary.processPayment, 201);
        await this.toBeVisible(pos.saleSummary.saleCompleted);
        await this.toBeVisible(pos.saleSummary.printReceipt);

        // close modal
        closeModal && (await this.click(wepos.modal.closeModal));
    }

    // complete sale with print receipt
    async completeSaleWithPrintReceipt(productName: string) {
        await this.completeSale(productName, false);

        // add event listener to print button for assertion
        const pageFunction = (node: any) => node.addEventListener('click', () => console.log('Print button clicked!'));
        await this.evaluate(pos.saleSummary.printReceipt, pageFunction);
        const res = (await this.clickAndWaitForEvent('console', pos.saleSummary.printReceipt)) as unknown as ConsoleMessage;
        expect(res.text()).toBe('Print button clicked!');

        // await this.click(pos.saleSummary.printReceipt);
        await this.toBeVisible(pos.saleSummary.saleCompleted);
        await this.toBeVisible(pos.saleSummary.printReceipt);

        // close modal
        await this.click(wepos.modal.closeModal);
    }
}
