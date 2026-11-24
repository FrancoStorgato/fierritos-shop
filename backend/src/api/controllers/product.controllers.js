import productModels from "../models/product.models.js";

//Obtenemos todos los productos
export const getAllProducts = async (req, res) => {
    try {
        const [rows] = await productModels.seleccionarTodosLosProductos();

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos" 
            });
        }
        res.status(200).json({
            payload: rows,
        });
    } catch (error) {
        console.log("Error al obtener todos los productos:", error);
        res.status(500).json({
            message: "Error interno al obtener los productos",
        });
    }   
}

//obtenemos los productos activos

const getAllactiveProducts = async (req, res) => {

    try{
        const [rows] = await productModels.seleccionarProductosActivos();

        if(rows.length ===0){
            return res.status(404).json({
                message: "No se encontraron productos" 
            })
        }
        res.status(200).json({
            payload: rows,
        });
    }catch (error) {
        console.log("Error al obtener todos los productos:", error);
        res.status(500).json({
            message: "Error interno al obtener los productos",
        });
    }  
}

//Obtenemos productos por ID

export const getAllProductsByID = async (req, res) => {
    try{
        const [rows] = await productModels.seleccionarProductosPorID(req.id);
        if(rows.length ===0){
            return res.status(404).json({
                message: "No se encontraron productos" 
            })
        }
        res.status(200).json({
            payload: rows,
        });
    }catch (error) {
        console.log("Error al obtener todos los productos:", error);
        res.status(500).json({
            message: "Error interno al obtener los productos",
        });
    }
}

// creamos el producto

export const createProduct = async(req, res) => {
    try{
        //recibimos el objeto
        const {name, image, category, price} = req.body;
        const [result] = await productModels.agregarNuevoProducto(name, image, category, price);
        console.log(result);

        res.status(200).json({
            message: "producto creado",
            productID: result.insertId
        });
    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        res.status(500).json({
            message: "Error interno al obtener los productos",
        });
    }
}

//Modificamos el porducto

export const modifyProduct = async (req, res) => {
    try{
        const {name, image, price, category, active, id} = req.body;

        const [result] = await productModels.actualizarProducto(name, image, price, category, active, id);

        console.log(result);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se actualizo el producto"
            })
        }
        res.status(200).json({
            message: "Producto actualizado exitosamente"
        });

    }catch(error){
        console.log("Error obteniendo productos: ", error);
        
        res.status(500).json({
            message: "Error interno al modificar productos"
        });

    }
}

// Eliminamos el producto
export const removeProduct = async (req, res) => {
    try{

        const [result] = await productModels.eliminarProducto(req.id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `No existe producto con ID ${req.id}`
            });
        }

        res.status(200).json({
            message: `Producto con ID ${req.id} eliminado`
        });
    }catch(error){
        console.log("Error dando de baja el producto: ", error);
        
        res.status(500).json({
            message: "Error interno al dar de baja el producto"
        });
    }
}

export {
    getAllactiveProducts
}