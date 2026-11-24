import { Router } from "express";
import { validateSale } from "../middlewares/middlewares.js";
import { createSale, getSales } from "../controllers/sale.controllers.js";

const router = Router();

router.get("/", getSales);

router.post("/", validateSale, createSale);

export default router;