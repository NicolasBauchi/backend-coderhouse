import { Router } from "express";
import __dirname from "../utils.js";
import viewsController from "../controllers/views.controller.js";

const { index, home, realTimeProducts,
    chat, products, cartById, loginView, registerView
} = new viewsController();
const viewsRouter = Router();

viewsRouter.get("/", index)

//Mostrar productos con Http
viewsRouter.get("/home", home)

//Mostrar productos pero con WebSockets
viewsRouter.get("/realtimeproducts", realTimeProducts)

//Vista Chat websocket real time
viewsRouter.get("/chat", chat)

viewsRouter.get("/products", products)

viewsRouter.get(`/carts/:cid`, cartById)

//Vista de login
viewsRouter.get("/login", loginView);

//Vista de registro
viewsRouter.get("/register", registerView);

export default viewsRouter;