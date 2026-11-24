
import connection from "../database/db.js";

// Insertamos un usuario nuevo
const insertarNuevoUsuario = (name, email, password) => {

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    return connection.query(sql, [name, email, password]);
}


// Buscamos un usuario por email
async function obtenerUsuarioPorEmail(email) {
    const [rows] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
}

//Exportamos las funciones
export {
    insertarNuevoUsuario,
    obtenerUsuarioPorEmail
}
