// controllers/bookings.js
const Booking = require("../models/booking");
const Listing = require("../models/listing");

module.exports.createBooking = async (req, res) => {
    try {
        const { listingId, checkIn, checkOut, guests } = req.body;
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
        if (nights <= 0) {
            return res.status(400).json({ message: "Check-out date must be after check-in date" });
        }

        const totalPrice = listing.price * nights + 75 + 89; // Cleaning + service fee

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