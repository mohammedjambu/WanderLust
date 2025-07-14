const Listing = require("./models/listing");
const Review = require("./models/review"); 
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");


module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {       //passport method used to authenticate if a user is logged in
    return res.status(401).json({ error: "You must be logged in" });
  }
  next();
};


module.exports.parseFormDataFields = (req, res, next) => {
  if (req.body) {
    const jsonFields = ['propertyDetails', 'amenities'];
    const numberFields = ['price'];

    jsonFields.forEach(field => {
      if (req.body[field]) {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch (e) {
          console.error(`Failed to parse JSON field "${field}":`, e);
          return res.status(400).json({ error: `Invalid format for field: ${field}` });
        }
      }
    });

    numberFields.forEach(field => {
      if (req.body[field]) {
        const parsedValue = parseFloat(req.body[field]);
        if (!isNaN(parsedValue)) {
          req.body[field] = parsedValue;
        } else {
          console.error(`Failed to parse number field "${field}". Value:`, req.body[field]);
        }
      }
    });
  }
  next();
};


module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(req.user._id)) {
        return res.status(403).json({ error: "You don't have permission to edit this listing." });
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
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review) {
    return res.status(404).json({ error: "Review not found." });
  }

  if (!review.author.equals(req.user._id)) {
    return res.status(403).json({ error: "You are not the author of this review." });
  }
  next();
};