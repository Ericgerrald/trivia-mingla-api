const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "Please provide message"],
    },
    user: {
      type: String,
      required: [true, "Please provide message"],
    },
    community: {
      type: String,
      required: [true, "Please provide message"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
