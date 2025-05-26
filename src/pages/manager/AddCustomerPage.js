export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('input[placeholder="First Name"]');
    this.lastNameInput = page.locator('input[placeholder="Last Name"]');
    this.postCodeInput = page.locator('input[placeholder="Post Code"]');
    this.addCustomerButton = page.locator('button[type="submit"]');
  }

  async addCustomer(firstName, lastName, postCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postCode);

    
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.addCustomerButton.click();
    const dialog = await dialogPromise;

    await dialog.accept();
  }
}


