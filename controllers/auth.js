const User = require("../model/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.userName, id: user.id }, token });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorreect = await user.comparePassword(password);
  if (!isPasswordCorreect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compereing password

  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.userName, id: user.id }, token });
};

const getUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json({ user, nobHits: user.length });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await User.findOne({ _id: userID });
    if (!user) {
      return res.status(404).json({ msg: `no user found` });
    }
    res.status(200).json({ user });
  } catch (error) {}
};

module.exports = { register, login, getUser, getSingleUser };
