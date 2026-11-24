const temaGuardado = localStorage.getItem("tema") || "dark";
document.documentElement.setAttribute("data-theme", temaGuardado);

function cambiarTema() {
    const temaActual = document.documentElement.getAttribute("data-theme");
    const temaNuevo = temaActual === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", temaNuevo);
    localStorage.setItem("tema", temaNuevo);
}

document.addEventListener("DOMContentLoaded", () => {
    const btnTema = document.getElementById("btnTema");

    if (btnTema) {
        btnTema.addEventListener("click", cambiarTema);
    }
});
