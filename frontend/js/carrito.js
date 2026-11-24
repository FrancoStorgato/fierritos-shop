exigirNombre();

const cartList = document.getElementById("cartList");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const errorCompra = document.getElementById("errorCompra");

const confirmModal = document.getElementById("confirmModal");
const totalModal = document.getElementById("totalModal");
const cancelBtn = document.getElementById("cancelBtn");
const okBtn = document.getElementById("okBtn");


function renderizarCarrito() {
    const carrito = obtenerCarrito();

    cartTotal.textContent = formatearPrecio(totalCarrito(carrito));

    if (carrito.length === 0) {
        cartList.innerHTML = "<p class='loading'>Tu carrito está vacío. Volvé a productos para sumar modelos.</p>";
        checkoutBtn.disabled = true;
        return;
    }

    checkoutBtn.disabled = false;
    cartList.innerHTML = "";

    carrito.forEach(item => {
        const fila = document.createElement("div");
        fila.className = "cart-row";
        fila.innerHTML = `
            <img src="${urlImagen(item.image)}" alt="${item.name}">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <span class="cat">${nombreCategoria(item.category)} · ${formatearPrecio(item.price)} c/u</span>
            </div>
            <div class="cantidad">
                <button type="button" class="cantidad-btn" data-accion="restar">-</button>
                <span>${item.quantity}</span>
                <button type="button" class="cantidad-btn" data-accion="sumar">+</button>
            </div>
            <div class="cart-right">
                <strong>${formatearPrecio(item.price * item.quantity)}</strong>
                <button type="button" class="quitar" data-accion="quitar">Eliminar</button>
            </div>
        `;

        fila.querySelectorAll("[data-accion]").forEach(boton => {
            boton.addEventListener("click", () => {
                modificarCarrito(item, boton.dataset.accion);
                renderizarCarrito();
            });
        });

        cartList.appendChild(fila);
    });
}


/////////////////////////
// Modal de confirmacion

checkoutBtn.addEventListener("click", () => {
    errorCompra.textContent = "";
    totalModal.textContent = formatearPrecio(totalCarrito(obtenerCarrito()));
    confirmModal.classList.add("abrir");
});

cancelBtn.addEventListener("click", () => {
    confirmModal.classList.remove("abrir");
});


okBtn.addEventListener("click", async () => {
    okBtn.disabled = true;

    try {
        // POST /api/sales -> se guarda la venta en la BBDD
        const venta = await registrarVenta(obtenerNombre(), obtenerCarrito());

        // Guardamos los datos del ticket para mostrarlos en la pantalla ticket
        const ticket = {
            id: venta.id,
            nombre: venta.user_name,
            fecha: new Date().toISOString(),
            productos: venta.products,
            total: venta.total
        };

        sessionStorage.setItem("ticket", JSON.stringify(ticket));
        sessionStorage.removeItem("carrito");

        window.location.href = "ticket.html";

    } catch (error) {
        console.error("Error al registrar la venta: ", error);
        confirmModal.classList.remove("abrir");
        errorCompra.textContent = `No se pudo registrar la compra: ${error.message}`;
        okBtn.disabled = false;
    }
});

renderizarCarrito();
