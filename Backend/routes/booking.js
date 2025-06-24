// routes/booking.js
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const bookingController = require("../controllers/bookings");
const { isLoggedIn } = require("../middleware");

router.post("/", isLoggedIn, wrapAsync(bookingController.createBooking));

router.get(
  "/mine",
  isLoggedIn, // Make sure user is authenticated
  wrapAsync(bookingController.getUserBookings)
);

router.get(
  "/unavailable/:listingId",
  wrapAsync(bookingController.getUnavailableDates)
);


router.delete(
  "/:id",
  isLoggedIn,
  wrapAsync(bookingController.cancelBooking)
);


module.exports = router;