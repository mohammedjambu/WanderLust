const express = require('express');
const router = express.Router();
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

router.get('/get-coordinates', async (req, res) => {
  const { location, country } = req.query;
  try {
    const geoData = await geocodingClient.forwardGeocode({
      query: `${location}, ${country}`,
      limit: 1,
    }).send();

    const feature = geoData.body.features[0];
    const [lng, lat] = feature.center;

    res.json({ latitude: lat, longitude: lng });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch coordinates' });
  }
});

module.exports = router;
