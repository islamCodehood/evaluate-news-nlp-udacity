var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();
const app = express()

var https = require('follow-redirects').https;
var fs = require('fs');
const text = "Main dishes were quite good, but desserts were too sweet for me."
var options = {
  'method': 'POST',
  'hostname': 'api.meaningcloud.com',
  'path': encodeURI(`/sentiment-2.1?key=${process.env.API_KEY}&lang=en&txt=${text}`),
  'headers': {
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.end();

app.get('/get', function (req, res) {
  const text = req.body.text
  console.log(text)
})

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


