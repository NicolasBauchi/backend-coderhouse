//Esquema de user

import { Schema, model } from "mongoose";

const userCollection = "usuarios";

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "user"
    }

})

const userModel = model(userCollection, userSchema) // -> (1-> collection donde se va a guardar, 2-> el modelo/estructura)

export default userModel;