const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 20,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      validate: {
        validator: (v) => /^\+?[1-9]\d{1,14}$/.test(v),
        message: "Phone number is not valid",
      },
    },
    address: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    updateAt: {
      type: Date,
      default: Date.now,
    },
    orders: {
      type: [String],
      default: [],
    },
  },
  {
    collection: "Customer",
  }
);

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
