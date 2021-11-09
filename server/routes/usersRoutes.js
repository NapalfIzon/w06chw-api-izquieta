const express = require("express");
const createUser = require("../controller/usersController");
const login = require("../controller/loginController");
const usersInfo = require("../controller/userInfoController");

const router = express.Router();

router.get("/info", usersInfo);

router.post("/signin", createUser);

router.post("/login", login);

module.exports = router;
