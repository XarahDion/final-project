const opencage = require('opencage-api-client');
require('dotenv').config();

/// retrieves geolocation coordinates from the open cage api
const getPositionFromAddress = (address) => {
  return opencage
  .geocode({ key: process.env.OPENCAGE_API_KEY, q: address })
  .then((response) => {
    const geometry = Object.values(response.results[0].geometry);
    const element = geometry.splice(0, 1)[0];
    geometry.splice(1, 0, element);
    return geometry /// returns lng/lat instead of lat/lng to facilitate data manipulation with mapbox
  })
  .catch((error) => {
    console.log('error', error.message);
  });
};

module.exports = {getPositionFromAddress};