const Listing = require("./models/listing"); // Import the Listing model
const Review = require("./models/review"); 
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){     //passport method used to authenticate if a user is logged in
        //redirect url
        req.session.redirectUrl = req.originalUrl;    // Original url is the url that the user is trying to access before logging in
        req.flash("error", "You must be logged in to create a new listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have permission to edit")
        return  res.redirect(`/listings/${id}`);
    }
    next();
}


// Printing errors for listing
module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);   //validate joi schema
    if(error) {
        let errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}


// Printing errors for reviews
module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);   //validate joi schema
    if(error) {
        let errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}


module.exports.isReviewAuthor = async (req, res, next) => {
    let {reviewId, id} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review")
        return  res.redirect(`/listings/${id}`);
    }
    next();
}