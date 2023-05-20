import { Router } from "express";
import __dirname from "../utils.js";
import ProductManager from "../DAO/ProductManager.js";
import ProductManagerMongo from "../DAO/mongo/product.mongo.js"
import messagesManagerMongo from "../DAO/mongo/messages.mongo.js";
import cartManagerMongo from "../DAO/mongo/cart.mongo.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {

    res.redirect("/login")

    /* //let user = users[Math.floor(Math.random() * users.length)]
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

    }) */

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
    let userLoged = { loged: false }
    if (req.session.user) {
        let { first_name, last_name, role, username } = req.session.user;
        userLoged = { first_name, last_name, loged: true, role, username }
    }

    const manager = new ProductManagerMongo();
    manager.getFiltredPaginate(req.query)
        .then(losProductos => {

            if (losProductos.docs == undefined || losProductos == 999
                || losProductos.docs.length === 0) {
                res.render("products", { errorPage: true })
            } else {
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
                    nextLink,
                    userLoged
                }

                res.render("products", info)
            }


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


//Vista de login
viewsRouter.get("/login", (req, res) => {

    let loged = false
    if (req.session.user) {
        loged = true
    }

    if (!loged) {
        let info = {
            style: "/static/css/login.css",
            loged
        }
        res.render("login", info)


    } else {
        //Si ya había logueado entonces no dería volver aparecer para loguear...
        //redirecciono a /products
        //Redirigir a productos:
        res.redirect("/products")
    }


});

//Vista de registro
viewsRouter.get("/register", (req, res) => {

    let loged = false
    if (req.session.user) {
        loged = true
    }

    let info = {
        style: "/static/css/register.css",
        loged
    }

    res.render("register", info)
});




export default viewsRouter;
