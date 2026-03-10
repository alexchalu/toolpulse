#!/usr/bin/env node
const https = require('https');

const urls = [
  'https://calcleap.com/convert-fahrenheit-to-celsius.html',
  'https://calcleap.com/convert-celsius-to-fahrenheit.html',
  'https://calcleap.com/convert-cups-to-ml.html',
  'https://calcleap.com/convert-cups-to-liters.html',
  'https://calcleap.com/convert-tablespoons-to-ml.html',
  'https://calcleap.com/convert-teaspoons-to-ml.html',
  'https://calcleap.com/convert-fluid-ounces-to-ml.html',
  'https://calcleap.com/convert-pints-to-liters.html',
  'https://calcleap.com/convert-quarts-to-liters.html',
  'https://calcleap.com/convert-gallons-to-liters.html',
  'https://calcleap.com/convert-ml-to-cups.html',
  'https://calcleap.com/convert-ml-to-tablespoons.html',
  'https://calcleap.com/convert-ml-to-teaspoons.html',
  'https://calcleap.com/convert-liters-to-cups.html',
  'https://calcleap.com/convert-liters-to-gallons.html',
  'https://calcleap.com/convert-ounces-to-grams.html',
  'https://calcleap.com/convert-pounds-to-grams.html',
  'https://calcleap.com/convert-pounds-to-kg.html',
  'https://calcleap.com/convert-grams-to-ounces.html',
  'https://calcleap.com/convert-grams-to-pounds.html',
  'https://calcleap.com/convert-kg-to-pounds.html',
  'https://calcleap.com/convert-cups-to-tablespoons.html',
  'https://calcleap.com/convert-cups-to-teaspoons.html',
  'https://calcleap.com/convert-tablespoons-to-teaspoons.html',
  'https://calcleap.com/convert-tablespoons-to-cups.html',
  'https://calcleap.com/convert-teaspoons-to-tablespoons.html',
];

const payload = JSON.stringify({
  host: 'calcleap.com',
  key: 'a1b2c3d4e5f6g7h8',
  keyLocation: 'https://calcleap.com/a1b2c3d4e5f6g7h8.txt',
  urlList: urls
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  console.log(`✅ IndexNow response: ${res.statusCode}`);
  if (res.statusCode === 200) {
    console.log('✅ Successfully submitted 26 URLs to IndexNow (Bing + Yandex)');
  }
});

req.on('error', (error) => {
  console.error('❌ IndexNow error:', error);
});

req.write(payload);
req.end();
