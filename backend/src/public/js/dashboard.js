const urlBase = window.location.origin;
const modal = document.getElementById("modalConfirmar");
const modalTitulo = document.getElementById("modalTitulo");
const modalTexto = document.getElementById("modalTexto");
const modalCancelar = document.getElementById("modalCancelar");
const modalAceptar = document.getElementById("modalAceptar");
const mensajeDashboard = document.getElementById("mensaje-dashboard");

// Guardamos que accion se va a confirmar en el modal
let accionPendiente = null;

//funcion para mostrar mensajes
function mostrarMensaje(tipo, mensaje) {
    mensajeDashboard.innerHTML = `<p class="mensaje ${tipo}">${mensaje}</p>`;
}


//funcion que abre el modal de confirmacion
function abrirModal(accion, id, nombre) {
    accionPendiente = { accion, id };

    modalTexto.textContent = `¿Seguro que queres eliminar "${nombre}"? Se borra de la base y no se puede recuperar.`;

    modal.classList.add("abierto");
}


//funcion que cierra el modal de confirmacion
function cerrarModal() {
    accionPendiente = null;
    modal.classList.remove("abierto");
}


// Todos los botones Eliminar tienen data-accion, data-id y data-nombre
document.querySelectorAll("[data-accion]").forEach(boton => {
    boton.addEventListener("click", () => {
        abrirModal(boton.dataset.accion, boton.dataset.id, boton.dataset.nombre);
    });
});

modalCancelar.addEventListener("click", cerrarModal);


modalAceptar.addEventListener("click", async () => {
    if (!accionPendiente) return;

    const { accion, id } = accionPendiente;

    const url = `${urlBase}/api/products/${id}`;
    const metodo = "DELETE";

    try {
        const response = await fetch(url, { method: metodo });
        const data = await response.json();

        cerrarModal();

        if (!response.ok) {
            return mostrarMensaje("error", data.message);
        }

        
        window.location.reload();

    } catch (error) {
        console.error("Error al cambiar el estado del producto: ", error);
        cerrarModal();
        mostrarMensaje("error", "Error de conexion con el servidor");
    }
});
