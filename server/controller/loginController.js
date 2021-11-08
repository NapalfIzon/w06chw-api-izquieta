const chalk = require("chalk");
const debug = require("debug")("robots:usersControllers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user.username === username) {
    const isPasswordOk = await bcrypt.compare(password, user.password);

    if (isPasswordOk) {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.username,
        },
        process.env.SECRET_WORD,
        {
          expiresIn: 3600 * 24 * 7,
        }
      );
      res.json({ token });
    } else {
      debug(chalk.bgYellow.black("La contraseña dada es incorrecta ₍•̀⚇•́₎"));
      const error = new Error("B: Credenciales erroneas ʅ(°,ʖ°)ʃ");
      error.code = 401;
      next(error);
    }
  } else {
    debug(
      chalk.bgYellow.black(
        "No ha sido posible encontrar el usuario solicitado ₍•̀⚇•́₎"
      )
    );
    const error = new Error("A: Credenciales erroneas ʅ(°,ʖ°)ʃ");
    error.code = 401;
    next(error);
  }
};

module.exports = login;
