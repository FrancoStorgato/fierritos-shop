import productModels from "../models/product.models.js";

//Vistas del backoffice


//Vista que carga el index.ejs
const vistaPrincipal = async (req, res) => {
    try{
        const [rows] = await productModels.seleccionarTodosLosProductos();

        res.render("index", { 
            title: "Principal",
            listaProductos: rows
        });
    }catch (error){ 
        console.log("error obteniendo productos: ", error);
        res.status(500).json({ 
            message: "error interno al obtener productos"
        });
    }
}

//Vista que carga el get.ejs
const vistaConsultar = (req, res) => { 
    res.render("get", { 
        title: "Consultar"
    });
}


//Vista que carga el post.ejs
const vistaCrear = (req, res) => {
    res.render("post", {
        title: "Crear",
        about: "Crear producto"
    });
}


//Vista que carga el createUser.ejs
const vistaCrearUser = (req, res) => {
    res.render("createUser", {
        title: "Crear usuario",
        about: "Crear usuario admin"
    });
}


//Vista que carga el put.ejs
const vistaModificar = (req, res) => {
    res.render("put", {
        title: "Modificar"
    });
}


//Vista que carga el delete.ejs
const vistaEliminar = (req, res) => {
    res.render("delete", {
        title: "Eliminar"
    });
}


//Exportamos todas las views
export {
    vistaCrear,
    vistaConsultar,
    vistaCrearUser,
    vistaEliminar,
    vistaModificar,
    vistaPrincipal
}