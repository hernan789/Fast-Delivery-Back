# Fast Delivery

## Descripción

Fast Delivery es un sistema desarrollado en Next.js con TypeScript, diseñado para una empresa de logística de última milla. La empresa gestiona cientos de repartidores, cada uno recibiendo aproximadamente 10 paquetes al inicio del día. El sistema permite monitorear la operación de los repartidores, asignar o reasignar paquetes, e intervenir en caso de ser necesario para editar un envío, modificar la dirección o reasignarle el envío a otro repartidor.

## Instalación

1. Clone el repositorio: `git clone https://github.com/tu_usuario/fast-delivery.git`
2. Acceda al directorio del proyecto: `cd fast-delivery`
3. Instale las dependencias: `npm install`

## Cómo Utilizar

1. Configure las opciones de entrega en el archivo de configuración.
2. Ejecute la aplicación: `npm start`
3. Acceda a la interfaz de administración en `http://localhost:3000/admin`

## Estructura del Proyecto

- `/.husky`: Configuración de Husky para ganchos de Git.
- `/controllers`: Controladores que manejan la lógica de negocio.
- `/middlewares`: Middlewares utilizados en la aplicación.
- `/models`: Modelos de datos de la aplicación.
- `/routes`: Definición de las rutas de la aplicación.
- `/utils`: Utilidades y funciones auxiliares.

## Dependencias de desarrollo

- eslint: Herramienta de linting para mantener un código consistente.
- husky: Utilizado para configurar ganchos de Git.
- lint-staged: Ejecuta scripts en archivos staged durante el proceso de commit.
- nodemon: Monitor de cambios en el código para reiniciar automáticamente la aplicación.
- standard-version: Automatiza la versión y la generación de registros de cambios.
- typescript: Lenguaje de programación que añade tipado estático a JavaScript.

## Dependencias de desarrollo

- cors: Middleware que permite o bloquea solicitudes HTTP en función de la configuración.
- express: Marco de aplicación web para Node.js.
- morgan: Middleware de registro de solicitudes HTTP para Express.

## Contribución

¡Contribuciones son bienvenidas! Por favor, lea nuestras pautas de contribución antes de comenzar.

## Licencia

Este proyecto está bajo la Licencia MIT.

## Créditos

- Autor: Tu Nombre
- Basado en: Proyecto XYZ (enlace al repositorio)

## Contacto

Para preguntas o problemas, contáctenos en [correo electrónico].

## Estado del Proyecto

Actualmente en desarrollo activo. Versión 1.0 lanzada el [fecha].
