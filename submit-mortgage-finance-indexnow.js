#!/usr/bin/env node
const https = require('https');

const urls = [
  'https://alexchalu.github.io/toolpulse/mortgage-refinance-calculator.html',
  'https://alexchalu.github.io/toolpulse/heloc-payment-calculator.html',
  'https://alexchalu.github.io/toolpulse/401k-withdrawal-calculator.html',
  'https://alexchalu.github.io/toolpulse/roth-ira-conversion-calculator.html',
  'https://alexchalu.github.io/toolpulse/reverse-mortgage-calculator.html',
  'https://alexchalu.github.io/toolpulse/debt-consolidation-calculator.html',
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
    console.log('✅ Successfully submitted 6 mortgage/finance URLs to IndexNow (Bing + Yandex)');
  }
});

req.on('error', (error) => {
  console.error('❌ IndexNow error:', error);
});

req.write(payload);
req.end();
