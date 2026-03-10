#!/usr/bin/env node
const https = require('https');

const urls = [
  'https://calcleap.com/convert-square-feet-to-square-meters.html',
  'https://calcleap.com/convert-square-feet-to-acres.html',
  'https://calcleap.com/convert-square-feet-to-square-yards.html',
  'https://calcleap.com/convert-square-meters-to-square-feet.html',
  'https://calcleap.com/convert-square-meters-to-acres.html',
  'https://calcleap.com/convert-square-meters-to-hectares.html',
  'https://calcleap.com/convert-acres-to-square-feet.html',
  'https://calcleap.com/convert-acres-to-square-meters.html',
  'https://calcleap.com/convert-acres-to-hectares.html',
  'https://calcleap.com/convert-hectares-to-acres.html',
  'https://calcleap.com/convert-hectares-to-square-meters.html',
  'https://calcleap.com/convert-hectares-to-square-feet.html',
  'https://calcleap.com/convert-square-yards-to-square-feet.html',
  'https://calcleap.com/convert-square-yards-to-square-meters.html',
  'https://calcleap.com/convert-square-inches-to-square-feet.html',
  'https://calcleap.com/convert-square-feet-to-square-inches.html',
  'https://calcleap.com/convert-square-kilometers-to-square-miles.html',
  'https://calcleap.com/convert-square-miles-to-square-kilometers.html',
];

const payload = JSON.stringify({
  host: 'alexchalu.github.io',
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
    console.log('✅ Successfully submitted 18 area URLs to IndexNow (Bing + Yandex)');
  }
});

req.on('error', (error) => {
  console.error('❌ IndexNow error:', error);
});

req.write(payload);
req.end();
