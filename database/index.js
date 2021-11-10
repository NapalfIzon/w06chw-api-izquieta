const chalk = require("chalk");
const debug = require("debug")("robots:indexDatabase");
const mongoose = require("mongoose");

const initializeMongoDBServer = (urlMongoDb) => {
  mongoose.connect(urlMongoDb, (error) => {
    if (error) {
      debug(
        chalk.bgRedBright.white(
          "ಠ╭╮ಥ No se ha podido iniciar la base de datos ಠ╭╮ಥ"
        )
      );
      debug(chalk.bgRedBright.white(error.message));
    }

    debug(chalk.green("₍ᐢ`🐽´ᐢ₎ Conectado a la base de datos ₍ᐢ`🐽´ᐢ₎"));
  });
};

module.exports = initializeMongoDBServer;
