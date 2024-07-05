const express = require("express");
const router = express.Router();
const bookingControllers = require("../controllers/bookingControllers.js");
const verifyJWT = require("../middlewares/verifyJWT.js");
const verifyAdmin = require("../middlewares/verifyAdmin.js");
const BookingExpireyManager = require("../middlewares/BookingExpireyManager.js");

router.use(verifyJWT);
router.use(BookingExpireyManager);

router
  .route("/")
  .get(verifyAdmin, bookingControllers.getAllBookings)
  .post(bookingControllers.createNewBooking)
  .delete(verifyAdmin, bookingControllers.deleteActiveBooking);


  router
  .route("/getStadiumsAndUsers")
  .get(verifyAdmin, bookingControllers.getStadiumsAndUsers)


router
  .route("/get-booked-slots-for-a-stadium/:id/:date")
  .get(bookingControllers.getBookedSlotsForStadiumAtASpecificDay);

router
  .route("/get-active-bookings-for-user/:user")
  .get(bookingControllers.getActiveBookingsForUserByUserID);
module.exports = router;
