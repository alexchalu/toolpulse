const https = require('https');

const API_KEY = process.env.RESEND_API_KEY;
const to = process.argv[2] || 'alex@chalunkal.com';
const subject = process.argv[3] || 'Test from Rando';
const body = process.argv[4] || 'Hey Alex, email is working. — Rando';

const payload = JSON.stringify({
  from: 'Rando <onboarding@resend.dev>',
  to: [to],
  subject: subject,
  html: body
});

const req = https.request({
  hostname: 'api.resend.com',
  path: '/emails',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + API_KEY,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
}, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => console.log(res.statusCode, data));
});
req.write(payload);
req.end();
