
import connection from "../database/db.js";

const insertarNuevoUsuario = (name, email, password) => {

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    return connection.query(sql, [name, email, password]);
}


async function obtenerUsuarioPorEmail(email) {
    const [rows] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
}


export {
    insertarNuevoUsuario,
    obtenerUsuarioPorEmail
}
