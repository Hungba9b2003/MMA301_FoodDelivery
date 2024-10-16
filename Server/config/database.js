const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://phamthuy091984:Hung@cluster0.p2roh.mongodb.net/Food_Delivery");
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
