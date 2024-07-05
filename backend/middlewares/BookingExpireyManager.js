const mongoose = require("mongoose");
const Booking = require("../models/BookingModel.js");
const asyncHandler = require("express-async-handler");

const BookingStatusManager = asyncHandler(async (req, res, next) => {
  const currentTime = new Date();

  const bookings = await Booking.find({ isExpired: false });
  for (const booking of bookings) {
    try {
      // parsing extracted data
      const bookingDate = new Date(booking.date);
      const [startTimeStr, endTimeStr] = booking.timeSlot.split(" to ");

      // Ensure correct time format
      const [startHoursStr, startMinutesStrWithPeriod] =
        startTimeStr.split(":");
      let startHours = parseInt(startHoursStr, 10);
      const [startMinutesStr, startPeriod] =
        startMinutesStrWithPeriod.split(" ");
      const startMinutes = parseInt(startMinutesStr, 10);

      // Adjust hours based on AM/PM
      if (startPeriod === "PM" && startHours !== 12) {
        startHours += 12;
      } else if (startPeriod === "AM" && startHours === 12) {
        startHours = 0;
      }

      // Calculate start timestamp
      const startTimestamp = new Date(
        bookingDate.getFullYear(),
        bookingDate.getMonth(),
        bookingDate.getDate(),
        startHours,
        startMinutes
      ).getTime();

      // Compare with current timestamp
      if (currentTime.getTime() >= startTimestamp) {
        booking.isExpired = true;
        await booking.save();
      }
    } catch (error) {
      console.error(`Error processing booking ${booking._id}: `, error);
    }
  }

  next();
});

module.exports = BookingStatusManager;
