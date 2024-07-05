const multer = require("multer");
const path = require("path");
const User = require("../models/UsersModel.js");
const Stadium = require("../models/StadiumModel.js");
const fs = require("fs").promises;

const storageProfile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "assets", "profilePics"));
  },
  filename: async (req, file, cb) => {
    const { id } = req.body;
    try {
      const user = await User.findById(id).exec();
      const imageIdentifier =
        file.fieldname + "-" + Date.now() + path.extname(file.originalname);
      user.profilePicture = imageIdentifier;
      await user.save();
      cb(null, imageIdentifier);
    } catch (error) {
    } finally {
      
    }
  },
});

const storageCardImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "assets", "cardImages"));
  },
  filename: async (req, file, cb) => {
    const { name } = req.body;

    try {
      const stadium = await Stadium.findOne({ name }).exec();
      const imageIdentifier =
        file.fieldname + "-" + Date.now() + path.extname(file.originalname);
      stadium.card_image = imageIdentifier;
      await stadium.save();
      cb(null, imageIdentifier);
    } catch (error) {
    } 
  },
});

const uploadprofile = multer({ storage: storageProfile });
const uploadCard = multer({ storage: storageCardImage });

const uploadProfilePicture = (req, res) => {
  try {
    res.status(200).json({ message: "Profile Image uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server issue, Error uploading image" });
  }
};

const uploadCardImage = (req, res) => {
  try {
    res.status(200).json({ message: "Card Image uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server issue, Error uploading image" });
  }
};

const deleteProfilePicture = async (req, res) => {
  const { id } = req.body;
  if (!id || id?.length !== 24) {
    return res.status(404).json({ message: "missing user id" });
  }
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    if (!user.profilePicture) {
      res.status(404).json({ message: "user profile picture not found" });
    }
    const imagePath = path.join(
      __dirname,
      "..",
      "assets",
      "profilePics",
      user.profilePicture
    );

    await fs.unlink(imagePath);

    user.profilePicture = "";
    await user.save();

    res.status(200).json({ message: "Profile picture deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile picture:", error);
    res
      .status(500)
      .json({ message: "Server issue, Error deleting profile picture" });
  }
};

const getProfilePictureByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).exec();
    if (!user || !user.profilePicture) {
      return res.status(404).json({ message: "Profile picture not found" });
    }

    const imagePath =
      `http://localhost:${process.env.PORT}/assets/profilePics/` +
      user.profilePicture;

    res.status(200).json(imagePath);
  } catch (error) {
    console.error("Error getting profile picture:", error);
    res
      .status(500)
      .json({ message: "Server issue, Error getting profile picture" });
  }
};

module.exports = {
  uploadCard,
  uploadCardImage,
  uploadprofile,
  uploadProfilePicture,
  deleteProfilePicture,
  getProfilePictureByUserId,
};

