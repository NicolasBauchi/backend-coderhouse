
export function authUser(req, res, next) {

    // Autorizacion
    if (!req.session) {
        return res.status(403).send('Solo usuarios registrados tienen permiso.')
    } else {
        if (req.session.user.role != "User") {
            return res.status(403).send('Solo usuarios registrados tienen permiso.')
        }
    }




    next()
}