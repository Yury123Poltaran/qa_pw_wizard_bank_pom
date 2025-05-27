import { test, expect } from '@playwright/test';
import { BankHomePage } from 'src/pages/BankHomePage';
import { ManagerDashboardPage } from 'src/pages/manager/ManagerDashboardPage';
import { CustomersPage } from 'src/pages/manager/CustomersPage';
import { AddCustomerPage } from 'src/pages/manager/AddCustomerPage';

test('Manager can search a customer by name', async ({ page }) => {
  const homePage = new BankHomePage(page);
  const dashboard = new ManagerDashboardPage(page);
  const addCustomerPage = new AddCustomerPage(page);
  const customersPage = new CustomersPage(page);

  await homePage.open();
  await homePage.clickBankManagerLogin();

  await dashboard.goToAddCustomerPage();
  await addCustomerPage.addCustomerAndAccept('Harry', 'Potter', '99999');

  await dashboard.goToCustomersPage();

  await customersPage.searchCustomer('Harry');

  const foundRow = await customersPage.findCustomerRow('Harry', 'Potter', '99999');
  expect(foundRow).not.toBeNull();
});
