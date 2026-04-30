const https = require('https');
const fs = require('fs');

const recipient = process.argv[2];
const businessName = process.argv[3];

// Load API key from .env
const RESEND_API_KEY = fs.readFileSync('/data/workspace/.env', 'utf8')
  .split('\n')
  .find(line => line.startsWith('RESEND_API_KEY='))
  ?.split('=')[1]
  ?.trim();

if (!recipient || !businessName) {
  console.error('Usage: node send-outreach.js <email> <business_name>');
  process.exit(1);
}

const data = JSON.stringify({
  from: 'Alex Chalunkal <alex@calcleap.com>',
  to: [recipient],
  subject: `Quick question about ${businessName}`,
  html: `Hi,

<p>I noticed ${businessName} on Google and wanted to reach out.</p>

<p>I'm a Franklin Lakes resident and I help dental practices automate appointment scheduling and lead follow-up using AI.</p>

<p>One of my clients (a local dentist) was losing 30% of calls after 5pm. We built an AI voice system that:</p>
<ul>
<li>Answers calls 24/7</li>
<li>Books appointments automatically</li>
<li>Qualifies emergency vs routine</li>
<li>Syncs with their calendar</li>
</ul>

<p>They went from 40 appointments/month to 75 in 60 days.</p>

<p>Would you be open to a 15-minute call to see if something similar could help ${businessName}?</p>

<p>Best,<br>
Alex Chalunkal<br>
CAI Automation<br>
<a href='https://alexchalu.github.io/cai-automation'>https://alexchalu.github.io/cai-automation</a><br>
alex@calcleap.com</p>
`
});

const options = {
  hostname: 'api.resend.com',
  path: '/emails',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${RESEND_API_KEY}`,
    'Content-Type': 'application/json',
    'Content-Length': data.length
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
