const express = require("express");
const morgan = require("morgan");
const chalk = require("chalk");
const debug = require("debug")("robots:indexServer");
const initializeMongoDBServer = require("../database/index");
const errorHandler = require("./error");

const app = express();

app.use(morgan("dev"));

const initializeServer = (port) => {
  const server = app.listen(() => {
    debug(
      chalk.yellow(
        `${"ᕦ( ͡° ͜ʖ ͡°)ᕤ"} Escuchando en el puerto ${port} ${"ᕦ( ͡° ͜ʖ ͡°)ᕤ"}`
      )
    );
    initializeMongoDBServer();
  });

  server.on("error", (error) => {
    debug(
      chalk.bgRedBright.white(
        "ಥ╭╮ಥ Ha habido un error al iniciar el servidor ಥ╭╮ಥ"
      )
    );
    debug(chalk.bgRedBright.white(`Error inesperado: ${error.message}`));
  });
};

app.use(express.json());

app.use(errorHandler);

module.exports = initializeServer;
