import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

test.describe('Pruebas de Pedidos', () => {

  test('PED-UI-04 - Ver pedido después de finalizar compra', async ({ page }) => {

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
    // 6. VERIFICAR PRODUCTO EN EL CARRITO
    // ======================================================

    await expect(
      page.getByTestId('cart-item-6')
    ).toBeVisible();

    await expect(
      page.getByTestId('cart-item-6')
        .getByTestId('cart-item-name')
    ).toHaveText('Smartphone X12');

    // ======================================================
    // 7. FINALIZAR COMPRA
    // ======================================================

    await page.getByTestId('checkout-button').click();

    // ======================================================
    // 8. VERIFICAR CONFIRMACIÓN
    // ======================================================

    await expect(
      page.getByTestId('order-confirmation')
    ).toContainText('¡Pedido #1 confirmado!');

    // ======================================================
    // 9. CERRAR CARRITO
    // ======================================================

    await page.getByTestId('cart-overlay').click();

    await expect(
      page.getByTestId('cart-panel')
    ).toBeHidden();

    // ======================================================
    // 10. IR A MIS PEDIDOS
    // ======================================================

    await page.getByTestId('nav-orders').click();

    await expect(
      page.getByTestId('orders-view')
    ).toBeVisible();

    // ======================================================
    // 11. VERIFICAR QUE EL PEDIDO EXISTE
    // ======================================================

    const order = page.getByTestId('order-1');

    await expect(order).toBeVisible();

    // ======================================================
    // 12. VERIFICAR NÚMERO DE PEDIDO
    // ======================================================

    await expect(
      order.getByTestId('order-id')
    ).toHaveText('Pedido #1');

    // ======================================================
    // 13. VERIFICAR TOTAL DEL PEDIDO
    // ======================================================

    await expect(
      order.getByTestId('order-total')
    ).toHaveText('$799.00');

    // ======================================================
    // 14. VERIFICAR CANTIDAD DE ARTÍCULOS
    // ======================================================

    await expect(
      order.getByTestId('order-detail')
    ).toHaveText('1 artículo(s)');

  });

});