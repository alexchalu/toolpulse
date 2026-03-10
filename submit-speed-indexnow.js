#!/usr/bin/env node
const https = require('https');

const urls = [
  'https://calcleap.com/convert-mph-to-kph.html',
  'https://calcleap.com/convert-mph-to-mps.html',
  'https://calcleap.com/convert-mph-to-knots.html',
  'https://calcleap.com/convert-kph-to-mph.html',
  'https://calcleap.com/convert-kph-to-mps.html',
  'https://calcleap.com/convert-kph-to-knots.html',
  'https://calcleap.com/convert-knots-to-mph.html',
  'https://calcleap.com/convert-knots-to-kph.html',
  'https://calcleap.com/convert-knots-to-mps.html',
  'https://calcleap.com/convert-mps-to-mph.html',
  'https://calcleap.com/convert-mps-to-kph.html',
  'https://calcleap.com/convert-mps-to-knots.html',
  'https://calcleap.com/convert-mach-to-mph.html',
  'https://calcleap.com/convert-mach-to-kph.html',
  'https://calcleap.com/convert-mph-to-mach.html',
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
    console.log('✅ Successfully submitted 15 speed URLs to IndexNow (Bing + Yandex)');
  }
});

req.on('error', (error) => {
  console.error('❌ IndexNow error:', error);
});

req.write(payload);
req.end();
