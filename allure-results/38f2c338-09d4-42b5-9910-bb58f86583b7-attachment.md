# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: end-to-end-api.spec.ts >> Suite Integral de Regresión de APIs >> Ejecutar flujo completo y validación secuencial de endpoints
- Location: tests/end-to-end-api.spec.ts:6:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 0
Received: 1
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { correrNewman } from '../helpers/NewmanRunner';
  3  | 
  4  | test.describe('Suite Integral de Regresión de APIs', () => {
  5  | 
  6  |     test('Ejecutar flujo completo y validación secuencial de endpoints', async () => {
  7  |         
  8  |         await test.step('Paso 1: Autenticación inicial (Login)', async () => {
  9  |             const loginRes: any = await correrNewman('Login');
> 10 |             expect(loginRes.run.stats.assertions.failed).toBe(0);
     |                                                          ^ Error: expect(received).toBe(expected) // Object.is equality
  11 |         });
  12 | 
  13 |         await test.step('Paso 2: Consultar lista de productos públicos (Products)', async () => {
  14 |             const prodRes: any = await correrNewman('Products');
  15 |             expect(prodRes.run.stats.assertions.failed).toBe(0);
  16 |         });
  17 | 
  18 |         await test.step('Paso 3: Crear un producto público (ProductAdd)', async () => {
  19 |             const addRes: any = await correrNewman('ProductAdd');
  20 |             expect(addRes.run.stats.assertions.failed).toBe(0);
  21 |         });
  22 | 
  23 |         await test.step('Paso 4: Editar un producto público (ProductEdit)', async () => {
  24 |             const editRes: any = await correrNewman('ProductEdit');
  25 |             expect(editRes.run.stats.assertions.failed).toBe(0);
  26 |         });
  27 | 
  28 |         await test.step('Paso 5: Eliminar un producto público (ProductDel)', async () => {
  29 |             const delRes: any = await correrNewman('ProductDel');
  30 |             expect(delRes.run.stats.assertions.failed).toBe(0);
  31 |         });
  32 | 
  33 |         await test.step('Paso 6: Consultar productos protegidos con Token (ProductsAuth)', async () => {
  34 |             const prodAuthRes: any = await correrNewman('ProductsAuth');
  35 |             expect(prodAuthRes.run.stats.assertions.failed).toBe(0);
  36 |         });
  37 | 
  38 |         await test.step('Paso 7: Crear producto protegido con Token (ProductAddAuth)', async () => {
  39 |             const addAuthRes: any = await correrNewman('ProductAddAuth');
  40 |             expect(addAuthRes.run.stats.assertions.failed).toBe(0);
  41 |         });
  42 | 
  43 |         await test.step('Paso 8: Editar producto protegido con Token (ProductEditAuth)', async () => {
  44 |             const editAuthRes: any = await correrNewman('ProductEditAuth');
  45 |             expect(editAuthRes.run.stats.assertions.failed).toBe(0);
  46 |         });
  47 | 
  48 |         await test.step('Paso 9: Eliminar producto protegido con Token (ProductDelAuth)', async () => {
  49 |             const delAuthRes: any = await correrNewman('ProductDelAuth');
  50 |             expect(delAuthRes.run.stats.assertions.failed).toBe(0);
  51 |         });
  52 | 
  53 |     });
  54 | 
  55 | });
```