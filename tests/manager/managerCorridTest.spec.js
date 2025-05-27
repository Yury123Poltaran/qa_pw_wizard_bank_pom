import { test, expect } from '@playwright/test';

import { BankHomePage } from 'src/pages/BankHomePage';
import { ManagerDashboardPage } from 'src/pages/manager/ManagerDashboardPage';
import { AddCustomerPage } from 'src/pages/manager/AddCustomerPage';
import { CustomersPage } from 'src/pages/manager/CustomersPage';

test('Manager can delete a customer', async ({ page }) => {
  const homePage = new BankHomePage(page);
  const dashboard = new ManagerDashboardPage(page);
  const addCustomerPage = new AddCustomerPage(page);
  const customersPage = new CustomersPage(page);

  // Відкрити сторінку
  await homePage.open();
  await homePage.clickBankManagerLogin();

  // Додати нового клієнта
  await dashboard.goToAddCustomerPage();
  await addCustomerPage.addCustomerAndAccept('Ron', 'Weasley', '12345');

  // Перейти до списку клієнтів
  await dashboard.goToCustomersPage();

  // Переконатися, що клієнт з'явився у таблиці
  await expect(page.locator('tr', { hasText: 'Ron Weasley' })).toBeVisible({ timeout: 5000 });

  // Перезавантажити сторінку (якщо потрібно)
  await page.reload();

  // Повторно перевірити, що клієнт є після reload
  await expect(page.locator('tr', { hasText: 'Ron Weasley' })).toBeVisible({ timeout: 5000 });

  // Видалити клієнта
  await customersPage.deleteCustomerByName('Ron', 'Weasley');

  // Перевірити, що клієнта більше немає
  const foundRow = await customersPage.findCustomerRow('Ron', 'Weasley', '12345');
  expect(foundRow).toBeNull();
});
