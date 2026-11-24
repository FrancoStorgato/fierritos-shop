import { Router } from "express";
import { mostrarLogin, login, logout } from "../controllers/auth.controllers.js";

const router = Router();

router.get("/login", mostrarLogin);

router.post("/login", login);

router.get("/logout", logout);

export default router;