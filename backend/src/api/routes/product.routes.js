

import { Router } from "express"; 
import { validateId, validateProduct } from "../middlewares/middlewares.js";
import { createProduct, getAllactiveProducts, getAllProducts, getAllProductsByID, modifyProduct, removeProduct } from "../controllers/product.controllers.js";

const router = Router(); // Hacemos lo mismo que con const app = express();

router.get("/", getAllProducts);


router.get("/active", getAllactiveProducts);


router.get("/:id", validateId, getAllProductsByID);


router.post("/", validateProduct, createProduct);


router.put("/", validateProduct, modifyProduct);


router.delete("/:id", validateId, removeProduct);

export default router;