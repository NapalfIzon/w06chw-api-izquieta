const chalk = require("chalk");
const debug = require("debug")("robots:usersInfoController");
const User = require("../../database/models/User");

const usersInfo = async (req, res) => {
  debug(
    chalk.bgBlueBright.white(
      "Se ha realizado un GET genérico de usuarios registrados contra BBDD ₍ᐢ.⚇.ᐢ₎"
    )
  );
  const users = await User.find();
  res.json(users);
};

module.exports = usersInfo;
