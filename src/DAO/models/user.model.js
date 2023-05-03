//Esquema de user

import { Schema, model } from "mongoose";

const userCollection = "usuarios";

const userSchema = new Schema({

    first_name: String,
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }

})

const userModel = model(userCollection, userSchema) // -> (1-> collection donde se va a guardar, 2-> el modelo/estructura)

export default userModel;