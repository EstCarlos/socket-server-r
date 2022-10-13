const Server = require("./models/server");
const connectDb = require("./db");

//Paquete para leer y establecer las variables de entorno
require("dotenv").config();

//Inicializar la instancia del server
const server = new Server();

//Ejecutar el server
server.execute();

//Connection
const startDb = async () => {
  try {
    await connectDb(process.env.MONGO_CONNECT);
    console.log("BD Connect");
  } catch (error) {
    console.log(error);
  }
};

startDb();
