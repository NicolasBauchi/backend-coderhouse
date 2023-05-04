//Esquema de messages

import { Schema, model } from "mongoose";

const messagesCollection = "messages";

const messagesSchema = new Schema({
    _id: Number,
    user: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    }

});

const messagesModel = model(messagesCollection, messagesSchema);

export default messagesModel;