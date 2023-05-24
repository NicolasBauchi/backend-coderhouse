import { Router } from "express";
import userModel from "../DAO/models/user.model.js";
import { auth } from "../middlewares/authentication.middleware.js";


const sessionRouter = Router();


//Ingresar
sessionRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (email == "adminCoder@coder.com" && password == "adminCod3r123") {

        req.session.user = {
            username: "CoderHouse",
            first_name: "Coder",
            last_name: "House",
            email: "adminCoder@coder.com",
            role: "admin"
        }

    } else {
        //Busco en la BD si
        const datosBD = await userModel.findOne({ email, password })

        //Si no encuentra un usuario registrado en la BD, devolver mensaje.
        if (!datosBD) {
            return res.status(404).send({ status: "error", message: "No existe usuario en la base de datos." })
        }

        req.session.user = {
            username: datosBD.username,
            first_name: datosBD.first_name,
            last_name: datosBD.last_name,
            email: datosBD.email,
            role: datosBD.role
        }
    }
    console.log(req.session.user);
    //Redirigir a productos:
    res.redirect("/products")

    /* res.send({
        status: "succes",
        message: "login succes",
        session: req.session.user
    }) */


});


//Registrarse
sessionRouter.post("/register", async (req, res) => {
    try {
        const { username, first_name, last_name, email, password } = req.body
        let role = "user";

        //Validación para que vengan todos los campos completados
        if (!username || !first_name || !last_name || !email || !password) {
            res.send({ status: 'error', message: "Ningún campo debe estar vacío para el registro." })
        }

        // Chequeo que el mail no esté registrado ya.
        const checkMail = await userModel.findOne({ email })

        if (checkMail) return res.send({ status: 'error', message: 'El email ingreado ya tiene una cuenta vinculada.' })

        const nuevoUsuario = {
            username,
            first_name,
            last_name,
            email,
            password,  /// encriptar
            role
        }
        let resultUser = await userModel.create(nuevoUsuario)


        res.status(200).send({
            status: "success",
            message: "Usuario creado correctamente",
            resultUser
        })



    } catch (error) {
        res.status(500).send({
            status: "Error",
            error: new Error(error)
        })
    }

});


//Desloguearse
sessionRouter.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send({ status: "error", error: err })

        res.redirect("/login")
        //res.send("Te has deslogueado correctamente.")
    })
});


//Ruta privada cceso admin
sessionRouter.get("/privado", auth, (req, res) => {

    res.send('Todo lo que esta acá solo lo puede ver un admin loagueado')
});

//Función con session
sessionRouter.get('/counter', (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.send(`se ha visitado el sitio ${req.session.counter} veces.`)
    } else {
        req.session.counter = 1
        res.send('Bienvenido')
    }
})



export default sessionRouter;