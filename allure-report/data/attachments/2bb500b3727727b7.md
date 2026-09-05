# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-endpoints.spec.ts >> Suite de Endpoints Públicos >> Ejecutar y validar todos los servicios abiertos
- Location: tests/public-endpoints.spec.ts:6:9

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
  4  | test.describe('Suite de Endpoints Públicos', () => {
  5  | 
  6  |     test('Ejecutar y validar todos los servicios abiertos', async () => {
  7  |         
  8  |         await test.step('Paso 1: Autenticación inicial (Login)', async () => {
  9  |             const loginRes: any = await correrNewman('Login');
> 10 |             expect(loginRes.run.stats.assertions.failed).toBe(0);
     |                                                          ^ Error: expect(received).toBe(expected) // Object.is equality
  11 |         });
  12 | 
  13 |         await test.step('Paso 2: Consultar lista de productos (Products)', async () => {
  14 |             const prodRes: any = await correrNewman('Products');
  15 |             expect(prodRes.run.stats.assertions.failed).toBe(0);
  16 |         });
  17 | 
  18 |         await test.step('Paso 3: Crear producto (ProductAdd)', async () => {
  19 |             const addRes: any = await correrNewman('ProductAdd');
  20 |             expect(addRes.run.stats.assertions.failed).toBe(0);
  21 |         });
  22 | 
  23 |         await test.step('Paso 4: Editar producto (ProductEdit)', async () => {
  24 |             const editRes: any = await correrNewman('ProductEdit');
  25 |             expect(editRes.run.stats.assertions.failed).toBe(0);
  26 |         });
  27 | 
  28 |         await test.step('Paso 5: Eliminar producto (ProductDel)', async () => {
  29 |             const delRes: any = await correrNewman('ProductDel');
  30 |             expect(delRes.run.stats.assertions.failed).toBe(0);
  31 |         });
  32 | 
  33 |         test('Validar fallo de autenticación (LoginError)', async () => {
  34 |             const errorRes: any = await correrNewman('LoginError');
  35 |             expect(errorRes.run.stats.assertions.failed).toBe(0);
  36 |         });
  37 | 
  38 |     });
  39 | 
  40 | });
```