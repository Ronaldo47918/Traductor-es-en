# Traductor Español–Inglés

Aplicación web universitaria para traducir texto del español al inglés. El frontend envía el texto a una API propia implementada con Node.js y Express; el servidor realiza la traducción usando Transformers.js y el modelo `Xenova/opus-mt-es-en`.

## Funcionalidades

- Traducción de texto de español a inglés.
- Comunicación entre el navegador y el backend mediante `fetch`, `async/await` y JSON.
- Validación del texto en el servidor (no vacío y máximo 5000 caracteres).
- Mensajes de carga, éxito y error en la interfaz.
- Tema claro y oscuro con preferencia guardada en `localStorage`.
- Diseño adaptable a móvil y escritorio usando Bootstrap 5.

## Tecnologías

- Node.js y Express 5.
- JavaScript con módulos ES (`.mjs`).
- [Transformers.js](https://huggingface.co/docs/transformers.js) y el modelo [`Xenova/opus-mt-es-en`](https://huggingface.co/Xenova/opus-mt-es-en).
- Bootstrap 5.3.3 mediante CDN.

## Requisitos

- Node.js 20 o posterior y npm.
- Conexión a Internet para descargar Bootstrap desde su CDN y permitir la descarga inicial del modelo de traducción.

## Instalación y ejecución local

1. Clona el repositorio o descarga el proyecto.
2. Desde la carpeta del proyecto, instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor:

   ```bash
   npm start
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en el navegador.
5. Escribe texto en español y pulsa **Traducir**.

La primera traducción puede tardar más porque el servidor carga el modelo. El servidor escucha en el puerto indicado por la variable de entorno `PORT` o, si no está definida, en el puerto `3000`.

## API

### `GET /api/health`

Comprueba que el servidor está activo. Responde con HTTP `200` y un JSON similar a:

```json
{ "status": "ok" }
```

### `POST /api/translate`

Recibe el texto que se quiere traducir como JSON:

```json
{ "text": "Hola, ¿cómo estás?" }
```

Si la solicitud es válida, responde con HTTP `200` y la traducción:

```json
{ "translation": "Hello, how are you?" }
```

Si el texto está vacío, supera los 5000 caracteres o la solicitud no es válida, responde con un código HTTP de error y un JSON con la propiedad `error`.

## Estructura del proyecto

| Archivo | Responsabilidad |
| --- | --- |
| `index.html` | Interfaz, carga de Bootstrap y campos de entrada y salida. |
| `estilos.css` | Estilos del interruptor de tema, foco y estados visuales. |
| `app.mjs` | Eventos de la interfaz, tema claro/oscuro y llamadas `fetch` al backend. |
| `server.mjs` | Servidor Express, archivos estáticos y rutas de la API. |
| `traductor.mjs` | Carga del modelo y ejecución de la traducción. |
| `package.json` | Dependencias y comando de inicio. |

## Diagrama de componentes

El diagrama se añadirá cuando se complete la arquitectura final del proyecto.

## Despliegue

La aplicación todavía no tiene una URL pública. El servidor está preparado para usar el puerto asignado por la plataforma mediante `PORT`; se documentará aquí el enlace y la configuración cuando se realice el despliegue.

## Autoría y créditos

Proyecto académico de UNISANGIL. Completar con los nombres de los integrantes antes de entregar.
