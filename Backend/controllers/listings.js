const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });



// Index Route
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.json(allListings);
};

// New Route
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

//Show Route
module.exports.showListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");

    if (!listing) {
      return res.status(404).json({ error: "Listing does not exist!" });
    }

    res.json(listing); // ✅ Send JSON to frontend
  } catch (err) {
    console.error("Error in showListing:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};


//Create Route
module.exports.createListing = async (req, res, next) => {
  try {
    const geoResponse = await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    }).send();

    const { title, description, price, location, country, category } = req.body.listing;

    const newListing = new Listing({
      title,
      description,
      price: parseFloat(price),
      location,
      country,
      category, // <- Add category here explicitly
      geometry: geoResponse.body.features[0].geometry,
      owner: req.user._id,
      // owner: "test-user-id",
      image: {
        url: req.file.path,
        filename: req.file.filename,
      },
    });

    const savedListing = await newListing.save();
    console.log(savedListing);

    res.status(201).json({ success: true, message: "Listing created", listing: savedListing });
   

  } catch (err) {
    next(err); // good practice to forward errors to error handler
  }
};



module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing does not exist!");
        res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", {listing, originalImageUrl });
}

//Update Route
module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    req.flash("success", "Listing Updated!")
    res.redirect(`/listings/${id}`);
};

//Delete Route
module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!")
    res.redirect("/listings");
};
