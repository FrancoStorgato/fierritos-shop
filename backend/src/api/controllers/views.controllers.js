import productModels from "../models/product.models.js";

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

const vistaConsultar = (req, res) => { 
    res.render("get", { 
        title: "Consultar"
    });
}

const vistaCrear = (req, res) => {
    res.render("post", {
        title: "Crear",
        about: "Crear producto"
    });
}

const vistaCrearUser = (req, res) => {
    res.render("createUser", {
        title: "Crear usuario",
        about: "Crear usuario admin"
    });
}

const vistaModificar = (req, res) => {
    res.render("put", {
        title: "Modificar"
    });
}

const vistaEliminar = (req, res) => {
    res.render("delete", {
        title: "Eliminar"
    });
}

export {
    vistaCrear,
    vistaConsultar,
    vistaCrearUser,
    vistaEliminar,
    vistaModificar,
    vistaPrincipal
}