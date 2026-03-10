#!/usr/bin/env node
const https = require('https');

const urls = [
  'https://calcleap.com/travel-insurance-calculator.html',
  'https://calcleap.com/business-insurance-calculator.html',
  'https://calcleap.com/flood-insurance-calculator.html',
  'https://calcleap.com/earthquake-insurance-calculator.html',
  'https://calcleap.com/long-term-care-insurance-calculator.html',
  'https://calcleap.com/workers-comp-calculator.html',
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
    console.log('✅ Successfully submitted 6 insurance calculator URLs to IndexNow (Bing + Yandex)');
  }
});

req.on('error', (error) => {
  console.error('❌ IndexNow error:', error);
});

req.write(payload);
req.end();
