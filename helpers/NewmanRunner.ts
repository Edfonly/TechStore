import * as path from 'path';
import * as newman from 'newman';

export function correrNewman(nombreDeLaCarpeta: string, variables: Record<string, string | number> = {}): Promise<any> {
    const CARPETA_NEWMAN = path.join(__dirname, '../postman');

    const variablesNewman = Object.entries(variables).map(
        ([key, value]) => ({
            key,
            value: String(value)
        })
    );

    return new Promise((resolve, reject) => {
        newman.run(
            {
                collection: path.join(CARPETA_NEWMAN,'TechStore.postman_collection.json'),
                environment: path.join(CARPETA_NEWMAN, 'TechStore.postman_environment.json'),
                folder: nombreDeLaCarpeta ? nombreDeLaCarpeta : undefined, envVar: variablesNewman
            },
            (error, resumen) => {
                if (error) {
                    return reject(error);
                }
                resolve(resumen);
            }
        );
    });
}

export function obtenerStatus(resumen: any) {
    return resumen.run.executions[0].response.code;
}

export function obtenerRespuesta(resumen: any) {
    const contenido = resumen.run.executions[0].response.stream.toString();
    if (!contenido) {
        return null;
    }
    return JSON.parse(contenido);
}

export function mostrarErrores(resumen: any) {
    const errores = resumen.run.failures;
    if (errores && errores.length > 0) {
        console.log('\n===== ERRORES NEWMAN =====');
        for (const failure of errores) {
            console.log(
                'Mensaje:',
                failure.error?.message
            );
        }
    }
}