const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUser,
  getSingleUser,
} = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user").get(getUser);
router.route("/:id").get(getSingleUser);

module.exports = router;
