import { connect } from "mongoose";

let url = "mongodb+srv://bauchinicolas:czSdWV0eQZ8Tmpxh@clusterneb.oqrfnt8.mongodb.net/ecommerce?retryWrites=true&w=majority"; // aca poner URL de conexion a DB mongo ATLAS ONLINE.

const objectConfig = {
    connectDB: () => connect(url)
}

export default objectConfig;