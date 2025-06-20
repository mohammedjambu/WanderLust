// models/review.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  authorName: {
    // Store name from data.js
    type: String,
  },
  avatar: {
    // Store avatar from data.js
    type: String,
  },
  reviewDate: {
    // Store date string from data.js
    type: String,
  },
});

module.exports = mongoose.model("Review", reviewSchema);