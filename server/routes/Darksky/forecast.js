const getWeatherCondition = require('../../helpers/getWeatherCondition');

module.exports = async (req, res) => {
  const secret = process.env.DARKSKY_API_SECRET;
  const baseUrl = 'https://api.darksky.net/forecast';
  const endpoint = (latitude, longitude) => `${baseUrl}/${secret}/${latitude},${longitude}?units=auto`;
  const data = await getWeatherCondition(endpoint(req.query.latitude, req.query.longitude));

  res.status(200).send(data);
};