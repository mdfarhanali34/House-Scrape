//import KijijiParser from './kijiji_parsing';
const KijijiParser = require('./kijiji_parsing');
const data = require('./locations.json');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000; // using port 4000 instead of 3000

app.use(cors()); // enable CORS

app.use(express.json());

app.post('/submit', (req, res) => {
  const { province, city } = req.body;
  console.log('Province:', province);
  console.log('City:', city);
  KijijiParser(province, city);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});