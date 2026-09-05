import * as path from 'path';
import * as newman from 'newman';

export function correrNewman(nombreDeLaCarpeta: string): Promise<any> {
    const CARPETA_NEWMAN = path.join(__dirname, '../postman');

    return new Promise((resolve, reject) => {
        newman.run({
            collection: path.join(CARPETA_NEWMAN, 'ReqresIn_collection.json'),
            environment: path.join(CARPETA_NEWMAN, 'ReqresIn_environment.json'),
            folder: nombreDeLaCarpeta ? nombreDeLaCarpeta : undefined
        }, (error, resumen) => {
            if (error) {
                return reject(error);
            }
            resolve(resumen);
        });
    });
}