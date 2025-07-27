const express = require("express");
const router = express.Router();
const { requestOtp, verifyOtpAndLogin, checkUser } = require("../controllers/authController");

router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtpAndLogin);
router.post("/check-user", checkUser);

module.exports = router;
