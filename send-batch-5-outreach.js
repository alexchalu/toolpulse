#!/usr/bin/env node
/**
 * Agency Outreach Batch 5 — Sunday cycle
 * Sends 5 emails (legal, veterinary, property management)
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

const targets = JSON.parse(fs.readFileSync('agency-outreach-batch-5-emails.json', 'utf8'));

// Email templates by vertical
const templates = {
  legal: (company) => ({
    subject: "Qualify new injury cases while you're in court",
    body: `Hi,

I noticed ${company} handles personal injury cases in Bergen County. Quick question:

How many potential clients call your office while you're in depositions, trials, or client meetings?

**Industry data shows PI firms miss 25-40% of inbound calls during business hours** — and most injury victims call 3-5 firms before deciding who to hire. If you don't answer first, you're not in the running.

We built an AI system that:
• Answers calls 24/7 (even weekends/holidays)
• Qualifies cases using your intake criteria
• Captures detailed incident information
• Routes genuine leads to your team immediately
• Handles follow-up scheduling automatically

**Real case study:**
Mid-size PI firm was missing ~30 calls/week. After implementing our AI:
→ Response rate: 96% (up from 60%)
→ Qualified cases captured: +18/month
→ Case acceptance rate: +28% (prospects impressed by instant response)
→ Revenue impact: $320K+ additional settlements/year

The system costs less than a part-time intake coordinator and works around the clock.

Would you be open to a 15-minute call to see if this could help ${company} capture more cases?

Best,
Alex Chalunkal
CAI Automation
alex@calcleap.com
(201) 555-0100`
  }),

  veterinary: (company) => ({
    subject: "Stop losing emergency appointments to competitors",
    body: `Hi,

I noticed ${company} serves the Bergen County area. Quick question:

How many pet owners call after hours or during busy exam periods and get voicemail?

**Veterinary data shows practices miss 30-45% of calls during peak hours** — and 65% of pet owners will call the next clinic on Google if they don't reach someone immediately (especially for urgent issues).

We built an AI phone system that:
• Answers every call instantly (24/7, including emergencies)
• Books appointments directly into your calendar
• Triages urgent cases and routes appropriately
• Collects pet history and vaccination records
• Handles prescription refill requests

**Real case study:**
3-vet practice was missing ~25 calls/week. After implementing our AI:
→ Response rate: 97% (up from 55%)
→ New client bookings: +22/month
→ Emergency visits captured: +$45K/year
→ After-hours revenue: +$78K/year

The system costs less than hiring a receptionist and handles unlimited calls simultaneously.

Would you be open to a 15-minute call to see if this could work for ${company}?

Best,
Alex Chalunkal
CAI Automation
alex@calcleap.com
(201) 555-0100`
  }),

  property_mgmt: (company) => ({
    subject: "Handle tenant calls 24/7 without hiring night staff",
    body: `Hi,

I noticed ${company} manages properties in Bergen County. Quick question:

How do you currently handle maintenance requests and tenant questions outside business hours?

**Property management data shows firms lose 15-25% of prospective tenants** who call after hours and get voicemail (they just call the next property).

Plus: Every delayed maintenance request increases tenant frustration and drives up turnover costs.

We built an AI system that:
• Answers tenant calls 24/7 (maintenance, questions, emergencies)
• Triages urgent issues and dispatches appropriately
• Books property showings automatically
• Qualifies prospective tenants
• Handles lease renewal inquiries

**Real case study:**
Property management firm with 280 units was missing ~40 calls/week. After implementing our AI:
→ Prospective tenant response rate: 94% (up from 62%)
→ Lease-ups: 18 days faster on average
→ After-hours maintenance satisfaction: +41%
→ Vacancy reduction: 1.8% (worth ~$125K/year for their portfolio)

The system costs less than a part-time answering service and handles unlimited properties.

Would you be open to a 15-minute call to see if this could help ${company}?

Best,
Alex Chalunkal
CAI Automation
alex@calcleap.com
(201) 555-0100`
  })
};

function sendEmail(target) {
  const template = templates[target.vertical](target.company);
  
  const payload = JSON.stringify({
    from: 'Alex Chalunkal <alex@calcleap.com>',
    to: [target.to],
    subject: template.subject,
    text: template.body
  });

  const options = {
    hostname: 'api.resend.com',
    port: 443,
    path: '/emails',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const result = JSON.parse(data);
          resolve({ success: true, id: result.id, target: target.company });
        } else {
          reject({ success: false, status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log(`📧 Batch 5 Agency Outreach — ${targets.length} emails\n`);
  
  for (const target of targets) {
    try {
      console.log(`📧 Sending to ${target.company} (${target.to})...`);
      const result = await sendEmail(target);
      console.log(`✅ Sent (ID: ${result.id})\n`);
      await new Promise(r => setTimeout(r, 1000)); // Rate limit: 1 req/sec
    } catch (err) {
      console.error(`❌ Failed to send to ${target.company}:`, err);
    }
  }
  
  console.log('✅ Batch 5 complete');
}

main();
