const https = require('https');
const fs = require('fs');

const RESEND_API_KEY = fs.readFileSync('.env', 'utf8').match(/RESEND_API_KEY=(.+)/)[1].trim();

const targets = [
  { email: "hello@saashub.com", site: "SaaSHub", subject: "Submit: CalcLeap — Free Calculator Platform (2,900+ Tools)" },
  { email: "hello@startupstash.com", site: "StartupStash", subject: "Submit: CalcLeap — 2,900+ Free Online Calculators" },
  { email: "hello@toolscout.com", site: "ToolScout", subject: "Submit: CalcLeap — Free Calculator Library for Finance & Health" },
  { email: "submit@crunchbase.com", site: "Crunchbase", subject: "New Startup: CalcLeap — Free Calculator Platform" },
  { email: "hello@launchingnext.com", site: "Launching Next", subject: "Submit: CalcLeap — 2,900+ Free Calculators" },
  { email: "hello@microlaunch.net", site: "MicroLaunch", subject: "Submit: CalcLeap — Indie Calculator Platform" },
];

const html = `<p>Hi there,</p>
<p>I'd like to submit <a href="https://calcleap.com">CalcLeap</a> for listing on your directory.</p>
<p><strong>CalcLeap</strong> is a free calculator platform with 2,900+ tools covering finance, health, tax, insurance, crypto, and more.</p>
<p><strong>Key highlights:</strong></p>
<ul>
<li>2,900+ calculators across 15 categories</li>
<li>Free API with 8 endpoints (no key needed)</li>
<li>All 50 US state tax calculators</li>
<li>Professional blog with financial guides</li>
<li>No signup, no paywalls — completely free</li>
</ul>
<p><strong>Links:</strong></p>
<ul>
<li>Website: <a href="https://calcleap.com">calcleap.com</a></li>
<li>API: <a href="https://github.com/alexchalu/calcleap-api">github.com/alexchalu/calcleap-api</a></li>
<li>Blog: <a href="https://calcleap.com/blog/">calcleap.com/blog</a></li>
</ul>
<p>Happy to provide any additional details needed.</p>
<p>Best,<br>Alex Chalunkal<br>Founder, CalcLeap<br><a href="mailto:alex@calcleap.com">alex@calcleap.com</a></p>`;

async function send(target) {
  const data = JSON.stringify({
    from: "Alex Chalunkal <alex@calcleap.com>",
    to: [target.email],
    subject: target.subject,
    html
  });

  const options = {
    hostname: 'api.resend.com', path: '/emails', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_API_KEY}` }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        if (res.statusCode === 200) { console.log(`✓ ${target.site} → ${target.email}`); resolve(true); }
        else { console.error(`✗ ${target.site}: ${res.statusCode}`); reject(new Error(body)); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

(async () => {
  console.log(`Sending batch 2: ${targets.length} directory submissions...\n`);
  let sent = 0;
  for (const t of targets) {
    try { await send(t); sent++; await new Promise(r => setTimeout(r, 3000)); }
    catch (e) { console.error(`  Skip: ${e.message.substring(0, 80)}`); }
  }
  console.log(`\n✅ ${sent}/${targets.length} sent.`);
})();
