import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

// ======================================================
// FAV-UI-06
// Persistencia de favoritos después de recargar
//
// Objetivo:
// Verificar que un producto marcado como favorito
// permanezca como favorito después de recargar la página.
//
// Nota:
// Actualmente la aplicación pierde la sesión al hacer F5.
// Por eso se inicia sesión nuevamente después de recargar
// para poder comprobar la persistencia del favorito.
// ======================================================

test('FAV-UI-06 - Persistencia de favoritos después de recargar', async ({ page }) => {

  // Creamos una instancia del Page Object de Login.
  const loginPage = new LoginPage(page);

  // ------------------------------------------------------
  // PASO 1: Reiniciar el store
  // ------------------------------------------------------
  // Esto garantiza que el test comience sin favoritos
  // de pruebas anteriores.
  await page.request.post(
    'https://techstore-demo-05ad.onrender.com/api/test/reset'
  );

  // ------------------------------------------------------
  // PASO 2: Ingresar a la aplicación
  // ------------------------------------------------------
  await page.goto('https://techstore-demo-05ad.onrender.com/');

  // ------------------------------------------------------
  // PASO 3: Iniciar sesión
  // ------------------------------------------------------
  // Las credenciales se obtienen desde el archivo .env.
  await loginPage.login(
    loginData.admin.username,
    loginData.admin.password
  );

  // Verificamos que el usuario esté autenticado.
  await expect(
    page.getByTestId('sidebar')
  ).toBeVisible();

  // ------------------------------------------------------
  // PASO 4: Marcar el producto 1 como favorito
  // ------------------------------------------------------
  await page.getByTestId('favorite-1').click();

  // ------------------------------------------------------
  // PASO 5: Verificar que el contador sea 1
  // ------------------------------------------------------
  await expect(
    page.getByTestId('favorites-count')
  ).toHaveText('1');

  // ------------------------------------------------------
  // PASO 6: Ir a Favoritos
  // ------------------------------------------------------
  await page.getByTestId('nav-favorites').click();

  // Confirmamos que estamos en la vista Favoritos.
  await expect(
    page.getByTestId('favorites-view')
  ).toBeVisible();

  // Confirmamos que el producto 1 aparece como favorito.
  await expect(
    page.getByTestId('favorites-grid')
      .getByTestId('product-1')
  ).toBeVisible();

  // ------------------------------------------------------
  // PASO 7: Recargar la página
  // ------------------------------------------------------
  await page.reload();

  // ------------------------------------------------------
  // IMPORTANTE:
  // Actualmente la aplicación pierde la sesión después
  // de F5. Por eso volvemos a iniciar sesión.
  // ------------------------------------------------------

  await loginPage.login(
    loginData.admin.username,
    loginData.admin.password
  );

  // Verificamos que el usuario haya vuelto a autenticarse.
  await expect(
    page.getByTestId('sidebar')
  ).toBeVisible();

  // ------------------------------------------------------
  // PASO 8: Volver a la vista Favoritos
  // ------------------------------------------------------
  await page.getByTestId('nav-favorites').click();

  await expect(
    page.getByTestId('favorites-view')
  ).toBeVisible();

  // ------------------------------------------------------
  // PASO 9: Verificar persistencia del favorito
  // ------------------------------------------------------
  // El producto 1 debe continuar siendo favorito.
  await expect(
    page.getByTestId('favorites-grid')
      .getByTestId('product-1')
  ).toBeVisible();

  // El contador debe indicar que existe 1 favorito.
  await expect(
    page.getByTestId('favorites-count')
  ).toHaveText('1');
});

