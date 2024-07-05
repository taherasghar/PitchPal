const mongoose = require("mongoose");
const shiftTimeStamps = require("../middlewares/shiftTimeStamps.js");

const HostFormSchema = new mongoose.Schema(
  {
    user: mongoose.Schema.Types.ObjectId,

    phone: {
      type: String,
      required: true,
    },
    pitch: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    players: {
      type: Number,
      required: true,
    },
    grassType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

HostFormSchema.plugin(shiftTimeStamps);

module.exports = mongoose.model("HostForm", HostFormSchema);
