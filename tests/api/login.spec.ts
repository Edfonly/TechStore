import { test, expect } from "@playwright/test";
import {
  correrNewman,
  mostrarErrores,
  obtenerStatus,
  obtenerRespuesta,
} from "../../helpers/NewmanRunner";
import { loginData } from "../../data/loginData";

test.describe.configure({ mode: "serial" });

test("Login Admin", async () => {
  console.log("\n===== CREDENCIALES =====\n");
  console.log("Usuario:", loginData.admin.username);
  console.log("Password cargado:", !!loginData.admin.password);

  const resumen = await correrNewman("Login", {
    username: loginData.admin.username,
    password: loginData.admin.password,
    expectedStatus: loginData.admin.expectedStatus,
    expectedRole: loginData.admin.expectedRole,
  });

  mostrarErrores(resumen);
  const status = obtenerStatus(resumen);
  const respuesta = obtenerRespuesta(resumen);

  console.log("\n===== LOGIN EXITOSO ADMIN =====\n");
  console.log("Status:", status);
  console.log("Respuesta:", respuesta);

  expect(resumen.run.failures.length).toBe(0);
});

test("Login Manager", async () => {
  console.log("\n===== CREDENCIALES =====\n");
  console.log("Usuario:", loginData.manager.username);
  console.log("Password cargado:", !!loginData.manager.password);

  const resumen = await correrNewman("Login", {
    username: loginData.manager.username,
    password: loginData.manager.password,
    expectedStatus: loginData.manager.expectedStatus,
    expectedRole: loginData.manager.expectedRole,
  });

  mostrarErrores(resumen);
  const status = obtenerStatus(resumen);
  const respuesta = obtenerRespuesta(resumen);

  console.log("\n===== LOGIN EXITOSO MANAGER =====\n");
  console.log("Status:", status);
  console.log("Respuesta:", respuesta);

  expect(resumen.run.failures.length).toBe(0);
});

test("Login Customer", async () => {
  console.log("\n===== CREDENCIALES =====\n");
  console.log("Usuario:", loginData.customer.username);
  console.log("Password cargado:", !!loginData.customer.password);

  const resumen = await correrNewman("Login", {
    username: loginData.customer.username,
    password: loginData.customer.password,
    expectedStatus: loginData.customer.expectedStatus,
    expectedRole: loginData.customer.expectedRole,
  });

  mostrarErrores(resumen);
  const status = obtenerStatus(resumen);
  const respuesta = obtenerRespuesta(resumen);

  console.log("\n===== LOGIN EXITOSO CUSTOMER =====\n");
  console.log("Status:", status);
  console.log("Respuesta:", respuesta);

  expect(resumen.run.failures.length).toBe(0);
});

test("Login fallido - Credenciales inválidas", async () => {
  console.log("\n===== CREDENCIALES =====\n");
  console.log("Usuario:", loginData.credencialesInvalidas.username);
  console.log("Password cargado:", !!loginData.credencialesInvalidas.password);

  const resumen = await correrNewman("Login", {
    username: loginData.credencialesInvalidas.username,
    password: loginData.credencialesInvalidas.password,
    expectedStatus: loginData.credencialesInvalidas.expectedStatus,
    expectedError: loginData.credencialesInvalidas.expectedError,
  });

  mostrarErrores(resumen);
  const status = obtenerStatus(resumen);
  const respuesta = obtenerRespuesta(resumen);

  console.log("\n===== LOGIN FALLIDO CREDENCIALES INVÁLIDAS =====\n");
  console.log("Status:", status);
  console.log("Respuesta:", respuesta);

  expect(resumen.run.failures.length).toBe(0);
});
