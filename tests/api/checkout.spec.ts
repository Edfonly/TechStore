import { test, expect } from '@playwright/test';

import {
    correrNewman,
    obtenerStatus,
    obtenerRespuesta,
    mostrarErrores
} from '../../helpers/NewmanRunner';
import { loginData } from "../../data/loginData";

let orderId: number;

test.describe.serial('API - Carrito', () => {

    test('Checkout con carrito vacio',async () => {
        const resumen = await correrNewman('CarritoVacio', {});

        mostrarErrores(resumen);

        const status = obtenerStatus(resumen);
        const respuesta = obtenerRespuesta(resumen);

        console.log('\n===== CHECKOUT CARRITO VACIO =====\n');
        console.log('Status:', status);
        console.log('Respuesta:', respuesta);
    });

test('Agregar producto al carrito', async () => {

    const producto = {
      productId: 1,
      quantity: 1
    };

    const resumen = await correrNewman('AgregarProductoCarrito', {
        requestBody: JSON.stringify(producto),
        expectedStatus: 201
    });

    mostrarErrores(resumen);

const status = obtenerStatus(resumen);
const respuesta = obtenerRespuesta(resumen);

console.log('\n===== PRODUCTO AGREGADO AL CARRITO =====\n');
console.log('Status:', status);
console.log('Respuesta:', respuesta);
});

test('Agregar producto al carrito con cantidad 2', async () => {

        const producto = {
            productId: 4,
            quantity: 2
        };

        const resumen = await correrNewman('AgregarProductoCarrito', {
            requestBody: JSON.stringify(producto),
            expectedStatus: 201
        });

        mostrarErrores(resumen);

        expect(resumen.run.failures).toHaveLength(0);

        const status = obtenerStatus(resumen);
        const respuesta = obtenerRespuesta(resumen);

        console.log('\n===== PRODUCTO 4 AGREGADO x2 =====\n');
        console.log('Status:', status);
        console.log('Respuesta:', respuesta);
    });

    test('Crear pedido y vaciar carrito', async () => {
        const resumen = await correrNewman('CrearPedido', {
            expectedStatus: 200
        });

        mostrarErrores(resumen);

        const status = obtenerStatus(resumen);
        const respuesta = obtenerRespuesta(resumen);

        console.log('\n===== PEDIDO CREADO Y CARRITO VACÍO =====\n');
        console.log('Status:', status);
        console.log('Respuesta:', respuesta);
    });

    test('Validar carrito vacío después de crear pedido',async () => {
        const resumen = await correrNewman('CarritoVacio', {});

        mostrarErrores(resumen);

        const status = obtenerStatus(resumen);
        const respuesta = obtenerRespuesta(resumen);

        console.log('\n===== CARRITO VACÍO DESPUÉS DE CREAR PEDIDO =====\n');
        console.log('Status:', status);
        console.log('Respuesta:', respuesta);
    });

    test('Obtener pedido creado', async () => {

    const resumen = await correrNewman('ObtenerPedido', {
        orderId : 1,
        expectedStatus: 200
    });

    mostrarErrores(resumen);

    const status = obtenerStatus(resumen);
    const respuesta = obtenerRespuesta(resumen);

    console.log('\n===== PEDIDO ENCONTRADO =====\n');
    console.log('Status:', status);
    console.log('Respuesta:', respuesta);
});

test('Obtener pedido inexistente', async () => {

    const resumen = await correrNewman('ObtenerPedido', {
        orderId: 999999,
        expectedStatus: 404,
        expectedError: 'Pedido no encontrado'
    });

    mostrarErrores(resumen);

    const status = obtenerStatus(resumen);
    const respuesta = obtenerRespuesta(resumen);

    console.log('\n===== PEDIDO INEXISTENTE =====\n');
    console.log('Status:', status);
    console.log('Respuesta:', respuesta);
});




    test('Checkout sin campo customer', async () => {

        const resumenProductos = await correrNewman('ObtenerProductos');
        const productos = obtenerRespuesta(resumenProductos);
       
        mostrarErrores(resumenProductos);

        console.log('\n===== PRODUCTOS DISPONIBLES =====\n');
        console.log('Cantidad:', productos.length);
        const productosAleatorios = [...productos].sort(() => Math.random() - 0.5).slice(0, 3);


        console.log('\n===== 3 PRODUCTOS ALEATORIOS =====\n');

        productosAleatorios.forEach(producto => {
            console.log(
                `ID: ${producto.id} - ${producto.name}`
            );
        });

        for (const producto of productosAleatorios) {

            const body = {
                productId: producto.id,
                quantity: 1
            };

            const resumenCarrito =
                await correrNewman('AgregarProductoCarrito', {
                        requestBody:JSON.stringify(body),
                        expectedStatus: 201
                    }
                );

            mostrarErrores(resumenCarrito);

            const status = obtenerStatus(resumenCarrito);
            const respuesta = obtenerRespuesta(resumenCarrito);

            console.log(`\n===== PRODUCTO ${producto.id} AGREGADO =====\n`);
            console.log('Status:', status);
            console.log('Producto:', producto.name);
            console.log('Respuesta:', respuesta);
        }

        const resumenPedido =
            await correrNewman('CrearPedido', {
                    requestBody: JSON.stringify({}),
                    expectedStatus: 201,
                    expectedCustomer: 'invitado'
                }
            );

        mostrarErrores(resumenPedido);

        const statusPedido = obtenerStatus(resumenPedido);
        const respuestaPedido = obtenerRespuesta(resumenPedido);

        console.log('\n===== CHECKOUT SIN CUSTOMER =====\n');
        console.log('Status:', statusPedido);
        console.log('Customer:', respuestaPedido.customer);
        console.log('Respuesta:', respuestaPedido);

    });




});
