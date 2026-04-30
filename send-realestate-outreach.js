const https = require('https');
const fs = require('fs');

const recipient = process.argv[2];
const agentName = process.argv[3];

if (!recipient || !agentName) {
  console.error('Usage: node send-realestate-outreach.js <email> <agent_name>');
  process.exit(1);
}

const RESEND_API_KEY = fs.readFileSync('/data/workspace/.env', 'utf8')
  .split('\n')
  .find(line => line.startsWith('RESEND_API_KEY='))
  ?.split('=')[1]
  ?.trim();

const data = JSON.stringify({
  from: 'Alex Chalunkal <alex@calcleap.com>',
  to: [recipient],
  subject: `Instant lead follow-up for Bergen County agents`,
  html: `Hi ${agentName},

<p>I saw your name on the Terrie O'Connor Realtors team and wanted to reach out.</p>

<p>I'm a Franklin Lakes resident and I help real estate agents automate lead follow-up using AI.</p>

<p>Most agents lose 50% of Zillow/Realtor.com leads because they can't respond within 5 minutes. We built an AI system that:</p>
<ul>
<li>Responds to leads within 60 seconds (text + voice)</li>
<li>Qualifies buyers/sellers automatically</li>
<li>Books showing appointments directly into your calendar</li>
<li>Works 24/7, even when you're with clients</li>
</ul>

<p>One agent went from 12 closings/year to 22 with the same ad spend.</p>

<p>Would you be open to a 15-minute call this week to see if something similar could help you close more deals?</p>

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
