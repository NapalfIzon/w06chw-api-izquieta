const express = require("express");
const morgan = require("morgan");
const chalk = require("chalk");
const debug = require("debug")("robots:indexServer");
const cors = require("cors");
const { validate, Joi } = require("express-validation");
const initializeMongoDBServer = require("../database/index");
const errorHandler = require("./error");
const robotsRoutes = require("./routes/robotsRoutes");
const userRoutes = require("./routes/usersRoutes");
const auth = require("../middleware/auth");

const urlMongoDb = process.env.MONGODB_STRING_ROBOTS;

const loginValidation = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const app = express();

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(
      chalk.green(
        `${"ᕦ( ͡° ͜ʖ ͡°)ᕤ"} Escuchando en el puerto ${port} ${"ᕦ( ͡° ͜ʖ ͡°)ᕤ"}`
      )
    );
    initializeMongoDBServer(urlMongoDb);
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

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use("/robots", auth, robotsRoutes);

app.use("/users", validate(loginValidation), userRoutes);

app.use(errorHandler);

module.exports = initializeServer;
