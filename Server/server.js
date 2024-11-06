const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const connectDB = require("./config/database");
const connectDB1 = require("./config/mydatabase");
const app = express();
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/authRouter");
const recipeRoutes = require("./routes/recipeRouter");
const session = require("express-session");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// connectDB();
connectDB();
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

app.use("/api/recipes", recipeRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
