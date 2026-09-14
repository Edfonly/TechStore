import { test, expect } from '@playwright/test';

test('agregar producto al carrito', async ({ page }) => {
  await page.goto('https://techstore-demo-05ad.onrender.com/');
  await page.getByTestId('username-input').click();
  await page.getByTestId('username-input').fill('admin');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('admin123');
  await page.getByTestId('login-button').click();
  await page.getByTestId('category-all').click();
  await page.getByTestId('add-to-cart-1').click();
  await page.getByTestId('nav-orders').click();
  await expect(page.getByTestId('orders-view')).toMatchAriaSnapshot(`- heading "Mis pedidos" [level=2]`);
});