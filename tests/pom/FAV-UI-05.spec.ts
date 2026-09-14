import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

// ======================================================
// FAV-UI-05
// Persistencia de sesión después de recargar
//
// Objetivo:
// Verificar que el usuario permanezca autenticado
// después de recargar la página mediante F5.
// ======================================================

test('FAV-UI-05 - Persistencia de sesión después de recargar', async ({ page }) => {

  const loginPage = new LoginPage(page);

  // 1. Abrimos la aplicación.
  await page.goto('https://techstore-demo-05ad.onrender.com/');

  // 2. Login con las credenciales almacenadas en .env.
  await loginPage.login(
    loginData.admin.username,
    loginData.admin.password
  );

  // 3. Verificamos que el usuario ingresó correctamente.
  // El menú lateral solo está disponible cuando
  // la sesión está activa.
  await expect(
    page.getByTestId('sidebar')
  ).toBeVisible();

  // 4. Vamos a la sección Favoritos.
  await page.getByTestId('nav-favorites').click();

  // 5. Verificamos que estamos en Favoritos.
  await expect(
    page.getByTestId('favorites-view')
  ).toBeVisible();

  // 6. Recargamos la página simulando F5.
  await page.reload();

  // 7. Verificamos que la sesión continúe activa.
  await expect(
    page.getByTestId('sidebar')
  ).toBeVisible();

  // 8. Verificamos que el usuario continúe
  // pudiendo acceder a Favoritos sin volver a iniciar sesión.
  await expect(
    page.getByTestId('nav-favorites')
  ).toBeVisible();

});

