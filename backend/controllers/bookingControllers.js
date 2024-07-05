const mongoose = require("mongoose");
const Booking = require("../models/BookingModel.js");
const User = require("../models/UsersModel.js");
const Stadium = require("../models/StadiumModel.js");
const asyncHandler = require("express-async-handler");
const {
  successfulCheckoutNotification,
} = require("../middlewares/notifications.js");

const getStadiumsAndUsers = asyncHandler(async (req, res) => {
  try {
    // Fetch all stadiums
    const stadiums = await Stadium.find().select("name").exec();
    // Create a hashmap for stadiums
    const stadiumsMap = {};
    stadiums.forEach((stadium) => {
      stadiumsMap[stadium._id] = stadium.name;
    });

    // Fetch all users
    const users = await User.find().select("username").exec();
    // Create a hashmap for users
    const usersMap = {};
    users.forEach((user) => {
      usersMap[user._id] = user.username;
    });

    res.status(200).json({
      stadiumsMap,
      usersMap,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find().exec();

  if (!bookings || bookings.length === 0) {
    return res.status(404).json({ message: "No bookings found" });
  }

  // Create a hashmap to store bookings
  const bookingsMap = {};

  // Iterate through the bookings array
  bookings.forEach((booking) => {
    // Extract stadium from booking
    const { stadium, ...bookingData } = booking.toObject();

    // Add stadium as key and rest of booking data as value to the hashmap
    if (!bookingsMap[stadium]) {
      bookingsMap[stadium] = [];
    }
    bookingsMap[stadium].push(bookingData);
  });
  //console.log({ bookings: bookingsMap });
  res.status(200).json({ bookings: bookingsMap });
});

const getBookedSlotsForStadiumAtASpecificDay = asyncHandler(
  async (req, res) => {
    const { id, date } = req.params;
    if (!id || id.length !== 24) {
      return res.status(400).json({ message: "stadium id is required" });
    }
    const currentStadiumBookings = await Booking.find({
      stadium: new mongoose.Types.ObjectId(id),
      date: date,
    })
      .select("timeSlot -_id")
      .exec();
    res.status(200).json(currentStadiumBookings);
  }
);

const getActiveBookingsForUserByUserID = asyncHandler(async (req, res) => {
  const { user } = req.params;
  if (!user || user.length !== 24) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const confirmUser = await User.findById(user).exec();

  if (!confirmUser) {
    return res.status(404).json({ message: "User does not exist" });
  }

  const userBookings = await Booking.find({
    user: new mongoose.Types.ObjectId(user),
  })
    .lean()
    .exec();

  if (!userBookings || !userBookings.length) {
    return res
      .status(400)
      .json({ message: "No active bookings for this user" });
  }

  const configuredBookings = await Promise.all(
    userBookings.map(async (booking) => {
      const foundStadium = await Stadium.findById(booking.stadium)
        .select("name -_id")
        .exec();
      booking.stadium = foundStadium.name;
      return booking;
    })
  );

  res.status(200).json(configuredBookings);
});

//controller to add a new booking
const createNewBooking = asyncHandler(async (req, res) => {
  const { user, stadium, date, timeSlot } = req.body;
  const foundUser = await User.findById(user).select("-password").exec();
  const foundStadium = await Stadium.findById(stadium).exec();
  if (!foundStadium) {
    return res.status(400).json({ message: "Stadium does not exist!" });
  }
  if (!foundUser) {
    return res.status(400).json({ message: "User does not exist!" });
  }

  const duplicatedSlot = await Booking.findOne({
    stadium: new mongoose.Types.ObjectId(stadium),
    date,
    timeSlot,
  }).exec();

  if (duplicatedSlot) {
    return res.status(409).json({ message: "This date is already booked!" });
  }

  const newBookObject = {
    user,
    stadium,
    date,
    timeSlot,
  };

  await Booking.create(newBookObject);

  req.user = foundUser;
  req.stadium = foundStadium;
  successfulCheckoutNotification(req, res);

  res
    .status(200)
    .json({ sucesss: true, message: "Slot has been Booked successfully!" });
});

const deleteActiveBooking = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const booking = await Booking.findById(id).exec();
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  const bookingDeleteMessage = `Booking of id ${id} for user ${booking.user} has been deleted`;
  await Booking.findByIdAndDelete(id).exec();

  res.status(200).json({ success: true, message: bookingDeleteMessage });
});

module.exports = {
  createNewBooking,
  deleteActiveBooking,
  getAllBookings,
  getBookedSlotsForStadiumAtASpecificDay,
  getActiveBookingsForUserByUserID,
  getStadiumsAndUsers,
};
