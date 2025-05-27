export class ManagerDashboardPage {
  constructor(page) {
    this.page = page;
    this.addCustomerTab = page.getByText('Add Customer');
    this.openAccountTab = page.getByText('Open Account');
    this.customersTab = page.getByText('Customers');
  }

  async goToAddCustomerPage() {
    await this.addCustomerTab.click();
  }

  async goToOpenAccountPage() {
    await this.openAccountTab.click();
  }

  async goToCustomersPage() {
    await this.customersTab.click();
  }
}
