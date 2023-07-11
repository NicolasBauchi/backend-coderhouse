import factory from "../DAO/factory.js";

/* lineas originales DAO
import UserDaoMongo from "../DAO/mongo/user.mongo.js";
import cartManagerMongo from "../DAO/mongo/cart.mongo.js";
import messagesManagerMongo from "../DAO/mongo/messages.mongo.js";
import ProductManagerMongo from "../DAO/mongo/product.mongo.js";


const userService = new UserDaoMongo()
const cartService = new cartManagerMongo();
const messageService = new messagesManagerMongo();
const productService = new ProductManagerMongo(); */

let { userDao, productDao, CartDao, messagesDao, ticketsDao } = factory

const userService = userDao;
const cartService = CartDao;
const messageService = messagesDao;
const productService = productDao;
const ticketService = ticketsDao;


const Services = {
    userService,
    cartService,
    messageService,
    productService,
    ticketService
}

export default Services;