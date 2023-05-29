import passport from "passport";
import GitHubStrategy from 'passport-github2';
import local from "passport-local"
import userModel from "../DAO/models/user.model.js";
import { isValidPassword, createHash } from "../config/bcryptHash.js"

const LocalStrategy = local.Strategy;

export const initPassportLocal = () => {

    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email"
    }, async (req, username, password, done) => {
        const { first_name, last_name } = req.body;
        const usernameBody = req.body.username

        try {
            let userBD = await userModel.findOne({ email: username })
            if (userBD) return done(null, false)

            let newUser = {
                usernameBody,
                first_name,
                last_name,
                email: username,
                password: createHash(password)
            }

            let result = await userModel.create(newUser)
            return done(null, result)

        } catch (error) {
            return done('Error al obtener el usuario' + error)
        }
    }))

    passport.use("login", new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {

        //Chequeo si es USER ESPECIAL CODER
        if (username == "adminCoder@coder.com" && password == "adminCod3r123") {

            const usuarioAdmin = {
                username: "CoderHouse",
                first_name: "Coder",
                last_name: "House",
                email: "adminCoder@coder.com",
                role: "admin"
            }
            return done(null, usuarioAdmin)

        } else {
            //Si no es usuario CODER entonces continuar chequeo LOGIN:
            const userDB = await userModel.findOne({ email: username })

            try {
                if (!userDB) return done(null, false)

                if (!isValidPassword(userDB, password)) return done(null, false)
                return done(null, userDB)

            } catch (error) {
                return done(error)
            }

        }
    }))

    passport.serializeUser((user, done) => {
        if (user.email == "adminCoder@coder.com") {
            done(null, user);
        }
        else {
            done(null, user._id);
        }


    });

    passport.deserializeUser(async (id, done) => {
        if (username == "adminCoder@coder.com") {
            done(null, id);
        }
        else {
            let user = await userModel.findById(id);
            done(null, user);
        }


    })

}




export const initPassportGithub = () => {
    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.768caeff3d022941",
        clientSecret: "b1a41951d67a90f07defa5ec14123b2cb8cd0252",
        callbackURL: "http://localhost:8080/api/session/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {

        try {
            console.log("Informacion Profile",profile);
            let user = await userModel.findOne({ email: profile._json.email })
            /* Si no existe el usuario en BD se lo crea: */
            if (!user) {
                let newUser = {
                    username: profile.username,
                    first_name: profile._json.name.split(" ")[0],
                    last_name: profile._json.name.split(" ")[1],
                    email: profile._json.email,
                    password: " ",
                    role: profile._json.type
                }
                /* !profile._json.email ? "SalioNULL@hotmail.com" : profile._json.email, */

                let result = await userModel.create(newUser);
                done(null, result)
            } else {
                //Usuario existe en BD:
                done(null, user)
            }

        } catch (error) {
            return done(error)
        }

    }));


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id);
        done(null, user);
    })


}
