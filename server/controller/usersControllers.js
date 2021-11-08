const chalk = require("chalk");
const debug = require("debug")("robots:usersControllers");
const bcrypt = require("bcrypt");
const User = require("../../database/models/User");

const createUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await User.create(newUser);
    res.json(newUser);
    debug(chalk.bgGreen.white(`Se ha creado al usuario correctamente ₍ᐢ.⚇.ᐢ₎`));
  } catch (error) {
    error.code = 400;
    error.message = "Unable to create the user.";
    next(error);
  }
};

module.exports = createUser;
