const https = require('https');
const fs = require('fs');

const RESEND_API_KEY = fs.readFileSync('.env', 'utf8').match(/RESEND_API_KEY=(.+)/)[1].trim();

// All verified publisher emails we've collected
const targets = [
  // Finance publishers
  { name: "Investopedia Editorial", email: "inv_editorial@investopedia.com", site: "Investopedia", type: "finance" },
  { name: "Bankrate Editorial", email: "editorial@bankrate.com", site: "Bankrate", type: "finance" },
  { name: "The Balance Editorial", email: "feedback@thebalancemoney.com", site: "The Balance", type: "finance" },
  
  // Developer/tech outreach - these are general contact addresses
  { name: "Product Hunt Team", email: "hello@producthunt.com", site: "Product Hunt", type: "launch" },
  { name: "BetaList", email: "hello@betalist.com", site: "BetaList", type: "launch" },
  { name: "Hacker Newsletter", email: "kale@hackernewsletter.com", site: "Hacker Newsletter", type: "dev" },
];

function getEmailHtml(target) {
  if (target.type === "finance") {
    return `<p>Hi ${target.name},</p>
<p>I'm Alex, founder of <a href="https://calcleap.com">CalcLeap.com</a> — a library of 2,900+ free financial calculators.</p>
<p>We cover <strong>mortgage, retirement, tax (all 50 states), insurance, BMI, loans, compound interest</strong>, and hundreds more — all free, no signup needed.</p>
<p><strong>For ${target.site}:</strong> We'd love to be listed as a resource in your articles. We also offer:</p>
<ul>
<li>Free embed codes for any calculator</li>
<li>Free API for developers: <a href="https://github.com/alexchalu/calcleap-api">github.com/alexchalu/calcleap-api</a></li>
<li>Guest post contributions on calculator methodology</li>
</ul>
<p>Full library: <a href="https://calcleap.com">calcleap.com</a></p>
<p>Best,<br>Alex Chalunkal<br><a href="mailto:alex@calcleap.com">alex@calcleap.com</a></p>`;
  } else if (target.type === "launch") {
    return `<p>Hi ${target.name},</p>
<p>I'd like to submit <a href="https://calcleap.com">CalcLeap</a> for listing on ${target.site}.</p>
<p><strong>CalcLeap</strong> is a free calculator platform with 2,900+ tools for finance, health, tax, insurance, crypto, and more. No signup required.</p>
<p><strong>Key stats:</strong></p>
<ul>
<li>2,900+ calculators across 15 categories</li>
<li>Free API with 8 endpoints</li>
<li>All 50 US state tax calculators</li>
<li>No ads, no paywalls, no email gates</li>
</ul>
<p>Website: <a href="https://calcleap.com">calcleap.com</a><br>
API: <a href="https://github.com/alexchalu/calcleap-api">github.com/alexchalu/calcleap-api</a></p>
<p>Happy to provide any additional information needed for listing.</p>
<p>Best,<br>Alex Chalunkal<br><a href="mailto:alex@calcleap.com">alex@calcleap.com</a></p>`;
  } else {
    return `<p>Hi ${target.name},</p>
<p>I built <a href="https://calcleap.com">CalcLeap</a> — 2,900+ free calculators + a free API for developers.</p>
<p>Thought your readers might find it useful. The API is at <a href="https://github.com/alexchalu/calcleap-api">github.com/alexchalu/calcleap-api</a> — 8 endpoints, no key required, completely free.</p>
<p>Would love to be featured or contribute a guest post about building calculator APIs.</p>
<p>Best,<br>Alex Chalunkal<br><a href="mailto:alex@calcleap.com">alex@calcleap.com</a></p>`;
  }
}

async function send(target) {
  const subjects = {
    finance: `Free Calculator Library for ${target.site} — 2,900+ Financial Tools`,
    launch: `Submit: CalcLeap — 2,900+ Free Calculators (Finance, Health, Tax)`,
    dev: `Free Calculator API + 2,900 Tools — CalcLeap`
  };

  const data = JSON.stringify({
    from: "Alex Chalunkal <alex@calcleap.com>",
    to: [target.email],
    subject: subjects[target.type],
    html: getEmailHtml(target)
  });

  const options = {
    hostname: 'api.resend.com',
    path: '/emails',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_API_KEY}` }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✓ ${target.site} → ${target.email}`);
          resolve(true);
        } else {
          console.error(`✗ ${target.site}: ${res.statusCode} ${body}`);
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
  console.log(`Sending ${targets.length} outreach emails...\n`);
  let sent = 0;
  for (const t of targets) {
    try {
      await send(t);
      sent++;
      await new Promise(r => setTimeout(r, 3000)); // 3s between emails
    } catch (e) {
      console.error(`  Error: ${e.message.substring(0, 100)}`);
    }
  }
  console.log(`\n✅ ${sent}/${targets.length} emails sent successfully.`);
})();
