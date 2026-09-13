import { test, expect } from "@playwright/test";
import {
  correrNewman,
  obtenerStatus,
  obtenerRespuesta,
  mostrarErrores,
} from "../../helpers/NewmanRunner";
import { loginData } from "../../data/loginData";

let adminToken: string;
let productId: number;

test.describe.configure({ mode: "serial" });

test.describe.serial("API - Productos", () => {

test('Obtener categorías - Lista correctamente', async () => {

    const resumen = await correrNewman('ObtenerCategorias');

    mostrarErrores(resumen);

    const status = obtenerStatus(resumen);
    const respuesta = obtenerRespuesta(resumen);

    console.log('\n===== OBTENER CATEGORÍAS =====\n');
    console.log('Status:', status);
    console.log('Respuesta:', respuesta);
});

test('Filtrar categoría - Existente', async () => {

    const resumen = await correrNewman('FiltrarCategoria', {
        category: 'Accesorios',
        expectedCategory: 'Accesorios',
        expectedStatus: 200,
        expectedCount: 3
    });

    mostrarErrores(resumen);

    const status = obtenerStatus(resumen);
    const respuesta = obtenerRespuesta(resumen);

    console.log('\n===== FILTRO POR CATEGORÍA EXITOSO =====\n');
    console.log('Status:', status);
    console.log('Respuesta:', respuesta);
});


test('Filtrar categoría - Inexistente', async () => {

    const resumen = await correrNewman('FiltrarCategoria', {
        category: 'CategoriaQueNoExiste',
        expectedStatus: 200,
        expectedCount: 0
    });

    mostrarErrores(resumen);

    const status = obtenerStatus(resumen);
    const respuesta = obtenerRespuesta(resumen);

    console.log('\n===== CATEGORÍA SIN RESULTADOS =====\n');
    console.log('Status:', status);
    console.log('Respuesta:', respuesta);
});

});
