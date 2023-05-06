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