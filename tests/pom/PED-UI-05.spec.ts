import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

test.describe('Pruebas de Pedidos', () => {

  test('PED-UI-05 - Verificar carrito vacío después de finalizar compra', async ({ page }) => {

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
    // 6. VERIFICAR QUE EL CARRITO TIENE UN PRODUCTO
    // ======================================================

    await expect(
      page.getByTestId('cart-items').locator('li')
    ).toHaveCount(1);

    await expect(
      page.getByTestId('cart-item-6')
    ).toBeVisible();

    // ======================================================
    // 7. FINALIZAR COMPRA
    // ======================================================

    await page.getByTestId('checkout-button').click();

    // ======================================================
    // 8. VERIFICAR CONFIRMACIÓN DEL PEDIDO
    // ======================================================

    await expect(
      page.getByTestId('order-confirmation')
    ).toContainText('¡Pedido #1 confirmado!');

    // ======================================================
    // 9. VERIFICAR QUE EL CARRITO QUEDÓ VACÍO
    // ======================================================

    await expect(
      page.getByTestId('cart-items').locator('li')
    ).toHaveCount(0);

    // ======================================================
    // 10. VERIFICAR ESTADO VACÍO DEL CARRITO
    // ======================================================

    await expect(
      page.getByTestId('cart-empty')
    ).toBeVisible();

    // ======================================================
    // 11. VERIFICAR QUE CHECKOUT ESTÁ DESHABILITADO
    // ======================================================

    await expect(
      page.getByTestId('checkout-button')
    ).toBeDisabled();

  });

});