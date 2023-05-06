import cartModel from "../models/cart.model.js";

class cartManagerMongo {

    async addCart(cart) {
        //Obtener último ID de los carts:
        var ultimoIdCart = "";
        var valorId;

        try {
            ultimoIdCart = await cartModel.findOne().sort('-id').select();
            //Si no hay cart en BD entonces el primer ID = 1.
            if (!ultimoIdCart) {
                valorId = 1;
            } else {
                valorId += 1;
            }
        } catch (error) {
            return new Error(error)
        }


        //Guardar cart a la BD.
        try {
            cart.id = valorId;
            return await cartModel.create(cart)
        } catch (error) {
            return new Error(error)
        }
    }


    async getCart(cid) {
        try {
            return await cartModel.findOne({ id: cid });
        } catch (error) {
            return new Error(error)
        }
    }

    async addProdToCart(cid, pid) {
        /*
    {
        "id": 1,
        "products": [
            {
                "product": 2,
                "quantity": 5
            },
            {
                "product": 7,
                "quantity": 5
            }
        ]
    },
*/

        if (!cid || !pid) {
            return "Cart id o Prod ID no puede ser nulo.";
        }
        let int_pid = parseInt(pid);

        //1_Obtengo productos del cart:
        var info = "";
        var losProductos = "";
        try {
            info = await cartModel.findOne({ id: cid }, { products: 1 })
            if (!info) {
                return "No existe el ID del carro que ingresaste."
            }
            losProductos = info.products;
        } catch (error) {
            return new Error(error)
        }


        //2_Itero productos para sumar existentes o agregar nuevos:
        let IndexEncontrado = losProductos.findIndex(el => el.product == int_pid);

        if (IndexEncontrado > -1) {
            //Si encontró PID le sumo +1 quantity:
            let auxQty = (losProductos[IndexEncontrado].quantity + 1);

            losProductos[IndexEncontrado].quantity = auxQty;

        } else {

            //Si no encontró PID entonces sumo prod entero.
            let nuevoProd = {
                product: int_pid,
                quantity: 1
            };
            losProductos.push(nuevoProd);
        }

        //3_Guardo items
        try {
            return await cartModel.updateOne({ id: cid }, { $set: { "products": losProductos } })
        } catch (error) {
            return new Error(error)
        }
    }

}

export default cartManagerMongo;