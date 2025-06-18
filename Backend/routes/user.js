const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js")

// router.route is used to combine common routes of requests

// Creating user signup routes
router.route("/signup").post(wrapAsync(userController.signup));




// Creating user login route
router.post("/login", passport.authenticate("local"), userController.login);


router.get("/api/auth/current-user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});




// Logout route
router.get("/logout", userController.logout);









module.exports = router;