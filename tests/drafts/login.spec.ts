import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://techstore-demo-05ad.onrender.com/');
  await page.getByTestId('username-input').click();
  await page.getByTestId('username-input').fill('admin');
  await page.getByTestId('username-input').press('Tab');
  await page.getByTestId('password-input').fill('admin123');
  await page.getByTestId('login-button').click();
});