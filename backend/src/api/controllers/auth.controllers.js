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

        const user = await userModel.obtenerUsuario(email,password);

        if(!user){ 
            return res.render("login", { 
                title: "login usuario",
                about: "login de usuario admin",
                error: "credenciales incorrectas"
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
