import { faker } from "@faker-js/faker";

export default function generateProduct() {
    let product = {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnail: faker.image.url(),
        code: faker.commerce.productName() + "-" + faker.commerce.price(),
        stock: faker.string.numeric(),
        departement: faker.commerce.department()
    }
    
    return product;

}