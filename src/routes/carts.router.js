import { Router } from 'express';
import cartController from '../controllers/carts.controller.js';
import { authUser } from '../middlewares/authUser.middleware.js';

const cartsRouter = Router();
const { createCart, addProduct, removeProduct,
    updateProduct, index, getCartByID,
    updateCart, removeProductsInCart, purchase } = new cartController();

cartsRouter.post("/", authUser, createCart)

cartsRouter.post("/:cid/product/:pid", authUser, addProduct)

cartsRouter.delete("/:cid/product/:pid", removeProduct)

cartsRouter.put("/:cid/product/:pid", updateProduct)

cartsRouter.get("/", index)

cartsRouter.get("/:cid", getCartByID)

cartsRouter.put("/:cid", updateCart)

cartsRouter.delete("/:cid", removeProductsInCart)

//purchase
cartsRouter.get("/:cid/purchase", purchase)

export default cartsRouter;