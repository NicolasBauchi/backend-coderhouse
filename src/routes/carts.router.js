import { Router } from 'express';
import CartManager from '../DAO/CartManager.js';

const cartsRouter = Router();


cartsRouter.post("/", (req, res) => {
    let cart = req.body;
    let manager = new CartManager();

    res.send(manager.addCart(cart));
})
cartsRouter.post("/:cid/product/:pid", (req, res) => {
    let cartId = req.params.cid;
    let prodId = req.params.pid;

    let manager = new CartManager();

    res.send(manager.addProdToCart(cartId, prodId));
})

cartsRouter.get("/:cid", async (req, res) => {
    let data = req.params.cid;
    let manager = new CartManager();
    res.send(await manager.getCart(data));

})
cartsRouter.get("/", (req, res) => {
    let mensaje = "solicitud GET sin parametros, no devuelve datos."
    res.send(mensaje);

})


export default cartsRouter;