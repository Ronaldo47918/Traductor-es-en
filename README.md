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
- Conexión a Internet para descargar Bootstrap y permitir la descarga inicial del modelo de traducción.

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

El diagrama de componentes muestra las vistas y módulos del navegador, el almacenamiento del tema, las rutas de Express, el modelo de traducción y el flujo de petición y respuesta.

![Diagrama de componentes del traductor](diagrama%20de%20componentes.png)

## Despliegue

La aplicación está desplegada en [Render](https://traductor-es-en-kf3e.onrender.com/). En este proyecto, Render sirve tanto el frontend como el backend desde un único servicio: Express entrega los archivos estáticos de la interfaz y también atiende las rutas `/api`. Se eligió esta arquitectura porque la aplicación es pequeña y no necesita separar el frontend del backend; además, ambos comparten el mismo origen, por lo que el navegador no requiere una configuración CORS entre servicios. El servidor usa la variable de entorno `PORT` proporcionada por la plataforma.

El modelo se carga con la variante cuantizada `q8`, que reduce el uso de memoria y facilita su ejecución en el servicio.

## Auditoría Lighthouse

Se evaluó la aplicación publicada en Render en los modos móvil y escritorio. Los resultados fueron:

| Dispositivo | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
| --- | ---: | ---: | ---: | ---: |
| Móvil | 98 | 100 | 98 | 90 |
| Escritorio | 95 | 100 | 98 | 90 |

Los informes completos se encuentran en:

- [Informe Lighthouse móvil](lighthouse/test%20mobile.pdf)
- [Informe Lighthouse de escritorio](lighthouse/test%20escritorio.pdf)

Como mejora de rendimiento, el modelo se carga con la variante cuantizada `q8` para reducir su consumo de memoria. También se mejoró el interruptor animado de tema claro/oscuro para que sus efectos sean más compatibles, fue una optimización de rendimiento.

Debido a las puntuaciones altas, no se realizaron otras optimizaciones de rendimiento después de la auditoría. El SEO obtuvo 90 puntos, por lo que queda como un aspecto que podría revisarse en una mejora futura.

## Autoría y créditos

Proyecto académico de UNISANGIL.
Ronaldo Albeiro Velasco Medina.
