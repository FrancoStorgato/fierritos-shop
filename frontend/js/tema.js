// Tema claro / oscuro guardado en localStorage (se mantiene aunque se recargue la pagina)
// Este script se carga SIN defer para aplicar el tema antes de pintar la pagina

const temaGuardado = localStorage.getItem("tema") || "dark";
document.documentElement.setAttribute("data-theme", temaGuardado);

function cambiarTema() {
    const temaActual = document.documentElement.getAttribute("data-theme");
    const temaNuevo = temaActual === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", temaNuevo);
    localStorage.setItem("tema", temaNuevo);
}

// Cuando termina de cargar el HTML, conectamos el boton de tema
document.addEventListener("DOMContentLoaded", () => {
    const btnTema = document.getElementById("btnTema");

    if (btnTema) {
        btnTema.addEventListener("click", cambiarTema);
    }
});
