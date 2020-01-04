require('dotenv').config()

const currentConditions = require('./routes/Accuweather/currentConditions');
const forecast = require('./routes/Darksky/forecast')

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

app.get('/api/darksky', forecast);
app.post('/api/accuweather', currentConditions)

const server = app.listen(PORT, () => console.log(`app running on port: ${server.address().port}`));