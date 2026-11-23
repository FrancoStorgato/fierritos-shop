
import connection from "../database/db.js";

// Crear usuario
const insertarNuevoUsuario = (name, email, password) => {

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    return connection.query(sql, [name, email, password]);
}

async function obtenerUsuario(email, password) {
    const[rows] = await connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [email,password]);
    return rows[0];
}


export {
    insertarNuevoUsuario,
    obtenerUsuario   
}