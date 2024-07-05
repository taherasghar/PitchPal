const User = require("../models/UsersModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const login = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }

  const user = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  }).exec();

  if (!user) {
    return res.status(401).json({ message: "Incorrect username or password" });
  }
  if (user?.isBanned) {
    return res.status(400).json({ message: "Cannot proceed! User is banned" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });
  const profilePicture = user?.profilePicture
    ? `http://localhost:${process.env.PORT}/assets/profilePics/` +
      user.profilePicture
    : "";

  res.json({ accessToken, profilePicture });
});

const refresh = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({
        username: decoded.username,
      }).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      if (foundUser?.isBanned) {
        return res
          .status(400)
          .json({ message: "Cannot proceed! User is banned" });
      }
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser._id,
            username: foundUser.username,
            role: foundUser.role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      const profilePicture = foundUser?.profilePicture
        ? `http://localhost:${process.env.PORT}/assets/profilePics/` +
          foundUser.profilePicture
        : "";

      res.json({ accessToken, profilePicture });
    })
  );
};

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.sendStatus(204).json({ message: "no token found" }); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  console.log("Cleared for real!");
  res.json({ message: "Cookie cleared" });
};

module.exports = {
  login,
  refresh,
  logout,
};
