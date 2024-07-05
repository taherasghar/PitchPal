const express = require("express");
const rootRouteControllers = require("../controllers/rootControllers.js");
const router = express.Router();

router.route("/").get(rootRouteControllers.getRoot);

module.exports = router;
