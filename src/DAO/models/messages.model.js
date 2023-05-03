//Esquema de messages

import { Schema, model } from "mongoose";

const messagesCollection = "messages";

const messagesSchema = new Schema({



});

const messagesModel = model(messagesCollection, messagesSchema);

export default messagesModel;