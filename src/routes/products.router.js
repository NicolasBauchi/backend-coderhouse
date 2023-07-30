import { Router } from 'express';
import productsController from '../controllers/products.controller.js';
import handlePolicies from '../middlewares/authentication.middleware.js';

const { mockingproducts, getProducts, getProductById, createProduct,
    updateProduct, deleteProduct } = new productsController();
const productsRouter = Router();

productsRouter.get("/mockingproducts", mockingproducts)

//Devolver productos:
productsRouter.get("/", getProducts)

//Devolver producto según ID:
productsRouter.get(`/:pid`, getProductById)

//Crear producto
productsRouter.post("/", handlePolicies("ADMIN"), createProduct)

//Modificar producto
productsRouter.put("/:pid", handlePolicies("ADMIN"), updateProduct)

//Eliminar producto
productsRouter.delete("/:pid", handlePolicies("ADMIN"), deleteProduct)



export default productsRouter;