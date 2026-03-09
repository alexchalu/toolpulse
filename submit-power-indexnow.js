#!/usr/bin/env node
const https = require('https');

const urls = [
  'https://alexchalu.github.io/toolpulse/convert-watts-to-kilowatts.html',
  'https://alexchalu.github.io/toolpulse/convert-kilowatts-to-watts.html',
  'https://alexchalu.github.io/toolpulse/convert-watts-to-horsepower.html',
  'https://alexchalu.github.io/toolpulse/convert-horsepower-to-watts.html',
  'https://alexchalu.github.io/toolpulse/convert-kilowatts-to-horsepower.html',
  'https://alexchalu.github.io/toolpulse/convert-horsepower-to-kilowatts.html',
  'https://alexchalu.github.io/toolpulse/convert-btu-per-hour-to-watts.html',
  'https://alexchalu.github.io/toolpulse/convert-watts-to-btu-per-hour.html',
  'https://alexchalu.github.io/toolpulse/convert-kwh-to-joules.html',
  'https://alexchalu.github.io/toolpulse/convert-joules-to-kwh.html',
  'https://alexchalu.github.io/toolpulse/convert-kwh-to-btu.html',
  'https://alexchalu.github.io/toolpulse/convert-btu-to-kwh.html',
  'https://alexchalu.github.io/toolpulse/convert-kwh-to-calories.html',
  'https://alexchalu.github.io/toolpulse/convert-calories-to-kwh.html',
  'https://alexchalu.github.io/toolpulse/convert-joules-to-calories.html',
  'https://alexchalu.github.io/toolpulse/convert-calories-to-joules.html',
  'https://alexchalu.github.io/toolpulse/convert-watt-hours-to-kwh.html',
  'https://alexchalu.github.io/toolpulse/convert-kwh-to-watt-hours.html',
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
    console.log('✅ Successfully submitted 18 power/energy URLs to IndexNow');
  }
});

req.on('error', (error) => {
  console.error('❌ IndexNow error:', error.message);
});

req.write(payload);
req.end();
