const Chat = require("../model/chat");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllMessages = async (req, res) => {
  try {
    const messages = await Chat.find({});
    res.status(200).json({ messages, nobHits: messages.length });
  } catch (error) {
    // res.status(500).json({ msg: error });
    console.log(error);
  }
};

const createMessage = async (req, res) => {
  // res.json(req.body);
  try {
    const chat = await Chat.create(req.body);
    res.status(StatusCodes.CREATED).json({ chat });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createMessage, getAllMessages };
