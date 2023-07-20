export default function handlePolicies(nivelRequerido) {

    return function (req, res, next) {

        const nivelAcceso = {
            PUBLIC: 0,
            USER: 1,
            ADMIN: 2
        }

        const nivelAccesoUsuario = getUserNivelAcceso(req);

        if (nivelAcceso[nivelAccesoUsuario] == nivelAcceso[nivelRequerido]) {
            return next();
        } else {
            res.status(403).send({ error: "Acceso denegado." })
        }


    }

}

function getUserNivelAcceso(req) {
    
    switch (req.session.user.role) {
        case "User":
            return "USER"

        case "Admin":
            return "ADMIN"

        default:
            "PUBLIC"
            break;
    }

}