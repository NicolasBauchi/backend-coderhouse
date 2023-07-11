import cartManagerMongo from "./mongo/cart.mongo.js";
import ProductManagerMongo from "./mongo/product.mongo.js";
import UserDaoMongo from "./mongo/user.mongo.js";
import messagesManagerMongo from "./mongo/messages.mongo.js";
import objectConfig from "../config/objectConfig.js";
import CartManager from "./fileSystem/CartManager.js";
import ProductManager from "./fileSystem/ProductManager.js";
import ticketManagerMongo from "./mongo/ticket.mongo.js";

let productDao;
let CartDao;
let userDao;
let messagesDao;
let ticketsDao;

switch (objectConfig.persistence) {

    case "mongo":
        objectConfig.connectDB();

        productDao = new ProductManagerMongo();
        CartDao = new cartManagerMongo();
        userDao = new UserDaoMongo();
        messagesDao = new messagesManagerMongo();
        ticketsDao = new ticketManagerMongo()
        break;

    case "fs":
        productDao = new ProductManager();
        CartDao = new CartManager();

        break;

    default:
        break;
}

const factory = {
    userDao,
    productDao,
    CartDao,
    messagesDao,
    ticketsDao
}

export default factory;