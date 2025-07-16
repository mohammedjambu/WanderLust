const User = require("../models/user.js");

// Signup Controller
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });

    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);

      res.status(201).json({
        success: true,
        message: "Signup successful",
        user: {
          id: registeredUser._id,
          username: registeredUser.username,
          email: registeredUser.email,
          avatar: registeredUser.avatar,
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

// Login Controller
module.exports.login = async (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    },
  });
};

// Logout Controller
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.status(200).json({ success: true, message: "Logged out" });
  });
};

module.exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, hometown, phone, bio } = req.body;

    const updateData = {
      fullName,
      hometown,
      phone,
      bio,
    };

    if (req.file) {
      updateData.avatar = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-hash -salt");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
      message: "Profile updated successfully!",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Failed to update profile." });
  }
};
