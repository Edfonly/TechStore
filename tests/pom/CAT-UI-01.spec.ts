import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

test('CAT-UI-01 - Menú lateral visible tras login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Abrimos la aplicación.
  await page.goto('https://techstore-demo-05ad.onrender.com/');

  // Realizamos login con un usuario válido.
  await loginPage.login(
    loginData.admin.username,
    loginData.admin.password
  );

  // Verificamos que el menú lateral sea visible.
  const sidebar = page.getByTestId('sidebar');
  await expect(sidebar).toBeVisible();

  // Verificamos las opciones principales del menú.
  await expect(page.getByTestId('nav-home')).toBeVisible();
  await expect(page.getByTestId('nav-deals')).toBeVisible();
  await expect(page.getByTestId('nav-favorites')).toBeVisible();
  await expect(page.getByTestId('nav-orders')).toBeVisible();
});