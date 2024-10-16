const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    restName: {
      type: String,
      required: true,
    },
    resAddress: {
      type: String,
      required: true,
    },
    restImage: {
      type: String,
    },
    status: {
      type: String,
      enum: ["enable", "disable"],
      default: "enable",
    },
    approved: {
      type: Boolean,
      default: false,
    },
    approvealDate: {
      type: Date,
      default: false,
    },
    menu: String,
    revenueReport: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updateAt: Date,
  },
  {
    collection: "Restaurant", // Tên collection trong MongoDB
  }
);

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;
