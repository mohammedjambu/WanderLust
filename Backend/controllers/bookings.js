const Booking = require("../models/booking");
const Listing = require("../models/listing");
const { differenceInCalendarDays } = require("date-fns");

module.exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate(
      "listing"
    );
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching user's bookings:", err);
    res.status(500).json({ error: "Failed to fetch your bookings." });
  }
};

const SERVICE_FEE_PERCENTAGE = 0.08;
const TAX_PERCENTAGE = 0.08;

module.exports.createBooking = async (req, res) => {
  try {
    const { listingId, checkIn, checkOut, guests } = req.body;
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const nights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
    if (nights <= 0) {
      return res
        .status(400)
        .json({ message: "Check-out date must be after check-in date" });
    }

    const subtotal = listing.price * nights;
    const serviceFee = Math.round(subtotal * SERVICE_FEE_PERCENTAGE);
    // It's better to calculate tax on the subtotal + service fee
    const taxes = Math.round((subtotal + serviceFee) * TAX_PERCENTAGE);
    const totalPrice =
      subtotal + (listing.cleaningFee || 0) + serviceFee + taxes;

    const booking = new Booking({
      listing: listingId,
      user: req.user._id,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    });

    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getUnavailableDates = async (req, res) => {
  const { listingId } = req.params;

  try {
    const bookings = await Booking.find({ listing: listingId });

    const unavailableRanges = bookings.map((booking) => ({
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
    }));

    res.json(unavailableRanges);
  } catch (err) {
    console.error("Unavailable date error:", err);
    res.status(500).json({ message: "Error fetching unavailable dates" });
  }
};

module.exports.cancelBooking = async (req, res) => {
  const bookingId = req.params.id;
  const userId = req.user._id;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (!booking.user.equals(userId)) {
      return res
        .status(403)
        .json({ message: "Unauthorized to cancel this booking" });
    }

    await Booking.findByIdAndDelete(bookingId);

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (err) {
    console.error("Cancel Booking Error:", err);
    res.status(500).json({ message: "Server error during cancellation" });
  }
};
