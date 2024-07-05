const User = require("../models/UsersModel.js");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs").promises;
const { successfulSignUp } = require("../middlewares/notifications.js");

//get all users controller
const getAllUsers = asyncHandler(async (req, res) => {
  // Get all users from MongoDB, except password field
  const users = await User.find().select("-password").lean();

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "User id is required!" });
  }
  const user = await User.findById(id).select("-password").exec();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

//create new user controller
const createNewUser = asyncHandler(async (req, res) => {
  //extracting fields from body
  const { username, email, password } = req.body;

  // Confirm data
  if (!username || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicateUsername = await User.findOne({ username }).lean().exec();

  if (duplicateUsername) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  // Check for duplicate email
  const duplicateEmail = await User.findOne({ email }).lean().exec();

  if (duplicateEmail) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // 10 salt rounds

  const userObject = { username, email, password: hashedPwd };

  // Create and store new user
  const user = await User.create(userObject);
  req.user = user;
  successfulSignUp(req, res);
  if (user) {
    res.status(201).json({
      message: `New user ${username} | ${email} created successfully`,
    });
  } else {
    res.status(400).json({ message: "user data was not saved" });
  }
});

// @desc Update a user
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, firstName, lastName, phone, city } = req.body;

  // Confirm data
  if (!id || !username) {
    return res.status(400).json({ message: "username & id are required" });
  }

  // Does the user exist to update?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User does not exist!" });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }
  if (user.username != username) {
    const refreshToken = jwt.sign(
      { username: username },
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
  }

  user.username = username.trim();
  user.firstName = firstName.trim();
  user.lastName = lastName.trim();
  user.phone = phone.trim();
  user.city = city.trim();
  const updatedUser = await user.save();

  res.status(200).json({ message: `${updatedUser.username} updated` });
});

// @desc Delete a user
const deleteUser = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  if (!ids || !ids.length || !Array.isArray(ids)) {
    return res.status(400).json({ message: "Users IDs are required" });
  }

  const usersToDelete = await User.find({
    _id: { $in: ids },
  });
  if (!usersToDelete || usersToDelete.length === 0) {
    return res.status(400).json({ message: "Users not found" });
  }
  usersToDelete.forEach(async (user) => {
    if (user.profilePicture) {
      const imagePath = path.join(
        __dirname,
        "..",
        "assets",
        "ProfilePics",
        user.profilePicture
      );
      await fs.unlink(imagePath);
    }
  });

  await User.deleteMany({ _id: { $in: ids } });
  const reply = `Users of ids equal to ${ids} have been deleted successfully!`;
  res.status(200).json(reply);
});

const checkUserNameAvailability = asyncHandler(async (req, res) => {
  const { id, username } = req.body;
  //check duplicates
  const duplicate = await User.findOne({ username }).lean().exec();

  // Allow updates to the original user
  if ((duplicate && duplicate?._id.toString() !== id) || !username) {
    return res.status(200).json({ result: false });
  }
  res.status(200).json({ result: true });
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "Missing credentials" });
  }
  const username = req.user;
  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "New password and confirm password do not match" });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if old password matches the one stored in the database
  const passwordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Old password is incorrect" });
  }

  // Hash the new password before saving it
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
});

const banUserById = asyncHandler(async (req, res) => {
  const id = req.body.id;

  if (!id) {
    return res.status(404).json({ message: "User id is required" });
  }
  // Find the user by ID
  const user = await User.findById(id);

  if (!user) {
    // If user is not found, send a 404 Not Found response
    return res.status(404).json({ message: "User not found" });
  }
  if (user?.isBanned === true) {
    return res.status(400).json({ message: "User is already banned" });
  }

  // Update the user's isBanned attribute to true
  user.isBanned = true;

  // Save the updated user back to the database
  await user.save();

  // Send a success response
  res.status(200).json({
    success: true,
    message: `User whose username is "${user.username}" and id "${user._id}" banned successfully`,
  });
});

const unBanUserById = asyncHandler(async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(404).json({ message: "User id is required" });
  }
  // Find the user by ID
  const user = await User.findById(id);

  if (!user) {
    // If user is not found, send a 404 Not Found response
    return res.status(404).json({ message: "User not found" });
  }
  if (user?.isBanned === false) {
    return res.status(400).json({ message: "User is already not banned" });
  }

  // Update the user's isBanned attribute to true
  user.isBanned = false;

  // Save the updated user back to the database
  await user.save();

  // Send a success response
  res.status(200).json({
    success: true,
    message: `User whose username is "${user.username}" and id "${user._id}" unbanned successfully`,
  });
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUserById,
  checkUserNameAvailability,
  changePassword,
  banUserById,
  unBanUserById,
};
