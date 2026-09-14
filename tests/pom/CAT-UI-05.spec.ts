import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

test('CAT-UI-05 - Filtro por categoría', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Abrimos la aplicación.
  await page.goto('https://techstore-demo-05ad.onrender.com/');

  // Realizamos login con las credenciales almacenadas en .env.
  await loginPage.login(
    loginData.admin.username,
    loginData.admin.password
  );

  // Seleccionamos la categoría Accesorios.
  await page.getByTestId('category-Accesorios').click();

  // Localizamos los productos del catálogo.
  const products = page.locator('.product-card');

  // Deben aparecer 3 productos de la categoría Accesorios.
  await expect(products).toHaveCount(3);

  // Quitamos el filtro seleccionando Todas.
  await page.getByTestId('category-all').click();

  // Deben volver a aparecer los 10 productos.
  await expect(products).toHaveCount(10);
});