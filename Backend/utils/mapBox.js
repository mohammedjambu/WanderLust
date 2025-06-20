// utils/mapbox.js
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapboxToken });

module.exports = geocodingClient;
