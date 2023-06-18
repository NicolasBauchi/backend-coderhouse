import { Router } from 'express';
import cartController from '../controllers/carts.controller.js';

const cartsRouter = Router();
const { createCart, addProduct, removeProduct,
    updateProduct, index, getCartByID,
    updateCart, removeProductsInCart } = new cartController();

cartsRouter.post("/", createCart)

cartsRouter.post("/:cid/product/:pid", addProduct)

cartsRouter.delete("/:cid/product/:pid", removeProduct)

cartsRouter.put("/:cid/product/:pid", updateProduct)

cartsRouter.get("/", index)

cartsRouter.get("/:cid", getCartByID)

cartsRouter.put("/:cid", updateCart)

cartsRouter.delete("/:cid", removeProductsInCart)

export default cartsRouter;