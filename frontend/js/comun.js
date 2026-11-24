// Funciones compartidas por todas las pantallas del cliente
// El nombre y el carrito se guardan en sessionStorage: es un autoservicio, al terminar la compra se reinicia todo


/////////////////////////
// Nombre del cliente

function obtenerNombre() {
    return sessionStorage.getItem("nombreCliente");
}

// Si el cliente no ingreso su nombre, lo mandamos a la pantalla de bienvenida
function exigirNombre() {
    if (!obtenerNombre()) {
        window.location.href = "index.html";
    }
}


/////////////////////////
// Carrito

function obtenerCarrito() {
    return JSON.parse(sessionStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
}

// accion puede ser: "agregar", "sumar", "restar" o "quitar"
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

        // Si llega a 0 lo sacamos del carrito
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


/////////////////////////
// Utilidades

function formatearPrecio(numero) {
    return "$ " + Number(numero).toLocaleString("es-AR");
}

function nombreCategoria(categoria) {
    return categoria === "auto" ? "Autos" : "Motos";
}


/////////////////////////
// Header comun: nombre de los alumnos, link al admin y contador del carrito

document.getElementById("alumnos").textContent = ALUMNOS;
document.getElementById("linkAdmin").href = `${API_URL}/auth/login`;
actualizarContador();
