const TicketList = require("./ticket-list");

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

          this.io.emit("ticket-asignado", this.ticketList.ultimos13);
        }
      );
    });
  }
}

module.exports = Sockets;
