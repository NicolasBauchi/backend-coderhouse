import UserDaoMongo from "../DAO/mongo/user.mongo.js";
import cartManagerMongo from "../DAO/mongo/cart.mongo.js";
import messagesManagerMongo from "../DAO/mongo/messages.mongo.js";
import ProductManagerMongo from "../DAO/mongo/product.mongo.js";

const userService = new UserDaoMongo()
const cartService = new cartManagerMongo();
const messageService = new messagesManagerMongo();
const productService = new ProductManagerMongo();

const Services = {
    userService,
    cartService,
    messageService,
    productService
}

export default Services;