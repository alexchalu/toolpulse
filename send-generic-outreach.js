const https = require('https');
const fs = require('fs');

const recipient = process.argv[2];
const businessName = process.argv[3];
const businessType = process.argv[4] || 'business';

if (!recipient || !businessName) {
  console.error('Usage: node send-generic-outreach.js <email> <business_name> [business_type]');
  process.exit(1);
}

const RESEND_API_KEY = fs.readFileSync('/data/workspace/.env', 'utf8')
  .split('\n')
  .find(line => line.startsWith('RESEND_API_KEY='))
  ?.split('=')[1]
  ?.trim();

const htmlContent = [
  'Hi,',
  '',
  '<p>I noticed ' + businessName + ' online and wanted to reach out.</p>',
  '',
  '<p>I help local ' + businessType + ' businesses automate appointment scheduling and customer follow-up using AI.</p>',
  '',
  '<p>Most small businesses lose 20-40% of inquiries because they can\'t respond fast enough. I built AI systems that:</p>',
  '<ul>',
  '<li>Answer calls and messages 24/7</li>',
  '<li>Book appointments automatically</li>',
  '<li>Follow up with leads within 60 seconds</li>',
  '<li>Work while you focus on your craft</li>',
  '</ul>',
  '',
  '<p>One local client increased bookings by 87% in 60 days with zero extra staff.</p>',
  '',
  '<p>Would you be open to a quick 15-minute call to see if this could help ' + businessName + '?</p>',
  '',
  '<p>Best,<br>',
  'Alex Chalunkal<br>',
  'CAI Automation<br>',
  '<a href="https://alexchalu.github.io/cai-automation">https://alexchalu.github.io/cai-automation</a><br>',
  'alex@calcleap.com</p>'
].join('\n');

const data = JSON.stringify({
  from: 'Alex Chalunkal <alex@calcleap.com>',
  to: [recipient],
  subject: 'Quick question about ' + businessName,
  html: htmlContent
});

const options = {
  hostname: 'api.resend.com',
  path: '/emails',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + RESEND_API_KEY,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Sent to ' + recipient + ' (' + res.statusCode + ')');
    if (res.statusCode !== 200) {
      console.log('Response:', body);
    }
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(data);
req.end();
