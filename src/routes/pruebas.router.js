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

    req.logger.fatal('fatal error - ' + new Date().toLocaleTimeString() + ' - ' + new Date().toLocaleDateString())
    req.logger.error('error - ' + new Date().toLocaleTimeString() + ' - ' + new Date().toLocaleDateString())
    req.logger.warning('warning - ' + new Date().toLocaleTimeString() + '-' + new Date().toLocaleDateString())
    req.logger.info('info - ' + new Date().toLocaleTimeString() + ' - ' + new Date().toLocaleDateString())
    req.logger.http('http - ' + new Date().toLocaleTimeString() + ' - ' + new Date().toLocaleDateString())
    req.logger.debug('debug - ' + new Date().toLocaleTimeString() + ' - ' + new Date().toLocaleDateString())

    res.send({ message: "PROBANDO TODOS LOS NIVELES DEL LOGGER !!!" })
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