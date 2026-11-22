
import connection from "../database/db.js";

// Crear usuario
const insertNewUser = (name, email, password) => {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    return connection.query(sql, [name, email, password]);
}

async function Email(email) {
    const[rows] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
}


export default{
    insertNewUser,
    Email    
}