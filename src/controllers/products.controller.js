import Services from "../service/index.js";
const { productService } = Services;

export default class productsController {

    getProducts = async (req, res) => {
        let resultado = productService.getFiltredPaginate(req.query)

        const { docs, hasPrevPage, hasNextPage, prevPage,
            nextPage, totalPages, page, prevLink, nextLink } = resultado
        res.send(
            {
                status: "success",
                payload: docs,
                totalPages,
                prevPage,
                nextPage,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink,
                nextLink
            }
        );
    }

    getProductById = async (req, res) => {
        let idProduct = req.params.pid;
        if (!idProduct) { //si esta vacio
            res.send("Campo vacío.");
        } else {
            const encontrado = await productService.getProductById(idProduct)
            res.send(encontrado);
        }
    }

    createProduct = (req, res) => {
        let prod = req.body;

        if (!prod) {
            res.send("No hay producto que ingresar.")
        } else {
            res.send(productService.addProduct(prod))
        }
    }

    updateProduct = (req, res) => {
        let idProd = req.params.pid;
        //el objeto prod ya viene con el ID.
        let prod = req.params.body;

        if (!prod) {
            res.send(`No hay producto que modificar. ${idProd ? " " : 'Verifica id.'}  ${prod ? null : 'Verifica campos producto.'}`);
        } else {
            productService.updateProduct(prod);
            res.send(`Producto: ${prod.title} modificado correctamente.`);
        }
    }

    deleteProduct = (req, res) => {
        let prodId = req.params.pid;

        if (!prodId) {
            res.send("No hay producto que eliminar. Verifica id.");
        } else {
            productService.deleteProduct(prodId);
            res.send("Eliminado con éxito.");
        }
    }
}




/* // Cargar info en archivo FS:

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
    category: "libreria"
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
    category: "limpieza"
}

const productos_1 = new ProductManager();
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