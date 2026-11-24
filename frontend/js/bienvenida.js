const formBienvenida = document.getElementById("formBienvenida");
const inputNombre = document.getElementById("nombreCliente");
const errorNombre = document.getElementById("errorNombre");

// Si el cliente vuelve a esta pantalla, le mostramos el nombre que ya habia puesto
if (obtenerNombre()) {
    inputNombre.value = obtenerNombre();
}

formBienvenida.addEventListener("submit", event => {
    event.preventDefault();

    const nombre = inputNombre.value.trim();

    if (nombre.length < 2) {
        errorNombre.textContent = "Ingresá un nombre de al menos 2 letras";
        return;
    }

    // Solo cuando completa el nombre lo dejamos ver los productos
    sessionStorage.setItem("nombreCliente", nombre);
    window.location.href = "productos.html";
});
