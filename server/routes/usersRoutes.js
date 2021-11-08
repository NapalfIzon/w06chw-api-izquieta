const express = require("express");
const createUser = require("../controller/usersController");
const login = require("../controller/loginController");

const router = express.Router();

router.post("/signin", createUser);

router.post("/login", login);

module.exports = router;
