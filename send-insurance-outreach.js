const https = require('https');
const fs = require('fs');

const recipient = process.argv[2];
const agencyName = process.argv[3];

if (!recipient || !agencyName) {
  console.error('Usage: node send-insurance-outreach.js <email> <agency_name>');
  process.exit(1);
}

const RESEND_API_KEY = fs.readFileSync('/data/workspace/.env', 'utf8')
  .split('\n')
  .find(line => line.startsWith('RESEND_API_KEY='))
  ?.split('=')[1]
  ?.trim();

const htmlContent = `Hi,

<p>I noticed ${agencyName} on Google and wanted to reach out.</p>

<p>I'm a Franklin Lakes resident and I help insurance agencies automate quote follow-up using AI.</p>

<p>Most agencies lose 50% of quote requests because follow-up takes too long. Leads go cold if they don't hear back within 24 hours.</p>

<p>I built an AI system for a local agency that:</p>
<ul>
<li>Follows up on quote requests within 60 seconds</li>
<li>Qualifies leads (auto/home/life/business)</li>
<li>Schedules calls with agents automatically</li>
<li>Nurtures leads that aren't ready to buy yet</li>
</ul>

<p>They increased quote-to-policy conversion by 35% in 90 days.</p>

<p>Would you be open to a 15-minute call this week to see if something similar could help ${agencyName}?</p>

<p>Best,<br>
Alex Chalunkal<br>
CAI Automation<br>
<a href='https://alexchalu.github.io/cai-automation'>https://alexchalu.github.io/cai-automation</a><br>
alex@calcleap.com</p>
`;

const data = JSON.stringify({
  from: 'Alex Chalunkal <alex@calcleap.com>',
  to: [recipient],
  subject: 'Quote follow-up for ' + agencyName,
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
