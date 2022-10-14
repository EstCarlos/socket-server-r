const Ticket = require("./ticket");

class TicketList {
  constructor() {
    //Se tiene el numero inicial este pasa a tickets pendientes y lego se pasa a asignados
    this.ultimoNumero = 0;

    this.pendientes = [];
    this.asignados = [];
  }
  //Para incrementear el numero inicial
  get siguienteNumero() {
    this.ultimoNumero++;
    return this.ultimoNumero;
  }

  // 3 los que se veran en la tarjetas grades  y 10 en el historial
  get ultimos13() {
    return this.asignados.slice(0, 10);
  }

  crearTicket() {
    const nuevoTicket = new Ticket(this.siguienteNumero);
    this.pendientes.push(nuevoTicket);
    return nuevoTicket;
  }

  asignarTicket(agente, escritorio) {
    if (this.pendientes.length == 0) {
      return null;
    }
    //shift remueve el elemento que esta de primero para pasarlo al siguiente ticket
    const siguienteTicket = this.pendientes.shift();

    siguienteTicket.agente = agente;
    siguienteTicket.escritorio = escritorio;

    //unshift Insertar elementos al inicio del arreglo
    this.asignados.unshift(siguienteTicket);
    return siguienteTicket;
  }
}

module.exports = TicketList;
