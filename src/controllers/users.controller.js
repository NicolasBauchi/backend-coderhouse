import Services from "../service/index.js"

const { userService, cartService } = Services;

export default class userController {

    getUsers = async (req, res) => {
        try {
            // mongoose - paginate 
            const { page = 1 } = req.query
            let users = await userService.get();
            const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages } = users

            res.status(200).send({
                status: 'success',
                users: docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage
            });

        } catch (error) {
            console.log(error)
        }
    }

    createUser = async (req, res) => {
        try {
            let user = req.body

            if (!user.nombre || !user.apellido) {
                return res.status(400).send({ status: 'error', mensaje: 'todos los campos son necesarios' })
            }

            let crearCart = {}
            //aca creo un carrito y me devuelve su _id mongo
            const carrito = await cartService.addCart(crearCart);

            const newUser = {
                first_name: user.nombre,
                last_name: user.apellido,
                email: user.email,
                cart: carrito
            }

            let result = await userService.create(newUser)


            res.status(200).send({ result })
        } catch (error) {
            console.log(error)
        }

    }

    updateUser = async (req, res) => {
        const { uid } = req.params
        const user = req.body

        if (!user.nombre || !user.apellido) {
            return res.status(400).send({ status: 'error', mensaje: 'todos los campos son necesarios' })
        }

        let userToReplace = {
            first_name: user.nombre,
            last_name: user.apellido,
            email: user.email
        }

        let result = await userModel.updateOne({ _id: uid }, userToReplace)


        res.send({
            status: 'success',
            payload: result
        })
    }

    deleteUser = async (req, res) => {
        try {
            let { uid } = req.params
            // buscar por pid user

            let result = await userModel.deleteOne({ _id: uid })
            res.send({ status: 'success', payload: result })

        } catch (error) {
            console.log(error)
        }
    }

}