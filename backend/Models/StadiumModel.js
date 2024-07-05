const mongoose = require("mongoose");
const shiftTimeStamps = require("../middlewares/shiftTimeStamps.js");

const StadiumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  card_image: {
    type: String,
    match: /\.(jpg|jpeg|png|gif)$/,
    default: "https://i.imgur.com/SkeBXvM.jpeg",
  },
  grassType: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  players: { type: Number, required: true },
  description: { type: String, required: true },
  googleCoordinates: { type: String, required: true },
  starting_hour: { type: String, required: true },
  ending_hour: { type: String, required: true },
  slots: { type: Array, required: true },
  indoor_outdoor: { type: String, required: true },
  toilets: { type: String, required: true },
  ball: { type: String, required: true },
  shirts: { type: String, required: true },
  fee: { type: String, required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  isBanned: { type: Boolean, default: false },
  submitedRatings: { type: Array, required: false, default: [] },
});

StadiumSchema.plugin(shiftTimeStamps);
module.exports = mongoose.model("stadiums", StadiumSchema);
