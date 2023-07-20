import * as fs from "fs";
export default class ProductManager {
    constructor(product) {
        this.product = product;
        this.id_prod = 0;
        //this.path = "../path/productos.json";
        this.path = "../../../path/productos.json";
    }

    addProduct(prod) {
        let termino = "Se agregó producto.";
        let repiteCode = 0;

        let campo_title = 0;
        let campo_description = 0;
        let campo_price = 0;
        let campo_code = 0;
        let campo_stock = 0;
        let campo_category = 0;




        if (fs.existsSync(this.path)) {
            //si existe entonces levanto info, proceso y escribo.
            let contenido = fs.readFileSync(this.path, "utf-8");
            const prod_bd = JSON.parse(contenido);

            prod_bd.forEach(el => {

                if (prod.code === el.code) {
                    repiteCode++;
                }
            });

            if (prod.title === "") {
                campo_title++;
                console.log("Completar title");
            }
            if (prod.description === "") {
                campo_description++;
                console.log("Completar description");
            }
            if (prod.price === "") {
                campo_price++;
                console.log("Completar price");
            }
            /* if (prod.thumbnail === "") {
                camposObligatorios++;
                console.log("Completar thumbnail");
            } */
            if (prod.code === "") {
                campo_code++;
                console.log("Completar code");
            }
            if (prod.stock === "") {
                campo_stock++;
                console.log("Completar stock");
            }
            /* if (prod.status === "") {
                camposObligatorios++;
                console.log("Completar status");
            } */
            if (prod.category === "") {
                campo_category++;
                console.log("Completar category");
            }

            if (campo_title == 0 && campo_description == 0
                && campo_price == 0 && campo_code == 0
                && campo_stock == 0 && campo_category == 0
                && repiteCode == 0) {
                let ultimoProd = prod_bd.length - 1;
                let ultimoId = parseInt(prod_bd[ultimoProd].id);
                let auxID = (ultimoId + 1);
                prod.id = auxID;
                prod.status = true;

                prod_bd.push(prod);
                const info = JSON.stringify(prod_bd);

                fs.writeFileSync(this.path, info);
                return termino;
            } else {
                let mensaje = "Line: 85 - No se agregó el producto. Revisar: \n";

                if (campo_title > 0) {
                    console.log("Title");
                    mensaje += "Title \n";
                }
                if (campo_description > 0) {
                    console.log("Description");
                    mensaje += "Description \n";
                }
                if (campo_price > 0) {
                    console.log("Price");
                    mensaje += "Price \n";
                }
                if (campo_code > 0) {
                    console.log("Code");
                    mensaje += "Code \n";
                }
                if (campo_stock > 0) {
                    console.log("Stock");
                    mensaje += "Stock \n";
                }
                if (campo_category > 0) {
                    console.log("Category");
                    mensaje += "Category \n";
                }
                if (repiteCode > 0) {
                    console.log("Repite CODE");
                    mensaje += "Repite CODE \n";
                }

                console.log(mensaje);
                return mensaje;
            }


        } else {
            //si no existe el archivo lo creo.

            if (prod.title === "") {
                camposObligatorios++;
                console.log("Completar title");
            }
            if (prod.description === "") {
                camposObligatorios++;
                console.log("Completar description");
            }
            if (prod.price === "") {
                camposObligatorios++;
                console.log("Completar price");
            }
            /* if (prod.thumbnail === "") {
                camposObligatorios++;
                console.log("Completar thumbnail");
            } */
            if (prod.code === "") {
                camposObligatorios++;
                console.log("Completar code");
            }
            if (prod.stock === "") {
                camposObligatorios++;
                console.log("Completar stock");
            }
            /* if (prod.status === "") {
                camposObligatorios++;
                console.log("Completar status");
            } */
            if (prod.category === "") {
                camposObligatorios++;
                console.log("Completar category");
            }


            if (campo_title == 0 && campo_description == 0
                && campo_price == 0 && campo_code == 0
                && campo_stock == 0 && campo_category == 0) {

                prod.id = 1;

                prod.status = true;

                const info = JSON.stringify([prod]);
                fs.writeFileSync(this.path, info);
                return termino;
            } else {
                let mensaje = "Line: 173 - No se agregó el producto. Revisar: \n";

                if (campo_title > 0) {
                    console.log("Title");
                    mensaje += "Title \n";
                }
                if (campo_description > 0) {
                    console.log("Description");
                    mensaje += "Description \n";
                }
                if (campo_price > 0) {
                    console.log("Price");
                    mensaje += "Price \n";
                }
                if (campo_code > 0) {
                    console.log("Code");
                    mensaje += "Code \n";
                }
                if (campo_stock > 0) {
                    console.log("Stock");
                    mensaje += "Stock \n";
                }
                if (campo_category > 0) {
                    console.log("Category");
                    mensaje += "Category \n";
                }
                console.log(mensaje);
                return mensaje;
            }



        }
    }

    getProducts() {
        let productos_list = fs.readFileSync(this.path, "utf-8");
        let listado = JSON.parse(productos_list);
        return listado;
    }

    getProductById(id) {

        let productos_list = fs.readFileSync(this.path, "utf-8");
        let listado = JSON.parse(productos_list);

        let encontrado = 0;
        let posicion;

        for (let index = 0; index < listado.length; index++) {


            if (id == listado[index].id) {
                encontrado++;
                posicion = index;
            }

        }

        if (encontrado > 0) {
            console.log(" El producto se encontró, es: \n");
            return listado[posicion];

        } else {
            return "Not found.";

        }


    }

    updateProduct(u_producto) {

        let productos_list = fs.readFileSync(this.path, "utf-8");
        let listado = JSON.parse(productos_list);

        let encontrado = 0;
        let posicion;

        for (let index = 0; index < listado.length; index++) {


            if (u_producto.id == listado[index].id) {
                encontrado++;
                posicion = index;
            }

        }

        if (encontrado > 0) {

            listado[posicion] = u_producto;

            let update = JSON.stringify(listado);

            fs.writeFileSync(this.path, update);

            return ` El producto ${listado[posicion].title} se actualizó.\n`;

        } else {
            return "Line: 270 - Not found.";
        }

    }


    deleteProduct(id) {

        let productos_list = fs.readFileSync(this.path, "utf-8");
        let listado = JSON.parse(productos_list);

        listado = listado.filter((item) => item.id != id);

        let update = JSON.stringify(listado);

        fs.writeFileSync(this.path, update);
        return "Line: 286 - Se eliminó."
    }
}