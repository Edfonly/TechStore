import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

test('CAT-UI-02 - Catálogo semilla completo', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Abrimos la aplicación.
  await page.goto('https://techstore-demo-05ad.onrender.com/');

  // Realizamos login con las credenciales almacenadas en .env.
  await loginPage.login(
    loginData.admin.username,
    loginData.admin.password
  );

  // Localizamos los productos del catálogo.
  const products = page
    .getByTestId('product-grid')
    .locator('.product-card');

  // Deben existir 10 productos.
  await expect(products).toHaveCount(10);

  // Verificamos productos específicos.
  await expect(
    page.getByText('Laptop Pro 14"', { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText('Smartphone X12', { exact: true })
  ).toBeVisible();
});
