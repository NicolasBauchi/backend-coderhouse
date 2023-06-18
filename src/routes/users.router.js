import { Router } from "express";
import userController from "../controllers/users.controller.js";
const { getUsers, createUsers, updateUsers, deleteUsers } = new userController();

//Objeto
const userRouter = Router();

//Configurar enrutado:

userRouter.get('/', getUsers);
userRouter.post('/', createUsers)
userRouter.put('/:uid', updateUsers)
userRouter.delete('/:uid', deleteUsers)




//Exportar enrutado:
export default userRouter;

/* Para utilizar esta configuración en app.js
    tengo que importarla en app.js:  const userRouter = require("PATH"),
    luego escribir la linea:
    app.use('/usuarios', userRouter);

    Listo, así ya importo las rutas y config relacionado con USUARIOS.
    Así se modulariza.

 */