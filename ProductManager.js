
import * as fs from "fs";
export default class ProductManager {
    constructor(products) {
        this.products = products;
        this.id_prod = 0;
        this.path = "../path/actividad.json";
    }

    addProduct(prod) {
        let camposObligatorios = 0;
        let repiteCode = 0;



        if (fs.existsSync(this.path)) {
            //si exsite entonces levanto info, proceso y escribo.


            let contenido = fs.readFileSync(this.path, "utf-8");
            const prod_bd = JSON.parse(contenido);

            prod_bd.forEach(el => {

                if (prod.code === el.code) {
                    repiteCode++;
                }
            });

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
            if (prod.thumbnail === "") {
                camposObligatorios++;
                console.log("Completar thumbnail");
            }
            if (prod.code === "") {
                camposObligatorios++;
                console.log("Completar code");
            }
            if (prod.stock === "") {
                camposObligatorios++;
                console.log("Completar stock");
            }

            if (camposObligatorios == 0 && repiteCode == 0) {
                this.id_prod++;
                prod.id = this.id_prod;

                prod_bd.push(prod);

                const info = JSON.stringify(prod_bd);

                fs.writeFileSync(this.path, info);

            } else {
                console.log("No se agregó el producto.");
            }


        } else {
            //si no existe info la creo.

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
            if (prod.thumbnail === "") {
                camposObligatorios++;
                console.log("Completar thumbnail");
            }
            if (prod.code === "") {
                camposObligatorios++;
                console.log("Completar code");
            }
            if (prod.stock === "") {
                camposObligatorios++;
                console.log("Completar stock");
            }


            if (camposObligatorios == 0) {
                this.id_prod++;
                prod.id = this.id_prod;
                const info = JSON.stringify([prod]);

                fs.writeFileSync(this.path, info);

            } else {
                console.log("No se agregó el producto.");
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
            return "Not found.";
        }

    }


    deleteProduct(id) {

        let productos_list = fs.readFileSync(this.path, "utf-8");
        let listado = JSON.parse(productos_list);

        listado = listado.filter((item) => item.id != id);

        let update = JSON.stringify(listado);

        fs.writeFileSync(this.path, update);

    }
}



//id,title,description,price,thumbnail,code,stock
const prod1 = {
    id: 0,
    title: "gaseosa",
    description: "marca coca cola",
    price: 50,
    thumbnail: "/cocacola",
    code: "123coca",
    stock: 500,
}

const prod2 = {
    id: 0,
    title: "smartphone",
    description: "telefono inteligente sin marca",
    price: 35780,
    thumbnail: "/smartphone",
    code: "456celu",
    stock: 128,
}
const prod_copy = {
    id: 1,
    title: "banana",
    description: "bananas frescas",
    price: 220,
    thumbnail: "/bananas",
    code: "54698platano",
    stock: 18963,
}

const prod3 = {
    id: 0,
    title: "televisor smart",
    description: "televisor inteligente sin marca",
    price: 115236,
    thumbnail: "/televisor",
    code: "9998tv",
    stock: 114,
}
const prod4 = {
    id: 0,
    title: "Zapatillas",
    description: "las mejores del mercado",
    price: 21000,
    thumbnail: "/zapatillas",
    code: "46587zapa",
    stock: 875,
}
const prod5 = {
    id: 0,
    title: "Parlante",
    description: "potencia 567 watts",
    price: 68955,
    thumbnail: "/parlante",
    code: "111parlante",
    stock: 63,
}
const prod6 = {
    id: 0,
    title: "libro",
    description: "harry potter",
    price: 4896,
    thumbnail: "/libroHarry",
    code: "3589l",
    stock: 12,
}
const prod7 = {
    id: 0,
    title: "Vaso",
    description: "vidrio templado",
    price: 379,
    thumbnail: "/vaso",
    code: "98699vaso",
    stock: 866,
}
const prod8 = {
    id: 0,
    title: "Teclado",
    description: "Gamer con luz",
    price: 7800,
    thumbnail: "/teclado",
    code: "11231teclado",
    stock: 49,
}
const prod9 = {
    id: 0,
    title: "Cartuchera",
    description: "lleno de todos los colores",
    price: 3881,
    thumbnail: "/cartuchera",
    code: "cartu999",
    stock: 17,
}
const prod10 = {
    id: 0,
    title: "Cuaderno",
    description: "rayado 300 paginas",
    price: 280,
    thumbnail: "/cuaderno",
    code: "cuaderno6598327",
    stock: 1140,
}
const prod11 = {
    id: 0,
    title: "Tacho",
    description: "Tacho de basura 7 litros",
    price: 15000,
    thumbnail: "/tacho",
    code: "tacho98580",
    stock: 8,
}

/* let arrayProd = [prod1];

const productos_1 = new ProductManager(arrayProd);

console.log("agrego prod2:  -> producto diferente:");
productos_1.addProduct(prod2);  // producto diferente
productos_1.addProduct(prod3); // producto diferente
console.log("------------------------");

console.log("agrego prod1:  -> producto igual:");
productos_1.addProduct(prod1);  //producto igual
console.log("------------------------");


console.log("Busco producto por ID: 1");
productos_1.getProductById(1);
console.log("------------------------");

console.log("muestro todos los productos con getProducts:");
productos_1.getProducts();
console.log("------------------------");


console.log("update un producto");
productos_1.updateProduct(prod_copy);
console.log("Luego del update muestro nuevamente los productos:");
productos_1.getProducts();

console.log("------------------------"); */


/* console.log("DELETE un producto");
productos_1.deleteProduct(1);
console.log("Luego del DELETE muestro nuevamente los productos:");
productos_1.getProducts(); */
/* 
console.log("------------------------"); */
/* const productos_1 = new ProductManager(arrayProd);
productos_1.addProduct(prod1);
productos_1.addProduct(prod2);
productos_1.addProduct(prod3);
productos_1.addProduct(prod4);
productos_1.addProduct(prod5);
productos_1.addProduct(prod6);
productos_1.addProduct(prod7);
productos_1.addProduct(prod8);
productos_1.addProduct(prod9);
productos_1.addProduct(prod10);
productos_1.addProduct(prod11); */

