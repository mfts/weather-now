require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
});

app.get('/', function (req, res) {
  const data = {
    message: 'Welcome to our restful API',
  };
  res.status(200).send(data);
});

app.get('/api', async function (req, res) {
  const secret = process.env.DARKSKY_API_SECRET;
  const baseUrl = 'https://api.darksky.net/forecast';
  const endpoint = (latitude, longitude) => `${baseUrl}/${secret}/${latitude},${longitude}?units=auto`;
  const data = await getWeatherCondition(endpoint(req.query.latitude, req.query.longitude));

  res.status(200).send(data);
});

app.post('/api/accuweather', async function (req, res) {
  console.log(req.body)
  const secret = process.env.ACCUWEATHER_API_KEY;
  const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1';
  const endpoint = (locationKey, detailsYes) => `${baseUrl}/${locationKey}?apikey=${secret}&details=${detailsYes}`;
  const data = await getWeatherCondition(endpoint(req.body.locationKey, req.body.detailsYes));

  res.status(200).send(data)
})

const server = app.listen(PORT, () => console.log(`app running on port: ${server.address().port}`));