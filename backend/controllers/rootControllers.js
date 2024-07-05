const asyncHandler = require("express-async-handler");

const getRoot = asyncHandler((req, res) => {
  res.status(200).json({ message: "welcome to backend!" });
});

module.exports = { getRoot };
