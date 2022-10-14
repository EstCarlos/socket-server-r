//Servidor de sockets
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Http server
    this.server = http.createServer(this.app);

    //Configurando Sockets
    this.io = socketio(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    //Inicializar sockets
    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    //Desplegar el directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    //CORS
    this.app.use(cors());

    //Get de los utlimos tickets
    this.app.get("/ultimos", (req, res) => {
      res.json({
        ok: true,
        ultimos: this.sockets.ticketList.ultimos13,
      });
    });
  }

  execute() {
    //Inicializar Middlewares
    this.middlewares();

    //Iniciarlizar Server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto: ", this.port);
    });
  }
}

module.exports = Server;
