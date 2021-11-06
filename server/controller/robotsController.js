const chalk = require("chalk");
const debug = require("debug")("robots:robotsController");
const Robot = require("../../database/models/Robot");

const getRobots = async (req, res) => {
  debug(
    chalk.bgBlueBright.white(
      "₍ᐢ.⚇.ᐢ₎ Se ha realizado un GET genérico contra BBDD ₍ᐢ.⚇.ᐢ₎"
    )
  );
  const robots = await Robot.find();
  res.json(robots);
};

const getRobotById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const searchedRobot = await Robot.findById(id);
    if (searchedRobot) {
      debug(chalk.bgBlue.white("₍ᐢ.⚇.ᐢ₎ GET a una ID contra BBDD OK ₍ᐢ.⚇.ᐢ₎"));
      res.json(searchedRobot);
    } else {
      debug(chalk.bgYellow.black("₍•̀⚇•́₎ GET a una ID contra BBDD KO ₍•̀⚇•́₎"));
      const error = new Error(
        "The requested robot it's not fabricated yet  ʅ(°,ʖ°)ʃ"
      );
      error.code = 404;
      throw error;
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

module.exports = { getRobots, getRobotById };
