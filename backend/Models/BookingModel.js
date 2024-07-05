const shiftTimeStamps = require("../middlewares/shiftTimeStamps.js");
const mongoose = require("mongoose");

// Your schema definition
const BookingSchema = new mongoose.Schema(
  {
    user: mongoose.Schema.Types.ObjectId,
    stadium: mongoose.Schema.Types.ObjectId,
    stadium_id: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    isExpired: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.plugin(shiftTimeStamps);

module.exports = mongoose.model("bookings", BookingSchema);
