// controllers/listings.js
const Listing = require("../models/listing.js");
const geocodingClient = require("../utils/mapbox");



// Index Route
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  console.log("Fetched listings:", allListings.length);
  res.json(allListings);
};

// Show Route
module.exports.showListing = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("ID received:", id);
        const listing = await Listing.findById(id)
            .populate({
                path: "reviews",
                populate: {
                    path: "author",
                    select: "username avatar",
                },
            })
            .populate("owner", "username avatar createdAt");

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

        const listingData = {
            title: listing.title,
            description: listing.description,
            image: {
                url: listing.image.url,
                filename: listing.image.filename,
            },
            images: listing.images || [],
            category: listing.category,
            price: listing.price,
            location: listing.location,
            country: listing.country,
            reviews: listing.reviews.map((review) => ({
                id: review._id,
                name: review.author.username,
                avatar: review.author.avatar,
                rating: review.rating,
                comment: review.comment,
                date: review.createdAt.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                }),
            })),
            owner: {
                name: listing.owner.username,
                avatar: listing.owner.avatar,
                joinedYear: listing.owner.createdAt
                    ? new Date(listing.owner.createdAt).getFullYear()
                    : new Date().getFullYear(),
                rating: avgRating,
                reviewCount: listing.reviews.length,
            },
            propertyDetails: listing.propertyDetails,
            amenities: listing.amenities,
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