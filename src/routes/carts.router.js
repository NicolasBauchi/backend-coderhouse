import { Router } from 'express';
import CartManager from '../DAO/CartManager.js';
import cartManagerMongo from '../DAO/mongo/cart.mongo.js';

const cartsRouter = Router();

//Con File System
//const elManager = new CartManager();

//Con Mongo
const elManager = new cartManagerMongo();

cartsRouter.post("/", (req, res) => {
    let cart = req.body;
    res.send(elManager.addCart(cart));
})

cartsRouter.post("/:cid/product/:pid", (req, res) => {
    let cartId = req.params.cid;
    let prodId = req.params.pid;

    res.send(elManager.addProdToCart(cartId, prodId));
})

cartsRouter.delete("/:cid/product/:pid", (req, res) => {
    let cartId = req.params.cid;
    let prodId = req.params.pid;

    res.send(elManager.deleteProdToCart(cartId, prodId));
})

cartsRouter.put("/:cid/product/:pid", (req, res) => {
    if (!req.body) {
        return "No hay cantidad definida. Reintentarlo."
    }

    let data = {}
    data.cid = req.params.cid;
    data.pid = req.params.pid;
    data.cantidad = req.body


    res.send(elManager.updateCantProdToCart(data));
})


cartsRouter.get("/", (req, res) => {
    let mensaje = "solicitud GET sin parametros, no devuelve datos."
    res.send(mensaje);
})

cartsRouter.get("/:cid", async (req, res) => {
    let data = req.params.cid;

    res.send(await elManager.getCart(data));

})

cartsRouter.put("/:cid", async (req, res) => {
    let carrito = {}
    carrito.cid = req.params.cid;
    carrito.data = req.body;

    res.send(await elManager.updateCart(carrito));
})

cartsRouter.delete("/:cid", async (req, res) => {
    let cid = req.params.cid;

    res.send(await elManager.deleteAllProductsCart(cid));

})

export default cartsRouter;