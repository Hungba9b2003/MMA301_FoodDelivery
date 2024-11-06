const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
  description: String,
  createAt: Date,
  amount: Number,
  paymentCode: String,
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
