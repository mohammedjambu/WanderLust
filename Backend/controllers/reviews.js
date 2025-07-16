const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

// Create Review Route
module.exports.createReview = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }

  const newReview = new Review(req.body);
  newReview.author = req.user._id;
  newReview.listing = listing._id;

  await newReview.save();
  listing.reviews.push(newReview._id);
  await listing.save();

  res
    .status(201)
    .json({ message: "Review created successfully", review: newReview });
};

// Update Review Route
module.exports.updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  const updatedReview = await Review.findByIdAndUpdate(
    reviewId,
    { rating, comment },
    { new: true, runValidators: true }
  );

  if (!updatedReview) {
    return res.status(404).json({ error: "Review not found" });
  }

  res
    .status(200)
    .json({ message: "Review updated successfully", review: updatedReview });
};

// Delete Review Route
module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  res.status(200).json({ message: "Review deleted successfully" });
};

module.exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ author: req.user._id }).populate(
      "listing",
      "title"
    );
    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching user's reviews:", err);
    res.status(500).json({ error: "Failed to fetch your reviews." });
  }
};
