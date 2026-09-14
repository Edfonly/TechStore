import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

test.describe('Pruebas de Pedidos', () => {

  test('PED-UI-07 - Persistencia del pedido después de recargar', async ({ page }) => {

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
    // 4. AGREGAR PRODUCTO
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
    // 7. VERIFICAR CONFIRMACIÓN
    // ======================================================

    await expect(
      page.getByTestId('order-confirmation')
    ).toContainText('¡Pedido #1 confirmado!');

    // ======================================================
    // 8. CERRAR CARRITO
    // ======================================================

    await page.getByTestId('cart-overlay').click();

    await expect(
      page.getByTestId('cart-panel')
    ).toBeHidden();

    // ======================================================
    // 9. IR A MIS PEDIDOS
    // ======================================================

    await page.getByTestId('nav-orders').click();

    await expect(
      page.getByTestId('orders-view')
    ).toBeVisible();

    // ======================================================
    // 10. VERIFICAR PEDIDO ANTES DE RECARGAR
    // ======================================================

    await expect(
      page.getByTestId('order-1')
    ).toBeVisible();

    await expect(
      page.getByTestId('order-1')
        .getByTestId('order-id')
    ).toHaveText('Pedido #1');

    await expect(
      page.getByTestId('order-1')
        .getByTestId('order-detail')
    ).toHaveText('1 artículo(s)');

    // ======================================================
    // 11. RECARGAR LA PÁGINA
    // ======================================================

    await page.reload();

    // ======================================================
    // 12. VOLVER A INICIAR SESIÓN
    // ======================================================

    // La aplicación pierde la sesión al recargar.
    // Por eso iniciamos sesión nuevamente.
    await loginPage.login(
      loginData.admin.username,
      loginData.admin.password
    );

    await expect(
      page.getByTestId('sidebar')
    ).toBeVisible();

    // ======================================================
    // 13. IR NUEVAMENTE A MIS PEDIDOS
    // ======================================================

    await page.getByTestId('nav-orders').click();

    await expect(
      page.getByTestId('orders-view')
    ).toBeVisible();

    // ======================================================
    // 14. VERIFICAR QUE EL PEDIDO SIGUE EXISTIENDO
    // ======================================================

    await expect(
      page.getByTestId('order-1')
    ).toBeVisible();

    // ======================================================
    // 15. VERIFICAR NÚMERO DEL PEDIDO
    // ======================================================

    await expect(
      page.getByTestId('order-1')
        .getByTestId('order-id')
    ).toHaveText('Pedido #1');

    // ======================================================
    // 16. VERIFICAR CANTIDAD DE ARTÍCULOS
    // ======================================================

    await expect(
      page.getByTestId('order-1')
        .getByTestId('order-detail')
    ).toHaveText('1 artículo(s)');

  });

});