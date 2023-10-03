const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  room: {
    type: String,
    required: [true, "Please provide message"],
  },
  userName: {
    type: String,
    required: [true, "Please provide message"],
  },
});

module.exports = mongoose.model("Score", scoreSchema);
