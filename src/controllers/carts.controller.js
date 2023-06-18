import Services from "../service/index.js";

const { cartService } = Services;

export default class cartController {

    index = (req, res) => {
        let mensaje = "solicitud GET sin parametros, no devuelve datos."
        res.send(mensaje);
    }

    createCart = (req, res) => {
        let cart = req.body;
        res.send(cartService.addCart(cart));
    }

    addProduct = (req, res) => {
        let cartId = req.params.cid;
        let prodId = req.params.pid;

        res.send(cartService.addProdToCart(cartId, prodId));
    }

    removeProduct = (req, res) => {
        let cartId = req.params.cid;
        let prodId = req.params.pid;

        res.send(cartService.deleteProdToCart(cartId, prodId));
    }

    updateProduct = (req, res) => {
        if (!req.body) {
            return "No hay cantidad definida. Reintentarlo."
        }

        let data = {}
        data.cid = req.params.cid;
        data.pid = req.params.pid;
        data.cantidad = req.body

        res.send(cartService.updateCantProdToCart(data));
    }

    getCartByID = async (req, res) => {
        let data = req.params.cid;

        res.send(await cartService.getCart(data));

    }

    updateCart = async (req, res) => {
        let carrito = {}
        carrito.cid = req.params.cid;
        carrito.data = req.body;

        res.send(await cartService.updateCart(carrito));
    }

    removeProductsInCart = async (req, res) => {
        let cid = req.params.cid;

        res.send(await cartService.deleteAllProductsCart(cid));

    }

}