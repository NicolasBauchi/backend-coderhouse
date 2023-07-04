import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
//require('dotenv').config()
let url = process.env.MONGO_URL
// aca poner URL de conexion a DB mongo ATLAS ONLINE.

const objectConfig = {
    connectDB: () => connect(url),
    persistence: process.env.PERSISTENCE
}

export default objectConfig;