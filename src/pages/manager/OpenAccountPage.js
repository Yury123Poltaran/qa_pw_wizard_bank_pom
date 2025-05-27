import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerDropdown = page.locator('select#userSelect');     
    this.currencyDropdown = page.locator('select#currency');        
    this.processButton = page.locator('button[type="submit"]');
  }

  async selectCustomer(name) {
    await this.customerDropdown.selectOption({ label: name });
  }

  async selectCurrency(currency) {
    await this.currencyDropdown.selectOption({ label: currency });
  }

  async clickProcessButton() {
    await this.processButton.click();
  }
}
