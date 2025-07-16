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
    default: "https://wallpapers.com/images/hd/user-profile-avatar-login-account-male-user-icon-hd-png-download-lrue3mennq6knv5l.jpg",
  },
  fullName: {
    type: String,
    default: "", 
  },
  hometown: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  wishlist: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Listing'
    }],
    default: [] // This prevents crashes on users with no wishlist yet.
  }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
