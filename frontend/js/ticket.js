const ticket = JSON.parse(sessionStorage.getItem("ticket"));

const btnPdf = document.getElementById("btnPdf");
const btnSalir = document.getElementById("btnSalir");

if (!ticket) {
    window.location.href = "index.html";
} else {
    mostrarTicket();
}


function formatearFecha(fechaISO) {
    return new Date(fechaISO).toLocaleString("es-AR");
}


function mostrarTicket() {
    document.getElementById("ticketId").textContent = ticket.id;
    document.getElementById("ticketCliente").textContent = ticket.nombre;
    document.getElementById("ticketFecha").textContent = formatearFecha(ticket.fecha);
    document.getElementById("ticketTotal").textContent = formatearPrecio(ticket.total);

    let filas = "";

    ticket.productos.forEach(producto => {
        filas += `
            <tr>
                <td>${producto.name}</td>
                <td>${producto.quantity}</td>
                <td>${formatearPrecio(producto.price)}</td>
                <td>${formatearPrecio(producto.subtotal)}</td>
            </tr>
        `;
    });

    document.getElementById("ticketProductos").innerHTML = filas;
}

const MARGEN = 20;
const ANCHO_HOJA = 210;
const COL_CANTIDAD = 120;
const COL_SUBTOTAL = 150;
const LIMITE_PAGINA = 270;

function dibujarEncabezadoTabla(doc, y) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);

    doc.text("Producto", MARGEN, y);
    doc.text("Cant.", COL_CANTIDAD, y);
    doc.text("Subtotal", COL_SUBTOTAL, y);

    doc.setFont("helvetica", "normal");

    y += 3;
    doc.line(MARGEN, y, ANCHO_HOJA - MARGEN, y);

    return y;
}

function generarTicketPdf(datos) {
    if (!window.jspdf) {
        alert("No se pudo cargar el generador de PDF. Revisa tu conexion.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = MARGEN;

    doc.setFontSize(18);
    doc.text("Fierritos Shop", MARGEN, y);

    y += 10;
    doc.setFontSize(11);
    doc.text(`N° de venta: ${datos.id}`, MARGEN, y);
    y += 7;
    doc.text(`Cliente: ${datos.nombre}`, MARGEN, y);
    y += 7;
    doc.text(`Fecha: ${formatearFecha(datos.fecha)}`, MARGEN, y);

    y += 12;
    y = dibujarEncabezadoTabla(doc, y);

    datos.productos.forEach(producto => {
        y += 8;

        if (y > LIMITE_PAGINA) {
            doc.addPage();
            y = MARGEN;
            y = dibujarEncabezadoTabla(doc, y);
            y += 8;
        }

        doc.text(producto.name, MARGEN, y);
        doc.text(String(producto.quantity), COL_CANTIDAD, y);
        doc.text(formatearPrecio(producto.subtotal), COL_SUBTOTAL, y);
    });

    y += 5;
    doc.line(MARGEN, y, ANCHO_HOJA - MARGEN, y);

    y += 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Total: ${formatearPrecio(datos.total)}`, MARGEN, y);

    doc.save(`ticket-fierritos-${datos.id}.pdf`);
}

btnPdf.addEventListener("click", () => {
    generarTicketPdf(ticket);
});

btnSalir.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "index.html";
});
