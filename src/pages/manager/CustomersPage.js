import { expect } from '@playwright/test';

export class CustomersPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search Customer');
    this.tableRows = page.locator('tbody tr');
  }

  async searchCustomer(name) {
    await this.searchInput.fill(name);
  }

  async deleteCustomerByName(firstName, lastName) {
    const rows = this.page.locator('tbody tr');
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const text = await row.innerText();

      if (text.includes(firstName) && text.includes(lastName)) {
        const deleteButton = row.locator('button', { hasText: 'Delete' });
        await expect(deleteButton).toBeVisible({ timeout: 10000 });
        await deleteButton.click();
        return;
      }
    }

    throw new Error(`Customer ${firstName} ${lastName} not found`);
  }

  async findCustomerRow(firstName, lastName, postCode) {
    const rowCount = await this.tableRows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = this.tableRows.nth(i);
      const text = await row.innerText();

      if (
        text.includes(firstName) &&
        text.includes(lastName) &&
        text.includes(postCode)
      ) {
        return row;
      }
    }

    return null;
  }
}
