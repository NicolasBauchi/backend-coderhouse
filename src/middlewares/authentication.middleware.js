export function auth(req, res, next) {
    if (req.session?.user?.username !== 'nicolas' || !req.session?.user?.admin === 'admin') {
        return res.status(401).send('Error de autenticación')
    }
    next()
}


