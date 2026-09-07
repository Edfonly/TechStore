import { test, expect } from '@playwright/test';
import { correrNewman } from '../../helpers/NewmanRunner';

test.describe('API - Productos', () => {

    test('Consulta exitosa - Obtener productos', async () => {

        const resumen = await correrNewman('ObtenerProductos');

        expect(resumen.run.stats.requests.failed).toBe(0);
        expect(resumen.run.stats.assertions.failed).toBe(0);
    });

});