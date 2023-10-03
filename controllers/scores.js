const Score = require("../model/score");

const getAllScores = async (req, res) => {
  try {
    const score = await Score.find({});
    res.status(200).json({ score, nobHits: score.length });
  } catch (error) {
    console.log(error);
  }
};

const createScore = async (req, res) => {
  try {
    const score = await Score.create(req.body);
    res.status(200).json({ score });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllScores,
  createScore,
};
