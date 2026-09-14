import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

test.describe('Pruebas de Pedidos', () => {

  // ======================================================
  // PED-UI-01
  // Finalizar compra
  // ======================================================

  test('PED-UI-01 - Finalizar compra', async ({ page }) => {

    const loginPage = new LoginPage(page);

    // --------------------------------------------------
    // 1. Reiniciar el estado de la aplicación
    // --------------------------------------------------

    await page.request.post(
      'https://techstore-demo-05ad.onrender.com/api/test/reset'
    );

    // --------------------------------------------------
    // 2. Abrir la aplicación
    // --------------------------------------------------

    await page.goto('https://techstore-demo-05ad.onrender.com/');

    // --------------------------------------------------
    // 3. Iniciar sesión
    // --------------------------------------------------
    // Las credenciales se obtienen desde el archivo .env.
    await loginPage.login(
      loginData.admin.username,
      loginData.admin.password
    );

    await expect(
      page.getByTestId('sidebar')
    ).toBeVisible();

    // --------------------------------------------------
    // 4. Agregar producto 6 al carrito
    // Smartphone X12
    // --------------------------------------------------

    await page.getByTestId(
      'add-to-cart-6'
    ).click();

    // --------------------------------------------------
    // 5. Abrir carrito
    // --------------------------------------------------

    await page.getByTestId(
      'cart-toggle'
    ).click();

    await expect(
      page.getByTestId('cart-overlay')
    ).toBeVisible();

    await expect(
      page.getByTestId('cart-panel')
    ).toBeVisible();

    // --------------------------------------------------
    // 6. Verificar que existe un producto en el carrito
    // --------------------------------------------------

    await expect(
      page.getByTestId('cart-items')
        .locator('li')
    ).toHaveCount(1);

    // --------------------------------------------------
    // 7. Verificar que el producto es Smartphone X12
    // --------------------------------------------------

    await expect(
      page.getByTestId('cart-item-6')
    ).toBeVisible();

    await expect(
      page
        .getByTestId('cart-item-6')
        .getByTestId('cart-item-name')
    ).toHaveText(
      'Smartphone X12'
    );

    // --------------------------------------------------
    // 8. Finalizar compra
    // --------------------------------------------------

    await page.getByTestId(
      'checkout-button'
    ).click();

    // --------------------------------------------------
    // 9. Verificar confirmación de pedido
    // --------------------------------------------------

    await expect(
      page.getByTestId('order-confirmation')
    ).toContainText(
      '¡Pedido #1 confirmado!'
    );

    // --------------------------------------------------
    // 10. Verificar que el carrito quedó vacío
    // --------------------------------------------------

    await expect(
      page.getByTestId('cart-items')
        .locator('li')
    ).toHaveCount(0);

    // --------------------------------------------------
    // 11. Cerrar correctamente el carrito
    //
    // IMPORTANTE:
    // No usamos cart-toggle aquí porque después del
    // checkout el overlay puede seguir interceptando
    // los clics.
    // --------------------------------------------------

    await page.getByTestId(
      'cart-overlay'
    ).click();

    await expect(
      page.getByTestId('cart-panel')
    ).toBeHidden();

    // --------------------------------------------------
    // 12. Ir a "Mis pedidos"
    // --------------------------------------------------

    await page.getByTestId(
      'nav-orders'
    ).click();

    // --------------------------------------------------
    // 13. Verificar vista de pedidos
    // --------------------------------------------------

    await expect(
      page.getByTestId('orders-view')
    ).toBeVisible();

    // --------------------------------------------------
    // 14. Verificar que existe el pedido #1
    // --------------------------------------------------

    await expect(
      page.getByTestId('order-1')
    ).toBeVisible();

    // --------------------------------------------------
    // 15. Verificar número del pedido
    // --------------------------------------------------

    await expect(
      page
        .getByTestId('order-1')
        .getByTestId('order-id')
    ).toHaveText(
      'Pedido #1'
    );
  });

});

