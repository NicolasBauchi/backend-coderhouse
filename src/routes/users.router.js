import { Router } from "express";
import userModel from "../DAO/models/user.model.js";

//Objeto
const userRouter = Router();

//Configurar enrutado:

userRouter.get('/', async (req, res) => {
    //Aca escribo el programa y lo que debe devolver al navegador cliente.
    try {
        let users = await userModel.find();
        console.log(users);
        
    } catch (error) {
        console.log(error);
    }

    res.status(200).send("users");
});



//Exportar enrutado:
export default userRouter;

/* Para utilizar esta configuración en app.js
    tengo que importarla en app.js:  const userRouter = require("PATH"),
    luego escribir la linea:
    app.use('/usuarios', userRouter);

    Listo, así ya importo las rutas y config relacionado con USUARIOS.
    Así se modulariza.

 */