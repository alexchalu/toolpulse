const https = require('https');
const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const RESEND_API_KEY = envContent.match(/RESEND_API_KEY=(.+)/)[1].trim();

const data = JSON.stringify({
  from: "Alex Chalunkal <alex@calcleap.com>",
  to: ["alexmathewc@gmail.com"],
  subject: "Test - CalcLeap Outreach System",
  html: "<p>This is a test of the automated outreach system.</p><p>If you receive this, the system is working correctly.</p>"
});

const options = {
  hostname: 'api.resend.com',
  path: '/emails',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${RESEND_API_KEY}`
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Response: ${body}`);
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(data);
req.end();
