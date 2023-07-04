export function authAdmin(req, res, next) {

    /* if (!req.session?.user?.role !== 'admin') {
        return res.status(403).send('No tienes los permisos suficientes.')
    } */
    if (!req.session) {
        return res.status(403).send('No tienes los permisos suficientes.')
    }else{
        if (req.session.user.role != 'admin') {
            return res.status(403).send('No tienes los permisos suficientes.')
        }
    }
    

    next()
}