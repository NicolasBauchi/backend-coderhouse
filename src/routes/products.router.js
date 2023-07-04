import { Router } from 'express';
import productsController from '../controllers/products.controller.js';
import { authAdmin } from "../middlewares/authAdmin.middleware.js";


const { getProducts, getProductById, createProduct,
    updateProduct, deleteProduct } = new productsController();
const productsRouter = Router();

//Devolver productos:
productsRouter.get("/", getProducts)

productsRouter.get(`/:pid`, getProductById)

productsRouter.post("/", authAdmin, createProduct)

productsRouter.put("/:pid", authAdmin, updateProduct)

productsRouter.delete("/:pid", authAdmin, deleteProduct)

export default productsRouter;