import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

test.describe('Pruebas de Pedidos', () => {

  test('PED-UI-08 - Verificar número de pedido generado', async ({ page }) => {

    const loginPage = new LoginPage(page);

    // ======================================================
    // 1. RESTABLECER DATOS
    // ======================================================

    await page.request.post(
      'https://techstore-demo-05ad.onrender.com/api/test/reset'
    );

    // ======================================================
    // 2. ABRIR APLICACIÓN
    // ======================================================

    await page.goto('https://techstore-demo-05ad.onrender.com/');

    // ======================================================
    // 3. INICIAR SESIÓN
    // ======================================================

    // Credenciales almacenadas en el archivo .env
    await loginPage.login(
      loginData.admin.username,
      loginData.admin.password
    );

    await expect(
      page.getByTestId('sidebar')
    ).toBeVisible();

    // ======================================================
    // 4. AGREGAR PRODUCTO AL CARRITO
    // ======================================================

    await page.getByTestId('add-to-cart-6').click();

    // ======================================================
    // 5. ABRIR CARRITO
    // ======================================================

    await page.getByTestId('cart-toggle').click();

    await expect(
      page.getByTestId('cart-panel')
    ).toBeVisible();

    // ======================================================
    // 6. FINALIZAR COMPRA
    // ======================================================

    await page.getByTestId('checkout-button').click();

    // ======================================================
    // 7. VERIFICAR QUE EXISTE LA CONFIRMACIÓN
    // ======================================================

    const confirmation = page.getByTestId('order-confirmation');

    await expect(
      confirmation
    ).toBeVisible();

    // ======================================================
    // 8. VERIFICAR NÚMERO DE PEDIDO
    // ======================================================

    await expect(
      confirmation
    ).toContainText('Pedido #1 confirmado!');

    // ======================================================
    // 9. VERIFICAR QUE EL NÚMERO GENERADO ES EL #1
    // ======================================================

    const confirmationText = await confirmation.textContent();

    expect(confirmationText).toMatch(
      /Pedido #1 confirmado!/
    );

  });

});