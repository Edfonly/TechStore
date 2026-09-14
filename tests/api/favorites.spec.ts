import { test } from '@playwright/test';

import {
    correrNewman,
    obtenerStatus,
    obtenerRespuesta,
    mostrarErrores
} from '../../helpers/NewmanRunner';


test.describe.configure({ mode: 'serial' });


test.describe.serial('API - Favoritos', () => {


    // ============================================================
    // 1. LISTAR FAVORITOS - LISTA VACÍA
    // ============================================================

    test('Validar lista de favoritos vacía', async () => {

        const resumen = await correrNewman('ObtenerFavoritos', {
            expectedStatus: 200,
            expectedCount: 0
        });

        mostrarErrores(resumen);

        const status = obtenerStatus(resumen);
        const respuesta = obtenerRespuesta(resumen);

        console.log('\n===== LISTA DE FAVORITOS VACÍA =====\n');
        console.log('Status:', status);
        console.log('Respuesta:', respuesta);
    });


    // ============================================================
    // 2. AGREGAR FAVORITO
    // ============================================================

    test('Agregar producto a favoritos', async () => {

        const resumen = await correrNewman('AgregarFavorito', {

            requestBody: JSON.stringify({
                productId: 1
            }),

            expectedStatus: 201
        });

        mostrarErrores(resumen);

        const status = obtenerStatus(resumen);
        const respuesta = obtenerRespuesta(resumen);

        console.log('\n===== FAVORITO AGREGADO =====\n');
        console.log('Status:', status);
        console.log('Respuesta:', respuesta);
    });


    // ============================================================
    // 3. LISTAR FAVORITOS - LISTA CON UN PRODUCTO
    // ============================================================

    test('Validar lista de favoritos con un producto', async () => {

        const resumen = await correrNewman('ObtenerFavoritos', {
            expectedStatus: 200,
            expectedCount: 1
        });

        mostrarErrores(resumen);

        const status = obtenerStatus(resumen);
        const respuesta = obtenerRespuesta(resumen);

        console.log('\n===== LISTA DE FAVORITOS CON UN PRODUCTO =====\n');
        console.log('Status:', status);
        console.log('Respuesta:', respuesta);
    });


    // ============================================================
    // 4. AGREGAR PRODUCTO INEXISTENTE
    // ============================================================

    test('Agregar producto inexistente a favoritos', async () => {

        const resumen = await correrNewman('AgregarFavorito', {

            requestBody: JSON.stringify({
                productId: 9999
            }),

            expectedStatus: 404,

            expectedError: 'Producto no encontrado'
        });

        mostrarErrores(resumen);

        const status = obtenerStatus(resumen);
        const respuesta = obtenerRespuesta(resumen);

        console.log('\n===== PRODUCTO INEXISTENTE =====\n');
        console.log('Status:', status);
        console.log('Respuesta:', respuesta);
    });


    // ============================================================
    // 5. AGREGAR FAVORITO SIN PRODUCT ID
    // ============================================================

    test('Agregar favorito sin productId', async () => {

        const resumen = await correrNewman('AgregarFavorito', {

            requestBody: JSON.stringify({}),

            expectedStatus: 400,

            expectedError: 'productId es obligatorio'
        });

        mostrarErrores(resumen);

        const status = obtenerStatus(resumen);
        const respuesta = obtenerRespuesta(resumen);

        console.log('\n===== FAVORITO SIN PRODUCT ID =====\n');
        console.log('Status:', status);
        console.log('Respuesta:', respuesta);
    });


    // ============================================================
    // 6. ELIMINAR FAVORITO
    // ============================================================

    test('Eliminar producto de favoritos', async () => {

        const resumen = await correrNewman('EliminarFavorito', {

            productId: 1,

            expectedStatus: 200
        });

        mostrarErrores(resumen);

        const status = obtenerStatus(resumen);
        const respuesta = obtenerRespuesta(resumen);

        console.log('\n===== FAVORITO ELIMINADO =====\n');
        console.log('Status:', status);
        console.log('Respuesta:', respuesta);
    });


    // ============================================================
    // 7. ELIMINAR FAVORITO INEXISTENTE
    // ============================================================

    test('Eliminar producto que no está en favoritos', async () => {

        const resumen = await correrNewman('EliminarFavorito', {

            productId: 1,

            expectedStatus: 404,

            expectedError: 'El producto no está en favoritos'
        });

        mostrarErrores(resumen);

        const status = obtenerStatus(resumen);
        const respuesta = obtenerRespuesta(resumen);

        console.log('\n===== FAVORITO INEXISTENTE =====\n');
        console.log('Status:', status);
        console.log('Respuesta:', respuesta);
    });

});