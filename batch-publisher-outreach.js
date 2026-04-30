const https = require('https');
const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const RESEND_API_KEY = envContent.match(/RESEND_API_KEY=(.+)/)[1].trim();

const publishers = [
  { name: "Investopedia Editorial Team", email: "inv_editorial@investopedia.com", site: "Investopedia", traffic: "50M/month" },
  { name: "The Balance Editorial Team", email: "feedback@thebalancemoney.com", site: "The Balance", traffic: "5M/month" }
];

async function send(publisher) {
  const html = `<p>Hi ${publisher.name},</p>

<p>I'm Alex from <a href="https://calcleap.com">CalcLeap.com</a> — we've built a comprehensive library of 2,900+ free financial and health calculators.</p>

<p><strong>Why this matters for ${publisher.site}:</strong></p>
<ul>
<li>Your readers frequently need calculators for mortgage payments, retirement planning, tax estimates, BMI, and more</li>
<li>Our calculators are completely free with no paywalls or signup requirements</li>
<li>Every calculator includes educational content explaining the methodology</li>
<li>All pages are mobile-optimized and load fast</li>
</ul>

<p><strong>Coverage areas:</strong></p>
<ul>
<li>Finance: Mortgage, loans, compound interest, retirement, investment returns</li>
<li>Taxes: All 50 US states plus federal tax calculators</li>
<li>Insurance: Auto, home, life, health premium estimators</li>
<li>Health: BMI, body fat, calorie, pregnancy, sleep calculators</li>
<li>Utilities: Currency, unit conversions, percentages, tips</li>
</ul>

<p><strong>For ${publisher.site}:</strong></p>
<ol>
<li><strong>Resource links:</strong> Link to our calculators from relevant articles (e.g., mortgage articles → our mortgage calculator)</li>
<li><strong>Free embeds:</strong> We can provide embed codes to add interactive calculators directly into your content</li>
<li><strong>API access:</strong> Free calculator API for developers building finance tools: <a href="https://github.com/alexchalu/calcleap-api">github.com/alexchalu/calcleap-api</a></li>
</ol>

<p>Full library: <a href="https://calcleap.com">https://calcleap.com</a></p>

<p>Would your editorial team be interested in partnering? I'm happy to provide custom embed codes for specific calculators or discuss other collaboration opportunities.</p>

<p>Best regards,<br>
Alex Chalunkal<br>
Founder, CalcLeap<br>
<a href="mailto:alex@calcleap.com">alex@calcleap.com</a></p>`;

  const data = JSON.stringify({
    from: "Alex Chalunkal <alex@calcleap.com>",
    to: [publisher.email],
    subject: `Free Calculator Library for ${publisher.site} — 2,900+ Tools`,
    html
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

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✓ ${publisher.site} (${publisher.traffic}) — Sent to ${publisher.email}`);
          resolve(true);
        } else {
          console.error(`✗ ${publisher.site}: ${res.statusCode} ${body}`);
          reject(new Error(body));
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

(async () => {
  console.log('Sending publisher outreach to major finance sites...\n');
  for (const p of publishers) {
    try {
      await send(p);
      await new Promise(r => setTimeout(r, 5000)); // 5 sec between emails
    } catch (e) {
      console.error(e.message);
    }
  }
  console.log('\n✅ Publisher outreach complete.');
  console.log('\nExpected response time: 2-7 days');
  console.log('Potential impact if both link: 55M monthly impressions');
})();
