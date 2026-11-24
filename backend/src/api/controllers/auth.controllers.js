import bcrypt from "bcrypt";
import * as userModel from "../models/user.models.js";


// Mostramos el formulario de login
export function mostrarLogin(req, res) {
    res.render("login", {
        title: "Login",
        about: "Login de Usuario Admin"
    });
}


// Validamos email y password contra la BBDD y guardamos el usuario en la sesion
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

        
        const user = await userModel.obtenerUsuarioPorEmail(email);

        
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

// Destruimos la sesion y volvemos al login
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
