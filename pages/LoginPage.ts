import { Page, Locator } from '@playwright/test';

export class LoginPage {

  readonly page: Page;
  readonly errorMessage: Locator;
  readonly requiredMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Mensaje para credenciales incorrectas.
    this.errorMessage = page.getByText('Credenciales inválidas');

    // Mensaje para campos vacíos.
    this.requiredMessage = page.getByText('username y password son obligatorios');
  }

  async login(username: string, password: string) {

    await this.page
      .getByTestId('username-input')
      .fill(username);

    await this.page
      .getByTestId('password-input')
      .fill(password);

    await this.page
      .getByTestId('login-button')
      .click();
  }
}