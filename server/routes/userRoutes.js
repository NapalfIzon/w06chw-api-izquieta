const express = require("express");
const createUser = require("../controller/usersControllers");

const router = express.Router();

router.get("/", createUser);

module.exports = router;
