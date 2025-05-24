import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

test('Manager can add new customer', async ({ page }) => {
  // 1–3. Generate random customer data
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  // 4. Navigate to the "Add Customer" page
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust');

  // 5. Add new customer using POM
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.addCustomer(firstName, lastName, postCode);

  // 6. Accept the alert popup
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Customer added successfully');
    await dialog.accept();
  });

  // 7. Reload page to avoid stale data
  await page.reload();

  // 8. Go to the "Customers" page
  await page.getByText('Customers').click();

  // 9. Wait until customer table is visible
  await page.waitForSelector('table tbody tr');

  // 10. Try to find the newly added customer
  const tableRows = await page.locator('table tbody tr');
  const rowCount = await tableRows.count();

  let found = false;

  for (let i = 0; i < rowCount; i++) {
    const row = tableRows.nth(i);
    const textContent = await row.innerText();

    if (
      textContent.includes(firstName) &&
      textContent.includes(lastName) &&
      textContent.includes(postCode)
    ) {
      // 11. Assert that account number is still empty
      const accountCell = row.locator('td').nth(3);
      await expect(accountCell).toHaveText('');
      found = true;
      break;
    }
  }

  // 12. Assert that the customer was actually found
  expect(found).toBeTruthy();
});
