#!/usr/bin/env node
const https = require('https');

const urls = [
  'https://calcleap.com/california-income-tax-calculator.html',
  'https://calcleap.com/texas-income-tax-calculator.html',
  'https://calcleap.com/florida-income-tax-calculator.html',
  'https://calcleap.com/new-york-income-tax-calculator.html',
  'https://calcleap.com/pennsylvania-income-tax-calculator.html',
  'https://calcleap.com/illinois-income-tax-calculator.html',
  'https://calcleap.com/ohio-income-tax-calculator.html',
  'https://calcleap.com/georgia-income-tax-calculator.html',
  'https://calcleap.com/north-carolina-income-tax-calculator.html',
  'https://calcleap.com/michigan-income-tax-calculator.html',
  'https://calcleap.com/new-jersey-income-tax-calculator.html',
  'https://calcleap.com/virginia-income-tax-calculator.html',
  'https://calcleap.com/washington-income-tax-calculator.html',
  'https://calcleap.com/arizona-income-tax-calculator.html',
  'https://calcleap.com/massachusetts-income-tax-calculator.html',
  'https://calcleap.com/tennessee-income-tax-calculator.html',
  'https://calcleap.com/indiana-income-tax-calculator.html',
  'https://calcleap.com/maryland-income-tax-calculator.html',
  'https://calcleap.com/colorado-income-tax-calculator.html',
  'https://calcleap.com/minnesota-income-tax-calculator.html',
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
    console.log('✅ Successfully submitted 20 state tax URLs to IndexNow (Bing + Yandex)');
  }
});

req.on('error', (error) => {
  console.error('❌ IndexNow error:', error);
});

req.write(payload);
req.end();
