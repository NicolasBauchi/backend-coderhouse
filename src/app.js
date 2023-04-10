import express from "express";
import bodyParser from "body-parser";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";


const app = express();
//app.use(express.json())
//app.use(express.urlencoded({ extended: true })) //Linea para que el servidor pueda interpretar mejor los datos complejos
//Que viajen desde la URL y mapearlos correctamente en el req.query.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let PORT = 8080;
app.listen(PORT, () => {
    console.log(`servidor arriba en el puerto ${PORT}!`);
})

// hbs ______________________________
/* import handlebars from "express-handlebars";

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars') */

// hbs ______________________________

// Products Router ______________________________
app.use('/api/products/', productsRouter);
// Products Router ______________________________

// Carts Router ______________________________
app.use('/api/carts/', cartsRouter);
// Carts Router ______________________________



