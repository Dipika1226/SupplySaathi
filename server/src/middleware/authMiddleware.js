const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expect: Bearer TOKEN

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

exports.requireSupplierRole = (req, res, next) => {
  if (req.user?.role !== "supplier") {
    return res.status(403).json({ error: "Access denied: Supplier role required" });
  }
  next();
};
