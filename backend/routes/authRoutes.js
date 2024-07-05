const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");

router.route("/").post(authControllers.login);

router.route("/refresh").get(authControllers.refresh);

router.route("/logout").post(authControllers.logout);

module.exports = router;
