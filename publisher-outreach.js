const https = require('https');
const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const RESEND_API_KEY = envContent.match(/RESEND_API_KEY=(.+)/)[1].trim();

const publishers = [
  { name: "The Balance Editorial Team", email: "feedback@thebalancemoney.com", site: "The Balance" }
];

async function send(publisher) {
  const html = `<p>Hi ${publisher.name},</p>

<p>I'm Alex from <a href="https://calcleap.com">CalcLeap.com</a> — we've built 2,900+ free financial calculators that your readers might find useful.</p>

<p><strong>Our calculators cover:</strong></p>
<ul>
<li>Mortgage & loan payments</li>
<li>Retirement planning & compound interest</li>
<li>Tax calculators for all 50 states</li>
<li>Insurance premium estimators</li>
<li>BMI, calorie, and health calculators</li>
</ul>

<p>All calculators are completely free, no signup required, and include educational content explaining the math.</p>

<p><strong>For publishers:</strong> We offer free embed codes so you can add interactive calculators to your articles without building them yourself.</p>

<p>Would your editorial team be interested in:</p>
<ol>
<li>Linking to our calculators as resources in relevant articles?</li>
<li>Embedding our calculators directly in your content?</li>
<li>A guest post about calculator best practices for your audience?</li>
</ol>

<p>You can see the full library at <a href="https://calcleap.com">https://calcleap.com</a></p>

<p>We also have a free API for developers: <a href="https://github.com/alexchalu/calcleap-api">https://github.com/alexchalu/calcleap-api</a></p>

<p>Best regards,<br>
Alex Chalunkal<br>
CalcLeap.com<br>
<a href="mailto:alex@calcleap.com">alex@calcleap.com</a></p>`;

  const data = JSON.stringify({
    from: "Alex Chalunkal <alex@calcleap.com>",
    to: [publisher.email],
    subject: `Free Calculator Tools for ${publisher.site} Readers`,
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
          console.log(`✓ Sent to ${publisher.email}`);
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
  console.log('Sending publisher outreach...\n');
  for (const p of publishers) {
    try {
      await send(p);
      await new Promise(r => setTimeout(r, 3000));
    } catch (e) {
      console.error(e.message);
    }
  }
  console.log('\nDone. Email sent to The Balance editorial team.');
})();
