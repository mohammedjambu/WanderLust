// controllers/listings.js
const Listing = require("../models/listing.js");
const geocodingClient = require("../utils/mapbox");



// Index Route
// Index Route with Search + Filter Support
module.exports.index = async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = new RegExp(`^${category}$`, "i"); // case-insensitive match
    }

    console.log("Query params:", { search, category });
    console.log("Mongo query object:", query);

    const listings = await Listing.find(query);
    console.log("Filtered listings:", listings.length);

    res.json(listings);
  } catch (err) {
    console.error("Error in index:", err);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
};



// Show Route
module.exports.showListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
          // This ensures the author's ID is available on the frontend
          select: "username avatar _id",
        },
      })
      .populate("owner", "username avatar createdAt _id");

    if (!listing) {
      return res.status(404).json({ error: "Listing does not exist!" });
    }

    const avgRating =
      listing.reviews.length > 0
        ? (
            listing.reviews.reduce((sum, review) => sum + review.rating, 0) /
            listing.reviews.length
          ).toFixed(1)
        : 0;

    // This is the final data object sent to the frontend
    const listingData = {
      _id: listing._id,
      title: listing.title,
      description: listing.description,
      image: listing.image,
      images: listing.images || [],
      category: listing.category,
      price: listing.price,
      location: listing.location,
      country: listing.country,
      propertyDetails: listing.propertyDetails,
      amenities: listing.amenities,
      
      // ✅ FIX: The populated reviews array was missing from the response.
      // We are adding it back here.
      reviews: listing.reviews, 

      owner: {
        _id: listing.owner._id,
        name: listing.owner.username,
        avatar: listing.owner.avatar,
        joinedYear: listing.owner.createdAt
          ? new Date(listing.owner.createdAt).getFullYear()
          : new Date().getFullYear(),
        rating: avgRating,
        reviewCount: listing.reviews.length,
      },
    };

    res.json(listingData);
  } catch (err) {
    console.error("Error in showListing:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Create Route
module.exports.createListing = async (req, res, next) => {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

  try {
    const geoResponse = await geocodingClient
      .forwardGeocode({
        query: req.body.location,
        limit: 1,
      })
      .send();

    const {
      title,
      description,
      price,
      location,
      country,
      category,
      propertyDetails,
      amenities,
    } = req.body;

    const images = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));

    const listing = new Listing({
      title,
      description,
      price: parseFloat(price),
      location,
      country,
      category,
      geometry: geoResponse.body.features[0].geometry,
      owner: req.user._id,
      images, // store all image objects
      image: images[0] || { url: "", filename: "" }, // main image for preview
      propertyDetails: propertyDetails, // Use the object directly
      amenities: amenities, 
    });

    const savedListing = await listing.save();

    res.status(201).json({
      success: true,
      message: "Listing created",
      listing: savedListing,
    });
  } catch (err) {
    console.error("❌ Error in createListing:", err);
    next(err);
  }
};

// Update Route
module.exports.updateListing = async (req, res) => {
    try {
        let { id } = req.params;
        // Merge file data into req.body for validation
        if (req.files && req.files.length > 0) {
            req.body.image = { url: req.files[0].path, filename: req.files[0].filename };
            req.body.images = req.files.map((file) => ({
                url: file.path,
                filename: file.filename,
            }));
        }

        const { propertyDetails, amenities, image, images } = req.body;
        let listing = await Listing.findByIdAndUpdate(id, {
            ...req.body,
            propertyDetails: propertyDetails,
            amenities: amenities,
            image,
            images,
        });

        await listing.save();
        res.status(200).json({
            success: true,
            message: "Listing updated",
            listing,
        });
    } catch (err) {
        console.error("Error in updateListing:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Get My Listings Route
module.exports.getMyListings = async (req, res) => {
  try {
    const userId = req.user._id;
    const myListings = await Listing.find({ owner: userId });

    res.status(200).json(myListings);
  } catch (err) {
    console.error("Error in getMyListings:", err);
    res.status(500).json({ error: "Failed to fetch your listings" });
  }
};



// Delete Route
module.exports.destroyListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    // This check is important and correctly placed. req.user is added by Passport.
    if (listing.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You are not authorized to delete this listing" });
    }
    
    await Listing.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Listing deleted successfully" });
  } catch (err) {
    console.error("Error in destroyListing:", err);
    res.status(500).json({ error: "Something went wrong while deleting the listing." });
  }
};