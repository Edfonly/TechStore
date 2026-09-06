import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly currentRole: Locator;
  readonly loginError: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByTestId('username-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
    this.currentRole = page.getByTestId('current-role');
    this.loginError = page.getByTestId('login-error');
  }

  async irPagina(): Promise<void> {
    await this.page.goto('https://techstore-demo-05ad.onrender.com/');
  }

  async iniciarSesion(
    username: string,
    password: string
  ): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async validarRol(rol: string): Promise<void> {
    await expect(this.currentRole).toBeVisible();
    await expect(this.currentRole).toHaveText(rol);
  }

  async validarCredencialesInvalidas(): Promise<void> {
    await expect(this.loginError).toBeVisible();
    await expect(this.loginError).toHaveText('Credenciales inválidas');
  }
}