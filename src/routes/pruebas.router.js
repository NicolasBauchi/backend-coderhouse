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

//logger
pruebasRuta.get("/testLogger", (req, res) => {
    req.logger.error('alerta')
    req.logger.info('info')
    req.logger.warning('warning')
    req.logger.warning('warning')
    req.logger.error('error')
    req.logger.fatal('fatal error')

    res.send({ message: "PRUEBA DEL LOGGER !!!" })
})

pruebasRuta.get('/simple', (req, res) => {
    let suma = 0
    for (let i = 0; i < 1000000; i++) {
        suma += i
    }
    res.send({ suma })
})

pruebasRuta.get('/compleja', (req, res) => {
    let suma = 0
    for (let i = 0; i < 5e8; i++) {
        suma += i
    }
    res.send({ suma })
})





export default pruebasRuta;