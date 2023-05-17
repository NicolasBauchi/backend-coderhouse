import { Router } from "express";
import __dirname from "../utils.js";
import ProductManager from "../DAO/ProductManager.js";
import ProductManagerMongo from "../DAO/mongo/product.mongo.js"
import messagesManagerMongo from "../DAO/mongo/messages.mongo.js";
import cartManagerMongo from "../DAO/mongo/cart.mongo.js";

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

viewsRouter.get("/chat", async (req, res) => {

    const manager = new messagesManagerMongo();
    const result = await manager.getChat()
        .then(logChat => {

            let info = {
                style: "/static/css/chat.css",
                logChat
            }

            res.render("chat", info)
        });
})

viewsRouter.get("/products", async (req, res) => {
    const manager = new ProductManagerMongo();
    manager.getFiltredPaginate(req.query)
        .then(losProductos => {

            const { docs, hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                totalPages,
                page,
                prevLink,
                nextLink } = losProductos

            let info = {
                style: "/static/css/products.css",
                docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                totalPages,
                page,
                prevLink,
                nextLink
            }

            res.render("products", info)
        });


})

viewsRouter.get(`/carts/:cid`, async (req, res) => {
    const cid = req.params.cid
    if (!cid) {
        return "No puede estar vacío ID del carrito. Vuelve a intentar."
    }
    let manager = new cartManagerMongo()
    manager.getCart(cid).then((carrito) => {

        let { products } = carrito;
        console.log("muestro products:", products);
        let info = {
            style: "/static/css/cart.css",
            products
        }

        res.render("cart", info)
    })

})





export default viewsRouter;
