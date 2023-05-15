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

    async getFiltredPaginate(busqueda) {
        //obteniendo parametros de la peticion:
        const { limit = 1, page = 1, sort = 1, query } = busqueda;


        let filtros = {}

        if (limit) {
            filtros.limit = limit;
        }
        if (page) {
            filtros.page = page;
        } else {
            page = 1;
        }

        if (sort) {
            filtros.sort = { price: sort };
        }
        if (query) {

            console.log(query);
        }
        filtros.lean = true;

        try {
            //let datosBD = "";

            if (!query) {
                //Si no hay query, búsqueda general

                return await productModel.paginate({}, filtros);

                //datosBD = await productModel.paginate({}, filtros);
            } else {
                return await productModel.paginate({ query }, filtros);

                //datosBD = await productModel.paginate({ query }, filtros);
            }




        } catch (error) {
            return new Error(error)
        }


    }

}

export default ProductManagerMongo;