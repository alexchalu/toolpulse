#!/usr/bin/env node
const https = require('https');

const urls = [
  'https://calcleap.com/calc/rental-property-roi-calculator.html',
  'https://calcleap.com/calc/cap-rate-calculator.html',
  'https://calcleap.com/calc/noi-calculator.html',
  'https://calcleap.com/calc/real-estate-appreciation-calculator.html',
  'https://calcleap.com/calc/house-flipping-calculator.html',
  'https://calcleap.com/calc/mortgage-refinance-calculator.html',
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
    console.log('✅ Successfully submitted 6 real estate URLs to IndexNow (Bing + Yandex)');
  }
});

req.on('error', (error) => {
  console.error('❌ IndexNow error:', error);
});

req.write(payload);
req.end();
