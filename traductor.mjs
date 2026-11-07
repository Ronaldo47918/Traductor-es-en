import { pipeline } from "@huggingface/transformers";

let traductor = null;

export async function cargarModelo() {

    if (traductor === null) {

        traductor = await pipeline(
            "translation",
            "Xenova/opus-mt-es-en",
            { dtype: "fp32" }
        );

    }

    return traductor;
}

export async function traducir(texto) {

    const modelo = await cargarModelo();

    const resultado = await modelo(texto);

    return resultado[0].translation_text;
}