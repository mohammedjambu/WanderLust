// models/user.js
const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.0&w=150&q=80",
  },
  fullName: {
    type: String,
    default: "",
    required: true,
  },
  hometown: {
    type: String,
    default: "",
    required: true
  },
  phone: {
    type: String,
    default: "",
    required: true
  },
  bio: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  wishlist: [ 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    }
  ],
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
