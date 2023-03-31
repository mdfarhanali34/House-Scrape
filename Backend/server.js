const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000; // using port 4000 instead of 3000

app.use(cors()); // enable CORS

app.use(express.json());

app.post('/submit', (req, res) => {
  const { text1, text2 } = req.body;
  console.log('Text1:', text1);
  console.log('Text2:', text2);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});