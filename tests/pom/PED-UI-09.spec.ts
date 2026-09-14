import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

test.describe('Pruebas de Pedidos', () => {

  test('PED-UI-09 - Comprar nuevamente después de finalizar una compra', async ({ page }) => {

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
    // 4. PRIMERA COMPRA - PRODUCTO 1
    // ======================================================

    await page.getByTestId('add-to-cart-1').click();

    await page.getByTestId('cart-toggle').click();

    await expect(
      page.getByTestId('cart-panel')
    ).toBeVisible();

    await expect(
      page.getByTestId('cart-item-1')
    ).toBeVisible();

    await page.getByTestId('checkout-button').click();

    // ======================================================
    // 5. VERIFICAR PRIMER PEDIDO
    // ======================================================

    await expect(
      page.getByTestId('order-confirmation')
    ).toContainText('¡Pedido #1 confirmado!');

    await expect(
      page.getByTestId('cart-items').locator('li')
    ).toHaveCount(0);

    // ======================================================
    // 6. CERRAR CARRITO
    // ======================================================

    await page.getByTestId('cart-overlay').click();

    await expect(
      page.getByTestId('cart-panel')
    ).toBeHidden();

    // ======================================================
    // 7. AGREGAR PRODUCTO PARA LA SEGUNDA COMPRA
    // ======================================================

    await page.getByTestId('add-to-cart-2').click();

    // ======================================================
    // 8. ABRIR CARRITO
    // ======================================================

    await page.getByTestId('cart-toggle').click();

    await expect(
      page.getByTestId('cart-panel')
    ).toBeVisible();

    // ======================================================
    // 9. VERIFICAR QUE SOLO ESTÁ EL PRODUCTO 2
    // ======================================================

    await expect(
      page.getByTestId('cart-items').locator('li')
    ).toHaveCount(1);

    await expect(
      page.getByTestId('cart-item-2')
    ).toBeVisible();

    await expect(
      page.getByTestId('cart-item-1')
    ).not.toBeVisible();

    // ======================================================
    // 10. REALIZAR SEGUNDA COMPRA
    // ======================================================

    await page.getByTestId('checkout-button').click();

    // ======================================================
    // 11. VERIFICAR SEGUNDO PEDIDO
    // ======================================================

    await expect(
      page.getByTestId('order-confirmation')
    ).toContainText('¡Pedido #2 confirmado!');

    // ======================================================
    // 12. VERIFICAR QUE EL CARRITO QUEDÓ VACÍO
    // ======================================================

    await expect(
      page.getByTestId('cart-items').locator('li')
    ).toHaveCount(0);

    // ======================================================
    // 13. CERRAR CARRITO
    // ======================================================

    await page.getByTestId('cart-overlay').click();

    await expect(
      page.getByTestId('cart-panel')
    ).toBeHidden();

    // ======================================================
    // 14. IR A MIS PEDIDOS
    // ======================================================

    await page.getByTestId('nav-orders').click();

    await expect(
      page.getByTestId('orders-view')
    ).toBeVisible();

    // ======================================================
    // 15. VERIFICAR LOS DOS PEDIDOS
    // ======================================================

    await expect(
      page.getByTestId('order-1')
    ).toBeVisible();

    await expect(
      page.getByTestId('order-2')
    ).toBeVisible();

    // ======================================================
    // 16. VERIFICAR IDENTIFICADORES
    // ======================================================

    await expect(
      page.getByTestId('order-1')
        .getByTestId('order-id')
    ).toHaveText('Pedido #1');

    await expect(
      page.getByTestId('order-2')
        .getByTestId('order-id')
    ).toHaveText('Pedido #2');

    // ======================================================
    // 17. VERIFICAR UN ARTÍCULO EN CADA PEDIDO
    // ======================================================

    await expect(
      page.getByTestId('order-1')
        .getByTestId('order-detail')
    ).toHaveText('1 artículo(s)');

    await expect(
      page.getByTestId('order-2')
        .getByTestId('order-detail')
    ).toHaveText('1 artículo(s)');

  });

});