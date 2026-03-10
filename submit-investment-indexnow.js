#!/usr/bin/env node
const https = require('https');

const urls = [
  'https://calcleap.com/calc/401k-calculator.html',
  'https://calcleap.com/calc/roth-ira-calculator.html',
  'https://calcleap.com/calc/traditional-ira-calculator.html',
  'https://calcleap.com/calc/investment-return-calculator.html',
  'https://calcleap.com/calc/dividend-yield-calculator.html',
  'https://calcleap.com/calc/stock-portfolio-calculator.html',
  'https://calcleap.com/calc/capital-gains-tax-calculator.html',
  'https://calcleap.com/calc/bond-yield-calculator.html',
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
    console.log('✅ Successfully submitted 8 investment calculator URLs to IndexNow (Bing + Yandex)');
  }
});

req.on('error', (error) => {
  console.error('❌ IndexNow error:', error);
});

req.write(payload);
req.end();
