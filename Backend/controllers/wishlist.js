// controllers/wishlist.js
const User = require("../models/user");
const Listing = require("../models/listing");

module.exports.getWishlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  res.json(user.wishlist);
};

module.exports.toggleWishlistItem = async (req, res) => {
  const userId = req.user._id;
  const { listingId } = req.params;

  const user = await User.findById(userId);

  const index = user.wishlist.findIndex(id => id.toString() === listingId);

  if (index === -1) {
    user.wishlist.push(listingId); // Add to wishlist
    await user.save();
    return res.status(200).json({ added: true });
  } else {
    user.wishlist.splice(index, 1); // Remove from wishlist
    await user.save();
    return res.status(200).json({ removed: true });
  }
};
