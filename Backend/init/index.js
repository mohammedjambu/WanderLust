// index.js
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connection successful");
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
}

const initDB = async () => {
  try {
    // Clear existing listings and reviews
    // await Listing.deleteMany({});
    // await Review.deleteMany({});
    // console.log("Cleared existing listings and reviews");

    const ownerId = "67fca0b80d629e439a8c2a78"; // Ensure this User exists

    // Prepare and insert listings with reviews
    const seededData = await Promise.all(
      initData.data.map(async (obj) => {
        // Create listing without reviews first
        const listing = await Listing.create({
          ...obj,
          reviews: [], // Temporarily empty
          owner: ownerId,
          hostDetails: obj.owner, // Store data.js owner details
        });

        // Create Review documents with listing ID
        const reviewIds = await Promise.all(
          (obj.reviews || []).map(async (review) => {
            const savedReview = await Review.create({
              comment: review.comment,
              rating: review.rating,
              date: review.date,
              name: review.name,
              avatar: review.avatar,
              author: ownerId, // Use listing owner as review author
              listing: listing._id, // Set listing ID
            });
            return savedReview._id;
          })
        );

        // Update listing with review IDs
        if (reviewIds.length > 0) {
          listing.reviews = reviewIds;
          await listing.save();
        }

        return listing;
      })
    );

    console.log("Data initialized successfully with", seededData.length, "listings");
  } catch (err) {
    console.error("Error initializing data:", err);
  } 
  // finally {
  //   await mongoose.disconnect();
  //   console.log("Database connection closed");
  //   process.exit(0);
  // }
};

main()
  .then(() => initDB())
  .catch((err) => {
    console.error("Initialization failed:", err);
    process.exit(1);
  });