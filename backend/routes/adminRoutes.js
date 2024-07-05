const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT.js");
const verifyAdmin = require("../middlewares/verifyAdmin.js");
const BookingModel = require("../models/BookingModel.js");
const StadiumModel = require("../models/StadiumModel.js");
const UserModel = require("../models/UsersModel.js");
const HostFormModel = require("../models/HostFormModel.js");

router.use(verifyJWT);
router.use(verifyAdmin);

router.route("/").get((req, res) => {
  res.status(200).json({ message: "welcome to admin page, in progress..." });
});

router.route("/getStats").get(async (req, res) => {
  try {
    // Count documents in each collection
    const stadiumsCount = await StadiumModel.countDocuments();
    const usersCount = await UserModel.countDocuments();
    const formsCount = await HostFormModel.countDocuments();
    const bookingsCount = await BookingModel.countDocuments();

    // Send response with counts
    res.status(200).json({
      stadiums: stadiumsCount,
      users: usersCount,
      forms: formsCount,
      bookings: bookingsCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
