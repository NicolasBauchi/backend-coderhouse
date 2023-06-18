import dotenv from "dotenv";
dotenv.config(); //.env

export default class sessionController {

    logout = async (req, res) => {
        req.session.destroy(err => {
            if (err) return res.send({ status: "error", error: err })

            res.redirect("/login")
            //res.send("Te has deslogueado correctamente.")
        })
    }

    login = async (req, res) => {
        const adminMail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send({ status: "error", error: "Campos incompletos" })
        console.log("ENTRO A /LOGIN", req.body);
        //Permiso especial Coder:
        if (email == adminMail && password == adminPassword) {

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

            //Si no encuentra un usuario registrado en la BD, devolver mensaje.
            if (!req.user) return res.status(401).send({ status: "error", message: "Credenciales inválidas." })

            req.session.user = {
                username: req.user.username,
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                email: req.user.email,
                role: req.user.role
            }
        }

        //Redirigir a productos:
        res.redirect("/products")
    }

    register = async (req, res) => {
        res.send({ status: 'success', message: 'User registered' })
    }

    currentUser = (req, res) => {
        const user = req.session.user;

        if (!user) {
            return res.status(404).send("No hay usuario logueado.")
        } else {

            return res.status(200).send("Tu usuario es: \n" + JSON.stringify(user))
        }


    }

    counterFunction = (req, res) => {
        if (req.session.counter) {
            req.session.counter++
            res.send(`se ha visitado el sitio ${req.session.counter} veces.`)
        } else {
            req.session.counter = 1
            res.send('Bienvenido')
        }
    }

    privateURL = (req, res) => {
        res.send('Todo lo que esta acá solo lo puede ver un admin loagueado')
    }

    failLogin = (req, res) => {
        let info = {
            style: "/static/css/errorPage.css",
            errorMsg: "401 - Unauthorized"
        }
        res.render("errorPage", info)
        /* console.log('Falló la estrategia')
        res.send({ status: 'error', error: 'Falló la autenticación en el servidor.' }) */
    }

    failRegister = (req, res) => {
        
        let info = {
            style: "/static/css/errorPage.css",
            errorMsg: "Falló autenticación"
        }
        res.render("errorPage", info)
       /*  console.log('Falló la estrategia')
        res.send({ status: 'error', error: 'falló autenticación' }) */
    }

    githubCallBack = async (req, res) => {
        //La estrategia devuelve un usuario, cargarlo al objeto de session:
        req.session.user = req.user;
        res.redirect("/");
    }


}