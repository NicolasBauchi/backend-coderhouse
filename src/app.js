//const express = require('express');
import express from "express";
//const ProductManager = require("../ProductManager");
import ProductManager from "../ProductManager.js";

const app = express();

app.use(express.urlencoded({ extended: true })) //Linea para que el servidor pueda interpretar mejor los datos complejos
//Que viajen desde la URL y mapearlos correctamente en el req.query.

app.get("/saludo", (req, res) => {
    res.send("Hola a todos desde Express!!");
})
let PORT = 8090;
app.listen(PORT, () => {
    console.log(`servidor arriba en el puerto ${PORT}!`);
})

//Devolver productos:
app.get("/products", async (req, res) => {

    let limit = req.query.limit;
    console.log("valor de limit -> " + limit);

    let productos = new ProductManager();

    if (!limit) {
        res.send(await productos.getProducts());
        console.log("entro if line 29 !limit ");

    } else {
        console.log("entro else line 32 limit ");
        let listado = await productos.getProducts();

        if (limit < listado.length) {
            console.log("entro if line 36 limit < listado ");
            res.send(listado.slice(0, limit));
        } else {
            console.log("entro else line 39 limit > listado");
            console.log("Valor de cantidad de productos en lsitado line 40 -> " + listado.length);
            res.send(listado);
        }
    }
})
app.get(`/products/:pid`, async (req, res) => {
    let idProduct = req.params.pid;
    // let listado_productos = new ProductManager().get
    console.log(idProduct);
    if (!idProduct) { //si esta vacio
        res.send("Campo vacío.");
    } else {

        let listado = new ProductManager();
        const encontrado = await listado.getProductById(idProduct);

        res.send(encontrado);
    }

})


// Cargar info:

const prod1 = {
    id: 0,
    title: "gaseosa",
    description: "marca coca cola",
    price: 50,
    thumbnail: "/cocacola",
    code: "123coca",
    stock: 500,
}

const prod2 = {
    id: 0,
    title: "smartphone",
    description: "telefono inteligente sin marca",
    price: 35780,
    thumbnail: "/smartphone",
    code: "456celu",
    stock: 128,
}
const prod_copy = {
    id: 1,
    title: "banana",
    description: "bananas frescas",
    price: 220,
    thumbnail: "/bananas",
    code: "54698platano",
    stock: 18963,
}

const prod3 = {
    id: 0,
    title: "televisor smart",
    description: "televisor inteligente sin marca",
    price: 115236,
    thumbnail: "/televisor",
    code: "9998tv",
    stock: 114,
}
const prod4 = {
    id: 0,
    title: "Zapatillas",
    description: "las mejores del mercado",
    price: 21000,
    thumbnail: "/zapatillas",
    code: "46587zapa",
    stock: 875,
}
const prod5 = {
    id: 0,
    title: "Parlante",
    description: "potencia 567 watts",
    price: 68955,
    thumbnail: "/parlante",
    code: "111parlante",
    stock: 63,
}
const prod6 = {
    id: 0,
    title: "libro",
    description: "harry potter",
    price: 4896,
    thumbnail: "/libroHarry",
    code: "3589l",
    stock: 12,
}
const prod7 = {
    id: 0,
    title: "Vaso",
    description: "vidrio templado",
    price: 379,
    thumbnail: "/vaso",
    code: "98699vaso",
    stock: 866,
}
const prod8 = {
    id: 0,
    title: "Teclado",
    description: "Gamer con luz",
    price: 7800,
    thumbnail: "/teclado",
    code: "11231teclado",
    stock: 49,
}
const prod9 = {
    id: 0,
    title: "Cartuchera",
    description: "lleno de todos los colores",
    price: 3881,
    thumbnail: "/cartuchera",
    code: "cartu999",
    stock: 17,
}
const prod10 = {
    id: 0,
    title: "Cuaderno",
    description: "rayado 300 paginas",
    price: 280,
    thumbnail: "/cuaderno",
    code: "cuaderno6598327",
    stock: 1140,
}
const prod11 = {
    id: 0,
    title: "Tacho",
    description: "Tacho de basura 7 litros",
    price: 15000,
    thumbnail: "/tacho",
    code: "tacho98580",
    stock: 8,
}

const productos_1 = new ProductManager();
productos_1.addProduct(prod1);
productos_1.addProduct(prod2);
productos_1.addProduct(prod3);
productos_1.addProduct(prod4);
productos_1.addProduct(prod5);
productos_1.addProduct(prod6);
productos_1.addProduct(prod7);
productos_1.addProduct(prod8);
productos_1.addProduct(prod9);
productos_1.addProduct(prod10);
productos_1.addProduct(prod11);