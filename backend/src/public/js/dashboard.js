const urlBase = window.location.origin;
const modal = document.getElementById("modalConfirmar");
const modalTitulo = document.getElementById("modalTitulo");
const modalTexto = document.getElementById("modalTexto");
const modalCancelar = document.getElementById("modalCancelar");
const modalAceptar = document.getElementById("modalAceptar");
const mensajeDashboard = document.getElementById("mensaje-dashboard");

// Guardamos que accion se va a confirmar en el modal
let accionPendiente = null;


function mostrarMensaje(tipo, mensaje) {
    mensajeDashboard.innerHTML = `<p class="mensaje ${tipo}">${mensaje}</p>`;
}

function abrirModal(accion, id, nombre) {
    accionPendiente = { accion, id };

    if (accion === "baja") {
        modalTitulo.textContent = "Eliminar producto";
        modalTexto.textContent = `¿Seguro que queres dar de baja "${nombre}"? Va a quedar inactivo y no se vera en la tienda.`;
    } else {
        modalTitulo.textContent = "Activar producto";
        modalTexto.textContent = `¿Seguro que queres activar "${nombre}"? Va a volver a verse en la tienda.`;
    }

    modal.classList.add("abierto");
}

function cerrarModal() {
    accionPendiente = null;
    modal.classList.remove("abierto");
}


// Todos los botones Eliminar / Activar tienen data-accion, data-id y data-nombre
document.querySelectorAll("[data-accion]").forEach(boton => {
    boton.addEventListener("click", () => {
        abrirModal(boton.dataset.accion, boton.dataset.id, boton.dataset.nombre);
    });
});

modalCancelar.addEventListener("click", cerrarModal);


modalAceptar.addEventListener("click", async () => {
    if (!accionPendiente) return;

    const { accion, id } = accionPendiente;

    // Baja logica -> DELETE /api/products/:id   |   Activar -> PUT /api/products/:id/activar
    const url = accion === "baja"
        ? `${urlBase}/api/products/${id}`
        : `${urlBase}/api/products/${id}/activar`;

    const metodo = accion === "baja" ? "DELETE" : "PUT";

    try {
        const response = await fetch(url, { method: metodo });
        const data = await response.json();

        cerrarModal();

        if (!response.ok) {
            return mostrarMensaje("error", data.message);
        }

        // Recargamos para ver el nuevo estado del producto
        window.location.reload();

    } catch (error) {
        console.error("Error al cambiar el estado del producto: ", error);
        cerrarModal();
        mostrarMensaje("error", "Error de conexion con el servidor");
    }
});
