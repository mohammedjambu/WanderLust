// routes/listing.js
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing, parseFormDataFields } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings");

// routes for my listings
router.get("/mine", isLoggedIn, wrapAsync(listingController.getMyListings));


router
  .route("/")
  // Index Route
  .get(wrapAsync(listingController.index))
  // Create Route
  .post(
    isLoggedIn,
    upload.array("images", 5),
    parseFormDataFields, 
    validateListing,
    wrapAsync(listingController.createListing)
  );

router
  .route("/:id")
  // Show Route
  .get(wrapAsync(listingController.showListing))
  // Update and Delete Route
  .put(
    isLoggedIn,
    isOwner,
    upload.array("images", 5),
    parseFormDataFields,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Add this new route definition
router.post("/add-all-amenities", listingController.addAllAmenities);


module.exports = router;
