import { Schema, model } from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new Schema({

    code: {
        type: String,
        required: true,
        unique: true
    },
    purchase_datetime: {//Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
        type: String,
        required: true
    },
    amount: {//Total de la compra
        type: Number,
        required: true
    },
    purchaser: { // contendrá el correo del usuario asociado al carrito.
        type: String,
        required: true
    },

});

const ticketModel = model(ticketCollection, ticketSchema);

export default ticketModel;