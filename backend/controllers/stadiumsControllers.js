const asyncHandler = require("express-async-handler");
const StadiumModel = require("../models/StadiumModel.js");
const path = require("path");
const fs = require("fs").promises;

const getAllStadiumsForExplore = asyncHandler(async (req, res) => {
  if (req.query.length > 0) {
    return res.status(400).json({ message: "Invalid Request" });
  }
  const stadiums = await StadiumModel.find({ isBanned: false }).lean();

  if (!stadiums?.length) {
    return res.status(400).json({ message: "No stadiums found" });
  }
  stadiums.forEach((std) => {
    if (!std.card_image.includes("i.imgur.com")) {
      const imagePath =
        `http://localhost:${process.env.PORT}/assets/cardImages/` +
        std.card_image;
      std.card_image = imagePath;
    }
  });
  res.json(stadiums);
});
const getAllStadiums = asyncHandler(async (req, res) => {
  if (req.query.length > 0) {
    return res.status(400).json({ message: "Invalid Request" });
  }
  const stadiums = await StadiumModel.find().lean();

  if (!stadiums?.length) {
    return res.status(400).json({ message: "No stadiums found" });
  }
  stadiums.forEach((std) => {
    if (!std.card_image.includes("i.imgur.com")) {
      const imagePath =
        `http://localhost:${process.env.PORT}/assets/cardImages/` +
        std.card_image;
      std.card_image = imagePath;
    }
  });
  res.json(stadiums);
});

const addNewStadium = asyncHandler(async (req, res) => {
  var {
    name,
    phoneNumber,
    city,
    players,
    grassType,
    address,
    slots,
    description,
    starting_hour,
    ending_hour,
    googleCoordinates,
    indoor_outdoor,
    toilets,
    ball,
    fee,
    shirts,
    rating,
  } = req.body;

  if (
    !name ||
    !city ||
    !address ||
    !fee ||
    !phoneNumber ||
    !players ||
    !grassType ||
    !address ||
    !description ||
    !starting_hour ||
    !ending_hour ||
    !slots ||
    !googleCoordinates ||
    !indoor_outdoor ||
    !toilets ||
    !ball ||
    !fee ||
    !shirts
  ) {
    return res.status(400).json({
      message: "All fields are required except rating and image",
    });
  }
  if (!Array.isArray(slots)) {
    return res.status(400).json({
      message: "Slots must be An Array",
    });
  }

  const duplicate = await StadiumModel.findOne({ name }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate stadium name" });
  }
  rating = 0;
  const newStadium = await StadiumModel.create({
    name,
    phoneNumber,
    city,
    players,
    grassType,
    address,
    description,
    starting_hour,
    ending_hour,
    slots,
    googleCoordinates,
    indoor_outdoor,
    toilets,
    ball,
    fee,
    shirts,
    rating,
  });

  if (newStadium) {
    // Created
    return res.status(201).json({ message: "New stadium created" });
  } else {
    return res.status(400).json({ message: "Invalid stadium data received" });
  }
});

const updateStadium = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { stadiumName, city, address, fee, phoneNumber, players, isBanned } =
    req.body;

  try {
    // Find the stadium by ID
    const stadium = await StadiumModel.findById(id);

    if (!stadium) {
      return res.status(404).json({ message: "Stadium not found" });
    }

    // Manually assign only the fields received from the edit modal
    if (stadiumName !== undefined) stadium.name = stadiumName;
    if (city !== undefined) stadium.city = city;
    if (address !== undefined) stadium.address = address;
    if (fee !== undefined) stadium.fee = fee;
    if (phoneNumber !== undefined) stadium.phoneNumber = phoneNumber;
    if (players !== undefined) stadium.players = players;
    if (isBanned !== undefined) stadium.isBanned = isBanned;

    // Save the updated stadium
    const updatedStadium = await stadium.save();

    res.status(200).json(updatedStadium);
  } catch (error) {
    console.error("Error updating stadium:", error);
    res.status(500).json({ message: "Server error, could not update stadium" });
  }
});

const deleteStadium = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (!ids || !ids.length) {
    return res.status(400).json({ message: "Stadium IDs are required" });
  }

  const stadiumsToDelete = await StadiumModel.find({
    _id: { $in: ids },
  });
  if (!stadiumsToDelete) {
    return res.status(400).json({ message: "Stadium not found" });
  }

  stadiumsToDelete.forEach(async (std) => {
    if (!std.card_image.includes("i.imgur.com")) {
      const imagePath = path.join(
        __dirname,
        "..",
        "assets",
        "cardImages",
        std.card_image
      );
      await fs.unlink(imagePath);
    }
  });

  await StadiumModel.deleteMany({ _id: { $in: ids } });

  const reply = `Stadium of ids equal to ${ids} have been deleted successfully!`;
  res.status(200).json(reply);
});

const getStadiumsCities = asyncHandler(async (req, res) => {
  const lebaneseCityNames = await StadiumModel.find({ isBanned: false })
    .distinct("city")
    .lean()
    .exec();
  lebaneseCityNames.sort();
  res.status(200).json(lebaneseCityNames);
});

