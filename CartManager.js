import * as fs from "fs";
export default class CartManager {
    /* Cart trae:
    id,
    products = [
        {
            product: "id",
            quantity: "valor int ",
        }
    ],

    */

    constructor(products) {
        this.idCart = 0;
        this.products = products;
        this.path = "../path/carrito.json";
    }



    addCart(cart) {

        let repiteId = 0;
        let cantidadProducto = 0;
        //let infoCart = JSON.parse(cart);
        //Verificar que tenga productos -  if (cart.products.length > 0) {  --  if (infoCart.length > 0) {
        if (cart.products.length > 0) {

            //Verificar que los productos no tengan cantidad 0

            //Recorro productos del carrito
            cart.products.forEach(producto => {
                if (producto.quantity == 0) {
                    cantidadProducto++;
                }
            });

            //Compruebo que no estén vacías 
            //las cantidades de los productos
            if (cantidadProducto == 0) {
                //Si es = 0 entonces no están vacíos.
                //Ahora procedo a agregar el carrito a la BD:

                //ACA TENGO QUE VERIFICAR SI EXISTE EL ARCHIVO CART.
                if (fs.existsSync(this.path)) {
                    //AGREGAR INFO AL ARCHIVO EXISTENTE
                    let contenido = fs.readFileSync(this.path, "utf-8");
                    const cart_bd = JSON.parse(contenido);

                    cart_bd.forEach(el => {

                        if (cart.id == el.id) {
                            repiteId++;
                        }
                    });


                    if (repiteId == 0) {
                        let ultimoCart = cart_bd.length - 1;
                        let ultimoId = parseInt(cart_bd[ultimoCart].id);
                        let auxID = (ultimoId + 1);

                        cart.id = auxID;

                        cart_bd.push(cart);

                        const info = JSON.stringify(cart_bd);

                        fs.writeFileSync(this.path, info);

                    } else {
                        let mensaje = "No se agregó el CART. Se repite ID.";
                        console.log(mensaje);
                        return mensaje;
                    }

                } else {
                    //SINO CREAR ARCHIVO Y AGREGAR INFO

                    cart.id = 1;
                    const info = JSON.stringify([cart]);

                    fs.writeFileSync(this.path, info);

                }
                let mensaje = "Carrito agregado con éxito.";
                console.log(mensaje);
                return mensaje;

                //_____________________________________________
            } else {
                let mensaje = "Los productos del carrito no pueden tener cantidad 0.";
                console.log(mensaje);
                return mensaje;
            }

        } else {
            let mensaje = "El carrito no tiene productos, no se ingresó a la BD.";
            console.log(mensaje);
            return mensaje;
        }

    }

    getCart(id) {


        if (fs.existsSync(this.path)) {
            //Si está creado el archivo, buscar ID de carrito:
            let contenido = fs.readFileSync(this.path, "utf-8");
            const carritos = JSON.parse(contenido);

            const encontrado = carritos.find(carrito => carrito.id == id);

            if (!encontrado) {
                //Si no encontró avisar:
                return "No se encontró el carrito que solicitó.";
            } else {
                //Si lo encontró devolver productos de carrito:
                //return encontrado.products;
                return encontrado;
            }


        } else {
            //Si no existe el archivo carts.json avisar.
            let mensaje = "No hay carritos";
            console.log(mensaje);
            return mensaje;
        }
    }

    addProdToCart(cid, pid) {
        let mensaje;
        let int_pid = parseInt(pid);
        if (!cid || !pid) {
            return mensaje = "Cart id o Prod ID no puede ser nulo.";
        }

        //Obtener cart por Nro id, luego agregar producto con
        //quantity += 1;

        const carrito = this.getCart(cid);
        //Si el producto ya está agregado se suma quantity
        //Si es nuevo se suma producto entero.

        if (!carrito) {
            return "No se encontró el carrito indicado en la BD.";
        }

        let IndexEncontrado = carrito.products.findIndex(el => el.product == int_pid);

        if (IndexEncontrado > -1) {
            //Si encontró PID le sumo +1 quantity:
            let auxQty = (carrito.products[IndexEncontrado].quantity + 1);

            carrito.products[IndexEncontrado].quantity = auxQty;

        } else {
            
            //Si no encontró PID entonces sumo prod entero.
            let nuevoProd = {
                product: int_pid,
                quantity: 1
            };
            carrito.products.push(nuevoProd);
        }

        //Seccion de guardado en la BD: ---------------

        //Levanto los carritos de BD:
        let contenido = fs.readFileSync(this.path, "utf-8");
        const losCarritos = JSON.parse(contenido);

        //Busco indice del carro a modificar:
        let indexCarrito = losCarritos.findIndex(cart => cart.id == cid);

        //Actualizo sus datos:
        losCarritos[indexCarrito] = carrito;

        //Guardo la info:
        const info = JSON.stringify(losCarritos);
        fs.writeFileSync(this.path, info);


    }



}