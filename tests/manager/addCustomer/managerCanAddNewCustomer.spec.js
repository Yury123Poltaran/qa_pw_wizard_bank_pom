import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { ManagerDashboardPage } from '../../../src/pages/manager/ManagerDashboardPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersPage } from '../../../src/pages/manager/CustomersPage';

test('Manager can add new customer', async ({ page }) => {
  // 1. Згенеруй дані клієнта
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  // 2. Ініціалізація сторінок
  const mainPage = new BankHomePage(page);
  const dashboard = new ManagerDashboardPage(page);
  const addCustomerPage = new AddCustomerPage(page);
  const customersPage = new CustomersPage(page);

  // 3. Відкриття головної сторінки й вхід як менеджер
  await mainPage.open();
  await mainPage.clickBankManagerLogin();
  await dashboard.goToAddCustomerPage();

  // 4. Реєстрація обробника діалогу ДО кліку
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Customer added successfully');
    await dialog.accept();
  });

  // 5. Додавання нового клієнта
  await addCustomerPage.addCustomer(firstName, lastName, postCode);

  // 6. Перехід на вкладку "Customers"
  await dashboard.goToCustomersPage();

  // 7. Очікування таблиці
  await page.waitForSelector('table tbody tr');

  // 8. Пошук клієнта в таблиці
  const foundRow = await customersPage.findCustomerRow(firstName, lastName, postCode);
  expect(foundRow).not.toBeNull();

  // 9. Перевірка, що поле Account Number ще порожнє
  const accountCell = foundRow.locator('td').nth(3);
  await expect(accountCell).toHaveText('');
});
