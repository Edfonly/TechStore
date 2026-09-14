import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

// Los favoritos comparten el mismo store.
// Este caso se ejecuta de forma controlada.
test.describe.configure({ mode: 'serial' });

test.describe('Pruebas de Favoritos - varios productos', () => {

  test('FAV-UI-03 - Marcar varios productos como favoritos', async ({ page }) => {

    const loginPage = new LoginPage(page);

    // 1. Reiniciamos el store para comenzar con 0 favoritos.
    await page.request.post(
      'https://techstore-demo-05ad.onrender.com/api/test/reset'
    );

    // 2. Abrimos la aplicación.
    await page.goto('https://techstore-demo-05ad.onrender.com/');

   // Login con las credenciales almacenadas en .env.
    await loginPage.login(
      loginData.admin.username,
      loginData.admin.password
    );

    // 4. Marcamos los productos 1, 2 y 3 como favoritos.
    await page.getByTestId('favorite-1').click();
    await page.getByTestId('favorite-2').click();
    await page.getByTestId('favorite-3').click();

    // 5. Verificamos que el contador sea 3.
    await expect(
      page.getByTestId('favorites-count')
    ).toHaveText('3');

    // 6. Vamos a la sección Favoritos.
    await page.getByTestId('nav-favorites').click();

    // 7. Verificamos que la vista de Favoritos esté visible.
    await expect(
      page.getByTestId('favorites-view')
    ).toBeVisible();

    // 8. Verificamos que los tres productos aparezcan.
    await expect(
      page.getByTestId('favorites-grid')
        .getByTestId('product-1')
    ).toBeVisible();

    await expect(
      page.getByTestId('favorites-grid')
        .getByTestId('product-2')
    ).toBeVisible();

    await expect(
      page.getByTestId('favorites-grid')
        .getByTestId('product-3')
    ).toBeVisible();

  });

});