// routes/user.js
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");

const userController = require("../controllers/users.js");

// ✅ Import multer and your Cloudinary storage config
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Signup Route
router.route("/signup").post(wrapAsync(userController.signup));

// Login Route
router.post("/login", passport.authenticate("local"), userController.login);


// Current user route
router.get("/current-user", (req, res) => {
  // `req.user` is automatically populated by Passport from the session if the user is logged in.
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    // If not authenticated, send null.
    res.status(200).json({ user: null });
  }
});

// Logout Route
router.post("/logout", userController.logout);

// ✅ Check login status route
router.get("/check", (req, res) => {
  res.json({ loggedIn: req.isAuthenticated() });
});

// Update User Profile Route
router.put(
  "/profile",
  isLoggedIn,
  upload.single("avatar"), // Use multer middleware here
  userController.updateProfile
)
module.exports = router;