//import KijijiParser from './kijiji_parsing';
const KijijiParser = require('./kijiji_parsing');
//const data = require('./locations.json');
const express = require('express');
const cors = require('cors');
const CannonParser = require('./cannon_parsing')
const { spawn } = require('child_process');

const app = express();
const port = 4000; // using port 4000 instead of 3000

app.use(cors()); // enable CORS

app.use(express.json());

app.post('/submit', async (req, res) => {
  const { province, city, subCity } = req.body;
  console.log('Province:', province.replace(/ /g, '_'));
  console.log('City:', city);

  Promise.all([KijijiParser(province.replace(/ /g, '_'), city.replace(/ /g, '_'), subCity.replace(/ /g, '_')).catch(error => {
    console.error('Error in KijijiParser:', error);
    return null;
  }), 
  CannonParser(city).catch(error => {
    console.error('Error in CannonParser:', error);
    
  })
]).then((results ) => {
    console.log('Both functions are done.');
    console.log('after function call')
   // console.log(results);
    res.json(results);
  });

});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});