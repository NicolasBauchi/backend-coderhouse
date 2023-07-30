import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./DAO/fileSystem/ProductManager.js";
import userRouter from "./routes/users.router.js";
import messagesManagerMongo from "./DAO/mongo/messages.mongo.js";
import session from "express-session";
import sessionRouter from "./routes/session.router.js";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import passport from "passport";
import { initPassportGithub } from "./config/passport.config.js";
import { initPassportLocal } from "./config/passport.config.js";
import cors from "cors";
import pruebasRuta from "./routes/pruebas.router.js";
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import errorHandler from "./middlewares/errors/index.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

dotenv.config(); //.env
//ejemplo => let url = process.env.MONGO_URL

const app = express();
app.use(express.json())

//Linea para que el servidor pueda interpretar mejor los datos complejos
//Que viajen desde la URL y mapearlos correctamente en el req.query.
app.use(express.urlencoded({ extended: true }))

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 60*60,
    }),
    secret: "qweqweqwe",
    resave: false,
    saveUninitialized: false
}))


let PORT = process.env.PORT;
const httpServer = app.listen(PORT, () => {
    console.log(`servidor arriba en el puerto ${PORT}!`);
})

//USO ERROR HANDLER
app.use(errorHandler)

//Utilización de CORS
app.use(cors())

//DIRECTORIO STATIC
app.use("/static", express.static(__dirname + '/public'))

// HANDLEBARS ______________________________

//Si se usa import (o sea modules) hay que hacer una configuracion antes.

app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname + '\\views'))
app.set('view engine', 'handlebars')

//RUTA DE VISTAS
app.use("/", viewsRouter);
// hbs ______________________________

//Rutas API LOGICAS----
// Products Router ______________________________
app.use('/api/products/', productsRouter);
// FIN Products Router ______________________________

// Carts Router ______________________________
app.use('/api/carts/', cartsRouter);
// FIN Carts Router ______________________________

// Users Router
app.use('/api/users/', userRouter);
// FIN Users Router ______________________________

// Session Router ______________________________
app.use('/api/session/', sessionRouter);
// FIN Session Router ______________________________

//Pruebas Router
app.use('/api/pruebas/', pruebasRuta);
//FIN Pruebas Router

// FIN Rutas API LOGICAS----

//PASSPORT
initPassportLocal();
initPassportGithub();
passport.use(passport.initialize())
passport.use(passport.session())


//Server SOCKET ->
import { Server } from "socket.io";
const io = new Server(httpServer);

//para escuchar el hands shaker
io.on('connection', socket => {
    //respuesta
    console.log("Nuevo cliente conectado -> " + socket.id);
    const manager = new ProductManager();
    //const losMensajesChat = [];
    const managerMessages = new messagesManagerMongo();



    socket.on('agregarProducto', data => {
        console.log("Datos recibidos:");
        console.log(data);
        console.log("----------------------");


        let resp = manager.addProduct(data);
        console.log(resp);

        let productos = manager.getProducts();
        io.emit("formProd", productos);
    })

    //let productos = manager.getProducts();
    //io.emit("formProd", productos);



    //CHAT
    //recibo mensajes desde un cliente:
    socket.on('envioMessage', async message => {
        console.log("el mensaje recibido:");
        console.log(message);
        //Guardo mensaje en BD
        await managerMessages.addMessage(message);

        //Derivo el mensaje recibido hacia todos los clientes:
        io.emit("losMensajes", message);



    })

})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(' ¡ Todo mal ! - Descripción: -> ' + err)
})

