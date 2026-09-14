import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

test.describe('Pruebas de Pedidos', () => {

  test('PED-UI-10 - Verificar cantidad de pedidos', async ({ page }) => {

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
    // 4. PRIMERA COMPRA
    // ======================================================

    await page.getByTestId('add-to-cart-1').click();

    await page.getByTestId('cart-toggle').click();

    await expect(
      page.getByTestId('cart-panel')
    ).toBeVisible();

    await page.getByTestId('checkout-button').click();

    await expect(
      page.getByTestId('order-confirmation')
    ).toContainText('¡Pedido #1 confirmado!');

    // ======================================================
    // 5. CERRAR CARRITO
    // ======================================================

    await page.getByTestId('cart-overlay').click();

    await expect(
      page.getByTestId('cart-panel')
    ).toBeHidden();

    // ======================================================
    // 6. SEGUNDA COMPRA
    // ======================================================

    await page.getByTestId('add-to-cart-2').click();

    await page.getByTestId('cart-toggle').click();

    await expect(
      page.getByTestId('cart-panel')
    ).toBeVisible();

    await page.getByTestId('checkout-button').click();

    await expect(
      page.getByTestId('order-confirmation')
    ).toContainText('¡Pedido #2 confirmado!');

    // ======================================================
    // 7. CERRAR CARRITO
    // ======================================================

    await page.getByTestId('cart-overlay').click();

    await expect(
      page.getByTestId('cart-panel')
    ).toBeHidden();

    // ======================================================
    // 8. IR A MIS PEDIDOS
    // ======================================================

    await page.getByTestId('nav-orders').click();

    await expect(
      page.getByTestId('orders-view')
    ).toBeVisible();

    // ======================================================
    // 9. VERIFICAR EXACTAMENTE 2 PEDIDOS
    // ======================================================

    await expect(
      page.getByTestId('orders-list')
        .locator('.order-item')
    ).toHaveCount(2);

    // ======================================================
    // 10. VERIFICAR PEDIDO #1
    // ======================================================

    await expect(
      page.getByTestId('order-1')
    ).toBeVisible();

    await expect(
      page.getByTestId('order-1')
        .getByTestId('order-id')
    ).toHaveText('Pedido #1');

    // ======================================================
    // 11. VERIFICAR PEDIDO #2
    // ======================================================

    await expect(
      page.getByTestId('order-2')
    ).toBeVisible();

    await expect(
      page.getByTestId('order-2')
        .getByTestId('order-id')
    ).toHaveText('Pedido #2');

  });

});