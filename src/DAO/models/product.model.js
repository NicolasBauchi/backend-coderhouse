//Esquema de product

import { Schema, model } from "mongoose";

const productCollection = "products";

const productSchema = new Schema({

    /* 
        "title": "anteojos",
        "description": "con lentes anti reflex",
        "price": "22050",
        "thumbnail": "/lentesnico",
        "code": "lentes998760",
        "stock": "12",
        "category": "optica",
        "id": 5,
        "status": true
    */

    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: String,
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true }


});

const productModel = model(productCollection, productSchema);

export default productModel;