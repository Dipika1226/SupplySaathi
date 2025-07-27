const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { sendOtp, verifyOtp } = require("../utils/otpService");

exports.requestOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ msg: "Phone required" });

  sendOtp(phone);
  res.json({ msg: "OTP sent" });
};

exports.checkUser = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ msg: "Phone number required" });

  const user = await User.findOne({ phone });
  res.json({ exists: !!user });
};


exports.verifyOtpAndLogin = async (req, res) => {
  const { phone, otp, fullName, language, role } = req.body;

  // 1. OTP validation
  if (!verifyOtp(phone, otp)) {
    return res.status(401).json({ msg: "Invalid OTP" });
  }

  // 2. Check user existence
  let user = await User.findOne({ phone });
  const isNew = !user;

  // 3. Create new user if not found
  if (isNew) {
    if (!fullName || !language || !role) {
      return res.status(400).json({ msg: "Missing fields for signup." });
    }

    user = await User.create({ phone, fullName, language, role });
  }

  // 4. Issue JWT
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  // 5. Send response
  res.json({
    msg: isNew ? "Signup successful" : "Login successful",
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      phone: user.phone,
      language: user.language,
      role: user.role,
    },
  });
};
