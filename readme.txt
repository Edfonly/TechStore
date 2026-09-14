Descripción del Proyecto
TechStore es una aplicación web desarrollada bajo una metodología de trabajo colaborativa basada en Git Flow simplificado. El objetivo es garantizar una integración controlada del código, mantener la estabilidad de las versiones y asegurar la calidad mediante revisiones de código y validaciones automáticas en Jenkins.

Estructura de Ramas
El proyecto utiliza tres niveles principales de ramas:


master
│
├── develop
│
├── feature/eddyherrera
├── feature/eduardomoreira
├── feature/nombreapellido
Descripción
Rama	Propósito
master	Versión estable y productiva
develop	Integración de funcionalidades aprobadas
feature/nombreapellido	Desarrollo individual de cada integrante

Flujo de Trabajo Oficial

Entorno de Trabajo
        │
        ▼
feature/nombreapellido
        │
 commit + push
        │
        ▼
 Revisión Técnica
        │
        ▼
 Pull Request
        │
        ▼
      develop
        │
 Validación Jenkins
        │
        ▼
 Pull Request
        │
        ▼
      master
Regla Principal

feature/nombreapellido
            │
            ▼
         develop
            │
            ▼
          master
Importante
Ningún integrante trabaja directamente en develop.

Ningún integrante trabaja directamente en master.

Todo desarrollo debe realizarse exclusivamente en la rama personal asignada.

Requisitos Previos
Antes de comenzar es necesario contar con:

Software Requerido
Git

Node.js LTS

npm

Visual Studio Code

Playwright

Jenkins (Servidor CI/CD)

Verificar instalación
Bash

git --version
node --version
npm --version
Primera Configuración
Clonar el repositorio
Bash

git clone https://github.com/Edfonly/TechStore.git

cd TechStore
Instalar dependencias
Bash

npm ci

npx playwright install
Creación de Rama Personal
Actualizar develop
Bash

git checkout develop

git pull origin develop
Crear rama personal
Formato obligatorio:


feature/nombreapellido
Ejemplo:

Bash

git checkout -b feature/eddyherrera
Subir la rama por primera vez
Bash

git push -u origin feature/eddyherrera
Este procedimiento se realiza una sola vez.

Trabajo Diario
Antes de comenzar:

Bash

git branch
Salida esperada:


develop
master
* feature/eddyherrera
El asterisco (*) indica la rama activa.

Ejecución de Pruebas
Antes de subir cambios se deben ejecutar las pruebas.

Bash

npm run test
o

Bash

npx playwright test
Guardar Cambios
Verificar archivos modificados
Bash

git status
Agregar cambios
Bash

git add .
Crear Commit
Bash

git commit -m "Descripción clara del cambio"
Ejemplos de commits válidos

Agregar login administrador

Validar credenciales incorrectas

Implementar búsqueda de productos

Corregir filtro de categorías

Agregar creación de empleados

Actualizar pruebas de carrito de compras
Ejemplos incorrectos

Cambios

Update

Prueba

Fix

Trabajo nuevo
Los mensajes deben describir claramente el trabajo realizado.

Subir cambios
Bash

git push
Proceso del Desarrollador
Cuando un integrante finaliza una tarea:


1. Ejecuta pruebas locales
2. Realiza commit
3. Realiza push
4. Notifica al líder técnico
Ejemplo:


Ya subí mis cambios a feature/mariopaz
Proceso del Líder Técnico
El responsable de integración realizará:

1. Revisión del Código

Validación de buenas prácticas
Validación de estándares del proyecto
Validación de pruebas
2. Pull Request

feature/nombreapellido
          │
          ▼
       develop
3. Validación Jenkins
Se verificará:


Compilación exitosa
Pruebas automatizadas
Cobertura mínima requerida
Ausencia de errores críticos
4. Integración a Producción
Si Jenkins aprueba:


develop
   │
   ▼
master
Política de Pull Request
Todo Pull Request debe contener:

Título

[FEATURE] Implementación módulo de productos
o


[FIX] Corrección validación de login
Descripción
Markdown

### Descripción

Implementación del listado de productos.

### Cambios realizados

- Se agregó tabla de productos
- Se implementó búsqueda
- Se agregaron pruebas Playwright

### Evidencias

Adjuntar capturas o resultados de pruebas.
Estándares de Calidad
Antes de solicitar revisión:

Código compilando correctamente.

Sin errores de consola.

Sin conflictos Git.

Pruebas ejecutadas exitosamente.

Código comentado cuando sea necesario.

Convenciones del proyecto respetadas.

Flujo Completo del Proyecto

┌─────────────────────┐
│   feature/usuario   │
└──────────┬──────────┘
           │
           ▼
     Commit + Push
           │
           ▼
      Revisión
           │
           ▼
      Pull Request
           │
           ▼
        develop
           │
           ▼
    Jenkins CI/CD
           │
           ▼
      Validación
           │
           ▼
      Pull Request
           │
           ▼
        master
