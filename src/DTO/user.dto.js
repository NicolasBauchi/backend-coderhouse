
export default class UserDTO {
    /* constructor(usuario) {
        this.username = usuario.username;
        this.first_name = usuario.first_name;
        this.last_name = usuario.last_name;
        this.email = usuario.email;
        this.password = usuario.password;
        this.role = usuario.role;
        this.age = usuario.age;
        this.cart = usuario.cart;
    } */

    getUsuarioCurrent = (user) => {
        const userCurrent = {
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
            cart: user.cartId ? user.cartId : 0
        }
        return userCurrent
    }


}