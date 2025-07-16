const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");
const wishlistController = require("../controllers/wishlist");

// Get all wishlist listings
router.get("/", isLoggedIn, wrapAsync(wishlistController.getWishlist));

router.post(
  "/toggle/:listingId",
  isLoggedIn,
  wrapAsync(wishlistController.toggleWishlistItem)
);

module.exports = router;
