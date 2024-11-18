const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid infomation" });
    }

    res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    res.status(500).json({ message: "Login failed.", error: error.message });
  }
});
router.get("/session", (req, res) => {
  if (req.session.user) {
    res.status(200).json({ isLoggedIn: true, user: req.session.user });
  } else {
    res.status(200).json({ isLoggedIn: false });
  }
});
// Logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed." });
    }
    res.status(200).json({ message: "Logout successful." });
  });
});

module.exports = router;
