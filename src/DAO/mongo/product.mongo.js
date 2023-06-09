import productModel from "./models/product.model.js";

export default class ProductManagerMongo {

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
        //falta que cree ID solo automaticamente...

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
    async updateProductByArray(arrayProducts) {

        for (let i = 0; i < arrayProducts.length; i++) {
            const prod = arrayProducts[i]
            try {
                return await productModel.updateOne(prod)
            } catch (error) {
                return new Error(error)
            }
        }

    }

    async deleteProduct(pid) {
        try {
            return await productModel.deleteOne({ _id: pid })
        } catch (error) {
            return new Error(error)
        }
    }

    async getFiltredPaginate(busqueda) {
        //obteniendo parametros de la peticion:
        const { limit = 1, page, sort = 1, query } = busqueda;
        let filtros = {}

        /* Como forma de protección a los valores ingresados se agrega
        que en el parametro Page deba serciorarse de que sea un numero lo que
        se recibe, y no otra cosa: */
        if (page) {
            if (!isNaN(page)) {
                filtros.page = page;
            } else {
                console.log("ESTAS INGRESANDO STRING");
                return 999;
            }

        } else {
            filtros.page = 1;
        }

        if (limit) {
            filtros.limit = limit;
        }

        if (sort) {
            filtros.sort = { price: sort };
        }

        filtros.lean = true;

        try {
            if (!query) {
                //Si no hay query, búsqueda general
                return await productModel.paginate({}, filtros);
            } else {
                return await productModel.paginate(JSON.parse(query), filtros);
            }
        } catch (error) {
            return new Error(error)
        }

    }

}