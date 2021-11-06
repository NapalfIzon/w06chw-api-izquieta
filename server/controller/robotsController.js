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

module.exports = getRobots;
