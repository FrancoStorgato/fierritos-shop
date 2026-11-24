import { Router } from "express";
import { vistaConsultar, vistaCrear, vistaEliminar, vistaPrincipal, vistaModificar, vistaCrearUser } from "../controllers/views.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";

const router = Router();

router.get("/principal", requireLogin, vistaPrincipal);

router.get("/consultar", requireLogin, vistaConsultar);

router.get("/crear", requireLogin, vistaCrear)

router.get("/crearUser", requireLogin, vistaCrearUser);

router.get("/modificar", requireLogin, vistaModificar)

router.get("/eliminar", requireLogin, vistaEliminar);

export default router;