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

//Obtener productos por ID

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

//modificamos producto

export const modifyProduct = async (req, res) => {
    try{
        const {id, name, image, price, category, active} = req.body;

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
        //500 es si fallo la conex con la base de datos
        res.status(500).json({
            message: "Error interno al modificar productos"
        });

    }
}

// Eliminar Producto

export const removeProduct = async (req, res) => {
    try{

        await productModels.eliminarProducto(req.id);

        res.status(200).json({
            message: `Producto con ID ${req.id} eliminado correctamente`
        });
    }catch(error){
        console.log("Error obteniendo productos: ", error);
        //500 es si fallo la conex con la base de datos
        res.status(500).json({
            message: "Error interno al modificar productos"
        });
    }
}

export {
    getAllactiveProducts
}