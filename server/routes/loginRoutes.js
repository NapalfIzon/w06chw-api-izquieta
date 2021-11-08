const express = require("express");
const checkUserCredentials = require("../middleware/loginMiddleware");

const router = express.Router();

router.post("/", checkUserCredentials);

module.exports = router;
