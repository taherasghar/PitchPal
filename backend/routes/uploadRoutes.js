const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT.js");
const {
  uploadprofile,
  uploadProfilePicture,
  deleteProfilePicture,
  getProfilePictureByUserId,
  uploadCard,
  uploadCardImage,
} = require("../controllers/uploadControllers.js");

router.use(verifyJWT);
router
  .route("/profile")
  .post(uploadprofile.single("profilePicture"), uploadProfilePicture)
  .delete(deleteProfilePicture);

router
  .route("/card-image")
  .post(uploadCard.single("cardImage"), uploadCardImage)
  .delete();

router.route("/profilepicture/:id").get(getProfilePictureByUserId);
module.exports = router;
