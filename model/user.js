const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a first name"],
    minLength: 3,
    maxLength: 10,
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name"],
    minLength: 3,
    maxLength: 10,
  },
  userName: {
    type: String,
    required: [true, "Please provide a user name"],
    unique: true,
  },
  city: {
    type: String,
    required: [true, "Please provide a city"],
  },
  email: {
    unique: true,
    type: String,
    required: [true, "Please provide an email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ,
      "Please provide valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    // minLength: 6,
  },
  archiScore: {
    type: Number,
    default: 0,
  },
  cateScore: {
    type: Number,
    default: 0,
  },
  chemScore: {
    type: Number,
    default: 0,
  },
  geoScore: {
    type: Number,
    default: 0,
  },
  phyScore: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userID: this._id, userNmae: this.userNmae },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
