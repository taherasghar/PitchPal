const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const role = req.role;
  if (role !== "admin") {
    return res.status(401).json({ message: "Forbidden" });
  }
  next();
};

module.exports = verifyAdmin;
