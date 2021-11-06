const { Schema, model } = require("mongoose");

const robotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  speed: {
    type: String,
    required: true,
  },
  stamina: {
    type: String,
    required: true,
  },
  creation_date: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

module.exports = model("Robot", robotSchema);
