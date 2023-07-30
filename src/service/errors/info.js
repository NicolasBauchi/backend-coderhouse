export function generateUserErrorInfo(user) {
    return `One or more properties ware incomplete or not valid.
        listado de requirimientos de propiedades del user: 
        * first_name: needs to a String, received ${user.first_name} 
        * last_name:  needs to a String, received ${user.last_name} 
        * email:      needs to a String, received ${user.email} `
}


export function generatePoductErrorInfo(product) {
    return `One or more properties ware incomplete or not valid.
        listado de requirimientos de propiedades del Product: 
        * title:    needs to a String, received ${product.title} 
        * price:    needs to a String, received ${product.price} 
        * category: needs to a String, received ${product.category} `
}
