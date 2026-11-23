//Modelado de ventas

import connection from "../database/db.js";

//Registramos la venta (la fecha la completa sola la BBDD con CURRENT_TIMESTAMP)
const insertarVenta = (user_name, total_price) => {
    const sql = "INSERT INTO sales (user_name, total_price) VALUES (?, ?)";

    return connection.query(sql, [user_name, total_price]);
}

//Registramos cada producto de la venta en la tabla intermedia (relacion muchos a muchos)
const insertarProductoVenta = (product_id, sale_id, quantity) => {
    const sql = "INSERT INTO product_sales (product_id, sale_id, quantity) VALUES (?, ?, ?)";

    return connection.query(sql, [product_id, sale_id, quantity]);
}

//Obtenemos las ventas junto con los productos asociados
const seleccionarVentasConProductos = () => {
    const sql = `
        SELECT sales.id, sales.date, sales.total_price, sales.user_name,
               products.id AS product_id, products.name, products.price, product_sales.quantity
        FROM sales
        JOIN product_sales ON product_sales.sale_id = sales.id
        JOIN products ON products.id = product_sales.product_id
        ORDER BY sales.id DESC
    `;

    return connection.query(sql);
}

export default {
    insertarVenta,
    insertarProductoVenta,
    seleccionarVentasConProductos
}
