const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// Post route - Create a new review
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// ✅ ADD THIS NEW ROUTE: Update an existing review
router.put(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  validateReview,
  wrapAsync(reviewController.updateReview)
);

// Delete route - Delete a review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);


module.exports = router;