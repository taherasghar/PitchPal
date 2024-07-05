const mongoose = require("mongoose");
const HostFormModel = require("../models/HostFormModel.js");
const User = require("../models/UsersModel.js");
const asyncHandler = require("express-async-handler");
const {
  successfulHostFormApplication,
} = require("../middlewares/notifications.js");
const getAllForms = asyncHandler(async (req, res) => {
  const forms = await HostFormModel.find().lean();

  if (!forms?.length) {
    return res.status(400).json({ message: "No forms found" });
  }
  const formsWithUserData = await Promise.all(
    forms.map(async (form) => {
      const user = await User.findOne(
        { _id: { $eq: form.user } },
        { createdAt: 0, updatedAt: 0 }
      )
        .select("-password -_id -city -phone")
        .lean()
        .exec();
      return { ...form, ...user };
    })
  );
  res.status(200).json(formsWithUserData);
});

const getFormById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Host Form id is required!" });
  }
  const form = await HostFormModel.findById(id).exec();
  if (!form) {
    return res.status(404).json({ message: "Host Form not found" });
  }

  form.user = await User.findOne(
    { _id: { $eq: form.user } },
    { createdAt: 0, updatedAt: 0 }
  )
    .select("-password -_id")
    .lean()
    .exec();

  res.status(200).json(form);
});

const createNewForm = asyncHandler(async (req, res) => {
  const { user, phone, pitch, city, price, players, grassType, description } =
    req.body;
  if (
    !user ||
    !phone ||
    !pitch ||
    !city ||
    !price ||
    !players ||
    !grassType ||
    !description
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const confirmUser = await User.findById(user).select("-password").exec();

  if (!confirmUser) {
    return res.status(404).json({ message: "User not found!" });
  }

  const duplicateUserForm = await HostFormModel.findOne({ user }).lean().exec();

  if (duplicateUserForm) {
    return res
      .status(409)
      .json({ message: "Already sent a recent form, currently in process..." });
  }

  const hostForm = {
    user,
    phone,
    pitch,
    city,
    price,
    players,
    grassType,
    description,
  };

  // Create and store new user
  const createdHostForm = await HostFormModel.create(hostForm);

  if (createdHostForm) {
    req.user = confirmUser;
    req.form = createdHostForm;
    successfulHostFormApplication(req, res);
    res.status(201).json({
      message: `New Host Form for pitch named : ${pitch} | for user ${user} created successfully`,
    });
  } else {
    res.status(400).json({ message: "form data was not saved" });
  }
});

const deleteForm = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (!ids || !ids.length) {
    return res.status(400).json({ message: "Form IDs are required" });
  }

  const formsToDelete = await HostFormModel.find({
    _id: { $in: ids },
  });

  if (!formsToDelete || formsToDelete.length === 0) {
    return res.status(400).json({ message: "Forms not found" });
  }

  await HostFormModel.deleteMany({ _id: { $in: ids } });

  const reply = `Forms of ids equal to ${ids} have been deleted successfully!`;
  res.status(200).json(reply);
});

module.exports = { getAllForms, createNewForm, deleteForm, getFormById };
