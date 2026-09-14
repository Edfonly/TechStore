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
  test.beforeAll(async () => {
    const resumen = await correrNewman("Login", {
      username: loginData.admin.username,
      password: loginData.admin.password,
      expectedStatus: loginData.admin.expectedStatus,
      expectedRole: loginData.admin.expectedRole,
    });

    mostrarErrores(resumen);

    const status = obtenerStatus(resumen);
    const respuesta = obtenerRespuesta(resumen);

    adminToken = respuesta.token;

    console.log("\n===== LOGIN ADMIN =====\n");
    console.log("Status:", status);
  });

  test("Obtener productos - Lista correctamente", async () => {
    const resumen = await correrNewman("ObtenerProductos");

    mostrarErrores(resumen);

    const status = obtenerStatus(resumen);
    const respuesta = obtenerRespuesta(resumen);

    console.log("\n===== OBTENER PRODUCTOS =====\n");
    console.log("Status:", status);
    console.log("Respuesta:", respuesta);
  });

  test("Registro exitoso - Crear producto", async () => {
    const producto = {
      name: "Celular Naranja",
      description: "Celular Naranja creado desde automatización",
      price: 1200,
      originalPrice: 1200,
      category: "Celular",
      stock: 10,
      rating: 0,
      seller: "admin",
      freeShipping: false,
    };

    const resumen = await correrNewman("RegistrarProducto", {
      adminToken,
      requestBody: JSON.stringify(producto),
      expectedStatus: 201,
    });

    mostrarErrores(resumen);

    const status = obtenerStatus(resumen);
    const respuesta = obtenerRespuesta(resumen);

    productId = respuesta.id;

    console.log("\n===== REGISTRO EXITOSO =====\n");
    console.log("Status:", status);
    console.log("Respuesta:", respuesta);
  });

  test("Registro fallido - Producto sin nombre", async () => {
    const producto = {
      description: "Celular sin nombre",
      price: 1200,
      originalPrice: 1200,
      category: "Celular",
      stock: 10,
      rating: 0,
      seller: "admin",
      freeShipping: false,
    };

    const resumen = await correrNewman("RegistrarProducto", {
      adminToken,
      requestBody: JSON.stringify(producto),
      expectedStatus: 400,
      expectedError:
        "name, description, price, category y stock son obligatorios",
    });

    mostrarErrores(resumen);

    const status = obtenerStatus(resumen);
    const respuesta = obtenerRespuesta(resumen);

    console.log("\n===== REGISTRO SIN NOMBRE =====\n");
    console.log("Status:", status);
    console.log("Respuesta:", respuesta);
  });

  test("Registro fallido - Producto solo con nombre", async () => {
    const producto = {
      name: "Celular Naranja",
    };

    const resumen = await correrNewman("RegistrarProducto", {
      adminToken,
      requestBody: JSON.stringify(producto),
      expectedStatus: 400,
      expectedError:
        "name, description, price, category y stock son obligatorios",
    });

    mostrarErrores(resumen);

    const status = obtenerStatus(resumen);
    const respuesta = obtenerRespuesta(resumen);

    console.log("\n===== REGISTRO SOLO CON NOMBRE =====\n");
    console.log("Status:", status);
    console.log("Respuesta:", respuesta);
  });

  test("Obtener producto - Existente", async () => {
    const resumen = await correrNewman("ObtenerProducto", {
      productId,
      expectedStatus: 200,
    });

    mostrarErrores(resumen);

    const status = obtenerStatus(resumen);
    const respuesta = obtenerRespuesta(resumen);

    console.log("\n===== PRODUCTO ENCONTRADO =====\n");
    console.log("Status:", status);
    console.log("Respuesta:", respuesta);
  });

  test("Obtener producto - Inexistente", async () => {
    const resumen = await correrNewman("ObtenerProducto", {
      productId: 99999,
      expectedStatus: 404,
      expectedError: "Producto no encontrado",
    });

    mostrarErrores(resumen);

    const status = obtenerStatus(resumen);
    const respuesta = obtenerRespuesta(resumen);

    console.log("\n===== PRODUCTO INEXISTENTE =====\n");
    console.log("Status:", status);
    console.log("Respuesta:", respuesta);
  });

  test("Editar producto - Actualizar precio", async () => {
    const datosActualizar = {
      price: 500,
    };

    const resumen = await correrNewman("EditarProducto", {
      adminToken,
      productId,
      requestBody: JSON.stringify(datosActualizar),
      expectedStatus: 200,
    });

    mostrarErrores(resumen);

    const status = obtenerStatus(resumen);
    const respuesta = obtenerRespuesta(resumen);

    console.log("\n===== EDICIÓN EXITOSA =====\n");
    console.log("Status:", status);
    console.log("Respuesta:", respuesta);
  });

  test("Buscar producto - Con resultados", async () => {
    const resumen = await correrNewman("BuscarProducto", {
      search: "smart",
      expectedStatus: 200,
      expectedCount: 2,
    });

    mostrarErrores(resumen);

    const status = obtenerStatus(resumen);
    const respuesta = obtenerRespuesta(resumen);

    console.log("\n===== BÚSQUEDA EXITOSA =====\n");
    console.log("Status:", status);
    console.log("Respuesta:", respuesta);
  });

  test("Buscar producto - Sin resultados", async () => {
    const resumen = await correrNewman("BuscarProducto", {
      search: "zzz-inexistente",
      expectedStatus: 200,
      expectedCount: 0,
    });

    mostrarErrores(resumen);

    const status = obtenerStatus(resumen);
    const respuesta = obtenerRespuesta(resumen);

    console.log("\n===== BÚSQUEDA SIN RESULTADOS =====\n");
    console.log("Status:", status);
    console.log("Respuesta:", respuesta);
  });

  test("Eliminar producto - Existente", async () => {
    const resumen = await correrNewman("EliminarProducto", {
      adminToken,
      productId,
      expectedStatus: 204,
    });

    mostrarErrores(resumen);

    const status = obtenerStatus(resumen);

    console.log("\n===== ELIMINACIÓN EXITOSA =====\n");
    console.log("Status:", status);
  });

  test("Eliminar producto - Inexistente", async () => {
    const resumen = await correrNewman("EliminarProducto", {
      adminToken,
      productId,
      expectedStatus: 404,
      expectedError: "Producto no encontrado",
    });

    mostrarErrores(resumen);

    const status = obtenerStatus(resumen);
    const respuesta = obtenerRespuesta(resumen);

    console.log("\n===== ELIMINACIÓN PRODUCTO INEXISTENTE =====\n");
    console.log("Status:", status);
    console.log("Respuesta:", respuesta);
  });
});
