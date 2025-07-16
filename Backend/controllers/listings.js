const Listing = require("../models/listing.js");
const geocodingClient = require("../utils/mapbox");
const { cloudinary } = require("../cloudConfig.js");

// Index Route
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
      query.category = new RegExp(`^${category}$`, "i");
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
      .populate("owner");

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

    const ownerObject = listing.owner ? listing.owner.toObject() : null;
    if (ownerObject) {
      ownerObject.rating = avgRating;
    }

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
      geometry: listing.geometry,
      propertyDetails: listing.propertyDetails,
      amenities: listing.amenities,
      reviews: listing.reviews,
      owner: ownerObject,
    };

    res.json(listingData);
  } catch (err) {
    console.error("Error in showListing:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Create Route
module.exports.createListing = async (req, res, next) => {
  try {
    const geoResponse = await geocodingClient
      .forwardGeocode({ query: req.body.location, limit: 1 })
      .send();

    if (!geoResponse.body.features.length) {
      return res.status(400).json({
        message: "Invalid location. Please enter a valid city or address.",
      });
    }
    const geoData = geoResponse.body.features[0];

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

    const mappedImages = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));

    const newListing = new Listing({
      title,
      description,
      price: parseFloat(price),
      location,
      country,
      category,
      geometry: geoData.geometry,
      owner: req.user._id,
      images: mappedImages,
      image: mappedImages[0] || undefined,
      propertyDetails,
      amenities,
    });

    const savedListing = await newListing.save();

    const populatedListing = await Listing.findById(savedListing._id).populate(
      "owner"
    );

    res.status(201).json({
      success: true,
      message: "Listing created successfully!",
      listing: populatedListing,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "A listing with this title already exists." });
    }
    console.error(" Error in createListing:", err);
    next(err);
  }
};

// Update Route
module.exports.updateListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    listing.title = req.body.title;
    listing.description = req.body.description;
    listing.price = req.body.price;
    listing.location = req.body.location;
    listing.country = req.body.country;
    listing.category = req.body.category;
    listing.propertyDetails = req.body.propertyDetails;
    listing.amenities = req.body.amenities;

    if (req.files && req.files.length > 0) {
      if (listing.images && listing.images.length > 0) {
        console.log("Deleting old images from Cloudinary...");
        for (const oldImage of listing.images) {
          await cloudinary.uploader.destroy(oldImage.filename);
        }
      }

      const newImages = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
      }));

      listing.images = newImages;
      listing.image = newImages[0];
    }

    const updatedListing = await listing.save();

    res.status(200).json({
      success: true,
      message: "Listing updated successfully!",
      listing: updatedListing,
    });
  } catch (err) {
    console.error(" Error in updateListing:", err);
    next(err);
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

    if (listing.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this listing" });
    }

    await Listing.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Listing deleted successfully" });
  } catch (err) {
    console.error("Error in destroyListing:", err);
    res
      .status(500)
      .json({ error: "Something went wrong while deleting the listing." });
  }
};

// Amenities Section
module.exports.addAllAmenities = async (req, res) => {
  try {
    const predefinedAmenities = [
      { name: "Free WiFi", icon: "🌐" },
      { name: "Air Conditioning", icon: "❄️" },
      { name: "Free Parking", icon: "🅿️" },
      { name: "Full Kitchen", icon: "🍳" },
      { name: "Private Pool", icon: "🏊" },
      { name: "Pet Friendly", icon: "🐾" },
      { name: "TV", icon: "📺" },
      { name: "Washer", icon: "🧺" },
      { name: "Heating", icon: "🔥" },
      { name: "First Aid Kit", icon: "⛑️" },
    ];

    const result = await Listing.updateMany(
      {}, 
      { $set: { amenities: predefinedAmenities } }
    );

    res.status(200).json({
      success: true,
      message: `Successfully updated ${result.modifiedCount} listings.`,
    });
  } catch (err) {
    console.error("Error adding amenities to all listings:", err);
    res.status(500).json({ error: "Failed to update listings." });
  }
};
