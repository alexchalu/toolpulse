#!/usr/bin/env node
const https = require('https');
const fs = require('fs');

const RESEND_API_KEY = fs.readFileSync('/data/workspace/.env', 'utf8')
  .split('\n')
  .find(line => line.startsWith('RESEND_API_KEY='))
  ?.split('=')[1]
  ?.trim();

const email = {
  from: 'alex@calcleap.com',
  to: 'ews31415@gmail.com',
  subject: 'Free calculator resource for your math blog readers',
  text: `Hi Eddie,

I came across your Math and Calculator Blog and really appreciate the work you're doing to make math more accessible.

I built CalcLeap (calcleap.com) — a free calculator platform with 2,800+ calculators covering finance, health, conversions, and more. All free, no ads cluttering the experience, mobile-optimized.

Thought it might be a useful resource to share with your readers when they need quick calculations.

A few highlights:
- Financial calculators (mortgage, loan, investment)
- Unit converters (metric/imperial, currency, time)
- Health calculators (BMI, calorie, macros)
- All calculators work offline-capable

If you ever write about calculator tools or resources for math enthusiasts, I'd be honored if you'd consider mentioning CalcLeap.

No strings attached — just wanted to share a resource that might help your audience.

Best,
Alex
CalcLeap.com
alex@calcleap.com`
};

const data = JSON.stringify(email);
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

const req = https.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Email sent:', JSON.parse(body).id);
    } else {
      console.error('❌ Failed:', res.statusCode, body);
    }
  });
});

req.on('error', err => console.error('❌ Error:', err.message));
req.write(data);
req.end();
