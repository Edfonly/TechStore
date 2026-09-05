# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: secured-endpoints.spec.ts >> Suite de Endpoints Protegidos (Con Autenticación) >> Ejecutar login previo y validar servicios seguros de forma secuencial
- Location: tests/secured-endpoints.spec.ts:6:9

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
  4  | test.describe('Suite de Endpoints Protegidos (Con Autenticación)', () => {
  5  | 
  6  |     test('Ejecutar login previo y validar servicios seguros de forma secuencial', async () => {
  7  |         
  8  |         await test.step('Paso 1: Autenticar para generar y almacenar el token JWT', async () => {
  9  |             const loginRes: any = await correrNewman('Login');
> 10 |             expect(loginRes.run.stats.assertions.failed).toBe(0);
     |                                                          ^ Error: expect(received).toBe(expected) // Object.is equality
  11 |         });
  12 | 
  13 |         await test.step('Paso 2: Consultar productos protegidos (ProductsAuth)', async () => {
  14 |             const prodAuthRes: any = await correrNewman('ProductsAuth');
  15 |             expect(prodAuthRes.run.stats.assertions.failed).toBe(0);
  16 |         });
  17 | 
  18 |         await test.step('Paso 3: Crear producto protegido (ProductAddAuth)', async () => {
  19 |             const addAuthRes: any = await correrNewman('ProductAddAuth');
  20 |             expect(addAuthRes.run.stats.assertions.failed).toBe(0);
  21 |         });
  22 | 
  23 |         await test.step('Paso 4: Editar producto protegido (ProductEditAuth)', async () => {
  24 |             const editAuthRes: any = await correrNewman('ProductEditAuth');
  25 |             expect(editAuthRes.run.stats.assertions.failed).toBe(0);
  26 |         });
  27 | 
  28 |         await test.step('Paso 5: Eliminar producto protegido (ProductDelAuth)', async () => {
  29 |             const delAuthRes: any = await correrNewman('ProductDelAuth');
  30 |             expect(delAuthRes.run.stats.assertions.failed).toBe(0);
  31 |         });
  32 | 
  33 |     });
  34 | 
  35 | });
```