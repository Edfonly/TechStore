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

test('Obtener ofertas - Exitoso', async () => {

    const resumen = await correrNewman('ObtenerOfertas');

    mostrarErrores(resumen);

    const status = obtenerStatus(resumen);
    const respuesta = obtenerRespuesta(resumen);

    console.log('\n===== OBTENER OFERTAS =====\n');
    console.log('Status:', status);
    console.log('Respuesta:', respuesta);
});