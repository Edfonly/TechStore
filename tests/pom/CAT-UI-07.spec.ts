import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

test('CAT-UI-07 - Vista de ofertas', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Abrimos la aplicación.
  await page.goto('https://techstore-demo-05ad.onrender.com/');

  // Realizamos login con las credenciales almacenadas en .env.
  await loginPage.login(
    loginData.admin.username,
    loginData.admin.password
  );

  // Ir a Ofertas.
  await page.getByTestId('nav-deals').click();

  // Verificamos que la vista de ofertas sea visible.
  await expect(
    page.getByTestId('deals-view')
  ).toBeVisible();

  // Localizamos los productos dentro de Ofertas.
  const products = page
    .getByTestId('deals-grid')
    .locator('.product-card');

  // Deben existir 7 productos rebajados.
  await expect(products).toHaveCount(7);

  // Verificamos que Laptop Pro 14" esté dentro de Ofertas.
  await expect(
    page.getByTestId('deals-grid')
      .getByText('Laptop Pro 14"', { exact: true })
  ).toBeVisible();
});