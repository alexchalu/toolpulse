#!/usr/bin/env node
const https = require('https');

const urls = [
  'https://alexchalu.github.io/toolpulse/calc/401k-calculator.html',
  'https://alexchalu.github.io/toolpulse/calc/roth-ira-calculator.html',
  'https://alexchalu.github.io/toolpulse/calc/traditional-ira-calculator.html',
  'https://alexchalu.github.io/toolpulse/calc/investment-return-calculator.html',
  'https://alexchalu.github.io/toolpulse/calc/dividend-yield-calculator.html',
  'https://alexchalu.github.io/toolpulse/calc/stock-portfolio-calculator.html',
  'https://alexchalu.github.io/toolpulse/calc/capital-gains-tax-calculator.html',
  'https://alexchalu.github.io/toolpulse/calc/bond-yield-calculator.html',
];

const payload = JSON.stringify({
  host: 'alexchalu.github.io',
  key: 'a1b2c3d4e5f6g7h8',
  keyLocation: 'https://alexchalu.github.io/toolpulse/a1b2c3d4e5f6g7h8.txt',
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
