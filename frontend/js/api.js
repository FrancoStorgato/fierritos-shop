async function obtenerProductosActivos() {
    const response = await fetch(`${API_URL}/api/products/active`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data.payload;
}

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
        const detalle = data.listaErrores ? data.listaErrores.join(". ") : data.message;
        throw new Error(detalle);
    }

    return data.payload;
}

function urlImagen(ruta) {
    if (ruta.startsWith("http")) {
        return ruta;
    }
    return API_URL + ruta;
}
