const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connection = require("./database");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use("/api/medidietas/usuarios", require("../routes/usuarioMovil"));
    this.app.use("/api/medidietas/comidas", require("../routes/comida"));
    this.app.use("/api/medidietas/alimentos", require("../routes/alimento"));
    this.app.use("/api/medidietas/consumos", require("../routes/consumo"));
    this.app.use("/api/medidietas/expertos", require("../routes/expertoNutricion"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
