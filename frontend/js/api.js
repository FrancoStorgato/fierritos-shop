// Funciones que se comunican con la API REST del backend

// GET /api/products/active -> solo los productos activos
async function obtenerProductosActivos() {
    const response = await fetch(`${API_URL}/api/products/active`);
    const data = await response.json();

    // fetch no tira error con 404 o 500, por eso revisamos response.ok
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data.payload;
}


// POST /api/sales -> registra la venta y devuelve sus datos
async function registrarVenta(nombreCliente, carrito) {
    const venta = {
        user_name: nombreCliente,
        products: carrito.map(item => ({ id: item.id, quantity: item.quantity }))
    };

    const response = await fetch(`${API_URL}/api/sales`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(venta)
    });

    const data = await response.json();

    if (!response.ok) {
        // Si el middleware de validacion devolvio una lista de errores, la mostramos completa
        const detalle = data.listaErrores ? data.listaErrores.join(". ") : data.message;
        throw new Error(detalle);
    }

    return data.payload;
}


// Las imagenes se guardan como ruta del backend (/img/...), les agregamos la URL del servidor
function urlImagen(ruta) {
    if (ruta.startsWith("http")) {
        return ruta;
    }
    return API_URL + ruta;
}
