import Services from "../service/index.js"

const { productService, messageService, cartService } = Services;

export default class viewsController {

    index = (req, res) => {

        res.redirect("/login")
    }

    home = async (req, res) => {

        let losProductos = await productService.getProducts();

        let renderHome =
        {
            losProductos,
            style: "/static/css/home.css"
        };

        res.render('home', renderHome)
    }

    realTimeProducts = (req, res) => {
        let info = {
            style: "/static/css/realTimeProducts.css",

        }
        res.render('realTimeProducts', info);

    }

    chat = async (req, res) => {

        const result = await messageService.getChat()
            .then(logChat => {

                let info = {
                    style: "/static/css/chat.css",
                    logChat
                }

                res.render("chat", info)
            });
    }

    products = async (req, res) => {
        let userLoged = { loged: false }
        if (req.session.user) {
            let { first_name, last_name, role, username } = req.session.user;
            userLoged = { first_name, last_name, loged: true, role, username }
        }

        /* const manager = new ProductManagerMongo();
        manager.getFiltredPaginate(req.query) */
        productService.getFiltredPaginate(req.query)
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
    }

    cartById = async (req, res) => {
        const cid = req.params.cid
        if (!cid) {
            return "No puede estar vacío ID del carrito. Vuelve a intentar."
        }

        cartService.getCart(cid).then((carrito) => {

            let { products } = carrito;
            console.log("muestro products:", products);
            let info = {
                style: "/static/css/cart.css",
                products
            }

            res.render("cart", info)
        })

    }

    loginView = (req, res) => {
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
    }

    registerView = (req, res) => {

        let loged = false
        if (req.session.user) {
            loged = true
        }

        let info = {
            style: "/static/css/register.css",
            loged
        }
        res.render("register", info)
    }

}