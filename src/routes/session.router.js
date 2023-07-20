import { Router } from "express";
//import { auth } from "../middlewares/authentication.middleware.js";
import passport from "passport";
import sessionController from "../controllers/session.controller.js"
import handlePolicies from "../middlewares/authentication.middleware.js";

const { login, register, logout,
    currentUser, counterFunction, privateURL,
    failRegister, githubCallBack, failLogin } = new sessionController();

const sessionRouter = Router();

//Login con Github ----------

/* Primer link se llama desde el Front */
sessionRouter.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { })

//Segundo link, es un callback que debe coincidir con el seteado en la APP de Github, realiza redirección al home.
sessionRouter.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), githubCallBack)
//Fin login con Github ----------

//Ingresar
sessionRouter.post("/login", passport.authenticate('login', { failureRedirect: '/api/session/faillogin' }), login);

sessionRouter.get('/faillogin', failLogin)


//Registrarse
sessionRouter.post('/register', passport.authenticate('register', { failureRedirect: '/api/session/failregister' }), register)

sessionRouter.get('/failregister', failRegister)


//Desloguearse
sessionRouter.get("/logout", logout);

//Ruta privada acceso admin
sessionRouter.get("/privado", handlePolicies("ADMIN"), privateURL);

//Función con session
sessionRouter.get('/counter', counterFunction)

//Para ver el usuario que estoy utilizando en este momento.
sessionRouter.get('/current', currentUser)


export default sessionRouter;