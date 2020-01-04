const getWeatherCondition = require('../../helpers/getWeatherCondition');

module.exports = async (req, res) => {
  console.log(req.body)
  const secret = process.env.ACCUWEATHER_API_KEY;
  const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1';
  const endpoint = (locationKey, detailsYes) => `${baseUrl}/${locationKey}?apikey=${secret}&details=${detailsYes}`;
  const data = await getWeatherCondition(endpoint(req.body.locationKey, req.body.detailsYes));

  res.status(200).send(data)
}