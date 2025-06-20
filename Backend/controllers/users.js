// controllers/users.js
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