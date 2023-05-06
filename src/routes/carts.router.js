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

cartsRouter.get("/:cid", async (req, res) => {
    let data = req.params.cid;

    res.send(await elManager.getCart(data));

})
cartsRouter.get("/", (req, res) => {
    let mensaje = "solicitud GET sin parametros, no devuelve datos."
    res.send(mensaje);
})


export default cartsRouter;