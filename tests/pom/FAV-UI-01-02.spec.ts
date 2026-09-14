import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

// Los casos de favoritos comparten el mismo store.
// Por eso se ejecutan uno después del otro.
test.describe.configure({ mode: 'serial' });

test.describe('Pruebas de Favoritos', () => {

  test('FAV-UI-01 - Marcar producto como favorito', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Reseteamos el store para comenzar con 0 favoritos.
    await page.request.post('https://techstore-demo-05ad.onrender.com/api/test/reset');

    // Abrimos la aplicación.
    await page.goto('https://techstore-demo-05ad.onrender.com/');

    // Login con las credenciales almacenadas en .env.
    await loginPage.login(
      loginData.admin.username,
      loginData.admin.password
    );

    // Marcamos como favorito el producto 1.
    await page.getByTestId('favorite-1').click();

    // Verificamos que el contador de favoritos sea 1.
    await expect(
      page.getByTestId('favorites-count')
    ).toHaveText('1');

    // Accedemos a la vista de Favoritos.
    await page.getByTestId('nav-favorites').click();

    // Verificamos que la vista de Favoritos esté visible.
    await expect(
      page.getByTestId('favorites-view')
    ).toBeVisible();

    // Verificamos que el producto 1 aparezca en Favoritos.
    await expect(
      page.getByTestId('favorites-grid')
        .getByTestId('product-1')
    ).toBeVisible();
  });


  test('FAV-UI-02 - Desmarcar producto como favorito', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Reseteamos el store para comenzar con 0 favoritos.
    await page.request.post('https://techstore-demo-05ad.onrender.com/api/test/reset');

    // Abrimos la aplicación.
    await page.goto('https://techstore-demo-05ad.onrender.com/');

    // Login con las credenciales almacenadas en .env.
    await loginPage.login(
      loginData.admin.username,
      loginData.admin.password
    );

    // Marcamos el producto 2 como favorito.
    await page.getByTestId('favorite-2').click();

    // Verificamos que el contador sea 1.
    await expect(
      page.getByTestId('favorites-count')
    ).toHaveText('1');

    // Vamos a la sección Favoritos.
    await page.getByTestId('nav-favorites').click();

    // Verificamos que el producto 2 esté visible.
    await expect(
      page.getByTestId('favorites-grid')
        .getByTestId('product-2')
    ).toBeVisible();

    // Desmarcamos el producto 2 desde Favoritos.
    await page.getByTestId('favorites-grid')
      .getByTestId('favorite-2')
      .click();

    // El contador debe volver a 0.
    await expect(
      page.getByTestId('favorites-count')
    ).toHaveText('0');

    // El estado vacío de Favoritos debe aparecer.
    await expect(
      page.getByTestId('favorites-empty')
    ).toBeVisible();
  });

});

