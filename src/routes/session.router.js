import { Router } from "express";
import { auth } from "../middlewares/authentication.middleware.js";
import passport from "passport";

const sessionRouter = Router();

//Login con Github ----------

/* Primer link se llama desde el Front */
sessionRouter.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { })

//Segundo link, es un callback que debe coincidir con el seteado en la APP de Github, realiza redirección al home.
sessionRouter.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
    //La estrategia devuelve un usuario, cargarlo al objeto de session:
    req.session.user = req.user;
    res.redirect("/");
})
//Fin login con Github ----------

//Ingresar
sessionRouter.post("/login", passport.authenticate('login', { failureRedirect: '/api/session/faillogin' }), async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Campos incompletos" })
    console.log("ENTRO A /LOGIN", req.body);
    //Permiso especial Coder:
    if (email == "adminCoder@coder.com" && password == "adminCod3r123") {

        req.session.user = {
            username: "CoderHouse",
            first_name: "Coder",
            last_name: "House",
            email: "adminCoder@coder.com",
            role: "admin",
            age: 18
        }

    } else {
        //Busco en la BD si
        // const userBD = await userModel.findOne({ email })

        //Si no encuentra un usuario registrado en la BD, devolver mensaje.
        if (!req.user) return res.status(401).send({ status: "error", message: "Credenciales inválidas." })

        req.session.user = {
            username: req.user.username,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            role: req.user.role
        }




        /* if (!isValidPassword(userBD, password)) return res.status(403).send({ status: "error", error: " Contraseña incorrecta" })
        if (!userBD) return res.status(404).send({ status: "error", message: "No existe usuario en la base de datos." })
        req.session.user = userBD; */

        /* version anterior
            req.session.user = {
            username: userBD.username,
            first_name: userBD.first_name,
            last_name: userBD.last_name,
            email: userBD.email,
            role: userBD.role
        } */
    }

    //Redirigir a productos:
    res.redirect("/products")
});

sessionRouter.get('/faillogin', async (req, res) => {
    console.log('Falló la estrategia')
    res.send({ status: 'error', error: 'falló autenticación' })
})


//Registrarse
sessionRouter.post('/register', passport.authenticate('register', { failureRedirect: '/api/session/failregister' }), async (req, res) => {
    res.send({ status: 'success', message: 'User registered' })
})

sessionRouter.get('/failregister', async (req, res) => {
    console.log('Falló la estrategia')
    res.send({ status: 'error', error: 'falló autenticación' })
})


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


sessionRouter.get('/current', (req, res) => {
    const user = req.session.user;

    if (!user) {
        return res.status(404).send("No hay usuario logueado.")
    } else {

        return res.status(200).send("Tu usuario es: \n" + JSON.stringify(user))
    }


})


export default sessionRouter;


//Register anterior: (SIN authenticate passport local)

/* sessionRouter.post("/register", async (req, res) => {
    try {
        const { username, first_name, last_name, email, password } = req.body
        let role = "user";

        //Validación para que vengan todos los campos completados
        if (!username || !first_name || !last_name || !email || !password) {
            res.status(400).send({ status: 'error', message: "Ningún campo debe estar vacío para el registro." })
        }

        // Chequeo que el mail no esté registrado ya.
        const checkMail = await userModel.findOne({ email })

        if (checkMail) return res.send({ status: 'error', message: 'El email ingreado ya tiene una cuenta vinculada.' })

        const nuevoUsuario = {
            username,
            first_name,
            last_name,
            email,
            password: createHash(password),  /// encriptar
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

}); */