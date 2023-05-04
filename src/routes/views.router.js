import { Router } from "express";
import __dirname from "../utils.js";
import ProductManager from "../DAO/ProductManager.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
    //let user = users[Math.floor(Math.random() * users.length)]
    let food = [
        { name: "Hamburguesa", price: 3589 },
        { name: "Banana", price: 123 },
        { name: "Soda", price: 237 },
        { name: "Pizza", price: 2100 },
    ]
    let user = {
        name: 'Nico',
        last_name: 'Bauchi',
        role: "admin"
    }

    res.render('index', {
        title: 'Ecommerce',
        user,
        isAdmin: user.role == 'admin',
        food,
        style: "/static/css/index.css",

    })

})

//Mostrar productos con Http
viewsRouter.get("/home", async (req, res) => {
    let pManager = new ProductManager();

    let losProductos = await pManager.getProducts();
    let renderHome =
    {
        losProductos,
        style: "/static/css/home.css"
    };


    res.render('home', renderHome)
})

//Mostrar productos pero con WebSockets
viewsRouter.get("/realtimeproducts", (req, res) => {
    let info = {
        style: "/static/css/realTimeProducts.css",

    }
    res.render('realTimeProducts', info);

})

viewsRouter.get("/chat", (req, res) => {

    let info = {
        style: "/static/css/chat.css",
    }

    res.render("chat", info);

})





export default viewsRouter;
