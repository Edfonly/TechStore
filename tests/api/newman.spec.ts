import { test, expect } from '@playwright/test';
import { correrNewman } from '../../helpers/NewmanRunner';

test.describe('Suite Integral de Regresión de APIs', () => {

    test('Validar consulta de productos', async () => {

        await test.step(
            'Paso 1: Consultar lista de productos (ObtenerProductos)',
            async () => {

                const resumen = await correrNewman('');

                expect(
                    resumen.run.stats.requests.failed
                ).toBe(0);

                expect(
                    resumen.run.stats.assertions.failed
                ).toBe(0);

            }
        );

    });

});