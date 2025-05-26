import { expect } from '@playwright/test';

class CustomerAccountPage {
  constructor(page) {
    this.page = page;
    this.accountIdDropDown = page.getByTestId('accountSelect');
    this.accountDataLine = page.locator('div').filter({ hasText: 'Account Number' }).first();
    this.depositButton = page.getByRole('button', { name: 'Deposit' });
    this.transactionsButton = page.getByRole('button', { name: 'Transactions' });
    this.amountInputField = page.getByPlaceholder('amount');

    // 🛠️ Виправлений локатор для форми "Deposit", щоб уникнути strict mode error
    this.depositFormButton = page.getByRole('form').getByRole('button', { name: 'Deposit' });

    this.depositSuccessfulMessage = page.getByText('Deposit Successful');
    this.withdrawButton = page.getByRole('button', { name: 'Withdraw' });

    this.withdrawFormButton = page.getByRole('form').getByRole('button', { name: 'Withdraw' }); // 👈 важливо!
    this.withdrawBalanceErrorMessage = page.getByText(
      'Transaction Failed. You can not withdraw amount more than the balance.'
    );
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/account');
  }

  async assertAccountIdInDropDownHasValue(value) {
    const accountNumberInDropdown = await this.accountIdDropDown.inputValue();
    expect(accountNumberInDropdown).toBe(value);
  }

  async assertAccountLineContainsText(text) {
    await expect(this.accountDataLine).toContainText(text);
  }

  async clickDepositButton() {
    await this.depositButton.click();
  }

  async clickTransactionsButton() {
    await this.transactionsButton.click();
  }

  async clickWithdrawButton() {
    await this.withdrawButton.click();
  }

  async fillAmountInputField(amount) {
    await this.amountInputField.fill(amount);
  }

  async clickDepositFormButton() {
    await this.depositFormButton.click();
  }

  async clickWithdrawFormButton() {
    await this.withdrawFormButton.click();
  }

  async clickLogoutButton() {
    await this.logoutButton.click();
  }

  async assertDepositSuccessfulMessageIsVisible() {
    await expect(this.depositSuccessfulMessage).toBeVisible();
  }

  async assertWithdrawNoBalanceErrorMessageIsVisible() {
    await expect(this.withdrawBalanceErrorMessage).toBeVisible();
  }
}


export default CustomerAccountPage;
