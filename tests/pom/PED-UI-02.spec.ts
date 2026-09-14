import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';


test.describe('Pruebas de Pedidos', () => {

  test('PED-UI-02 - Sin compras previas', async ({ page }) => {

    const loginPage = new LoginPage(page);

    // ==================================================
    // 1. Reiniciamos el store
    // ==================================================
    await page.request.post(
      'https://techstore-demo-05ad.onrender.com/api/test/reset'
    );

    // ==================================================
    // 2. Abrimos la aplicación
    // ==================================================
    await page.goto('https://techstore-demo-05ad.onrender.com/');

    // ==================================================
    // 3. Iniciamos sesión
    // ==================================================
    // Las credenciales se obtienen desde el archivo .env.
    await loginPage.login(
      loginData.admin.username,
      loginData.admin.password
    );

    await expect(
      page.getByTestId('sidebar')
    ).toBeVisible();

    // ==================================================
    // 4. Vamos a "Mis pedidos"
    // ==================================================
    await page.getByTestId('nav-orders').click();

    // ==================================================
    // 5. Verificamos que estamos en la vista de pedidos
    // ==================================================
    await expect(
      page.getByTestId('orders-view')
    ).toBeVisible();

    // ==================================================
    // 6. Verificamos que aparezca el estado vacío
    // ==================================================
    await expect(
      page.getByTestId('orders-empty')
    ).toBeVisible();

    // ==================================================
    // 7. Verificamos que no existan pedidos
    // ==================================================
    await expect(
      page.getByTestId('orders-list')
        .locator('.order-item')
    ).toHaveCount(0);
  });

});

