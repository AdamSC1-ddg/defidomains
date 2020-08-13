var express = require('express');
var app = express();
var path = require('path');
const Eth = require('ethjs');
const eth = new Eth(new Eth.HttpProvider('https://rinkeby.infura.io/v3/c3eb562930cb47c5bb3f6c597b9416c1'));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.listen(8081, function () {
  console.log('Running on port 8081');
});