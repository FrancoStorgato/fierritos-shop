//Espacio de nodeJS

import express from "express";
import cors from "cors";
import session from "express-session";
import environments from "./src/api/config/environments.js";
import {loggerUrl} from "./src/api/middlewares/middlewares.js";
import { __dirname, join } from "./src/api/utils/index.js";
import { productRoutes, authRoutes, viewRoutes, userRoutes, saleRoutes } from "./src/api/routes/index.js";

const app = express();
const {port, session_key} = environments;


//Seleccionamos EJS como motor de plantillas
app.set("view engine", "ejs");

//le decimos donde estan las views
app.set("views", join(__dirname, "src/views"));

app.use(express.static(join(__dirname, "src/public")));
app.use(express.static(join(__dirname, "src/public")));
app.use("/tienda", express.static(join(__dirname, "../frontend")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerUrl);
app.use(session({
    secret: session_key,
    resave: false,
    saveUninitialized: true
}));

app.use(cors());

app.use("/api/products" , productRoutes);
app.use("/auth", authRoutes);
app.use("/dashboard", viewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sales", saleRoutes)

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});