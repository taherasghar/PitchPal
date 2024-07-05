const express = require("express");
const router = express.Router();
const stadiumsRouteControllers = require("../controllers/stadiumsControllers.js");
const verifyJWT = require("../middlewares/verifyJWT.js");
const verifyAdmin = require("../middlewares/verifyAdmin.js");

router
  .route("/")
  .get(stadiumsRouteControllers.getAllStadiumsForExplore)
  .post(verifyJWT, verifyAdmin, stadiumsRouteControllers.addNewStadium)
  .delete(verifyJWT, verifyAdmin, stadiumsRouteControllers.deleteStadium);
router
  .route("/:id")
  .put(verifyJWT, verifyAdmin, stadiumsRouteControllers.updateStadium);

router
  .route("/get-stadiums-for-admin-dashboard")
  .get(verifyJWT, verifyAdmin, stadiumsRouteControllers.getAllStadiums);
router.route(`/results/?`).get(stadiumsRouteControllers.getSearchResults);

router.get("/cities", stadiumsRouteControllers.getStadiumsCities);

router
  .route("/ban-stadium-by-id")
  .post(verifyJWT, verifyAdmin, stadiumsRouteControllers.banStadiumById);

router
  .route("/submit-rating")
  .post(verifyJWT, stadiumsRouteControllers.submitStadiumRating);

router
  .route("/:stadiumId/ratings/:userId")
  .get(verifyJWT, stadiumsRouteControllers.getUserRating);

router
  .route("/suggestions")
  .get(stadiumsRouteControllers.fetchSearchSuggestions);

router
  .route("/unban-stadium-by-id")
  .post(verifyJWT, verifyAdmin, stadiumsRouteControllers.unBanStadiumById);
module.exports = router;
