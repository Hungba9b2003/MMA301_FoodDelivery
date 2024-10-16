const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: (v) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        message: "Email is not valid",
      },
    },
    role: {
      type: String,
      enum: ["guest", "admin", "customer", "restaurant"],
      default: "guest",
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    updateAt: Date,
    lastLogin: Date,
    profile: String,
    token: String,
  },
  {
    collection: "Account",
  }
);

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
