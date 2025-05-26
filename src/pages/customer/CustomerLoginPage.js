const { expect } = require('@playwright/test');

export class CustomerLoginPage {
  constructor(page) {
    this.page = page; 
    this.customerDropDown = page.getByTestId('userSelect');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/customer');
  }

  async waitForOpened() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/customer');
  }

  async selectCustomer(customerName) {
    await this.customerDropDown.selectOption(customerName);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async assertSelectCustomerDropdownIsVisible() {
    await expect(this.customerDropDown).toBeVisible();
  }

  async assertSelectCustomerDropdownContainsValue(value) {
    const currentOptionText = await this.customerDropDown.inputValue();
    expect(currentOptionText).toBe(value);
  }
}

   export default CustomerLoginPage;
