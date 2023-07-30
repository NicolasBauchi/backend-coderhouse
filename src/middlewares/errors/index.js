import EErrors from "../../service/errors/enums.js";

export default (error, req, res, next) => {
    //Muestro en consola el error:
    console.log(error.cause);

    /*  ROUTING_ERROR: 1,
    INVALID_TYPES_ERROR: 2,
    DATABASE_ERROR: 3,
    MISSING_DATA: */

    switch (error.code) {

        case EErrors.ROUTING_ERROR:
            res.send({ status: "error", error: error.name })
            break;

        case EErrors.INVALID_TYPES_ERROR:
            res.send({ status: "error", error: error.name })
            break;

        case EErrors.DATABASE_ERROR:
            res.send({ status: "error", error: error.name })
            break;

        case EErrors.MISSING_DATA:
            res.send({ status: "error", error: error.name })
            break;

        default:
            res.send({ status: "error", error: "Unhandled error" })
            break;
    }

}
