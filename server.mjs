import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { traducir } from "./traductor.mjs";

const app = express();
const port = Number(process.env.PORT) || 3000;
const frontendOrigin = process.env.FRONTEND_ORIGIN;
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const maximumTextLength = 5000;

if (frontendOrigin) {
    app.use(cors({ origin: frontendOrigin }));
}

app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_request, response) => {
    response.status(200).json({ status: "ok" });
});

app.post("/api/translate", async (request, response, next) => {
    const text = request.body?.text;

    if (typeof text !== "string" || text.trim() === "") {
        return response.status(400).json({ error: "Envía un texto para traducir." });
    }

    if (text.trim().length > maximumTextLength) {
        return response.status(400).json({
            error: `El texto no puede superar los ${maximumTextLength} caracteres.`,
        });
    }

    try {
        const translation = await traducir(text.trim());
        return response.status(200).json({ translation });
    } catch (error) {
        return next(error);
    }
});

app.use("/api", (_request, response) => {
    response.status(404).json({ error: "Ruta de API no encontrada." });
});

app.use(express.static(currentDirectory));

app.use((error, _request, response, _next) => {
    console.error("Error en el servidor:", error.message);

    if (response.headersSent) {
        return;
    }

    const status = error.status === 413 ? 413 : error.status === 400 ? 400 : 500;
    const message = status === 500
        ? "No fue posible completar la solicitud. Inténtalo de nuevo."
        : status === 413
            ? "La solicitud es demasiado grande."
            : "El cuerpo de la solicitud no es JSON válido.";

    response.status(status).json({ error: message });
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Servidor disponible en http://localhost:${port}`);
});