
function obtenerNombre() {
    return sessionStorage.getItem("nombreCliente");
}

function exigirNombre() {
    if (!obtenerNombre()) {
        window.location.href = "index.html";
    }
}

function obtenerCarrito() {
    return JSON.parse(sessionStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
}

function modificarCarrito(producto, accion) {
    const carrito = obtenerCarrito();
    const indice = carrito.findIndex(item => item.id === producto.id);

    if (accion === "agregar" || accion === "sumar") {
        if (indice === -1) {
            carrito.push({
                id: producto.id,
                name: producto.name,
                price: Number(producto.price),
                image: producto.image,
                category: producto.category,
                quantity: 1
            });
        } else {
            carrito[indice].quantity++;
        }
    }

    if (accion === "restar" && indice !== -1) {
        carrito[indice].quantity--;

        if (carrito[indice].quantity === 0) {
            carrito.splice(indice, 1);
        }
    }

    if (accion === "quitar" && indice !== -1) {
        carrito.splice(indice, 1);
    }

    guardarCarrito(carrito);
}

function cantidadEnCarrito(carrito) {
    return carrito.reduce((total, item) => total + item.quantity, 0);
}

function totalCarrito(carrito) {
    return carrito.reduce((total, item) => total + item.price * item.quantity, 0);
}

function actualizarContador() {
    const badge = document.getElementById("cartBadge");

    if (badge) {
        badge.textContent = cantidadEnCarrito(obtenerCarrito());
    }
}

function formatearPrecio(numero) {
    return "$ " + Number(numero).toLocaleString("es-AR");
}

function nombreCategoria(categoria) {
    return categoria === "auto" ? "Autos" : "Motos";
}

document.getElementById("alumnos").textContent = ALUMNOS;
document.getElementById("linkAdmin").href = `${API_URL}/auth/login`;
actualizarContador();
