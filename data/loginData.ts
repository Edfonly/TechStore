import { env } from "process";

export const loginData = {

    admin: {
        username: env.ADMIN_USERNAME!,
        password: env.ADMIN_PASSWORD!,
        expectedStatus: 200,
        expectedRole: 'admin',
    },

    manager: {
        username: env.MANAGER_USERNAME!,
        password: env.MANAGER_PASSWORD!,
        expectedStatus: 200,
        expectedRole: 'manager',
    },

    customer: {
        username: env.CUSTOMER_USERNAME!,
        password: env.CUSTOMER_PASSWORD!,
        expectedStatus: 200,
        expectedRole: 'customer',
    },

    credencialesInvalidas: {
        username: 'usuarioIncorrecto',
        password: 'passwordIncorrecto',
        expectedStatus: 401,
        expectedError: 'Credenciales inválidas',
    },

};