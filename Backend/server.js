const KijijiParser = require('./kijiji_parsing');
const express = require('express');
const cors = require('cors');
const CannonParser = require('./cannon_parsing')
const { spawn } = require('child_process');
const ZumperParser = require('./zumper_parsing')
const kijijiToZummper = require("./kijijiToZummper")

const app = express();
const port = 4000; // using port 4000 instead of 3000

app.use(cors()); // enable CORS

app.use(express.json());
const zummperProvinces = {
  "ALBERTA": "AB",
  "BRITISH COLUMBIA": "BC",
  "MANITOBA": "MB",
  "NEW BRUNSWICK": "NB",
  "NEWFOUNDLAND AND LABRADOR": "NL",
  "NORTHWEST TERRITORIES": "NT",
  "NOVA SCOTIA": "NS",
  "NUNAVUT": "NU",
  "ONTARIO": "on",
  "PRINCE EDWARD ISLAND": "PE",
  "QUEBEC": "QC",
  "SASKATCHEWAN": "SK",
  "YUKON": "YT"
};
app.post('/submit', async (req, res) => {
  const { province, city, subCity } = req.body;
  console.log('Province:', province.replace(/ /g, '_'));
  console.log('City:', city);

  Promise.all([KijijiParser(province.replace(/ /g, '_'), city.replace(/ /g, '_'), subCity ? subCity.replace(/ /g, '_') : '').catch(error => {
    console.error('Error in KijijiParser:', error);
    return null;
  }), 
  CannonParser(city).catch(error => {
    console.error('Error in CannonParser:', error);
    
  }),
  ZumperParser(zummperProvinces[province], city.replace(/ /g, '-') , subCity ? subCity.replace(/ /g, '-'): '').catch(error => {
    console.error('Error in zummper:', error);
  
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