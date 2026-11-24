exigirNombre();

const grid = document.getElementById("productsGrid");
const tabs = document.querySelectorAll(".tab");
const saludoCliente = document.getElementById("saludoCliente");

let productos = [];          // Productos activos que trae la API
let categoriaActual = "auto";

saludoCliente.textContent = obtenerNombre();


// Cambiamos de categoria con las pestañas
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        categoriaActual = tab.dataset.cat;

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        renderizarProductos();
    });
});


async function cargarProductos() {
    grid.innerHTML = "<p class='loading'>Cargando productos...</p>";

    try {
        productos = await obtenerProductosActivos();
        renderizarProductos();

    } catch (error) {
        console.error("Error al cargar productos: ", error);
        grid.innerHTML = "<p class='loading'>No se pudieron cargar los productos. Revisá que el servidor esté encendido.</p>";
    }
}


function renderizarProductos() {
    const lista = productos.filter(producto => producto.category === categoriaActual);
    const carrito = obtenerCarrito();

    grid.innerHTML = "";

    if (lista.length === 0) {
        grid.innerHTML = "<p class='loading'>No hay productos en esta categoría.</p>";
        return;
    }

    lista.forEach(producto => {
        const enCarrito = carrito.find(item => item.id === producto.id);

        // Si ya esta en el carrito mostramos los controles de cantidad, si no el boton agregar
        const controles = enCarrito
            ? `
                <div class="cantidad">
                    <button type="button" class="cantidad-btn" data-accion="restar">-</button>
                    <span>${enCarrito.quantity}</span>
                    <button type="button" class="cantidad-btn" data-accion="sumar">+</button>
                </div>
                <button type="button" class="quitar" data-accion="quitar">Quitar del carrito</button>
            `
            : `<button type="button" class="btn btn-primary" data-accion="agregar">Agregar al carrito</button>`;

        const card = document.createElement("article");
        card.className = "card";
        card.innerHTML = `
            <div class="card-img">
                <img src="${urlImagen(producto.image)}" alt="${producto.name}">
            </div>
            <div class="card-body">
                <h3 title="${producto.name}">${producto.name}</h3>
                <span class="cat">${nombreCategoria(producto.category)} · Cód. ${producto.id}</span>
                <p class="price">${formatearPrecio(producto.price)}</p>
                <div class="card-controles">${controles}</div>
            </div>
        `;

        card.querySelectorAll("[data-accion]").forEach(boton => {
            boton.addEventListener("click", () => {
                modificarCarrito(producto, boton.dataset.accion);
                renderizarProductos();
            });
        });

        grid.appendChild(card);
    });
}

cargarProductos();
