//Esquema de cart
import { Schema, model } from "mongoose";

const cartCollection = "carts";

const cartSchema = new Schema({

    id:
    {
        type: Number,
        unique: true,
        required: true
    },

    products:
    {
        type: Array,
        required: true,
    }

});


const cartModel = model(cartCollection, cartSchema);

export default cartModel;