const getSearchResults = asyncHandler(async (req, res) => {
  var search_query = req.query.stadium.toLowerCase(); // from the frontend search query // header section
  var city = req.query.city; // from the frontend selected city // header section
  //  i.imgur.com

  var stadiums = await StadiumModel.find({ isBanned: false }); //get stadiums from the database, will be filtered later

  stadiums.forEach((std) => {
    if (!std.card_image.includes("i.imgur.com")) {
      const imagePath =
        `http://localhost:${process.env.PORT}/assets/cardImages/` +
        std.card_image;
      std.card_image = imagePath;
    }
  });
  search_query = search_query.replace(/\s+/g, " ").trim(); //remove extra spaces

  if (city === "" && search_query === "") {
    res.json({ results: 0, search_query: search_query, selected_city: city });
  } else if (city !== "" && search_query === "") {
    stadiums = stadiums.filter((current) => current.city === city);
    res.json({
      results: stadiums.length,
      search_query: search_query,
      selected_city: city,
      stadiums,
    });
  } else if (search_query !== "" && city === "") {
    stadiums = stadiums.filter((current) =>
      current.name.toLowerCase().includes(search_query)
    );
    res.json({
      results: stadiums.length,
      search_query: search_query,
      selected_city: city,
      stadiums,
    });
  } else if (search_query !== "" && city !== "") {
    stadiums = stadiums.filter((current) =>
      current.name.toLowerCase().includes(search_query)
    );
    stadiums = stadiums.filter((current) => current.city === city);
    res.json({
      results: stadiums.length,
      search_query: search_query,
      selected_city: city,
      stadiums,
    });
  }
});

const banStadiumById = asyncHandler(async (req, res) => {
  const id = req.body.id;

  if (!id) {
    return res.status(404).json({ message: "Stadium id is required" });
  }
  // Find the stadium by ID
  const stadium = await StadiumModel.findById(id);

  if (!stadium) {
    // If stadium is not found, send a 404 Not Found response
    return res.status(404).json({ message: "Stadium not found" });
  }
  if (stadium?.isBanned === true) {
    return res.status(400).json({ message: "Stadium is already banned" });
  }

  // Update the stadium's isBanned attribute to true
  stadium.isBanned = true;

  // Save the updated stadium back to the database
  await stadium.save();

  // Send a success response
  res.status(200).json({
    message: `Stadium whose name is "${stadium.name}" and id "${stadium._id}" banned successfully`,
  });
});

const unBanStadiumById = asyncHandler(async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(404).json({ message: "Stadium id is required" });
  }
  // Find the stadium by ID
  const stadium = await StadiumModel.findById(id);

  if (!stadium) {
    // If stadium is not found, send a 404 Not Found response
    return res.status(404).json({ message: "stadium not found" });
  }
  if (stadium?.isBanned === false) {
    return res.status(400).json({ message: "stadium is already not banned" });
  }

  // Update the stadium's isBanned attribute to true
  stadium.isBanned = false;

  // Save the updated stadium back to the database
  await stadium.save();

  // Send a success response
  res.status(200).json({
    message: `Stadium whose name is "${stadium.name}" and id "${stadium._id}" unbanned successfully`,
  });
});

const fetchSearchSuggestions = asyncHandler(async (req, res) => {
  try {
    var results = await StadiumModel.find({}, { _id: 1, name: 1 });
    res.json(results);
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: "An error occurred while searching." });
  }
});

const submitStadiumRating = asyncHandler(async (req, res) => {
  const { stadiumId, userId, rating } = req.body;

  // Check if all required fields are present
  if (!stadiumId || !userId || !rating) {
    return res
      .status(400)
      .json({ message: "Stadium ID, user ID, and rating are required" });
  }

  // Validate rating value
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  // Find the stadium by ID
  const stadium = await StadiumModel.findById(stadiumId).exec();
  if (!stadium) {
    return res.status(404).json({ message: "Stadium not found" });
  }

  // Find if the user has already submitted a rating
  const existingRatingIndex = stadium.submitedRatings.findIndex(
    (r) => r.userId === userId
  );

  if (existingRatingIndex !== -1) {
    // User has already submitted a rating, update it
    stadium.submitedRatings[existingRatingIndex].userRating = rating;
  } else {
    // User has not submitted a rating, add a new one
    stadium.submitedRatings.push({ userId, userRating: rating });
  }

  // Calculate the new average rating
  const totalRatings = stadium.submitedRatings.length;
  const sumOfRatings = stadium.submitedRatings.reduce(
    (sum, r) => sum + r.userRating,
    0
  );
  stadium.rating = sumOfRatings / totalRatings;

  // Save the updated stadium
  await stadium.save();

  // Respond with a success message
  res.status(200).json({ message: "Rating submitted successfully" });
});

const getUserRating = asyncHandler(async (req, res) => {
  const { stadiumId, userId } = req.params;

  // Find the stadium by ID
  const stadium = await StadiumModel.findById(stadiumId).exec();
  if (!stadium) {
    return res.status(404).json({ message: "Stadium not found" });
  }

  // Find the user's rating
  const userRating = stadium.submitedRatings.find((r) => r.userId === userId);

  // Respond with the user's rating
  res
    .status(200)
    .json({ userRating: userRating ? userRating.userRating : null });
});

module.exports = {
  getStadiumsCities,
  getSearchResults,
  getAllStadiums,
  getAllStadiumsForExplore,
  addNewStadium,
  updateStadium,
  deleteStadium,
  banStadiumById,
  unBanStadiumById,
  fetchSearchSuggestions,
  submitStadiumRating,
  getUserRating,
};
