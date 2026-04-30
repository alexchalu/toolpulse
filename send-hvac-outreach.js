const https = require('https');
const fs = require('fs');

const recipient = process.argv[2];
const businessName = process.argv[3];

if (!recipient || !businessName) {
  console.error('Usage: node send-hvac-outreach.js <email> <business_name>');
  process.exit(1);
}

const RESEND_API_KEY = fs.readFileSync('/data/workspace/.env', 'utf8')
  .split('\n')
  .find(line => line.startsWith('RESEND_API_KEY='))
  ?.split('=')[1]
  ?.trim();

const htmlContent = `Hi,

<p>I noticed ${businessName} on Google and wanted to reach out.</p>

<p>I'm a Franklin Lakes resident and I help HVAC companies capture emergency service calls after hours using AI.</p>

<p>The problem: Customer's AC breaks at 9pm Friday. They call you and get voicemail. They call your competitor who answers. You lose a repair job.</p>

<p>I built an AI voice agent for a local HVAC company that:</p>
<ul>
<li>Answers calls 24/7 (sounds natural)</li>
<li>Qualifies emergency vs routine repairs</li>
<li>Books appointments automatically</li>
<li>Escalates true emergencies to your on-call tech</li>
</ul>

<p>They captured 15 additional jobs per month that would have gone to competitors.</p>

<p>Would you be open to a 15-minute call this week to see if something similar could help ${businessName}?</p>

<p>Best,<br>
Alex Chalunkal<br>
CAI Automation<br>
<a href='https://alexchalu.github.io/cai-automation'>https://alexchalu.github.io/cai-automation</a><br>
alex@calcleap.com</p>
`;

const data = JSON.stringify({
  from: 'Alex Chalunkal <alex@calcleap.com>',
  to: [recipient],
  subject: 'Emergency calls for ' + businessName,
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
    console.log(`✓ Sent to ${recipient} (${res.statusCode})`);
    if (res.statusCode !== 200) {
      console.log('Response:', body);
    }
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(data);
req.end();
