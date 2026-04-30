const https = require('https');
const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const RESEND_API_KEY = envContent.match(/RESEND_API_KEY=(.+)/)[1].trim();

const publishers = [
  { name: "Bankrate Editorial Team", email: "editorial@bankrate.com", site: "Bankrate", traffic: "40M/month", da: 91 }
];

async function send(publisher) {
  const html = `<p>Hi ${publisher.name},</p>

<p>I'm Alex from <a href="https://calcleap.com">CalcLeap.com</a> — we've built 2,900+ free financial calculators that could serve as valuable resources for ${publisher.site} readers.</p>

<p><strong>What we offer:</strong></p>
<ul>
<li>Mortgage & loan payment calculators</li>
<li>Retirement planning tools (401k, IRA, compound interest)</li>
<li>Tax calculators for all 50 US states</li>
<li>Insurance premium estimators</li>
<li>Investment & ROI calculators</li>
</ul>

<p><strong>Why this matters for ${publisher.site}:</strong></p>
<ul>
<li>Completely free — no paywalls, no signup</li>
<li>Educational content explaining the math</li>
<li>Mobile-optimized and fast</li>
</ul>

<p><strong>Partnership options:</strong></p>
<ol>
<li>Link to our calculators from relevant articles</li>
<li>Embed interactive calculators in your content</li>
<li>Use our free API for custom integrations</li>
</ol>

<p>Full library: <a href="https://calcleap.com">https://calcleap.com</a></p>

<p>Would your team be interested in collaborating?</p>

<p>Best regards,<br>
Alex Chalunkal<br>
CalcLeap.com<br>
<a href="mailto:alex@calcleap.com">alex@calcleap.com</a></p>`;

  const data = JSON.stringify({
    from: "Alex Chalunkal <alex@calcleap.com>",
    to: [publisher.email],
    subject: `Free Calculator Resources for ${publisher.site} Readers`,
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
          console.log(`✓ ${publisher.site} (${publisher.traffic}, DA ${publisher.da})`);
          resolve(true);
        } else {
          console.error(`✗ Failed: ${res.statusCode} ${body}`);
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
  console.log('Sending batch #2...\n');
  for (const p of publishers) {
    try {
      await send(p);
    } catch (e) {
      console.error(e.message);
    }
  }
  console.log('\n✅ Total sent today: 3 publishers');
  console.log('Investopedia (50M/month, DA-93)');
  console.log('The Balance (5M/month, DA-91)');
  console.log('Bankrate (40M/month, DA-91)');
  console.log('\nCombined: 95M monthly visits');
})();
