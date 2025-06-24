// models/listing.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const validCategories = [
  "Villa",
  "Farm House",
  "Pool House",
  "Rooms",
  "Flat",
  "PG",
  "Cabin",
  "Shops",
  "Trending",
];

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  price: Number,
  location: String,
  country: String,
  category: {
    type: String,
    enum: validCategories,
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  propertyDetails: {
    guests: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
  },
  amenities: [
    {
      name: {
        type: String,
        required: true,
      },
      icon: String,
    },
  ],
  hostDetails: {
    // New field to store owner metadata from data.js
    name: String,
    avatar: String,
    joinedYear: Number,
    rating: Number,
    reviewCount: Number,
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;