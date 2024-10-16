const express = require("express");
const router = express.Router();
const {
  register,
  login,
  sendSMS,
  sendOtp,
  verifyOtp,
} = require("../controller/authController");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("username"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  register
);

router.post("/login", login);

router.post("/sendSMS", sendSMS);

router.post("/sendOtp", sendOtp);

router.post("/verifyOtp", verifyOtp);
module.exports = router;
