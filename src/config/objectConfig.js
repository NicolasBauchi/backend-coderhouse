import { connect } from "mongoose";
require('dotenv').config()
let url = process.env.MONGO_URL
// aca poner URL de conexion a DB mongo ATLAS ONLINE.

const objectConfig = {
    connectDB: () => connect(url)
}

export default objectConfig;