import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

test.describe('Pruebas de Pedidos', () => {

  test('PED-UI-03 - Finalizar compra con varios productos', async ({ page }) => {

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

    // Login con las credenciales almacenadas en .env
    await loginPage.login(
      loginData.admin.username,
      loginData.admin.password
    );

    await expect(
      page.getByTestId('sidebar')
    ).toBeVisible();

    // ======================================================
    // 4. AGREGAR PRODUCTOS 1, 2 Y 3
    // ======================================================

    await page.getByTestId('add-to-cart-1').click();
    await page.getByTestId('add-to-cart-2').click();
    await page.getByTestId('add-to-cart-3').click();

    // ======================================================
    // 5. ABRIR CARRITO
    // ======================================================

    await page.getByTestId('cart-toggle').click();

    await expect(
      page.getByTestId('cart-panel')
    ).toBeVisible();

    // ======================================================
    // 6. VERIFICAR QUE HAY 3 PRODUCTOS
    // ======================================================

    await expect(
      page.getByTestId('cart-items').locator('li')
    ).toHaveCount(3);

    // ======================================================
    // 7. VERIFICAR QUE LOS 3 PRODUCTOS ESTÁN EN EL CARRITO
    // ======================================================

    await expect(
      page.getByTestId('cart-item-1')
    ).toBeVisible();

    await expect(
      page.getByTestId('cart-item-2')
    ).toBeVisible();

    await expect(
      page.getByTestId('cart-item-3')
    ).toBeVisible();

    // ======================================================
    // 8. FINALIZAR COMPRA
    // ======================================================

    await page.getByTestId('checkout-button').click();

    // ======================================================
    // 9. VERIFICAR CONFIRMACIÓN DEL PEDIDO
    // ======================================================

    await expect(
      page.getByTestId('order-confirmation')
    ).toContainText('¡Pedido #1 confirmado!');

    // ======================================================
    // 10. VERIFICAR QUE EL CARRITO QUEDÓ VACÍO
    // ======================================================

    await expect(
      page.getByTestId('cart-items').locator('li')
    ).toHaveCount(0);

    // ======================================================
    // 11. CERRAR CARRITO
    // ======================================================

    // El overlay ejecuta directamente closeCart()
    await page.getByTestId('cart-overlay').click();

    await expect(
      page.getByTestId('cart-panel')
    ).toBeHidden();

    // ======================================================
    // 12. IR A MIS PEDIDOS
    // ======================================================

    await page.getByTestId('nav-orders').click();

    await expect(
      page.getByTestId('orders-view')
    ).toBeVisible();

    // ======================================================
    // 13. VERIFICAR QUE EXISTE EL PEDIDO #1
    // ======================================================

    await expect(
      page.getByTestId('order-1')
    ).toBeVisible();

    // ======================================================
    // 14. VERIFICAR QUE EL PEDIDO TIENE 3 PRODUCTOS
    // ======================================================

    await expect(
      page.getByTestId('order-1')
        .getByTestId('order-detail')
    ).toContainText('3');

  });

});