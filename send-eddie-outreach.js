#!/usr/bin/env node
const https = require('https');
const fs = require('fs');

const RESEND_API_KEY = fs.readFileSync('/data/workspace/.env', 'utf8')
  .split('\n')
  .find(line => line.startsWith('RESEND_API_KEY='))
  ?.split('=')[1]
  ?.trim();

if (!RESEND_API_KEY) {
  console.error('❌ API key not found');
  process.exit(1);
}

function sendEmail(to, subject, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ from: 'alex@calcleap.com', to: [to], subject, text: body });
    const opts = {
      hostname: 'api.resend.com',
      path: '/emails',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };
    const req = https.request(opts, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) resolve(JSON.parse(data).id);
        else reject(new Error(`HTTP ${res.statusCode}: ${data}`));
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

sendEmail(
  'ews31415@gmail.com',
  'Free calculator resource for your math blog readers',
  `Hi Eddie,

I came across your Math and Calculator Blog and really appreciate the work you're doing to make math more accessible.

I built CalcLeap (calcleap.com) — a free calculator platform with 2,800+ calculators covering finance, health, conversions, and more. All free, mobile-optimized, privacy-focused.

Thought it might be a useful resource to share with your readers when they need quick calculations.

A few highlights:
- Financial calculators (mortgage, loan, investment, retirement)
- Unit converters (metric/imperial, currency, time, data storage)
- Health calculators (BMI, calorie, macros, body fat)
- All calculators work instantly, no signup required

If you ever write about calculator tools or resources for math enthusiasts, I'd be honored if you'd consider mentioning CalcLeap.

No strings attached — just wanted to share a resource that might help your audience.

Best,
Alex
CalcLeap.com
alex@calcleap.com`
).then(id => console.log('✅ Sent:', id)).catch(err => console.error('❌ Failed:', err.message));
