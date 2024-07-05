const express = require("express");
const router = express.Router();
const hostFormControllers = require("../controllers/hostFormControllers.js");

router
  .route("/")
  .get(hostFormControllers.getAllForms)
  .post(hostFormControllers.createNewForm)
  .delete(hostFormControllers.deleteForm);

router.route("/:id").get(hostFormControllers.getFormById);
module.exports = router;
