// controllers/wishlist.js
const User = require("../models/user");
const Listing = require("../models/listing");

module.exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(user.wishlist);
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).json({ error: "Failed to fetch wishlist." });
  }
};

module.exports.toggleWishlistItem = async (req, res) => {
  try {
    const { listingId } = req.params;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const index = user.wishlist.indexOf(listingId);

    if (index > -1) {
      await user.updateOne({ $pull: { wishlist: listingId } });
      user.wishlist.pull(listingId);
      res
        .status(200)
        .json({
          success: true,
          removed: true,
          message: "Removed from wishlist.",
        });
    } else {
      await user.updateOne({ $addToSet: { wishlist: listingId } });
      user.wishlist.addToSet(listingId);
      res
        .status(200)
        .json({ success: true, added: true, message: "Added to wishlist." });
    }
  } catch (err) {
    console.error("Error in toggleWishlist:", err);
    res.status(500).json({ error: "Server error while updating wishlist." });
  }
};
