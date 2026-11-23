import bcrypt from "bcrypt";
import { insertarNuevoUsuario } from "../models/user.models.js";


export const createNewUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Nunca guardamos la password como viene: la hasheamos con bcrypt (10 rondas de salt)
        const passwordHasheada = await bcrypt.hash(password, 10);

        const [result] = await insertarNuevoUsuario(name.trim(), email.trim(), passwordHasheada);


        console.log(result);

        res.status(201).render("createUser", {
            title: "Crear usuario",
            about: "Crear usuario admin",
            message: "Usuario creado exitosamente"
        });

    } catch(error) {
        console.log("Error creando usuario: ", error);

        res.status(500).json({
            message: "Error interno al crear usuario"
        });
    }
}
