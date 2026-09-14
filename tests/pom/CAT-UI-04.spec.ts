import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

test('CAT-UI-04 - Búsqueda sin resultados', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Abrimos la aplicación.
  await page.goto('https://techstore-demo-05ad.onrender.com/');

  // Realizamos login con las credenciales almacenadas en .env.
  await loginPage.login(
    loginData.admin.username,
    loginData.admin.password
  );

  // Campo de búsqueda.
  const searchInput = page.getByTestId('search-input');

  // Introducimos un texto que no existe en el catálogo.
  await searchInput.fill('xyz-no-existe');

  // Ejecutamos la búsqueda.
  await page.getByTestId('search-button').click();

  // Localizamos los productos del catálogo.
  const products = page
    .getByTestId('product-grid')
    .locator('.product-card');

  // No debe existir ningún producto.
  await expect(products).toHaveCount(0);

  // Debe mostrarse el mensaje de resultados vacíos.
  await expect(
    page.getByTestId('results-empty')
  ).toBeVisible();
});