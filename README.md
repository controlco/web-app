# web-app

## Instalación

### Paso 1

Clonar el repositorio vía ssh o https, con https correr en la terminal:

> `git clone https://github.com/controlco/web-app.git`

### Paso 2

Instalar los módulos necesarios para el proyecto vía npm, para esto es necesario estar en el root del proyecto y correr en la terminal:

> `npm install`

### Paso 3

Correr la aplicación para esto se puede utilizar el modo **dev** o **prod**.

> Para **dev**, correr en la terminal:
> `npm run dev`

> Para **prod**, correr en la terminal:
> `npm run build && npm start`

Por defecto, la aplicación se conectará a un endpoint que se encuentra de manera remota en una instancia de AWS, para conectarse a el endpoint local, es decir, `http://localhost:8000`, es necesario actualizar la variable de entorno presente en el archivo `next.config.js`.

> Se debe reemplazar `http://desarrollosoftware.tk` por `http://desarrollosoftware.tk`.

**NOTA: Se recomienda fuertemente utilizar la versión por defecto, por comodidad**.
