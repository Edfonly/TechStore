import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

test('CAT-UI-06 - Chips de categoría sin duplicados', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Abrimos la aplicación.
  await page.goto('https://techstore-demo-05ad.onrender.com/');

  // Realizamos login con las credenciales almacenadas en .env.
  await loginPage.login(
    loginData.admin.username,
    loginData.admin.password
  );

  // Localizamos el contenedor de filtros de categorías.
  const categoryFilters = page.getByTestId('category-filters');

  // Localizamos los chips de categoría.
  const chips = categoryFilters.locator('.chip');

  // Deben existir 7 chips: Todas + 6 categorías.
  await expect(chips).toHaveCount(7);

  // Obtenemos los textos de los chips.
  const chipTexts = await chips.allTextContents();

  // Limpiamos espacios innecesarios.
  const cleanedTexts = chipTexts.map(text => text.trim());

  // Creamos un Set para eliminar valores duplicados.
  const uniqueTexts = new Set(cleanedTexts);

  // No debe haber categorías duplicadas.
  expect(uniqueTexts.size).toBe(7);

  // Debe existir la opción "Todas".
  expect(cleanedTexts).toContain('Todas');
});