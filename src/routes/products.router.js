import { Router } from 'express';
import productsController from '../controllers/products.controller.js';
//import { authAdmin } from "../middlewares/authAdmin.middleware.js";
import handlePolicies from '../middlewares/authentication.middleware.js';

const { getProducts, getProductById, createProduct,
    updateProduct, deleteProduct } = new productsController();
const productsRouter = Router();

//Devolver productos:
productsRouter.get("/", getProducts)

productsRouter.get(`/:pid`, getProductById)

//productsRouter.post("/", authAdmin, createProduct)
productsRouter.post("/", handlePolicies("ADMIN"), createProduct)

//productsRouter.put("/:pid", authAdmin, updateProduct)
productsRouter.put("/:pid", handlePolicies("ADMIN"), updateProduct)

//productsRouter.delete("/:pid", authAdmin, deleteProduct)
productsRouter.delete("/:pid", handlePolicies("ADMIN"), deleteProduct)

export default productsRouter;