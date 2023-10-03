const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please provide message"],
  },
  choice1: {
    type: String,
    required: [true, "Please provide option 1"],
  },
  choice2: {
    type: String,
    required: [true, "Please provide option 2"],
  },
  choice3: {
    type: String,
    required: [true, "Please provide option 3"],
  },
  choice4: {
    type: String,
    required: [true, "Please provide option 4"],
  },
  answer: {
    type: Number,
    required: [true, "Please provide answer"],
  },
  id: {
    type: String,
    enum: ["Architecture", "Catechism", "Chemistry", "Geography", "Physics"],
  },
});

module.exports = mongoose.model("Questions", questionSchema);
