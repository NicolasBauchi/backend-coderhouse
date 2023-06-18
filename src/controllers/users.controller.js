import Services from "../service/index.js"

const { userService } = Services;

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

    createUsers = async (req, res) => {
        try {
            let user = req.body

            if (!user.nombre || !user.apellido) {
                return res.status(400).send({ status: 'error', mensaje: 'todos los campos son necesarios' })
            }

            const newUser = {
                first_name: user.nombre,
                last_name: user.apellido,
                email: user.email
            }

            let result = await userService.create(newUser)


            res.status(200).send({ result })
        } catch (error) {
            console.log(error)
        }

    }

    updateUsers = async (req, res) => {
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

    deleteUsers = async (req, res) => {
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