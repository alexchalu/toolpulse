#!/usr/bin/env node
const https = require('https');

const urls = [
  'https://calcleap.com/alaska-income-tax-calculator.html',
  'https://calcleap.com/arkansas-income-tax-calculator.html',
  'https://calcleap.com/connecticut-income-tax-calculator.html',
  'https://calcleap.com/delaware-income-tax-calculator.html',
  'https://calcleap.com/hawaii-income-tax-calculator.html',
  'https://calcleap.com/idaho-income-tax-calculator.html',
  'https://calcleap.com/iowa-income-tax-calculator.html',
  'https://calcleap.com/kansas-income-tax-calculator.html',
  'https://calcleap.com/kentucky-income-tax-calculator.html',
  'https://calcleap.com/maine-income-tax-calculator.html',
  'https://calcleap.com/mississippi-income-tax-calculator.html',
  'https://calcleap.com/montana-income-tax-calculator.html',
  'https://calcleap.com/nebraska-income-tax-calculator.html',
  'https://calcleap.com/nevada-income-tax-calculator.html',
  'https://calcleap.com/new-hampshire-income-tax-calculator.html',
  'https://calcleap.com/new-mexico-income-tax-calculator.html',
  'https://calcleap.com/north-dakota-income-tax-calculator.html',
  'https://calcleap.com/oklahoma-income-tax-calculator.html',
  'https://calcleap.com/oregon-income-tax-calculator.html',
  'https://calcleap.com/rhode-island-income-tax-calculator.html',
  'https://calcleap.com/south-dakota-income-tax-calculator.html',
  'https://calcleap.com/utah-income-tax-calculator.html',
  'https://calcleap.com/vermont-income-tax-calculator.html',
  'https://calcleap.com/west-virginia-income-tax-calculator.html',
  'https://calcleap.com/wyoming-income-tax-calculator.html',
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
    console.log('✅ Successfully submitted 25 state tax calculator URLs to IndexNow (Bing + Yandex)');
    console.log('🎉 ALL 50 STATES NOW INDEXED!');
  }
});

req.on('error', (error) => {
  console.error('❌ IndexNow error:', error);
});

req.write(payload);
req.end();
