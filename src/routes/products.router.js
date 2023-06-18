import { Router } from 'express';
import productsController from '../controllers/products.controller.js';
const { getProducts, getProductById, createProduct,
    updateProduct, deleteProduct } = new productsController();
const productsRouter = Router();

//Devolver productos:
productsRouter.get("/", getProducts)

productsRouter.get(`/:pid`, getProductById)

productsRouter.post("/", createProduct)

productsRouter.put("/:pid", updateProduct)

productsRouter.delete("/:pid", deleteProduct)

export default productsRouter;