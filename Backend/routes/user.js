// routes/user.js
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

// Signup Route
router.route("/signup").post(wrapAsync(userController.signup));

// Login Route
router.post("/login", passport.authenticate("local"), userController.login);

// Current User Route
router.get("/current-user", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.json({ user: null });
    }
    const user = await User.findById(req.session.userId).select("-password"); // Exclude sensitive data
    res.json({ user: user || null });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Logout Route
router.get("/logout", userController.logout);

// ✅ Check login status route
router.get("/check", (req, res) => {
  res.json({ loggedIn: req.isAuthenticated() });
});

module.exports = router;