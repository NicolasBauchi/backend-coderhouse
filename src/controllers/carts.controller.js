import Services from "../service/index.js";

const { cartService } = Services;

export default class cartController {

    index = (req, res) => {
        let mensaje = "solicitud GET sin parametros, no devuelve datos."
        res.send(mensaje);
    }

    createCart = async (req, res) => {
        const cart = req.body;
        let crearCart = {}

        if (!cart) {
            //Si no hay cart entonces creo uno vacio
            crearCart = {

                products: [
                    {}
                ]
            };

        } else {
            //Si existe creo normal

            //Acomodo como el objeto cart porque estoy recibiendo el producto completo desde el front.
            crearCart = {

                products: [
                    {
                        product: cart.id,
                        quantity: 1
                    }
                ]
            };



        }
        const idCartCampo = await cartService.addCart(crearCart)


        //buscar el ID mongo con el id de campo:
        const nroIdCart = await cartService.getCartByIdCampo(idCartCampo)
        let aux = String(nroIdCart._id)

        //cargar id de mongo
        req.session.user.cartId = aux;

        res.redirect("/products")
        //res.send(cartService.addCart(crearCart))
    }

    addProduct = (req, res) => {
        let cartId = req.session.user.cart;
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

    purchase = async (req, res) => {

        //1_Tengo que tener el carrito del usuario


        //2_corroborar el stock de los productos

        // a_ si ha stock del producto proceder con la compra
        //b_ con los productos que no haya en stock no se puede agregar al proceso de compra

        //3_ luego del chequeo usar el tickets service para generar un ticket con los datos de la compra
        // si se cancela la compra se devuelve el arreglo con los IDs de los productos que no se procesaron

    }

}