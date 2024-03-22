const request = require('supertest');
const express = require('express');

const app = express();
let requestCount = 0;
app.use(function(_req, _res, next){
  requestCount++;
  next()})


app.get('/user', function(_req, _res) {
  _res.status(200).json({ name: 'john' });
});

app.post('/user', function(_req, _res) {
  _res.status(200).json({ msg: 'created dummy user' });
});

app.get('/requestCount', function(_req, _res) {
  _res.status(200).json({ requestCount });
});

module.exports = app;