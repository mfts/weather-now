const fetch = require('node-fetch');
const getWeatherCondition = require('../../helpers/getWeatherCondition');

module.exports = async (req, res) => {
  console.log(req.body)
  const secret = process.env.ACCUWEATHER_API_KEY;
  const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1';
  const url = (locationKey, detailsYes) => `${baseUrl}/${locationKey}?apikey=${secret}&details=${detailsYes}`;
  const data = await getWeatherCondition(url(req.body.locationKey, req.body.detailsYes));

  const body = {
    location_id: 1,
    observation_time: data[0].LocalObservationDateTime,
    temperature_value: data[0].Temperature.Metric.Value,
  }

  console.log(body)


  const railsApi = process.env.RAILS_API_URL
  const api = (endpoint) => `${railsApi}/${endpoint}`
  const railsData = await fetch(api('conditions'), {
      method: 'POST', 
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json', 'Authorization': `Token token=${process.env.RAILS_API_TOKEN}` }
    })
    .then(res => res.json())
    .then(json => console.log(json));
  
  res.status(200).send(data);
}