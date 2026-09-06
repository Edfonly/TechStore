import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

test.describe('Pruebas de Login', () => {

  test('Login exitoso con usuario admin', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.irPagina();

    await loginPage.iniciarSesion(
      loginData.admin.username,
      loginData.admin.password
    );

    await loginPage.validarRol(loginData.admin.role);
  });


  test('Login exitoso con usuario manager', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.irPagina();

    await loginPage.iniciarSesion(
      loginData.manager.username,
      loginData.manager.password
    );

    await loginPage.validarRol(loginData.manager.role);
  });


  test('Login exitoso con usuario customer', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.irPagina();

    await loginPage.iniciarSesion(
      loginData.customer.username,
      loginData.customer.password
    );

    await loginPage.validarRol(loginData.customer.role);
  });


  test('Login fallido con credenciales incorrectas', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.irPagina();

    await loginPage.iniciarSesion(
      loginData.credencialesInvalidas.username,
      loginData.credencialesInvalidas.password
    );

    await loginPage.validarCredencialesInvalidas();
  });

});