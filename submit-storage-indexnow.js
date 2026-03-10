#!/usr/bin/env node
const https = require('https');

const urls = [
  'https://calcleap.com/convert-bytes-to-kb.html',
  'https://calcleap.com/convert-bytes-to-mb.html',
  'https://calcleap.com/convert-bytes-to-gb.html',
  'https://calcleap.com/convert-bytes-to-tb.html',
  'https://calcleap.com/convert-kb-to-bytes.html',
  'https://calcleap.com/convert-kb-to-mb.html',
  'https://calcleap.com/convert-kb-to-gb.html',
  'https://calcleap.com/convert-kb-to-tb.html',
  'https://calcleap.com/convert-mb-to-bytes.html',
  'https://calcleap.com/convert-mb-to-kb.html',
  'https://calcleap.com/convert-mb-to-gb.html',
  'https://calcleap.com/convert-mb-to-tb.html',
  'https://calcleap.com/convert-gb-to-bytes.html',
  'https://calcleap.com/convert-gb-to-kb.html',
  'https://calcleap.com/convert-gb-to-mb.html',
  'https://calcleap.com/convert-gb-to-tb.html',
  'https://calcleap.com/convert-tb-to-bytes.html',
  'https://calcleap.com/convert-tb-to-kb.html',
  'https://calcleap.com/convert-tb-to-mb.html',
  'https://calcleap.com/convert-tb-to-gb.html',
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
    console.log('✅ Successfully submitted 20 data storage URLs to IndexNow');
  }
});

req.on('error', (error) => {
  console.error('❌ IndexNow error:', error);
});

req.write(payload);
req.end();
