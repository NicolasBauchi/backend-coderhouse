import { Router } from "express";

//Objeto
const router = Router();

//Configurar enrutado:

router.get('/', (req, res) => {
    //Aca escribo el programa y lo que debe devolver al navegador cliente.
    res.status(200).send("Hola");
});


//Exportar enrutado:
module.exports = router;

/* Para utilizar esta configuración en app.js
    tengo que importarla en app.js:  const userRouter = require("PATH"),
    luego escribir la linea:
    app.use('/usuarios', userRouter);

    Listo, así ya importo las rutas y config relacionado con USUARIOS.
    Así se modulariza.

 */