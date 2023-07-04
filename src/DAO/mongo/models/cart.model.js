//Esquema de cart
import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({

    id:
    {
        type: Number,
        unique: true,
        required: true
    },

    products:
    {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {
                    type: Number,
                    default: 1,
                }
            }
        ],
        required: false,
    }

});


const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;