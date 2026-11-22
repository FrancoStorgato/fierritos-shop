//Modelado de productos

import connection from "../database/db.js";

//obtencion de todos los productos

const seleccionarTodosLosProductos = () => {
    return connection.query("SELECT * FROM products");
}

//obtencion de productos activos
const seleccionarProductosActivos = () => {
    const sql = "SELECT * FROM products WHERE products.active = ?";

    return connection.query(sql, [1]);
}

//obtencion de producto por id
const seleccionarProductosPorID = (id) => {
    const sql = "SELECT * FROM products WHERE products.id = ?";

    return connection.query(sql, [id]);
}

//agregacion de productos nuevos

const agregarNuevoProducto = (name, image, category, price) => {
    const sql = "INSERT INTO products (name, image, category, price) VALUES (?,?,?,?)";

    return connection.query(sql, [name, image, category, price]);
    
}


//Actualizacion de productos por id
const actualizarProducto = (name, image, category, price, active, id) => {
    const sql = "UPDATE products SET name = ?, image = ?, price = ?, category = ?, active = ? WHERE id = ?";

    return connection.query(sql,[name, image, category, price, active, id])
}

//Eliminacion de productos por id
const eliminarProducto = (id) => {
    const sql = "DELETE FROM products WHERE id = ?";

    return connection.query(sql, [id]);
}

//exportamos todas las funciones
export default{
    seleccionarTodosLosProductos,
    seleccionarProductosActivos,
    seleccionarProductosPorID,
    agregarNuevoProducto,
    actualizarProducto,
    eliminarProducto,
}

