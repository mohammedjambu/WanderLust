const User = require("../models/user.js");

// Creating user signup routes
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs")  
}

module.exports.signup = async(req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser)
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!")
            res.redirect("/listings");
        })
    } catch(e) {
        req.flash("error", e.message)
        res.redirect("/signup");
    }
    
}

// Creating user login route
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs")
};

module.exports.login = async(req, res) => {
    req.flash("success", "Welcome to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

// Creating user logout route
module.exports.logout = (req, res) => {
    req.logout((err) => {       //req.logout is already a function in passport for user logout
        if (err) { 
            return next(err);
        }
        req.flash("success", "Logged out successfully");
        res.redirect("/listings");
    });
}

