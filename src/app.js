import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./DAO/ProductManager.js";
import objectConfig from "./config/objectConfig.js";
import userRouter from "./routes/users.router.js";
import messagesManagerMongo from "./DAO/mongo/messages.mongo.js";

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true })) //Linea para que el servidor pueda interpretar mejor los datos complejos
//Que viajen desde la URL y mapearlos correctamente en el req.query.


let PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`servidor arriba en el puerto ${PORT}!`);
})
//Conexión a una BD con mongoose:
objectConfig.connectDB();

//DIRECTORIO STATIC
app.use("/static", express.static(__dirname + '/public'))

// HANDLEBARS ______________________________

//Si se usa import (o sea modules) hay que hacer una configuracion antes.

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
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

// FIN Rutas API LOGICAS----




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


    //acá escucho un evento que se llama message desde el cliente
    socket.on('agregarProducto', data => {
        console.log("Datos recibidos:");
        console.log(data);
        console.log("----------------------");


        let resp = manager.addProduct(data);
        console.log(resp);

        let productos = manager.getProducts();
        io.emit("formProd", productos);
        /* Para pruebas:
        let jsonParsedData = [JSON.parse(data)];
        socket.emit("formProd", jsonParsedData); */
    })

    let productos = manager.getProducts();
    io.emit("formProd", productos);



    //CHAT
    socket.on('envioMessage', data => {

        //Guardo mensaje en BD
        console.log(managerMessages.addMessage(data));



    })

    let elChat = managerMessages.getChat();
    socket.emit("losMensajes", [elChat])

    
   /*  if (elChat) {
        io.emit('losMensajes', [elChat])
    } */

})







