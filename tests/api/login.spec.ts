import { test, expect } from '@playwright/test';
import { correrNewman } from '../../helpers/NewmanRunner';

test.describe('API - Login', () => {

    test('Login exitoso - Admin', async () => {

        const resumen = await correrNewman('LoginAdmin');

        expect(resumen.run.stats.requests.failed).toBe(0);
        expect(resumen.run.stats.assertions.failed).toBe(0);
    });


    test('Login exitoso - Manager', async () => {

        const resumen = await correrNewman('LoginManager');

        expect(resumen.run.stats.requests.failed).toBe(0);
        expect(resumen.run.stats.assertions.failed).toBe(0);
    });


    test('Login exitoso - Customer', async () => {

        const resumen = await correrNewman('LoginCustomer');

        expect(resumen.run.stats.requests.failed).toBe(0);
        expect(resumen.run.stats.assertions.failed).toBe(0);
    });


    test('Login fallido - Credenciales inválidas', async () => {

        const resumen = await correrNewman('LoginIncorrecto');

        expect(resumen.run.stats.requests.failed).toBe(0);
        expect(resumen.run.stats.assertions.failed).toBe(0);
    });

});