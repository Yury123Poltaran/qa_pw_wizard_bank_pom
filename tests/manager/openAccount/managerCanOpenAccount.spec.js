import { test, expect } from '@playwright/test';
import { BankHomePage } from 'src/pages/BankHomePage';
import { ManagerDashboardPage } from 'src/pages/manager/ManagerDashboardPage';
import { OpenAccountPage } from 'src/pages/manager/OpenAccountPage';

test('Manager can open new account for existing customer', async ({ page }) => {
  const homePage = new BankHomePage(page);
  const dashboard = new ManagerDashboardPage(page);
  const openAccountPage = new OpenAccountPage(page);

  // 1. Відкрити головну сторінку і увійти як менеджер
  await homePage.open();
  await homePage.clickBankManagerLogin();

  // 2. Перейти на вкладку Open Account
  await dashboard.goToOpenAccountPage();

  // 3. Обрати клієнта та валюту
  await openAccountPage.selectCustomer('Harry Potter');
  await openAccountPage.selectCurrency('Dollar');

  // 4. Дочекатися діалогу після кліку
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Account created successfully');
    await dialog.accept();
  });

  // 5. Натиснути кнопку [Process]
  await openAccountPage.clickProcessButton();
});
