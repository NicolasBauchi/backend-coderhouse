import Services from "../service/index.js";

const { cartService, productService, ticketService } = Services;

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
        const carritoQuedan = [];
        const carritoContinuan = [];
        let ticketGenerado;
        let montoTotal = 0;
        let seCompro = false;

        //1_Tengo que tener el carrito del usuario
        let idCarro = req.params.cid;

        const carritoUsuario = await cartService.getCart(idCarro);
        let losProductos = carritoUsuario.products;


        //2_corroborar el stock de los productos
        //recorro producto por producto del carrito para ver disponibilidad:
        losProductos.forEach(item => {


            //let productoDB = await productService.getProductById(item.product._id);


            let calculoStock = (item.product.stock - item.quantity)
            // a_ si hay stock del producto proceder con la compra y hacer resta en BD.
            if (calculoStock >= 0) {
                item.product.stock = calculoStock;

                //Agrego los productos que continuan con la compra y los descuento despues.
                carritoContinuan.push(item)
                //-------------
                montoTotal += (item.quantity * item.product.price)
                seCompro = true;
            } else {
                //b_ con los productos que no haya en stock no se puede agregar al proceso de compra
                carritoQuedan.push(item)
            }

        })



        //3_ luego del chequeo usar el tickets service para generar un ticket con los datos de la compra

        if (seCompro) {

            //Descontar del stock de productos
            let auxProd = []
            carritoContinuan.forEach(pr => {
                auxProd.push(pr.product)
            });
            await productService.updateProductByArray(auxProd)

            //Quitar del carrito

            //preparo la info

            let result = losProductos.filter(el => !carritoContinuan.includes(el))
            console.log("carritoContinuan -> 163", carritoContinuan);
            console.log("result -> 164", result);

            if (result.length == 0) {
                console.log("result carts.controler  line 163->", result);
                //Si todos los productos del carrito fueron comprados entonces vacio el carro.
                console.log("idcarro 168", idCarro);
                const vaciadoCarrito = await cartService.deleteAllProductsCart(idCarro)
                console.log("se vacio carrito? -> 170", vaciadoCarrito);
            } else {
                //Sino voy quitando los que si fueron comprados 
                let products = []
                result.forEach(el => {
                    let item =
                    {
                        product: el.product._id,
                        quantity: el.quantity
                    }
                    products.push(item)
                });

                let carrito = {
                    cid: idCarro,
                    data: products
                }
                await cartService.updateCart(carrito)
            }


            //Generar Ticket
            let compra = {};

            let usuarioComprador = req.session.user.email;
            let fecha = new Date().toLocaleString();
            compra.usuarioComprador = usuarioComprador;
            compra.fecha = String(fecha);
            compra.montoTotal = montoTotal;

            ticketGenerado = await ticketService.generateTicket(compra)
        }


        //4_ CONDICIONAL se devuelve el arreglo con los IDs de los productos que no se procesaron
        /*  if (carritoQuedan.length > 0) {
 
             //Dejar en carrito
             //preparo la info
             let products = []
             carritoQuedan.forEach(el => {
                 let item =
                 {
                     product: el.product._id,
                     quantity: el.quantity
                 }
                 products.push(item)
             });
 
             let carrito = {
                 cid: data,
                 data: products
             }
             await cartService.updateCart(carrito)
         } */
        let mensajeTicket = "La compra se realizó con éxito, tu ticket: -> " + JSON.stringify(ticketGenerado)
        res.status(200).send(mensajeTicket)

    }



}