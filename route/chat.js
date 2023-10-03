const express = require("express");
const router = express.Router();

const { createMessage, getAllMessages } = require("../controllers/chat");

router.route("/message").get(getAllMessages).post(createMessage);

module.exports = router;
