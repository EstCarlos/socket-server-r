const TicketList = require("./ticket-list");
const regiTicket = require("../models/ticketSchema");

class Sockets {
  constructor(io) {
    this.io = io;

    //Crear la instania de nuestro ticket List
    this.ticketList = new TicketList();

    this.socketEvents();
  }

  socketEvents() {
    // On Connection
    this.io.on("connection", (socket) => {
      console.log("Cliente conectado");

      socket.on("solicitar-ticket", (data, callBack) => {
        const nuevoTicket = this.ticketList.crearTicket();
        callBack(nuevoTicket);
      });

      socket.on(
        "siguiente-ticket-trabajar",
        ({ agente, escritorio }, callBack) => {
          const suTicket = this.ticketList.asignarTicket(agente, escritorio);
          callBack(suTicket);
          console.log(suTicket.id);

          const message = new regiTicket({
            id: suTicket.id,
            agente: suTicket.agente,
            escritorio: suTicket.escritorio,
            numero: suTicket.numero,
          });

          message.save().then(() => {
            this.io.emit("ticket-asignado", this.ticketList);
          });

          this.io.emit("ticket-asignado", this.ticketList.ultimos13);
        }
      );
    });
  }
}

module.exports = Sockets;
