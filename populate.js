require("dotenv").config();

const connectDB = require("./db/connect");
const question = require("./model/questions");
const jsonQuestion = require("./question.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await question.deleteMany();
    await question.create(jsonQuestion);
    console.log("question success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
