#!/usr/bin/env node
const https = require('https');

const urls = [
  'https://calcleap.com/car-insurance-estimator.html',
  'https://calcleap.com/pet-insurance-calculator.html',
  'https://calcleap.com/homeowners-insurance-calculator.html',
  'https://calcleap.com/renters-insurance-calculator.html',
  'https://calcleap.com/motorcycle-insurance-calculator.html',
  'https://calcleap.com/boat-insurance-calculator.html',
  'https://calcleap.com/rv-insurance-calculator.html',
  'https://calcleap.com/umbrella-insurance-calculator.html',
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
    console.log('✅ Successfully submitted 8 insurance calculator URLs to IndexNow (Bing + Yandex)');
  }
});

req.on('error', (error) => {
  console.error('❌ IndexNow error:', error);
});

req.write(payload);
req.end();
