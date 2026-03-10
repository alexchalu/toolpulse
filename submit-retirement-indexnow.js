#!/usr/bin/env node
const https = require('https');

const urls = [
  'https://alexchalu.github.io/toolpulse/early-retirement-calculator.html',
  'https://alexchalu.github.io/toolpulse/social-security-calculator.html',
  'https://alexchalu.github.io/toolpulse/pension-calculator.html',
  'https://alexchalu.github.io/toolpulse/required-minimum-distribution-calculator.html',
  'https://alexchalu.github.io/toolpulse/annuity-calculator.html',
  'https://alexchalu.github.io/toolpulse/retirement-withdrawal-calculator.html',
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
    console.log('✅ Successfully submitted 6 retirement calculator URLs to IndexNow (Bing + Yandex)');
  }
});

req.on('error', (error) => {
  console.error('❌ IndexNow error:', error);
});

req.write(payload);
req.end();
