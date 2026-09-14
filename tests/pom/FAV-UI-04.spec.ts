
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

// Los favoritos comparten el mismo store.
// Este caso se ejecuta de forma controlada.
test.describe.configure({ mode: 'serial' });

test.describe('Pruebas de Favoritos - cambio de vista', () => {

  test('FAV-UI-04 - Mantener favorito al cambiar de vista', async ({ page }) => {

    const loginPage = new LoginPage(page);

    // 1. Reiniciamos el store para comenzar con 0 favoritos.
    await page.request.post(
      'https://techstore-demo-05ad.onrender.com/api/test/reset'
    );

    // 2. Abrimos la aplicación.
    await page.goto('https://techstore-demo-05ad.onrender.com/');

    // 3. Login con las credenciales almacenadas en .env.
    await loginPage.login(
      loginData.admin.username,
      loginData.admin.password
    );

    // 4. Marcamos el producto 1 como favorito.
    await page.getByTestId('favorite-1').click();

    // 5. Verificamos que el contador sea 1.
    await expect(
      page.getByTestId('favorites-count')
    ).toHaveText('1');

    // 6. Vamos a la sección Ofertas.
    await page.getByTestId('nav-deals').click();

    // 7. Verificamos que la vista de Ofertas esté visible.
    await expect(
      page.getByTestId('deals-view')
    ).toBeVisible();

    // 8. Volvemos a la sección Favoritos.
    await page.getByTestId('nav-favorites').click();

    // 9. Verificamos que la vista de Favoritos esté visible.
    await expect(
      page.getByTestId('favorites-view')
    ).toBeVisible();

    // 10. Verificamos que el contador continúe en 1.
    await expect(
      page.getByTestId('favorites-count')
    ).toHaveText('1');

    // 11. Verificamos que el producto 1 continúe en Favoritos.
    await expect(
      page.getByTestId('favorites-grid')
        .getByTestId('product-1')
    ).toBeVisible();

  });

});

