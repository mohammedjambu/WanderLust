// init/index.js
const mongoose = require("mongoose");
const { data } = require("./data.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// IMPORTANT: Find a real user ID from your MongoDB 'users' collection and paste it here.
const DEFAULT_OWNER_ID = "67fca0b80d629e439a8c2a78";
const REVIEWER_USER_ID = "68776d1edf753e92fe51ec6d";

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB for seeding.");
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
    console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.error("!!! FATAL ERROR: One or both of the required user IDs are invalid. !!!");
    console.error("!!! Please paste real user IDs from your database into      !!!");
    console.error("!!! DEFAULT_OWNER_ID and REVIEWER_USER_ID.                !!!");
    console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    return;
  }
  
  console.log("Clearing existing listings and reviews...");
  await Listing.deleteMany({});
  await Review.deleteMany({});

  console.log("Starting to seed new data...");
  for (const listingData of data) {
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
      image: listingData.image, 
      images: listingData.images,
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
  }

  console.log("Data was successfully initialized!");
};

main();