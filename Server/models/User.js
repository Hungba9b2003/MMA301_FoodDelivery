const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  email: String,
  password: String,
  avatarUrl: String,
  favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  createAt: Date,
  role: String,
  accountBalance: Number,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
