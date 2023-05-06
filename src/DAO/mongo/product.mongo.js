import productModel from "../models/product.model.js";

class ProductManagerMongo {

    async getProducts() {
        try {
            return await productModel.find();
        } catch (error) {
            return new Error(error)
        }
    }

    async getProductById(pid) {
        try {
            return await productModel.findById(pid);

        } catch (error) {
            return new Error(error)
        }
    }

    async addProduct(newProduct) {

        newProduct.status = true;

        //GUARDAR PROD EN BD:
        try {
            return await productModel.create(newProduct)
        } catch (error) {
            return new Error(error)
        }
    }

    async updateProduct(producto) {
        try {
            return await productModel.updateOne(producto)
        } catch (error) {
            return new Error(error)
        }
    }

    async deleteProduct(pid) {
        try {
            return await productModel.deleteOne({ _id: pid })
        } catch (error) {
            return new Error(error)
        }
    }
}

export default ProductManagerMongo;