import productModels from "../models/product.models.js";
import saleModels from "../models/sale.models.js";

// Crear una venta
// Body esperado: { user_name: "Martin", products: [ { id: 1, quantity: 2 }, ... ] }

export const createSale = async (req, res) => {
    try {
        const { user_name, products } = req.body;

        let total = 0;
        const detalle = [];

        // El precio lo tomamos de la BBDD (no confiamos en el precio que manda el cliente)
        for (const item of products) {
            const [rows] = await productModels.seleccionarProductosPorID(item.id);

            if (rows.length === 0 || Number(rows[0].active) !== 1) {
                return res.status(400).json({
                    message: `El producto con id ${item.id} no esta disponible`
                });
            }

            const producto = rows[0];
            const subtotal = Number(producto.price) * item.quantity;
            total += subtotal;

            detalle.push({
                id: producto.id,
                name: producto.name,
                price: Number(producto.price),
                quantity: item.quantity,
                subtotal: subtotal
            });
        }

        // 1. Guardamos la venta y obtenemos su id
        const [result] = await saleModels.insertarVenta(user_name.trim(), total);
        const saleId = result.insertId;

        // 2. Guardamos cada producto vendido en la tabla intermedia
        for (const item of detalle) {
            await saleModels.insertarProductoVenta(item.id, saleId, item.quantity);
        }

        res.status(201).json({
            message: "Venta registrada exitosamente",
            payload: {
                id: saleId,
                user_name: user_name.trim(),
                total: total,
                products: detalle
            }
        });

    } catch (error) {
        console.log("Error registrando la venta: ", error);
        res.status(500).json({
            message: "Error interno al registrar la venta"
        });
    }
}

// Listado de ventas con sus productos

export const getSales = async (req, res) => {
    try {
        const [rows] = await saleModels.seleccionarVentasConProductos();

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron ventas"
            });
        }

        // Cada fila es "una venta + un producto", las agrupamos por venta
        const ventas = [];

        rows.forEach(fila => {
            let venta = ventas.find(v => v.id === fila.id);

            if (!venta) {
                venta = {
                    id: fila.id,
                    date: fila.date,
                    total_price: Number(fila.total_price),
                    user_name: fila.user_name,
                    products: []
                };
                ventas.push(venta);
            }

            venta.products.push({
                id: fila.product_id,
                name: fila.name,
                price: Number(fila.price),
                quantity: fila.quantity
            });
        });

        res.status(200).json({
            payload: ventas
        });

    } catch (error) {
        console.log("Error obteniendo ventas: ", error);
        res.status(500).json({
            message: "Error interno al obtener las ventas"
        });
    }
}
