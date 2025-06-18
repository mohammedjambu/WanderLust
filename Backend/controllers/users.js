const User = require("../models/user.js");

// Signup controller
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });

    const registeredUser = await User.register(newUser, password); // Passport-local-mongoose
    req.login(registeredUser, (err) => {
      if (err) return next(err);

      res.status(201).json({
        success: true,
        message: "Signup successful",
        user: {
          id: registeredUser._id,
          username: registeredUser.username,
          email: registeredUser.email,
        },
      });
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

// Login controller
module.exports.login = async (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

// Logout controller
module.exports.logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax", // or "None" if using cross-site cookies
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({ success: true, message: "Logged out" });
  } catch (err) {
    console.error("Logout Error:", err);
    return res.status(500).json({ success: false, message: "Logout failed" });
  }
};
