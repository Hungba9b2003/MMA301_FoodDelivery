const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const connectDB = require("./config/database");
const connectDB1 = require("./config/mydatabase");
const authRoutes = require("./routes/authRouter");
const app = express();
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
const Account = require("./models/Account");
const session = require("express-session");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// connectDB();
connectDB1();
app.use(
  session({
    secret: "your_secret_key", // Thay thế bằng khóa bí mật của bạn
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Đặt true khi bạn chạy trên HTTPS
  })
);
// Hàm xóa các token hết hạn
// const clearExpiredTokens = async () => {
//   const expiredDate = new Date(Date.now() - 10000);
//   const result = await Account.updateMany(
//     { token: { $ne: "" }, loginAt: { $lt: expiredDate } },
//     { $set: { token: "" } }
//   );
//   console.log(`${result.modifiedCount} token(s) cleared.`);
// };

// setInterval(clearExpiredTokens, 10000);

app.use("/api/auth", authRoutes);

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
