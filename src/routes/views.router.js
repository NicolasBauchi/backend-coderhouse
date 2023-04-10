import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    let user = users[Math.floor(Math.random() * users.length)]

    let testUser = {
        title: "",
        user,
        isAdmin: user.role == 'admin',
        food,
        style: "index.css",

    }


    /* app.get('/vista', (req, res) => {
        let testUser = {
            name: 'Nico',
            last_name: 'Bauchi',
            title: 'Ecommerce',
        }
    
        res.render('index', testUser)
    }) */
})

export default router;
