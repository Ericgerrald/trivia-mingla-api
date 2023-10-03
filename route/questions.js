const express = require("express");
const router = express.Router();
const { getAllQuestions } = require("../controllers/questions");

router.route("/question").get(getAllQuestions);

module.exports = router;
