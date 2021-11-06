const chalk = require("chalk");
const debug = require("debug")("robots:errorServer");

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  debug(
    chalk.bgRedBright.white(
      "( ͠° ͟ʖ ͠°) Se ha detectado el siguiente error: ",
      error.message
    )
  );
  res.status(error.code || 500).json({ error: error.message });
};

module.exports = errorHandler;
