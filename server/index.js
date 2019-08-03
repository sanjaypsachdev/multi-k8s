const redisData = require('./redis-data');
const pgData = require('./pg-data');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hi');
});

app.get('/values/all', async (req, res) => {
  const values = await pgData.getAllValues();
  res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
  redisData.getAllValues((values) => {
    res.send(values);
  });
});

app.post('/values', async (req, res) => {
  const index = req.body.index;
  if (parseInt(index) > 40) {
    return res.status(422).send('Index too high');
  }
  await Promise.all([redisData.insertIndexForValue(index), pgData.insertValue(index)]);
  res.send({ working: true });
});

app.get('/createschema', async (req, res) => {
  await pgData.createSchema();
  res.sendStatus(200);
});

app.listen(5000, err => {
  console.log('Listening');
});