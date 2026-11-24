const formBienvenida = document.getElementById("formBienvenida");
const inputNombre = document.getElementById("nombreCliente");
const errorNombre = document.getElementById("errorNombre");

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

    sessionStorage.setItem("nombreCliente", nombre);
    window.location.href = "productos.html";
});
