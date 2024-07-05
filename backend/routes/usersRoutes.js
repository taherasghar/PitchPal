const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/usersControllers.js");
const verifyJWT = require("../middlewares/verifyJWT.js");
const verifyAdmin = require("../middlewares/verifyAdmin.js");

router
  .route("/")
  .get(verifyJWT, verifyAdmin, usersControllers.getAllUsers)
  .post(usersControllers.createNewUser)
  .patch(verifyJWT, usersControllers.updateUser)
  .delete(verifyJWT,verifyAdmin, usersControllers.deleteUser);

router.route("/:id").get(verifyJWT, usersControllers.getUserById);

router
  .route("/checkusername")
  .post(verifyJWT, usersControllers.checkUserNameAvailability);

  router
  .route("/changepassword")
  .post(verifyJWT, usersControllers.changePassword);

  router
  .route("/ban-user-by-id")
  .post(verifyJWT,verifyAdmin, usersControllers.banUserById);
  router
  .route("/unban-user-by-id")
  .post(verifyJWT,verifyAdmin, usersControllers.unBanUserById);
module.exports = router;
