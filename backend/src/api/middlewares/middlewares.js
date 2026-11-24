// Loguea metodo y url de cada request
const loggerUrl = (req, res, next) => {
    const fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
};

//valida que el id sea un numero entero positivo
const validateId = (req, res, next) => {
    const id = Number(req.params.id); 

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "El id debe ser un numero entero positivo"
        });
    }

    req.id = id;
    next(); 
}

//valida que todos los imputs de post.ejs esten correctos
const validateProduct = (req, res, next) => {
    const categoriasValidas = ["auto", "moto"];
    const errores = []; 


    const { name, image, price, category } = req.body;


    if (!name || !image || !price || !category) {
        errores.push("Faltan campos requeridos");
    }


    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener al menos dos caracteres");
    }


    if (typeof price !== "number" || price <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }


    if (!categoriasValidas.includes(category)) {
        errores.push("Categoria invalida")
    }

  
    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos",
            listaErrores: errores
        });
    }

    next(); 
}

// Valida el body de una venta
const validateSale = (req, res, next) => {
    const errores = [];

    const { user_name, products } = req.body;

    if (typeof user_name !== "string" || user_name.trim().length < 2) {
        errores.push("El nombre del cliente debe tener al menos dos caracteres");
    }

    if (!Array.isArray(products) || products.length === 0) {
        errores.push("La venta debe tener al menos un producto");
    } else {
        products.forEach(item => {
            if (!Number.isInteger(item.id) || item.id <= 0) {
                errores.push("Hay un producto con id invalido");
            }

            if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
                errores.push("La cantidad debe ser un numero entero mayor a 0");
            }
        });
    }

    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos",
            listaErrores: errores
        });
    }

    next();
}

// Valida los datos para crear un usuario admin
const validateUser = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 6) {
        return res.status(400).render("createUser", {
            title: "Crear usuario",
            about: "Crear usuario admin",
            error: "Completa todos los campos (la password debe tener al menos 6 caracteres)"
        });
    }

    next();
}


//Exige al momento que cambiemos de pagina estemos logeados
const requireLogin = (req, res, next) => {
    
    if (!req.session.user) {
        return res.redirect("/auth/login");
    }

    next();
}

//exportamos todos los middlewares
export{
    loggerUrl,
    validateId,
    validateProduct,
    validateSale,
    validateUser,
    requireLogin
}