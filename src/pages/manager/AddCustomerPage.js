export class AddCustomerPage {
  constructor(page) {
    this.page               = page;
    this.firstNameInput     = page.locator('input[placeholder="First Name"]');
    this.lastNameInput      = page.locator('input[placeholder="Last Name"]');
    this.postCodeInput      = page.locator('input[placeholder="Post Code"]');
    this.addCustomerButton  = page.locator('button[type="submit"]');
  }

  /**
   * Одночасно створює клієнта та приймає alert
   */
  async addCustomerAndAccept(firstName, lastName, postCode) {
    // Підписуємося на діалог і відразу accept
    this.page.once('dialog', dialog => dialog.accept());
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postCode);
    await this.addCustomerButton.click();
  }
}



