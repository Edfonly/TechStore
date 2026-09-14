import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';


test('CAT-UI-03 - Búsqueda filtra productos', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Abrimos la aplicación.
  await page.goto('https://techstore-demo-05ad.onrender.com/');

  // Realizamos login con las credenciales almacenadas en .env.
  await loginPage.login(
    loginData.admin.username,
    loginData.admin.password
  );

  // Campo de búsqueda.
  const search = page.getByPlaceholder(
    'Buscar productos, marcas y más...'
  );

  await search.fill('smart');

  // Deben aparecer 2 productos.
  const products = page.locator('.product-card');

  await expect(products).toHaveCount(2);

  // Verificamos los productos encontrados.
  await expect(
    page.getByText('Smartphone X12', { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText('Smartwatch Fit 3', { exact: true })
  ).toBeVisible();
});
