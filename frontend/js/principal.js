const grid = document.getElementById("productsGrid");

let categoria = "auto";

async function load() {
    grid.innerHTML = "<p class='loading'>Cargando productos...</p>"
    try {
        const data = await fetchProducts(categoria);
        
        render(data.products);

    } catch (error) {
        renderLoadError();
    }
}

function render(products) {
    grid.innerHTML = "";
    if (products.length === 0) {
        grid.innerHTML = "<p class='loading'>No hay productos en esta categoria.</p>";
        return;
    }
    products.forEach(product => {
        const card = document.createElement("article");
        card.className = "card";
        card.innerHTML = `
            <div class="card-img">
                <img src="${imageUrl(product.image)}" alt="${product.name}">
            </div>
            <div class="card-body">
                <h3 title="${product.name}">${product.name}</h3>
                <span class="cat">${product.category === "auto" ? "Autos" : "Motos"}</span>
                <p class="price">$ ${Number(product.price).toLocaleString("es-AR")}</p>
                <button class="btn btn-primary" data-id="${product.id}">Agregar al carrito</button>
            </div>
        `;
        card.querySelector("button").addEventListener("click", () => {
            addToCart(product);
            updateBadge();
        });
        grid.appendChild(card);
    });
}

load();