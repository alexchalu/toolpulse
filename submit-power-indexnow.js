#!/usr/bin/env node
const https = require('https');

const urls = [
  'https://calcleap.com/convert-watts-to-kilowatts.html',
  'https://calcleap.com/convert-kilowatts-to-watts.html',
  'https://calcleap.com/convert-watts-to-horsepower.html',
  'https://calcleap.com/convert-horsepower-to-watts.html',
  'https://calcleap.com/convert-kilowatts-to-horsepower.html',
  'https://calcleap.com/convert-horsepower-to-kilowatts.html',
  'https://calcleap.com/convert-btu-per-hour-to-watts.html',
  'https://calcleap.com/convert-watts-to-btu-per-hour.html',
  'https://calcleap.com/convert-kwh-to-joules.html',
  'https://calcleap.com/convert-joules-to-kwh.html',
  'https://calcleap.com/convert-kwh-to-btu.html',
  'https://calcleap.com/convert-btu-to-kwh.html',
  'https://calcleap.com/convert-kwh-to-calories.html',
  'https://calcleap.com/convert-calories-to-kwh.html',
  'https://calcleap.com/convert-joules-to-calories.html',
  'https://calcleap.com/convert-calories-to-joules.html',
  'https://calcleap.com/convert-watt-hours-to-kwh.html',
  'https://calcleap.com/convert-kwh-to-watt-hours.html',
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
    console.log('✅ Successfully submitted 18 power/energy URLs to IndexNow');
  }
});

req.on('error', (error) => {
  console.error('❌ IndexNow error:', error.message);
});

req.write(payload);
req.end();
