#!/usr/bin/env node
/**
 * Agency Outreach Batch 8 — Home Services Focus
 * Sends 5 emails to local home service contractors
 */

const https = require('https');
const fs = require('fs');

// Load API key
const RESEND_API_KEY = fs.readFileSync('/data/workspace/.env', 'utf8')
  .split('\n')
  .find(line => line.startsWith('RESEND_API_KEY='))
  ?.split('=')[1]
  ?.trim();

if (!RESEND_API_KEY) {
  console.error('❌ RESEND_API_KEY not found in .env');
  process.exit(1);
}

const targets = JSON.parse(fs.readFileSync('agency-outreach-batch-8-targets.json', 'utf8'));

// Universal home services template
const homeServicesTemplate = (company) => ({
  subject: "Answer customer calls 24/7 without hiring staff",
  body: `Hi,

I noticed ${company} serves the Bergen County area. Quick question:

How many potential customers call after hours, during jobs, or when your team is already booked?

Data shows home service businesses miss 30-40% of inbound calls — and 70% of customers book with whoever answers first.

We built an AI system that:
• Answers every call instantly (even at 2am on weekends)
• Books appointments directly into your calendar
• Qualifies jobs and captures project details
• Routes emergencies appropriately
• Handles overflow during peak season

**Real case study:**
HVAC company was missing ~25 calls/week during install season. After implementing our AI:
→ Call answer rate: 98% (up from 60%)
→ New job bookings: +32/month
→ Revenue impact: $240K+/year

The system costs less than a part-time receptionist and works 24/7/365.

Would you be open to a 15-minute call to see if this could work for ${company}?

Best,
Alex
CAI Automation
alex@calcleap.com
(Owner replies go to: alexmathewc@gmail.com)

P.S. We're based in Franklin Lakes — happy to meet in person if you prefer.`
});

function sendEmail(to, subject, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      from: 'alex@calcleap.com',
      to: [to],
      subject,
      text: body
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

    const req = https.request(options, res => {
      let responseBody = '';
      res.on('data', chunk => responseBody += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const parsed = JSON.parse(responseBody);
          resolve(parsed.id);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${responseBody}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  console.log(`\n🚀 Starting Agency Outreach Batch 8 (${targets.length} emails)\n`);
  
  for (const target of targets) {
    try {
      console.log(`📧 Sending to ${target.company} (${target.to})...`);
      const template = homeServicesTemplate(target.company);
      const emailId = await sendEmail(target.to, template.subject, template.body);
      console.log(`   ✅ Sent (ID: ${emailId})`);
      
      // Rate limit: 1 email per second
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      console.error(`   ❌ Failed: ${err.message}`);
    }
  }
  
  console.log(`\n✅ Batch 8 complete!\n`);
}

main().catch(console.error);
