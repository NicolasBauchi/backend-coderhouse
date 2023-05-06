import messagesModel from "../models/messages.model.js";

class messagesManagerMongo {

    //obtengo todos los mensajes guardados en la BD (chat completo)
    async getChat() {
        try {
            return await messagesModel.find().lean();
        } catch (error) {
            return new Error(error);
        }


    }

    //Guardo un mensaje en la BD para el chat.
    async addMessage(data) {

        const { user, message } = data;

        /* let user = data.usuario;
        let message = data.mensaje; */

        if (!user || !message) {
            return "CAMPOS VACIOS - from svr line 23. message mongo."
        }

        try {
            //const elMensaje = { user, message };
            return await messagesModel.create(data);
            //return await messagesModel.create(elMensaje);
            /* await messagesModel.create({ user, message }, function (error, doc) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(doc);
                } 
            });*/
        } catch (error) {
            return new Error(error);
        }

    }

}


export default messagesManagerMongo;