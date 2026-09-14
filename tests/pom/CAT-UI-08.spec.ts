import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

test('CAT-UI-08 - Cálculo de porcentaje de descuento', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Abrimos la aplicación.
  await page.goto('https://techstore-demo-05ad.onrender.com/');

  // Realizamos login con las credenciales almacenadas en .env.
  await loginPage.login(
    loginData.admin.username,
    loginData.admin.password
  );

  // Localizamos el producto Laptop Pro 14".
  const product = page.getByTestId('product-1');

  // Verificamos que el producto sea visible.
  await expect(product).toBeVisible();

  // Verificamos el precio actual.
  await expect(
    product.getByText('$1299.00')
  ).toBeVisible();

  // Verificamos el precio anterior.
  await expect(
    product.getByText('$1499.00')
  ).toBeVisible();

  // Verificamos el porcentaje de descuento.
  await expect(
    product.getByText('-13%')
  ).toBeVisible();
});

