//Esquema de product
/* import { Schema, model } from "mongoose"; */
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const productCollection = "products";

const productSchema = new mongoose.Schema({

    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: String,
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    status: { type: Boolean },

})

//Agregando paginate
//PLUGIN
productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;