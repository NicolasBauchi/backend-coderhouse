import { Router } from "express";
import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config(); //.env

const pruebasRuta = Router()

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.GMAIL_USER_APP,
        pass: process.env.GMAIL_PASS_APP
    }
})

pruebasRuta.get("/mail", async (req, res) => {

    let result = await transport.sendMail({
        from: " Node Mailer <bauchinicolas@gmail.com>",
        to: "bauchinicolas@gmail.com",
        subject: "Correo de prueba con Node Mailer",
        html:
            "<div> <h1>ESTO ES UNA PRUEBA</h1> </div>",
        /* attachments: [] */

    })
    res.send("Correo enviado con éxito.")
})

pruebasRuta.get("/mocks", (req, res) => {

})

export default pruebasRuta;