const ticket = JSON.parse(sessionStorage.getItem("ticket"));

const btnPdf = document.getElementById("btnPdf");
const btnSalir = document.getElementById("btnSalir");


// Si no hay ticket (entraron directo a esta pagina) volvemos al inicio
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


/////////////////////////
// Descargar el ticket en PDF con jsPDF

btnPdf.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 20; // Posicion vertical donde vamos escribiendo

    doc.setFontSize(18);
    doc.text("Fierritos Shop", 20, y);

    y += 10;
    doc.setFontSize(11);
    doc.text(`N° de venta: ${ticket.id}`, 20, y);
    y += 7;
    doc.text(`Cliente: ${ticket.nombre}`, 20, y);
    y += 7;
    doc.text(`Fecha: ${formatearFecha(ticket.fecha)}`, 20, y);

    y += 12;
    doc.text("Producto", 20, y);
    doc.text("Cant.", 120, y);
    doc.text("Subtotal", 150, y);
    y += 3;
    doc.line(20, y, 190, y);

    ticket.productos.forEach(producto => {
        y += 8;

        // Si nos quedamos sin espacio en la hoja, agregamos otra
        if (y > 270) {
            doc.addPage();
            y = 20;
        }

        doc.text(producto.name, 20, y);
        doc.text(String(producto.quantity), 120, y);
        doc.text(formatearPrecio(producto.subtotal), 150, y);
    });

    y += 5;
    doc.line(20, y, 190, y);
    y += 10;
    doc.setFontSize(14);
    doc.text(`Total: ${formatearPrecio(ticket.total)}`, 20, y);

    doc.save(`ticket-fierritos-${ticket.id}.pdf`);
});


/////////////////////////
// Salir: se borra todo (nombre, carrito y ticket) y el autoservicio vuelve a empezar

btnSalir.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "index.html";
});
