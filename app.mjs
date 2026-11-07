const textoEntrada = document.getElementById("textoEntrada");
const textoSalida = document.getElementById("textoSalida");
const btnTraducir = document.getElementById("btnTraducir");
const estado = document.getElementById("estado");
const themeToggle = document.getElementById("themeToggle");
const themeDescription = document.getElementById("themeDescription");
const API_BASE = "/api";
const themeStorageKey = "traductor-theme";

function aplicarTema(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    themeToggle.checked = theme === "dark";
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Activar modo claro" : "Activar modo oscuro");
    themeDescription.textContent = theme === "dark" ? "Modo oscuro" : "Modo claro";
}

const temaGuardado = localStorage.getItem(themeStorageKey);
aplicarTema(temaGuardado === "dark" ? "dark" : "light");

themeToggle.addEventListener("change", () => {
    const nuevoTema = themeToggle.checked ? "dark" : "light";
    aplicarTema(nuevoTema);
    localStorage.setItem(themeStorageKey, nuevoTema);
});

btnTraducir.addEventListener("click", async () => {
    const texto = textoEntrada.value.trim();

    if (texto === "") {
        estado.textContent = "Escribe un texto para traducir.";
        return;
    }

    try {

        btnTraducir.disabled = true;
        btnTraducir.setAttribute("aria-busy", "true");
        btnTraducir.textContent = "Traduciendo...";

        textoSalida.value = "";
        estado.textContent = "Enviando texto al servidor y traduciendo...";

        const response = await fetch(`${API_BASE}/translate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: texto }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "No fue posible traducir el texto.");
        }

        textoSalida.value = data.translation;

        estado.textContent = "Traducción completada.";

    } catch (error) {

        console.error(error);

        estado.textContent = error instanceof TypeError
            ? "No se pudo conectar con el servidor. Verifica que esté iniciado e inténtalo de nuevo."
            : error.message;

    } finally {

        btnTraducir.disabled = false;
        btnTraducir.setAttribute("aria-busy", "false");
        btnTraducir.textContent = "Traducir";

    }

});