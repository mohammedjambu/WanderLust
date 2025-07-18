const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const { cloudinary } = require("../cloudConfig.js");

const mongoose = require("mongoose");
const { data } = require("./data.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const MONGO_URL = process.env.ATLASDB_URL;

// IMPORTANT: Find a real user ID from your MongoDB 'users' collection and paste it here.
const DEFAULT_OWNER_ID = "PASTE_A_REAL_OWNER_ID_FROM_YOUR_LIVE_DB_HERE";
const REVIEWER_USER_ID = "PASTE_A_DIFFERENT_REVIEWER_ID_FROM_YOUR_LIVE_DB_HERE";

const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "wanderlust_PROD", 
    });
    return {
      url: result.secure_url,
      filename: result.public_id,
    };
  } catch (error) {
    console.error(`Error uploading image: ${filePath}`, error);
    return {
      url: "https://via.placeholder.com/300.png?text=Image+Upload+Failed",
      filename: "upload_failed"
    };
  }
};

async function main() {
  if (!MONGO_URL) {
    console.error("FATAL ERROR: ATLASDB_URL is not defined in your .env file.");
    return;
  }
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to Atlas DB for seeding.");
    await initDB();
  } catch (err) {
    console.error("Database initialization error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Database connection closed.");
  }
}

const initDB = async () => {
  if (
    !DEFAULT_OWNER_ID.match(/^[0-9a-fA-F]{24}$/) ||
    !REVIEWER_USER_ID.match(/^[0-9a-fA-F]{24}$/)
  ) {
    console.error(
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    console.error(
      "!!! FATAL ERROR: One or both of the required user IDs are invalid. !!!"
    );
    console.error(
      "!!! Please paste real user IDs from your database into      !!!"
    );
    console.error(
      "!!! DEFAULT_OWNER_ID and REVIEWER_USER_ID.                !!!"
    );
    console.error(
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    return;
  }

  console.log("Clearing existing listings and reviews...");
  await Listing.deleteMany({});
  await Review.deleteMany({});

  console.log("Starting to seed new data...");

  for (const listingData of data) {
    console.log(`Uploading images for: ${listingData.title}`);
    const mainImage = await uploadImage(listingData.image.url);
    const extraImages = await Promise.all(
      listingData.images.map(image => uploadImage(image.url))
    );

    const newListing = new Listing({
      title: listingData.title,
      description: listingData.description,
      price: listingData.price,
      location: listingData.location,
      country: listingData.country,
      geometry: listingData.geometry,
      category: listingData.category,
      propertyDetails: listingData.propertyDetails,
      amenities: listingData.amenities,
      image: mainImage,      
      images: extraImages,  
      owner: DEFAULT_OWNER_ID,
      reviews: [],
    });

    // Create associated reviews
    if (listingData.reviews && listingData.reviews.length > 0) {
      const reviewIds = await Promise.all(
        listingData.reviews.map(async (reviewData) => {
          const newReview = new Review({
            comment: reviewData.comment,
            rating: reviewData.rating,
            author: REVIEWER_USER_ID,
            listing: newListing._id,
          });
          await newReview.save();
          return newReview._id;
        })
      );
      newListing.reviews = reviewIds;
    }

    await newListing.save();
    console.log(`-> Successfully seeded: ${newListing.title}`);
  }

  console.log("Data was successfully initialized!");
};

main();
