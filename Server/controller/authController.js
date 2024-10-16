const Account = require("../models/Account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const session = require("express-session");
dotenv.config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "phamthuy091984@gmail.com",
    pass: "nepb skbc pikd sugs",
  },
});
exports.sendOtp = (req, res) => {
  const { email } = req.body;
  console.log("Email:", email);

  // Kiểm tra tính hợp lệ của email
  if (!email || typeof email !== "string" || email.trim() === "") {
    return res.status(400).send("Invalid email address");
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Tạo mã OTP 6 chữ số

  let mailOptions = {
    from: "phamthuy091984@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending OTP");
    } else {
      console.log("Email sent:", info.response);
      req.session.otp = otp;
      req.session.email = email;
      return res.status(200).send({ message: "OTP sent successfully", otp });
    }
  });
};

exports.verifyOtp = (req, res) => {
  const { enteredOtp } = req.body;
  const sentOtp = req.session.otp;
  if (enteredOtp === sentOtp) {
    return res.status(200).send({ message: "OTP verified successfully" });
  } else {
    return res.status(400).send({ message: "Invalid OTP" });
  }
};
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const account = await Account.findOne({ username });
    if (!account) {
      return res.status(400).json({ message: "Invalid" });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid" });
    }

    const token = jwt.sign(
      { id: account.id, role: account.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    account.token = token;
    await account.save();

    res.json({ token });
  } catch (error) {
    console.error(error); // Log lỗi để dễ dàng theo dõi
    res.status(500).json({ message: "Server error" });
  }
};
exports.sendSMS = async (req, res) => {
  const apiUrl = "https://api.esms.vn/main/sms/send";
  const apiKey = "1D45C4CFDE2EAFD24FE2A5C6359752";
  const secretKey = "9C49AC2860184B7D4C1B219ECB0BD6";

  const { phone, content } = req.body;

  if (!phone || !content) {
    return res
      .status(400)
      .json({ error: "Phone number and content are required." });
  }

  const data = {
    phone: phone,
    content: content,
    apiKey: apiKey,
    secretKey: secretKey,
  };

  try {
    const response = await axios.post(apiUrl, data);
    console.log("SMS sent successfully:", response.data);
    return res
      .status(200)
      .json({ message: "SMS sent successfully.", data: response.data });
  } catch (error) {
    console.error("Error sending SMS:", error.response.data);

    // Trả về lỗi cho client
    return res
      .status(500)
      .json({ error: "Error sending SMS.", details: error.response.data });
  }
};

exports.register = async (req, res) => {
  const { username, password } = req.body;

  console.log("register", username, password);

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    let account = await Account.findOne({ username });
    if (account) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    account = new Account({
      username: username,
      password: hashedPassword,
    });

    await account.save();
    res.status(201).json({ message: "Account registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
    console.error(error);
  }
};
