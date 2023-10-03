const express = require("express");
const router = express.Router();

const { getAllScores, createScore } = require("../controllers/scores");

router.route("/score").get(getAllScores).post(createScore);

module.exports = router;
