// routes/booking.js
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const bookingController = require("../controllers/bookings");

router.post(
    "/",
    passport.authenticate("local", { session: false }),
    wrapAsync(bookingController.createBooking)
);

module.exports = router;