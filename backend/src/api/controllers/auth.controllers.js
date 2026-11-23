import bcrypt from "bcrypt";
import * as userModel from "../models/user.models.js";


export function mostrarLogin(req, res) {
    res.render("login", {
        title: "Login",
        about: "Login de Usuario Admin"
    });
}


export async function login(req,res){
    try{
        const {email,password} = req.body;
        
        if(!email || !password){
            return res.render("login", {
                title: "Login Usuario",
                about: "Login de Usuario Admin",
                error: "Todos los campos son requeridos"
            });
        }

        // 1. Buscamos el usuario por email
        const user = await userModel.obtenerUsuarioPorEmail(email);

        // 2. Comparamos la password escrita con el hash guardado en la BBDD
        const passwordCorrecta = user ? await bcrypt.compare(password, user.password) : false;

        if(!user || !passwordCorrecta){
            return res.render("login", {
                title: "Login Usuario",
                about: "Login de Usuario Admin",
                error: "Credenciales incorrectas"
            })
        }

        req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email
        }

        res.redirect("/dashboard/principal");
    }catch (error){
        console.log("Error en el login", error);
        res.status(500).json ({
            message: "error interno del servidor"
        });
    }


}

export function logout(req, res) {
    req.session.destroy((err) => {

        if (err) {
            console.log("Error al destruir la sesion: ", err);

            return res.status(500).json({
                message: "Error al cerrar la sesion"
            });
        }

        res.redirect("/auth/login");

    });
}
