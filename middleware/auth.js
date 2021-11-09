const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const debug = require("debug")("robots:authMiddleware");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    if (token) {
      try {
        console.log("caca de la vaca");
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = user.id;
        next();
      } catch (error) {
        debug(
          chalk.bgYellow.black(
            "Autenticación fallida: token de autenticación incorrecto  ₍•̀⚇•́₎"
          )
        );
        error.code = 400;
        error.message = "E: Credenciales erroneas ʅ(°,ʖ°)ʃ";
        next(error);
      }
    } else {
      debug(chalk.bgYellow.black("Autenticación fallida: falta Bearer  ₍•̀⚇•́₎"));
      const error = new Error("D: Credenciales erroneas ʅ(°,ʖ°)ʃ");
      error.code = 401;
      next(error);
    }
  } else {
    debug(
      chalk.bgYellow.black(
        "Autenticación fallida: falta 'Authorization' en header de la request ₍•̀⚇•́₎"
      )
    );
    const error = new Error("C: Credenciales erroneas ʅ(°,ʖ°)ʃ");
    error.code = 401;
    next(error);
  }
};

module.exports = auth;
