class ProductManager {
    constructor(products, path) {
        this.products = products;
        this.id_prod = 0;
        this.path = path;
    }


    addProduct(prod) {
        let camposObligatorios = 0;
        let repiteCode = 0;

        this.products.forEach(el => {

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

            this.products.push(prod);
        } else {
            console.log("No se agregó el producto.");
        }



    }

    getProducts() {
        return console.log(this.products);
    }

    getProductById(id) {

        let encontrado = 0;
        let guardoProd;
        this.products.forEach(el => {

            if (el.id == id) {
                encontrado++;
                guardoProd = el.id;
            }
        });

        if (encontrado > 0) {
            console.log(" El producto se encontró, es: \n");
            console.log(this.products[guardoProd]);
        } else {
            console.log("Not found.");
        }

    }
}
//id,title,description,price,thumbnail,code,stock
const prod1 = {
    id: "0",
    title: "gaseosa",
    description: "marca coca cola",
    price: 50,
    thumbnail: "/cocacola",
    code: "123coca",
    stock: 500,
}

const prod2 = {
    id: "",
    title: "smartphone",
    description: "telefono inteligente sin marca",
    price: 35780,
    thumbnail: "/smartphone",
    code: "456celu",
    stock: 128,
}

let arrayProd = [prod1];

const productos_1 = new ProductManager(arrayProd);

console.log("agrego prod2:  -> producto diferente:");
productos_1.addProduct(prod2);  // producto diferente
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