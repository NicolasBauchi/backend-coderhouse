import winston from "winston";
import dotenv from "dotenv";
dotenv.config();
const entorno = process.env.NODE_ENV;

let levelSelected = "info"

if (entorno === "development") {
    levelSelected = "debug"
} else {
    levelSelected = "info"
}

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'blue',
        debug: 'white'
    }
}

const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: levelSelected,
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'error',
            format: winston.format.simple()
        })
    ]
})


export function addLogger(req, res, next) {
    req.logger = logger;
    req.logger.info(`${req.method} en ${req.url} --- ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    next()
}
