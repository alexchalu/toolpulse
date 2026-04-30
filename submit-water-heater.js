const https = require('https');

const url = 'https://calcleap.com/calc/water-heater-cost-calculator.html';

const data = JSON.stringify({
  host: 'calcleap.com',
  key: 'a1b2c3d4e5f6g7h8',
  urlList: [url]
});

const options = {
  hostname: 'api.indexnow.org',
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Submitted:', url);
});

req.on('error', (e) => {
  console.error('Error:', e);
});

req.write(data);
req.end();
