// joi npm package
// It is used to apply validation to individual fields.

const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  price: Joi.number().required().min(0),
  location: Joi.string().required(),
  country: Joi.string().required(),
  category: Joi.string().required(),
  propertyDetails: Joi.object({
    guests: Joi.number().required().min(1),
    bedrooms: Joi.number().required().min(0),
    bathrooms: Joi.number().required().min(0),
  }).required(),
  amenities: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        icon: Joi.string().optional(),
      })
    )
    .required(),
  image: Joi.object({
    url: Joi.string().uri().required(),
    filename: Joi.string().required(),
  }).optional(),
  images: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required(),
        filename: Joi.string().required(),
      })
    )
    .optional(),
});

module.exports.reviewSchema = Joi.object({
  rating: Joi.number().required().min(1).max(5),
  comment: Joi.string().required(),
}).required();
