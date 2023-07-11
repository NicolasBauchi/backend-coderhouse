import ticketModel from "./models/ticket.model.js";


export default class ticketManagerMongo {

    //Recibo array de objetos: item.prod y item.quantity cada objeto.
    async generateTicket(compra) {
        const ticket = {}
        let aux_code = compra.fecha.split(",")

        //Preparo el ticket:
        ticket.code = aux_code[1] + "-" + compra.montoTotal;
        ticket.purchase_datetime = compra.fecha;
        ticket.amount = compra.montoTotal;
        ticket.purchaser = compra.usuarioComprador;
        console.log("entro a generarTicket, muestro ticket ->", ticket);
        //Guardo el ticket:
        try {
            return await ticketModel.create(ticket)
        } catch (error) {
            return new Error(error)
        }
    }


}