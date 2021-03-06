require("dotenv").config();
const initializeServer = require("./server/index");

const port = process.env.PORT || process.env.LOCAL_PORT || 5000;

initializeServer(port);
